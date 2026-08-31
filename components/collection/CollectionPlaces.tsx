"use client";

import dynamic from "next/dynamic";
import PlaceCards from "@/components/board/PlaceCards";
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
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-5 items-start">
      <PlaceCards places={places} />
      <section className="border-[3px] border-ink bg-surface shadow-[var(--shadow-sm)] overflow-hidden">
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
          userCoords={null}
        />
      </section>
    </div>
  );
}
