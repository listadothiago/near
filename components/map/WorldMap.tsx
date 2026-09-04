"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  ZoomControl,
  useMap,
  useMapEvents,
} from "react-leaflet";
import Supercluster from "supercluster";
import { CATEGORY_COLOR_VAR, type Category } from "@/lib/content/categories";
import { haversineKm } from "@/lib/geo/haversine";

export type MapPoint = {
  slug: string;
  lat: number;
  lng: number;
  category: Category;
  name: string;
  tagline: string;
  heroImageUrl: string | null;
};

function readVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

function dotIcon(color: string) {
  // An actual pin/teardrop shape — a plain colored dot reads as "just a
  // dot," not "a pin," at map scale.
  const html = `
    <svg width="26" height="34" viewBox="0 0 26 34" xmlns="http://www.w3.org/2000/svg" style="display:block;filter:drop-shadow(0 2px 3px rgba(0,0,0,.35));">
      <path d="M13 0C5.82 0 0 5.82 0 13c0 9.75 13 21 13 21s13-11.25 13-21C26 5.82 20.18 0 13 0z" fill="${color}" stroke="var(--color-surface)" stroke-width="1.5"/>
      <circle cx="13" cy="13" r="4.5" fill="var(--color-surface)"/>
    </svg>`;
  return L.divIcon({
    className: "",
    html,
    iconSize: [26, 34],
    iconAnchor: [13, 34],
    tooltipAnchor: [0, -30],
  });
}

function clusterIcon(count: number) {
  // A square, not a circle: the global no-radius rule is the house visual
  // language, and it's also why leaflet.markercluster's CSS was never an
  // option (see content/design-events-map-views-2026-09-03.md §5.1). Size
  // grows with the count so a 40-pin cluster reads as bigger than a 2-pin
  // one without having to read the number.
  const size = count < 10 ? 30 : count < 50 ? 36 : 42;
  const html = `
    <div style="display:flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;
      background:var(--color-accent);color:var(--color-black,#000);
      border:3px solid var(--color-ink);box-shadow:0 2px 3px rgba(0,0,0,.35);
      font-family:var(--font-mono,monospace);font-weight:700;font-size:${count > 99 ? 11 : 13}px;
      line-height:1;">${count}</div>`;
  return L.divIcon({
    className: "",
    html,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    tooltipAnchor: [0, -size / 2],
  });
}

/**
 * "You are here" — deliberately NOT a teardrop.
 *
 * The reader is not a tip, so this must never read as a PlaceMarker. It
 * uses the one shape nothing else on the map uses (a ringed circle,
 * against the house squares and teardrops) and it is the only marker
 * allowed to move.
 *
 * The old version was a flat 12px dot with no outline, which disappeared
 * twice over: it had no border to separate it from busy OSM raster, and
 * at 12px it read as insignificant beside the 26x34 drop-shadowed pins.
 * The white ring plus ink hairline is what makes it legible on any tile
 * and in both themes — accent alone is not enough, because #ccff00 on a
 * pale road casing is genuinely low contrast.
 */
function userIcon(color: string) {
  const html = `
    <span class="near-userloc" style="--userloc-color:${color};">
      <span class="near-userloc__pulse"></span>
      <span class="near-userloc__core"></span>
    </span>`;
  return L.divIcon({
    className: "",
    html,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
  });
}

const NEIGHBORHOOD_ZOOM = 14;

/**
 * Every programmatic view change on this map must be unanimated.
 *
 * Leaflet's animated zoom path is a silent no-op in this container —
 * confirmed in the browser, not inferred: `setZoom(6)` and
 * `fitBounds(londonToParis)` both left the map at zoom 2 centred on
 * [20, 0], while the identical calls with `animate: false` landed on
 * zoom 6 at the right centre. Wheel zoom, which takes a different code
 * path, was working the whole time, which is what made this so easy to
 * miss.
 *
 * That is also why the board's map has always opened on the whole world
 * rather than framed on its pins: MapView's fit below has been quietly
 * failing since it was written. The pins were correct, so nothing looked
 * broken enough to chase.
 */
const VIEW_OPTS = { animate: false } as const;

// Anything within 15% of the nearest pin's distance counts as "the
// nearest pin(s)" — a cluster of tips on the same block should all be in
// frame, not just whichever one wins by a few metres.
const NEAREST_TIE_FACTOR = 1.15;

