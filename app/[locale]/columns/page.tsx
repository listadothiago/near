import type { Metadata } from "next";
import Image from "next/image";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import { Link } from "@/lib/i18n/navigation";
import { getCollectionContent } from "@/lib/content/collectionsLoader";
import { getStats } from "@/lib/content/loader";
import type { ContentLocale } from "@/lib/content/schema";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { buildAlternates } from "@/lib/seo/alternates";
import { buildColumnsIndexJsonLd } from "@/lib/seo/jsonld";
import { getBaseUrl } from "@/lib/seo/site";
import editorialColumnIndex from "@/content/editorial-column-index.json";
import theSetlistIndex from "@/content/the-setlist-index.json";
import ladiesAndGentlethemIndex from "@/content/ladies-and-gentlethem-index.json";
import thePassIndex from "@/content/the-pass-index.json";
import theFailureModeIndex from "@/content/the-failure-mode-index.json";

export const revalidate = 3600;

// The landing page one level above the five standing-column archives
// (/column, /the-setlist, /ladies-and-gentlethem, /the-pass,
// /the-failure-mode — all linked from the header's ColumnsMenu dropdown).
// Each archive already exists and is SEO-tagged on its own; this page's
// job is different — it's the hub a search engine (or a reader who just
// wants "what does Near publish regularly") lands on to see all five at
// once, with the latest real issue excerpted so the page has genuine
// unique content rather than being a bare links list. See BACKLOG.md P1.5.
type ColumnDef = {
  path: string;
  titleKey: string;
  dekKey: string;
  badgeKey: string;
  emptyKey?: string;
  index: { slugs: string[] };
};

const COLUMNS: ColumnDef[] = [
  {
    path: "/column",
    titleKey: "nav.column",
    dekKey: "columnDek",
    badgeKey: "weeklyColumnBadge",
    index: editorialColumnIndex,
  },
  {
    path: "/the-setlist",
    titleKey: "theSetlistTitle",
    dekKey: "theSetlistDek",
    badgeKey: "theSetlistBadge",
    emptyKey: "theSetlistEmpty",
    index: theSetlistIndex,
  },
  {
    path: "/ladies-and-gentlethem",
    titleKey: "ladiesAndGentlethemTitle",
    dekKey: "ladiesAndGentlethemDek",
    badgeKey: "ladiesAndGentlethemBadge",
    index: ladiesAndGentlethemIndex,
  },
  {
    path: "/the-pass",
    titleKey: "thePassTitle",
    dekKey: "thePassDek",
    badgeKey: "thePassBadge",
    emptyKey: "thePassEmpty",
    index: thePassIndex,
  },
  {
    path: "/the-failure-mode",
    titleKey: "theFailureModeTitle",
    dekKey: "theFailureModeDek",
    badgeKey: "theFailureModeBadge",
    emptyKey: "theFailureModeEmpty",
    index: theFailureModeIndex,
  },
];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "collection" });
  return {
    title: t("columnsIndexTitle"),
    description: t("columnsIndexSeoDescription"),
    alternates: buildAlternates(locale, "/columns"),
  };
}

export default async function ColumnsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "collection" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const stats = getStats();
  const base = getBaseUrl();
  const url = `${base}/${locale}/columns`;

  // Slugs are stored newest-first (see each archive page's own comment),
  // so index 0 is the latest published issue.
  const columns = COLUMNS.map((c) => {
    const latestSlug = c.index.slugs[0];
    const latest = latestSlug
      ? getCollectionContent(latestSlug, locale as ContentLocale)
      : null;
    const title = c.titleKey === "nav.column" ? tNav("column") : t(c.titleKey);
    return {
      ...c,
      title,
      dek: t(c.dekKey),
      badge: t(c.badgeKey),
      empty: c.emptyKey ? t(c.emptyKey) : t("columnsIndexNoIssuesYet"),
      latest: latest && latest.meta.status === "active" ? latest : null,
    };
  });

  const jsonLd = buildColumnsIndexJsonLd({
    url,
    title: t("columnsIndexTitle"),
    description: t("columnsIndexSeoDescription"),
    columns: columns.map((c) => ({
      name: c.title,
      description: c.dek,
      url: `${base}/${locale}${c.path}`,
      feedUrl: `${base}${c.path}/feed.xml`,
    })),
  });

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <section className="mt-8">
        <h1 className="text-[clamp(1.8rem,5vw,2.6rem)] mb-2">
          {t("columnsIndexTitle")}
        </h1>
        <p className="mb-8 font-mono text-[0.85rem] text-muted max-w-[65ch]">
          {t("columnsIndexIntro")}
        </p>

        <div className="flex flex-col gap-6">
          {columns.map((c) => (
            <article
              key={c.path}
              className="border-[3px] border-ink bg-surface shadow-[var(--shadow-sm)] overflow-hidden sm:flex"
            >
              {c.latest?.meta.coverImage && (
                <Link
                  href={`/collection/${c.latest.meta.slug}`}
                  className="relative block w-full sm:w-56 shrink-0 aspect-[16/9] sm:aspect-auto bg-surface-2 border-b-[3px] sm:border-b-0 sm:border-r-[3px] border-ink"
                >
                  <Image
                    src={c.latest.meta.coverImage.url}
                    alt={c.latest.frontmatter.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 224px"
                    className="object-cover"
                  />
                </Link>
              )}
              <div className="p-4 flex-1 min-w-0">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <h2 className="text-[1.3rem] leading-[1.1]">
                    <Link href={c.path} className="hover:underline">
                      {c.title}
                    </Link>
                  </h2>
                  <span className="inline-block bg-accent text-black border-[2px] border-ink px-1.5 text-[0.66rem] font-mono uppercase tracking-wide shrink-0">
                    {c.badge}
                  </span>
                </div>
                <p className="mt-1.5 font-mono text-[0.78rem] leading-snug text-muted max-w-[60ch]">
                  {c.dek}
                </p>

                {c.latest ? (
                  <div className="mt-3 pt-3 border-t-[2px] border-ink/20">
                    <p className="font-mono text-[0.66rem] uppercase tracking-wide text-muted">
                      {t("columnsIndexLatestIssue")}
                    </p>
                    <h3 className="mt-1 text-[1rem] leading-[1.15]">
                      <Link
                        href={`/collection/${c.latest.meta.slug}`}
                        className="hover:underline"
                      >
                        {c.latest.frontmatter.title}
                      </Link>
                    </h3>
                    <p className="mt-1 font-mono text-[0.72rem] leading-snug text-muted max-w-[60ch]">
                      {c.latest.frontmatter.dek}
                    </p>
                  </div>
                ) : (
                  <p className="mt-3 font-mono text-[0.78rem] text-muted">
                    {c.empty}
                  </p>
                )}

                <div className="mt-3 flex items-center gap-3 font-mono text-[0.72rem]">
                  <Link href={c.path} className="underline hover:text-accent">
                    {t("columnsIndexViewArchive")}
                  </Link>
                  <a
                    href={`${c.path}/feed.xml`}
                    className="underline hover:text-accent"
                  >
                    {t("columnsIndexRss")}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Footer stats={stats} />
    </>
  );
}
