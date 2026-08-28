---
name: near-adiciona
description: The "always add" orchestrator — given a place or a link (e.g. a Google Maps/share link dropped in chat), always creates the relevant pin(s), proactively proposes (and, when clearly warranted, creates) an accompanying blog post or collection, fleshes the content out via near-editor and its specialist lenses, and localizes via every near-translator persona. Thin wrapper around near-editor's existing ad-hoc entry point, not a competing pipeline — use this name when the operator's request is "add this" rather than a source-ingestion or near-inbox run.
---

# near-adiciona

The "just add it" skill — named in Portuguese at the operator's own
usage pattern (most ad-hoc "add this place" requests in this project
have come in Portuguese: "adiciona o Balcão," "adiciona o Castro
Theatre"). This is **not a separate content pipeline** from
`near-editor` — it's the orchestration layer that wraps near-editor's
existing third entry point ("ad-hoc chat request," see
`.claude/skills/near-editor/SKILL.md`) and makes the *proactive* parts
of that request explicit and consistent, every time, rather than
depending on the operator to separately ask for a blog post or a
translation each time.

## What "always" means here

Every time this skill runs for a place/link, it always:

1. **Creates the pin** via `near-editor`'s ad-hoc entry point — same
   `trust: review` handling (the operator naming it in chat is the
   approval, per `rules.md`'s `trust-gate` note on operator-named
   places), same quality gate, same dedupe check against existing
   places (haversine/fuzzy-name — see `dedupe-by-place`).
2. **Proactively considers a blog post or collection.** Before finishing,
   always ask: does this place fit naturally into an existing
   collection (append it, don't fragment coverage — see the dedupe
   discipline collections need too, same as places)? Does it, combined
   with what Near already has nearby/in-category, add up to a genuinely
   good new blog-post angle (a neighborhood gaining critical mass, a
   theme with enough real pins behind it now)? If yes, propose it to the
   operator concretely (a real title/angle, not just "should we write a
   post?") and, if the operator has already signaled a standing
   preference for this kind of proactive content (as with the war-room
   backlog), go ahead and hand off to `near-blogger` to draft it.
3. **Fleshes out via near-editor's normal pipeline** — full long-form
   body, real bullets, hero image resolution, the relevant specialist
   lens for its category (gastronomic, wellness, sports, outdoors,
   party, art, luxury, shopping, historian as applicable).
4. **Hands off to every `near-translator` locale** for full six-locale
   coverage, same as any other near-editor-originated place — and to
   localize the accompanying blog post/collection too, if one was
   created in step 2.

## When to use this name vs. calling `near-editor` directly

Functionally near-identical to near-editor's ad-hoc entry point with the
proactive-post-and-full-localization behavior guaranteed rather than
optional. Use `near-adiciona` whenever the request is framed as "add X"
(a name, a link, a share URL) — it's the right default for that shape of
request. For source-ingestion runs or near-inbox triage, use
`near-editor` directly; those aren't this skill's job.

## Dedupe discipline

Applies at every level this skill touches: the place itself
(`dedupe-by-place`), any collection it gets folded into (check existing
collections' `placeSlugs` before creating a near-duplicate one), and
sources discovered along the way (check `content/sources.md` before
adding a source that's already there under a different name).
