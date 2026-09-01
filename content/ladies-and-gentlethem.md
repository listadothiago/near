# Ladies&Gentlethem — Near's weekly LGBTQIAPN+ roundup

**Decision (2026-09-01, operator confirmed):** Near runs a second
recurring column, distinct from and in addition to the weekly editorial
column (see `content/editorial-column.md` for that precedent — this
file mirrors its structure). "Ladies&Gentlethem" is a roundup of new
LGBTQIAPN+ content and trends — events, openings, scenes, culture,
media — whatever's genuinely current that week. **Update (2026-09-01,
later same day):** moved from monthly to **weekly** cadence, operator
directive ("make all columns weekly, they're great") — see the Cadence
section below. Route slug is `ladies-and-gentlethem` (URL-safe; the "&"
in the actual title is fine in copy/headings, just not the route).

## Mandatory guidance step — near-seo + near-trendsetter (RADAR-X), every issue, no exceptions

**Standing rule for every Near column editor (2026-09-01, operator directive):** before scoping any issue, the column editor consults `near-seo` (which market/query gap this fills) and `near-trendsetter`/RADAR-X (what's actually current in the alt-press) together, the same joint process that governs every other Near content decision. Applies uniformly across every standing column, this one included, regardless of which persona rotates in as that week's writer — no column editor scopes an issue solo.

## Cadence

**One entry per week (2026-09-01, operator directive: "make all
columns weekly, they're great" — supersedes the original monthly
cadence).** `near-refresh` should check this file each run and, once
more than 7 days have passed since the last published entry below,
treat scoping the next one as a priority — same joint process as the
editorial column (near-seo + near-trendsetter/RADAR-X + near-editor
deciding together what's actually current that week, per the mandatory
guidance step above). Don't force an entry if that week's research
doesn't turn up enough genuine material — a real gap logged in
`content/requests.md` is more honest than a padded roundup, same
standard as any other Near piece.

## What makes a good entry

Grounded in real, current, dated-where-possible material — an actual
book launch, festival, opening, or scene development that happened or
is happening that week, not an evergreen "here's what queer travel
looks like" filler piece. Favor specific dated events, further-out real
dates over vague ones, per Near's standing preference. Ties to real
places via `content/places/` wherever the week's material genuinely
supports it (a queer venue, a Pride event, a scene happening somewhere
real) — `collectionMetaSchema`'s `placeSlugs.min(1)` requires at least
one, same as any collection. When a given week's material genuinely
doesn't support a place tie-in, don't force a weak link — log the gap
in `content/requests.md` instead, same escape hatch `content/rules.md`'s
`link-density` rule documents for near-editor. No fabrication: if
research can't substantiate a full entry's worth of real, current
material, say so and hold at `draft` rather than publish something
thin.

## Column editor: ALLORA DAI

**Added 2026-09-01 (operator directive: "allora dai italian drag queen
gay male italian food connoisseur too obvs create her if doesnt
exist").** ALLORA DAI — a synthetic Italian drag queen, gay, and an
Italian food connoisseur on top of it (`lib/content/authors.ts`, beats
`food-drink` + `nightlife-sound`) — is Ladies&Gentlethem's editor, same
orchestrator model as RADAR-X on the weekly editorial column and RUCIO
LIBERO on the music column: she owns the column's continuity and
quality bar, and writes it personally by default, but defers to
whichever persona actually fits a given week's material. Being editor
is not the same job as being that week's writer.

## Rotating writers

The byline **rotates issue to issue** when ALLORA DAI defers, picked
for whichever existing Near persona (see `lib/content/authors.ts`) has
the most relevant beat/voice for that week's actual material —
"relevant skills are invited to create, rotating writers as needed"
(operator's own words, 2026-09-01). Likely recurring candidates given
the roster's beats: STEFAN (nightlife-sound), PLINIO (city-culture,
world-culture-news), CUBIC-V (city-culture) — but use real judgment per
issue. Every entry uses the `collectionMetaSchema` `author` field
(added for the editorial column's RADAR-X byline, reused here) to
credit that week's writer, and is written first-person in their
established voice. **Per the site-wide credit rule (2026-09-01,
operator directive): whenever the editor and that issue's writer are
different personas, credit both** — editor and author — in the
published piece, not just the byline.

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
