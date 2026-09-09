---
name: near-backlog
description: Triage and execute Near backlog items within operator scope using RICE, MoSCoW, current evidence and the shared publishing workflow.
---

# near-backlog

Execution and checkpoint rules: read `docs/workflows/content-execution.md`
once per run. All mandatory per-piece gates remain in force.

The operating method for working through `BACKLOG.md`,
`content/post-plan.md`, and `content/opportunities.md` in a session —
how to pick what's next, how to get it done without babysitting every
step, and how to keep the operator in control of anything that
actually goes live. Not a content-writing skill itself: it's the
scoring/menu/dispatch loop that decides what near-editor, near-seo,
near-write-article, or a code fix actually work on next, session to
session.

## The loop

0-A. **Read uncommitted operator directives BEFORE anything else.**
   Operator directive, 2026-09-03, prompted by a live miss: a piece was
   dispatched to a background agent while 84 lines of new pipeline
   directives sat **uncommitted** in `BACKLOG.md`, invisible to the
   agent, which therefore ran the old pipeline.

   Run **`git diff BACKLOG.md`** (and `git status` for untracked notes)
   at the start of every session. The operator writes directives into
   `BACKLOG.md` in bulk and does not commit them; anything sitting only
   there is **invisible to every skill and every dispatched agent**,
   because agents read `.claude/skills/*`, not the backlog.

   For each new directive, decide which of three it is:

   - **A skill change** → patch the relevant `SKILL.md` **before**
     dispatching any work that would use it. This is the only thing that
     makes a directive stick; a directive quoted into a dispatch prompt
     dies with that run.
   - **A content item** → score it into the menu below like anything
     else.
   - **A product/infra ask** → route to the Product Trio.

   If an agent is **already running** when a relevant directive is
   found, `SendMessage` it the applicable deltas rather than losing the
   run — but still patch the skill file, or the next run repeats the
   miss.

   Cheap check for whether a directive has actually landed:
   `grep -ci "<keyword>" .claude/skills/<skill>/SKILL.md` per directive.
   Prose in `BACKLOG.md` saying a thing "should" happen is **not**
   evidence it was wired in — several such lines have sat unimplemented
   for weeks.

