import PlaceCard from "./PlaceCard";
import type { PlaceSummary } from "@/lib/content/schema";
import type { UpcomingEvent } from "@/lib/content/loader";

/**
 * Which cards get the wide treatment.
 *
 * A uniform grid reads as a database. A print magazine varies the size of
 * things so the eye has somewhere to land, and that's the whole reason
 * for this: rhythm, not ranking — a wider card is not a claim that the
 * place is better.
 *
 * Two coprime cycles (7 and 11) give an irregular beat that never
 * settles into a visible column, which is what an actual random number
 * would be reached for. It is deliberately *not* random: a card that
 * changes width between the server render and the client render is a
 * hydration mismatch, and one that changes on every paint is a layout
 * that jumps under the reader.
 */
function isFeatured(index: number): boolean {
  return index % 7 === 0 || index % 11 === 5;
}

export default function PlaceCards({
  places,
  distances,
  eventsByParent,
  tab,
}: {
  places: PlaceSummary[];
  distances?: Map<string, number>;
  /** Venue slug -> its upcoming hosted events, soonest first. */
  eventsByParent?: Record<string, UpcomingEvent[]>;
  tab?: "nearest" | "latest";
}) {
  return (
    <div className="grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]">
      {places.map((place, index) => {
        // Phones get one column, so a span there would do nothing but
        // make the first card taller than the rest for no reason.
        const featured = isFeatured(index);
        return (
          <div key={place.meta.slug} className={featured ? "md:col-span-2" : ""}>
            <PlaceCard
              place={place}
              distanceKm={distances?.get(place.meta.slug)}
              upcomingEvent={eventsByParent?.[place.meta.slug]?.[0]}
              tab={tab}
              featured={featured}
            />
          </div>
        );
      })}
    </div>
  );
}
