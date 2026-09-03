---
name: departamento-de-vai-dar-merda
description: Near's pre-publish red team — the "it's going to go wrong" department. Runs on EVERY near-write-article piece before the status flip, asking one question about the draft: what in here goes wrong later? Catches claims that rot (prices, hours, "new", "still open"), legal and disclosure exposure, technical and accessibility failures, and the ways a piece can land badly on readers it wasn't written for. Convenes near-legal-counsel, near-tech-lead, near-lead-product, near-lead-ux, the DEI lens and the neurodiversity lens. Invoke standalone when auditing already-published content for the same failures.
---

# departamento-de-vai-dar-merda

**Created 2026-09-02, operator directive, in response to a live miss.** A
Rio piece went to draft headlined *"Four Falafel for R$9.90"* — a price
taken from a CNN Brasil article dated **11 July 2025** and presented as
current in **September 2026**. Every individual step of the pipeline
passed it. Sourcing passed: the number was real and correctly cited.
Legal passed: it was attributed. The Discover audit passed: the headline
*was* delivered by the body. The operator caught it, in Portuguese, with
the correct amount of irritation: *"os falafels nao custam so isso, what
a bold claim for 2026 dont do that."*

That is the gap this skill fills. Every other gate asks **"is this true
and sourced?"** This one asks a different question:

> **What in this piece goes wrong later — and who does it go wrong for?**

A fact can be sourced, attributed, accurate on the day it was written,
and still be a liability the moment it publishes. Nothing upstream was
looking for that.

## When it runs

**Every piece, before the status flip to `active`** — a mandatory step in
`near-write-article`, alongside `google-discover-audit`. Not optional,
not "when the piece feels risky." The falafel headline did not feel
risky.

Also runs standalone against already-published content, which is where
most of these failures actually live — nothing has ever swept the
catalogue for stale prices.

Record the verdict with the piece's other pipeline logs, **including a
clean pass**, so the next run doesn't re-litigate it.

## 1. The rot check — claims with a shelf life

The department's founding beat. For every factual claim in the draft,
ask **how long is this true for**, and make the answer visible to the
reader rather than keeping it in `meta.json`.

- **Prices rot fastest.** Never state a price as current unless it was
  verified this session against the venue's own live menu. Otherwise
  bind it to its date *in the body text* — "R$9.90 when CNN Brasil
  listed prices in July 2025" — and say plainly that it is a floor, not
  today's number. In Brazil especially, a year-old menu price is
  fiction. **A price may never be the headline** unless the headline
  survives the price changing.
- **Hours rot too**, and inconsistently across sources. Near's house
  move is to state the discrepancy rather than resolve it — see Bar
  Italia. Keep doing that.
- **"New", "recently opened", "the first"** all decay. "Opened in May
  2025" is durable; "the new Ipanema branch" is a claim that expires
  quietly.
- **"Still open" is an assertion about the future.** `rules.md`'s
  `verify-still-open-before-create` covers creation; this asks the
  narrower question of whether the *body* implies a permanence the
  sourcing doesn't support. A venue whose lease, funding or operator is
  in question should say so — Brockwell Lido's 2026 management change is
  the model.
- **Anything dated in a headline or `shortTitle`.** A card outlives the
  piece. Ask whether this headline is still honest in a year, and if it
  isn't, lead on something that is — advice, format, character.

## 2. `near-legal-counsel` — exposure

- Attribution present on every image, with a licence that actually
  permits the use, verified on the file's own page rather than assumed.
- Claims about **named living people** and about businesses: sourced, or
  labelled as testimony. Family lore, venue self-description and curator
  first-hand reporting are three different things and none of them are
  facts — label each as what it is.
- Affiliate, sponsored or gifted anything: disclosed at the point of the
  link, not in a footer.
- Nothing that reads as a **health, safety or legal assurance** —
  accessibility, dietary safety, drug legality, visa rules — unless it
  is sourced and dated. This is the highest-consequence rot in the file.

## 3. `near-tech-lead` — will it break

- Every `<NearLink>` target exists **and is `active`**. A link to a
  `draft` slug is a dead link, because `loader.ts` filters drafts off.
- Images load, are hosted somewhere stable, and are not a 17MB original
  served raw. Prefer a host's own resize path where one exists.
- The build passes and the piece validates against the schema in **every
  locale** — tagline ≤90 characters is the one that keeps biting, and it
  bites differently per language.
- No third-party embed that can vanish and take a paragraph's meaning
  with it.

