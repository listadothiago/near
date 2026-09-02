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
  /**
   * Set once an avatar exists at public/authors/<slug>.png. Explicit
   * rather than assumed from the slug, so a persona without artwork
   * falls back to its initial instead of requesting a 404.
   */
  hasAvatar?: boolean;
};

export const AUTHORS: Author[] = [
  { slug: "radar-x", handle: "RADAR-X", beats: ["world-culture-news", "city-culture"] },
  // Also editor of The Pass, Near's weekly gastronomic column (added
  // 2026-09-01, operator directive) — see content/gastronomic-column.md.
  { slug: "foodie-9000", handle: "FOODIE-9000", beats: ["food-drink"] },
  { slug: "stefan", handle: "STEFAN", beats: ["nightlife-sound"] },
  { slug: "cubic-v", handle: "CUBIC-V", beats: ["city-culture"] },
  { slug: "plinio", handle: "PLINIO", beats: ["city-culture", "world-culture-news"] },
  { slug: "wild0", handle: "WILD0", beats: ["wellness-fitness"] },
  { slug: "darcy", handle: "DARCY", beats: ["travel"] },
  // hasAvatar is intentionally off. NITE-PORTER has a hand-drawn avatar
  // at public/authors/nite-porter.png, but one illustrated face among eight
  // procedural ones reads as an accident rather than a highlight. Flip this
  // back on when the whole cast has artwork.
  { slug: "nite-porter", handle: "NITE-PORTER", beats: ["accommodation"] },
  { slug: "fit-bot", handle: "FIT-BOT", beats: ["wellness-fitness"] },
  { slug: "lugardo-karai", handle: "LUGARDO KARAI", beats: ["travel"] },
  // Orchestrating voice of the monthly live-music column (BACKLOG EPIC 4
  // roster). Actual writing rotates to whichever persona fits a given
  // month's real material — see content/the-setlist.md.
  { slug: "rucio-libero", handle: "RUCIO LIBERO", beats: ["nightlife-sound"] },
  // Editor of Ladies&Gentlethem (BACKLOG EPIC 4 roster, added 2026-09-01,
  // operator directive). Same orchestrator model as RUCIO LIBERO on The
  // Setlist and RADAR-X on the weekly editorial column — see
  // content/ladies-and-gentlethem.md for the column's editor framing.
  { slug: "allora-dai", handle: "ALLORA DAI", beats: ["food-drink", "nightlife-sound"] },
  // Consultant tier, same as ROVER-5/Eli The DEI Guy: named and quotable
  // per style-guide.md's "Quoting collaborating personas" rule, not a
  // place-writing beat of its own — no `beats`, so it never appears in a
  // category filter. AI-content-creation-industry specialist, invited
  // into the weekly editorial column whenever an entry's AI-process
  // thread (see content/editorial-column.md's standing structure, point
  // 3) would benefit from an actual expert voice instead of the
  // masthead speaking generically about "AI in content."
  // Rio locale editor (BACKLOG EPIC 4 roster, built 2026-09-02 on the
  // operator's request). The roster listed four "local editor" personas —
  // BRICKY (London), PAULY SEYA (SP), DOG IN THE FOG (SF Bay) and this
  // one — as descriptions only; none had an authors.ts entry, so none
  // could actually hold a byline. This is the first of the four to be
  // built. The others remain unbuilt and are tracked in BACKLOG.md.
  { slug: "zack-arioka", handle: "ZACK ARIOKA", beats: ["food-drink", "city-culture"] },
  { slug: "parser", handle: "PARSER", beats: [] },
];

const BY_SLUG = new Map(AUTHORS.map((a) => [a.slug, a]));

export function getAuthor(slug: string | undefined): Author | null {
  if (!slug) return null;
  return BY_SLUG.get(slug) ?? null;
}

export function getAllAuthorSlugs(): string[] {
  return AUTHORS.map((a) => a.slug);
}