function nearestPointsTo(
  coords: { lat: number; lng: number },
  points: MapPoint[],
): MapPoint[] {
  if (points.length === 0) return [];
  const withDistance = points.map((p) => ({
    point: p,
    km: haversineKm(coords.lat, coords.lng, p.lat, p.lng),
  }));
  const closest = Math.min(...withDistance.map((d) => d.km));
  return withDistance
    .filter((d) => d.km <= closest * NEAREST_TIE_FACTOR)
    .map((d) => d.point);
}

// Single effect owns every view change (fit-to-points vs. focus-on-user)
// so there's exactly one decision per relevant change — two separate
// effects each calling setView/fitBounds can race and stomp on each
// other's result when userCoords resolves asynchronously mid-render.
function MapView({
  points,
  userCoords,
  focusUserSignal,
  locationKey,
}: {
  points: MapPoint[];
  userCoords: { lat: number; lng: number } | null;
  focusUserSignal: number;
  /**
   * Identity of the active location search (e.g. "london"), or null.
   * A location search takes priority over "focus on me" — the reader
   * explicitly asked to look at a place, not at their own position.
   * Without this, the branch below returns early whenever userCoords is
   * set and the focus signal hasn't changed, so filtering the board to
   * London by typing in the search box left the map centred wherever it
   * last focused the reader (e.g. their own city) and never looked at
   * London's pins at all.
   */
  locationKey: string | null;
}) {
  const map = useMap();
  // Sentinel (-1) guarantees the first available signal always applies,
  // even if userCoords resolves before this effect's first run.
  const lastAppliedFocusSignal = useRef(-1);
  const lastAppliedLocationKey = useRef<string | null | undefined>(undefined);
  useEffect(() => {
    if (locationKey !== lastAppliedLocationKey.current) {
      lastAppliedLocationKey.current = locationKey;
      if (locationKey !== null) {
        if (points.length === 0) {
          map.setView([20, 0], 2, VIEW_OPTS);
        } else if (points.length === 1) {
          map.setView([points[0].lat, points[0].lng], 12, VIEW_OPTS);
        } else {
          const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng] as [number, number]));
          map.fitBounds(bounds, { padding: [36, 36], ...VIEW_OPTS });
        }
        return;
      }
      // Location search just cleared — fall through to the normal
      // userCoords/points logic below on this same render.
    }
    if (userCoords) {
      if (focusUserSignal !== lastAppliedFocusSignal.current) {
        // Frame the user together with the nearest pin(s), as tight as
        // that will go — a neighborhood-level view centred on the user
        // is useless when it cuts the closest tip out of frame.
        const nearest = nearestPointsTo(userCoords, points);
        if (nearest.length === 0) {
          map.setView([userCoords.lat, userCoords.lng], NEIGHBORHOOD_ZOOM, VIEW_OPTS);
        } else {
          const bounds = L.latLngBounds([
            [userCoords.lat, userCoords.lng],
            ...nearest.map((p) => [p.lat, p.lng] as [number, number]),
          ]);
          map.fitBounds(bounds, { padding: [40, 40], maxZoom: NEIGHBORHOOD_ZOOM, ...VIEW_OPTS });
        }
        lastAppliedFocusSignal.current = focusUserSignal;
      }
      // Already focused on the user for this signal — leave the view
      // alone rather than falling through to re-fit every point.
      return;
    }
    if (points.length === 0) {
      map.setView([20, 0], 2, VIEW_OPTS);
      return;
    }
    if (points.length === 1) {
      map.setView([points[0].lat, points[0].lng], 12, VIEW_OPTS);
      return;
    }
    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [36, 36], ...VIEW_OPTS });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points.map((p) => p.slug).join(","), userCoords, focusUserSignal, locationKey, map]);
  return null;
}

