---
name: near-war-room
description: The full-roster orchestrator for a themed content push — invokes near-blogger, near-editor, every near-translator locale, the relevant specialist advisor lenses (stefon/party, gastronomic, wellness, historian, art, sports, outdoors, luxury, shopping), near-seo, and near-deep-researcher together to produce real, long-form, engaging content on a topic or destination: itineraries, guides, "best of" selections, routes, blog posts, collections, and pins, all at once rather than one place at a time. Use for any "war room" request — a themed or destination-focused content push bigger than a single near-editor or near-adiciona call.
---

# near-war-room

Near's biggest orchestrator. Where `near-refresh` is the periodic
maintenance-and-steady-growth pass, `near-war-room` is a deliberate,
concentrated push on one topic or destination — the mechanism behind
every "war room [topic]" request in `BACKLOG.md`. It doesn't write
content itself; it convenes the right combination of personas and
sequences their work.

## Roster

Invoke whichever of these actually apply to the topic — not all of them,
every time:

- **`near-deep-researcher`** — first, almost always. Establishes what's
  actually true and current about the topic/destination before anyone
  drafts anything.
- **`near-seo`** (Mode 1) — opportunity-finding: which specific angles/
  places are actually worth covering, per market.
- **`near-editor`** — drafts/updates the actual pins, consulting the
  right specialist lens(es) per place:
  - `near-editor-gastronomic` (food/drink)
  - `near-editor-party` (nightlife broadly) and, sparingly,
    `near-editor-stefon` (the rare eclectic-enough single venue)
  - `near-editor-wellness` (fitness/wellness practice)
  - `near-editor-sports` (joinable/participatory activity, teams,
    rentals)
  - `near-editor-outdoors` (nature/outdoor settings)
  - `near-editor-art` (galleries/street art/collectives)
  - `near-editor-luxury` (high-end coverage)
  - `near-editor-shopping` (retail)
  - `near-editor-historian` (context/history, cross-cutting)
- **`near-blogger`** — the actual long-form piece(s) tying the pins
  together into something a reader wants to read start to finish.
- **`near-translator`** — every locale, for both the pins and the blog
  post(s).
- **`near-illustrator`** — section illustrations if the resulting
  piece(s) are long-form enough to want them.
- **`near-seo`** (Mode 2) — QA pass before publish.

## Pipeline

0. **Drain the local feedback surfaces first.** Before scoping, before
   research, before touching `content/places/`. Read, for anything
   touching this topic or destination:
   - `BACKLOG.md`'s operator directives — the standing ones, not just
     the war-room slate for this city. A directive can redefine the unit
     of work or disqualify a target outright.
   - `content/requests.md` — every entry still marked `status: open`.
   - `content/opportunities.md` — and **correct it in place if it's
     stale**, rather than working around it.
   - `content/photo-requests.md` and `content/photo-inbox/`.
   - `content/_ingestion-log.md` for the last runs on this topic.

   Everything found goes into the scope block in step 1, either folded in
   or explicitly deprioritised with a reason. **Added 2026-09-02 after
   this step's absence cost a real push:** the London war room was scoped
   by re-deriving the city from `content/places/`, while the 2026-09-02
   neighborhoods directive — which disqualifies Soho on saturation and
   makes "take one neighborhood to 4" the unit of work rather than "add
   pins to a city" — sat unread in `BACKLOG.md`. The scope had to be
   rewritten mid-session. Coverage counting is step 3; this is not that.
   This is reading what the operator already decided.

1. **Scope the push.** Take the operator's topic/destination (a
   `BACKLOG.md` war-room entry, or a fresh request) and define what
   "done" looks like: roughly how many pins, whether one blog post or
   several, which locales matter most for this particular topic (a
   Brazil-focused push should prioritize `pt-BR` quality even if every
   locale eventually gets covered).
2. **Research.** `near-deep-researcher` + `near-seo` Mode 1 establish
   the real, current, specific material to work from — named venues,
   teams, events, dates, sources. Refuse to proceed to drafting on a
   topic that research can't actually substantiate; a war room that
   can't find enough real material should report that back rather than
   pad the output with vague content.
3. **Check for existing coverage first.** Before creating anything,
   check `content/places/`, `content/collections/`, and
   `content/preferred-destinations.md`/`preferred-sources.md` for
   overlap — a war room's job is to add real depth, not duplicate what's
   already there. Update/extend existing pins and posts rather than
   forking near-duplicates.
4. **Draft pins.** `near-editor` (+ specialist lenses) creates/updates
   every place the push needs, following the normal quality gate —
   no fabrication, no publishing without a real hero image (draft-and-
   skip per the existing rule if one can't be resolved). War-room input
   is especially likely to include names from an operator's own memory,
   an old list, or a large pasted research document rather than a
   freshly-checked source — exactly the case `rules.md`'s
   `verify-still-open-before-create` rule exists for. Don't skip that
   check just because a name arrived with a lot of other context around
   it; a venue can rebrand or close between when a research document was
   written and when the pin actually gets created.
5. **Draft the narrative layer.** `near-blogger` writes the actual
   guide/itinerary/post(s), cross-linking every pin from step 4 (and to
   each other where relevant) — see `near-blogger`'s own pipeline for
   the mechanics.
6. **Illustrate**, if warranted, via `near-illustrator`.
7. **Localize everything** — every pin and every post, via
   `near-translator` per locale, per the prioritization from step 1.
8. **QA.** `near-seo` Mode 2 checks the batch against the LLM/SEO
   discipline before anything is treated as done.
9. **Log, update backlog, enrich sources.** Append a run summary to
   `content/_ingestion-log.md`. Update `content/preferred-destinations.md`
   and `content/sources.md`/`preferred-sources.md` with anything
   discovered along the way (standing policy — every skill does this,
   war rooms especially, since they generate the most research volume).
   Check off the corresponding item(s) in `BACKLOG.md`.

## Volume and pacing

A single war-room invocation can be large — this is explicitly *not*
`near-refresh`'s tightly-capped `run-volume-cap` regime, since a themed
push is deliberately concentrated. But it should still be scoped to one
coherent topic per run rather than silently trying to clear multiple
unrelated `BACKLOG.md` entries at once — if a request is really several
distinct war rooms (as many of the `BACKLOG.md` entries are, listed
individually on purpose), run them as separate invocations, sequentially
or in parallel background agents, not smashed into one giant pass that's
hard to review or that runs out of budget mid-way (see `BACKLOG.md`'s
"Failed background runs" section for what that failure mode looks like
in practice, and plan run size accordingly).

## Dedupe and the human-content-preservation rule

Same standing policies as every Near content skill (see
`content/rules.md` and the "Cross-cutting skill policies" section of
`BACKLOG.md`): check for and avoid duplicates at every level (places,
collections, sources), and if a war room ever touches a pin originally
created by a human user (once that's possible — see `BACKLOG.md`'s
account/social section), preserve their content and append rather than
overwrite, per that same rule.
