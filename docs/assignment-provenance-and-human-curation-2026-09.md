# ASSIGNMENT: human curation, source authority & editorial provenance

**Status: COMMISSIONED, not started.** Operator brief delivered 2026-09-02.
Owner: `near-product-owner`. Deliverable: a Design Decision Record at
`docs/ddr-provenance-<yyyy-mm>.md`, presented for approval **before any code
is written**. This is a condensed faithful record of a much longer operator
brief; the constraints below are reproduced as given, not paraphrased loosely.

---

## The question being answered

How should Near express and preserve the human curation behind the system —
the operator's own editorial judgment, the human selection of preferred
sources, and invited human collaborators — **without** making the AI avatars
pretend to be human, and without letting the personas become the primary
source of authority?

## First principle: four concepts, kept separate

1. **Human taste is the authority layer.** A human decides what counts as a
   useful source, which cities and neighbourhoods deserve attention, which
   places are worth investigating, which themes matter, who gets invited,
   what Near's standards are, and what is actually interesting.
2. **Sources are the evidence layer.**
3. **AI agents are the production layer** — research, retrieve, compare,
   draft, translate, structure, fact-check, link, format, optimize, maintain,
   flag uncertainty, enforce rules. They may have recognizable voices and
   avatars. They must **not** falsely imply human experience, human
   authorship, human attendance, human relationships, or independent human
   judgment.
4. **Near is the publisher.** Reputation accumulates around Near.tips, not
   around fictional personas posing as independent journalists. The personas
   are editorial instruments and recurring characters — not a deception layer.

The distinction that matters: *the avatar can represent the editorial
process; it must not obscure who supplied the human judgment that initiated
or shaped it.*

## The provenance model to design

```
HUMAN CURATOR
      ├── editorial judgment
      ├── preferred-source selection
      ├── brief / assignment
      ├── personal recommendation
      └── collaborator contribution
              ↓
        NEAR EDITORIAL SYSTEM
        research · writing · verification agents
              ↓
        NEAR / EDITORIAL  →  PUBLISHED CONTENT
```

## The fifteen parts of the brief, condensed

1. **Inspect before designing.** Read `content/rules.md`, `content/sources.md`,
   `content/preferred-sources.md`, `content/requests.md`,
   `content/editorial-column.md`, `content/the-setlist.md`,
   `content/ladies-and-gentlethem.md`, `lib/content/schema.ts`, the
   collection schemas, the author/byline implementation, existing source
   rendering, the About/`/sources` pages, and the sitemap/SEO metadata.
   **Do not invent a parallel editorial architecture if an existing
   mechanism can be extended cleanly.**
2. **Three kinds of authority**, modelled distinctly. *Source authority* =
   "Near trusts this source enough to monitor or cite it" — preserving who
   selected it, why, what geography/topic it covers, what claims it suits,
   whether Near actively monitors it, when it was last reviewed, and its kind
   (official / journalistic / specialist / community). Do not leak internal
   operational metadata to readers.
3. **Three kinds of human/agent identity**, never collapsed into one generic
   `author` field: site creator/editor, invited collaborator, AI persona.
4. **Human recommendations** are materially different from agent discovery.
   Internally preserve `discovery: human_recommendation | agent_research`
   with a curator and an editorial note. Public pages need not expose private
   notes. Recommend the **smallest coherent schema extension** — do not
   implement the illustrative fields blindly.
5. **Preferred sources need human provenance.** `/sources` must read as
   deliberate editorial curation ("Selected by Near's editorial team",
   "Recommended by [contributor]"), not an AI-generated link directory.
6. **Keep the personas.** They are differentiation. Establish a hierarchy —
   Near > human direction, human contributors, standards, source ecosystem >
   AI characters (RADAR-X, FOODIE-9000, RUCIO LIBERO, STEFAN, …). Personas
   keep names, avatars, beats, voice. They may not claim "I visited", "I
   spoke to the owner", "my favourite restaurant" — unless relaying a real
   human collaborator's first-person experience, with that human attributed.
7. **Public attribution** should be a compact hierarchy —
   Near → human editorial context → AI editorial production → sources —
   in Near's own voice. An editorial publication, **not an AI compliance
   dashboard**.
8. **A discoverable human layer** ("Who curates Near"): the creator, invited
   contributors, how places get onto Near, how sources are chosen, what
   humans decide, what AI does. The goal is not to apologize for using AI;
   it's to make an unusual editorial model understandable and trustworthy.
9. **GEO/AEO**: provenance as genuine machine-readable structure, never
   fabricated E-E-A-T. Consider `Person`, `Organization`, `Article`,
   `CollectionPage`, `Place`, `WebPage`, `author`, `contributor`,
   `publisher`, `citation`, `sameAs`. **Never mark an AI persona as a real
   human `Person`.** No schema added merely because it sounds SEO-ish.
10. **Creator's personal curation** ("Thiago's picks") — genuinely
    first-person, explicitly attributed, kept separate from generic Near
    editorial content. Never fabricate personal experience.
11. **Collaborators** — a lightweight system for a real human to contribute a
    place, guide, article, event or personal list, remaining attributable
    even when AI agents substantially assist production.
12. **A credit model**, not hard-coded special cases, expressing: human
    discovers + AI researches + AI writes; human writes + Near edits; AI
    discovers + Near approves; creator recommends + AI production; AI persona
    owns a recurring column. Authorship, curation, assignment, editorial
    approval and production are **five different relations** — model them,
    don't force them into `author`.
13. **Interoperability, not infrastructure overhaul.** Map onto the existing
    Git + Markdown + frontmatter architecture. No relational DB, no
    proprietary CMS. Editorial metadata and persona rules must be exposable
    via MCP so external LLMs can read and execute Near's skills natively.
    Guidelines stay in standard readable Markdown — never embedded in
    model-specific system prompts.
14. **Skill architecture** — map current responsibilities and overlap across
    `near-sources`, `near-editor`, `near-write-article`, `near-seo`, `aeo`,
    `near-caretaker`, `link-police`. **Do not automatically modify every
    skill.**
15. **Brand decision.** The goal is *not* "look, humans are behind every AI
    article." It is: "Near is a curated publication made by humans and AI
    together, and you can understand who did what."

## Deliverable

The nine-section DDR defined in `.claude/skills/near-product-owner/SKILL.md`.
Then **stop and present it.** Do not silently resolve major tensions by
changing the architecture.
