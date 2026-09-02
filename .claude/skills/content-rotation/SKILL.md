# content-rotation

Owns the geographic tier list and rotation cadence for `content/post-plan.md`. Operator directive, 2026-09-01 — supersedes any prior tier list in post-plan.md.

## Tiers

**Tier 1 (repeats 4x before rotating into Tier 2):** London, Brighton, San Francisco, Oakland.

**Tier 2 (rotates in after Tier 1 has cycled 4 times):** Berlin, Amsterdam, Barcelona, Rome, Portland, Mexico City, Las Vegas, Orlando, Chengdu, Bangkok, plus **one rotating surprise-city slot** — near-seo picks a new surprise city each time this slot comes up in rotation, never repeating the same pick twice in a row.

São Paulo / Baixada Santista / Campinas: operator's home region, stays a standing override priority independent of tier rotation (see BACKLOG.md's NEXT-BATCH PRIORITY note) — not slotted into either tier list above.

## The rule

Tier 1 cities get 4 full rotation cycles before Tier 2 gets a turn. One cycle = each Tier 1 city gets one post (per `post-plan.md`'s existing round-robin mechanic). After 4 such cycles, rotate to Tier 2 for one cycle, then back to Tier 1 for another 4.

## Sync obligation

`near-backlog` must keep this file and `content/post-plan.md`'s rotation order in sync — if either changes, update the other in the same session. `post-plan.md` is still the source of truth for per-city queues and what's actually shipped; this file is the source of truth for tier membership and cadence.
