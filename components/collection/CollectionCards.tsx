import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import type { CollectionSummary } from "@/lib/content/schema";

// The card grid shared by /guides and the home page's guides strip, so a
// blog post looks the same wherever it's surfaced.
//
// auto-fill rather than auto-fit: with only one guide published, auto-fit
// collapses the empty tracks and stretches that single card across the
// whole row, blowing its 16:9 cover up to banner size.
export default function CollectionCards({
  collections,
  columnSlugs,
}: {
  collections: CollectionSummary[];
  /** Slugs that are entries in Near's weekly editorial column (see
   * content/editorial-column.md) — these get a "Weekly Column" badge
   * instead of the usual place count, same distinction CollectionHero
   * makes on the entry's own page. */
  columnSlugs?: Set<string>;
}) {
  const t = useTranslations("collection");

  return (
    <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
      {collections.map((c) => (
        <Link
          key={c.meta.slug}
          href={`/collection/${c.meta.slug}`}
          className="block bg-surface border-[3px] border-ink shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow)] hover:-translate-x-0.5 hover:-translate-y-0.5 overflow-hidden group transition-all"
        >
          {c.meta.coverImage && (
            <div className="relative w-full aspect-[16/9] bg-surface-2 border-b-[3px] border-ink">
              <Image
                src={c.meta.coverImage.url}
                alt={c.frontmatter.title}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
            </div>
          )}
          <div className="p-3">
            <p className="inline-block bg-accent text-black border-[2px] border-ink px-1.5 text-[0.66rem] font-mono uppercase tracking-wide">
              {columnSlugs?.has(c.meta.slug)
                ? t("weeklyColumnBadge")
                : t("placesCount", { count: c.meta.placeSlugs.length })}
            </p>
            <h2 className="mt-1.5 text-[1.1rem] leading-[1.1]">
              {c.frontmatter.title}
            </h2>
            <p className="mt-1.5 font-mono text-[0.72rem] leading-snug text-muted">
              {c.frontmatter.dek}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
