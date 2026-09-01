# Ladies&Gentlethem — Near's monthly LGBTQIAPN+ roundup

**Decision (2026-09-01, operator confirmed):** Near runs a second
recurring column, distinct from and in addition to the weekly editorial
column (see `content/editorial-column.md` for that precedent — this
file mirrors its structure). "Ladies&Gentlethem" is a **monthly**
roundup of new LGBTQIAPN+ content and trends — events, openings,
scenes, culture, media — whatever's genuinely current that month.
Route slug is `ladies-and-gentlethem` (URL-safe; the "&" in the actual
title is fine in copy/headings, just not the route).

## Cadence

One entry per month. `near-refresh` should check this file each run
and, once roughly a month has passed since the last published entry
below, treat scoping the next one as a priority — same joint process as
the weekly column (near-seo + near-trendsetter/RADAR-X + near-editor
deciding together what's actually current that month, per this
session's standing content-decision process). Don't force an entry if
the month's research doesn't turn up enough genuine material — a real
gap logged in `content/requests.md` is more honest than a padded
roundup, same standard as any other Near piece.

## What makes a good entry

Grounded in real, current, dated-where-possible material — an actual
book launch, festival, opening, or scene development that happened or
is happening that month, not an evergreen "here's what queer travel
looks like" filler piece. Favor specific dated events, further-out real
dates over vague ones, per Near's standing preference. Ties to real
places via `content/places/` wherever the month's material genuinely
supports it (a queer venue, a Pride event, a scene happening somewhere
real) — `collectionMetaSchema`'s `placeSlugs.min(1)` requires at least
one, same as any collection. When a given month's material genuinely
doesn't support a place tie-in, don't force a weak link — log the gap
in `content/requests.md` instead, same escape hatch `content/rules.md`'s
`link-density` rule documents for near-editor. No fabrication: if
research can't substantiate a full entry's worth of real, current
material, say so and hold at `draft` rather than publish something
thin.

## Rotating writers

Unlike the weekly editorial column (fixed byline, RADAR-X, speaking as
the masthead), Ladies&Gentlethem's byline **rotates month to month**,
picked for whichever existing Near persona (see `lib/content/authors.ts`)
has the most relevant beat/voice for that month's actual material —
"relevant skills are invited to create, rotating writers as needed"
(operator's own words, 2026-09-01). Likely recurring candidates given
the roster's beats: STEFAN (nightlife-sound), PLINIO (city-culture,
world-culture-news), CUBIC-V (city-culture) — but use real judgment per
month; a new persona for this beat specifically is a legitimate future
option, not decided here. Every entry uses the `collectionMetaSchema`
`author` field (added for the editorial column's RADAR-X byline,
reused here) to credit that month's writer, and is written first-person
in their established voice.

## Site placement

An `L&G` (or equivalent short label) link sits in the header nav,
same visual weight as the other nav links (Tips/Guides/Column/
Sources/About), pointing at `/ladies-and-gentlethem`. That route is an
**archive page** — every published entry, newest first — mirroring
`/column`'s pattern exactly: reads `content/ladies-and-gentlethem-index.json`'s
`slugs` array, resolves each via `getCollectionContent`, filters to
`status: "active"`, and renders with `CollectionCards`. A dedicated RSS
feed lives at `/ladies-and-gentlethem/feed.xml`, same pattern as
`/column/feed.xml`.

**Whoever flips an entry's `meta.json` `status` from `draft` to
`active` must also prepend its slug to
`content/ladies-and-gentlethem-index.json`'s `slugs` array** — the
archive page and feed only ever show entries listed there, and only if
they're actually `active`. Keep this file's Series Index below in sync.

## Series index

Chronological, most recent first. Each entry: title, slug, byline,
publish date, one-line topic.

1. **"Ladies&Gentlethem: September 2026"** —
   `ladies-and-gentlethem-2026-09` — STEFAN — published 2026-09-01.
   Amelia Abraham's *Sex, Clubs, Dissent* (US launch, Leslie-Lohman
   Museum, Sept 8) on queer nightlife's culture-vulture problem;
   Curaçao Pride (Sept 30–Oct 4, Willemstad); a lap through Near's own
   already-covered queer nightlife map from Santos to Amsterdam to
   London.
