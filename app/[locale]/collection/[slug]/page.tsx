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
import editorialColumnIndex from "@/content/editorial-column-index.json";
import type { ContentLocale, PlaceSummary } from "@/lib/content/schema";
import { buildCollectionJsonLd } from "@/lib/seo/jsonld";
import { getBaseUrl } from "@/lib/seo/site";
import { buildOgImages } from "@/lib/seo/ogImage";
import { buildAlternates } from "@/lib/seo/alternates";
import { mdxComponents } from "@/components/mdx/mdxComponents";
import CollectionHero from "@/components/collection/CollectionHero";
import Dateline from "@/components/layout/Dateline";
import CollectionPlaces from "@/components/collection/CollectionPlaces";
import LongFormBody from "@/components/place/LongFormBody";
import ReasonsList from "@/components/place/ReasonsList";
import PublishNote from "@/components/place/PublishNote";
import HousePromo from "@/components/ads/HousePromo";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackLink from "@/components/layout/BackLink";
import ShareButton from "@/components/layout/ShareButton";

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

  return {
    title: content.frontmatter.title,
    description: content.frontmatter.seoDescription,
    alternates: buildAlternates(locale, `/collection/${slug}`),
    openGraph: {
      title: content.frontmatter.title,
      description: content.frontmatter.seoDescription,
      type: "article",
      images: buildOgImages(content.meta.coverImage, content.frontmatter.title),
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
  const tCollection = await getTranslations({ locale, namespace: "collection" });
  const url = `${getBaseUrl()}/${locale}/collection/${slug}`;
  const jsonLd = buildCollectionJsonLd({
    meta: content.meta,
    frontmatter: content.frontmatter,
    url,
    places: places.map((p) => ({
      name: p.frontmatter.name,
      url: `${getBaseUrl()}/${locale}/place/${p.meta.slug}`,
    })),
    isNewsArticle: editorialColumnIndex.slugs.includes(slug),
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
            title={content.frontmatter.title}
            dek={content.frontmatter.dek}
          />
        </div>
        {content.isFallback && (
          <p className="mb-4 font-mono text-[0.78rem] text-ink bg-accent border-[3px] border-ink px-3 py-1.5 inline-block">
            {t("translationPending")}
          </p>
        )}
        <CollectionHero
          meta={content.meta}
          frontmatter={content.frontmatter}
          placeCount={places.length}
          isColumn={editorialColumnIndex.slugs.includes(slug)}
        />
        <Dateline
          publishedAt={content.meta.publishedAt}
          updatedAt={content.meta.updatedAt}
        />
        {/* Above the body on purpose: the box exists to be read at a
            glance before committing to the piece. */}
        {content.frontmatter.bullets && (
          <ReasonsList
            bullets={content.frontmatter.bullets}
            title={tCollection("whyGo")}
          />
        )}
        {content.frontmatter.publishNote && (
          <PublishNote
            quote={content.frontmatter.publishNote.quote}
            attributedTo={content.frontmatter.publishNote.attributedTo}
          />
        )}
        <LongFormBody>
          {/* blockJS: false is required, not optional. next-mdx-remote v6
              defaults it to true, which silently strips every `{...}`
              expression attribute from the MDX before compiling — string
              props survive, everything else arrives `undefined`. That makes
              <FlowDiagram> (components/mdx/FlowDiagram.tsx), whose lanes are
              arrays of step objects, impossible to use from a collection body
              at all: it renders, then crashes on `steps.map`.

              The setting is safe here because these bodies are first-party
              MDX committed to this repo, never user submissions, and
              `blockDangerousJS` stays at its secure default — the eval /
              Function / process / require guard is still on. Scoped to
              collections deliberately; place pages have no such component and
              stay on the stricter default. */}
          <MDXRemote
            source={content.body}
            components={mdxComponents}
            options={{ blockJS: false }}
          />
        </LongFormBody>
        <CollectionPlaces places={places} />
      </article>
      <aside className="hidden lg:block lg:w-[300px] lg:shrink-0 lg:sticky lg:top-6 lg:mt-6">
        <HousePromo
          locale={locale as ContentLocale}
          slot="collection-rail-1"
          size="half-page"
          excludeSlug={slug}
        />
      </aside>
      </div>
      <Footer stats={stats} />
    </>
  );
}
