"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Tooltip, ZoomControl, useMap } from "react-leaflet";
import { CATEGORY_COLOR_VAR, type Category } from "@/lib/content/categories";

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
  return L.divIcon({
    className: "",
    html: `<span style="display:block;width:12px;height:12px;border-radius:9999px;background:${color};border:2px solid var(--color-surface);box-shadow:0 1px 3px rgba(0,0,0,.35);"></span>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
    tooltipAnchor: [0, -8],
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

function FitBounds({ points }: { points: MapPoint[] }) {
  const map = useMap();
  useEffect(() => {
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
  }, [points.map((p) => p.slug).join(","), map]);
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
}: {
  points: MapPoint[];
  userCoords: { lat: number; lng: number } | null;
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
        <FitBounds points={points} />
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
