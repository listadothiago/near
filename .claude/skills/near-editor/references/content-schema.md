# Content schema (mirror of `lib/content/schema.ts`)

The zod schema is the source of truth — this is a human-readable mirror so
you don't have to open the TypeScript file mid-draft. If they ever
disagree, the code wins; update this file to match.

## Categories (`lib/content/categories.ts`)

`travel-luxury`, `world-culture-news`, `city-culture`, `food-drink`,
`nightlife-sound`, `wellness-fitness`.

## Locales

`en`, `pt-BR`, `it`, `es-ES`, `es-419`, `zh-CN`. `en` is canonical/fallback.

## `content/places/<slug>/meta.json`

| field | notes |
|---|---|
| `slug` | lowercase, hyphenated, no locale in it — shared across all languages |
| `category` | one of the categories above |
| `coordinates.lat` / `.lng` | numeric |
| `place.city` | required |
| `place.neighborhood` | optional but preferred — capture it whenever the source names one; Near leans on neighborhood identity |
| `place.region` | optional (state/province) |
| `place.country` | required |
| `trust` | `auto` or `review`, set once when the place is first created — see SKILL.md trust-gate. Does not change when a later mention is appended via dedupe-by-place |
| `sources` | array, min 1 — every distinct article that has covered this place. One map pin, one page, however many outlets mentioned it |
| `sources[].name` / `.url` | the outlet and article. Dedupe by `url` when appending a new mention — don't list the same article twice |
| `sources[].feedId` | matches an id in `sources.md`, or `null` for near-inbox/chat-originated items |
| `sources[].originalPublishedAt` | ISO datetime, optional |
| `heroImage` | `null` only if resolution genuinely failed and the place therefore isn't published; otherwise `{strategy: "source"\|"stock", url, attribution, attributionLink, licenseNote?}` |
| `eventEndsAt` | ISO datetime or `null`. Set only for time-bound happenings (see SKILL.md step 6); `null` for evergreen venues (the common case) |
| `status` | `draft` \| `active` \| `archived` \| `closed` |
| `statusHistory` | append, never rewrite — `{status, at, note?}` |
| `geocode.provider` / `.confidence` (0–1) / `.query` | |
| `publishedAt` / `updatedAt` | ISO datetimes |

## `content/places/<slug>/<locale>.mdx`

Frontmatter:

| field | notes |
|---|---|
| `name` | the place's name in this locale (usually unchanged across locales) |
| `tagline` | **≤ 90 characters** — this is enforced and it's tighter than it sounds; write it last, after the body, once you know what's actually distinctive |
| `bullets` | ≥ 3 strings, each a concrete, specific reason — not generic praise |
| `seoDescription` | ≤ 320 chars, used as the page's meta description |

Body: MDX. Plain prose plus `<NearLink slug="other-place-slug">visible text</NearLink>`
for internal cross-links. `slug` must exist in `content/places/` or the
Next.js build fails.

## Quality gate (enforced by `rules.md`, mechanically checked)

Tagline ≤ 90 chars · ≥ 3 bullets · ≥ 600-word English body · hero image
present with attribution · geocode confidence ≥ 0.6.
