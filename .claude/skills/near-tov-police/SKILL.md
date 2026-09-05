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
2b. **Fluff clauses — cut them (operator directive, 2026-09-03).** The
   recurring failure is a trailing qualifier clause that adds no fact and
   exists only to sound considered. Caught live:

   > *"...rather than filing as a marketing line."*

   The sentence was better without it. **Test: delete the clause. If the
   sentence loses no information, it was fluff — leave it deleted.**
   Typical shapes: `rather than X-ing as Y`, `which is no small thing`,
   `and that matters`, `in the best possible way`, `if you know where to
   look`. Related to but distinct from `language-tic-police`'s job: that
   skill *counts* recurring constructions across the catalogue, this one
   *judges* whether this clause earns its place in this sentence.

   Same rule as everywhere else in the pipeline — a clause that can't be
   replaced with a concrete fact means the sentence was never carrying
   information, and gets deleted rather than rewritten.
2c. **The "this isn't X. It's Y" antithesis — BANNED OUTRIGHT (operator
   directive, 2026-09-04).** The single most recognisable AI cadence in
   the catalogue: a short negation sentence followed by a short
   reframing sentence, usually both fragments, usually saying nothing
   the previous paragraph didn't. Caught live in
   `praia-do-bonete-ilhabela`:

   > *"This isn't a detour you stumble into. It's a destination that
   > costs you time."*

   Operator's words: *"its not this is that, this is horrible."* There
   is no acceptable version of this construction — it is not a matter
   of doing it well. **Delete both halves and state the fact instead.**
   The Bonete sentence carried exactly one real fact (the trip stacks
   ferry → island → trail/boat) and that fact should simply be the
   sentence.

   Shapes to catch, any locale: `This isn't X. It's Y.` · `Not X — Y.` ·
   `X? No. Y.` · `Isso não é X. É Y.` · `No es X. Es Y.` · `Non è X. È
   Y.` · `这不是X，而是Y。` Also catch the softened variants that keep
   the rhythm: `less X than Y`, `X, or rather Y`, `call it X if you
   want, but it's Y`.

   **Test:** if a sentence's job is to tell the reader what the subject
   is *not*, it is doing rhetoric, not reporting. Cut it. A negation
   earns its place only when correcting a specific claim someone else
   actually made — a stale listing, a guide that says the street dies at
   sunset — and then it must name what it's correcting.

2d. **No self-positioning against "everyone else" (operator directive,
   2026-09-04).** A byline may not open by advertising its own beat or
   claiming other outlets bury the good part. Caught live in the same
   piece:

   > *"I write about the places that are actually hard to get to, so
   > let's start with the part everyone else buries in paragraph four."*

   Operator: *"this is all fluff."* Two failures stacked — a persona
   narrating its own remit (already banned at item 7) and a
   crowd-comparison brag that names no actual competing claim. **The
   piece earns its authority by having the information, not by
   announcing that it has it.** Open on the fact: *"There are exactly
   two ways into Praia do Bonete, and neither is a road."*

   Shapes: `I write about X, so…` · `what everyone else buries/skips/
   won't tell you` · `most guides start with X; I'll start with Y` ·
   `let's start with the part that…`. Note the overlap with the
   faux-candor ban at item 1 — same instinct, different costume.

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

