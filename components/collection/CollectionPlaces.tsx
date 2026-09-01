"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import PlaceCards from "@/components/board/PlaceCards";
import { haversineKm } from "@/lib/geo/haversine";
import type { PlaceSummary } from "@/lib/content/schema";

const WorldMap = dynamic(() => import("@/components/map/WorldMap"), {
  ssr: false,
  loading: () => <div className="w-full h-[340px] bg-chart-bg" aria-hidden="true" />,
});

export default function CollectionPlaces({
  places,
}: {
  places: PlaceSummary[];
}) {
  // Same silent, no-permission-nag pattern as the board (Board.tsx):
  // request location on mount, fall back to publish order if it's
  // unavailable or declined — a column's place list should never sit
  // empty waiting on a GPS fix.
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  useEffect(() => {
    if (!navigator.geolocation) return;
    const id = setTimeout(() => {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => {},
        { timeout: 8000 },
      );
    }, 0);
    return () => clearTimeout(id);
  }, []);

  const distances = useMemo(
    () =>
      userCoords
        ? new Map(
            places.map((p) => [
              p.meta.slug,
              haversineKm(
                userCoords.lat,
                userCoords.lng,
                p.meta.coordinates.lat,
                p.meta.coordinates.lng,
              ),
            ]),
          )
        : undefined,
    [places, userCoords],
  );

  const sortedPlaces = useMemo(
    () =>
      distances
        ? [...places].sort(
            (a, b) =>
              (distances.get(a.meta.slug) ?? Infinity) -
              (distances.get(b.meta.slug) ?? Infinity),
          )
        : places,
    [places, distances],
  );

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-5 items-start">
      <PlaceCards
        places={sortedPlaces}
        distances={distances}
        tab={distances ? "nearest" : undefined}
      />
      <section className="border-[3px] border-ink bg-surface shadow-[var(--shadow-sm)] overflow-hidden">
        <WorldMap
          points={sortedPlaces.map((p) => ({
            slug: p.meta.slug,
            lat: p.meta.coordinates.lat,
            lng: p.meta.coordinates.lng,
            category: p.meta.categories[0],
            name: p.frontmatter.shortTitle ?? p.frontmatter.name,
            tagline: p.frontmatter.tagline,
            heroImageUrl: p.meta.heroImage?.url ?? null,
          }))}
          userCoords={userCoords}
        />
      </section>
    </div>
  );
}
