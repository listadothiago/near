import { useTranslations } from "next-intl";
import PlaceCards from "@/components/board/PlaceCards";
import type { PlaceSummary } from "@/lib/content/schema";

export default function RelatedPlaces({ places }: { places: PlaceSummary[] }) {
  const t = useTranslations("place");
  if (places.length === 0) return null;

  return (
    <section className="mt-10 border-t-[4px] border-ink pt-6">
      <h2 className="text-[1.15rem] mb-4">{t("relatedNearby")}</h2>
      <PlaceCards places={places} />
    </section>
  );
}
