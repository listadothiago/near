---
name: near-sources
description: Owns content/sources.md and content/preferred-sources.md — verifies watched feeds/pages still resolve, retires dead ones, onboards graduated candidates, and keeps the /sources page honest. Two entry points — run first at the start of every near-refresh (health check before research), and run inline by near-write-article on every piece to capture any newly-found source as a preferred-sources.md candidate so it's monitorable by name for future pieces and by the relevant persona's own beat/lens, not lost after one lookup.
---

# near-sources

Near's whole editorial model rests on trusting real outlets — every
place traces back to a source, and every source has to actually still
exist and actually still be good. This skill is the one that keeps that
trust real instead of assumed. Previously this was done ad hoc by
whoever noticed a dead link mid-refresh; this skill makes it a deliberate
first step instead.

**Operator directive (2026-09-01): every `near-refresh` starts here.**
Check sources before researching anything, so the rest of the run works
from a verified list rather than one that might already have rot in it.

**Second operator directive (2026-09-01): also runs inline from
`near-write-article`, on every piece.** Health-checking is a
per-refresh job, but *capturing* a newly-found source is a per-piece
job — waiting for the next `near-refresh` to log a source discovered
while writing a single place page means it's forgotten by then. See
"Capture new sources found mid-piece" below.

## Capture new sources found mid-piece (the near-write-article entry point)

When called from `near-write-article`'s research step rather than from
`near-refresh`:

1. **Compare what was actually used against `content/sources.md`.**
   Anything not already listed — a venue's own Instagram/TikTok/site, a
   regional outlet, an aggregator — is a genuinely new source.
2. **Log each one as a candidate**, appended to
   `content/preferred-sources.md`'s "Candidates not yet in
   `sources.md`" section: name, what beat/category it's good for, which
   piece it was found researching (with a date), and any access quirk
   worth flagging for whoever checks it next (a login wall, no RSS feed,
   needs `claude-in-chrome` instead of `WebFetch`, etc.). Follow the
   existing entries in that section as the format template — don't
   invent a new structure.
3. **Don't formally onboard into `sources.md` off a single piece.**
   Same standing rule as the near-refresh entry point below: a
   candidate graduates to the full catalog once a second or third
   genuinely good hit shows up across separate pieces/runs, not on the
   first find. This step's whole job is making sure that second hit is
   even possible — a source nobody wrote down doesn't get a second
   chance to prove itself.
4. **Name it for the relevant persona's beat**, not just generically —
   a source found while writing a `nightlife-sound` piece is worth
   flagging as relevant to that persona's own future research, the same
   way `@amuseclub`/`@crisdoquiosque`/`@cantodosursos520` all read as
   Baixada Santista `lgbtq-friendly`/`nightlife-sound` leads in the
   Candidates list today, not just "some Instagram account."

## What to do, in order

1. **Read `content/sources.md` and `content/preferred-sources.md`** —
   prose + fenced YAML/lists, read the prose too.
2. **Verify every `status: active` source still resolves.** `WebFetch`
   the `feedUrl` (or the listing page, for `feedType: html-extract`
   sources) and confirm it returns real content, not a 404, a paywall
   wall, or a domain squat. A source that fails should not be silently
   skipped — mark it `status: paused` in `sources.md` with a note of
   what happened and when, so `near-refresh` doesn't keep trying to pull
   from a dead feed every run.
3. **Weight independent/alt-press sources deliberately.** Per the
   operator's standing instruction (see BACKLOG.md EPIC 5 and the AAN
   member directory reference), Near's trust model favors genuinely
   independent, alt-weekly-style outlets over syndicated or PR-adjacent
   ones. When triaging which sources are "Tier 1" vs lower, an
   independent newspaper/alt-weekly with real local reporting outranks
   a generic listicle aggregator covering the same city — flag any Tier
   1 slot currently held by the weaker kind of source.
4. **Onboard graduated candidates.** If a "Candidates" entry in
   `preferred-sources.md` has now produced a second or third real hit
   across runs (per `near-refresh`'s own step 6), formally add it to
   `sources.md` with `trust`/`category`/`feedUrl`/`feedType` and promote
   it into a tier.
5. **Report a short source-health summary** back to `near-refresh`:
   which sources are live and good, which got paused this run and why,
   which candidates graduated. This summary is what RADAR-X (the
   trendsetter) reads next to find what's actually trending in those
   sources — so it should name the sources, not just say "sources
   checked."
6. **Log it.** Append to `content/_ingestion-log.md` under this run's
   entry, same as near-editor's own logging convention.

## What this skill does not do

Doesn't decide what to write about (that's RADAR-X + `near-seo`'s job,
working from this skill's output) and doesn't write place copy (that's
`near-editor`/`near-translator`). It answers one question only: are the
sources we're about to trust actually still trustworthy right now.

## Still open (see BACKLOG.md EPIC 4b)

The full `/sources` page catalogue rebuild (AAN member directory in
full, Instagram accounts, Londonist-equivalents per hub) and a dedicated
sources-focused war room are bigger asks than this skill's per-refresh
job — tracked separately, not blocked on this skill existing.
