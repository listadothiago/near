import type { MetadataRoute } from "next";
import { routing } from "@/lib/i18n/routing";
import { getAllPlaces } from "@/lib/content/loader";
import { getAllCollections } from "@/lib/content/collectionsLoader";
import { getAllAuthorSlugs } from "@/lib/content/authors";
import type { ContentLocale } from "@/lib/content/schema";
import { getBaseUrl } from "@/lib/seo/site";

/**
 * `<priority>` is deliberately absent: Google does not use it, and the old
 * values (1 / 0.8 / 0.3 …) were self-assessment noise.
 *
 * `lastModified` means *the indexable representation changed*. Passing
 * `new Date()` — which the three static entries used to do — claims every
 * static page changes on every build and trains crawlers to come back for
 * nothing. Aggregation pages therefore inherit the newest date of whatever
 * they aggregate.
 */
function newest(dates: Date[], fallback: Date): Date {
  const valid = dates.filter((d) => !Number.isNaN(d.getTime()));
  if (valid.length === 0) return fallback;
  return new Date(Math.max(...valid.map((d) => d.getTime())));
}

// Filesystem mtimes are deliberately NOT used here. A CI checkout rewrites
// every mtime to clone time, so `statSync` would claim a fresh change on
// every deploy — the same defect as `new Date()`, just less obvious. Content
// frontmatter dates are the only build-stable signal available.

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getBaseUrl();
  const entries: MetadataRoute.Sitemap = [];
  const buildDate = new Date();

  // Every URL is a locale variant of the same document, so each entry
  // carries the full hreflang set. Sitemap-level alternates and the
  // in-page <link rel="alternate"> tags are meant to agree; both are
  // generated from `routing.locales`, so they cannot drift apart.
  const alternatesFor = (pathAfterLocale: string) => ({
    languages: Object.fromEntries(
      routing.locales.map((l) => [l, `${base}/${l}${pathAfterLocale}`]),
    ),
  });

  const push = (
    locale: string,
    pathAfterLocale: string,
    lastModified: Date,
  ) => {
    entries.push({
      url: `${base}/${locale}${pathAfterLocale}`,
      lastModified,
      alternates: alternatesFor(pathAfterLocale),
    });
  };

  const authorSlugs = getAllAuthorSlugs();

  for (const locale of routing.locales) {
    const places = getAllPlaces(locale as ContentLocale, {
      includeArchived: true,
    });
    const collections = getAllCollections(locale as ContentLocale, {
      includeArchived: true,
    });

    const placeDates = places.map((p) => new Date(p.meta.updatedAt));
    const collectionDates = collections.map(
      (c) => new Date(c.meta.updatedAt),
    );
    const newestAny = newest([...placeDates, ...collectionDates], buildDate);
    const newestCollection = newest(collectionDates, buildDate);

    // The board changes whenever any place or collection on it changes.
    push(locale, "", newestAny);
    push(locale, "/guides", newestCollection);
    push(locale, "/sources", newestAny);
    push(locale, "/about", newestAny);

    // Column landing pages list collection issues, so they move with them.
    for (const col of [
      "/column",
      "/the-setlist",
      "/the-pass",
      "/ladies-and-gentlethem",
    ]) {
      push(locale, col, newestCollection);
    }

    // An author page lists that byline's places; the newest place is the
    // closest honest signal without re-deriving per-author sets here.
    for (const slug of authorSlugs) {
      push(locale, `/author/${slug}`, newest(placeDates, buildDate));
    }

    for (const place of places) {
      push(locale, `/place/${place.meta.slug}`, new Date(place.meta.updatedAt));
    }

    for (const collection of collections) {
      push(
        locale,
        `/collection/${collection.meta.slug}`,
        new Date(collection.meta.updatedAt),
      );
    }
  }

  // /privacy and /terms are intentionally omitted: English-only bodies
  // served under six locale prefixes, all canonicalized to /en.

  return entries;
}