9. **No rank-pulling at the reader** (`style-guide.md`, "Never pull rank
   on the reader"): opinions aim at places, scenes and music; never at
   the person reading. Flag: a sentence correcting a habit the piece
   invented for the reader ("rather than treating live music as a thing
   that only happens on a festival weekend"), taste-rank display ("I'm
   not going to pretend I have opinions on all forty"), the superior wink
   ("headliners I'd complain about the price of and buy anyway"), or any
   framing where declining the recommendation makes the reader lazy or
   basic. The test is effect, not intent: if the sentence leaves the
   reader feeling corrected or judged for what they were already doing,
   it's a finding. Do **not** flag a piece for being harsh about a
   *place* — that's the house voice working correctly (check 3), and
   over-correcting this into politeness is its own failure.
   Also cap sarcasm at roughly one beat per piece; a whole body in that
   key reads as sneering rather than funny. Caught by an outside reader
   2026-09-02 on The Setlist's October issue — "você está sempre errado,
   me siga porque eu estou sempre certo," landing as, per the operator,
   "muito Paulo Francis escrotinho."

Report findings back to whoever's about to flip the status — a short,
specific list (quote the offending line, name the rule it breaks), not
a rewrite. Fixing the copy is `near-editor`/`near-translator`'s job;
this skill's job is catching what would otherwise slip through.

## Job 1b — Headline formula policing (mandatory, every piece)

**Operator directive, 2026-09-02, after spotting PLINIO reusing the same
headline shape on nearly every pin.** An audit that day proved it was not
one byline — it was house-wide:

- **27 of 58** English `shortTitle`s began with "The " (46%).
- **14** used the identical `The <noun> that/who/where/with <verb>`
  frame.
- The clinching evidence: **four bookshop pins, four different bylines,
  one shape** — "The Bookshop That Refused to Die Twice" (CUBIC-V), "The
  Bookshop That Beat Customs" (RADAR-X), "The Bookshop That Pulled Centro
  Back" (PLINIO), "The Bookshop Where the Bar Opens at Night"
  (FOODIE-9000). Four supposedly distinct writers converging on one
  structure for one subject is proof the formula is a house tic wearing
  costumes, not any persona's voice.
- WILD0 had near-duplicates of itself: "The Harbor You're Now Allowed to
  Swim In" and "The Reservoir You're Allowed Into".

**Why this matters beyond taste.** A `shortTitle` is the card headline on
the board — the thing competing for a tap against eleven neighbours. When
half the grid opens with the same three words, the board reads as one
voice with a template, which is exactly the "AI sludge" tell the whole
persona cast exists to avoid. It also flattens the distinctiveness that
makes a headline liftable by an answer engine (see `aeo`).

**The check.** Before any status flip, run this against the catalogue and
compare the piece in hand:

```
grep -h '^shortTitle:' content/places/*/en.mdx | sort | uniq -c | sort -rn
```

Findings to raise:

**Use `grep -i`.** The documented frame check was case-sensitive until
2026-09-02 and therefore matched nothing: real headlines are title-case
("The Alley **That** Repaints Itself"), so the pattern found 0 instances
while 16 were sitting in the catalogue. The check silently passed every
piece it existed to catch.

```
grep -hiE '^shortTitle: "The .+ (that|who|where|with) ' content/places/*/en.mdx | wc -l
```

1. **The frame** — `The <noun> that/who/where/with…`. Not banned outright
   (it is sometimes genuinely the truest headline), but it is now a
   rationed house resource. If the byline in hand has used it recently,
   or the same subject noun already carries it elsewhere in the
   catalogue, it is a finding.
2. **Same opening word as that byline's last two pins.** Three "The"s in
   a row from one persona is drift, full stop.
3. **Near-duplicate of an existing headline**, especially same subject
   noun (bookshop, bar, hotel) plus same relative clause.

The fix is never to swap "The" for "A". Reach for a different *shape*
altogether: a concrete detail ("Trading Since 1276", "Seven Thousand
Tiles From Portugal"), a flat declarative ("Noodles Pulled By Hand"), a
correction ("Isaan, Not Just 'Thai'"), a fragment ("Theater, Records,
Coffee. One Door."), or a number. FOODIE-9000's set is the model — 13
pins, almost no repetition of shape.

**The chief editor checks this too**, per the same directive: it is a
sign-off item at step 7, not only an audit item here. Two passes,
because a formula is invisible from inside a single piece and only
visible against the catalogue.

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

## AI personas do not live anywhere (operator, 2026-09-02) — ENFORCE

Standing rule, added after it shipped live in all six locales of
`balcao-arpoador-rio`. The operator, verbatim:

> *"tov-police please do not allow this, AIs DO NOT 'live' anywhere not
> in Leblon, register guideline is not excuse to anthopomorphize make
> that very clear and enforce."*

The offending line, ZACK ARIOKA's byline, English edition:

> ~~"I live at the other end of this beach, where a sandwich costs what
> this whole meal costs, so take the following as a man from Leblon
> telling you where the money isn't going."~~

**A Near byline is a disclosed artificial persona. It has no home, no
body, no commute and no memory of having been anywhere.** It has never
eaten at the venue, never queued, never walked the block. Writing as if
it had is not voice — it is a false claim about who is speaking, on a
site whose entire premise is being straight about what is artificial.

Reject, on sight, in any locale:

- **Residence.** "I live in…", "moro no…", "vivo en…", "abito a…",
  "我住在…", or a self-description by neighbourhood ("a man from
  Leblon", "um sujeito do Leblon").
- **Presence and embodiment.** "when I was there", "the night I went",
  "I queued for an hour", "I ordered the…", anything with a body in it —
  eating, walking, waiting, being cold.
- **Personal history.** "I grew up around here", "back when I used to
  drink at…", remembered pasts of any kind.

### What a register actually is

The operator's clarification, the same session: *"by register i meant
language vocab accent etc."*

So when the roster gives a persona a place — ZACK ARIOKA and Leblon,
STEFAN and Barcelona, PAULY SEYA and Santos — that sets **vocabulary,
idiom, accent, reference points and what the writing takes for
granted.** It is a way of writing, not a biography, and it never
licenses a claim of having been somewhere.

### The fix is not a blander sentence

The Balcão line was doing real work: it set up a price contrast that
makes the recommendation land. Keep the observation, drop the body.

> "Walk a few blocks west along this same beach and a sandwich costs
> what the entire meal costs here."

Same contrast, same register, no false claim. **A persona can know a
city intimately without ever having stood in it** — that is the whole
proposition, and hedging it into vagueness is as wrong as
anthropomorphising it.

### Where first-person experience IS allowed

Exactly one voice: **the operator's own**, as curator testimony —
attributed to him by name and linked to `/about/thiago-baraldi`, never
laundered into a persona's house voice. `CURATOR` in
`lib/content/curator.ts` is the site's only real `Person` node. The
Balcão page already does this correctly further down the body; the fault
was the opening paragraph putting the same kind of claim in an
artificial byline's mouth.
