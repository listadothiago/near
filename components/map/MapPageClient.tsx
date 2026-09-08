"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useUserCoords } from "@/lib/geo/useUserCoords";
import { useBoardControls } from "@/lib/board/controls";
import { parseQuery, normalizeText } from "@/lib/search/parseQuery";
import { buildLocationIndex, matchLocation, stripLocationWords } from "@/lib/search/locations";
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
 * Shares the header's search box and filter state (`useBoardControls`,
 * the same provider the board reads from) and applies the identical
 * query/category/tag/location filtering Board.tsx uses — typing
 * "London" into the search box scopes this map exactly the way it
 * scopes the board's card list, rather than the two surfaces silently
 * disagreeing about what "London" means. Operator, 2026-09-08: caught
 * this map ignoring the search box entirely on first ship.
 *
 * userCoords comes from the same shared `useUserCoords` hook every
 * PlaceCard now falls back to (see lib/geo/useUserCoords.ts) — one
 * geolocation request, reused here for free rather than duplicating
 * Board.tsx's own richer locate-button flow for a page that doesn't
 * need the sort/focus machinery that flow exists for.
 */
export default function MapPageClient({ places }: { places: PlaceSummary[] }) {
  const userCoords = useUserCoords();
  const { query, activeCats, activeTags } = useBoardControls();

  const parsed = useMemo(() => parseQuery(query), [query]);
  const locationIndex = useMemo(() => buildLocationIndex(places), [places]);
  const location = useMemo(
    () => (query.trim() ? matchLocation(locationIndex, query) : null),
    [locationIndex, query],
  );

  const filtered = useMemo(() => {
    const textWords = location
      ? stripLocationWords(parsed.freeTextWords, location)
      : parsed.freeTextWords;

    return places
      .filter((p) => !location || location.slugs.has(p.meta.slug))
      .filter(
        (p) =>
          activeCats.size === 0 || p.meta.categories.some((c) => activeCats.has(c)),
      )
      .filter(
        (p) => activeTags.size === 0 || p.meta.tags.some((t) => activeTags.has(t)),
      )
      .filter(
        (p) =>
          parsed.categories.length === 0 ||
          p.meta.categories.some((c) => parsed.categories.includes(c)),
      )
      .filter(
        (p) =>
          parsed.tags.length === 0 || p.meta.tags.some((t) => parsed.tags.includes(t)),
      )
      .filter((p) => {
        if (textWords.length === 0) return true;
        const haystack = normalizeText(
          [
            p.frontmatter.name,
            p.frontmatter.tagline,
            p.meta.place.neighborhood,
            p.meta.place.city,
            p.meta.place.region,
            p.meta.place.country,
          ]
            .filter(Boolean)
            .join(" "),
        );
        return textWords.every((word) => haystack.includes(word));
      });
  }, [places, activeCats, activeTags, parsed, location]);

  return (
    <WorldMap
      points={filtered.map((p) => ({
        slug: p.meta.slug,
        lat: p.meta.coordinates.lat,
        lng: p.meta.coordinates.lng,
        category: p.meta.categories[0],
        name: p.frontmatter.shortTitle ?? p.frontmatter.name,
        tagline: p.frontmatter.tagline,
        heroImageUrl: p.meta.heroImage?.url ?? null,
      }))}
      userCoords={userCoords}
      locationKey={location ? `${location.level}:${location.label}` : null}
      heightClassName="h-[calc(100vh-9rem)]"
    />
  );
}
