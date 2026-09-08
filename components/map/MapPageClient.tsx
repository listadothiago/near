"use client";

import dynamic from "next/dynamic";
import { useUserCoords } from "@/lib/geo/useUserCoords";
import type { PlaceSummary } from "@/lib/content/schema";

const WorldMap = dynamic(() => import("@/components/map/WorldMap"), {
  ssr: false,
  loading: () => <div className="w-full h-[calc(100vh-9rem)] bg-chart-bg" aria-hidden="true" />,
});

/**
 * The board's map is a sidebar — useful, but small, and gone entirely on
 * mobile behind a disclosure. BACKLOG P1.6: a dedicated full-screen map
 * for a reader who wants the map to actually be the interface rather
 * than a companion to the card list.
 *
 * userCoords comes from the same shared `useUserCoords` hook every
 * PlaceCard now falls back to (see lib/geo/useUserCoords.ts) — one
 * geolocation request, reused here for free rather than duplicating
 * Board.tsx's own richer locate-button flow for a page that doesn't
 * need the sort/focus machinery that flow exists for.
 */
export default function MapPageClient({ places }: { places: PlaceSummary[] }) {
  const userCoords = useUserCoords();

  return (
    <WorldMap
      points={places.map((p) => ({
        slug: p.meta.slug,
        lat: p.meta.coordinates.lat,
        lng: p.meta.coordinates.lng,
        category: p.meta.categories[0],
        name: p.frontmatter.shortTitle ?? p.frontmatter.name,
        tagline: p.frontmatter.tagline,
        heroImageUrl: p.meta.heroImage?.url ?? null,
      }))}
      userCoords={userCoords}
      heightClassName="h-[calc(100vh-9rem)]"
    />
  );
}