## 4. `near-lead-product` — is it the piece we meant to ship

- Does this advance a target the backlog actually names — a neighbourhood
  toward its 4 pins, a locale gap, a column — or is it a piece we wrote
  because it was in front of us?
- Does it duplicate existing coverage, or orphan itself with no route in?
- Is the research being spent once, per `near-write-article` step 4a, or
  thrown away after one article?

## 5. `near-lead-ux` — how it reads on a phone at night

- The structural rules are a UX floor, not a style preference: no
  paragraph over 100 words, a sub-header every 250, an image every 250.
- Does the first screenful say what the place *is* and where it *is*? A
  reader deciding whether to walk somewhere should not have to scroll.
- Is the practical information — address, hours, how you order, whether
  you can sit — findable without reading the essay around it?

## 6. The DEI lens

- **Who is this written for, and who does it quietly exclude?** Price
  framing that assumes disposable income; nightlife framing that assumes
  a body that can stand in a queue for an hour; "everyone" claims that
  have not been checked.
- **Whose place is this, and who is speaking?** Near's locale editors
  have registers with class positions attached — ZACK ARIOKA writes from
  Leblon. A voice reporting on a neighbourhood it doesn't live in should
  have its own address visible rather than ventriloquising.
- **Cuisine, ethnicity and origin claims** get attribution, never
  adjudication. Do not settle whose food something is from a keyboard.
  Passing along a venue's self-description **with the attribution
  attached** is the correct move.
- **Queerness, disability, religion and migration are facts about places
  when they are facts** — state them plainly where sourced, don't
  decorate with them, and don't erase them for comfort.

## 7. The neurodiversity lens

Near's own audience skews neurodivergent, and this is the lens most
often skipped.

- **Sensory load is practical information.** Loud, bright, crowded,
  queueing, unpredictable — say so. "Small and loud" is useful; "buzzy
  atmosphere" is not.
- **Does the piece say what actually happens to you there?** Where you
  order, whether anyone will approach you, whether you must speak to
  someone, whether you can leave easily. Balcão's two self-order kiosks
  are exactly this kind of detail: for a lot of readers, "you order at a
  screen, not a person" is the deciding fact.
- **Queues, waits and uncertainty** deserve honest description —
  including whether the wait *moves*, which is a different fact from how
  long it is.
- **No ambiguity in the practical bits.** Vague hours, "usually", "most
  nights" — either pin it down or say plainly that it isn't pinned down.
- **Plain-language structure.** Short paragraphs, real sub-headers,
  claims that don't depend on reading irony correctly. The house voice is
  dry; make sure nothing load-bearing lives only in a joke.

## 8. The internal-leak check — mandatory, every locale

**Operator directive, 2026-09-03, written the day it caught a live
leak.** Read every locale looking for **internal discourse that escaped
into published copy**. The miss that prompted this shipped:

> *"Near's first Pinheiros pin — the neighborhood has been a coverage
> gap despite being a Tier 1 São Paulo target"*

Banned from published copy, in every language:

- **Coverage/queue language** — "our first pin in X", "a coverage gap",
  "long overdue on Near", "finally covering".
- **Rotation and tier mechanics** — Tier 1/Tier 2, cycles, whose turn it
  is, `post-plan.md` status.
- **Editorial strategy** — what Near is trying to rank for, why this
  piece was commissioned, source-catalogue holes.
- **Production mechanics** — skills, agents, personas-as-software,
  pipelines, drafts, gates.

The reader does not know Near has tiers, and does not care. Telling them
reads as a machine talking to itself in public. **Say what the place is;
never what it is to Near's backlog.** The fix is almost always deletion —
the clause was carrying no information for the reader in the first place.

The operator floated a dedicated skill for this check. Until one exists,
this section owns it, and `near-write-article` step 9a-0 routes here.

## Output

A verdict per section, and for anything that fails, **the fix, not the
flag**. If the piece ships with a known risk, that risk goes in
`statusHistory` in words a future editor can act on.

If a failure is systemic rather than specific to this piece — as the
stale-price problem is — say so, and route it: a catalogue-wide sweep is
a different job from fixing one article, and this skill's finding is
where that job gets logged.

## What this skill is not

Not `near-legal-counsel`, `near-tech-lead`, `near-lead-product` or
`near-lead-ux` — it convenes their lenses on one draft, it doesn't
replace their own work. Not `near-tov-police` (voice and repetition). Not
`google-discover-audit` (the feed card) — that one asks whether the
headline is delivered; this one asks whether it will still be true.
