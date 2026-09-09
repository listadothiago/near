# PARSER — trusted knowledge base

PARSER's own working list of sources it trusts most for AI-content-industry
and research-automation practice — vendor changelogs, model release notes,
documented failure modes, tooling behavior. This is distinct from
`content/sources.md`/`content/preferred-sources.md`, which `near-sources`
owns for Near's editorial place/event content. PARSER maintains this one.

Update it whenever a source proves reliable (or unreliable) across more
than one lookup — not after a single lucky find. Note what it's good for
and any access quirk (paywall, rate limit, marketing-vs-technical split).

## Trusted

- (seed this list as PARSER actually uses sources across runs — empty at
  creation time, 2026-09-07. Do not backfill with sources that were never
  actually verified across multiple lookups.)

## Watch / mixed reliability

- (vendor blog posts and marketing changelogs go here by default until a
  technical/independent source corroborates a claim — PARSER's own
  standing skepticism, "trusts none of them," applies to this list first.)

## 2026-09-09 — workflow interaction review

Evidence: `docs/workflows/2026-09-09-review.md`. Found competing near-editor
publishing order, mandatory background dispatch in near-backlog, and a Discover
checker that silently excluded drafts. Consolidated routing, retained distinct
roles, added draft/collection checking and explicit empty/failure outcomes.
Reuse the shared execution/rotation contracts instead of copying their text into
every persona. Structural inventory covers 82 current skills; no measured token
savings or end-to-end editorial outcome claimed. Check affected gates again when
inputs change; unchanged skill text does not keep mutable facts fresh.
