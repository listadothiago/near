import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { routing } from "@/lib/i18n/routing";
import {
  getAllPlaceSlugs,
  getPlaceContent,
  getRelatedPlaces,
} from "@/lib/content/loader";
import type { ContentLocale } from "@/lib/content/schema";
import { buildPlaceJsonLd } from "@/lib/seo/jsonld";
import { getBaseUrl } from "@/lib/seo/site";
import { mdxComponents } from "@/components/mdx/mdxComponents";
import PlaceHero from "@/components/place/PlaceHero";
import ReasonsList from "@/components/place/ReasonsList";
import LongFormBody from "@/components/place/LongFormBody";
import RelatedPlaces from "@/components/place/RelatedPlaces";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getStats } from "@/lib/content/loader";

export const revalidate = 3600;

export function generateStaticParams() {
  const slugs = getAllPlaceSlugs();
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
  const content = getPlaceContent(slug, locale as ContentLocale);
  if (!content) return {};

  const path = `/place/${slug}`;
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${getBaseUrl()}/${l}${path}`]),
  );

  return {
    title: content.frontmatter.name,
    description: content.frontmatter.seoDescription,
    alternates: {
      canonical: `/${locale}${path}`,
      languages,
    },
    openGraph: {
      title: content.frontmatter.name,
      description: content.frontmatter.seoDescription,
      type: "article",
      images: content.meta.heroImage ? [content.meta.heroImage.url] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: content.frontmatter.name,
      description: content.frontmatter.seoDescription,
    },
  };
}

export default async function PlacePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const content = getPlaceContent(slug, locale as ContentLocale);
  if (!content) notFound();

  const related = getRelatedPlaces(slug, locale as ContentLocale);
  const stats = getStats();
  const t = await getTranslations({ locale, namespace: "place" });
  const url = `${getBaseUrl()}/${locale}/place/${slug}`;
  const jsonLd = buildPlaceJsonLd({
    meta: content.meta,
    frontmatter: content.frontmatter,
    url,
  });

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header stats={stats} />
      <article className="mt-6">
        {content.isFallback && (
          <p className="mb-4 text-[0.82rem] text-muted bg-surface-2 border border-border rounded-lg px-3 py-2 inline-block">
            {t("translationPending")}
          </p>
        )}
        <PlaceHero meta={content.meta} frontmatter={content.frontmatter} />
        <ReasonsList bullets={content.frontmatter.bullets} />
        <LongFormBody>
          <MDXRemote source={content.body} components={mdxComponents} />
        </LongFormBody>
        <p className="mt-6 max-w-[65ch] text-[0.85rem] text-muted">
          {t("source")}:{" "}
          <a
            href={content.meta.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-ink underline decoration-accent/40 underline-offset-2"
          >
            {content.meta.source.name}
          </a>
        </p>
        <RelatedPlaces places={related} />
      </article>
      <Footer />
    </>
  );
}
