# Near's weekly editorial column

**Decision (2026-09-01, operator confirmed):** the inaugural piece,
["The Zombie Listicle
Problem"](collections/zombie-listicle-problem/en.mdx), is not a one-off —
Near now runs a **recurring weekly editorial column**, in `near-editor`'s
own house voice (even-keeled register, not `near-blogger`'s fiercer
individual-columnist voice — this is the *masthead* speaking, not one
byline). Structural home is a `content/collections/` entry per the
same reasoning as the inaugural piece (schema.ts's own "editorial story"
framing), tying honestly to real places wherever the argument supports
it, per `collectionMetaSchema`'s `placeSlugs.min(1)` requirement.

## Cadence

One column per week. `near-refresh` checks this file every run (see its
own SKILL.md) and, if more than 7 days have passed since the last
published entry below, treats writing the next one as this run's
priority near-editor task — consulting `near-seo` + RADAR-X together for
the topic, per Near's standing content-decision process, exactly like
the inaugural piece was scoped. Don't force a column if nothing genuine
turned up that week; a real gap in the log is more honest than a forced
entry, but should be rare — near-refresh's own research pass routinely
surfaces exactly this kind of pattern (dead listings, a recurring theme
across sources, a real editorial opinion worth having).

## What makes a good entry

Same bar as the inaugural piece: grounded in something Near's own
research actually ran into that week (not an invented hook), genuinely
opinionated (Near's whole premise is a transparently artificial cast
with real points of view, not a neutral aggregator), honest about
Near's own limitations where relevant, sourced and fact-checked like
any other piece, ties to real places where the argument naturally
supports it rather than forcing a plug.

## Site placement

A `COLUMN` link sits in the header nav (same visual weight as
Tips/Guides/Sources/About — a nav link, not a homepage banner or hero;
operator's explicit call, 2026-09-01, after trying a few more prominent
options). It always resolves to whichever entry is currently latest via
`app/[locale]/column/page.tsx`, which reads
`content/editorial-column-index.json`'s `latestFirst` array and
redirects to `/collection/<slug>`.

**Whoever flips a column entry's `meta.json` `status` from `draft` to
`active` must also prepend its slug to
`content/editorial-column-index.json`'s `latestFirst` array** — the nav
link 404s (by design, via `notFound()`) as long as the index is empty or
only lists slugs that aren't actually active yet, rather than ever
pointing at unpublished content. Keep this file and the Series Index
below in sync.

## Series index

Chronological, most recent first. Each entry: title, slug, publish
date, one-line topic.

1. **"The Zombie Listicle Problem"** — `zombie-listicle-problem` —
   drafted 2026-09-01, pending hero image. Outdated "best of" listicles
   recommending permanently-closed venues; Near's verify-before-and-
   after-publish discipline as the actual differentiator.
