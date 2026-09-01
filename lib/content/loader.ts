import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { haversineKm } from "@/lib/geo/haversine";
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
  if (!fallback) return null;
  return { ...fallback, isFallback: true };
}

export function getPlaceContent(
  slug: string,
  locale: ContentLocale,
): PlaceContent | null {
  if (!fs.existsSync(path.join(CONTENT_ROOT, slug, "meta.json"))) return null;
  const meta = readMeta(slug);
  const resolved = resolveLocaleContent(slug, locale);
  // A meta.json without any body yet is a place mid-authoring, not a
  // place. Treat it as absent instead of throwing: one half-written
  // folder was taking down every page that lists places (the home page
  // crashed in dev the moment a meta landed before its en.mdx). The
  // build still surfaces the gap — the pin simply doesn't exist until
  // its English body does.
  if (!resolved) return null;
  const { frontmatter, body, isFallback } = resolved;
  return { meta, frontmatter, body, locale, isFallback };
}

/**
 * The article's opening line, for the board card.
 *
 * A tagline says what a place *is*; a snippet shows how it's *written
 * about*. Carrying both is what separates a card from a directory row —
 * the reader gets a reason to click that a name and a category can't
 * give them.
 *
 * Deliberately taken from the body rather than added as another
 * frontmatter field: a hand-written summary is one more thing to keep in
 * sync across six locales, and it would drift.
 */
function extractSnippet(body: string, max = 150): string {
  const firstPara = body
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .find((block) => block.length > 0 && !block.startsWith("#"));
  if (!firstPara) return "";

  const plain = firstPara
    // JSX tags (NearLink) drop away and leave their label behind.
    .replace(/<[^>]+>/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (plain.length <= max) return plain;
  const cut = plain.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).replace(/[,;:.\s]+$/, "")}…`;
}

export function getPlaceSummary(
  slug: string,
  locale: ContentLocale,
): PlaceSummary | null {
  const content = getPlaceContent(slug, locale);
  if (!content) return null;
  const { body, ...summary } = content;
  return { ...summary, snippet: extractSnippet(body) };
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

/**
 * "Related nearby" is presented to readers as geographic — the copy
 * says "nearby," not "similar" — so distance has to gate candidates,
 * not just tag/category overlap. The old version OR'd shared
 * category/tag in with same-country as equally valid matches, which
 * let a food-drink place in Oakland show up as "nearby" a food-drink
 * place in London: same category, wrong hemisphere. Now proximity is
 * the filter and category/tag overlap is only the tie-breaker among
 * places that are actually close.
 */
export function getRelatedPlaces(
  slug: string,
  locale: ContentLocale,
  limit = 4,
): PlaceSummary[] {
  const current = getPlaceSummary(slug, locale);
  if (!current) return [];

  const MAX_KM = 50;

  return getAllPlaces(locale)
    .filter((p) => p.meta.slug !== slug)
    .map((p) => ({
      place: p,
      distanceKm: haversineKm(
        current.meta.coordinates.lat,
        current.meta.coordinates.lng,
        p.meta.coordinates.lat,
        p.meta.coordinates.lng,
      ),
    }))
    .filter(({ distanceKm }) => distanceKm <= MAX_KM)
    .sort((a, b) => {
      const aShared =
        a.place.meta.categories.some((c) => current.meta.categories.includes(c)) ||
        a.place.meta.tags.some((t) => current.meta.tags.includes(t));
      const bShared =
        b.place.meta.categories.some((c) => current.meta.categories.includes(c)) ||
        b.place.meta.tags.some((t) => current.meta.tags.includes(t));
      if (aShared !== bShared) return aShared ? -1 : 1;
      return a.distanceKm - b.distanceKm;
    })
    .slice(0, limit)
    .map(({ place }) => place);
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
