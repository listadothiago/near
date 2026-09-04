# Content schema (mirror of `lib/content/schema.ts`)

The zod schema is the source of truth — this is a human-readable mirror so
you don't have to open the TypeScript file mid-draft. If they ever
disagree, the code wins; update this file to match.

## Categories (`lib/content/categories.ts`)

`travel`, `world-culture-news`, `city-culture`, `food-drink`,
`nightlife-sound`, `wellness-fitness`. A place can belong to more than one —
`meta.categories` is an array (min 1). Use more than one when the place
genuinely spans beats (a converted factory that's both a `city-culture`
creative district and has real `nightlife-sound` — a notable rooftop bar,
say — is legitimately both, not just one with a passing mention of the
other).

## Tags (`lib/content/tags.ts`)

Cross-cutting vibe/audience descriptors, orthogonal to category — a
separate filterable dimension in the UI (its own filter row, not mixed
into the category chips). `meta.tags` is an array, default empty (most
places have none, and that's fine — don't force one on).

`lgbtq-friendly`, `hipster`, `celebrity-spotted`, `influencer-favorite`,
`local-legend`, `late-night`, `hidden-gem`, `see-and-be-seen`.

Apply a tag only when the place's actual character supports it — read the
source, don't guess. `hipster` fits a converted-factory creative complex
with an indie bookstore and street art; it doesn't fit a Michelin-starred
formal dining room just because both are "cool." `lgbtq-friendly` should
be based on something real — the source explicitly describing it as a gay
bar/queer space/Pride-affiliated venue, not an assumption from a
neighborhood's reputation. If nothing in the source supports any tag,
ship the place with `tags: []` — an empty array is a completely normal,
correct result, not a gap to fill.

## Locales

`en`, `pt-BR`, `it`, `es-ES`, `es-419`, `zh-CN`. `en` is canonical/fallback.

## `content/places/<slug>/meta.json`

| field | notes |
|---|---|
| `slug` | lowercase, hyphenated, no locale in it — shared across all languages |
| `categories` | array, min 1, from the categories above — a place can be more than one |
| `tags` | array, default `[]`, from the tags above — only when source-supported |
| `coordinates.lat` / `.lng` | numeric |
| `place.city` | required |
| `place.neighborhood` | optional but preferred — capture it whenever the source names one; Near leans on neighborhood identity |
| `place.region` | optional (state/province) |
| `place.country` | required |
| `author` | optional persona slug from `lib/content/authors.ts` — the public AI byline credited on the listing card and page. Every persona discloses it's an AI; see BACKLOG EPIC 4 |
| `trust` | `auto` or `review`, set once when the place is first created — see SKILL.md trust-gate. Does not change when a later mention is appended via dedupe-by-place |
| `sources` | array, min 1 — every distinct article that has covered this place. One map pin, one page, however many outlets mentioned it |
| `sources[].name` / `.url` | the outlet and article. Dedupe by `url` when appending a new mention — don't list the same article twice |
| `sources[].feedId` | matches an id in `sources.md`, or `null` for near-inbox/chat-originated items |
| `sources[].originalPublishedAt` | ISO datetime, optional |
| `heroImage` | `null` only if resolution genuinely failed and the place therefore isn't published; otherwise `{strategy: "source"\|"stock", url, attribution, attributionLink, licenseNote?}` |
| `eventEndsAt` | ISO datetime, optional. Set only for time-bound happenings (see SKILL.md step 6); for evergreen venues (the common case) write `null` or leave the key out entirely — both parse, and nothing downstream tells them apart |
| `status` | `draft` \| `active` \| `archived` \| `closed` |
| `statusHistory` | append, never rewrite — `{status, at, note?}` |
| `geocode.provider` / `.confidence` (0–1) / `.query` | |
| `publishedAt` / `updatedAt` | ISO datetimes — **full UTC timestamp, never a date-only midnight stamp**. Write the actual moment of publishing (`2026-09-01T22:48:49Z`), not `2026-09-01T00:00:00Z`. The board's Latest tab sorts on `publishedAt` descending, and `Array.sort` is stable: every place sharing a midnight stamp ties, and the tie falls back to the input order, which is the alphabetical slug order from `getAllPlaceSlugs()`. A day's worth of midnight stamps therefore renders Latest as an alphabetical list and pins whatever sorts first (once: `amuse-beach-club-sao-vicente`) to the top of the homepage indefinitely. **`updatedAt` is reader-facing** (operator directive, 2026-09-04): `Dateline.tsx` renders `Revised <date>` from it and `PlaceCard` shows `Rev.`, alongside the JSON-LD `dateModified` and sitemap `lastmod` it already fed. Move it to the real moment of any edit a reader reads or a machine indexes; never backfill it to look fresher. Full rule: `currency-maintenance` in `content/rules.md`. Note `updatedAt` must be **>= `publishedAt`** — 20 of 81 meta files currently violate this, an ingestion bug, not something to paper over by editing dates |

## `content/places/<slug>/<locale>.mdx`

Frontmatter:

| field | notes |
|---|---|
| `name` | the place's name in this locale (usually unchanged across locales) |
| `shortTitle` | optional, **≤ 48 characters** — the magazine-style headline the listing cards show instead of the literal venue name ("Noodles Pulled By Hand," not "Rong He"). Localized per market, not translated word-for-word. Falls back to `name` when absent |
| `tagline` | **≤ 90 characters** — this is enforced and it's tighter than it sounds; write it last, after the body, once you know what's actually distinctive |
| `bullets` | ≥ 3 strings, each a concrete, specific reason — not generic praise |
| `seoDescription` | ≤ 320 chars, used as the page's meta description |

Body: MDX. Plain prose plus `<NearLink slug="other-place-slug">visible text</NearLink>`
for internal cross-links. `slug` must exist in `content/places/` or the
Next.js build fails.

## Quality gate (enforced by `rules.md`, mechanically checked)

Tagline ≤ 90 chars · ≥ 3 bullets · ≥ 600-word English body · hero image
present with attribution · geocode confidence ≥ 0.6.
