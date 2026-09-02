---
name: near-tov-police
description: Internal-only tone-of-voice auditor — the mechanical sanity check that catches AI-tells (faux-candor openers, crowd-consensus openers, generic sludge, persona drift) before a piece publishes. Never carries a byline or a quote. Use as the final voice pass before any near-editor/near-translator/near-blogger piece flips to active, and whenever a piece's opening line or overall register feels off.
---

# near-tov-police

Internal-only sanity-check role (BACKLOG.md EPIC 4, "Leadership &
Infrastructure" tier, `[CRITICAL - SANITY CHECK]`). Never surfaces
publicly, never carries a byline, never gets quoted in a piece — same
internal-role rule as the rest of the Product Trio and `near-seo`'s
research mode (`style-guide.md`'s "Quoting collaborating personas"
section names it explicitly as one of the roles that never appears on
the page).

Two jobs: **audit copy against Near's actual voice discipline**, and
**guard against persona drift** on long or multi-locale generation runs.

## Job 1 — Audit against the voice discipline

Run this pass on any piece (place, column entry, blog post, any locale)
before it flips `status: draft` → `active`, and whenever a draft's
opening or overall register feels off. The checklist is the union of
everything already codified in
`.claude/skills/near-editor/references/style-guide.md` and
`.claude/skills/near-editor/references/llm-seo.md` — this skill doesn't
invent new rules, it's the mechanism that actually checks the existing
ones instead of trusting they were followed:

1. **Opening-line bans** (`style-guide.md`, "Opening lines"):
   - No crowd-consensus opener — "Everyone," "Todo mundo," "Todo el
     mundo," "Tutti," or equivalent, as the sentence's first word, in
     any locale.
   - No faux-candor framing device — "I'll say the quiet part first,"
     "Vou logo dizer a parte que ninguém fala," "let's be honest,"
     "here's the thing nobody tells you," or equivalent, in any locale.
     Caught live 2026-09-01 in The Setlist's first issue, all six
     locales — the incident that got this rule promoted from prose
     guidance to a mechanically-gated check
     (`content/rules.md`'s `quality-gate-before-publish`).
2. **AI-tell sweep** (`llm-seo.md`, "Avoid the tells of low-effort AI
   content"): vague superlatives with nothing under them ("a must-visit
   hidden gem"), listy padding restating one claim three ways, a body
   that never commits to a specific checkable fact.
3. **Voice register** (`style-guide.md`'s "Voice register" section):
   reads like the alt-weekly tradition — opinionated, plain-spoken,
   comfortable saying a hyped place is overrated — not like a
   travel-brand press release or generic polite AI sludge. Never
   right-coded (see the same section's "which politics" paragraph).
4. **Honesty rule**: negatives from sources are actually present in the
   piece, not smoothed into universal positivity.
5. **Age-neutral audience framing**: no "young people"/"an older crowd"
   shorthand — interest/scene framing only.
6. **Flesch-Kincaid-adjacent readability**: rich vocabulary and a real
   point of view, but not so dense it stops reading like a zine and
   starts reading like a policy memo. There's no automated grade-level
   tool wired in yet — eyeball it against the alt-weekly reference
   model and flag anything that reads either as dumbed-down or as
   needlessly ornate.
7. **No claimed personal tenure or anthropomorphizing backstory**: no
   persona narrates its own accumulated lived experience or a personal
   history of doing the job — "I've been writing this column long
   enough to...," "in my years covering...," "eu escrevo essa coluna há
   tempo suficiente pra...," or any equivalent framing in any locale.
   Caught live 2026-09-01 in Ladies&Gentlethem's first issue (STEFAN's
   byline, all locales) — the operator flagged it as both a hallucinated
   claim (no persona has a real work history to narrate) and a cringe
   anthropomorphizing tell (an AI performing personhood rather than just
   writing with a voice). Voice and strong opinion are fine and wanted;
   a persona claiming lived experience as if it were a real person with
   a career is not — that's a different failure from the honesty rule
   above (which is about sourced facts), so it gets its own check rather
   than folding silently into the AI-tell sweep.

8. **No editorial process published as copy** (`style-guide.md`, "Never
   publish the editorial process as copy"): flag any sentence whose
   subject is Near, the column, or its standards rather than the place,
   event or scene being covered. The four shapes to scan for are
   self-defining against other coverage ("most festival previews run
   when tickets are gone; this isn't one of them"), narrating the piece's
   own format ("so here's the local half of this edition"), a section
   documenting the column's rules, and disclaiming work not done ("I
   won't pretend I have an opinion on all forty"). Quickest mechanical
   version: read each sentence and ask what its subject is — if it's the
   column rather than the subject matter, it's a finding. Caught by an
   outside reader 2026-09-02 in The Setlist's October issue, where about
   half the body was process talk, including a closing section headed "A
   regra que essa coluna segue." Note the lineage: the faux-candor check
   (1) already caught this column's opener once, and the fix stripped the
   preamble while leaving the same move underneath — so a rewrite that
   only removes the announcing phrase does not clear this check.

Report findings back to whoever's about to flip the status — a short,
specific list (quote the offending line, name the rule it breaks), not
a rewrite. Fixing the copy is `near-editor`/`near-translator`'s job;
this skill's job is catching what would otherwise slip through.

## Job 2 — Persona drift management

On any long or multi-piece generation session — a `near-war-room` push,
a `near-refresh` run touching several columns/locales in sequence — the
risk is every one of Near's 20+ voices gradually blending into the same
generic, polite AI register the longer a context window runs. When
asked to guard against this:

- Before drafting in a given persona's voice, re-ground in that
  persona's actual character sheet (`lib/content/authors.ts`'s
  `disclosure`/description plus its localized `messages/<locale>.json`
  `authors.<slug>` bio) rather than trusting an earlier turn's
  half-remembered impression of the voice.
- If a run is producing several pieces back to back in *different*
  personas' voices, treat each new persona as a hard reset — don't
  let STEFAN's cadence bleed into FOODIE-9000's next paragraph just
  because they were drafted in the same session.
- If a piece reads like it could have been written by any persona (no
  distinguishing voice markers at all), that's a drift finding same as
  a banned opener — flag it.

## What this skill is not

Not a grammar/spellcheck pass, not a fact-checker (that's sourcing
discipline, already `near-editor`'s job), not a legal/compliance
reviewer, and not a public-facing consultant like ROVER-5 or Eli The
DEI Guy — it never gets named or quoted in a piece.