function PlaceMarker({ point, placeHref }: { point: MapPoint; placeHref: (slug: string) => string }) {
  const markerRef = useRef<L.Marker>(null);
  const [colorTick, setColorTick] = useState(0);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const bump = () => setColorTick((t) => t + 1);
    mql.addEventListener("change", bump);
    const themeObserver = new MutationObserver(bump);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => {
      mql.removeEventListener("change", bump);
      themeObserver.disconnect();
    };
  }, []);

  const icon = useMemo(() => {
    const color = readVar(CATEGORY_COLOR_VAR[point.category]) || readVar("--color-accent");
    return dotIcon(color);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [point.category, colorTick]);

  return (
    <Marker
      position={[point.lat, point.lng]}
      icon={icon}
      ref={markerRef}
      eventHandlers={{
        click: () => {
          if (isTouchDevice()) {
            markerRef.current?.openTooltip();
          } else {
            window.location.href = placeHref(point.slug);
          }
        },
      }}
    >
      <Tooltip direction="top" offset={[0, -10]} opacity={1} className="near-map-tooltip">
        {/* Width is viewport-clamped, not fixed: a Leaflet Tooltip has no
            autoPan/keepInView (unlike a Popup), so a pin near an edge pushes
            this card past the map frame, whose overflow-hidden then slices
            it — the "image leaks" report. The frame's overflow-hidden is
            load-bearing (it keeps Leaflet's z-1000 panes off the sticky
            header), so the card yields instead. */}
        <a
          href={placeHref(point.slug)}
          className="block w-[min(13rem,calc(100vw-3rem))] max-w-[13rem] bg-surface border-[3px] border-ink shadow-[var(--shadow-sm)] overflow-hidden cursor-pointer"
        >
          {point.heroImageUrl && (
            <div className="relative w-full h-24 bg-surface-2 border-b-[3px] border-ink">
              <Image
                src={point.heroImageUrl}
                alt={point.name}
                fill
                sizes="208px"
                className="object-cover"
              />
            </div>
          )}
          <div className="p-2">
            <div className="font-display font-bold uppercase tracking-[-0.5px] text-[0.85rem] leading-[1.1]">
              {point.name}
            </div>
            <div className="mt-1 font-mono text-[0.68rem] text-muted leading-snug line-clamp-2">
              {point.tagline}
            </div>
          </div>
        </a>
      </Tooltip>
    </Marker>
  );
}

const TILE_MAX_ZOOM = 19;
/**
 * Past this, supercluster stops aggregating and every point stands alone.
 * One below the tile ceiling on purpose: there has to be a zoom level at
 * which a stubborn cluster is guaranteed to have broken apart, otherwise
 * "click to zoom in" can be a promise the map cannot keep.
 */
const CLUSTER_MAX_ZOOM = 17;

type ClusterProps = { point: MapPoint };

/**
 * Aggregates pins with `supercluster` rather than leaflet.markercluster.
 *
 * The full reasoning is in
 * `content/design-events-map-views-2026-09-03.md` §5.1, but the short
 * version: react-leaflet is at v5 and the usual React wrapper for the
 * Leaflet plugin targets v4, so the plugin route means reaching around
 * React into imperative layer management — exactly what MapView's
 * single-effect discipline exists to prevent. supercluster is a pure
 * index instead: give it points, ask it what's visible, get plain data
 * back as React state.
 *
 * On not violating MapView's "one effect owns every view change": the
 * cluster click below calls setView imperatively from a user gesture,
 * and changes none of MapView's dependencies (the slug list, userCoords,
 * focusUserSignal, locationKey are all untouched by a zoom). So it can't
 * race that effect — there is still exactly one *declarative* owner of
 * the view.
 */
function ClusterLayer({
  points,
  placeHref,
}: {
  points: MapPoint[];
  placeHref: (slug: string) => string;
}) {
  const map = useMap();
  const [view, setView] = useState<{ bbox: [number, number, number, number]; zoom: number } | null>(
    null,
  );

  const readView = useCallback(() => {
    const b = map.getBounds();
    // Clamped because a world-wrapped view at low zoom reports longitudes
    // outside ±180, which supercluster reads as an empty range and answers
    // with no clusters at all — an empty map at the exact zoom level where
    // the reader most needs to see everything.
    setView({
      bbox: [
        Math.max(-180, b.getWest()),
        Math.max(-90, b.getSouth()),
        Math.min(180, b.getEast()),
        Math.min(90, b.getNorth()),
      ],
      zoom: Math.round(map.getZoom()),
    });
  }, [map]);

  useMapEvents({ moveend: readView, zoomend: readView });
  // MapView fits the bounds on mount, which fires moveend — but only when
  // that fit actually moves the map. Seed the view directly so a map that
  // happens to open already framed still renders its pins.
  useEffect(readView, [readView]);

  const index = useMemo(() => {
    const sc = new Supercluster<ClusterProps>({
      radius: 60,
      maxZoom: CLUSTER_MAX_ZOOM,
    });
    sc.load(
      points.map((point) => ({
        type: "Feature" as const,
        properties: { point },
        geometry: { type: "Point" as const, coordinates: [point.lng, point.lat] },
      })),
    );
    return sc;
  }, [points]);

  const clusters = useMemo(() => {
    if (!view) return [];
    return index.getClusters(view.bbox, view.zoom);
  }, [index, view]);

  return (
    <>
      {clusters.map((c) => {
        const [lng, lat] = c.geometry.coordinates;
        // supercluster returns a union of leaf and cluster features; the
        // `cluster` flag is only present on the latter, so `in` is the
        // narrowing that TypeScript accepts here.
        if (!("cluster" in c.properties)) {
          const { point } = c.properties;
          return <PlaceMarker key={point.slug} point={point} placeHref={placeHref} />;
        }
        const clusterId = c.properties.cluster_id;
        return (
          <ClusterMarker
            key={`cluster-${clusterId}`}
            lat={lat}
            lng={lng}
            count={c.properties.point_count}
            leaves={index.getLeaves(clusterId, 6).map((l) => l.properties.point)}
            placeHref={placeHref}
            onClick={() => {
              // Fit the cluster's members, rather than
              // `getClusterExpansionZoom`. That function answers a
              // narrower question than it looks like it does — the zoom at
              // which this cluster first splits, which is often exactly one
              // level up. Verified in the browser: clicking the 32-pin
              // Europe cluster at zoom 1 returned 2, so the click zoomed one
              // step and still showed a 32-pin cluster. Fitting the bounds
              // does what clicking a cluster visibly promises: it shows you
              // what is inside.
              const members = index.getLeaves(clusterId, Infinity);
              const bounds = L.latLngBounds(
                members.map((m) => [
                  m.geometry.coordinates[1],
                  m.geometry.coordinates[0],
                ] as [number, number]),
              );
              // maxZoom matters for the degenerate case: venues at the same
              // address give bounds of zero size, which fitBounds answers by
              // slamming to the tile ceiling — a street-level view of a
              // cluster that still hasn't separated. Stop short, and let the
              // hover list be the way in.
              map.fitBounds(bounds, { padding: [36, 36], maxZoom: TILE_MAX_ZOOM - 3, ...VIEW_OPTS });
            }}
          />
        );
      })}
    </>
  );
}

