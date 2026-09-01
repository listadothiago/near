# The Pass — Near's weekly gastronomic column

**Decision (2026-09-01, operator directive: "we need a new gastronomic
weekly column as well, chef is the editor of course").** Near runs a
fourth recurring column, distinct from and in addition to the weekly
editorial column (`content/editorial-column.md`), the music column
(`content/the-setlist.md`), and Ladies&Gentlethem
(`content/ladies-and-gentlethem.md`) — this file mirrors all three
structures. It's a **weekly** food-and-drink column, from day one, per
the same-day "make all columns weekly" directive. The column carries a
neutral name of its own — **The Pass** (the kitchen line where finished
plates are handed off) — rather than the editor's own name, same
reasoning as The Setlist. Route slug is `the-pass`.

## Column editor: FOODIE-9000

FOODIE-9000 (`lib/content/authors.ts`, `food-drink` beat — Near's
existing gastronomy byline, "the chef") is this column's editor, same
orchestrator model as RADAR-X (editorial column), RUCIO LIBERO (music),
and ALLORA DAI (Ladies&Gentlethem): owns the column's continuity and
quality bar, writes it personally by default, but defers to whichever
persona actually fits a given week's material (DARCY for a splurge
kitchen, WILD0 if the hook is a farmers'-market/foraging story, etc.).
Being editor is not the same job as being that week's writer.

## Mandatory guidance step — near-seo + near-trendsetter (RADAR-X), every issue, no exceptions

**Standing rule for every Near column editor (2026-09-01, operator
directive):** before scoping any issue, the column editor consults
`near-seo` (which market/query gap this fills) and
`near-trendsetter`/RADAR-X (what's actually current in the alt-press)
together — same joint process that governs every other Near content
decision. Applies here exactly as it applies to every other standing
column — no column editor scopes an issue solo.

## Cadence

One entry per week. `near-refresh` should check this file each run and,
once more than 7 days have passed since the last published entry below,
treat scoping the next one as a priority — same joint process as the
other three columns. Don't force an issue if that week's research
doesn't turn up enough genuine material — a real gap logged in
`content/requests.md` is more honest than a padded issue, same standard
as any other Near piece. **No entries published yet** — the first issue
is still pending real, current material (a kitchen opening/closing, a
chef move, a genuine food-scene trend near-seo + RADAR-X surface), same
"hold at draft rather than invent" discipline as every other column.

## What makes a good entry

Grounded in something real and current in food/drink — a kitchen
opening or closing, a chef move, a genuinely current technique or
scene development, not a generic "great food scene" filler piece.
Same bar as FOODIE-9000's existing place pieces: snobby about
technique, democratic about location, honest when a kitchen is
coasting. Ties to real places via `content/places/` wherever the
week's material genuinely supports it (`collectionMetaSchema`'s
`placeSlugs.min(1)` requires at least one) — when it doesn't, log the
gap in `content/requests.md` rather than force a weak link, same
escape hatch `content/rules.md` documents for near-editor.

## Rotating writers, FOODIE-9000 orchestrating

The byline rotates to whichever existing Near persona
(`lib/content/authors.ts`) fits that week's real material best when
FOODIE-9000 defers — same "editor's own call" framing as every other
column. Every entry uses `collectionMetaSchema`'s `author` field, and
per the site-wide credit rule (2026-09-01, operator directive): whenever
the editor and that issue's writer are different personas, **credit
both** — editor and author — in the published piece, not just the
byline.

## Site placement

A short nav label lives under the **Columns** dropdown in the header
nav (see `components/layout/Header.tsx`'s `ColumnsMenu`), alongside
Column, L&G, and Music. That route is an **archive page** — every
published entry, newest first — mirroring `/the-setlist` and
`/ladies-and-gentlethem` exactly: reads
`content/the-pass-index.json`'s `slugs` array, resolves each via
`getCollectionContent`, filters to `status: "active"`, and renders with
`CollectionCards`. A dedicated RSS feed lives at `/the-pass/feed.xml`,
same pattern as the other three, and should be listed in
`app/[locale]/layout.tsx`'s feed alternates.

**Whoever flips an entry's `meta.json` `status` from `draft` to
`active` must also prepend its slug to `content/the-pass-index.json`'s
`slugs` array** — the archive page and feed only ever show entries
listed there, and only if they're actually `active`. Keep this file's
Series Index below in sync.

## Series index

Chronological, most recent first. Each entry: title, slug, byline,
publish date, one-line topic.

*(No entries published yet — see Cadence above.)*
