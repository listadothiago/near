import PlaceCard from "./PlaceCard";
import type { PlaceSummary } from "@/lib/content/schema";

export default function PlaceCards({
  places,
  distances,
}: {
  places: PlaceSummary[];
  distances?: Map<string, number>;
}) {
  return (
    <div className="grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]">
      {places.map((place) => (
        <PlaceCard
          key={place.meta.slug}
          place={place}
          distanceKm={distances?.get(place.meta.slug)}
        />
      ))}
    </div>
  );
}
