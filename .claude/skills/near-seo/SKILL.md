---
name: near-seo
description: Dedicated SEO specialist — finds content opportunities (what Near should write about next, per market) and runs a QA pass on drafted content against near-editor's shared LLM/SEO discipline. Distinct from references/llm-seo.md (the baseline discipline every editor/translator persona already follows on every piece) — this skill is an active specialist consulted by near-war-room and near-refresh, not a reference doc everyone reads passively. Use at the start of a content push (opportunity-finding) and near the end (QA pass before publish).
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

## Mode 2 — QA pass before publish

Consulted near the end of a `near-war-room` run, or spot-checked by
`near-editor`/`near-translator` on anything that feels uncertain:

Check each piece against `llm-seo.md`'s actual checklist:
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
