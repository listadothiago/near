---
name: near-caretaker
description: Keeps already-published Near content true as the world changes — people who've died or moved on, places that closed or changed hands, prices and "new in 2026" claims that have aged, events that have passed, dead source links. Corrects in place across every locale rather than rewriting, and never flattens a piece's voice to make it age better. Use for a periodic staleness sweep, when the operator flags that something has changed, or when near-refresh dispatches a currency check on existing places.
---

# near-caretaker

Near's maintenance editor. Every other content skill writes; this one
keeps what's already written from quietly becoming false.

## The principle this exists to protect

**Write current, and maintain it. Don't hedge into blandness.**

There's a tempting shortcut where copy is written to never need
updating — no names, no prices, no dates, no "opened last spring,"
nothing that could age. That copy is also lifeless, and it's exactly the
tourist-board register the style guide exists to prevent. "A cocktail bar
in Santa Cecília with a sliding-scale door policy, run since 2019 by
Raquel Braga and Nina Veloso" is a better sentence than "a welcoming
neighbourhood bar," and it is better *because* of the specifics that
will eventually need checking.

So Near writes the good sentence and accepts the maintenance debt. This
skill is how that debt gets paid. A caretaker pass is never an excuse to
strip specificity out of a piece — if a fact has aged, correct the fact,
don't delete the kind of detail that made the piece worth reading.

## What goes stale

Ordered roughly by how badly it reads when missed:

1. **People.** Founders, chefs, owners, resident DJs, namesakes. They
   die, retire, sell up, get fired, leave to open something else. This
   is the worst class to miss because present-tense copy about someone
   who has died is both wrong and callous. Any piece naming a living
   person is carrying this risk permanently. (Precedent: the Dollywood
   page still said the park was "still genuinely hers" six days after
   Dolly Parton died, across all six locales.)
2. **Open/closed/moved.** Covered mechanically by `rules.md`'s
   `confirmed-closed` (two checks, three days apart) and
   `verify-still-open-before-create`. This skill applies those to the
   published catalogue on a schedule rather than only on ingestion.
3. **Ownership and management.** A place bought by a group, a chef
   departing, a rollup acquiring an independent. Often the actual story,
   and often the reason a beloved place got worse — the style guide's
   honesty rule wants that said, not smoothed over.
4. **Numbers.** Prices, ticket tiers, opening hours, "40-plus dishes,"
   "18 years." Prices in particular drift constantly.
5. **Recency claims.** "New," "just opened," "as of this writing,"
   "2026's," "the city's newest." These rot on a fixed schedule and are
   the easiest class to find mechanically.
6. **Events.** Anything with `eventEndsAt` past. Mostly automatic via
   `event-expiry` and `event-belongs-to-venue`, but the prose around an
   event ("its pre-Carnival party earlier this year") ages too.
7. **Link rot.** URLs in `meta.sources` and in-text links that now 404
   or redirect somewhere unrelated. A dead citation is worse than no
   citation, because it looks like sourcing while proving nothing.
8. **Source drift** — a citation that still resolves but no longer
   supports the sentence citing it. Distinct from link rot and *harder*,
   because nothing flags it: the link is green, the page loads, and the
   claim is wrong anyway. The source may have been updated, or the fact
   may simply have moved on since the piece was written. Found on the
   first sweep: the Cuia page said Bel Coelho's Clandestino "closed in
   2020" while the CNN Brasil article it cited was headlined "do Cuia e
   da **Clandestina**", because she'd reopened it in 2024. A 200 status
   code proves a URL exists, not that it still agrees with you.

## Finding candidates

Cheap mechanical passes first, before spending any web searches:

- Grep bodies for recency markers: `\bnew\b`, `just opened`, `recently`,
  `as of this writing`, `this year`, `currently`, a bare year, `still`.
- Grep for named people (capitalised full names in prose) and cross-check
  against the piece's tense.
- Sort by `meta.updatedAt` — oldest first, since nothing has looked at
  those in longest.
- For class 8, HTTP status is not the check. Re-read what the source
  actually says now and compare it to the sentence citing it — at minimum
  for the piece's load-bearing claims, since re-reading every citation on
  every sweep is not affordable. A source whose *title* has changed is a
  cheap tell worth grepping for.
- Weight upward anything with `trending`, several sources, or a Tier 1
  hub city: those get the most traffic, so a stale claim there is seen
  most.