0. **Convene the selection panel — never pick the next item alone.**
   Operator directive, 2026-09-03. Choosing what to act on next is a
   collaborative call, not this skill's solo judgment. Before scoring
   anything, load and genuinely consult each of these, and carry each
   one's actual position into the decision:

   - **`near-trendsetter`** — what is live in the alt-press right now,
     what has a closing window, what is already over. Owns "is this
     still current?"
   - **`near-seo`** — search demand (including the saved trend feeds in
     `content/trends-feeds.md`, checked every run per the 2026-09-03
     operator directive), the query/market gap this fills,
     cannibalisation risk. Co-owns content calls with near-trendsetter
     per the standing rule that those two make content decisions.
   - **The Product Trio — `near-lead-product`, `near-tech-lead`,
     `near-lead-ux`** — owns everything that is not a content call:
     infra, schema, build, and any user-facing consequence. A blocked
     content item (Sister Midnight's `'opening'` status enum, a
     bot-blocked source) is *their* item, not a drafting item, and they
     say whether unblocking it is cheap or not.
   - **`near-cmo`** — distribution, audience growth, and whether the
     piece has anywhere to go once published.
   - **Chief editor** (`near-write-article` step 7's sign-off role) —
     editorial coherence: does this belong on Near at all, does it fit
     what was just published, is the byline right.

   **`near-ceo` breaks ties.** If two functions disagree and neither
   owns the call, that is exactly what that role is for — invoke it
   rather than splitting the difference silently.

   Consulting the panel does not mean five separate agent dispatches
   for a routine pick. Load the skill files and reason in each voice
   in-session; dispatch a real agent only when a function needs actual
   research to have a position (near-seo needing live search data,
   near-trendsetter needing a fresh alt-press read).

   **Record the panel's positions in the menu you present** — the
   operator should see that near-seo wanted X and the chief editor
   wanted Y, not just the winner. A unanimous panel is a fine and
   common outcome; note that too.

1. **Score candidates with RICE *and* MoSCoW, then apply judgment** —
   the two together, because neither alone is enough and the operator
   asked for both:

   - **RICE** gives the ranking within a class of comparable items (see
     the adaptations below).
   - **MoSCoW** gives the *class*: Must / Should / Could / Won't-this-
     time. A Must outranks any Could regardless of RICE score — a
     rules.md violation on live content, a factual error on a published
     page, or an explicit operator ask is a Must even when its RICE
     score is unremarkable. Sort by MoSCoW band first, RICE within the
     band.
   - **Judgment overrides both, and must be stated out loud when it
     does.** The arithmetic is an input, not the decision. If the panel
     picks something the score does not favour, write down why in the
     menu — an unexplained override of a score is how the london-only
     situation persisted for four cycles.

   RICE, adapted to what's actually being compared:
   - **Content pieces** (place/collection candidates): Reach = search/
     audience demand, Impact = how much it moves a real priority
     (seasonal window, operator's home region, an explicit operator
     ask), Confidence = how verified the lead already is, Effort =
     inverse of how much research/translation work remains (a
     pre-verified war-room queue item is Effort 1; a cold lead needing
     a new market's sourcing onboarded is higher).
   - **Market/geography rotation calls**: same shape, but Impact should
     fold in monetization (ad CPM tier by market) whenever the operator
     frames the choice around revenue/lucrativeness rather than pure
     content-gap coverage — don't apply this weighting by default, only
     when that's the stated goal, since `BACKLOG.md`'s standing
     priorities (operator's home region, seasonal timing) are usually
     the right default lens.
   - **Infra/product asks**: Impact should reflect retention/UX value
     against any documented reason the current behavior is what it is
     (a deliberate design comment is a real cost to reversing, not
     nothing) — see the infinite-scroll pass, which kept the original
     footer-reachability safeguard rather than discarding it outright.

2. **Check the queue item isn't already shipped before dispatching** —
   a quick `ls content/places/` / `grep` for the slug or a fuzzy name
   match in the coordinating session, not delegated to the agent as its
   first step. `post-plan.md`'s queue checkboxes have gone stale more
   than once in a single session (Berry Bros & Rudd, Studio Voltaire —
   both already live, both still showing `- [ ]`): dispatching a full
   agent run to discover that costs a run, and once nearly produced a
   duplicate place before the agent reached its own dedupe check. The
   agent's `dedupe-by-place` step (`content/rules.md`) is still
   mandatory as a second check, but don't rely on it as the *first*
   line of defense when a cheap grep here catches it before any agent
   time is spent.

3. **Choose within the operator's authorized scope.** Use RICE/MoSCoW and
   the panel's judgment to proceed. Ask only when a material decision lacks
   authorization or needed information; do not ask again for an already-approved
   task. Any options offered must first pass the already-shipped check.

4. **Execute with one coordinator by default.** Substantial work is not itself
   a reason to spawn a background agent. Use the shared execution contract;
   delegate only an authorized, narrow independent deliverable with a concrete
   benefit. Supply the exact backlog entry, relevant skills, evidence and trust
   constraints, rather than the whole history. Keep mandatory verdicts distinct.

5. **Trust-gate every publish decision** — this is the one step that
   never gets skipped to move faster:
   - `trust: "auto"` (an already-watched/already-trusted source, or a
     lead solid enough on independent re-verification — a 300-year-old
     obviously-still-open institution, say) → the agent may go straight
     to `status: "active"`, all six locales, build-verify, commit, and
     push in the same run, per `near-write-article/SKILL.md` step 10.
   - **Standing rule (2026-09-01 late night, operator directive): the
     chief editor's sign-off (`near-write-article` step 7) counts as
     operator approval.** A `review`-trust piece that passes chief-
     editor sign-off may flip straight to `active` and push — don't
     hold for a separate operator approval round by default.
   - `trust: "review"` (a single aggregator/listicle lead, a thin
     search-snippet find, anything not independently corroborated) →
     the agent writes `status: "draft"` and stops. **Never commits or
     pushes a review-trust piece itself.** It reports back with an
     explicit approve/reject decision point for the operator.
   - An honest "this didn't check out, holding at draft" or "the lead's
     geography/facts were wrong, corrected to X" is a valid, expected
     outcome — not a failure to route around. See the anti-fabrication
     rule in `BACKLOG.md` (~line 129).

6. **On approval of a review-trust draft**, flip `status` to `active`,
   check `content/rules.md`'s `full-locale-coverage` rule before
   pushing (an `active` place needs all six locales — flag and fix the
   gap rather than ship a known rule violation, even if the operator's
   "approve as-is" only asked for the languages already drafted), then
   commit and push.

7. **Keep the durable files current as you go**, same commit as the
   content change where possible, separate commit when the content is
   scoping-only:
   - **Advance the rotation pointer.** `NEXT-UP` in
     `.claude/skills/content-rotation/SKILL.md` is the source of truth
     for whose turn it is — read it before proposing any city's piece,
     and rewrite it in the same commit as a shipped post. A city drawn
     out of turn needs a stated reason in the menu, and an operator
     override does not advance it at all — but **an operator request is
     not an override.** Operator, 2026-09-03: *"i didnt mean to override
     with sitges take my input as any backlog item by default."* His
     asks are ordinary candidates: scored in the menu like everything
     else, and counted against rotation when they ship. Only an explicit
     suspension of the cadence ("London only") is an override. When in
     doubt, treat it as a normal item and say which city's turn it
     spent — the failure mode this fixes is a city's turn quietly never
     being marked served because the work was filed as "operator asked
     for it."
   - Tick off drained `post-plan.md` queue items.
   - Log any newly-used source not already in `content/sources.md` to
     `content/preferred-sources.md`'s candidates section.
   - Write scoping-only output (a `near-seo`/`near-trendsetter` pass
     with no draft yet) to `content/opportunities.md`, not just this
     session's chat — the analysis needs to survive past the session
     that produced it.

8. **Report back concisely** after each dispatched agent returns:
   what got verified (or didn't), what's drafted, what's still open,
   and — if anything needs a decision — the menu for what's next,
   RICE'd, recommendation first.

## What this skill is not

Not a replacement for `near-write-article` (the actual publish
pipeline this dispatches into), `near-seo`/`near-trendsetter`
(the content-decision owners this defers to on what's worth writing),
or `near-lead-product` (infra/product prioritization — this skill's
RICE method applies there too, but the product trio still owns the
actual infra backlog calls). This is the outer loop that decides what
to point those skills at next and how tightly to gate the result before
it goes live.
