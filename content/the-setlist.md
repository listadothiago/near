# The Setlist — Near's monthly live-music column

**Decision (2026-09-01, operator confirmed):** Near runs a third
recurring column, distinct from and in addition to the weekly editorial
column (`content/editorial-column.md`) and the monthly LGBTQIAPN+
roundup (`content/ladies-and-gentlethem.md`) — this file mirrors both
their structures. It's a **monthly** live-music column, orchestrated by
**RUCIO LIBERO**, the "Gen Xer. Walking music encyclopedia
(retro/indie). Complains about the volume but knows the setlist"
persona scoped in `BACKLOG.md`'s EPIC 4 roster. The column carries a
neutral name of its own — The Setlist — rather than the orchestrator's
name, so that whichever Near byline actually writes a given issue can
sign it without it looking odd under someone else's name-branded
column. Route slug is `the-setlist`.

## Mandatory first research step — `near-events`, every issue, no exceptions

**Every issue starts with an actual `near-events` skill invocation**
(`.claude/skills/near-events/SKILL.md`), before any writing happens.
This is a hard rule, not something done ad hoc: find real, specific,
dated live-music events (concerts, festivals, tours), favoring events
further out on the calendar over near-term ones, per the site-wide
"favor dated events, further out is better" standing preference. No
invented shows, no rounded-off dates, no "usually happens around this
time of year" claims — a specific date on a primary source (the venue's
own listing, an official festival site, a verified ticketing page) or
it doesn't run. If a given month's `near-events` pass doesn't turn up
enough genuine material, **hold the issue at `draft` and say so** —
publishing something invented or padded to hit a deadline is worse than
a real gap.

## Cadence

One entry per month. `near-refresh` should check this file each run
and, once roughly a month has passed since the last published entry
below, treat scoping the next one (starting with `near-events`) as a
priority — same joint process as the other two columns.

## Rotating writers, RUCIO LIBERO orchestrating

RUCIO LIBERO is the column's permanent orchestrator — every issue is
scoped and signed off by RUCIO LIBERO's editorial judgment — but the
actual byline **rotates to whichever existing Near persona
(`lib/content/authors.ts`) fits that month's real material best**, per
the operator's own framing (2026-09-01): "RUCIO LIBERO doesn't have to
write every single issue personally... if the column is called rucio
libero he would have to sign it and i want him to just orchestrate."
Likely rotation candidates given the roster's beats: STEFAN
(nightlife-sound, for club/venue-adjacent shows), FER VIDA
(underground/queer scenes, once built), CUBIC-V or PLINIO
(city-culture, for a festival with a strong civic/neighborhood angle)
— RUCIO LIBERO writes personally by default when nothing else fits
better. Every entry uses `collectionMetaSchema`'s `author` field, same
mechanism as the other two columns, and is written first-person in
that issue's byline's established voice.

## What makes a good entry

Grounded in what `near-events` actually found that month: real, dated,
verifiable shows worth a reader planning around — not a generic "great
music scene" piece. Ties to a real venue/place via `content/places/`
wherever genuine (`collectionMetaSchema`'s `placeSlugs.min(1)` requires
at least one) — when the month's headline event doesn't have a Near
place of its own, tie honestly to a real venue Near does cover in the
same city/scene rather than forcing a weak link, and log any genuine
gap in `content/requests.md` per the link-density escape hatch
`content/rules.md` documents for `near-editor`.

## Site placement

A short nav label sits in the header, same visual weight as the other
column links (Tips/Guides/Column/L&G/Sources/About), pointing at
`/the-setlist`. That route is an **archive page** — every published
entry, newest first — mirroring `/column` and `/ladies-and-gentlethem`
exactly: reads `content/the-setlist-index.json`'s `slugs`
array, resolves each via `getCollectionContent`, filters to
`status: "active"`, and renders with `CollectionCards`. A dedicated RSS
feed lives at `/the-setlist/feed.xml`, same pattern as the other two,
and is listed in `app/[locale]/layout.tsx`'s feed alternates.

**Whoever flips an entry's `meta.json` `status` from `draft` to
`active` must also prepend its slug to
`content/the-setlist-index.json`'s `slugs` array** — the
archive page and feed only ever show entries listed there, and only if
they're actually `active`. Keep this file's Series Index below in
sync.

## Series index

Chronological, most recent first. Each entry: title, slug, byline,
publish date, one-line topic.

1. **"RUCIO LIBERO: The Strokes and Gorillaz Headline Primavera Sound
   São Paulo"** — `the-setlist-2026-10` — RUCIO LIBERO — published
   2026-09-01. Primavera Sound São Paulo's confirmed Dec 5–6, 2026
   dates at Autódromo de Interlagos (The Strokes/FKA twigs/Lily Allen
   day one, Gorillaz/Arca/Yung Lean day two) as the far-out anchor
   event, with a Baixada Santista-side companion note on catching a
   real local show at Santos's own Teatro Clube da Eskyna in the
   meantime.