Then verify only what the scan flagged. `run-volume-cap` applies — bound
the work per pass rather than trying to re-verify the whole catalogue.

## Verifying before changing

**Never change a published fact on a single unverified signal**, and that
includes the operator saying so in chat. An operator flag is a strong
prompt to go and check; it is not itself the source. Getting a death or a
closure wrong in either direction is a serious error.

- **A person's death, or a permanent closure:** at least two independent,
  reputable sources before it goes in. For closures, `confirmed-closed`'s
  two-checks-three-days-apart rule still governs the `status` flip.
- **Prices, hours, menu specifics:** the venue's own current page or a
  dated recent article is enough.
- **Anything you cannot verify:** leave the copy alone and log the
  suspicion in `content/_ingestion-log.md`. An unverified suspicion is
  not a licence to hedge the sentence into vagueness — that's the
  blandness this skill exists to prevent.

## Correcting, not rewriting

The published piece represents editorial judgement that was made once and
shouldn't be casually thrown away. So:

- **Fix the specific claim**, in the specific sentence. Don't regenerate
  the body.
- **Check the frontmatter too.** `tagline`, `shortTitle`, `bullets`, and
  `seoDescription` all carry factual claims and are easy to miss when
  reading prose — the Dollywood miss was a bullet and a `seoDescription`
  left asserting present-tense ownership after the body was corrected.
- **Do every locale.** A fact corrected only in English leaves five
  translations lying, and breaks `llm-seo.md`'s entity-coherence rule.
  Dispatch `near-translator` per locale rather than machine-translating
  the correction.
- **Add a sourced note** where the change is the story — a death, a
  closure, a change of hands — rather than silently editing the tense.
  Readers who visited before deserve to see what changed.
- **Append to `statusHistory`** with what changed, what verified it, and
  when. Never rewrite history entries.
- **Set `updatedAt` to the moment you make the correction** — a real
  full timestamp, never `T00:00:00Z`. Operator directive, 2026-09-04.
  This field is now reader-facing: `components/layout/Dateline.tsx`
  renders `Revised <date>` from it and `PlaceCard` shows `Rev.`, on top
  of the JSON-LD `dateModified` and sitemap `lastmod` it already drove.
  Leaving it alone after a correction tells every reader and crawler the
  page hasn't been touched since publication, which is the exact
  falsehood this skill exists to remove. The two corrections that
  prompted the directive — Möbel Olfe, The Stud — sat 5 and 43 minutes
  after their publish stamps and showed nothing.

  Bump it for anything a reader reads or a machine indexes: a corrected
  fact, a status flip, frontmatter, a reworked sentence, a new locale, an
  added source. Don't bump for whitespace or non-rendering fields. A
  same-day fix still bumps honestly — the display rule needs both ≥24h
  and a different UTC day before it claims a revision on the page, so
  small edits won't overstate themselves.

  **Never backfill it, and never bump it on a piece you didn't change.**
  Inventing freshness is the same class of error as inventing a fact.
- **Never delete a page.** Same rationale as `age-decay-archive`: links
  and shares survive the place.
- **Run `link-police`'s pass on any body text you touch.** A currency
  correction is a moment to check the edited sentence still carries its
  external/internal links (or gains a new one the correction created),
  not just to fix the stale fact and move on.

## What this skill does not do

Doesn't write new places or collections — that's `near-editor` and
`near-blogger`. Doesn't decide what to cover next — that's `near-seo` and
`near-refresh`. Doesn't touch human-authored content beyond what
`human-content-preservation` allows (append and flag, never silently
overwrite).

## Working with near-refresh

**Every `near-refresh` run invokes this skill — it's step 1a there, and
it is mandatory.** Not conditional on run scope, not skipped when the
operator names a single destination, not the first casualty when
`run-volume-cap` starts biting (new-place publishing gets cut before this
does). The reason is asymmetry: skipping discovery for one run costs Near
some content it could have had, while skipping a currency pass leaves
falsehoods sitting on a live site indefinitely. The run summary in
`content/_ingestion-log.md` has to record what this pass covered —
including "nothing needed correcting", which is a real result.

`near-refresh`'s step 1 check-open sweep only establishes whether a place
is still trading. This skill is the deeper version of that step, covering all seven staleness classes
above rather than just business status. `near-refresh` dispatches it; it
can also be run standalone when the operator flags a specific change, in
which case verify the flag first (see above) and then sweep for anything
related — one person dying usually means several pages need checking, not
just the one that prompted it.
