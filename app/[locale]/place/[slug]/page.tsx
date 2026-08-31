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
  getUpcomingEventsByParent,
  getPlaceSummary,
} from "@/lib/content/loader";
import type { ContentLocale } from "@/lib/content/schema";
import { buildPlaceJsonLd } from "@/lib/seo/jsonld";
import { getBaseUrl } from "@/lib/seo/site";
import { mdxComponents } from "@/components/mdx/mdxComponents";
import PlaceHero from "@/components/place/PlaceHero";
import PlaceMap from "@/components/place/PlaceMap";
import ReasonsList from "@/components/place/ReasonsList";
import LongFormBody from "@/components/place/LongFormBody";
import RelatedPlaces from "@/components/place/RelatedPlaces";
import UpcomingEvents from "@/components/place/UpcomingEvents";
import HousePromo from "@/components/ads/HousePromo";
import EngagedRead from "@/components/layout/EngagedRead";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackLink from "@/components/layout/BackLink";
import ShareButton from "@/components/layout/ShareButton";
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
  const upcoming =
    getUpcomingEventsByParent(locale as ContentLocale)[slug] ?? [];
  // When this page is itself an event, resolve its venue's display name
  // so the hero can link back to it.
  const parentName = content.meta.parentPlace
    ? (getPlaceSummary(content.meta.parentPlace, locale as ContentLocale)
        ?.frontmatter.name ?? undefined)
    : undefined;
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
      <Header />
      <article className="mt-6">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <BackLink />
          <ShareButton
            title={content.frontmatter.name}
            dek={content.frontmatter.tagline}
          />
        </div>
        {content.isFallback && (
          <p className="mb-4 font-mono text-[0.78rem] text-ink bg-accent border-[3px] border-ink px-3 py-1.5 inline-block">
            {t("translationPending")}
          </p>
        )}
        <PlaceHero
          meta={content.meta}
          frontmatter={content.frontmatter}
          parentName={parentName}
        />
        <PlaceMap meta={content.meta} frontmatter={content.frontmatter} />
        <ReasonsList bullets={content.frontmatter.bullets} />
        <UpcomingEvents events={upcoming} />
        {/* Aligned to the reading column, not the page — a unit that
            floats away from the text reads as chrome rather than content. */}
        <EngagedRead slug={slug} />
        <div className="mt-8 max-w-[65ch]">
          <HousePromo
            locale={locale as ContentLocale}
            slot="place-in-article"
            size="mrec"
            excludeSlug={slug}
          />
        </div>
        <LongFormBody>
          <MDXRemote source={content.body} components={mdxComponents} />
        </LongFormBody>
        <p className="mt-6 max-w-[65ch] text-[0.85rem] text-muted">
          {t("source")}
          {content.meta.sources.length > 1 ? "s" : ""}:{" "}
          {content.meta.sources.map((s, i) => (
            <span key={s.url}>
              {i > 0 && ", "}
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-2 underline-offset-[3px] decoration-ink/60 hover:bg-accent hover:text-black transition-colors"
              >
                {s.name}
              </a>
            </span>
          ))}
        </p>
        <RelatedPlaces places={related} />
      </article>
      <Footer stats={stats} />
    </>
  );
}
