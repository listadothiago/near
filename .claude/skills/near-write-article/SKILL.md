---
name: near-write-article
description: The one shared pipeline every Near skill uses to actually write and publish a piece — a place page, a blog post/collection, or a standing-column issue. Wraps topic confirmation (near-seo + near-trendsetter, plus near-seo's own backlink-pr consultation), research/sourcing (near-sources, near-deep-researcher), drafting in the right persona's voice per near-tov-police's discipline, near-illustrator for images, near-seo + aeo QA, near-tov-police + near-legal-counsel + chief editor sign-off, near-translator for all six locales, the mechanical publish gates, a git push, and a post-publish handoff to backlink-pr for outreach. Use this instead of improvising the sequence — near-editor, near-blogger, near-war-room, and every standing column editor should call into this rather than each reimplementing it slightly differently.
---

# near-write-article

Near has one real "write and publish a piece" pipeline. Every skill
that produces a published piece — `near-editor` (place pages),
`near-blogger` (long-form guides), `near-adiciona`, `near-war-room`,
and every standing-column editor (RADAR-X on the editorial column,
RUCIO LIBERO on The Setlist, ALLORA DAI on Ladies&Gentlethem,
FOODIE-9000 on The Pass) — should call into this instead of each
inventing its own version of the same nine steps. Consistency here is
what makes `near-tov-police`'s audit and `content/rules.md`'s gates
mean the same thing everywhere.

Mirrors `BACKLOG.md`'s own "Content Creation Flow" note: *"Agents
consult amongst themselves → Choose public persona to write → Persona
writes → Chief Editor, TOV, SEO, Legal revise → Editor/Translators
localize to all locales."* This skill is that flow, made concrete and
complete.

## The pipeline

### 1. Confirm topic and terms — `near-seo` + `near-trendsetter`

Before any drafting: what market/query gap does this fill
(`near-seo`), and is it actually current (`near-trendsetter`, the
internal research role — not to be confused with RADAR-X the byline,
who may separately end up writing the piece). This is the mandatory
joint step every standing column already codifies in its own doc
(`content/editorial-column.md`, `content/the-setlist.md`,
`content/ladies-and-gentlethem.md`, `content/gastronomic-column.md`) —
no column editor, and no other piece produced through this pipeline,
scopes an issue solo. Confirm the specific terms/keywords the piece
should actually target, not just the general topic.

`near-seo` brings its own mandatory `backlink-pr` consultation into this
step (see `near-seo/SKILL.md`) — off-page outreach targets get scoped
alongside the on-page topic, not as an afterthought once the piece is
live.

### 2. Time-bound content: `near-events` first, no exceptions

If the piece is (or could be) hung on a dated event — any standing
column issue, especially — `near-events` runs before any writing
happens, per The Setlist's mandatory-first-research-step precedent.
Real, specific, dated events only (favor further-out dates per the
site-wide standing preference); no invented dates, no "usually happens
around this time of year." If nothing genuine turns up, hold at
`draft` and say so rather than publish something padded.

### 3. Check for an existing place first — `dedupe-by-place`

Before creating any new place, check existing `meta.json` files for
coordinate proximity (haversine < 150m) or a fuzzy name match, per
`content/rules.md`'s `dedupe-by-place` rule. A duplicate mention gets
appended to the existing place's `meta.sources`, not a new slug.

### 4. Research and source — `near-sources` + `near-deep-researcher`

`near-sources` confirms the watched feed this came from still resolves
and is legitimately trusted (auto vs. review — see step 8).
`near-deep-researcher` goes further than a single-pass check whenever
the piece needs real context: cross-referencing multiple sources,
reconciling conflicts, building history/economics/safety/culture
context. Every fact, quote, or observation must trace to a real,
linked source — not just the original ingestion's `sources[0]` — per
`style-guide.md`'s attribution rule. Include genuine negatives a
source raises; don't smooth them into pure positivity.

**Capture any genuinely new source this research turns up.** Research
for a single piece routinely surfaces a source Near wasn't already
watching — a venue's own Instagram/TikTok/site, a regional listicle
site, a local aggregator. Before this piece's `meta.json` gets written,
hand the list of sources actually used to `near-sources`: anything not
already in `content/sources.md` gets logged as a candidate entry in
`content/preferred-sources.md`'s "Candidates not yet in `sources.md`"
section (name, what it's good for/beat, which piece it was found
researching, any access quirks like a login wall). This is what makes
a source *monitorable* going forward — by `near-caretaker` for currency
checks, by the relevant persona's own beat/lens, and by `near-refresh`
once it's graduated into `sources.md` proper — instead of a one-off
lookup that leaves no trace for the next piece that could use it. Don't
wait for `near-refresh`'s own periodic pass to do this; it happens
inline, every piece, the moment a new source is used.

### 5. Choose the persona and write — the right voice, TOV-guided

Pick whichever public persona's beat actually fits (see each
persona's own skill under `.claude/skills/<slug>/` for its character
sheet and any beat-specific advisor lens — `near-editor-gastronomic`,
`near-editor-party`, etc.). If this is a standing column, the column's
editor persona either writes it personally or defers, per that
column's own doc — being editor isn't the same job as being that
issue's writer.

Write following `near-editor/references/style-guide.md` and
`llm-seo.md` directly while drafting, not just as a post-hoc check —
`near-tov-police`'s job in step 7 is confirming the discipline was
followed, not discovering it for the first time. Consult any relevant
specialist advisor lens (gastronomic, luxury, historian, etc.) and, if
a genuine specialist judgment call happened, quote that persona by
name per "Quoting collaborating personas."

