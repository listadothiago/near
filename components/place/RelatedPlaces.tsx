import { useTranslations } from "next-intl";
import PlaceRow from "@/components/board/PlaceRow";
import type { PlaceSummary } from "@/lib/content/schema";

export default function RelatedPlaces({ places }: { places: PlaceSummary[] }) {
  const t = useTranslations("place");
  if (places.length === 0) return null;

  return (
    <section className="mt-10 max-w-[65ch] border-t border-border pt-6">
      <h2 className="font-serif font-medium text-[1.05rem] mb-1">
        {t("relatedNearby")}
      </h2>
      <div>
        {places.map((place) => (
          <PlaceRow key={place.meta.slug} place={place} />
        ))}
      </div>
    </section>
  );
}
