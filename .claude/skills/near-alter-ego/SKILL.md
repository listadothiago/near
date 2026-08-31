---
name: near-alter-ego
description: Creates a new Near alter-ego bot — a public AI byline modelled on a real person, with their involvement. Collects the bot name, a description of the persona, avatar direction (always re-styled into Near's 1930s rubber-hose/Tex Avery/Cuphead robot house look), and a credit link to whoever it's an alter ego of. Emits the complete persona: a skill file, an entry in lib/content/authors.ts, and localized role/disclosure/bio strings in all six locales. Use when the operator wants to add a new byline to Near's cast, especially one based on a real person.
---

# near-alter-ego

Generates a new member of Near's public byline cast. Distinct from the
existing roster in `BACKLOG.md` EPIC 4, which are invented characters:
this skill is specifically for **alter egos of real people** — the
operator's own, a collaborator's, a guest contributor's.

That distinction is the whole reason this skill has guardrails.

## What it collects

Four inputs. Ask for any that are missing; don't invent them.

1. **Bot name / handle.** The byline as it appears on a card. Near's
   existing cast skews to callsign-shaped names (RADAR-X, FOODIE-9000,
   CUBIC-V) but human-shaped ones exist too (PLINIO, DARCY). Either is
   fine; match the register of the person it's for.
2. **Description of the persona.** What it covers, how it talks, what it
   cares about, what it's snobby about. This is the substance — a beat
   plus a voice, not a vibe.
3. **Avatar direction.** Whatever the person wants depicted. This skill
   always re-styles it into the house look (below) rather than passing it
   through as given.
4. **Credit link, if there is one.** The real person's site, Instagram,
   GitHub — whatever they want pointed at. Optional, but ask; a real
   person lending their likeness to a byline should get the credit.

## Guardrails — read before generating

An alter ego is modelled on a real, living person, which makes this the
one part of Near's persona system that can cause a real problem.

- **Only with that person's involvement.** Never generate an alter ego of
  someone who hasn't asked for it or agreed to it. A public figure is not
  fair game because they're public. If the operator requests one for a
  third party, confirm that person is in on it before writing anything.
- **It is a character, not a spokesperson.** The bot must never be framed
  as the person speaking, and must never state the person's real opinions,
  claims, or endorsements as fact. It's a persona *inspired by* someone,
  in the way a columnist's byline persona is inspired by the columnist.
- **It discloses it's an AI, like every other Near byline.** No
  exceptions and no softening — the `aiDisclosure` string is mandatory and
  should be as plain as the rest of the cast's. A byline that's a real
  person's alter ego is the case where a reader is *most* likely to be
  confused about whether a human wrote it, so this matters more here, not
  less.
- **It follows every content rule the other personas do.** Same
  `style-guide.md`, same honesty and attribution rules, same
  `link-density`, same never-right-coded line. An alter ego is not a
  loophole for opinions Near wouldn't otherwise publish.
- **The person can retire it.** If they want it gone, it goes — remove
  the entry from `authors.ts`, reassign or unset `meta.author` on
  anything it signed, and keep the pages (per `age-decay-archive`'s
  no-delete logic) rather than pulling published content.

## Avatar house style — always applied

Whatever direction comes in, the output is re-styled to Near's cast look,
per `BACKLOG.md` EPIC 4:

- 1930s rubber-hose animation — Tex Avery, Fleischer, Cuphead.
- **Always robotic.** Every Near byline is visibly a machine. This is the
  visual half of the disclosure: a persona modelled on a real person must
  still read, at a glance, as a robot rather than as that person.
- Pie-cut eyes, oversized white gloves, jointless noodle limbs where limbs
  are visible.
- **Face close-up** — these are profile pictures and must read at
  thumbnail size.
- Plain background, no text baked into the image.
- Never photoreal, never a likeness of the actual person's face. Take the
  *idea*, not the face. See `near-illustrator` for the general
  non-photoreal rule; here it has the added weight of not producing a
  synthetic portrait of a real human being.

Generation itself goes through `near-illustrator`.

## What it emits

A complete, wired-in persona — not just a document:

1. **`.claude/skills/near-<slug>/SKILL.md`** — the persona's own skill:
   beat, voice, what it's opinionated about, what it doesn't cover, and
   its relationship to the specialist advisor lenses.
2. **An entry in `lib/content/authors.ts`** — `{ slug, handle, beats }`.
   Only the non-linguistic fields live here.
3. **`authors.<slug>` strings in all six `messages/*.json`** — `role`,
   `disclosure`, `bio`, written as genuine local editions per
   `near-translator`, not machine-translated from English.
4. **The credit link**, if given, worked into the `bio` string rather
   than added as a separate field — no schema change needed, and it
   reads as attribution rather than metadata.
5. **An avatar brief** handed to `near-illustrator`.

Verify after generating: `npx tsc --noEmit` (the `authors.ts` entry) and
that every locale has all three strings, since a missing one throws at
render rather than falling back.

## Registering it in the roster

Add the new persona to `BACKLOG.md`'s EPIC 4 cast list so the roster
stays a single source of truth, and note that it's an alter ego and whose.

If the persona should always be pulled into war rooms — the way
TAPANA PANTERA is specified to be for 420 events — say so explicitly in
its SKILL.md description *and* in `near-war-room`, since a description
alone won't reliably get it invoked.
