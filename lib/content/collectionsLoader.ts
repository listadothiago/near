import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  collectionMetaSchema,
  collectionContentFrontmatterSchema,
  type ContentLocale,
  type CollectionContent,
  type CollectionSummary,
} from "./schema";

const CONTENT_ROOT = path.join(process.cwd(), "content", "collections");

function readMeta(slug: string) {
  const raw = fs.readFileSync(
    path.join(CONTENT_ROOT, slug, "meta.json"),
    "utf8",
  );
  return collectionMetaSchema.parse(JSON.parse(raw));
}

function readLocaleFile(slug: string, locale: ContentLocale) {
  const filePath = path.join(CONTENT_ROOT, slug, `${locale}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    frontmatter: collectionContentFrontmatterSchema.parse(data),
    body: content,
  };
}

export function getAllCollectionSlugs(): string[] {
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
      `Collection "${slug}" is missing both ${locale}.mdx and the en.mdx fallback.`,
    );
  }
  return { ...fallback, isFallback: true };
}

export function getCollectionContent(
  slug: string,
  locale: ContentLocale,
): CollectionContent | null {
  if (!fs.existsSync(path.join(CONTENT_ROOT, slug, "meta.json"))) return null;
  const meta = readMeta(slug);
  const { frontmatter, body, isFallback } = resolveLocaleContent(
    slug,
    locale,
  );
  return { meta, frontmatter, body, locale, isFallback };
}

export function getCollectionSummary(
  slug: string,
  locale: ContentLocale,
): CollectionSummary | null {
  const content = getCollectionContent(slug, locale);
  if (!content) return null;
  const { body: _body, ...summary } = content;
  void _body;
  return summary;
}

export function getAllCollections(
  locale: ContentLocale,
  { includeArchived = false }: { includeArchived?: boolean } = {},
): CollectionSummary[] {
  return getAllCollectionSlugs()
    .map((slug) => getCollectionSummary(slug, locale))
    .filter((c): c is CollectionSummary => {
      if (!c) return false;
      if (c.meta.status === "draft") return false;
      if (c.meta.status === "archived" && !includeArchived) return false;
      return true;
    });
}

export function getCollectionsForPlace(
  placeSlug: string,
  locale: ContentLocale,
): CollectionSummary[] {
  return getAllCollections(locale).filter((c) =>
    c.meta.placeSlugs.includes(placeSlug),
  );
}