### 6. Images — `near-illustrator`

Art-direction call on every piece, no exceptions: hero/thumbnail
choice, whether a gallery is warranted (high bar), whether an original
illustration would out-click available photography. Hero tiers in
preference order: real source photo with attribution → licensed stock
→ original illustration (visibly stylized, never photoreal — a
correctness rule, not taste). Generated images disclose themselves as
AI-generated in `attribution`. If image resolution fails entirely, the
piece is held, not published without one.

### 7. Sign-off — `near-tov-police`, `near-legal-counsel`, then the chief editor

Three distinct checks, in order, each fixing what's actually theirs
rather than rubber-stamping:

- **`near-tov-police`** runs its full voice audit (opening-line bans,
  AI-tell sweep, voice register, honesty rule, age-neutral framing,
  persona-drift check) on the drafted English source. Checks *how*
  it's said.
- **`near-legal-counsel`** checks defamation-adjacent claims (is a
  negative actually sourced, not just stated), real-person likeness/
  consent (the `near-alter-ego` guardrails, if relevant), image
  licensing, AI-disclosure compliance, and trademark/brand-name
  accuracy. Checks *legal exposure*, not tone or substance — most
  pieces should sail through this with no findings.
- **The chief editor** (`near-editor`'s own editorial judgment, or the
  standing column's named editor persona) gives final go-ahead on
  substance and framing. Checks *whether it's the right call at all*.

Findings from any of the three get fixed by the writing persona/
`near-editor`, not waved through — none of the three skips the others.

### 8. Translate — `near-translator`, all six locales

**Every published piece needs all six locales
(`content/rules.md`'s `quality-gate-before-publish` full-locale-coverage
requirement) before it ships, unless it's `trust: review`/`status:
draft` or `status: closed`/`archived`, which don't need localizing.**
This is not a mechanical translation pass — `near-translator` produces
a genuine local edition per persona
(`references/locales/<locale>.md`), re-checking SEO query patterns,
local naming, and what to add/cut per market, not a literal
word-for-word rendering of the English source. Validate every locale's
`dek`/`seoDescription` against `schema.ts`'s length limits before
flipping status. A piece that ships with English-only content and a
"good enough for now" plan for the rest is a bug per this rule, not an
acceptable partial state.

### 9. Mechanical quality gates — before any status flip to `active`

All of `content/rules.md`'s `quality-gate-before-publish` conditions,
checked explicitly, not assumed: tagline ≤ 90 chars, ≥ 3 bullets,
long-form body ≥ 150 words in at least English (a floor, not a target —
write tight, don't pad; see `rules.md` for the 2026-09-01 directive and
its Featured Article/blog/column exceptions), geocode confidence ≥
0.6, hero image resolved, link-density rule passes (real in-text
external + internal links, not just a footer citation block — log a
genuine internal-link gap to `content/requests.md` rather than forcing
a weak one). Alongside that mechanical floor, run `link-police`'s pass
on the same body: it pushes past the one-external-one-internal minimum
toward every genuine linking opportunity, and turns a worthwhile
missing target into a published "coming soon" shell page (linked both
ways) instead of a bare, unlinked mention. Also run `near-seo`'s QA pass
(Mode 2) and `.claude/skills/aeo/SKILL.md`'s citability/structured-data
checks together here — `near-seo` confirms the baseline `llm-seo.md`
discipline was followed, `aeo` confirms the JSON-LD actually matches the
page and the most-liftable sentences survive being quoted alone. For a
standing-column entry specifically: also prepend
the new slug to that column's `content/<column>-index.json` `slugs`
array and its own doc's Series Index — the archive page and RSS feed
only ever show what's listed there.

### 10. Trust gate, then commit and push

`meta.trust: "auto"` (an already-watched, already-trusted source, or
something the operator directly commissioned/named) → write and commit
directly. `meta.trust: "review"` → write `meta.json` + locale files
with `status: "draft"`, **do not commit**, report to the operator for
approval first. Never skip this distinction to save a step.

Before pushing anything: run the actual build (`npm run build`), not
just an assumption that a content-only change is safe — this session's
own mobile-nav incident shipped from an uncommitted, unbuilt state.
Once it passes, commit with a real message (per this repo's normal git
discipline) and push. A `draft` entry stays uncommitted until the
operator approves it; nothing skips step 7's sign-off to get pushed
faster.

Once a piece is genuinely live: hand it to `backlink-pr` as a candidate
for outreach — either pitching it fresh to a new target scoped back in
step 1, or as a lighter-touch note to an existing `relationship` contact
in `content/backlink-outreach.md`. Publishing without ever surfacing the
piece to `backlink-pr` leaves real off-page opportunity on the table.

## What this skill is not

Not a replacement for any of the skills it calls — it's the sequencing
and gate-checking layer on top of them. Not `near-refresh` (which
decides *what* gets written across a whole session) or `near-war-room`
(which convenes the full roster for a themed push) — either of those
can be the thing that decides to invoke this pipeline for a given
piece, but this skill is what actually runs once a piece is chosen.
Not `near-caretaker` (that's maintaining already-published content, a
different pipeline entirely). Not `link-police` (a focused internal
audit this pipeline calls into at step 9, not a competing sequence).
