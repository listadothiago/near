---
name: price-police
description: Internal-only pricing auditor — enforces content/rules.md's sourced-price-ranges gate on every piece with reader-relevant costs, so a sourced price never sits in research notes without making it into the body. Checks for at least a qualitative tier (cheap/mid-range/expensive) grounded in a real source, phrases it as a standalone AEO-liftable answer to "how much does X cost," and never invents a figure. Never carries a byline. Use on every near-write-article pass (step 9, alongside the mechanical gates), same family as link-police and language-tic-police.
---

# price-police

Internal-only role, same family as `near-tov-police`, `language-tic-police`
and `link-police` — never surfaces publicly, never bylined, never quoted in
a piece. Its job is narrow and mechanical: **make sure a sourced price
signal actually reaches the reader**, on every piece where cost is
reader-relevant, not just when the writer happens to remember.

Trigger for this skill existing: TOAD Bakery's first draft in
`near-batch-30`'s 2026-09-07 run had real, sourced pricing evidence sitting
in the evidence packet (a Google Maps price band, a Time Out croissant
price) and shipped with none of it in the body. `sourced-price-ranges` was
already a rule in `content/rules.md`; it just wasn't a checked gate anyone
actually ran, the same failure mode that produced `link-density` and
`link-police`.

## When this runs

- Every `near-write-article` pass, inside step 9 (mechanical quality
  gates), alongside `link-density`/`link-police` and the other checked
  gates — not a replacement for `content/rules.md`'s `sourced-price-ranges`
  rule, the enforcement layer on top of it.
- Any skill that drafts or edits body copy with reader-relevant costs
  directly: `near-editor`, `near-blogger`, `near-caretaker` (price
  corrections during a currency-maintenance pass), `near-translator`
  (per-locale — a translation can drop the price paragraph entirely or
  garble the number), every standing-column editor, `near-adiciona`,
  `near-batch-30`.
- A retroactive sweep over already-published pieces is fair game, same as
  `link-police`'s retroactive sweeps — this is exactly how the TOAD Bakery
  gap surfaced after the fact.

## The check

1. **Does research actually contain a price signal?** A Google Maps price
   band, a menu figure, a ticket price, a UGC price mention, a "free
   admission" fact. If research never looked (the 4-0 floor didn't cover
   it, or the piece genuinely has no reader-relevant cost — a public park,
   a street, a scenic viewpoint), that's a pass with nothing to enforce.
2. **Did that signal make it into the body?** Check the drafted text
   directly, not the evidence packet. A price sourced but never written is
   this skill's whole reason to exist — flag it and send it back to the
   writing persona/`near-editor`, the same escalation path `link-police`
   uses for a missing link.
3. **Is it at least a qualitative tier?** Per `content/rules.md`'s
   never-skip-silently addendum: even without a fresh precise figure, the
   body states cheap / mid-range / expensive, grounded in whatever was
   actually sourced. Never invented from vibes, never inferred from
   dollar-sign badges alone.
4. **Is it phrased as a standalone, liftable answer?** "How much does X
   cost" is one of the most common query/prompt shapes there is. The
   price sentence should read as a complete answer on its own — subject,
   price signal, unit, source — not a clause buried where it needs the
   surrounding paragraph to make sense. Cross-check against `aeo/
   SKILL.md`'s citability checklist; this is the same discipline applied
   specifically to price.
5. **Currency, unit and conditions consistent across all six locales?**
   Same number, same currency symbol, same "per person"/"per dish"/
   "per night" unit in every translation — a locale that drops the price
   paragraph or converts currency without a dated exchange-rate source
   fails this the same way English would.
6. **No fabrication.** Never state a numeric range from badge-only
   signals, never generalize a single sampled hotel quote into a
   year-round rate, never assert a price as current without a
   this-session verification per `sourced-price-ranges`. If nothing
   sourced exists, the correct output is "say so plainly" or silence
   where pricing isn't reader-relevant at all — not a guess.

## What this skill is not

Not a replacement for `content/rules.md`'s `sourced-price-ranges` rule —
that's the substantive standard; this is the checked gate that makes sure
it actually ran. Not `near-seo`/`aeo` (broader QA passes this skill's
price-specific check slots into). Not license to force a price mention
onto a piece with no reader-relevant cost (a public beach, a free plaza) —
the check in step 1 is a real off-ramp, not a formality.
