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
  { includeArchived = false }: { includeArchived?: boolean } = {},
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
      return true;
    });
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
        p.meta.category === current.meta.category ||
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
  if (fs.existsSync(statsPath)) {
    return JSON.parse(fs.readFileSync(statsPath, "utf8"));
  }
  return {
    placesIndexed: getAllPlaces("en").length,
    sourcesWatched: 0,
    lastSyncAt: new Date().toISOString(),
  };
}

export { LOCALES };
