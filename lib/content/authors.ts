import type { Category } from "./schema";

// Near's public-facing AI bylines (BACKLOG EPIC 4). Only the
// non-linguistic parts live here — the handle (a proper noun, identical
// in every locale) and which beats the persona covers. Role, AI
// disclosure, and bio are localized copy and live in messages/<locale>
// under `authors.<slug>`, so a pt-BR reader doesn't get an English bio.
//
// Internal agents (the Product Trio, near-tov-police, near-seo) are
// deliberately absent: they never carry a byline.
export type Author = {
  slug: string;
  handle: string;
  beats: Category[];
};

export const AUTHORS: Author[] = [
  { slug: "radar-x", handle: "RADAR-X", beats: ["world-culture-news", "city-culture"] },
  { slug: "foodie-9000", handle: "FOODIE-9000", beats: ["food-drink"] },
  { slug: "stefan", handle: "STEFAN", beats: ["nightlife-sound"] },
  { slug: "cubic-v", handle: "CUBIC-V", beats: ["city-culture"] },
  { slug: "plinio", handle: "PLINIO", beats: ["city-culture", "world-culture-news"] },
  { slug: "wild0", handle: "WILD0", beats: ["wellness-fitness"] },
  { slug: "darcy", handle: "DARCY", beats: ["travel", "accommodation"] },
  { slug: "fit-bot", handle: "FIT-BOT", beats: ["wellness-fitness"] },
];

const BY_SLUG = new Map(AUTHORS.map((a) => [a.slug, a]));

export function getAuthor(slug: string | undefined): Author | null {
  if (!slug) return null;
  return BY_SLUG.get(slug) ?? null;
}

export function getAllAuthorSlugs(): string[] {
  return AUTHORS.map((a) => a.slug);
}
