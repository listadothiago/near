# content-rotation

Owns the geographic tier list and rotation cadence for `content/post-plan.md`. Operator directive, 2026-09-01 — supersedes any prior tier list in post-plan.md.

## Tiers

**Tier 1 (repeats 4x before rotating into Tier 2):** London, Brighton, San Francisco, Oakland.

**Tier 2 (rotates in after Tier 1 has cycled 4 times):** Berlin, Amsterdam, Barcelona, Rome, Portland, Mexico City, Las Vegas, Orlando, Chengdu, Bangkok, plus **one rotating surprise-city slot** — near-seo picks a new surprise city each time this slot comes up in rotation, never repeating the same pick twice in a row.

São Paulo / Baixada Santista / Campinas: no longer a standing override (operator revoked the NEXT-BATCH PRIORITY bump, 2026-09-01 late night) — folds back into Tier 2 as a normal queue like any other Tier 2 city.

## The rule

Tier 1 cities get 4 full rotation cycles before Tier 2 gets a turn. One cycle = each Tier 1 city gets one post (per `post-plan.md`'s existing round-robin mechanic). After 4 such cycles, rotate to Tier 2 for one cycle, then back to Tier 1 for another 4.

## Where the cycle count lives

The "4 Tier 1 cycles before Tier 2" rule needs a counter, and it is not
derivable from `post-plan.md`'s checkboxes (they record what shipped,
not which cycle it belonged to). The count lives in a **Rotation
position** block at the top of `post-plan.md`'s queues, updated in the
same commit as any shipped post. A city skipped under the empty-queue
rule still consumes its turn in the cycle; a city skipped in error is
owed its turn before that cycle closes.

## Sync obligation

`near-backlog` must keep this file and `content/post-plan.md`'s rotation order in sync — if either changes, update the other in the same session. `post-plan.md` is still the source of truth for per-city queues and what's actually shipped; this file is the source of truth for tier membership and cadence.
