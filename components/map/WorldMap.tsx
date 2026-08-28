"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Tooltip, ZoomControl, useMap } from "react-leaflet";
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

function userIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<span style="display:block;width:12px;height:12px;border-radius:9999px;background:${color};box-shadow:0 0 0 4px color-mix(in srgb, ${color} 30%, transparent), 0 1px 3px rgba(0,0,0,.35);"></span>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
}

const NEIGHBORHOOD_ZOOM = 14;

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
}: {
  points: MapPoint[];
  userCoords: { lat: number; lng: number } | null;
  focusUserSignal: number;
}) {
  const map = useMap();
  // Sentinel (-1) guarantees the first available signal always applies,
  // even if userCoords resolves before this effect's first run.
  const lastAppliedFocusSignal = useRef(-1);
  useEffect(() => {
    if (userCoords) {
      if (focusUserSignal !== lastAppliedFocusSignal.current) {
        // Frame the user together with the nearest pin(s), as tight as
        // that will go — a neighborhood-level view centred on the user
        // is useless when it cuts the closest tip out of frame.
        const nearest = nearestPointsTo(userCoords, points);
        if (nearest.length === 0) {
          map.setView([userCoords.lat, userCoords.lng], NEIGHBORHOOD_ZOOM);
        } else {
          const bounds = L.latLngBounds([
            [userCoords.lat, userCoords.lng],
            ...nearest.map((p) => [p.lat, p.lng] as [number, number]),
          ]);
          map.fitBounds(bounds, { padding: [40, 40], maxZoom: NEIGHBORHOOD_ZOOM });
        }
        lastAppliedFocusSignal.current = focusUserSignal;
      }
      // Already focused on the user for this signal — leave the view
      // alone rather than falling through to re-fit every point.
      return;
    }
    if (points.length === 0) {
      map.setView([20, 0], 2);
      return;
    }
    if (points.length === 1) {
      map.setView([points[0].lat, points[0].lng], 12);
      return;
    }
    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [36, 36] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points.map((p) => p.slug).join(","), userCoords, focusUserSignal, map]);
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
            window.open(placeHref(point.slug), "_blank", "noopener,noreferrer");
          }
        },
      }}
    >
      <Tooltip direction="top" offset={[0, -10]} opacity={1} className="near-map-tooltip">
        <a
          href={placeHref(point.slug)}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-52 bg-surface border border-border rounded-xl shadow-[0_10px_28px_rgba(32,38,42,.15)] overflow-hidden cursor-pointer"
        >
          {point.heroImageUrl && (
            <div className="relative w-full h-24 bg-surface-2">
              <Image
                src={point.heroImageUrl}
                alt={point.name}
                fill
                sizes="208px"
                className="object-cover"
              />
            </div>
          )}
          <div className="p-2.5">
            <div className="font-serif italic font-medium text-[0.94rem] leading-tight">
              {point.name}
            </div>
            <div className="mt-1 text-[0.76rem] text-muted leading-snug">{point.tagline}</div>
          </div>
        </a>
      </Tooltip>
    </Marker>
  );
}

export default function WorldMap({
  points,
  userCoords,
  focusUserSignal = 0,
}: {
  points: MapPoint[];
  userCoords: { lat: number; lng: number } | null;
  /** Bump this (e.g. increment a counter) to re-center/zoom on userCoords. */
  focusUserSignal?: number;
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
        <MapView points={points} userCoords={userCoords} focusUserSignal={focusUserSignal} />
        {points.map((pt) => (
          <PlaceMarker key={pt.slug} point={pt} placeHref={placeHref} />
        ))}
        {userCoords && (
          <Marker
            position={[userCoords.lat, userCoords.lng]}
            icon={userIcon(readVar("--color-accent") || "#5c7a6c")}
            interactive={false}
          />
        )}
      </MapContainer>
    </div>
  );
}
