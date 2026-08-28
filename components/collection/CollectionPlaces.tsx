"use client";

import dynamic from "next/dynamic";
import PlaceRow from "@/components/board/PlaceRow";
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
    <div className="mt-8 grid grid-cols-1 md:grid-cols-[1.35fr_1fr] gap-4 items-start">
      <section className="bg-surface border border-border rounded-[14px] shadow-[0_1px_2px_rgba(32,38,42,.05),0_10px_28px_rgba(32,38,42,.05)] overflow-hidden">
        <WorldMap
          points={places.map((p) => ({
            slug: p.meta.slug,
            lat: p.meta.coordinates.lat,
            lng: p.meta.coordinates.lng,
            category: p.meta.categories[0],
            name: p.frontmatter.name,
            tagline: p.frontmatter.tagline,
            heroImageUrl: p.meta.heroImage?.url ?? null,
          }))}
          userCoords={null}
        />
      </section>
      <section className="bg-surface border border-border rounded-[14px] shadow-[0_1px_2px_rgba(32,38,42,.05),0_10px_28px_rgba(32,38,42,.05)] overflow-hidden px-4 py-2">
        {places.map((place) => (
          <PlaceRow key={place.meta.slug} place={place} />
        ))}
      </section>
    </div>
  );
}
