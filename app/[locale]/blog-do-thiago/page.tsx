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
import blogDoThiagoIndex from "@/content/blog-do-thiago-index.json";
import { buildAlternates } from "@/lib/seo/alternates";

export const revalidate = 3600;

// "blog do thiago" (content/blog-do-thiago.md) is Near's one
// operator-authored column -- credited to the real human curator, not a
// disclosed AI persona. Until now this had no archive page: with only
// one entry (hello-world) the header nav linked straight to that single
// post (see the now-removed comment in Header.tsx). A second entry
// (tigrinho-shit-list) made that a real bug -- the header link kept
// pointing at the first post with no way to reach anything published
// after it. This page is the fix: the archive, newest first, per
// content/blog-do-thiago-index.json's slugs array. Mirrors
// app/[locale]/the-pass/page.tsx and app/[locale]/the-setlist/page.tsx.
// The existing /blog-do-thiago/feed.xml RSS route already covered the
// same list; this adds the human-facing page pointing at the same index.
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
    title: t("blogDoThiagoTitle"),
    alternates: buildAlternates(locale, "/blog-do-thiago"),
  };
}

export default async function BlogDoThiagoArchivePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const entries = blogDoThiagoIndex.slugs
    .map((slug) => getCollectionContent(slug, locale as ContentLocale))
    .filter(
      (c): c is NonNullable<typeof c> => c !== null && c.meta.status === "active",
    )
    .map(({ body: _body, ...summary }): CollectionSummary => {
      void _body;
      return summary;
    })
    .sort(
      (a, b) =>
        new Date(b.meta.publishedAt).getTime() -
        new Date(a.meta.publishedAt).getTime(),
    );

  const columnSlugs = new Set(blogDoThiagoIndex.slugs);
  const stats = getStats();
  const t = await getTranslations({ locale, namespace: "collection" });

  return (
    <>
      <Header />
      <section className="mt-8">
        <h1 className="text-[clamp(1.8rem,5vw,2.6rem)] mb-2">
          {t("blogDoThiagoTitle")}
        </h1>
        <p className="mb-5 font-mono text-[0.85rem] text-muted max-w-[60ch]">
          {t("blogDoThiagoDek")}
        </p>
        {entries.length === 0 ? (
          <p className="max-w-[55ch] font-mono text-[0.85rem] text-muted">
            {t("blogDoThiagoEmpty")}
          </p>
        ) : (
          <CollectionCards
            collections={entries}
            columnSlugs={columnSlugs}
            columnBadgeLabel={t("blogDoThiagoBadge")}
          />
        )}
      </section>
      <Footer stats={stats} />
    </>
  );
}
