import { getTranslations } from "next-intl/server";
import { getAllPlaces } from "@/lib/content/loader";
import { getAllCollections } from "@/lib/content/collectionsLoader";
import type { ContentLocale } from "@/lib/content/schema";
import Placement, { type PlacementSize } from "./Placement";

/**
 * Fills a placement with Near's own content until there's real inventory.
 *
 * Prefers collections: a guide ties several places together, so sending a
 * reader to one is worth more per click than sending them to a single
 * pin — and guides are the hardest thing on the site to stumble across.
 * Falls back to a place when no collection fits.
 *
 * Deterministic rather than random, so the same page doesn't promote
 * something different on every request and make the analytics unreadable.
 */
export default async function HousePromo({
  locale,
  slot,
  size,
  excludeSlug,
  stretch = false,
}: {
  locale: ContentLocale;
  slot: string;
  size: PlacementSize;
  /** The page doing the promoting — never promote a reader to where they already are. */
  excludeSlug?: string;
  /** Fill the parent rather than sit at exact pixel size — see Placement. */
  stretch?: boolean;
}) {
  const t = await getTranslations({ locale, namespace: "collection" });

  const collections = getAllCollections(locale).filter(
    (c) => c.meta.slug !== excludeSlug,
  );
  if (collections.length > 0) {
    // Stable pick: hash the slot name so different placements on one page
    // don't all promote the same guide.
    const i =
      [...slot].reduce((a, c) => a + c.charCodeAt(0), 0) % collections.length;
    const c = collections[i];
    return (
      <Placement
        slot={slot}
        size={size}
        promoHref={`/collection/${c.meta.slug}`}
        promoKicker={t("placesCount", { count: c.meta.placeSlugs.length })}
        promoTitle={c.frontmatter.title}
        stretch={stretch}
      />
    );
  }

  const places = getAllPlaces(locale).filter((p) => p.meta.slug !== excludeSlug);
  if (places.length === 0) return null;
  const i = [...slot].reduce((a, c) => a + c.charCodeAt(0), 0) % places.length;
  const p = places[i];
  return (
    <Placement
      slot={slot}
      size={size}
      promoHref={`/place/${p.meta.slug}`}
      promoKicker={`${p.meta.place.city}${p.meta.place.neighborhood ? ` · ${p.meta.place.neighborhood}` : ""}`}
      promoTitle={p.frontmatter.shortTitle ?? p.frontmatter.name}
      stretch={stretch}
    />
  );
}
