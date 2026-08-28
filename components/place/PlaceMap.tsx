"use client";

import dynamic from "next/dynamic";
import type { PlaceMeta, PlaceContentFrontmatter } from "@/lib/content/schema";

const WorldMap = dynamic(() => import("@/components/map/WorldMap"), {
  ssr: false,
  loading: () => <div className="w-full h-[340px] bg-chart-bg rounded-2xl" aria-hidden="true" />,
});

export default function PlaceMap({
  meta,
  frontmatter,
}: {
  meta: PlaceMeta;
  frontmatter: PlaceContentFrontmatter;
}) {
  return (
    <div className="mt-6 border border-border rounded-2xl overflow-hidden">
      <WorldMap
        points={[
          {
            slug: meta.slug,
            lat: meta.coordinates.lat,
            lng: meta.coordinates.lng,
            category: meta.categories[0],
            name: frontmatter.name,
            tagline: frontmatter.tagline,
            heroImageUrl: meta.heroImage?.url ?? null,
          },
        ]}
        userCoords={null}
      />
    </div>
  );
}
