---
name: near-editor
description: Fetches items from Near's watched sources (content/sources.md), geocodes the featured place, and generates original content (name, tagline, reasons-to-check-out bullets, long-form article, hero image) in all supported locales per content/rules.md, writing to content/places/ and committing auto-trust sources. Review-trust items (near-inbox submissions, ad-hoc chat requests) are staged as drafts for explicit operator approval and never auto-committed. Use when ingesting new source content, triaging the near-inbox GitHub issues, or adding a place requested directly in chat.
---

# near-editor

Near's editorial pipeline. Turns a source item — an RSS entry, a near-inbox
submission, or a place named directly in chat — into an original Near page:
a name, a tagline, bullet reasons to check it out, a long-form article
comfortable to read, and a hero image, in every locale Near supports.

This is an **editorial** skill, not a scraper. Near never republishes a
source's own copy — every word on a place page is written by Near, informed
by the source but not copied from it.

## Supported locales

`en` (default/canonical), `pt-BR`, `it`, `es-ES`, `es-419`, `zh-CN`. Content
schema and locale list: `lib/content/schema.ts` (`LOCALES`). Mirror of the
schema for reference while writing: `references/content-schema.md`.

## The three entry points

1. **Scheduled/on-demand source ingestion** — read `content/sources.md`,
   process `status: active` sources.
2. **near-inbox triage** — `gh issue list --label near-inbox --state open`
   in the `near` GitHub repo (owner/repo from `NEAR_GITHUB_REPO` env var,
   default `listadothiago/near`). Each issue is one visitor submission
   (suggestion / request / removal / message) filed by `app/api/inbox/route.ts`.
   Place-submission issues become `trust: review` candidates. Removal
   requests get evaluated against `rules.md`'s `confirmed-closed` logic and,
   if the operator approves, transition the target place's status. Close or
   label issues once handled.
3. **Ad-hoc chat request** — the operator names a place directly in
   conversation ("add X in Lisbon"). Always treated as `trust: review` —
   same as near-inbox — never auto-published, per `rules.md`'s `trust-gate`.
4. **Supplemental research pass** — for a place Near already has, search
   the web for additional reviews/coverage beyond the original source(s).
   Every genuinely new source found gets appended to `meta.sources` (dedupe
   by URL) and, if it adds real information, folded into the long-form
   body with an in-text link — see "Attribution and honesty" in
   `references/style-guide.md`, which is the load-bearing rule for this
   entry point: credit everything used, and if a source raises a real
   criticism, include it honestly rather than only keeping the flattering
   parts. This doesn't touch `meta.trust` (an existing `auto` place stays
   `auto`) and follows the same commit/quality-gate rules as any other
   update.

## Pipeline

Read `content/sources.md` and `content/rules.md` first (both are prose +
fenced YAML — parse the YAML block, but read the prose too, it carries
intent the YAML doesn't). Then, per candidate item:

1. **Fetch.** `WebFetch` the source's `feedUrl` and parse RSS/Atom. If
   `feedType: html-extract`, `feedUrl: null`, or the RSS fetch fails/returns
   malformed XML, fall back to `claude-in-chrome`: navigate to the source's
   own listing page and extract items via `get_page_text`/`read_page`
   (title, link, date, blurb, image if present).
2. **Filter to places.** Discard items that aren't about an actual
   place — a venue, a trail, an event location. Generic news, opinion, and
   listicles-about-nothing-specific don't become Near pages.
3. **Apply `run-volume-cap`.** Stop after the configured number of
   successful publishes for this run; log the remainder as deferred in
   `content/_ingestion-log.md`.
4. **Dedupe.** Check every candidate against existing `meta.json` files —
   haversine distance < 150m or a fuzzy name match means "this place
   already exists," not "create a new slug." Append the new item to that
   place's `meta.sources` array (dedupe by `url`) and refresh `updatedAt`;
   leave `meta.trust` as it already is. One map pin, one article, however
   many outlets have covered the place — every distinct mention stays
   linked from the same page. See `dedupe-by-place` in rules.md.
5. **Geocode.** Resolve coordinates for the place (Nominatim/OpenStreetMap —
   no API key, but respect its usage policy: identify with a real
   `User-Agent`, stay under 1 req/sec, cache results). If confidence is
   below the `quality-gate-before-publish` threshold, skip.
6. **Classify event vs. evergreen place.** If the source item describes a
   one-off or time-bound happening (concert, festival run, pop-up,
   exhibition with an end date) rather than a persistent venue, set
   `meta.eventEndsAt` to that happening's end date/time. Most places are
   evergreen — leave `eventEndsAt: null` unless there's a real end date.
   See the `event-expiry` rule.
7. **Resolve the hero image**, in order, per `rules.md`:
   1. The source article's own image — record `attribution` (credit the
      original outlet) and `attributionLink` (back to the source article).
      Be conservative about outlets known to be rights-sensitive or
      paywalled; when in doubt, skip to the next tier rather than assume
      fair use.
   2. A licensed stock photo (Unsplash API / Pexels API — keys come from
      `UNSPLASH_ACCESS_KEY` / `PEXELS_API_KEY` env vars) searched by
      place name + category keywords.
   3. **No further fallback.** There is no AI-generated image tier by
      design. If neither of the above resolves, the place is **skipped**,
      not published without an image — log why in `_ingestion-log.md`.
