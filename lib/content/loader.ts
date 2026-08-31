import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  LOCALES,
  placeMetaSchema,
  placeContentFrontmatterSchema,
  type ContentLocale,
  type PlaceContent,
  type PlaceSummary,
} from "./schema";

const CONTENT_ROOT = path.join(process.cwd(), "content", "places");

function readMeta(slug: string) {
  const raw = fs.readFileSync(
    path.join(CONTENT_ROOT, slug, "meta.json"),
    "utf8",
  );
  return placeMetaSchema.parse(JSON.parse(raw));
}

function readLocaleFile(slug: string, locale: ContentLocale) {
  const filePath = path.join(CONTENT_ROOT, slug, `${locale}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    frontmatter: placeContentFrontmatterSchema.parse(data),
    body: content,
  };
}

export function getAllPlaceSlugs(): string[] {
  if (!fs.existsSync(CONTENT_ROOT)) return [];
  return fs
    .readdirSync(CONTENT_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function resolveLocaleContent(slug: string, locale: ContentLocale) {
  const direct = readLocaleFile(slug, locale);
  if (direct) return { ...direct, isFallback: false };

  const fallback = readLocaleFile(slug, "en");
  if (!fallback) {
    throw new Error(
      `Place "${slug}" is missing both ${locale}.mdx and the en.mdx fallback.`,
    );
  }
  return { ...fallback, isFallback: true };
}

export function getPlaceContent(
  slug: string,
  locale: ContentLocale,
): PlaceContent | null {
  if (!fs.existsSync(path.join(CONTENT_ROOT, slug, "meta.json"))) return null;
  const meta = readMeta(slug);
  const { frontmatter, body, isFallback } = resolveLocaleContent(
    slug,
    locale,
  );
  return { meta, frontmatter, body, locale, isFallback };
}

export function getPlaceSummary(
  slug: string,
  locale: ContentLocale,
): PlaceSummary | null {
  const content = getPlaceContent(slug, locale);
  if (!content) return null;
  const { body: _body, ...summary } = content;
  void _body;
  return summary;
}

export function getAllPlaces(
  locale: ContentLocale,
  {
    includeArchived = false,
    includeHostedEvents = false,
  }: { includeArchived?: boolean; includeHostedEvents?: boolean } = {},
): PlaceSummary[] {
  return getAllPlaceSlugs()
    .map((slug) => getPlaceSummary(slug, locale))
    .filter((p): p is PlaceSummary => {
      if (!p) return false;
      if (p.meta.status === "draft") return false;
      if (p.meta.status === "archived" && !includeArchived) return false;
      if (p.meta.eventEndsAt && new Date(p.meta.eventEndsAt) < new Date()) {
        return false;
      }
      // An event hosted at a venue Near already lists isn't its own board
      // row or map pin — it would duplicate the venue's card and stack a
      // second marker on identical coordinates. It surfaces on the
      // venue's card instead (see getUpcomingEventsByParent), and keeps
      // its own page for anyone linking straight to it.
      if (p.meta.parentPlace && !includeHostedEvents) return false;
      return true;
    });
}

export type UpcomingEvent = {
  slug: string;
  name: string;
  shortTitle?: string;
  startsAt: string | null;
  endsAt: string;
};

/**
 * Upcoming hosted events, keyed by the venue slug they belong to. Sorted
 * soonest-first, and already filtered to events that haven't ended.
 */
export function getUpcomingEventsByParent(
  locale: ContentLocale,
): Record<string, UpcomingEvent[]> {
  const now = new Date();
  const out: Record<string, UpcomingEvent[]> = {};

  for (const slug of getAllPlaceSlugs()) {
    const p = getPlaceSummary(slug, locale);
    if (!p || !p.meta.parentPlace || !p.meta.eventEndsAt) continue;
    if (p.meta.status !== "active") continue;
    if (new Date(p.meta.eventEndsAt) < now) continue;

    (out[p.meta.parentPlace] ??= []).push({
      slug: p.meta.slug,
      name: p.frontmatter.name,
      shortTitle: p.frontmatter.shortTitle,
      startsAt: p.meta.eventStartsAt ?? null,
      endsAt: p.meta.eventEndsAt,
    });
  }

  for (const list of Object.values(out)) {
    list.sort(
      (a, b) =>
        new Date(a.startsAt ?? a.endsAt).getTime() -
        new Date(b.startsAt ?? b.endsAt).getTime(),
    );
  }
  return out;
}

export function getRelatedPlaces(
  slug: string,
  locale: ContentLocale,
  limit = 4,
): PlaceSummary[] {
  const current = getPlaceSummary(slug, locale);
  if (!current) return [];
  return getAllPlaces(locale)
    .filter((p) => p.meta.slug !== slug)
    .filter(
      (p) =>
        p.meta.categories.some((c) => current.meta.categories.includes(c)) ||
        p.meta.tags.some((t) => current.meta.tags.includes(t)) ||
        (current.meta.place.neighborhood &&
          p.meta.place.neighborhood === current.meta.place.neighborhood) ||
        p.meta.place.country === current.meta.place.country,
    )
    .slice(0, limit);
}

export type NearStats = {
  placesIndexed: number;
  sourcesWatched: number;
  lastSyncAt: string;
};

export function getStats(): NearStats {
  const statsPath = path.join(process.cwd(), "content", "_stats.json");
  const stored = fs.existsSync(statsPath)
    ? (JSON.parse(fs.readFileSync(statsPath, "utf8")) as Partial<NearStats>)
    : {};

  return {
    // Always counted from disk rather than read from _stats.json. The
    // stored number is a snapshot written by the ingestion pipeline and
    // it drifts: it said 16 while the board showed 17, so the footer was
    // telling every visitor the wrong figure. Deriving it means the count
    // and the board can't disagree again, whatever the file says.
    placesIndexed: getAllPlaces("en").length,
    sourcesWatched: stored.sourcesWatched ?? 0,
    lastSyncAt: stored.lastSyncAt ?? new Date().toISOString(),
  };
}

export { LOCALES };
