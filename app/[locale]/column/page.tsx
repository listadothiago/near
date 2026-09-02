import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import { getCollectionContent } from "@/lib/content/collectionsLoader";
import { getStats } from "@/lib/content/loader";
import type { ContentLocale, CollectionSummary } from "@/lib/content/schema";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CollectionCards from "@/components/collection/CollectionCards";
import editorialColumnIndex from "@/content/editorial-column-index.json";
import { buildAlternates } from "@/lib/seo/alternates";

export const revalidate = 3600;

// Near's recurring weekly editorial column has no dedicated content type
// of its own — each entry is a regular collection (see
// content/editorial-column.md for the standing decision). This page is
// the archive: every published entry, newest first, per
// content/editorial-column-index.json's slugs array (kept in sync by
// near-editor/near-refresh whenever a new entry publishes). The
// dedicated RSS feed at /column/feed.xml covers the same list.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("column"), alternates: buildAlternates(locale, "/column") };
}

export default async function ColumnArchivePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const entries = editorialColumnIndex.slugs
    .map((slug) => getCollectionContent(slug, locale as ContentLocale))
    .filter(
      (c): c is NonNullable<typeof c> => c !== null && c.meta.status === "active",
    )
    .map(({ body: _body, ...summary }): CollectionSummary => {
      void _body;
      return summary;
    });

  const columnSlugs = new Set(editorialColumnIndex.slugs);
  const stats = getStats();
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const t = await getTranslations({ locale, namespace: "collection" });

  return (
    <>
      <Header />
      <section className="mt-8">
        <h1 className="text-[clamp(1.8rem,5vw,2.6rem)] mb-2">
          {tNav("column")}
        </h1>
        <p className="mb-5 font-mono text-[0.85rem] text-muted max-w-[60ch]">
          {t("columnDek")}
        </p>
        {entries.length === 0 ? (
          <p className="max-w-[55ch] font-mono text-[0.85rem] text-muted">
            {t("empty")}
          </p>
        ) : (
          <CollectionCards collections={entries} columnSlugs={columnSlugs} />
        )}
      </section>
      <Footer stats={stats} />
    </>
  );
}
