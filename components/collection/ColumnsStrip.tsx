import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { getCollectionContent } from "@/lib/content/collectionsLoader";
import type { ContentLocale } from "@/lib/content/schema";
import editorialColumnIndex from "@/content/editorial-column-index.json";
import theSetlistIndex from "@/content/the-setlist-index.json";
import ladiesAndGentlethemIndex from "@/content/ladies-and-gentlethem-index.json";
import thePassIndex from "@/content/the-pass-index.json";
import theFailureModeIndex from "@/content/the-failure-mode-index.json";

// The home page's card-strip entry point for Near's five standing
// columns, sitting alongside GuidesStrip so a reader scanning the bottom
// of the board sees both kinds of non-pin content Near publishes. Mirrors
// /columns' own card-per-column layout (same latest-issue lookup) but as
// a compact strip, matching GuidesStrip's pattern.
const COLUMNS = [
  { path: "/column", titleKey: "nav.column", badgeKey: "weeklyColumnBadge", index: editorialColumnIndex },
  { path: "/the-setlist", titleKey: "theSetlistTitle", badgeKey: "theSetlistBadge", index: theSetlistIndex },
  { path: "/ladies-and-gentlethem", titleKey: "ladiesAndGentlethemTitle", badgeKey: "ladiesAndGentlethemBadge", index: ladiesAndGentlethemIndex },
  { path: "/the-pass", titleKey: "thePassTitle", badgeKey: "thePassBadge", index: thePassIndex },
  { path: "/the-failure-mode", titleKey: "theFailureModeTitle", badgeKey: "theFailureModeBadge", index: theFailureModeIndex },
] as const;

export default async function ColumnsStrip({ locale }: { locale: ContentLocale }) {
  const t = await getTranslations({ locale, namespace: "collection" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  const columns = COLUMNS.map((c) => {
    const latestSlug = c.index.slugs[0];
    const latest = latestSlug ? getCollectionContent(latestSlug, locale) : null;
    return {
      ...c,
      title: c.titleKey === "nav.column" ? tNav("column") : t(c.titleKey),
      badge: t(c.badgeKey),
      latest: latest && latest.meta.status === "active" ? latest : null,
    };
  }).filter((c) => c.latest);

  if (columns.length === 0) return null;

  return (
    <section className="mt-8">
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <h2 className="text-[1.3rem] m-0">{tNav("columns")}</h2>
        <Link
          href="/columns"
          className="font-mono text-[0.76rem] text-muted hover:text-accent-ink whitespace-nowrap"
        >
          {t("seeAll")}
        </Link>
      </div>
      <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
        {columns.map((c) => (
          <Link
            key={c.path}
            href={`/collection/${c.latest!.meta.slug}`}
            className="block bg-surface border-[3px] border-ink shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow)] hover:-translate-x-0.5 hover:-translate-y-0.5 overflow-hidden group transition-all"
          >
            {c.latest!.meta.coverImage && (
              <div className="relative w-full aspect-[16/9] bg-surface-2 border-b-[3px] border-ink">
                <Image
                  src={c.latest!.meta.coverImage.url}
                  alt={c.latest!.frontmatter.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-3">
              <p className="inline-block bg-accent text-black border-[2px] border-ink px-1.5 text-[0.66rem] font-mono uppercase tracking-wide">
                {c.badge}
              </p>
              <h3 className="mt-1.5 text-[1.1rem] leading-[1.1]">{c.title}</h3>
              <p className="mt-1.5 font-mono text-[0.72rem] leading-snug text-muted line-clamp-2">
                {c.latest!.frontmatter.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
