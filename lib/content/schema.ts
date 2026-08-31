import { z } from "zod";

export const CATEGORIES = [
  "travel-luxury",
  "world-culture-news",
  "city-culture",
  "food-drink",
  "nightlife-sound",
  "wellness-fitness",
  "accommodation",
] as const;

export const categorySchema = z.enum(CATEGORIES);
export type Category = z.infer<typeof categorySchema>;

// Cross-cutting vibe/audience descriptors — orthogonal to the beat
// categories above (a place's categories say what kind of content it is;
// tags say who it's for / what the scene feels like). Only ever applied
// when the source material actually supports it — see rules.md.
export const TAGS = [
  "lgbtq-friendly",
  "hipster",
  "celebrity-spotted",
  "influencer-favorite",
  "local-legend",
  "late-night",
  "hidden-gem",
  "see-and-be-seen",
  "trending",
] as const;

export const tagSchema = z.enum(TAGS);
export type Tag = z.infer<typeof tagSchema>;

export const LOCALES = ["en", "pt-BR", "it", "es-ES", "es-419", "zh-CN"] as const;
export type ContentLocale = (typeof LOCALES)[number];

export const placeStatusSchema = z.enum([
  "draft",
  "active",
  "archived",
  "closed",
]);
export type PlaceStatus = z.infer<typeof placeStatusSchema>;

export const heroImageStrategySchema = z.enum(["source", "stock"]);

export const heroImageSchema = z.object({
  strategy: heroImageStrategySchema,
  url: z.url(),
  attribution: z.string(),
  attributionLink: z.url(),
  licenseNote: z.string().optional(),
});
export type HeroImage = z.infer<typeof heroImageSchema>;

export const statusHistoryEntrySchema = z.object({
  status: placeStatusSchema,
  at: z.iso.datetime({ offset: true }),
  note: z.string().optional(),
});

export const placeMetaSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  categories: z.array(categorySchema).min(1),
  tags: z.array(tagSchema),
  coordinates: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  }),
  place: z.object({
    city: z.string(),
    neighborhood: z.string().optional(),
    region: z.string().optional(),
    country: z.string(),
  }),
  trust: z.enum(["auto", "review"]),
  // Public AI byline — a slug from lib/content/authors.ts. Optional so
  // places written before the persona roster existed still validate.
  author: z.string().optional(),
  sources: z
    .array(
      z.object({
        name: z.string(),
        url: z.url(),
        feedId: z.string().nullable(),
        originalPublishedAt: z.iso.datetime({ offset: true }).optional(),
      }),
    )
    .min(1),
  heroImage: heroImageSchema.nullable(),
  eventEndsAt: z.iso.datetime({ offset: true }).nullable(),
  status: placeStatusSchema,
  statusHistory: z.array(statusHistoryEntrySchema).min(1),
  geocode: z.object({
    provider: z.string(),
    confidence: z.number().min(0).max(1),
    query: z.string(),
  }),
  publishedAt: z.iso.datetime({ offset: true }),
  updatedAt: z.iso.datetime({ offset: true }),
});
export type PlaceMeta = z.infer<typeof placeMetaSchema>;

export const placeContentFrontmatterSchema = z.object({
  name: z.string().min(1),
  // Magazine-style headline for the listing cards — short and enticing
  // rather than the literal venue name ("Noodles Pulled By Hand", not
  // "Rong He"). Optional: the UI falls back to `name`, so a place that
  // predates this field still renders.
  shortTitle: z.string().min(1).max(48).optional(),
  tagline: z.string().min(1).max(90),
  bullets: z.array(z.string().min(1)).min(3),
  seoDescription: z.string().min(1).max(320),
});
export type PlaceContentFrontmatter = z.infer<
  typeof placeContentFrontmatterSchema
>;

export type PlaceContent = {
  meta: PlaceMeta;
  frontmatter: PlaceContentFrontmatter;
  body: string;
  locale: ContentLocale;
  isFallback: boolean;
};

export type PlaceSummary = {
  meta: PlaceMeta;
  frontmatter: PlaceContentFrontmatter;
  locale: ContentLocale;
  isFallback: boolean;
};

// A "collection" is an editorial story/guide tagging one or more existing
// places — a neighborhood walk with several pins, or a single-place deep
// dive that isn't quite a place page of its own. It has no coordinates of
// its own; its map is the union of its places' pins.
export const collectionMetaSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  placeSlugs: z.array(z.string()).min(1),
  coverImage: heroImageSchema.nullable(),
  trust: z.enum(["auto", "review"]),
  // Not used yet — reserved for a future sponsored-content path. Must be
  // clearly disclosed in the UI wherever it's ever surfaced; see rules.md.
  sponsored: z.boolean(),
  status: placeStatusSchema,
  statusHistory: z.array(statusHistoryEntrySchema).min(1),
  publishedAt: z.iso.datetime({ offset: true }),
  updatedAt: z.iso.datetime({ offset: true }),
});
export type CollectionMeta = z.infer<typeof collectionMetaSchema>;

export const collectionContentFrontmatterSchema = z.object({
  title: z.string().min(1),
  dek: z.string().min(1).max(160),
  seoDescription: z.string().min(1).max(320),
});
export type CollectionContentFrontmatter = z.infer<
  typeof collectionContentFrontmatterSchema
>;

export type CollectionContent = {
  meta: CollectionMeta;
  frontmatter: CollectionContentFrontmatter;
  body: string;
  locale: ContentLocale;
  isFallback: boolean;
};

export type CollectionSummary = {
  meta: CollectionMeta;
  frontmatter: CollectionContentFrontmatter;
  locale: ContentLocale;
  isFallback: boolean;
};
