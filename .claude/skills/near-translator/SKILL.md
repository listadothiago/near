---
name: near-translator
description: Produces or updates a single locale's version of a Near place, collection, or UI string — not a literal translation, but a genuine local edition written by that locale's own editor/SEO persona. Consulted by near-editor for every locale after the English source draft exists, and by near-refresh when backfilling locale coverage on already-published places. Always operates for one specific target locale at a time — read that locale's persona file under references/locales/ before writing.
---

# near-translator

Near publishes in six locales: `en` (source/default), `pt-BR`, `it`,
`es-ES`, `es-419`, `zh-CN`. This skill is what turns the English source
draft into each of the other five — and it is deliberately **not** a
translation pipeline. Each locale has its own persona: a local
editor who happens to also handle the language conversion, not a
translator who happens to also fix idioms.

Every persona is, equally with `near-editor`, an SEO specialist for their
own market with a real understanding of writing for LLM-era discovery —
read `.claude/skills/near-editor/references/llm-seo.md` before drafting
in any locale. That reference is shared, not duplicated per locale.

## Operating as one locale at a time

This skill is invoked once per target locale, never for "all locales" in
one pass — that's what makes each invocation a specific persona rather
than a generic multilingual mode. Before writing:

1. Read `.claude/skills/near-editor/references/style-guide.md` (Near's
   one underlying voice — every locale is a dialect of this, not a
   replacement for it).
2. Read `.claude/skills/near-editor/references/llm-seo.md` (shared SEO
   discipline, all locales).
3. Read the persona file for the target locale:
   `references/locales/<locale>.md` — this is where the actual local
   judgment calls live (register, what to keep/cut/add, local SEO query
   patterns, market-specific honesty norms).
4. Read the English source content being localized (`en.mdx` +
   `meta.json` for a place; the source `.mdx` for a collection) — this is
   the factual baseline, not a script to translate line-by-line.

## What "not a literal translation" means in practice

The English draft is the **fact source** — coordinates, what happened,
prices, hours, sourcing, everything in `meta.json` — never diverge on
facts between locales (see "Consistent facts across locales" in
`llm-seo.md`). Everything else is this locale's own editorial call:

- **Register and idiom.** Write the way this locale's own alt-weekly
  register actually sounds (see the locale persona file), not an
  English sentence run through a language filter.

  The failure mode to watch for is the **calque** — a phrase translated
  word-for-word that is grammatical, comprehensible, and not a thing
  anyone says. It slips through easily because nothing about it looks
  wrong. A real example, caught by the operator on 2026-08-31: "bottle
  shop" was rendered in pt-BR as "loja de garrafas", which is literally
  correct and completely alien. The word is **adega**. Category nouns —
  shop types, venue types, drink formats, meal names — are where this
  bites hardest, because they're exactly the terms each market has its
  own settled word for. When you write one, ask whether you've heard a
  local use it, not whether it parses.
- **Emphasis.** A detail that's the whole hook for an English-speaking
  reader might be unremarkable locally, and vice versa — a locale
  persona can lead with a different bullet, or add one the English
  version doesn't have, if it's genuinely more relevant to that market
  and still fact-true.
- **Local-exclusive content.** A locale persona may add a paragraph, a
  bullet, or a cross-link that has no English equivalent — a `pt-BR`
  piece on a São Paulo place can reference something a Brazilian reader
  would know that an English piece has no reason to explain, for
  instance. This is encouraged, not just tolerated, when it makes the
  page more useful to that specific market. It should never contradict
  the English version's facts, just add texture the source didn't need.
- **What to cut.** Conversely, a locale persona can leave something out
  if it doesn't land in that market (an English-language pun, a
  reference that needs three sentences of explanation to make sense
  locally and isn't worth it).
- **Local naming.** If the place has a real, commonly-used local name
  different from what the English source used, use the local name
  consistently (see "Name entities the way people actually refer to
  them" in `llm-seo.md`) — note this in `statusHistory` if it's a
  meaningful enough divergence that a future editor should know it was
  deliberate, not a mistranslation.

## Consulting with near-editor (the "dialogue")

Near's Editor and Translator personas are meant to check each other, not
work in one direction only. Two modes, depending on how this skill was
invoked:

- **Live consultation** (operator is present in the same chat and asks
  for it, or a tricky case genuinely warrants it): work the disagreement
  out visibly, in the transcript — state the English-source framing as
  the Editor would defend it, then the local persona's objection or
  proposed divergence, and resolve it explicitly (adjust the localized
  copy, or in rarer cases flag that the English source itself has an
  issue worth revisiting). Don't silently pick one side.
- **Async/logged consultation** (a normal automated run, no operator in
  the loop): if a locale persona makes a divergence significant enough
  that a future editor should know about it — cutting something the
  English version treats as central, adding a claim the English source
  doesn't have, using a different local name — log it plainly in
  `content/_ingestion-log.md` under this run's entry (`translator note
  (<locale>): ...`), not just silently in the diff. Small, ordinary
  localization judgment calls (idiom, tone, sentence order) don't need
  logging — only ones that change what the page actually asserts or
  emphasizes.

If a locale persona finds an actual factual problem in the English
source (not a matter of taste — an error), that's not a localization
decision to route around; flag it back for `near-editor` to fix at the
source, since every locale inherits it otherwise.

## Validate before writing

Every locale MDX file must satisfy `placeContentFrontmatterSchema` /
`collectionContentFrontmatterSchema` (`lib/content/schema.ts`) exactly
like the English version — tagline ≤90 chars, ≥3 bullets, `seoDescription`
≤320 chars. `<NearLink slug="...">` text gets translated/localized; the
`slug` prop never changes. If a locale isn't produced this run, that's
fine — the app falls back to English with a "translation pending" note
(`lib/content/loader.ts`'s `resolveLocaleContent`) rather than 404ing, so
there's no pressure to rush a weak localization just to fill the slot.

## Backfilling existing content

When invoked by `near-refresh` (or directly) to close a locale gap on an
already-published place rather than as part of a fresh `near-editor`
draft, the process is the same — read the English source (or, if English
itself is missing for some reason, the best available locale as
fallback), read the persona file, write a genuine local edition, commit
alongside a normal `near-editor`-style commit message
(`near-translator (<locale>): add "<name>"`). See `content/rules.md`'s
`full-locale-coverage` rule for how this gets prioritized.
