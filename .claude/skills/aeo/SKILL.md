---
name: aeo
description: Answer Engine Optimization specialist — makes Near's content actually surfaceable and citable by AI answer engines (ChatGPT, Perplexity, Google AI Overviews, Gemini). Extends near-editor/references/llm-seo.md's baseline LLM-citability rules with structured-data and direct-answer-format checks (schema.org/JSON-LD coverage, question-answer framing, standalone-citable claims). Consulted alongside near-seo in near-write-article's pipeline on every piece, and by near-refresh for a periodic structured-data health check. Use whenever the operator asks about AI Overviews, ChatGPT/Perplexity visibility, being cited by an LLM, "answer engine," or getting Near to show up in an AI-generated answer rather than a blue-link result.
---

# aeo

Two different systems read a Near page: a classic search-ranking
crawler, and an answer engine (ChatGPT browsing/search, Perplexity,
Google's AI Overviews, Gemini) that reads the page once and either
quotes it directly or folds its facts into a synthesized answer with or
without a visible citation. `near-seo` + `llm-seo.md` already cover most
of what both audiences want — genuinely specific, honest, well-sourced
writing wins both. This skill is the layer that's specific to the answer
engine case: **structured data an engine can parse mechanically**, and
**content shaped so a lifted fragment reads correctly out of context.**

Read `.claude/skills/near-editor/references/llm-seo.md` first — this
skill extends it, it doesn't restate it. Everything in that file
(front-loaded facts, `seoDescription` as a self-contained citation,
bullets as structured data, entity-name consistency, entity coherence
across locales, avoiding AI-content tells) already serves AEO directly.
Don't re-teach it here; check it's actually been applied, then add what
it doesn't cover.

## What AEO adds on top of `llm-seo.md`

### 1. Structured data actually matches the page

`lib/seo/jsonld.ts` already emits JSON-LD for places and collections —
this is Near's single biggest AEO lever, because structured data is what
lets an answer engine resolve "what is this" and "where is this"
mechanically instead of inferring it from prose. On every piece this
skill touches:

- Confirm the JSON-LD block is actually present and its fields
  (`name`, `address`, `geo`, `description`, `review`/`rating` if
  applicable) agree with the page's own frontmatter — a mismatch between
  visible copy and structured data is worse than no structured data,
  since it's a machine-checkable inconsistency.
- If a new content type is added that `jsonld.ts` doesn't cover yet
  (an event, a person/persona profile, an FAQ block), flag it back to
  the product trio (`near-tech-lead`) rather than letting the piece ship
  with a structured-data gap — this is infrastructure, not copy, so
  `aeo` identifies the gap but doesn't own fixing the schema code itself.

### 2. Direct-answer framing, not just front-loaded facts

`llm-seo.md` already says don't bury the answer under scene-setting.
AEO pushes one step further: **structure the piece so a single sentence
or short block directly answers the question a searcher/prompt most
plausibly asked**, in a form an engine can lift cleanly.

- For a place page: the tagline + `seoDescription` should together
  answer "what is this place and why does it matter" in one lift-able
  unit — this is the same rule as `llm-seo.md`, just confirmed here as
  the AEO-critical field.
- For a blog post/guide/collection: check whether the piece would
  benefit from an explicit question-shaped subhead somewhere the reader
  (and an engine) would expect one — "Is X open on Sundays?" "How much
  does it cost?" "Is it kid-friendly?" — answered in the sentence right
  under it, not scattered across the piece. Don't force this where it
  reads like keyword-stuffing (same honesty bar as everything else in
  `content/rules.md`); a genuinely useful practical-question format
  earns its place, a manufactured one doesn't.
- Never write a claim that only makes sense stitched to the sentence
  before it — the same "bullets as structured data" rule from
  `llm-seo.md`, applied to any standalone-answerable line in the body.

### 3. Citability check: would this survive being quoted alone?

Before sign-off, pull out the 2-3 sentences most likely to get lifted
verbatim (usually the tagline, `seoDescription`, and the strongest
bullet) and read each one with zero surrounding context, as if it were
the only thing an answer engine showed a user. Does it still make sense?
Is it still accurate? Does it still represent Near fairly (not an
out-of-context negative or an overstated positive)? A claim that only
reads correctly with its neighboring sentences is a real AEO defect, not
just a style nitpick.

### 4. Off-page signal is out of scope here — that's `backlink-pr`

Answer engines weight citation/mention frequency and source authority
heavily, same as classic ranking — but earning those citations is
`backlink-pr`'s job (`.claude/skills/backlink-pr/`), not this skill's.
`aeo` makes a piece *worth* citing; `backlink-pr` gets it *actually*
cited elsewhere. The two should stay aware of each other rather than
duplicate effort — if `aeo` notices a piece is genuinely strong and
under-cited externally, flag it to `backlink-pr` as a pitch candidate
rather than silently noting it.

## When this runs

Consulted in `near-write-article`'s pipeline alongside `near-seo`'s QA
pass (step 9, before the mechanical publish gates) — see that skill's
SKILL.md for the exact slot. Also worth a periodic sweep by
`near-refresh` across already-published pieces, since `jsonld.ts`'s
coverage and this skill's own checklist will both grow over time and an
older piece may predate a check that's since been added.

## What this skill does not do

Doesn't write copy — flags gaps back to `near-editor`/`near-translator`/
`near-blogger` the same way `near-seo` does, in whichever locale/voice
the gap was found. Doesn't own the structured-data code itself
(`lib/seo/jsonld.ts` is `near-tech-lead`'s). Doesn't duplicate
`llm-seo.md` — extends it, and any check here that turns out to just be
`llm-seo.md` restated should get folded back into that shared reference
instead of living in two places.

## Note on source material

Built from established AEO practice (structured data coverage,
direct-answer/Q&A framing, standalone-citability checks) rather than a
reviewed transcript — the operator's reference video
(youtube.com/watch?v=58MR03s0ev8) wasn't fetchable for a transcript this
session, but the operator confirmed its scope directly: generative
engine / answer engine / AI-search optimization best practices, i.e.
exactly this skill's territory, not a different topic. That confirms
the checklist above is aimed at the right target, though the video's
specific tactics still haven't been reviewed — worth a real look
(operator watches, summarizes back) to see if it adds anything beyond
what's already codified here.
