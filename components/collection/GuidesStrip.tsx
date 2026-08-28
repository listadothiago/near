import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import CollectionCards from "./CollectionCards";
import type { CollectionSummary } from "@/lib/content/schema";

// Guides are the one kind of Near content that isn't a pin — they tie
// several pins together — so they need somewhere to be read that isn't
// the map. This is that entry point on the home page; renders nothing
// until at least one guide exists.
export default function GuidesStrip({
  collections,
}: {
  collections: CollectionSummary[];
}) {
  const t = useTranslations("collection");
  if (collections.length === 0) return null;

  const featured = collections.slice(0, 3);

  return (
    <section className="mt-8">
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <h2 className="font-serif font-medium text-[1.15rem] m-0">
          {t("navLabel")}
        </h2>
        {collections.length > featured.length && (
          <Link
            href="/guides"
            className="font-mono text-[0.76rem] text-muted hover:text-accent-ink whitespace-nowrap"
          >
            {t("seeAll")}
          </Link>
        )}
      </div>
      <CollectionCards collections={featured} />
    </section>
  );
}
