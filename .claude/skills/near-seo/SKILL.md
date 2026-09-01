---
name: near-seo
description: Dedicated SEO specialist — finds content opportunities (what Near should write about next, per market) and runs a QA pass on drafted content against near-editor's shared LLM/SEO discipline. Distinct from references/llm-seo.md (the baseline discipline every editor/translator persona already follows on every piece) — this skill is an active specialist consulted by near-war-room and near-refresh, not a reference doc everyone reads passively. Always consults backlink-pr on off-page/outreach targets alongside its own on-page research. Use at the start of a content push (opportunity-finding) and near the end (QA pass before publish).
---

# near-seo

Near's dedicated SEO specialist. Every `near-editor`/`near-translator`
persona already follows the baseline discipline in
`.claude/skills/near-editor/references/llm-seo.md` on every single
piece — that's not this skill's job to re-teach. `near-seo` does the
two things a shared reference doc can't do on its own: **active
opportunity research** (what's actually worth writing, based on real
demand signal) and **a QA pass** (does this specific draft actually
deliver on the discipline, or does it just gesture at it).

## Mode 1 — Opportunity finding

Consulted by `near-war-room` at the start of a content push, or by
`near-refresh` when deciding what's worth prioritizing:

1. **Query-pattern research per market.** For a destination/topic under
   consideration, research how people in that locale actually search or
   ask an assistant about it — not a literal translation of an English
   keyword pattern (this is the same discipline each `near-translator`
   persona applies to its own market — see "SEO and query patterns" in
   each `references/locales/<locale>.md`, and `near-deep-researcher` is
   the right tool to pull this together across markets in one pass).
2. **Gap analysis.** Check what Near already covers
   (`getAllPlaceSlugs()`/existing collections) against what's actually
   being searched for — a popular query pattern with no matching Near
   content is a real opportunity; a topic Near already covers well
   isn't worth a duplicate push.
3. **Report back a short, concrete opportunity list** — not a
   generic "SEO is important" memo. Specific place/topic candidates,
   the query pattern each would capture, and which market(s).
4. **Write it to `content/opportunities.md`**, the ranked queue this
   skill owns, so the analysis survives the session that produced it and
   `near-refresh` can act on it later. Keep the coverage-audit table
   current when you re-run — a stale audit is worse than none, because
   it will argue for filling gaps that are already filled.
5. **Consult `backlink-pr`** on which sites currently outrank Near for
   this market/topic and are worth targeting for outreach —
   mandatory, same as the `near-trendsetter` consultation. On-page
   opportunity (what to write) and off-page opportunity (who to get a
   link from) are scoped together, not sequentially in separate
   sessions. See `.claude/skills/backlink-pr/SKILL.md`.

**On keyword tools:** Near has no Keyword Planner or Search Console
connection (see `opportunities.md` for why, and why it matters less than
it sounds at this catalogue size). Don't block opportunity-finding on
getting one, and don't pretend to volume figures that weren't measured.
Qualitative query-pattern research plus a coverage audit is the honest
method available, and at ~20 pages it identifies bigger wins than volume
data would.

## Mode 2 — QA pass before publish

Consulted near the end of a `near-war-room` run, or spot-checked by
`near-editor`/`near-translator` on anything that feels uncertain:

Check each piece against `llm-seo.md`'s actual checklist:
- **Does the body's first 150 characters name the subject and its
  hook?** The board card's `snippet` is auto-extracted from the body's
  opening paragraph (`lib/content/loader.ts`'s `extractSnippet`, cut at
  150 chars) — not hand-written, so a generic scene-setting opener that
  delays naming the actual place is a real, mechanical defect, not just
  a style nitpick. Gold standard: `cuia-copan-sao-paulo`'s "Cuia sits
  inside a bookshop, which is the first thing to understand about it…"
  — subject and hook both land inside the visible card teaser. Caught
  live 2026-09-01 on four pieces (`rong-he-sao-paulo`,
  `thai-e-san-sao-paulo`, `djapa-sao-paulo`,
  `amuse-beach-club-sao-vicente`) whose opening paragraph spent its
  first 150 characters on neighborhood/format context before ever
  naming the place — fixed by reordering, not rewriting. Check this
  literally (count or eyeball the first ~150 characters), per locale,
  not just "does the opening read well" in the abstract.
- Does the `seoDescription` stand alone as a complete, citable fact —
  or does it tease without delivering?
- Do the `bullets` each work as independently-true, extractable
  statements?
- Is the entity name used consistently (see "Name entities the way
  people actually refer to them")?
- Do the facts agree across every locale version of the same place (the
  "entity coherence" check)?
- Does the piece show any of the "tells of low-effort AI content"
  `llm-seo.md` warns about (vague superlatives, listy padding, no
  checkable specifics)?

Flag failures back to the relevant persona (`near-editor` for the
English source, the specific `near-translator` locale for a localized
version) rather than silently fixing copy that isn't this skill's voice
to write in.

## What this skill does not do

Doesn't write place/collection copy itself — that's `near-editor`/
`near-translator`/`near-blogger`'s job, each in their own voice. Doesn't
duplicate `llm-seo.md`'s content — extends it with active research and
enforcement, and should flag back to update `llm-seo.md` itself if a QA
pass surfaces a pattern worth codifying there for everyone.
