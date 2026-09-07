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
import { buildOgImages } from "@/lib/seo/ogImage";
import { buildAlternates } from "@/lib/seo/alternates";
import { mdxComponents } from "@/components/mdx/mdxComponents";
import PlaceHero from "@/components/place/PlaceHero";
import Dateline from "@/components/layout/Dateline";
import PlaceMap from "@/components/place/PlaceMap";
import ReasonsList from "@/components/place/ReasonsList";
import PublishNote from "@/components/place/PublishNote";
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

  return {
    title: content.frontmatter.name,
    description: content.frontmatter.seoDescription,
    alternates: buildAlternates(locale, `/place/${slug}`),
    openGraph: {
      title: content.frontmatter.name,
      description: content.frontmatter.seoDescription,
      type: "article",
      images: buildOgImages(content.meta.heroImage, content.frontmatter.name),
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
      <div className="lg:flex lg:items-start lg:gap-10">
      <article className="mt-6 lg:flex-1 lg:min-w-0">
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
        {/* Directly under the hero block: above the fold, before the
            reasons list, so the freshness claim is read before the pitch
            rather than discovered in a footer nobody scrolls to. */}
        <Dateline
          publishedAt={content.meta.publishedAt}
          updatedAt={content.meta.updatedAt}
        />
        <ReasonsList bullets={content.frontmatter.bullets} />
        {content.frontmatter.publishNote && (
          <PublishNote
            quote={content.frontmatter.publishNote.quote}
            attributedTo={content.frontmatter.publishNote.attributedTo}
          />
        )}
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
        {/* Map moved below the article (operator, 2026-08-31): the pitch
            for a place belongs before the pin on a map of it — "where
            exactly" is the question a reader has after deciding to go,
            not before deciding to read. */}
        <PlaceMap meta={content.meta} frontmatter={content.frontmatter} />
        <RelatedPlaces places={related} />
      </article>
      {/* Desktop-only rail: fills the whitespace next to the 65ch reading
          column on wide viewports rather than leaving it empty. Sticky so
          it stays in view as the article scrolls; hidden below lg since
          there's no spare width to give it on narrower screens. */}
      <aside className="hidden lg:block lg:w-[300px] lg:shrink-0 lg:sticky lg:top-6 lg:mt-6">
        <HousePromo
          locale={locale as ContentLocale}
          slot="place-rail-1"
          size="half-page"
          excludeSlug={slug}
        />
      </aside>
      </div>
      <Footer stats={stats} />
    </>
  );
}
