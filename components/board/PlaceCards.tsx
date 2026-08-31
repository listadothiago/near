import PlaceCard from "./PlaceCard";
import type { PlaceSummary } from "@/lib/content/schema";
import type { UpcomingEvent } from "@/lib/content/loader";

export default function PlaceCards({
  places,
  distances,
  eventsByParent,
}: {
  places: PlaceSummary[];
  distances?: Map<string, number>;
  /** Venue slug -> its upcoming hosted events, soonest first. */
  eventsByParent?: Record<string, UpcomingEvent[]>;
}) {
  return (
    <div className="grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]">
      {places.map((place) => (
        <PlaceCard
          key={place.meta.slug}
          place={place}
          distanceKm={distances?.get(place.meta.slug)}
          upcomingEvent={eventsByParent?.[place.meta.slug]?.[0]}
        />
      ))}
    </div>
  );
}