8. **Write content, English first.** Draft `name`, `tagline` (≤90 chars —
   the schema and `quality-gate-before-publish` both enforce this; write
   tight from the start rather than truncating after), ≥3 bullets, a
   ≥600-word long-form body. See `references/style-guide.md` for voice —
   read it before drafting, it's opinionated about what makes a Near page
   worth finishing. Weave in 2–4 `<NearLink slug="...">` cross-links to
   related existing places (same city/neighborhood/category) — check
   `lib/content/loader.ts`'s `getRelatedPlaces` logic for how relatedness
   is computed, and only link slugs that actually exist
   (`getAllPlaceSlugs()`); an invalid `<NearLink>` fails the Next.js build.
9. **Localize the rest.** For each other supported locale, write an
   adapted version — not a literal translation. Same facts, same
   cross-links (translate the visible text inside `<NearLink>`, keep the
   `slug` prop unchanged), tone and idiom adjusted for that locale. If a
   locale can't be produced this run, it's fine to leave it out — the app
   falls back to English with a "translation pending" note
   (`lib/content/loader.ts`'s `resolveLocaleContent`) rather than 404ing.
10. **Validate.** Every field must satisfy `lib/content/schema.ts`
    (`placeMetaSchema`, `placeContentFrontmatterSchema`) and the
    `quality-gate-before-publish` rule. A schema violation should fail
    loudly, not get silently patched around — see how `npm run build`
    already throws on invalid frontmatter.
11. **Apply `trust-gate`.**
    - `trust: auto` (curated `sources.md` entries) and everything passes:
      write `content/places/<slug>/meta.json` + locale `.mdx` files with
      `status: active`, then `git add` + commit
      (`near-editor: add "<name>" (<city>, <category>)` — one commit per
      place). Update `content/_stats.json` (`placesIndexed`,
      `sourcesWatched`, `lastSyncAt`).
    - `trust: review` (near-inbox, ad-hoc chat) — write with
      `status: draft`. **Do not commit.** Report the draft to the operator
      and wait for explicit approval before writing `status: active` and
      committing.
12. **Log.** Append a run summary to `content/_ingestion-log.md`: sources
    checked, places added/updated/skipped (name the specific failed rule
    for skips), near-inbox issues triaged.

## Notes

- `content/_stats.json` drives the header's status strip on every page —
  keep it current on every committed run.
- Archiving (`age-decay-archive`, `event-expiry`) and closure confirmation
  (`confirmed-closed`) are rules.md-governed housekeeping, not just
  ingestion-time logic — a full run should also sweep existing places for
  rules that now apply (an event whose date passed, a place untouched for
  270+ days), not only process new candidates.
- Never invent a fact. If a source doesn't say something, the long-form
  body shouldn't either — "worth checking out" claims need to trace back to
  something the source (or direct observation via `claude-in-chrome`)
  actually supports.
