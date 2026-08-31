import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { routing } from "@/lib/i18n/routing";
import {
  getAllCollectionSlugs,
  getCollectionContent,
} from "@/lib/content/collectionsLoader";
import { getPlaceSummary, getStats } from "@/lib/content/loader";
import type { ContentLocale, PlaceSummary } from "@/lib/content/schema";
import { buildCollectionJsonLd } from "@/lib/seo/jsonld";
import { getBaseUrl } from "@/lib/seo/site";
import { mdxComponents } from "@/components/mdx/mdxComponents";
import CollectionHero from "@/components/collection/CollectionHero";
import CollectionPlaces from "@/components/collection/CollectionPlaces";
import LongFormBody from "@/components/place/LongFormBody";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackLink from "@/components/layout/BackLink";

export const revalidate = 3600;

export function generateStaticParams() {
  const slugs = getAllCollectionSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const content = getCollectionContent(slug, locale as ContentLocale);
  if (!content) return {};

  const path = `/collection/${slug}`;
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${getBaseUrl()}/${l}${path}`]),
  );

  return {
    title: content.frontmatter.title,
    description: content.frontmatter.seoDescription,
    alternates: { canonical: `/${locale}${path}`, languages },
    openGraph: {
      title: content.frontmatter.title,
      description: content.frontmatter.seoDescription,
      type: "article",
      images: content.meta.coverImage ? [content.meta.coverImage.url] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: content.frontmatter.title,
      description: content.frontmatter.seoDescription,
    },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const content = getCollectionContent(slug, locale as ContentLocale);
  if (!content) notFound();

  const places = content.meta.placeSlugs
    .map((placeSlug) => getPlaceSummary(placeSlug, locale as ContentLocale))
    .filter((p): p is PlaceSummary => p !== null);

  const stats = getStats();
  const t = await getTranslations({ locale, namespace: "place" });
  const url = `${getBaseUrl()}/${locale}/collection/${slug}`;
  const jsonLd = buildCollectionJsonLd({
    meta: content.meta,
    frontmatter: content.frontmatter,
    url,
    places: places.map((p) => ({
      name: p.frontmatter.name,
      url: `${getBaseUrl()}/${locale}/place/${p.meta.slug}`,
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
      <article className="mt-6">
        <BackLink />
        {content.isFallback && (
          <p className="mb-4 font-mono text-[0.78rem] text-ink bg-accent border-[3px] border-ink px-3 py-1.5 inline-block">
            {t("translationPending")}
          </p>
        )}
        <CollectionHero
          meta={content.meta}
          frontmatter={content.frontmatter}
          placeCount={places.length}
        />
        <LongFormBody>
          <MDXRemote source={content.body} components={mdxComponents} />
        </LongFormBody>
        <CollectionPlaces places={places} />
      </article>
      <Footer stats={stats} />
    </>
  );
}