function ClusterMarker({
  lat,
  lng,
  count,
  leaves,
  placeHref,
  onClick,
}: {
  lat: number;
  lng: number;
  count: number;
  /** First few members, for the hover list. */
  leaves: MapPoint[];
  placeHref: (slug: string) => string;
  onClick: () => void;
}) {
  const icon = useMemo(() => clusterIcon(count), [count]);
  return (
    <Marker position={[lat, lng]} icon={icon} eventHandlers={{ click: onClick }}>
      {/* The stacked-list fallback. Zooming breaks most clusters apart, but
          two venues at the same address never separate however far you zoom
          — without this, those pins would be unreachable from the map. The
          list is also just faster than zooming when you only want to know
          what's in there. */}
      <Tooltip direction="top" opacity={1} className="near-map-tooltip">
        <div className="w-[min(13rem,calc(100vw-3rem))] max-w-[13rem] bg-surface border-[3px] border-ink shadow-[var(--shadow-sm)] p-2">
          {leaves.map((p) => (
            <a
              key={p.slug}
              href={placeHref(p.slug)}
              className="block font-display font-bold uppercase tracking-[-0.5px] text-[0.78rem] leading-[1.15] mb-1 last:mb-0 hover:bg-accent hover:text-black"
            >
              {p.name}
            </a>
          ))}
          {count > leaves.length && (
            <div className="mt-1 font-mono text-[0.62rem] text-muted uppercase">
              +{count - leaves.length}
            </div>
          )}
        </div>
      </Tooltip>
    </Marker>
  );
}

export default function WorldMap({
  points,
  userCoords,
  focusUserSignal = 0,
  locationKey = null,
}: {
  points: MapPoint[];
  userCoords: { lat: number; lng: number } | null;
  /** Bump this (e.g. increment a counter) to re-center/zoom on userCoords. */
  focusUserSignal?: number;
  /** Identity of the active location search — see MapView's own doc. */
  locationKey?: string | null;
}) {
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  function placeHref(slug: string) {
    return `/${locale}/place/${slug}`;
  }

  if (!mounted) {
    return <div className="w-full h-[340px] bg-chart-bg" aria-hidden="true" />;
  }

  return (
    <div className="relative">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        zoomControl={false}
        scrollWheelZoom
        className="w-full h-[340px]"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={19}
        />
        <ZoomControl position="topright" />
        <MapView points={points} userCoords={userCoords} focusUserSignal={focusUserSignal} locationKey={locationKey} />
        <ClusterLayer points={points} placeHref={placeHref} />
        {userCoords && (
          <Marker
            position={[userCoords.lat, userCoords.lng]}
            icon={userIcon(readVar("--color-accent") || "#ccff00")}
            interactive={false}
          />
        )}
      </MapContainer>
    </div>
  );
}
