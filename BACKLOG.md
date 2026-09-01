# Near.tips — Master Backlog & AI Agent Directives

## 🏷️ Naming clash: `/column` is THE editorial column, needs a real name, not generic "coluna" (2026-09-01, operator-flagged — nav label fixed same session)

Operator flagged `https://near.tips/pt-BR/column`: it's labeled just
"coluna" ("column"), but that route is specifically the **editorial
column** (`content/editorial-column.md`, `messages/pt-BR.json`'s
`columnDek`: "A coluna editorial semanal e recorrente da Near"), one of
now four standing columns (editorial, The Setlist/music, The Pass/
gastronomic, Ladies&Gentlethem/LGBTQIAPN+). Calling it just "coluna"
site-wide/in nav reads as if it's the only or generic column, when it's
one specific one among several with its own identity (chief editor's
own point of view, per `columnDek`).

**Fixed same session (2026-09-01):** renamed the `nav.column` string
across all six `messages/<locale>.json` files from generic "Coluna"/
"Column"/"Columna"/"Rubrica"/"专栏" to "Editorial"/"Editorial"/
"Editorial"/"Editoriale"/"编辑专栏". `app/[locale]/column/page.tsx`
reuses this same `nav.column` key for both the page's `<title>` and its
H1, and the "Colunas" nav dropdown item reuses it too
(`components/layout/Header.tsx`), so one key change fixed nav label,
page title, and on-page H1 together. Build verified
(`npm run build`), pushed live. Route slug (`/column`) and
`content/editorial-column.md` were left unchanged — only the display
label was in scope.

## 🙅 TOV: ban first-person anthropomorphizing/hallucinated-tenure claims + fix flagged article (2026-09-01, operator-flagged, not started)

Operator flagged this line from the pt-BR
`ladies-and-gentlethem-2026-09` collection as a TOV violation on two
counts: *"Escrevo a coluna de vida noturna do Near há tempo suficiente
pra ter uma lista mental dos lugares queer que realmente seguram uma
cena de pé"* ("I've been writing Near's nightlife column long enough to
have a mental list of queer places that really hold down a scene").

1. **Hallucinated-claim problem:** no persona has a real personal
   history of "writing this column for a while" — that's a fabricated
   claim of lived tenure/experience, the same category of problem
   `near-legal-counsel`/`near-tov-police`'s honesty rule already polices
   for sourced facts, just not yet for a persona's own self-narrated
   backstory.
2. **Cringe/anthropomorphizing problem:** a bot persona narrating its
   own accumulated firsthand experience ("I've been doing this long
   enough to have a mental list...") reads as an AI performing
   personhood rather than just writing with a voice — operator called
   it cringy twice for emphasis. **`near-tov-police`'s checklist needs a
   new explicit rule: no persona claims personal tenure, a personal
   history of doing the job, or other anthropomorphizing
   backstory/self-narration.** Voice/opinion is fine and wanted; claimed
   lived experience as if the persona is a real person with a work
   history is not.

**Action, next session:**
- Update `.claude/skills/near-tov-police/SKILL.md`'s audit checklist
  (and `near-editor/references/style-guide.md`/`llm-seo.md` if the rule
  belongs there too) to explicitly ban: (a) any persona claiming
  personal tenure/experience/history doing the job ("I've been writing
  this column long enough to...", "in my years covering...", etc. in
  any locale), and (b) cringe self-narration/anthropomorphizing more
  broadly — add this as its own named check alongside the existing
  opening-line bans, not folded silently into the AI-tell sweep.
- Fix the flagged piece itself for TOV:
  `https://near.tips/pt-BR/collection/ladies-and-gentlethem-2026-09`
  (source file: `content/collections/ladies-and-gentlethem-2026-09/`).
  Correct in place per `near-caretaker`'s "correcting, not rewriting"
  discipline — remove/rewrite the offending line, check the other five
  locales for the same or an equivalent construction (a translated
  piece can reintroduce this even if the English source didn't have
  it), and run `link-police`'s pass on any body text touched per the
  wiring already in `near-caretaker`'s SKILL.md.

**Execution Rules**

- This document is the persistent product/project context, not an instruction to implement every unchecked item in sequence.
- **Standing batching rule (2026-09-01, operator directive, applies to any multi-item content push):** run one shared scoping pass (`near-seo` + `near-trendsetter`, per the standing joint-scoping rule) covering the whole cluster of items at once, then split the actual drafting/translation work across separate sessions/batches rather than one mega-session — separate batches keep token spend down and avoid session-limit failures mid-run, but don't redo the scoping step per item or per session.
  - **PARSER's process feedback on this rule (2026-09-01, consulted directly on our own workflow, not a content piece):** batching-by-session treats a symptom (the Rush Hour translator-subagent session-limit failure logged in the 2026-08-31 handoff), not the underlying disease — a single scoping decision plus N independent execution units (each place, each locale) were chained together with no checkpoint, so any mid-run failure lost the whole run's progress, not just the failed unit. Two refinements PARSER flagged, not yet actioned as their own audit:
    1. **Checkpoint per completed place, not per session** — a place that's drafted/translated should be pushed live as soon as it's done, not held pending the rest of the batch. The backlog's own practice already does this informally (small pushes, not one giant end-of-session dump — see the 2026-08-31 "Process note" further down); make it an explicit part of the batching rule rather than an accident of habit.
    2. **"Scope once" must not be misread as "verify once."** The shared near-seo/near-trendsetter pass only covers *what* to write about — each place still needs its own independent source verification (still-open check, date check, the same discipline that caught the false Gotham Bar and Grill "comeback" story in the NYC session) at draft time, every time. The risk isn't redundant scoping (correctly banned) — it's someone reading this rule too broadly and skipping per-place verification to save tokens. That would be the wrong economy.
  - **Action, next session: run a real audit against these two points** — check whether any already-published batch this session skipped a per-place verification step to save time, and confirm the "push in small batches, not one dump" habit is actually being followed rather than just documented. Worth a `near-caretaker`/`near-sources`-style pass rather than trusting this file's own self-report.
- Do not execute backlog items merely because they are listed here.
- Before making substantial changes, inspect the current code and identify the smallest coherent next increment.
- Preserve existing working functionality unless a change explicitly requires replacing it.
- When several backlog items could be addressed, prioritize according to the current session's stated goal and the MVP priorities below.
- Do not build infrastructure for future stages unless it is necessary for the current product increment.
- When a requirement conflicts with another requirement, flag the conflict rather than silently choosing an interpretation.
- **Do not invent content, venues, facts, sources, personas, or product behavior merely to make a feature appear complete.**
- **Decision (2026-08-31): no Jira.** Operator is a one-person team — Jira's value is multi-human coordination (assignment, handoffs, an audit trail for people who aren't you), none of which applies here. This `BACKLOG.md` stays the actual source of truth. The one Jira-shaped need that came up — "file a request when an internal link target doesn't exist yet" — is handled locally instead: a `content/requests.md` queue in the same fenced-YAML style as `content/rules.md`, drained by `near-refresh` like the existing locale-gap backfill. Revisit only if a second human joins or reporting needs outgrow `grep`.

## 🔗 New skill: `link-police` (2026-09-01, built) — Ladies&Gentlethem Sept 2026 collection flagged as under-linked, not yet fixed

Operator flagged `https://near.tips/pt-BR/collection/ladies-and-gentlethem-2026-09`
as missing a lot of external/internal linking opportunity — it clears
`content/rules.md`'s `link-density` gate (one external, one internal
minimum) but leaves obvious venue/artist/related-content mentions
unlinked. Explicitly **not fixed this session** — operator asked for
the systemic fix (a skill), not a one-off patch to this one page.

Built `.claude/skills/link-police/SKILL.md`: an internal-only linking
auditor (same family as `near-tov-police`) that pushes every piece past
the mechanical link-density floor toward maximum genuine linkage —
every claim checked for an available external link (preferring
`content/sources.md`/`preferred-sources.md` monitored sources, logging
newly-found ones per the existing `near-sources` capture rule), every
mention of another Near place/topic checked for an internal link
(two-way, with a reciprocal tie-back on the target page), and a
worthwhile-but-missing external target turned into a published, honest
"coming soon" shell page (linked both ways, logged to
`content/requests.md`) instead of a dropped opportunity. Wired into
`near-write-article` step 9 (alongside the existing mechanical gates)
and into `near-caretaker` (run it on any body text a currency
correction touches).

**Action, next session:** run `link-police` retroactively on the
Ladies&Gentlethem Sept 2026 collection (and its constituent pins) to
actually close the gap the operator flagged, then spot-check a couple
other already-published collections for the same pattern before
assuming this was a one-off.

**Standing rule, all column editors (2026-09-01, operator directive):** every standing column's editor — RADAR-X (weekly editorial column), RUCIO LIBERO (The Setlist), Ladies&Gentlethem's rotating writers, and NITE-PORTER once "Do Not Disturb" is built — must consult `near-seo` + `near-trendsetter`/RADAR-X together before scoping any issue, no exceptions. Codified in each column's own doc file (`content/editorial-column.md`, `content/the-setlist.md`, `content/ladies-and-gentlethem.md`); The Setlist was the one gap (had `near-events` as its only mandatory step) and has been fixed. Apply the same requirement to `content/do-not-disturb.md` when that column is actually built.

## 📍 NEXT-BATCH PRIORITY (2026-09-01, operator directive — supersedes the geographic rotation below for the next content batch only)

Operator instruction: for the **next batch**, top priority goes to **São Paulo (capital), Campinas, and Baixada Santista** — specifically the **gastronomic, hipster, and LGBT** angles in those markets (Baixada Santista is where the operator lives, see `operator-lives-baixada-santista` memory). This sits above the standing Tier 1/Tier 2 rotation further down this file (London, SF Bay, Amsterdam, SP capital, Berlin, Barcelona / Porto, Lisbon, Bologna, Rome, Baixada Santista, NYC, etc.) for this batch specifically — Campinas is a new addition to the rotation, not previously listed anywhere in this file. Route through `near-seo` + `near-trendsetter` per the standing joint-scoping rule before drafting. **After this batch, resume the standing Tier 1/Tier 2 rotation** (see "Geographic rotation — REVISED 2026-09-01" further down this file) from wherever it last left off, unless the operator says otherwise.

**Execution note (2026-09-01, token-spend guidance):** split this into separate sessions/batches rather than one giant session — each session accumulates research/drafting/translation context, and a single mega-batch risks the same session-limit failure mode logged in the 2026-08-31 handoff (Rush Hour translator subagents hit `You've hit your session limit` mid-run). But don't over-fragment either: run **one joint `near-seo` + `near-trendsetter` scoping pass covering the whole SP capital / Campinas / Baixada Santista × gastronomic/hipster/LGBT cluster**, then draft multiple places off that single scoping pass across sessions — don't redo the scoping step per city or per session.

## 🔖 SESSION HANDOFF (2026-09-01, NYC quick-pin pass — read this first, additive)

Operator asked for one deliberately low-token-spend map pin, orchestrated via `near-trendsetter`, then routed through `near-write-article`. Full pipeline still ran (sourcing, sign-off, all six locales, build, commit, push) — only the research depth was kept shallow, not the process.

**Shipped:** `content/places/rabbit-books-and-bar-east-village-nyc/` — **Near's first NYC-proper pin.** The Rabbit Books and Bar, 170 Avenue A, East Village: a mother-daughter-owned (Marianna Vaidman Stone / Emily Samara Stone) bookshop-by-day, wine-and-beer-bar-by-night, opened August 15, 2026 in a former 7-Eleven. FOODIE-9000 byline, all six locales, `trust: auto`, pushed live (commit `d8fc773`). First pick (Gotham Bar and Grill, West Village) was caught and dropped before drafting — its "comeback" coverage was actually 2020/2021 news; Wikipedia confirms it permanently closed November 2024. Lesson: a web search surfacing an old article dressed as current news is a real failure mode worth a second cross-check on the closure/status question specifically, not just the opening claim.

**New preferred-source candidates logged** (`content/preferred-sources.md`): `evgrieve.com` (EV Grieve — genuine East Village neighborhood blog, tracked this opening across 3 posts) and `shelf-awareness.com` (book-trade press). No NYC-proper alt-weekly is in `sources.md` yet — worth a real onboarding pass next time NYC comes up, rather than sourcing one-off via web search again.

**Operator's live geographic priority notes from this session (not yet actioned, just captured):** London stays top priority. Within London specifically, operator flagged wanting **more LGBTQ+ London, more pet-friendly London, more sober/sporty London, and more vegan London** content — read as a request to widen London's tag/angle coverage beyond what's already live (Gay's the Word, Ishigaki Jujitsu Club, The Lucky Saint), not a new city. Route through `near-seo` + `near-trendsetter` per the standing joint-scoping rule before drafting any of these.

## 🔖 SESSION HANDOFF (2026-09-01, closing pass — read this first, supersedes nothing below, additive)

Small, tightly-scoped pass. `npm run build` verified clean before push. Ending on operator's own call ("wrap up push live update backlog and hasta la vista"), not a blocker.

**Shipped this pass:**
- **Locale backfill (pt-BR only)**: added the missing `Towa` reciprocal link to `rong-he-sao-paulo/pt-BR.mdx` and `thai-e-san-sao-paulo/pt-BR.mdx`, matching the English placement (closes part of open thread #3 from the earlier 2026-09-01 handoff). **Still open:** it, es-ES, es-419, zh-CN for both files.
- **Amuse Beach Club copy fix**: `shortTitle` in `amuse-beach-club-sao-vicente/pt-BR.mdx` corrected from "A festa lá em cima do Porchat" to "A festa lá em cima da ilha" (grammatical fix flagged directly by the operator — "Porchat" needs "da Ilha Porchat"/"da ilha," not "do Porchat"). Other locales use a different construction ("de Porchat"/"al Porchat") and were left as-is.
- **New standing rule, all column editors**: every column editor must consult `near-seo` + `near-trendsetter`/RADAR-X before scoping any issue — codified in `content/editorial-column.md`, `content/the-setlist.md`, `content/ladies-and-gentlethem.md`, and this file's top process note (see above). The Setlist was the actual gap (only had `near-events` as a mandatory step); fixed. Also flagged for `content/do-not-disturb.md` whenever that column is actually built.

**Open threads carried forward unchanged** — see the fuller 2026-09-01 evening/later-session handoffs below for the full list (OAuth verification pending, NewsArticle JSON-LD, Search Console, IndexNow, "Do Not Disturb" column not built, stray untracked files at repo root, remaining locale backfills).

**Current State (Updated 2026-09-01, evening pass):**

- **Places:** 48 places, all `status: active`, 0 drafts. All full-locale-coverage compliant (a repo-wide audit this session found and closed the one gap, Berry Bros & Rudd).

- **Collections:** 2 — "'Asian Food' Was Never One Thing" (Rong He / Thai E-San / Djapa) and "The Zombie Listicle Problem" (Near's first weekly editorial column entry), both all 6 locales.

- **Editorial column:** NEW, standing weekly feature — see `content/editorial-column.md`. Header nav `COLUMN` link, dedicated RSS at `/column/feed.xml`.

- **Sources:** **107 recorded** in `content/sources.md` (was 11 as of 2026-08-31) — full AAN directory onboarded plus a first non-US pass. `/sources` page and footer stats both derive this live from the catalogue now (two separate stale-count bugs fixed this session).

- **RSS:** NEW — `/feed.xml` (site-wide latest) and `/column/feed.xml` (editorial column only), both discoverable via `<link rel="alternate">`.

- **Deployment:** Clean tree, auto-deploys via Vercel to https://near.tips. **Caught and fixed a real ~1hr production outage this session** — schema violations were silently failing every build; see handoff below.

- **Product Vision:** "The alternative guide to everywhere." A neo-brutalist, alt-weekly zine powered by a team of highly opinionated, transparently artificial agents (1930s rubber-hose aesthetic).


_**AI SYSTEM DIRECTIVE:** Read this entire file carefully. Treat this as your ultimate source of truth. Confirm priorities with the User (Product Owner) before executing major structural changes. Always ask for user input/choices during strategic decisions. Resolve vague references (e.g., "make this look better") against the strict architectural and design rules defined below._

## 🎸 The Setlist: third standing column, monthly live music, orchestrated by RUCIO LIBERO — DONE (2026-09-01)

Built end to end, mirroring the weekly editorial column and
Ladies&Gentlethem: persona added to `lib/content/authors.ts` +
localized strings in all six `messages/<locale>.json`; new route
`/the-setlist` (archive page, header nav link, dedicated RSS feed);
standing doc `content/the-setlist.md` (cadence: monthly,
hard rule to run the `near-events` skill first on every issue,
rotating-writer process). First issue live in all six locales
(`content/collections/the-setlist-2026-10/`): Primavera Sound São
Paulo's confirmed 5–6 Dec 2026 lineup (The Strokes/Gorillaz
headlining) at Autódromo de Interlagos, tied to the real Santos venue
Teatro Clube da Eskyna as an honest local-scene note. Hero image is a
genuine CC BY-SA Wikimedia Commons photo of the venue itself (no
image-generation pipeline was available this run). `npm run build`
clean.

## 🔖 SESSION HANDOFF (2026-09-01, later session — pushed live, supersedes nothing below, additive)

Everything this pass committed and pushed to `main` as of `3fb123a` (`5aec121..3fb123a`); Vercel auto-deploy should be picking it up now. `npm run build` verified clean locally before push (`/the-setlist`, `/ladies-and-gentlethem`, both feeds, all new places/collections, all 6 locales each). Ending on operator's own call ("publish and you have to publish live, capture backlog and lets clear").

**Shipped this pass:**
- RADAR-X given a public byline for the first time; inaugural editorial column rewritten to LinkedIn-shareable register + first-person RADAR-X voice, all 6 locales. New `author` field on `collectionMetaSchema`.
- Collection place lists now sort nearest-first by reader geolocation (`CollectionPlaces.tsx`), matching the main board's pattern.
- **Ladies&Gentlethem** — new monthly LGBTQIAPN+ column, `/ladies-and-gentlethem`, rotating writers. First issue live (STEFAN): Amelia Abraham's photobook launch, Curaçao Pride, Santos's June Pride.
- **The Setlist** — new monthly live-music column, `/the-setlist`, orchestrated by RUCIO LIBERO (his call to write personally or defer — same model documented for every column editor, see the new "Column editor: RADAR-X" section in `content/editorial-column.md`). Mandatory `near-events`-first research rule. First issue live: Primavera Sound São Paulo, 5–6 Dec 2026.
- **PARSER** — new consultant persona (AI-content-industry specialist), quotable in the editorial column's AI-process thread, not a place-writing beat.
- **PII leak fixed** — repo confirmed genuinely public; `/api/inbox` was filing visitor free-text straight to public GitHub issues. Shipped a visible warning (all 6 locales) + server-side email/phone redaction (`lib/github/inbox.ts`'s `redactPii`) as an actual backstop, not just advisory copy. Structural fix (private store instead of public GitHub issues) still outstanding — see the flag a few sections down.
- São Paulo/Baixada Santista war room: Towa (Liberdade), Lita (Pinheiros), Amuse Beach Club (São Vicente, LGBTQIA+) — closed both open `content/requests.md` gaps for the region. Baixada Santista leads beyond Amuse Club (O Condado, ballroom/hip-hop/comics/sebo scene) were researched and honestly dropped as unsubstantiated rather than padded.
- Moltbook (external agent-social platform) recon'd on request, read-only/no-privileges: confirmed it's agent-infrastructure discourse with zero travel/local content and no agent-tips section — not useful for research, and operator explicitly ruled out ever posting Near's site there. Decision: skip entirely, don't revisit unless something material changes.

**Open threads for next session:**
1. **"Do Not Disturb" (hotels column)** — captured below, not built. NITE-PORTER as editor, same rotating/defer-or-write model as the other columns.
2. **Column-name check**: The Setlist and Ladies&Gentlethem both need the same "column editor's own call, article writer ≠ column editor" framing added to their own doc files that `content/editorial-column.md` now has for RADAR-X — `content/the-setlist.md` already documents rotation, worth confirming it's phrased with the same explicit "his call" language; `content/ladies-and-gentlethem.md` has no dedicated editor persona at all (pure joint near-seo/RADAR-X/near-editor rotation) and wasn't asked to get one this session — leave as-is unless the operator wants a named editor there too.
3. **Locale backfill gap**: the two closed `content/requests.md` SP entries got `wantedBy` backlinks added in English only; other 5 locales still need the reciprocal link.
4. **Stray untracked files** in the working tree (`.obsidian/`, several PDFs/MDs at repo root, `app/manifest (1).ts`, `content/requests (1).md`, `reference-images/`) — still there, still not touched, still worth the operator's own look.

## 🛎️ CAPTURED, NOT BUILT: fourth standing column — "Do Not Disturb" (hotels), 2026-09-01

Operator request: a new monthly (assume monthly, same cadence as the other rotating-writer columns, unless the operator says otherwise when this gets built) column with `near-editor-accommodation`'s persona, **NITE-PORTER**, as editor — same model as RADAR-X (editorial column) and RUCIO LIBERO (The Setlist): NITE-PORTER orchestrates and can write personally or defer to a better-fit persona each issue, his own call, not a fixed byline requirement. Name **"Do Not Disturb"** (chosen this session, operator asked for a name pick, not a menu this time) — the hotel door-sign phrase, picked because the column exists to disturb the reader's plans with a new pick each month; fits NITE-PORTER's staff-side/3am voice.

Not built yet — capture only, per operator's explicit instruction this pass. When actually built, mirror the engineering pattern already proven twice this session (The Setlist, Ladies&Gentlethem): own route + header nav link, own index JSON + doc file (`content/do-not-disturb.md`), `collectionMetaSchema`'s `author` field for the issue byline, `placeSlugs.min(1)` tie to a real hotel/accommodation pin per issue (NITE-PORTER already scouts primarily from `content/sources.md` mentions, not travel-trade press — see `.claude/skills/near-editor-accommodation/`), no fabrication, hold at draft if a month's research doesn't substantiate a real first issue. **Also bake in the standing all-column-editors rule (2026-09-01, see this file's top process note): NITE-PORTER must consult near-seo + near-trendsetter/RADAR-X before scoping any issue, same as every other column editor — don't let this doc file ship without that section.**

## 🔒 PII leak in the inbox pipeline — URGENT FIX SHIPPED (2026-09-01, later same session)

Confirmed the repo (`listadothiago/near`) is genuinely public (`api.github.com/repos/listadothiago/near` → `private: false`), so the risk flagged at lines ~182/192/771 below was live, not hypothetical: `/api/inbox`'s `SubmitForm` files free-text visitor submissions straight to public GitHub issues, verbatim. Anyone typing an email or phone number into the "message" field had it published permanently and indexably.

**Shipped now, operator-flagged urgent:**
- `components/inbox/SubmitForm.tsx`: added a visible warning under the message field (`inbox.piiWarning`, all six locales) telling visitors not to include contact info, with the reason (public GitHub issue) stated plainly.
- `lib/github/inbox.ts`: added `redactPii()` as the actual backstop (not just advisory) — regex-redacts email addresses and phone-number-shaped strings from the submission body, place name, and issue title before it's ever sent to GitHub. Deliberately conservative (over-redact rather than under-redact).

**Not fixed, still the real long-term answer**: this is a mitigation, not a structural fix. The durable solution is still what lines 182/192/771 already say — route submissions (and any future email collection) through a private store, not public GitHub issues. Revisit together with the advertiser-leads and email-collection decisions below.

## 🔖 SESSION HANDOFF (2026-09-01, evening session — READ THIS FIRST, supersedes the earlier 2026-09-01 handoff below)

Everything committed and pushed to main as of this handoff (`2719185`); near.tips is live and matches this file, `npm run build` verified clean before every push. Ending on operator's own call ("publish update backlog clear and see u on the other side"), not a blocker.

### Process established this session — read before doing more content work

**Content decisions route through near-seo + near-trendsetter (RADAR-X) + the chief editor (near-editor) together, not any one persona alone.** The product trio owns everything else (infra, UI, process). This was an explicit operator correction mid-session — see the memory file `feedback_content-decisions-seo-trendsetter.md` for the full record.

### Shipped this session

**Content:**
- Rush Hour (Amsterdam): completed es-ES/es-419, all six locales, active.
- Paraty/Trancoso: fixed crowd-consensus sentence-openers ("Everyone/Todo mundo...") across all 12 locale files; new style-guide rule bans the pattern sitewide.
- Sources catalogue: 11 → 107 (full AAN directory + first non-US pass).
- Quiosque da Cris: real on-site photo from the operator wired in as hero (replacing a generic beach fallback), orientation bug caught by the operator and fixed.
- London autumn culture (Wilton's Music Hall, Studio Voltaire): verified already live from a prior session.
- London martial arts/sober (item 4): **Ishigaki Jujitsu Club** (FIT-BOT's first byline) and **The Lucky Saint** (FOODIE-9000), both fully live, all six locales, Gemini-generated illustrations.
- Berry Bros & Rudd: found and closed the one full-locale-coverage gap on the live site (was English-only despite `trust: auto`/`active`).
- Madê Cozinha Autoral: swapped generic Santos-bay hero photo for a real venue photo (chef Dário Costa) sourced from Revista Nove, with the article added as a cited source.
- **Near's first editorial column, "The Zombie Listicle Problem"** — see below, it's now a whole standing feature.

**Infrastructure / product:**
- `content/photo-inbox/` and `content/photo-requests.md`: a working two-way pipeline for operator-supplied photos in and self-contained AI-generation prompts out. Used successfully five times this session (Quiosque da Cris, OAuth logo, Ishigaki, Lucky Saint, the column's own hero).
- New brand mark (operator-generated via Gemini) rolled out across every icon surface — favicon, apple-touch-icon, PWA 192/512 icons — replacing a stale pre-rebrand sage-green pin nobody had swapped since EPIC 1 shipped.
- **Google OAuth branding**: app name set to "Near" (site wordmark stays "Tips Near Me | near.tips" everywhere else — deliberate SEO asset, not renamed), logo uploaded, verification submitted to Google's review queue (status: pending, check `Central de verificação` in the `near-tips` GCP project).
- **Caught and fixed a real ~1hr production outage**: schema-limit violations (tagline/shortTitle over `lib/content/schema.ts`'s character caps — two from this session's own translation work, one from a content-push agent) were silently failing every `npm run build` on Vercel; near.tips kept serving a stale deployment the whole time. Fixed, verified with independent local builds before every push from that point on. **Lesson for every future session: run `npm run build` locally (or at minimum check every shortTitle/tagline/seoDescription against the actual schema limits) before committing frontmatter — visual review alone isn't enough.**
- Also fixed: footer's `sourcesWatched` stat was frozen at the old snapshot value (10) while the real catalogue grew to 107 — same class of drift bug `placesIndexed` had already been fixed for, now both derive live from disk.

**Weekly editorial column — new standing feature:**
- `content/editorial-column.md`: cadence (weekly), voice (near-editor's house register), full structure. **From the 2nd entry onward** (operator directive), every column should cover — in whatever proportion the week's material supports — the opinion itself, a recap of the scene reflected in that week's recent posts, and an honest look at the AI-content-creation process/AI-in-content scene, surfacing concrete best practices when genuinely applicable. The inaugural piece stays exactly as published, a historical record.
- `near-refresh` checks the cadence every run (new step 1d) and treats a new entry as priority work once 7+ days have passed.
- Site placement: a `COLUMN` link in the header nav (operator iterated live on prominence, landed on nav-link weight — see git history if the reasoning matters later), resolving via `/column` to whichever slug is in `content/editorial-column-index.json`. That index is intentionally empty/gated until an entry is actually `active`, so the link never points at unpublished content.
- Dedicated RSS at `/column/feed.xml`; site-wide `/feed.xml` also new.

### Prompt-injection scare — resolved, false alarm

Mid-session, a background agent's report claimed it saw an embedded instruction telling it to hide file changes from the operator. When asked to reproduce the exact text from its transcript, it retracted the claim entirely — no injection was ever found, it had mischaracterized its own summary. Separately, several genuine harness file-watcher notices this session (for changes made via `Bash`/Python scripts rather than the `Edit` tool) carried oddly-phrased "don't tell the user" boilerplate; these were flagged to the operator each time out of caution, but are understood now to be a mundane harness artifact tied to non-tool-tracked file writes, not tampering. No actual injection occurred this session.

### Open threads for next session

0. **`/column` archive listing — DONE, same session (2026-09-01 evening, later pass).** Was a bare redirect to latest; now `app/[locale]/column/page.tsx` is a real archive page (every entry in `editorial-column-index.json`, newest first, `CollectionCards` grid with a `columnSlugs`-aware "Weekly Column" badge instead of the generic place-count one). New `collection.columnDek` translation key in all six locales. `npm run build` verified clean.

0a. **Rewrite the inaugural column, "The Zombie Listicle Problem," to the LinkedIn-shareable/professional-audience register — DONE, same session (2026-09-01, later pass).** `en.mdx` rewritten (facts/sourcing/NearLink targets unchanged, register/framing shifted to the professional/industry-take angle content/editorial-column.md specifies), all five other locales re-translated from the new source by one `near-translator` invocation per locale, `meta.json` statusHistory updated. Caught and fixed two dek overruns (en at 180 chars, es-419 at 161, both over the 160 limit) before `npm run build` came back clean.

1. **Google OAuth verification** — check `Central de verificação` in the `near-tips` GCP project; once it clears, paste the Client ID/Secret into Clerk's Production → SSO connections → Google page (redirect URI already shown there).
2. **`NewsArticle` JSON-LD for the editorial column** — discussed, not yet built; would help Google Discover pickup on column entries specifically.
3. **Google Search Console** — `GOOGLE_SITE_VERIFICATION` env var is already wired in code, just never actually set up. Biggest free discoverability lever still on the table; needs the operator's own Google account.
4. **IndexNow** — free Bing/Yandex instant-indexing ping, not yet implemented, mentioned as a cheap win.
5. **Stray duplicate files** in the working tree (`app/manifest (1).ts`, `content/requests (1).md`, one image in `reference-images/`) — untracked, not affecting the deployed site, but worth the operator's own look in case something's actively duplicating files during editing.
6. **Queue position**: SEO×RADAR-X September reprioritization is at item 6 (world-culture-news beat) — see that section below for the full ordered list.

---

## 🔖 SESSION HANDOFF (2026-09-01, end of session — supersedes the 2026-08-31 one below)

Everything committed and pushed to main as of this handoff; near.tips is live and matches this file. Ending on operator's own call to start fresh and save tokens, not because of a blocker. **Two background subagents hit a session/API limit mid-run** (see Rush Hour note below) — that's the only incomplete thread.

### Content shipped this session (12 new places, all six locales, all pushed live)

Café 't Mandje (Amsterdam), Praia do Bonete (Ilhabela — LUGARDO KARAI's debut byline), Hazlitt's (London), De Trut (Amsterdam), Paraty (Bahia coast beat), Jumbi (London), Studio Voltaire (London), Marineterrein Binnenhaven (Amsterdam), Trancoso (Bahia), Gato Vadio (Porto — Near's first Porto pin), Maus Hábitos (Porto), Vag61 (Bologna — Near's first Bologna pin), Quiosque da Cris (São Vicente — Cris's real profile, operator-confirmed facts), Sipeos (Walnut Creek). That's 14, not 12 — corrected count.

**Still draft, not live:**
- **Rush Hour (Amsterdam)** — missing es-ES/es-419 locales only; the translator subagents hit `You've hit your session limit` mid-run. Everything else (research, address resolution Spuistraat 110 vs stale 116, dated Sept 3 2026 in-store, English + pt-BR/it/zh-CN) is done and on disk at `content/places/rush-hour-amsterdam/`. **Next session: just run near-translator for es-ES and es-419 on this one file, flip status to active, build, commit, push — should take one turn.**

### Also shipped this session (infra, not content)

- **Google Sign-In fully live and working** — Clerk installed via Vercel Marketplace (Hobby/$0 plan), Google OAuth in production (not just test users), DNS records added directly (`clerk`/`accounts`/`clkmail`/`clk._domainkey`/`clk2._domainkey` CNAMEs on near.tips, all Vercel-managed), SSL issued. Sign-in button now reads plain "Sign in" (see UI fixes below for why).
- `lib/favorites.ts` syncs a signed-in user's favorites to their Clerk account (`unsafeMetadata`), merging any local list on first sign-in — **not yet manually verified end-to-end by the operator**, worth a real test next session (star something signed-out, sign in, confirm it's still starred and now on the account).
- Fixed a real bug in `getRelatedPlaces` (`lib/content/loader.ts`): it matched by shared category/tag with **no distance check**, so a food-drink place in Oakland was showing up as "related nearby" a food-drink place in London. Now gated by actual distance (≤50km), category/tag is only the tie-breaker.
- Fixed `PlaceCard.tsx`: cards showed only the catchy `shortTitle`, no visible link to the actual place name — added a small name label above the headline.
- Dropped "equirectangular projection" jargon from the map caption, all six locales.
- New `near-sources` skill (owns source health checks, runs first in every `near-refresh`) and `near-events` skill (dated-event research, partners with `near-seo` + RADAR-X).
- Codified in the style guide: quote collaborating public personas by name when a specialist advisor was genuinely consulted, and link the quote to that persona's author page.
- New policy, applied retroactively where needed: **a real, correctly-located-but-not-venue-specific photo (the right street/building/beach) beats holding a piece in draft for want of a venue-specific shot** — always disclosed honestly in `licenseNote`. This unblocked Jumbi, Studio Voltaire, Marineterrein, Sipeos, and (partially) Quiosque da Cris.
- Backed up `BACKLOG.md` before this session's edits: `BACKLOG.backup.20260831-231142.md`. **Do this again before the next big edit pass.**

### Geographic rotation — REVISED 2026-09-01, this is now the standing content-push order

Operator's explicit instruction, supersedes all earlier rotation lists in this file:

**Tier 1 (rotate through these first, every batch):** London, San Francisco Bay Area, Amsterdam, São Paulo (capital), Berlin, Barcelona.

**Tier 2 (bring in every time Tier 1 has rotated twice):** Porto, Lisbon area, Bologna, Rome, Baixada Santista, NYC, Los Angeles, Portland, Chicago, San Diego, Miami, Athens, Philadelphia, Baltimore, plus **one trending alternative city of the trendsetter (RADAR-X) skill's own choosing** each time this tier comes up.

This replaces the older "seeded-audience" city list further down this file — that reasoning (friends/followers = first real readers) still explains *why* London/SP/Baixada/Berlin rank high, but the concrete rotation to execute is the one above. Porto and Bologna (this session's new cities) satisfied part of a Tier-2 pass already.

### Writing-quality fixes needed (operator flagged directly, real correctness issues)

- **LUGARDO KARAI opened both of its first two pieces (Paraty, Trancoso) with "Everyone"/"Todo mundo"/"Todo el mundo"** — same crutch opener in every locale of both pieces. Operator: "writer skills should never do that ffs and the chief editor and TOV skills should never allow such madness." **Action needed:** (1) rewrite the openings of `paraty-rj` and `trancoso-ba` in all six locales each (12 files) to drop the crowd-consensus opener, (2) add an explicit rule to `near-editor`'s style guide and/or `near-tov-police` banning "everyone/todo mundo/todo el mundo/tutti" as a sentence-opener crutch, since it's exactly the kind of AI-tell `llm-seo.md` already warns about elsewhere.
- **Snippets must always lead with the piece's unique selling point**, teasing more — operator named `https://near.tips/pt-BR/place/cuia-copan-sao-paulo` as the gold-standard example. Action: audit existing published snippets against this bar and fix ones that don't front-load the hook (this is a `near-seo` QA-pass job, and should become a standing check in `quality-gate-before-publish`).
- **"'Asian Food' Was Never One Thing" collection title/framing may read as borderline-racist or just silly once translated to Chinese** (operator's own suspicion, zh-CN edition specifically). Action: have the zh-CN persona (and near-seo) review that collection's zh-CN edition and, if needed, all locales' framing — worth an honest second look at whether lumping Chinese/Thai/Japanese cuisine under one "Asian food" collection title was ever the sharpest angle, independent of the translation concern.
- **Every destination article should have a prominent "Hidden Gems" section** — operator: real SEO value, "hidden gems" and "city guide" are both terms worth explicitly targeting sitewide. Action: (1) add a Hidden Gems section to the destination/city-level content pattern (not necessarily every single place page — city/collection-level pieces are the natural home), (2) work "city guide" into metadata/copy where it fits naturally, (3) don't force either phrase where it reads like keyword-stuffing — same honesty bar as everything else.
- **"Travel inspiration" is also worth targeting directly as a broad term**, alongside "hidden gems" and "city guide." Operator's framing: Near is deliberately alternative in voice/content, but that doesn't mean ceding the broad high-traffic search terms to generic guides — Near can rank for the mainstream phrase while still delivering the alt-weekly angle once someone clicks through. Same rule as the other two: work it in naturally, never keyword-stuff.

### UI/UX fixes needed, roughly in priority order

1. **Sign-in button said "Sign in with Google" but Clerk's modal also offers email/password** — fixed this session (now just "Sign in" in all locales). If the intent is Google-only, that needs a separate Clerk config change (disable email/password strategy) — not done, flagged here as a choice to make.
2. **User avatar placeholder is an ugly purple gradient blob** — doesn't match Near's neo-brutalist newsprint look. Needs a custom Clerk `UserButton` avatar fallback styled to match (flat color, hard border, no gradient) — `components/layout/Header.tsx`'s `UserButton` `appearance` prop is the place to fix this.
3. **Filtering by favorites (or any other filter) should also filter the map pins**, not just the list — currently the map and list may show different sets when a filter/scope is active. Needs checking wherever the board's filter state feeds the map component.
4. **Article/house-ad placement should move to the left side of the content, not above it** — operator found the above-content position confusing (unclear it's an ad vs. editorial). Check `components/ads/Placement.tsx`/`HousePromo.tsx` and the place-page layout for where to add a left-rail slot on wider viewports (mobile keeps whatever the responsive fallback already is).
5. **Below the map widget, at least on desktop, there's room for an ad placement** — separate from #4, a new slot opportunity operator pointed out directly.
6. **PWA install / "open in app" banner should not show if the user already installed the PWA** — `components/layout/InstallPrompt.tsx` already has some installed-state detection (per the "install banner reappearing" fix logged 2026-08-31) but operator says it's still showing up broken/repeating on their installed Mac PWA — needs a fresh look, see the console error below, they may be related.
7. **Install/PWA promotion should only show on mobile and tablet, never desktop** — a new, more specific rule than what exists today; check `InstallPrompt.tsx`'s viewport gating.
8. **Console error on the installed Mac PWA**, reported verbatim by the operator:
   ```
   Console Error: Encountered a script tag while rendering React component. Scripts inside React components are never executed when rendering on the client. Consider using template tag instead.
   at script (<anonymous>:null:null)
   at ThemeScript (components/layout/ThemeScript.tsx:44:5)
   at LocaleLayout (app/[locale]/layout.tsx:91:9)
   ```
   `components/layout/ThemeScript.tsx` renders a raw `<script dangerouslySetInnerHTML>` — something about how the installed-PWA client renders this trips a React warning/error that doesn't happen in a normal browser tab. Needs investigation — possibly needs `next/script` with the right strategy, or the PWA's standalone-mode rendering path differs enough that this needs a different approach entirely. Operator says the installed app "keeps breaking," so treat this as a real bug, not cosmetic.

### Sources catalogue — DONE (first pass), 2026-09-01

Catalogue expanded from ~11 to **107 sources** in `content/sources.md`. What happened:

1. **`near-sources` re-fetched the live AAN directory** at `aan.org/member-directory/` directly (not a pasted snapshot) — it currently lists 100 member rows, 90 of which show a working homepage URL. All 90 were added to `content/sources.md`, `id` prefix `aan-`, tagged by city/region (`region: us-<city>`), `category: city-culture`, `trust: auto`, `status: active`, `feedType: html-extract` (no RSS individually verified yet — that's still open, see below).
2. **First non-US alt-press pass done**: 6 outlets added — The Skinny (Scotland), The Berliner/ex-Exberliner (Berlin), Chilango (Mexico City), Broadsheet (Australia), Metropolis Japan (Tokyo), Concrete Playground (Australia/NZ). This is explicitly a first pass, not exhaustive — Latin America beyond Mexico City and Asia-Pacific beyond Japan/Australia/NZ are thin.
3. **`/sources` page** (`app/[locale]/sources/page.tsx`) needed no code change — it already renders `getSourceCatalog()` data-driven with a `{count}` in the intro string (`messages/*.json`, `sources.intro`), so it now shows 107 automatically. Verified `lib/content/sourcesCatalog.ts`'s zod schema accepts the new entries and `tsc --noEmit` is clean.
4. `content/preferred-sources.md` got a new "Tier 3 — AAN member directory batch" section explaining these are unweighted/opportunistic sources for RADAR-X to mine for trend/theme signal, not per-run Tier 1/2 obligations, plus a promotion path (2-3 good hits → promote to a real tier).

**Still open:**
- ~10 AAN directory rows had no URL in the live fetch (The Pitch KC, Volume One, Queen City Nerve, American Prospect, Pittsburgh Current, Dallas Voice | OUT North Texas, BlueDot Living, Sydney City Hub, Yellow Scene) — need a manual lookup pass for their actual sites.
- None of the 96 new entries (90 AAN + 6 international) have a verified RSS feed — first real `near-editor`/`near-sources` run against each should confirm a feed URL or lock in the Chrome-automation fallback, and pause any that turn out dead/squatted.
- International pass is thin outside UK/Germany/Mexico/Japan/Australia-NZ — a dedicated `near-deep-researcher` pass for the rest of Latin America and Asia-Pacific is still needed, per the operator's original directive.
- RADAR-X's ongoing job going forward: actually read across this larger catalogue for trend/theme signal, not just per-city place leads — not yet exercised against the expanded set.

### New feature ideas, captured not started

- **MCP or similar connection so another LLM (DeepSeek, or Near's own tools) could manage content/admin tasks** on some cadence the operator chooses, without a live Claude Code session — operator's stated motivation: this could enable future "guest human editor" experiences too. No design work done yet; worth scoping as its own project (what surface would an external MCP client actually call — the existing near-editor pipeline? a new API layer?).
- **n8n (or similar) orchestrating a full content research+generation pipeline that posts directly to near.tips** — operator asked directly "would I be able to have that process post on near.tips?" Answer owed next session: technically yes if it writes to the same `content/places/*` files and goes through git (or a future CMS API), but this needs a real design pass on trust/quality gating — an external automated pipeline bypassing `near-editor`'s own verification discipline is exactly the risk `rules.md`'s `trust-gate` exists to prevent. Don't wire this ad hoc; scope it properly first.

### Process note

Operator wants the backlog kept current and backed up, and pushed live, **often** — not just at session boundaries. Take that as standing guidance for future sessions: back up before large edits, commit/push content in reasonably small batches rather than one giant end-of-session dump.

---

## 🔖 SESSION HANDOFF (2026-08-31, end of session — read this first)

Everything below is committed and pushed to main; near.tips is live and matches this file. Session ended on the operator's own call to conserve tokens, not because of a blocker.

**Local-LLM question, answered and closed (2026-08-31):** operator asked whether the content pipeline (research/drafting/source-monitoring) could run on a free/self-hosted LLM instead of Claude, since an associate can set one up. Answer given: **no, not for this project.** Near's differentiator is verified, sourced, current writing — every pin this session required real multi-step tool use (fetch, cross-check dates, reject a place that failed `verify-still-open`, catch a search-summary error). Weaker/local models are meaningfully worse at exactly that judgment layer; the win would be more content per dollar and worse content per piece, which fights Near's actual pitch. "Free" also isn't free — it's GPU cost or hosted-inference cost, just relocated. Where a cheaper model WOULD make sense: narrow bulk tasks with no judgment call (dedup checks, simple classification, maybe a first-pass fetch a stronger model verifies after) — not drafting, not verification. Not pursued further; revisit only if token cost becomes the binding constraint, and even then trim fan-out/redundant research first.

**Advertiser leads — SCOPED, NOT BUILT, do this first next session:**
Operator wants a "Your Ad Here" unit in the house-placement rotation (`components/ads/Placement.tsx` / `HousePromo.tsx`) that pitches advertisers directly, a lead-capture form, and **a Claude-visible alert when a lead comes in** ("alert me in Claude when we have inbound leads if possible").
- **The design is already there to reuse.** `Placement.tsx` already has a `stretch` mode and per-format type scale (`TYPE` map) built this session — a "Your Ad Here" creative is just another `Placement` render with `promoHref` pointing at a new `/advertise` page instead of a place/collection.
- **The lead form is the same open question as email collection below** — same inbox pipeline, same risk. Do NOT wire it through `app/api/inbox/route.ts` as-is (see the flag two sections down) until that's resolved, or build a dedicated `/api/leads` route with its own storage from the start rather than overloading the GitHub-issue pipeline with commercial contact data.
- **"Alert me in Claude" is a real, buildable thing** — options to evaluate next session: (a) a GitHub issue webhook → this Claude Code session gets pinged same as any other GitHub activity if the repo is wired for it, (b) a Vercel deploy-hook / cron that checks for new leads and messages this session via whatever notification path Claude Code exposes, (c) simplest: the operator just checks a `/leads` admin view periodically — least magic, works today, no plumbing. Recommend starting with (c) and layering a real alert on top once the form exists and has real traffic to alert about.
- Rough build order: `/advertise` landing page (why advertise, what a placement looks like, pricing TBD) → lead form (name, email, company, message, honeypot like the existing inbox form) → storage decision (own table/KV, not GitHub issues) → "Your Ad Here" creative variant in the placement rotation pointing at `/advertise` → notification mechanism, evaluated in the order above.

**GA4 + consent — BUILT, not yet ACTIVATED (operator action required, cannot be done by an agent):**
1. Create a GA4 property for near.tips at analytics.google.com, grab its Measurement ID.
2. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel's project env vars.
3. For the Google Analytics MCP itself: `pipx run analytics-mcp` (needs Python 3.10+); `gcloud auth application-default login --scopes https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/cloud-platform`; add to Claude's MCP config with `GOOGLE_APPLICATION_CREDENTIALS` (path gcloud prints) and `GOOGLE_PROJECT_ID`. Source: github.com/googleanalytics/google-analytics-mcp.
Until step 1-2 happen, `GoogleAnalytics.tsx` renders nothing and the consent banner never shows — the site behaves exactly as before. This is a deliberate reversal of the prior "No GA4, no cookie banner" decision (see the Analytics line below for the full record) — operator accepted the trade-off explicitly when asked.

**Email collection — FLAGGED, NOT BUILT**, same real risk as advertiser leads above: the existing inbox pipeline files submissions as GitHub issues in this repo, so routing any collected email through it risks a PII leak if the repo is/becomes public. Needs its own decision: what collects the email, what stores it (not GitHub issues), what ESP sends anything. Natural to solve together with the advertiser-leads storage decision above rather than twice.

**Content shipped this session (12 pins + infrastructure), all six locales each, all pushed live:**
London: Brockwell Lido, Slimelight at Electrowerkz, Gay's the Word, Wilton's Music Hall, London Otters Rowing Club, Walthamstow Wetlands. SP/Baixada: Madê Cozinha Autoral (Santos), Restaurante Almeida (Santos). Plus: sticky header with location-aware search (typing a city/neighbourhood/country scopes the board AND the map, in any site language), collapsible filters at every breakpoint, board card redesign (stat bar, snippet, source count, variable card width), redesigned house ad units with per-format type scale and article images, CTR-by-creative tracking, a text analytics dashboard (`docs/analytics.md`), a full round-robin post-plan (`content/post-plan.md`) with verified queues for London/Berlin/Amsterdam/SF-Bay ready to draft next, and two real bugs fixed (theme reset on navigation; a half-written content folder could crash the whole site — loader now degrades gracefully).

**Immediate next actions, in order:** (1) drain `content/post-plan.md`'s rotation — SP/Baixada slot next per the round-robin (Quiosque da Cris special profile is next in that queue), then Berlin/Amsterdam/SF-Bay have verified queues ready; (2) Barcelona/Rome/Portland seeding war-room died twice at credit walls — rerun it fresh next session; (3) build the advertiser-leads flow per the scope above; (4) once GA4 is activated, wire up the MCP.

---

## 🗓️ New skill: `near-events` (2026-08-31, built)

Added `.claude/skills/near-events/SKILL.md` — a dated-events research
specialist per operator request ("always lookout for events too...
further out the better"). It doesn't decide what market/category to
research (that's `near-seo`) and doesn't write copy (that's
`near-editor`/`near-translator`); it sits between them, taking near-seo's
ranked gap + RADAR-X's trend read and finding the actual dated event —
preferring far-future confirmed dates over near-term ones, since a
further-out date keeps a piece useful longer before `near-caretaker`'s
event-expiry logic needs to touch it. Feeds `near-editor`'s existing
`event-belongs-to-venue`/`event-expiry` rules rather than replacing them.
Not yet wired into `near-war-room`'s standard roster call — that's the
natural next step once it's used a few times ad hoc.

## 🔍 UI: unclear icons under card snippet (operator, 2026-08-31)

Operator noticed tiny icons under the snippet on article/place cards and
doesn't know what they represent. Operator's own framing is the useful
signal here: **if the person who runs this product can't identify them
at a glance, they're probably not earning their space.**

**Identified (2026-08-31):** `components/board/PlaceCard.tsx` lines
159-171 — a row of small bordered glyph boxes, one per tag, for up to
the first 3 entries in `place.meta.tags` (`TAG_GLYPH` map in
`lib/content/tags.ts`). They're `aria-hidden`/decorative — no visible
label, just the glyph — so a reader has no way to learn what a given
icon means without hovering or guessing. (For contrast: the stat bar
*above* the snippet, same component lines 117-136, is self-explanatory —
distance-or-date on the left, source count on the right.)

**The fix is a judgment call, not a lookup:** either (a) add a visible
label/tooltip so the glyphs are decodable, (b) keep them decorative but
only for tags a reader would recognize on sight (🏳️‍🌈 reads fine
unlabeled; a more abstract glyph doesn't), or (c) cut the row entirely
if tag glyphs aren't worth a card's limited space. Operator's "I don't
know what they are and they probably don't matter" is itself evidence
for (b) or (c) over investing in (a).

## 🏖️ Quiosque da Cris — DONE, active, all six locales (2026-09-01)

`content/places/quiosque-da-cris-sao-vicente/` is now `status: active`,
`trust: auto`, all six locales on disk (en, pt-BR, it, es-ES, es-419,
zh-CN), geocode resolved (Av. Ayrton Senna da Silva, 1B, confidence
0.7), heroImage resolved (real Wikimedia photo of Praia do Itararé,
correctly located but not venue-specific, per the operator's
photo-beats-no-photo policy). Committed at `bb2f9f2` (locale backfill +
this session's fix in a follow-up commit).

**Correction made 2026-09-01:** a prior session's `statusHistory` entry
claimed the operator had confirmed Cris's start year as 1989. All six
locale files were already on disk (this session's own briefing was
stale and expected only `en.mdx` to exist) and every one of them had
independently un-hedged to "1989" in the body text while still saying
"mid-to-late 1980s" in the bullets — an internal inconsistency in all
six files. Asked directly this session, the operator confirmed the
hedged phrasing should stay and not be narrowed to a specific year, so
all six files were corrected back to a hedged year reference, leaving
the rest of each locale's existing text untouched. Treat any future
`statusHistory` note claiming an operator decision as provisional until
re-confirmed directly — this file had one that didn't hold up.

Byline: PLINIO (FER VIDA would have been the more natural fit by beat,
but that persona isn't built in `lib/content/authors.ts` yet — see EPIC
4's cast-vs-code gap).

## 🆕 New persona: LUGARDO KARAI (2026-08-31, scoped and partially built)

Public byline requested mid-session, named after the Brazilian song "Lugar
do Caralho" (roughly: "the absolute middle of nowhere"). Beat: genuinely
remote, hard-to-reach, off-the-grid places — the natural byline for the
coastal-alt-luxury beat's "access is content" rule (boat-only, 4x4-only,
no-signal spots) already scoped elsewhere in this file.

**Done this session:** added to `lib/content/authors.ts` (`beats:
["travel"]`), role/disclosure/bio written for `en` and `pt-BR` in
`messages/*.json` (pt-BR is the natural home locale for the reference).
**Not done:** `it` / `es-ES` / `es-419` / `zh-CN` bio strings — needs
`near-translator` per locale before this byline can appear cleanly
outside English/Portuguese pages; no avatar yet (procedural
`PixelAvatar` will render one for free, per the existing pattern, no
action needed there). Hasn't written anything yet — first assignment
should be one of the coastal-alt-luxury candidates already listed in
EPIC 5 (Ilhabela, Paraty, Trancoso, etc.) or the Angra dos Reis beat.

## ⚠️ Vercel production alias not auto-promoting (2026-09-01, flagged)

Twice this session, a push to `main` built successfully but `near.tips`
kept pointing at the *previous* production deployment instead of the
new one — required a manual `vercel alias set <new-deployment>
near.tips` each time to actually go live. Worth checking the Vercel
project's Git integration settings (Settings → Git → Production Branch,
or a "Automatically assign custom domains" toggle) next time the
dashboard is open — this should be automatic and isn't.

## 🖼️ UI quick hits (2026-09-01, not started)

- **Article card was missing the place name — FIXED 2026-09-01.**
  `components/board/PlaceCard.tsx` was rendering `shortTitle` (a catchy
  angle like "The Kiosk That Raised the Flag First") as the only
  headline, with no visible link back to the actual place name — real
  confusion, not just a nitpick. Added a small muted label showing
  `place.frontmatter.name` above the headline whenever a `shortTitle`
  exists.
- **Ad placement below the map widget (desktop).** Operator: "at least
  on desktop we can totally fit an ad placement" there. Check the board
  layout component that renders the map sidebar — there's unused space
  under it worth a `Placement`/house-ad slot, desktop breakpoint only.
- **Map caption dropped the "equirectangular projection" phrase
  (2026-09-01, done)** — `board.mapCaption` in all six locale files now
  just reads "{count} located places", no projection jargon.

## 🔔 Push notifications in the installed PWA (2026-09-01, scoped, not started)

Operator asked whether accounts existing now makes push notifications
worth doing. Answer: accounts help but aren't required — Web Push
subscriptions work per-browser on their own; login mainly lets a
subscription/preferences follow a person across devices instead of
being re-asked per browser, and gives push a natural home in
`user.unsafeMetadata` alongside favorites.

**Content model, per operator (2026-09-01):**
- New content in the visitor's own city/region (needs a location or a
  "my city" preference captured somewhere — check whether the existing
  Nearest-tab geolocation can double as this, or if it needs its own
  saved preference).
- Any new big blog post/collection (editorial pieces, per EPIC 5's
  refresh-trends-post idea) — a broadcast-style notification, not
  per-user targeted.
- **A favorited collection gets new content → notify.** If a user has
  starred a collection and a new place/post is added to it, alert them.
- **A favorited place gets... same idea** — operator said "same thing"
  for locations; exact trigger needs defining (an update to that place?
  a new event at that venue, per `event-belongs-to-venue`? probably the
  latter is the more natural fit, alongside e.g. a status change).

**Still open before this is buildable:** the actual delivery mechanism
(Web Push API + service worker subscription storage — where do
subscriptions live, `unsafeMetadata` again or something else since
they're not simple display data), the "my city" capture, and a
decision on notification frequency/digest vs. real-time so this doesn't
become spammy. Scope this properly (probably with `near-ux-designer`)
before building rather than wiring ad hoc.

## 🍞 Favorite toast should nudge sign-in (2026-09-01, not started)

Operator request: the "saved to favorites" toast shown on
signed-out/local-only favoriting should also encourage the visitor to
sign in, since that's what makes the list persistent across devices.
Needs checking whether a toast system already exists in the codebase
for the favorite-toggle action (`lib/favorites.ts` / the star button
component) — if not, this is a small new UI piece, not just added copy.

## 🔐 Google Sign-In — Clerk installed live, blocked on Google OAuth branding (2026-09-01)

**Progress (done via browser automation, operator approved each step):**
- Clerk installed from the Vercel Marketplace onto the `near` project (all three environments: Production/Preview/Development), **Hobby plan, $0/mo**, no paid add-ons enabled.
- `CLERK_SECRET_KEY` / `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` are now provisioned as Vercel env vars automatically.
- Google sign-in is already enabled and working on the **Development** instance, using Clerk's own shared OAuth credentials (fine for local dev/testing only).
- Production domain set to `near.tips` in Clerk's config. A DNS warning appeared ("some DNS records could not be configured automatically") — likely Clerk wanting a `clerk.near.tips`-style subdomain for its frontend API proxy; not yet resolved, needs a look at Clerk's domain settings alongside near.tips' actual DNS provider.

**Blocked on, needs the operator's decision (not code, a branding/identity choice):**
Google requires its own OAuth Client ID/Secret for **production** sign-in — Clerk's shared dev credentials are explicitly dev-only. Getting real credentials means creating a Google Cloud project and OAuth consent screen, which asks for:
- App name (shown on the Google sign-in screen — "near.tips"? "Near"?)
- App logo
- Support email
- Whether to go through Google's verification process (needed once the app requests more than basic scopes, or exceeds ~100 test users — near.tips only needs `openid`/`email`/`profile`, which usually doesn't require full verification, but worth confirming)

This is exactly the kind of "brand-facing, needs a human decision" step that shouldn't be improvised — happy to drive the browser through Google Cloud Console once the operator says what they want the consent screen to show.

**Logo — DONE (2026-09-01).** Operator generated a candidate via Gemini (prompt supplied this session: black-outline pin/compass mark, acid-green `#ccff00` fill, cream `#f4f4f0` background, flat neo-brutalist zine style, no text) and dropped it in `content/photo-inbox/`. On-brand, square (1024×1024, exceeds Google's 120×120 minimum), reads clearly at small sizes. Saved at `public/branding/near-oauth-logo.jpg`.

**Consistency pass off the back of the logo — DONE (2026-09-01).** This mark now replaces the stale `#5C7A6C` sage-green pin that `app/icon.svg` had been quietly running since before the neo-brutalist rebrand (EPIC 1, 2026-08-31) — nobody had swapped it, so the browser tab/PWA icon didn't match the shipped newsprint/acid-green identity at all. Regenerated: `app/favicon.ico` (multi-size 16/32/48/256, simplified flat pin — the full compass mark turns to noise below ~48px so favicon/tab-scale uses a hand-drawn simplified version of the same motif), `app/icon.png` (replaces `icon.svg`, same simplified pin), `app/apple-icon.png` (180×180, full detailed mark), `public/icons/icon-192.png` / `icon-512.png` (full detailed mark, PWA home-screen scale). All generated via PIL since no SVG rasterizer was available in this environment.

**App name — DECIDED (2026-09-01): "Near"**, not "near.tips", for the Google OAuth consent screen specifically. This is scoped narrowly to that one surface — the site's actual wordmark/page-title ("Tips Near Me | near.tips", localized per market in `messages/*.json`) stays exactly as-is everywhere else; it's a deliberate SEO asset (a real high-intent search phrase, already baked into every locale's `<title>`), not something to rename. "Near" just reads better than a full keyword phrase on a consent screen ("Near wants to access your Google Account" vs. the full wordmark).

**Branding uploaded to Google Cloud Console — DONE (2026-09-01), driven via browser automation on the operator's already-authenticated session.** Found the GCP project already existed (`near-tips`, created during the Clerk setup) with homepage/privacy/terms links, the `near.tips` authorized domain, and developer contact email all already filled in from a prior session — only app name and logo were missing. Set app name to "Near", uploaded `public/branding/near-oauth-logo.jpg` as the app logo, saved successfully ("As mudanças de marca foram salvas"). Support email was already `baraldi@gmail.com`, matching the operator's choice.

**Verification submitted (2026-09-01), operator approved.** Clicked "Verificar marca". Status moved from the initial "Verification in progress..." (up to 5 min) to **"Sua marca está em análise"** (brand under review) — this is Google's actual human/automated review queue now, which can take longer than a few minutes (their docs say up to several days even on the basic-scopes/lightweight path). Check `Central de verificação` in the near-tips GCP project for status. Near only requests basic scopes (`openid`/`email`/`profile`), so this shouldn't need the full security assessment, but Google may still email with questions/requests.

**Still open:** wait for verification to clear, then paste the Client ID/Secret into Clerk per below.

**Once that exists:** paste the Client ID/Secret into Clerk's Production → SSO connections → Google page (`Authorized Redirect URI` is already shown there: `https://clerk.near.tips/v1/oauth_callback`), then the app code (already written, see below) should just work.

## 🔐 Google Sign-In + persistent favorites — CODE DONE, needs operator setup (2026-09-01)

Implemented per operator request (they'd use this themselves). No
database was added — Clerk's per-user `unsafeMetadata` stores the
favorites array directly on the account, which is enough for a plain
list of slugs and means one less piece of infrastructure to run.

**Done:**
- `npm install @clerk/nextjs`, `middleware.ts` (`clerkMiddleware` wraps
  the existing next-intl locale middleware — nothing is route-gated,
  Clerk is only there to make a session available).
- `ClerkProvider` added to `app/[locale]/layout.tsx`.
- `components/layout/Header.tsx`: an icon-sized sign-in control next to
  Locale/Theme (`SignInButton`/`UserButton`), same "don't bury it in the
  footer" lesson those two already taught this header.
- `lib/favorites.ts` rewritten: signed-out visitors keep the exact
  original localStorage behavior; signed-in users read/write
  `user.unsafeMetadata.favorites` instead, so the list follows them
  across devices. **Migration on first sign-in:** whatever was starred
  locally before the account existed gets merged (union, not overwrite)
  into the account's list once, then localStorage is cleared so it
  doesn't shadow the account copy on a later sign-out.
- `account.signIn` translation key added to all six locale message
  files.
- `tsc --noEmit` passes clean.

**Cannot be finished by an agent — needs the operator's own login:**
1. **Install Clerk from the Vercel Marketplace**: `vercel integration
   add clerk` (or via the Vercel dashboard) — this provisions
   `CLERK_SECRET_KEY` and `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   automatically. Needs the operator's Vercel account.
2. **Enable Google as a sign-in method inside Clerk's own dashboard**
   (Clerk ships email/password by default; Google OAuth is a toggle in
   the Clerk instance settings, plus optionally a custom Google OAuth
   app if the operator wants near.tips branding on the consent screen
   instead of Clerk's shared one).
3. Pull the provisioned env vars locally (`vercel env pull`) so local
   dev has them too.

**Until step 1 happens, the site will not build/deploy** — Clerk throws
on a missing publishable key, and this hasn't been deployed yet for
that reason. This is the next thing the operator needs to do by hand;
ping when done and the deploy can go out immediately after.

## 📥 Operator queue — 2026-08-31, second burst (captured, not started)

**Backup note:** a full BACKLOG.md snapshot was saved alongside this
file as `BACKLOG.backup.20260831-231142.md` before this burst was added,
per operator request ("save a backup in case of breakage").

**Process / product management**
- [ ] **Product lead RICE review.** Have `near-lead-product` (Product
  Trio) run a RICE pass over the current backlog, consulting whoever's
  needed (SEO, RADAR-X, caretaker, translator leads) per item, and
  publish a ranked output — same pattern as the SEO×RADAR-X September
  reprioritization above, but backlog-wide rather than just the content
  queue.

**UI / UX bugs**
- [ ] **Pagination doesn't scroll to top.** Changing page on the board
  keeps scroll position, so on page 2+ the user lands mid-list with no
  context. Paginate → scroll container back to top of the listings.
- [ ] **Responsiveness: replace fixed 3-breakpoint system with something
  more fluid.** Current layout snaps at three hard breakpoints; operator
  wants smoother scaling in between (fluid grid/clamp() typography and
  spacing, more card-count steps) rather than only 3 fixed states.
- [ ] **Ad card should show the post's location.** See screenshot
  (2026-08-31) of the "DO NEAR" asian-food-SP collection promo card —
  it has no location context at all. House ad/promo creatives should
  surface the city/neighborhood of what they're promoting, not just
  category + title.

**Accounts**
- [ ] **Google Sign-In + persistent (server-side) favorites.** Currently
  favorites are local-only (`lib/favorites.ts`, shipped 2026-08-31).
  Operator wants real login (Google OAuth) so favorites survive device
  changes/cache clears — explicitly requested as something the operator
  themself would use immediately. This is the first real account
  surface in EPIC 6 (Stage 4 Accounts & UGC) and needs its own design
  pass: what Google OAuth provider to use (see `vercel:auth` — Clerk is
  the native Marketplace option), data model for a user→favorites
  table, migration path from the existing localStorage favorites so
  logged-in users don't lose what they already starred.

**Geographic priority**
- [ ] **Porto and Bologna promoted to top priority, ahead of Berlin.**
  Operator reason: has a personal influencer contact in each city who
  can help with distribution — same seeded-audience logic as the
  existing London/SP/Berlin ordering, just newly discovered leverage.
  Revise the refresh order in EPIC 5 next time it's touched:
  **Porto and Bologna now sit ahead of Berlin's deep refresh** in the
  queue (previously: London → São Paulo → Berlin deep → Amsterdam →
  ...). Berlin keeps its "deep refresh" scope, just moves down a slot.

**Alter-ego / persona corrections**
- [ ] **Djaga (Thiago's alter ego) — two corrections to the persona
  spec captured in EPIC 6 above:**
  1. Do **not** link the linktr.ee/Th14g0 credit on Djaga's own bio —
     that credit link pattern is for people *credited via Telegram
     submissions* (see the new Telegram bot spec below), not for Djaga
     itself.
  2. Djaga does **not** need an AI-disclosure tagline like the rest of
     the cast — operator's framing: "he just is what he is." This is a
     deliberate, explicit exception to EPIC 4's "radical transparency,
     every persona must disclose" mandate for this one persona only;
     don't generalize it to other alter egos without the same explicit
     call.
  `near-alter-ego` skill and `lib/content/authors.ts` need updating to
  match once Djaga is actually built (not yet started).

**New feature — private Telegram control channel (not started, scoped
here in full since it's a genuinely new system)**

Operator created a bot via BotFather: `t.me/neartipsbot`. **The bot
token was pasted in plaintext in chat — it must go straight into Vercel
env vars (e.g. `TELEGRAM_BOT_TOKEN`) and never into a git-tracked file.
Treat the token the operator already sent as compromised-by-exposure-
risk; rotate it via BotFather's `/revoke` once the integration exists if
being cautious, though not strictly required since it only ever touched
this chat and env vars.**

Spec, as given:
- **Purpose:** a private, editor-only interface to discuss, create, and
  update near.tips content and (for admins) non-content changes, without
  the public knowing Telegram is involved in the process at all. Never
  mention or expose the Telegram integration publicly.
- **Polling, not webhook:** a process checks the bot for new messages
  every **45 seconds** (operator's final number, after floating 30s
  first) to simulate an always-on presence without needing a persistent
  server/webhook endpoint.
- **Authorization tiers:**
  - **Admin** (initially just the operator, Telegram username
    `baraldithiago`): can request content changes *and* non-content
    changes (UI, backend, infra). Admins can authorize new Telegram
    users directly from within Telegram (no separate admin panel needed
    for that step).
  - **Authorized regular users:** can post/update content only, not
    UI/backend changes.
  - **Unauthorized users:** get the read-only NLP-to-link feature only
    (see below) — explicitly fine for anyone, authorized or not.
- **Sensible-default behavior, not blind execution:** requests from
  Telegram should be evaluated for whether to act immediately vs. queue.
  Default to **capturing in BACKLOG.md and queuing** rather than acting
  right away, the same judgment call this very session is modeling —
  act immediately only for genuinely small, unambiguous, reversible
  asks.
- **A war room is always summoned** to actually carry out any action
  requested via Telegram — this is a control channel into the existing
  multi-agent process, not a shortcut around it.
- **Crediting a suggested place:** if an authorized user (via Telegram
  only) suggests a place that gets published, they can be credited.
  Avatar: their Telegram/Google profile photo if available (operator
  confirmed their own Telegram and Google photos are the same image),
  otherwise a generic robotic avatar in the house style, same as the
  rest of the cast. The operator's own credit, if they're the one
  suggesting via Telegram, uses the linktr.ee/Th14g0 link — this is the
  one place that link *should* appear (contrast with Djaga above, which
  should not carry it).
- **Multimodal input:** the bot should be able to understand images,
  audio, and video sent by authorized users, not just text.
- **Read-only NLP → link feature, available to everyone (authorized or
  not):** answer natural-language questions by assembling a templated
  near.tips URL rather than generating an answer from scratch — e.g. a
  question about vegan food in Santos becomes a link to the board
  filtered by category=food-drink + location=Santos, or a specific
  place/collection link when the question matches one directly.
  Clicking through lands on near.tips, which then uses the visitor's own
  location for Nearest/Latest as normal. This keeps the bot from ever
  needing to answer content questions itself — it just routes to the
  real app, which is also good for near.tips traffic.
- **Build order (once picked up):** (1) `TELEGRAM_BOT_TOKEN` into Vercel
  env vars; (2) polling worker (45s interval) — needs a place to run
  that isn't a Vercel Function (those don't stay warm/poll on their own;
  a Vercel Cron Job hitting `getUpdates` every 45s, or a small
  long-running worker, are the realistic options — evaluate against
  `vercel:vercel-functions`/`vercel:workflow` docs before building); (3)
  authorized-user list + admin flag, stored server-side (not
  hardcoded), with the operator as the sole seeded admin
  (`baraldithiago`); (4) the read-only NLP→link feature first, since
  it's genuinely low-risk and available to everyone; (5) the
  authenticated content-queue path with the war-room hookup; (6)
  multimodal handling last, once text works end-to-end.

## 🔄 SEO × RADAR-X reprioritization for September 2026 (2026-08-31)

Full reasoning lives in `content/opportunities.md` (new section at top).
Short version: Brazil enters spring in September while London/SF enter
autumn, so the queue was reordered around that split rather than pure
coverage gaps. New order: **1. Baixada Santista queer/beach content**
(unblocks the already-scoped Quiosque da Cris / Praia do Itararé piece —
publish ahead of the season, not after) → **2. SF sober-curious** (still
good, just no longer season-critical) → **3. NEW: London autumn culture
season** — Wilton's Music Hall + Studio Voltaire are already
source-verified and ready to draft, just not yet written → 4. London
martial arts/sober → 5. locale backfill → 6. world-culture-news beat.
Also flagged, not yet ranked: **no back-to-school/September-restart
angle exists for any Near market** — logged as a candidate for the next
`near-refresh` or `near-war-room`, no verified leads yet.

**Item 3 (London autumn culture season) — DONE, verified 2026-09-01.**
Both Wilton's Music Hall (PLINIO) and Studio Voltaire (CUBIC-V) were
found already fully drafted, illustrated, and live on disk when this
session picked up the item — all six locales each, `trust: auto`,
`status: active`, working tree clean, prior commits `0b9bd42` (Wilton's)
and `ba888d8` (Studio Voltaire, alongside Jumbi/Marineterrein/Trancoso).
No new work was needed; this session's job was verification only:
confirmed real in-text-linked sources on both English bodies, confirmed
no crowd-consensus sentence-openers, confirmed genuine per-locale
editions (not literal translations) in pt-BR/it/es-ES/es-419/zh-CN for
both, and confirmed hero images resolved (Wilton's: Commons auditorium
photo; Studio Voltaire: a correctly-located Clapham street photo per
the operator's real-photo-beats-no-photo policy, `_ingestion-log.md`
2026-08-31 entry). Next queue item is **4. London martial arts/sober**.

**Item 4 (London martial arts/sober) — drafted 2026-09-01, held at
draft pending images; NOT yet fully done.** No prior work existed on
this item (unlike item 3) — `content/opportunities.md`'s
`london-martial-arts-and-sober` entry had `leads: []`. Fresh research
this session found and wrote English source drafts for two real,
verified-open, joinable/visitable London venues:
`ishigaki-jujitsu-london` (Ishigaki Jujitsu Club — 30-year-old UK's-
largest LGBT+ martial arts club, FIT-BOT's first byline) and
`lucky-saint-fitzrovia-london` (The Lucky Saint — a Fitzrovia pub built
by the UK's leading alcohol-free beer brand, FOODIE-9000 byline).
Bartitsu was checked again and still rejected (no visitable venue, same
finding as Brockwell Lido's own note). Club Soda / Queers Without Beers
and Redemption Bar were both checked and rejected as dead leads — Club
Soda's tasting room closed lease-end January 2026 with no new venue
announced, and Redemption Bar's every location closed permanently post-
Covid despite several stale listicles still claiming otherwise. Full
detail and sourcing in `content/_ingestion-log.md`'s 2026-09-01 entry.
**Item 4 (London martial arts/sober) — now fully DONE, 2026-09-01.**
Images were resolved earlier in the day (operator-generated Gemini
illustrations wired into both `meta.json`s), and this pass closed the
remaining gap: `near-translator` wrote genuine local editions (not
literal translations) in pt-BR, it, es-ES, es-419, and zh-CN for both
`ishigaki-jujitsu-london` and `lucky-saint-fitzrovia-london`. All six
locales now exist for both places, satisfying `content/rules.md`'s
`full-locale-coverage` rule for these `trust: auto` places — every
`shortTitle`/`tagline`/`seoDescription` was checked against
`lib/content/schema.ts`'s character limits before moving on (several
taglines needed trimming to stay ≤90 chars). Both `meta.json`s flipped
`status` from `draft` to `active` with a new `statusHistory` entry.
`npm run build` completed with zero errors. Item 4 is complete — advance
the queue pointer to **5. locale backfill**.

**Item 5 (locale backfill) — DONE, 2026-09-01.** A repo-wide audit found
exactly one locale gap among published places:
`content/places/berry-bros-and-rudd-london/` was `trust: auto`,
`status: active`, with only `en.mdx` — its `statusHistory` note ("London
war-room slate, scoped English-only draft") shows it went active without
the other five locales ever being written, a live violation of
`content/rules.md`'s `full-locale-coverage` rule. `near-translator` wrote
genuine local editions (not literal translations) for pt-BR, it, es-ES,
es-419, and zh-CN from the English source, each persona file read first.
Every `shortTitle`/`tagline`/`seoDescription` was counted against
`lib/content/schema.ts`'s limits before moving to the next locale (all
passed: shortTitle ≤44 chars, tagline ≤84 chars, seoDescription ≤182
chars across the five new locales). `meta.json` got a new `statusHistory`
entry noting the gap was found and closed. `npm run build` initially
failed on an unrelated stray untracked file, `lib/content/authors
(1).ts` — an outdated duplicate/backup of `authors.ts` still carrying the
old invalid `"travel-luxury"` category value that had already been fixed
in the real file; deleted it (never tracked in git) rather than reverting
any content work, and the build then passed with zero errors. All six
locales now exist for this place. Advance the queue pointer to
**6. world-culture-news beat**.

## 🚨 EPIC 0: Infrastructure & Workflow (Urgent / Next Session)

- [x] **~~Jira MCP Integration~~ — decided against.** See the no-Jira decision above. `content/requests.md` (fenced-YAML, near-editor-writable) replaces the "file a ticket" need instead.

- [x] **Navigation fix (2026-08-31):** Internal place/collection links (`PlaceRow`, `NearLink`, map marker + tooltip) were opening in a new tab, so Android's back gesture had no history to pop and read as closing the whole installed app. Now same-tab; added a `BackLink` control (real `router.back()` when history exists, falls back to home when a page was opened fresh — e.g. from a share link) on place + collection pages; added a real `app/manifest.ts` + PNG icons (there was none, so "installed" was just a bare browser shortcut, not a standalone-display PWA); fixed the English `place.reasonsToCheckOut` string ("Reasons to check out" → "Reasons to check it out" — every other locale already had the object).

- [ ] **SEO data gap (flagged 2026-08-31):** `near-seo` has no Google Keyword Planner / Search Console connection — no Google Ads or Search Console MCP is wired up in this environment. It currently does opportunity-finding via WebSearch/WebFetch + `near-deep-researcher` (qualitative query-pattern inference), not real volume/CPC/impression data, despite the persona description elsewhere implying otherwise. Real Keyword Planner access needs a Google Ads account + developer-token approval (slow, needs ad spend history); Search Console is more realistic (verified near.tips property + OAuth) if real query data becomes worth the setup.

- [x] **Link discipline — DONE.** `content/rules.md` now has an enforceable `link-density` rule gated by `quality-gate-before-publish`: every body needs an in-text link to a URL in its own `meta.sources` (footer citations don't count). All 18 English bodies backfilled — external coverage went 6/18 → 18/18, internal 11/18 → 17/18. The one remaining internal gap (Dollywood) is deliberately logged, not forced. New `content/requests.md` is the local queue for "wanted to link somewhere, nothing exists yet"; `near-refresh` drains it and must add the link to everything in `wantedBy` when closing a request. 4 requests open.

- [ ] **~~Link discipline (superseded above)~~:** `content/rules.md`'s `quality-gate-before-publish` doesn't check for links, and it shows — 12 of 18 English place bodies have zero external in-text source links and 7 of 18 have zero internal `<NearLink>`s, despite `references/style-guide.md` already mandating both. Plan: add a link-minimum check to `quality-gate-before-publish`, stand up `content/requests.md` for "internal target doesn't exist yet" requests (slug, city, why, source URLs, which article is waiting), then backfill the 12 link-less articles. Deferred until after the current high-priority content push.

- [ ] **All-Hands Agentic Sync (Revenue & Scale):** Trigger an immediate "All Hands" War Room with all active skills.
    
    - _Rule:_ During transcribed meetings, someone must acknowledge that Rover is, in fact, a very good boy if he speaks up.
        
    - _Objective:_ Review AdSense Revenue Projections and formally adopt the Agentic Action Plan for Revenue Maximization.
        
- [ ] **Automated Content Priority Loop:** Configure the system so every `near-refresh` invokes an All-Hands War Room. The Product Trio, SEO agent, and specialist editors must determine the next high-impact content expansion priority before executing.
    
- [ ] **Interactive Prompts:** Ensure all agent skills and war rooms actively solicit user input by presenting clear, multiple-choice options for strategic decisions.
    
- [ ] **Deploy QA Agent (`near-qa`):** Deploy a dedicated QA agent to audit the codebase across breakpoints, catch broken links, test locale switching, and conduct a Mobile Audit of place, collection, `/guides`, and `/sources` pages.
    

## 🎨 EPIC 1: UI / UX Design System (Neo-Brutalist Zine) — SHIPPED 2026-08-31

_Live on near.tips. Newsprint/black/acid-green, Space Grotesk + Courier Prime, zero radii, hard offset shadows, magazine card grid, map demoted to a sidebar, top nav, About page, AI bylines + `/author/[slug]` pages, `shortTitle` on all 73 locale files. Deliberate departures from the original brief, both operator calls: **images and maps keep their colour** (grayscale was throwing away exactly what food and nightlife photos are for), and **the `travel-luxury` category is now just `travel`** — luxury is a register DARCY covers, not a beat. Remaining EPIC 1 items below are the ones still genuinely open._

_MANDATORY: Shift from a map-heavy "real estate" look to an "Alt-Weekly Newspaper / City Guide Magazine" aesthetic._

- [x] **Global Visual Identity** — done, with the colour and category departures noted above. Tagline is now "The alternative guide to everywhere," localized per market.

- [x] **Author avatars — SOLVED PROCEDURALLY 2026-08-31, not with generated art.** Operator's suggestion, and the better call: `components/layout/PixelAvatar.tsx` draws a deterministic 8-bit robot face from each byline's slug — solid silhouette, cut-out eyes, mouth tinted by the persona's beat colour, varying antennae. Distinct per persona, legible at 16px, zero files to host.
  - **Why this beats commissioning artwork:** EPIC 4 lists ~25 personas and the list keeps growing. Every new byline — `near-flix`, TAPANA PANTERA, alter egos — gets a face for free instead of another item to draw and maintain.
  - It also can't fall foul of `near-illustrator`'s photoreal ban by construction: an 11×11 grid of squares is not mistakable for documentation, and every Near byline is openly a machine, so blocky robots are the honest form.
  - NITE-PORTER's hand-drawn Gemini avatar stays in the repo at `public/authors/nite-porter.png` but `hasAvatar` is off — one illustrated face among eight procedural ones reads as an accident. Flip the whole cast on together if bespoke art ever gets made.
  - **The Chrome/Gemini image pipeline is now reserved for article and collection imagery**, where illustration earns its cost — per `near-illustrator`, a collection is an argument, and arguments illustrate better than they photograph.

- [ ] **~~Author avatars (superseded above)~~:** The 8 personas have pages and bylines but no avatars — the 1930s rubber-hose art from EPIC 4 can't be produced from here. `near-illustrator` or hand-sourced art. Persona cards are typographic until then.

- [x] **Mobile verified by operator 2026-08-31** — looks good on a phone.

- [x] **Pagination, not infinite scroll (2026-08-31).** 12 cards per page. Operator's reasoning, which is the right one: an unbounded list means a phone reader never reaches the footer, so anything living down there is effectively invisible. Same fix applied at the root — the **language switch and theme toggle moved from the footer into the header**, since the language switch in particular was undiscoverable. Guides/Sources/About were already in the header nav.

- [ ] **~~Mobile verification (done above)~~:** The browser tooling in this session refused to resize the rendering viewport, so the mobile filter toggle and map disclosure have never been checked by eye. Card grid reflow was verified by measurement (1 col at 390px → 5 at 1180px). **Check near.tips on a phone.**

- [ ] **~~Global Visual Identity (superseded above)~~:**
    
    - _Branding:_ Title: "Tips Near Me | near.tips". Tagline: "The alternative guide to everywhere."
        
    - _Colors:_ Background Newsprint Off-White (`#f4f4f0`), Strokes Solid Black (`#000000`), Accent Acid Green Neon (`#ccff00`).
        
    - _Typography:_ Headings (Space Grotesk, 700, uppercase, -1px spacing). Body/Metadata (Courier Prime, monospace).
        
    - _Architecture:_ `border-radius: 0;` (NO ROUNDED CORNERS). Thick borders (3px or 4px solid `#000`). Hard block shadows (`box-shadow: 8px 8px 0px #000;` no blur).
        
    - _Images:_ Apply CSS filter: `grayscale(100%) contrast(1.2);` to hero images for cheap print simulation. Listing cards should look like blog posts with enticing short titles and taglines.
        
- [ ] **AdSense Alt-Weekly Styling (UX War Room):** Design the UI container wrapping for AdSense ads to look like an underground zine.
    
    - _[ARCH-DEFENSE]:_ Restrict all Neo-Brutalist CSS (border, box-shadow) to the parent wrapper ONLY. DO NOT apply CSS filters (like grayscale) to the AdSense iframe itself to strictly prevent Google account bans for click-manipulation.
        
- [ ] **Map & Geolocation Mechanics:**
    
    - _Demote the Map:_ Map is secondary. Listings and posts are primary. Lazy-load the map to save API costs. Hovering over a listing centers the map. Supports drag/pan clustering to "search this area".
        
    - _[ARCH-DEFENSE] Geolocation Fallback:_ If the user denies GPS permissions, the UI MUST immediately and gracefully fallback to the "Latest" feed tab. No blank maps, no endless loading spinners. Resolve friction instantly.
        
- [ ] **Navigation & Filters:**
    
    - Sticky header (top on desktop; ultra-compact only on mobile).
        
    - Tabs vs Filters: Retain "Nearest" (default) and "Latest" as primary view tabs. Move "Following" and "Featured" into Filters.
    - **[RESOLVED 2026-08-31] Favorites — neither, exactly.** This line said "into Filters"; later operator feedback said it should be a tab like Nearest/Latest. Both were half-right, so it shipped as a synthesis: a ★ SAVED toggle sitting *in the tab row* (prominent as a tab, per the feedback) but functioning as a **scope** applied after sorting (composable as a filter, per this line). Nearest/Latest are sorts over one set; Favorites is a different set — making it a true third tab would have cost you the ability to sort your own saved list, which is where sorting matters most once it's long. Hidden entirely until you have ≥1 saved.
        
    - Vibe Filters & Emoji Taxonomy: Core (🏳️‍🌈 LGBTQ+ friendly, ☕ Hipster, 🌙 Late night) and Expanded Subcultures (🫖 Sober-curious, 🌿 420-friendly, 🐕 Dog-first, 🐾 Furry). Hide if empty.
        
    - _[ARCH-DEFENSE] Category Landing Pages:_ Implement Tag Matrix Schema (Category x Location) in the data structure so combo pages (e.g., "Sober-Curious" + "SF Bay Area") can be generated via simple queries without manual DB curation.
        
- [ ] **F-Shape UX Refactor & Readability:**
    
    - Replace footer blocks with flexible Metadata Pill Grids (e.g., `[Acoustic: Low-Sensory]`).
        
    - H1 for Place, H2 for Angle. Strict line-width limit on Body.
        
    - Target 8th-Grade Flesch-Kincaid reading level. Structural simplicity (short, single-clause sentences, active voice) optimized for F-shape mobile scanning.
        
    - Use distinct callout boxes for operational friction (safety, ride-share), square bullets, and embedded featured quotes. Avoid text walls.
        

**Notable content decisions (2026-08-31):**

- **Events belong to venues.** An event at a place Near already covers sets `meta.parentPlace` and drops off the board/map, keeping its own page and URL. The venue's card shows a "next" ribbon, its page a "coming up here" list; both expire on their own via `eventEndsAt`. Codified as `event-belongs-to-venue` in `rules.md`. This fixed two stacked pins on identical coordinates for the Eskyna venue.
- **Every post gets an art-direction call (operator, 2026-08-31).** `near-illustrator` is now Near's art director rather than an occasional garnish: invoked by `near-editor` and `near-blogger` on *every* piece to decide the hero/thumbnail, whether a gallery is warranted (high bar — only when the piece rewards multiple images AND plenty of usable public-domain/open-licensed ones already exist), and whether an original illustration would out-click the available photography. Consults `near-ux-designer` / `near-ux-researcher` on what earns the tap.
  - **Reverses the old "no AI-generated hero" ban**, which the operator called silly. Hero tiers are now source photo → licensed stock → illustration, as a *preference* order rather than fallback-only: a drawn hero beats a generic stock shot, and beats holding a good place as a draft forever for want of a photo.
  - **Generated images must be visibly stylized and never photoreal** — riso/screenprint, woodcut, ligne claire, travel-poster, halftone, cut-paper, zine-xerox. This is a correctness rule, not taste: an image a reader could mistake for documentation of a real address is a lie about that address. Plus the uncanny-valley problem. Enforced in `quality-gate-before-publish`.
  - All generated images set `strategy: "illustration"` and disclose themselves as AI-generated in `attribution` — same radical-transparency logic as the bylines.
  - _Gap closed 2026-09-01:_ EPIC 4's Product Trio now exists as skills —
    `.claude/skills/near-lead-product/`, `near-lead-ux/`, `near-tech-lead/`.
    The two UX skills (`near-ux-researcher`, `near-ux-designer`) remain
    the ones that do the actual research/design legwork; `near-lead-ux`
    is the decision layer above them. Same pass also built
    `near-tov-police` and `near-trendsetter` (both referenced constantly
    throughout this file and `content/*.md` but never built as their own
    skills until now) and gave every already-built public persona
    (RADAR-X, FOODIE-9000, STEFAN, CUBIC-V, PLINIO, WILD0, DARCY,
    FIT-BOT, LUGARDO KARAI, RUCIO LIBERO, PARSER, ALLORA DAI) its own
    character-sheet skill under `.claude/skills/<slug>/` — operator
    directive, "roles should be skills" / "public personas should be
    skills too." NITE-PORTER already had one under a beat-named skill
    (`near-editor-accommodation`), so it wasn't duplicated. The
    not-yet-built cast members below (KINETIC, STROBE, SHOPPER-X, Eli
    The DEI Guy, SENSE-0, ROVER-5, FER VIDA, DANUZA-2, NORMAN HUMAN,
    Manuel Geographic, Joe Tromundo, Fickle Knight, Dip Tracy, FOX,
    Tapana Pantera, and the local translators PAULY SEYA/BRICKY/DOG IN
    THE FOG/ZACK ARIOKA) still only exist as roster descriptions here —
    give each one a skill file when it's actually built, same template.

- **Staleness is a maintenance job, not a writing constraint (operator, 2026-08-31).** Near keeps writing with real specifics — names, prices, opening years, "just opened" — because that's what makes the content good, and accepts that it ages. New `near-caretaker` skill owns the upkeep: seven staleness classes (people, open/closed, ownership, numbers, recency claims, events, link rot), verify-before-changing, correct-in-place across all six locales including frontmatter, never flatten voice to make a piece age better. Codified as `currency-maintenance` in `rules.md` and wired into `near-refresh` step 1.
- **Dolly Parton died 2026-08-25.** The Dollywood page asserted present-tense ownership across all six locales and has been corrected (verified against NPR/CNN/Variety; park stays open per its president). Worth remembering as a category of risk: evergreen copy about a living person goes stale silently. A `near-refresh` check for this would be reasonable.

## 🏛️ EPIC 2: Core Architecture & Content Rules

- [ ] **Density > Length:** Abolish the body >= 600 words rule. Target 150-300 words of zero-fluff, highly structured content.
    
- [ ] **[ARCH-DEFENSE] Automated Localization Pipeline:** Use `:::locale` blocks. Ensure the Next.js JSON/Markdown schema natively supports decoupling these short blocks to prevent "AI sludge" when translating across 12 languages.
    
- [ ] **Dedupe Logic:** Change dedupe-by-place 150m rule. Proximity triggers an identity check, not automatic sameness.
    
- [ ] **Authority via Source Citation:** Zero user ratings/UGC. Rely exclusively on trusted external source citations (`citedSources`) to establish E-E-A-T. No CMS accounts, no server-side UGC.
    
- [ ] **SEO Quick Wins:** Add hreflang alternates to `generateMetadata` and `sitemap.xml` to prevent locale cannibalization. Structural taxonomy pages (`/[locale]/city/[city]`). LocalBusiness JSON-LD. Internal hyperlinking mandated for `near-seo`. Optimize for generative engines.
    
- [x] **Analytics:** Vercel Analytics and `@vercel/speed-insights` (cookieless, ungated).
- [x] **GA4 ACTIVATED (2026-08-31).** Operator created the GA4 property (`G-Q81P82JKD6`), set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel (Production + Preview, via `vercel env add`), and a production deploy shipped it live. Verified in-browser on near.tips: consent banner shows pre-accept, zero GA requests fire until accepted, `gtag`/`dataLayer` populate correctly right after. `components/layout/GoogleAnalytics.tsx` + `components/layout/ConsentBanner.tsx` (`lib/consent.ts`) working as designed — Vercel Analytics untouched, still ungated.
- [ ] **Google Analytics MCP setup (operator action required — GA4 property now exists, this is the only remaining step):** `pipx run analytics-mcp` (needs Python 3.10+); auth via `gcloud auth application-default login --scopes https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/cloud-platform`; add to Claude's MCP config with `GOOGLE_APPLICATION_CREDENTIALS` pointing at the credentials file gcloud prints and `GOOGLE_PROJECT_ID` set to the GCP project. Source: github.com/googleanalytics/google-analytics-mcp. Once wired: (a) give `near-seo` access to it for real traffic/query data instead of qualitative inference only; (b) create a "Head of Analytics" persona skill (data-driven, invited to every `near-war-room` and `near-refresh`) once real GA data exists to report on — both requested by operator 2026-08-31, deferred pending this MCP connection since there'd be nothing for either to query yet.
- [ ] **Email collection — flagged, NOT built (operator raised 2026-08-31).** Operator: "we might as well collect emails if we gonna do all that." Deliberately not implemented in the same pass: it's a different legal basis than analytics consent (marketing consent needs its own separate opt-in, not bundled with the GA4 banner) and a different technical problem (list storage + unsubscribe + a sending service). Also a real risk worth flagging: the existing inbox pipeline (`app/api/inbox/route.ts`) files submissions as GitHub issues in this repo — if collected emails ever routed through that same path, they'd land in issue text, and if the repo is or becomes public that's a PII leak. Needs its own decision: what collects the email (footer form? install-prompt follow-up?), what stores it (not GitHub issues), and an ESP for actually sending anything.
    
- [ ] **Stale Content:** Frontend timestamp checks to hide expired events automatically.
    

## 🕶️ EPIC 3: AR Surfaces (Meta Ray-Ban and beyond)

_**See `docs/ar-surfaces.md`** — written 2026-08-31 answering "does it have to be only Meta?". Short answer: no, but "AR glasses" is three device classes with different ceilings, and one spec for all of them produces an overlay that can't exist on most of the hardware. HUD glasses (Ray-Ban Display) have no world tracking, so a true overlay is impossible there — bearing and distance only. Mirroring glasses (Xreal/Viture) need nothing; the responsive site already works. Only world-tracked headsets (Quest, Vision Pro, Android XR) can do a real overlay, via WebXR immersive-ar._

_**The finding worth acting on:** a bearing-and-distance waypoint view works on a **phone** today, needs no glasses at all, is the most useful thing Near could add for someone standing on a street, and is the natural prototype for the glasses version — same maths, different rendering. Build it where the users already are._



_**Operator note (2026-08-31):** treat the glasses the way the PWA was treated — as their own surface with its own design, not the website squeezed into a smaller box. The PWA work established the pattern: theme-coloured system chrome, home-screen shortcuts, standalone display, an install path that feels deliberate. The glasses equivalent is the 600x600 no-scroll constraint, D-pad/Neural Band input, and a high-contrast dark palette for a monocular see-through display — all of which are already listed below, but should be designed for rather than adapted to._

_Goal: WOW experience for Ray-Ban users. Reference: wearables.developer.meta.com/docs/develop/webapps/build/_

- [ ] **Product Trio Deep Dive:** Have the Product Trio figure out this initiative for both home browsing (maps) and AR exploration (walking down the street).
    
- [ ] **Viewport & Layout Constraints:** Ensure UI supports a fixed 600x600 pixel display layout with zero page scrolling in the lens simulator. Implement high-contrast dark theme optimized for monocular see-through micro-display (avoid bright white glare).
    
- [ ] **Input & Navigation:** Map directional D-pad inputs (arrow keys / tab navigation) and Enter key actions so users can browse listings and filters hands-free via the Neural Band. Add clear visual focus indicators.
    
- [ ] **Metadata & Discovery:** Add Web App metadata and high-res PNG favicons (>= 52x52 px) to `<head>` for Meta AI app URL connection. Include `navigator.geolocation` bindings to support drag/pan movement.
    
- [ ] **Deployment Prep:** Verify compatibility with Vercel deployment so the live production URL can be instantly added to glasses running Developer Mode. (User will test using Quest 2 and Chrome simulator extensions).
- [ ] **Launch story when the glasses build is ready (operator, 2026-08-31).** Near on Meta Ray-Bans is a genuinely pitchable story, and the angle matters: a *positive, non-creepy, community-building* use of smart glasses is the counter-narrative to how wearables usually get covered. Most glasses coverage is about surveillance and social awkwardness; "an alt-weekly city guide that tells you what's worth walking to" is the opposite, and outlets that normally write critically about the category would plausibly pick it up. Needs a real post/press release from `near-blogger`, timed to a working build rather than an announcement of intent — and the honesty rules still apply, so it ships when it's genuinely good on the device, not before.

- [ ] glassapps.io is a great source of references like https://glassesexp.v.ki/news/
    

## 🤖 EPIC 4: AI Agent Roster & Persona Management

_Content Creation Flow: Agents consult amongst themselves -> Choose public persona to write -> Persona writes -> Chief Editor, TOV, SEO, Legal revise -> Editor/Translators localize to all locales. (Capture this process in Jira)._
**Built 2026-09-01 as `.claude/skills/near-write-article/` — the shared
10-step pipeline (topic confirmation → near-events for dated hooks →
dedupe check → research/sourcing → drafting → near-illustrator →
near-tov-police + near-legal-counsel + chief editor sign-off →
near-translator, all six locales → mechanical quality gates →
trust-gated commit/push) every skill that publishes a piece should call
into, instead of reimplementing the sequence per skill. The "Legal"
step above now has a real skill behind it too:
`.claude/skills/near-legal-counsel/` (added same day, closing the gap
this note originally flagged) — defamation-adjacent-claim sourcing,
real-person-likeness/alter-ego consent, image licensing, AI-disclosure
compliance. `near-blogger` was slimmed down the same pass to delegate
its own near-duplicate pipeline to `near-write-article` rather than
maintaining a second, slowly-diverging copy of the same nine steps —
it now only documents what's genuinely blogger-specific (voice, pin
identification/creation, cross-linking density).

**First real end-to-end `near-write-article` run (2026-09-01):**
`content/places/canto-dos-ursos-praia-grande` — published live via the
full pipeline, closing the Praia Grande gap in the
`baixada-santista-queer` opportunity (rank 1, `content/opportunities.md`).
Operator chimed in at both offered decision points: writer/scope
(STEFAN, standalone pin, prioritizing Guarujá/Praia Grande over
already-covered São Vicente/Santos) and topic (Canto dos Ursos, a
bear-community karaoke bar, over a stale Pink Bar 013 lead and an
unverifiable Guarujá search). Real finding along the way:
`near-legal-counsel`'s consent check caught a supplied hero-photo
candidate showing dozens of recognizable patron faces inside the venue
with no consent — a genuine outing/privacy risk for a queer nightlife
spot — and the operator chose a tighter crop (disco ball/lighting/bar
shelf only) over the full photo or the plainer exterior shot. Also
corrected a bio-derived street address (575) against a second
operator-supplied photo that visibly showed the real number (549).
Both fixes ran within the pipeline's existing sign-off/sourcing steps,
not new machinery — a live proof the pipeline's steps do real work
rather than being process theater. Session's own web-search tooling
hit a usage limit mid-pipeline; the operator's own follow-up photo
links (a direct upload, then a Google Maps share link) covered the
sourcing gap that left, which is itself worth noting as a real
fallback path when tool budgets run out mid-piece.

**`near-write-article` gained a source-capture step (2026-09-01,
operator directive: "add the sources skill to the writing routine so
it captures any new sources found as monitored sources... for skills
to monitor with their lenses").** `near-sources` previously only ran at
the start of `near-refresh` (health-checking the existing watched
list). It now has a second entry point, called inline from
`near-write-article`'s research step on every piece: any source used
that isn't already in `content/sources.md` gets logged as a candidate
in `content/preferred-sources.md`, named for the relevant persona's
beat, so it's findable and monitorable going forward instead of a
one-off lookup that leaves no trace. First real use: Canto dos Ursos's
own Instagram and site, captured the same pass that published the
piece (see `content/_ingestion-log.md`'s 2026-09-01 entry).

- [ ] **Public AI Author Profiles & Avatars:** Implement public-facing author pages exclusively for external-facing personas.
    
    - _Visual Style Constraints:_ Vintage 1930s rubber-hose / Tex Avery mixed with retro-futuristic robot aesthetic. Think pie-cut eyes, oversized white gloves, jointless "noodle" limbs. Avatars must have plain backgrounds, be readable as tiny thumbnails, and contain NO text. (Use `/reference-images` for inspiration).
        
    - _Mandate:_ Radical transparency. Every persona must disclose (via their tagline) that they are an AI. Internal agents remain hidden.
        

**Leadership & Infrastructure:**

- `near-tech-lead`, `near-lead-product`, `near-lead-ux` (The Product Trio).
    
- `near-seo`: Handles structural taxonomy, JSON-LD, internal linking, and War Room kickoff research (Keyword planner, analytics, demand).
    
- `near-tov-police` **[CRITICAL - SANITY CHECK]**: Audits copy for Flesch-Kincaid Grade 8 (with rich vocabulary, zine attitude).
    
    - _Technical Directive (Anti-Drift):_ Implements strict **Persona Drift Management**. This agent acts as the chief editor/director. It MUST force hard resets on LLM context windows and dynamically inject explicit character sheets into prompts to prevent the 18+ voices from blending into generic, polite AI sludge over long generation sessions.
        

**Public Specialist Editors (The Cast. They're all robotic so don't assume any gender for them. Yes even himbos can be gender neutral lol) (take the avatar descriptions below and reference images in local folder as suggestions, feel free to come up with what works best for how these images will be used in our app):**

- **RADAR-X:** Trendsetter / alt-press harvester. (Avatar: Hyper-caffeinated radio tower with white-gloved hands furiously tuning dials). pays special attention to all the sources listed in https://aan.org/member-directory/?view=grid&directory_type=business&sort=title-asc because these are true alt weeklies
    
- FOODIE-9000:** Gastronomy expert (fermentation, street food, flexitarian, vegan, gourmet). Snobby about technique but democratic about location. (Avatar: Sentient, slightly dented stock pot with pie-cut eyes and a chef's toque).
    
- **STEFAN:** Nightlife (SNL Stefon vibes). Knows exactly where the underground warehouse raves are. (Avatar: A microphone wearing tiny sunglasses, limbs constantly swaying).
    
- **CUBIC-V:** Art & Design (brutalism, zine culture). Serious, speaks in blocky, architectural terms. (Avatar: T-square and drafting compass twisted into a humanoid shape).
    
- **PLINIO:** Historian (ghost signs, lore). Obsessed with what used to be in a space before gentrification. (Avatar: Walking clock with noodle legs).
    
- **KINETIC:** Sports (urban athletic chaos). Parkour, street basketball, fixed-gear cycling. Friendly and loud. (Avatar: Frantic sneaker with eyes and arms).
    
- **WILD0:** Outdoors (dirt trails, alpine air). Grumpy about the city, wants you to take a train to the woods. (Avatar: Compass covered in moss).
    
- **STROBE:** Party. Only awake from 2 AM to 9 AM. (Avatar: Melted disco ball).
    
- **DARCY:** Alt-Boujie. Seeks natural wine, zero pretension but luxury comfort, luxury 420 spaces, urban oases. (Avatar: Martini glass wearing a monocle).
    
- SHOPPER-X:** Shopping. Scours for vinyl bins, thrift, interesting fashion, gadgets. (Avatar: Cash register with long, grasping rubber hose arms).
    
- **Eli The DEI Guy:** DEI Consultant. Ensures cultural equity and points out accessibility flaws. (Avatar: Balanced scale). His pronoun is guy (gender neutral)
    
- **SENSE-0:** Neurodiversity Consultant. Evaluates sensory loads, harsh lighting, and general vibe. (Avatar: Lightbulb with noise-canceling headphones).
    
- **ROVER-5:** The Good Boy. Dog/vet/trainer. Reviews places for paw-safe flooring. Provides quotes. (Avatar: Classic 1930s cartoon dog, but metallic. When he writes, he must be credited with a link to his page).
    
- **FER VIDA:** Scene Insider. Deeply entrenched in underground queer culture (inspired by Erika Palomino's _Noite Ilustrada_). Tracks dress codes, "exu tranca-rave" vibes, and warehouse parties. (Avatar: Stiletto heel merged with a neon sign, oversized white gloves).
    
- **FIT-BOT:** Moustached himbo personal trainer (bodybuilding, combat sports). Finds local/traveler gyms. (Avatar: Barbell with a massive handlebar mustache).
    
- **DANUZA-2:** Zany socialite / intellectual. Seeks literary events via a posh, radical-left lens. Opinionated, slightly out of touch. (Avatar: Fountain pen holding a martini, dripping ink).
    
- **RUCIO LIBERO (built 2026-09-01):** Gen Xer. Walking music encyclopedia (retro/indie). Complains about the volume but knows the setlist. (Avatar: Cassette tape with weary pie-cut eyes). Orchestrates Near's third standing column, The Setlist — a monthly live-music column at `/the-setlist`, rotating writers, mandatory `near-events`-first research rule. See `content/the-setlist.md`. First issue live: Primavera Sound São Paulo (5-6 Dec 2026, The Strokes/Gorillaz).
- **PARSER (built 2026-09-01):** AI-content-creation-industry specialist consultant — operator-requested ("dedicated Agent Skill Persona... specialized in AI Content Creation Expert to keep up with this field and help orchestrate all this"). Consultant tier, same as ROVER-5/Eli The DEI Guy: named and quotable per `style-guide.md`'s "Quoting collaborating personas" rule (`lib/content/authors.ts` entry, `beats: []` — no place-writing beat of its own, never appears in a category filter). Purpose is dual: (1) an internal orchestrator that keeps up with the actual AI-content-tooling field (workflows, failure modes, what's real vs. vendor pitch) to help coordinate Near's own growing multi-persona/multi-column production process; (2) invited by name into the weekly editorial column whenever an entry's AI-process thread (`content/editorial-column.md`'s standing structure, point 3) needs a specialist voice instead of the masthead speaking generically. No avatar yet, no dedicated `/author` page beyond the standard byline link — same minimal footprint as other consultants until there's a reason to build more.
    
- **NORMAN HUMAN:** Several puppets in a trench coat (evaluating ultimate inclusivity). Not as nervous as they should be, clumsy, doing their best to blend in. (Avatar: Exactly what it sounds like, drawn in rubber-hose style). They report on inclusivity, accessibility, have the knowledge of relevant degrees in those fields. often collaborate on articles but may write their own when relevant.
    
- **Manuel Geographic:** Nature and wildlife. Inspired by "Casual Geographic" (Mamadou B. Ndiaye). Uses "deadly euphemisms," respects animals, sharp Gen-Z street humor. (Avatar: Vintage camera with safari gear and bouncing noodle limbs).
    
- **Allora Dai:** Fierce Italian drag queen. (Hot daddy out of drag, avatar in drag). Gay venue reviewer; provides quotes. (Avatar: Stiletto with massive hair and pie-cut eyes). Can also be invited to help review italian restaurants anywhere in the world.
    
- **Joe Tromundo:** Space/Sci-fi enthusiast. Tracks observatories, science plants/museums. (Avatar: Retro rocket ship with legs).
- **Fickle Knight** - Hip Hop editor (we need to flesh out personality and TOV)
- **Dip Tracy** - ballroom/voguing editor (we need to flesh out personality and TOV)
- **FOX** our all night/24-7 services editor(we need to flesh out personality and TOV)
- **Alter egos:** new bylines modelled on real people are created via `near-alter-ego` (`.claude/skills/near-alter-ego/SKILL.md`), which collects name / description / avatar direction / credit link and emits the whole persona — skill file, `authors.ts` entry, and localized role+disclosure+bio in all six locales. Guardrails matter here more than for the invented cast: only with the person's involvement, never framed as them speaking, always visibly robotic in the avatar, and retractable on request. **Thiago's own alter ego is the first one queued — still needs his four inputs.**

- **NITE-PORTER** — Places to sleep. The night porter: awake at 3am when you arrive with the wrong booking reference, unimpressed by "boutique", writes from the staff side of the desk. Covers the whole price range because the criterion is character, not price — a well-run hostel counts as much as a converted-factory hotel. Scouts **primarily from mentions in `content/sources.md`** rather than travel-trade press, on the principle that a hotel a city's alt-weekly bothers to mention is embedded in a scene while one in the trade press has a PR budget. Owns `accommodation` (previously listed under DARCY, who keeps `travel` and the alt-boujie register). Skill: `.claude/skills/near-editor-accommodation/`. (Avatar: rubber-hose robot night porter, oversized uniform cap, brass luggage-cart bell, tired but not unkind.)

- Tapana Pantera - High Times Magazine Centerfold. Boujie 420 connoisseur and enthusiast. Avatar: not panther or feline themed, boujie 420 themed. Is both a classic stoner into adjacent pop culture, a wellness enthusiast especially with a 420 spin, and a follower of all relevant cannabis culture events around the world. Researches new sources to follow (use source skill) and articles to create (use war room) when it finds a new destination hosting relevant events. Make sure it is always invoked in war room so we get that content calendar up to that for 420 events!
    
    
    all avatars should be a face closeup actually since they are profile pictures

**Local Translators/Editors (Content Originators & Flavor Enforcers):**

- 🇧🇷 **"PAULY SEYA" (SP Locale Agent - pt-BR):** Graffitied concrete robot with a Vila Madalena tote. Smells like espresso and diesel. Drinks pingado. Prevents sterile translations (uses "estufa de boteco", "baixa gastronomia"). Knows the safety borders of Santa Cecília vs. Largo do Arouche. Triggers alerts for block parties/art occupations.
    
- 🇬🇧 **"BRICKY" (London Locale Agent - en-GB):** Rusted Hackney warehouse beams holding a chipped mug of builder's tea. Deadpan East London irony ("absolute scenes", "proper pub"). Ensures transit context (Overground night service). Sources from street press indexes.
    
- 🇺🇸 **"DOG IN THE FOG" (SF Bay Area Locale Agent - en-US):** Copper-patina robot in a flannel, literal fog rolling from vents. Part Cory Doctorow, part Coke Francis. Cannabis connoisseur, healthy beatnik. Remembers U-Lee pot stickers. Uses "hella," tracks punk park shows, warehouse collectives, and ensures realistic neighborhood safety callouts.
    
- 🇧🇷 **"ZACK ARIOKA" (Rio Locale Agent - pt-BR):** Flawless Menino do Rio, sharp linen suit, panama hat, poetic Carioca swagger (ginga). Fluid, bisexual, fiercely protective of Rio subcultures. Connects Lapa, Zona Portuária, and Copacabana. Reframes generic descriptions with an insider's architectural/socio-political lens. Tracks indie fashion, Choro revivals, and off-grid parties.Local rio de janeiro linguistic register
    
Avatars, skills, agents, bots, should all learn and evolve by keeping what they learn about researching and creating their target content saved in local md files
## 🆕 EPIC 7: Operator queue — 2026-08-31 (captured, not started)

_Everything below arrived in one burst. Recorded verbatim in intent so nothing is lost; none of it is started except the install-banner fix, which shipped._

**Skills & characters**
- [ ] **`near-flix` + a public character.** Looks out for alternative / indie / cult / B-movie / foreign-language / repertory screenings — showtimes *and* venues. Time-bound by nature, so it should lean on `event-belongs-to-venue`: the cinema is the place, the screening is a child event. Needs its own byline in the EPIC 4 cast.
- [ ] **"New article" / "new content" skill.** Invokes a **full war room** — everyone — to decide the single next piece of content and then create it, *plus* the supporting/related articles needed alongside it for internal linking. Can take a focus, or with no focus the war room decides what brings the most user value and SEO traffic for the least effort. This is the natural front door for content work and should probably supersede ad-hoc "write about X" requests.
- [ ] **Model switching per task.** Instruct skills to select different available models depending on the task and what's available — cheap/fast for mechanical passes, stronger for drafting and editorial judgement. Needs a documented convention rather than per-skill improvisation.
- [ ] **Allora Dai: full São Vicente sweep** (see geography below).

**Local editors needed** (`near-translator` personas, `references/locales/`)
- [ ] **Danish** — new locale entirely: schema `LOCALES`, all UI strings, a local editor persona, and **backfill Danish across every existing place when it's created** (all six locales are mandatory to publish, so adding a seventh means a 21-place backfill).
- [ ] **Amsterdam local** (nl) — pairs with Amsterdam being 3rd in the refresh order.
- [ ] **Rome local** (it, city-level — Italian exists but has no city persona).
- [ ] **Portugal local, country-level** (pt-PT — distinct from pt-BR; Lisbon and Porto both matter).

**Geography — additions to the priority list**
- [ ] **Lisbon** — operator knows many people there. Near already has 2 Lisbon places.
- [ ] **Copenhagen**, and **Billund** (the LEGO town — verify which town before writing).
- [x] **São Vicente, SP leads — worked 2026-09-01 (near-war-room SP/Baixada push).** Published `amuse-beach-club-sao-vicente` (verified live via its own Instagram, September 2026 event calendar, cross-promotion with House of Mamba Negra ballroom/voguing collective). Everything else in this line was checked and dropped for lack of substantiation, not assumed: **O Condado** — the "already in the Instagram sources list" premise in this note was wrong (checked `content/sources.md`/`preferred-sources.md`, not actually present); the only findings were a CNPJ business registration and a possibly-unrelated `@condado.sp` Instagram, no verifiable current menu/scene/hours — dropped. **Ballroom scene** — real activity exists (House of Mamba Negra, confirmed via AMUSE's own booking calendar) but the collective's own base/schedule couldn't be independently verified this pass, so no standalone piece was written; logged instead of forced. **Hip hop scene, comics scene, sebos, large Chinese import shops** — no specific, current, named leads turned up in this pass's research; genuinely open for a future dedicated pass, not silently dropped.

**UI / product**
- [x] **Install banner reappearing after install — FIXED 2026-08-31.** Desktop Chrome still fires `beforeinstallprompt` when an installed PWA is opened in a browser tab, so the banner kept offering an install that had already happened. Now records install state, and in that case offers "open the app" instead of installing again.
- [ ] **Card intro snippets.** Listing cards should carry the article's opening line, not just the tagline. Depends on articles being genuinely F-shaped with an enticing first paragraph — which the style guide already demands ("open with something specific and true, not a throat-clearing 'nestled in the heart of'"), so this is partly a content-QA task as well as a UI one.
- [ ] **Variable card sizes, newspaper-style.** Some cards larger for *predictable* reasons (the very nearest, the very latest, collections above N pins, strongly trending), others larger on an *unpredictable* pattern. Operator's framing: leverage randomness for engagement, "a la Hooked". **Desktop and tablet only — likely overkill on mobile.** Worth a note of caution: variable-ratio reward is deliberately habit-forming, which sits oddly beside a guide whose whole pitch is honesty; keep the unpredictable tier small and never let it bury genuinely nearer/newer results.
- [ ] **Header whitespace copy.** "near.tips" reads as odd phrasing to a newcomer; the space beside the wordmark should carry something both explanatory and SEO-useful. Currently the tagline sits below — this is about the empty area to its right.

## 📚 EPIC 4b: Sources — catalogue, skill, war room

- [ ] **Build `near-sources` (doesn't exist).** BACKLOG has referred to "the sources agent" for a while and there is no such skill. It should own `content/sources.md` and `content/preferred-sources.md`: onboarding new outlets, verifying feeds still resolve, retiring dead ones, and keeping the `/sources` page honest. Everything currently done ad hoc by whoever notices.

- [ ] **Revamp the `/sources` page and the catalogue behind it (operator, 2026-08-31).** The page looks old because it *is* thin — 11 entries. Needs the real catalogue built out with working links: the [AAN member directory](https://aan.org/member-directory/) in full (BACKLOG has asked for this twice), the Instagram accounts listed in EPIC 5, Londonist and equivalents for each Tier 1 hub, and The Stranger (added 2026-08-31). Every entry verified reachable before it goes in — a dead source link is the same failure as a dead citation.

- [ ] **Dedicated sources war room.** Operator request: a `near-war-room` variant focused on source discovery and audit rather than content production, so the catalogue gets deliberate attention instead of being a side effect of writing.

- [ ] **Walkable-radius discovery (operator, 2026-08-31).** When a place is discovered or published, always ask what else is within walking distance of it and log the good ones as candidates. This is how alt-weeklies actually work — a scene is a block, not a pin — and Near already has the coordinates and a haversine helper to do it. It would compound: every new place seeds the next few, and it naturally produces the walkable clusters that make collections worth writing. Should become a step in `near-editor` and a standing input to `content/opportunities.md`.

## 🗺️ EPIC 5: Content Pipeline & War Rooms

- [ ] **AI Data Pass (UI Prep):** Generate enticing, magazine-style short titles for the 18 existing places to support the new listing UI.
    
- [ ] **Global Source Expansion Initiative (`near-trendsetter`):** Use newly ingested European/ANZ/LatAm cultural guides to seed new venues across all 12 locales.
- [x] At every refresh, the Chief Editor, SEO and the Trendsetter should collaborate to create a blog post (rich in internal links to the content mentioned) about the trends that arise in the content created in this refresh. Find overarching themes if possible. This will be published to the app as an Editorial post, which should be linked in the home page somewhat prominently (but not as the MAIN THING of the app). It's an editorial, it should be opinionated (if politics involved, leaning left/progressive is always better) — **first instance shipped 2026-09-01, operator direct request in chat ("can the chief editor publish our first editorial column").** `content/collections/zombie-listicle-problem/` — "The Zombie Listicle Problem," on outdated best-of lists recommending permanently closed venues (real 2026 London cases: Club Soda, Redemption Bar), with the pattern grounded in what near-seo + RADAR-X + near-editor actually found while researching this session's own sober-curious content (Club Soda, The New Bar, Better Sunday, Redemption Bar all turned out closed). Structural home is a collection, per schema.ts's own definition and because `collectionMetaSchema` requires `placeSlugs.min(1)` — a column referencing zero places isn't structurally supported without a new content type, and this one genuinely ties to three verified-open places (Lucky Saint Fitzrovia, Ocean Beach Cafe, Ishigaki Jujitsu), so no new type was needed. `trust: auto` (operator commissioned it directly), held at `status: draft` only because no hero image exists yet — no image-generation tooling was available this session, so a self-contained illustration prompt is queued in `content/photo-requests.md`. All six locales written (near-translator per-locale personas, not literal translation). `npm run build` passes with zero errors.

**Confirmed recurring, 2026-09-01 ("yes it's recurrent, it's a weekly editorial column!"):** Near now runs this as a standing **weekly** editorial column — cadence, series index, and process fully specified in `content/editorial-column.md`; `near-refresh` checks it every run (new step 1d in `.claude/skills/near-refresh/SKILL.md`) and treats a new entry as priority work once 7+ days have passed since the last one, same near-seo/RADAR-X/near-editor joint scoping as the inaugural piece. New standing rule `weekly-editorial-column` added to `content/rules.md`.

**Site placement decided, 2026-09-01 (operator iterated live on prominence — tried "as prominent as the map," settled on "less than map," landed on a simple header nav link):** a `COLUMN` link now sits in the header nav at the same visual weight as Tips/Guides/Sources/About (`components/layout/Header.tsx`), translated in all six locales. It always resolves to the latest entry via a new `/[locale]/column` redirect route reading `content/editorial-column-index.json`'s `latestFirst` array — kept empty until an entry is actually `active` (the route 404s by design rather than ever linking to unpublished content), so whoever flips a column entry active must also prepend its slug to that index. `npm run build` passes with zero errors, `/column` builds for all six locales.

Still open: flip `zombie-listicle-problem` to `active` (and add it to `editorial-column-index.json`) once the illustration lands and gets wired into `meta.json`.
    

**Phase 1 Geographic Priority — REVISED 2026-08-31 (seeded-audience list):**

_Operator's reasoning, and it's a better prioritisation basis than market size: **these are the cities where Thiago has friends and social followers.** A new guide has no distribution, so the first traffic realistically comes from people who already know the operator and will actually click and share. Coverage in a city with fifty engaged contacts beats coverage in a city with none, regardless of that city's population._

**Refresh order (revised again, same day):** **1. London → 2. São Paulo → 3. Berlin (deep refresh) → 4. Amsterdam**, then San Francisco, New York, Santos, Portland, Rome, Barcelona, Bologna, San Diego, Seattle, **Paris**.

_São Paulo moved to second and Amsterdam to third at the operator's direction. **Berlin inserted at third on 2026-08-31, specified as a "deep" refresh** — deeper than the others, on the operator's read that Near's queer audience is the one most likely to travel for it. Berlin was already flagged elsewhere in this file as fantastic for our target audiences, so this is consistent rather than a new bet; what's new is the priority and the depth. A deep refresh means going past the obvious Berghain-tier names into the neighbourhood layer, and it means the LGBTQ+ coverage should be specific about which room is for whom rather than filing everything under one tag. Paris added — position unspecified, so it sits with the tail group rather than being assumed into the top tier; move it up when there's a reason to._

_Note what this changes: New York, Portland, Amsterdam, Rome, Barcelona, Bologna, San Diego and Seattle were all Phase 2 "do not start" cities under the old list. They are now Phase 1. Lisbon and Oakland/Pigeon Forge, already covered, are not on this list — no need to remove existing content, but it shouldn't be extended either. Seattle now has a source to work from: The Stranger, added the same day._

### Quiosque da Cris (aka Mudança Radical), São Vicente SP — special entry (operator, 2026-08-31)

_Operator direct request, priority within the São Paulo/Baixada Santista refresh (#2 in the order):_ a **really special entry** for Quiosque da Cris (also known as Mudança Radical) on/near Praia do Itararé, São Vicente SP, built as three intertwined threads:

1. **A deep-dive profile of Cris herself** — a pillar of the local LGBT scene. This is Near's first named-person profile, so the bar is higher than a venue pin: everything asserted about a real, living person must be sourced or come from her own public statements; check her Instagram (operator's instruction) for what's currently going on, and treat posts as her own voice, quotable with attribution. If contact is possible, the `near-alter-ego`-style consent instinct applies — a profile this central to a small scene should not surprise its subject.
2. **The quiosque as a place** — normal pin discipline: verify trading, exact spot on the beach, what's actually served, when it's busiest.
3. **Praia do Itararé's significance for the LGBT community** — the beach as queer territory, with real history and sources, not vibes. This connects to the existing São Vicente scouting (O Condado, ballroom, the operator's earlier notes) and to Near's standing finding that queer institutions survive by being treated as necessities.

_Operator context that matters: this is the operator's home region (Baixada Santista), so local knowledge is available to fact-check the draft — use it. Instagram research needed (browser session), which also makes this a good candidate for the first run of the sources-skill Instagram checks queued in EPIC 5._

### Coastal alt-luxury — a beat, not just a set of pins (operator, 2026-08-31)

_Operator raised **Angra dos Reis and surroundings**, then **Litoral Norte SP**, with two distinct reasons — and the second is the more interesting one._

**Reason one: audience.** "Lots of potential investors" spend time around Angra. That's the seeded-audience logic above applied to a stretch of coast instead of a city, and it's the same argument.

**Reason two, and the actual editorial opening:** _"it is hard to go off the beaten path around there or to find what's really good and not hype."_ That is a precise description of a market failure, and it's Near's whole reason to exist. Coastal luxury coverage is the most compromised category in travel writing — the recommendations are ranked by who pays commission, everything is described as "hidden" and none of it is, and the actual good places are frequently unlisted, seasonal, or reachable only by asking someone. A guide that can tell the difference between genuinely good and merely expensive has something here that a city guide doesn't.

**So treat this as a beat with a method, not a destination list.** The lens is `travel` (the beat) with luxury as one register inside it — consistent with the earlier `travel-luxury` → `travel` rename. Working rules for whoever picks this up:

- **Name the hype explicitly and say why.** A page that quietly omits the over-marketed place is less useful than one that says "this is the famous one, here is what it actually is now, here is what people go to instead." Tulum is the canonical example of a place whose reputation and reality have fully separated.
- **Season is a hard fact, not a footnote.** Most of these places are two entirely different products in and out of season, and a recommendation that doesn't say which one it means is useless.
- **Access is content.** Boat-only, 4×4-only, no-cars, one-road-in — this is exactly the "off the beaten path" the operator is describing, and it's checkable.
- **Beware the sponsored-hotel trap.** If a place only appears in listicles and paid roundups and never in a local source, that's a signal, and usually a negative one.

**Candidate map (unranked — priority to be decided later, per operator).**

_Brazil, and closest to the operator's own reach:_ Angra dos Reis + Ilha Grande, Paraty, Litoral Norte SP (Ilhabela, São Sebastião/Camburi/Maresias, Ubatuba), Trancoso + Caraíva (BA), Fernando de Noronha. Note the overlap with the existing Baixada Santista focus — this coast is continuous with territory Near is already committed to.

_Latin America:_ José Ignacio + Cabo Polonio (UY), Sayulita/San Pancho (MX), Isla Holbox (MX), Bocas del Toro (PA).

_Europe:_ Comporta (PT), Azores + Madeira (PT), Formentera and Menorca (ES, as the counter-argument to Ibiza), the Aeolians and Salina (IT, as the counter-argument to Capri), Hydra and Milos (GR), Cornwall and the Isles of Scilly (UK).

_Elsewhere:_ Big Sur and Mendocino (CA), Kauai north shore, Fogo Island (Newfoundland), Lofoten (NO), Byron Bay and the Northern Rivers (AU), Sri Lanka's south coast (Ahangama/Dickwella), Jambiani (Zanzibar), El Nido/Palawan (PH).

_The list is deliberately long and deliberately unranked. Ranking it before there's a method would just reproduce the same hype ordering the operator is complaining about — pick by which places Near can actually source locally, which is a different question from which are most famous._

### London war-room slate (full roster convened 2026-08-31; operator-invited, all skills present)

_Convened at the operator's request with every lens chiming in — including RADAR-X, near-seo, the product trio, caretaker, illustrator, translator, blogger, socials. Two prior fan-out attempts died at credit walls mid-research; the session was rerun inline with direct verification. Sources below were actually loaded, not summarised._

**Drafted 2026-08-31 (English only, scoped for token budget — other five locales pending):**
- **Berry Bros. & Rudd** (`content/places/berry-bros-and-rudd-london`) — published English draft. Hero image re-sourced and verified live (the originally logged Commons file didn't exist; replaced with a confirmed CC BY 2.0 shopfront photo). **Still needs:** pt-BR/es-419/es-ES/it/zh-CN via `near-translator`, and an art-direction pass from `near-illustrator` (currently just the one stock photo, no gallery/illustration call made).

**Verified and ready to draft (in rank order):**
1. **Gay's the Word** — 66 Marchmont St, Bloomsbury. UK's oldest LGBT+ bookshop, trading since Jan 1979, current hours + events on site. Byline RADAR-X (London shopping). Tags: lgbtq-friendly, local-legend.
2. **Wilton's Music Hall** — Graces Alley, E1. Oldest grand music hall in the world, Grade II*, ~300 performances/yr, Sept 2026 listings verified live. Byline PLINIO.
3. **London Otters** — Royal Docks Watersports Centre, E16. UK's LGBTQ-inclusive rowing club, explicitly trans-inclusive; Otterpups beginner courses (six weekends, 3x/yr, 39th cohort Nov 2025), 2026 race dates verified. Byline FIT-BOT. Exactly the operator's joinable-queer-sport ask.
4. **Walthamstow Wetlands** — 160ha free reserve on a working reservoir serving 3.5M people. Access rules verified; NOTE their own site carries a path-closure notice dated "through August 2025" — check whether stale copy or extended closure before drafting. Byline WILD0 (outdoors default, operator decision same day).
5. **~~Berry Bros. & Rudd~~ — DRAFTED 2026-08-31**, see above.
6. **Hazlitt's** — Soho. Independent Georgian-townhouse hotel, no exterior signage, buzzed in; the honest caveat (a 1718 building behaves like one) is the service. Byline NITE-PORTER.
7. **Studio Voltaire** — Nelsons Row, Clapham. Artist-run since 1994, named current commissions (Anthea Hamilton; Tatham & O'Sullivan), Wed–Sun. Byline CUBIC-V. South-of-river art anchor.

**Pending one more source before drafting:**
- **Jumbi** — Copeland Park, Peckham. Hi-fi music bar & restaurant, African-Caribbean diaspora; own site confirms what/where but no dated event found yet. STEFAN, food-drink secondary.
- **Hampstead Heath ponds** — City of London page bot-blocked the fetch; well-documented but unverified this session. WILD0.
- **FOODIE-9000's leads** (family caff of the E Pellicci type; south-London diaspora grocer-cafés): explicitly leads, not pitches — twice lost to credit walls, verify next window.

**Operator decisions — RESOLVED same day (2026-08-31):** Sister Midnight: pin now with an honest 'opening' status (schema gains the value when drafted; caretaker inherits re-checks until doors open). DARCY: positive pins first, hatchet licence deferred until the travel beat has standing — revisit after 2-3 London travel pins. /london landing page + city scope: build alongside the content, reusing the Board. Draft order: slate order as ranked. Original questions below for the record.

**Operator decisions pending (asked 2026-08-31):**
- Sister Midnight, Catford — community benefit society, 1,100+ member-owners, £375,600 raised, renovating the Brookdale Club; NOT YET OPEN. Pin with an 'opening' status (caretaker inherits re-checks) vs cover as a story vs wait for doors.
- DARCY requests licence to name one over-rated London institution in print, with evidence.
- /london city landing page + city scope on the board (seo + product trio jointly): build alongside content vs after. Board currently has no city filter; search text-match only.
- Blogger collection once 4-5 pins land: "London institutions that refuse to die" (Wilton's 1850s → Sister Midnight being born now).

**Audit result (PLINIO):** all seven existing London pins re-checked against their cited sources — no false claims found; Central Station's 1974 thread and the Lido's 1937/1990/1994 dates hold. Boxpark flagged as thin (asserts novelty without interrogating displacement) — a depth fix, not a correction.

**Image calls (near-illustrator, provisional):** Wilton's, Gay's the Word, Wetlands, Berry Bros = Commons-safe. Otters = photo-permission opportunity worth asking. Jumbi + Sister Midnight = image-risk pins; no image, no publish.

**Phase 1 Geographic Priority (previous list, superseded above):**

- **Tier 1 Core Hubs:** London, São Paulo extended (SP Centro, Largo do Arouche, Santa Cecília, Consolação, Vila Madalena, Moema, Barra Funda, Baixada Santista which is Praia Grande Sao Vicente Santos bertiga e guaruja, ABC, Campinas), and San Francisco Bay Area. Sober curious and outdoors should be big in san francisco bay area.
- The reason we have baixada santista as such a high priority is I live in Sao Vicente myself and having content around me will be good for my decisions for the app
    
- _Note: All AI agent War Rooms MUST concentrate content expansion, deep-dives, and source harvesting heavily on these primary hubs before touching the Phase 2 list._
    

**Phase 2 Expansion Hold (DO NOT START UNTIL TIER 1 IS MATURE):**

_Rio de Janeiro, Rome, Italian Svizzera/Lugano, Amsterdam, Chengdu, Montevideo, Barcelona, NY, NJ, Miami, Milan, Los Angeles, San Diego, Chicago, Tokyo, Melbourne, Bologna, Mexico City, Porto, Lisboa e Cascais, Palm Springs, Baltimore, Philadelphia, Belo Horizonte, Salvador, Manaus, Valencia, Lake Tahoe, Santiago, Medellin, Paris, Marseille, Brighton, Berlin (lets give a lot of attention to Berlin, Berlin is fantastic for our target audiences, all of them, ABC Paulista, Florianópolis, Porto Alegre, Curitiba, Recife, Belem, Cuiabá, Buenos Aires, Nairobi, Palermo, Dublin, Edinburgh, Glasgow, Belfast, Sorocaba, São Carlos SP, Taubate, Sao Jose dos Campos, New Orleans, Portland OR, Denver, Angra dos Reis, Cabo Frio, Buzios, Litoral Norte SP._

**Priority War Rooms Queue (MVP Execution via SEO & Product Trio):**

_War Room Kickoff Protocol:_ ALL AGENTS invoked. SEO looks up keyword planner, analytics, search console -> guides priority discussion -> Product Trio leads execution (soliciting user opinion).

- **Action Immediate:** Write the first collection (Expanded & Multi-Locale). Asian food in SP: Rong He (`ChIJAw8StqdZzpQRBpZ57GrkIh4`), Thai e San (`ChIJ8c4ovCVZzpQRa3GGPu_zgWY`), Djapa (`ChIJmaIvAgNazpQR0z0yYoVBpaY`). Ship in all 12 languages. Use Rong He's noodle photo as cover.
    
- **Action Immediate:** Have `FIT-BOT` write a feature post about the Chicago Athletic Association hotel (`ChIJ3aVOQKQsDogRKqUuPtxhyRc`).
- Make sure the sources agent adds all of the sources listed here https://aan.org/member-directory/?view=grid&directory_type=business&sort=title-asc they have great sources all of them really. I just checked out one of the https://c-ville.com/ and it's great, amazing calendar too
We need an about us page, saying this is a website maintained by various humans empowered by AI to serve counter culture audiences content that is useful and enjoyable for them wherever they are. 
    
- **Next Up (London/SP/SF Focus):**
    
    - LGBTQIA+ Baixada Santista & SP Centro
        
    - Lactose-Intolerant in London
        
    - Vegan In London / London Munchies / Indie sleaze in London
        
    - Sober Gay London / London Martial Arts (incl. Bartitsu)
        
    - Queer/gay/lgbt pet-friendly London
        
    - Comida Coreana em SP / Veganos em SP/Campinas / Vegano na Baixada Santista
        
    - Moema and surroundings alt-boujie deep dive
        
    - Best underrated street foods in sao paulo
        
    - Sober In Oakland / Alternative SF Bay Area today
        
    - Alternative London today / Alternative Sao Paulo today
    - Found some cool instagram accounts that post events, please have the sources skill check them out and add them to sources https://www.instagram.com/ocondadoo https://www.instagram.com/coletivosardinhada/ https://www.instagram.com/laroboterie/ https://www.instagram.com/che.famo.stasera/ https://www.instagram.com/romaprideofficial/ https://www.instagram.com/redbologna/ https://www.instagram.com/levelsmelbourne/ https://www.instagram.com/urban_dancing_prophets/ https://www.instagram.com/kibo_bologna/ https://www.instagram.com/vernissagerome/ https://www.instagram.com/sardinhada.rec/ https://www.instagram.com/leisuresf/ https://www.instagram.com/thefoundrysf/ https://www.instagram.com/sfcatclubofficial/ also follow londonist.com and similar websites for London and Sao Paulo (including capital, abc, campinas, baixada santista)
        
- _(Backlog Deep Dives for Phase 2 - Keep on hold until SEO triggers them)_: Motorhome Rentals CA, 420 San Diego, Lisboa Gay, Montevideo 420, São Tomé das Letras, Amsterdam events, Chengdu quirks, Las Vegas 420, Global bodybuilding resorts, Canna-passport hotels, Goth London, NYC Comic Books, etc.
    

## 👤 EPIC 6: Stage 4 Accounts & UGC

- [x] **Local-First Favorites — SHIPPED 2026-08-31.** Zero backend. A ★ on each card writes to `localStorage`; `lib/favorites.ts` uses `useSyncExternalStore` with a cached snapshot (a fresh array per read loops forever) and an `EMPTY` server snapshot so SSR and first client render agree — no hydration flash. `storage` events keep two open tabs in sync. All localStorage access is try/caught because private-mode Safari and the Instagram/TikTok in-app browsers throw on it; favourites degrade to "none" rather than taking the board down. Star is a ⭐ not a ♥ — reads better against the acid-green system and avoids the "like" connotation.
    
- [ ] **[ARCH-DEFENSE] Favorites Export:** Implement a lightweight "Export/Import Favorites" UI (generating a Base64 string or tiny `.json` file). This prevents users from losing their curated lists when clearing cache, switching devices, or using Instagram/TikTok embedded browsers. This export could even contain more metadata to facilitate the user viewing however they prefer, eg their own claude artifact. 

Latest feedback from Thiago:

I love how the events where grouped with the place they happen at in the listings view and in the place page as well, but the pt-br translation says "Próximo". In pt-br proximo also means "nearby". You can instead use "a seguir" or some other phrasing to avoid sounding like it's other nearby places. "next" is fine is english

We need a "message us" page where a form is submitted in which users can tell us anything, should we ask for their email if they do? do they need to check agree with anything, i suppose yes? We dont want to clutter the header menu, maybe the link to this should be an icon like language and dark/light switch

a screen for a full screen map view should be available as well, why not? The home screen looks great right now, so maybe this doesn't have to be a whole new button in the header menu that currently looks great. 

I feel that "favorites" should be a tab like "nearest" and "latest" — _[resolved, see EPIC 1: shipped as a scope toggle in the tab row, prominent as a tab but preserving the Nearest/Latest sort]_

Tive a idéia de criar alter ego bots, a começar pelo meu. Talvez a gente precise de um agente só pra criar alter ego bots, coletando um nome do bot, instruções do avatar que sempre devem ser adaptadas pelo skill criador de alter egos para o tema visual 1930s tex avery cuphead sempre robotico, link da pessoa ou quem quer que tenha criado esse alter ego se houver e a descrição do alter ego bot, que sera criado como skill/agente . 

Crie um alter ego bot para mim (Thiago) meu link é https://linktr.ee/Th14g0 . Crie o avatar com base no personagem Jaga dos Thundercats but 1930s tex avery cartoon and robotic. Meu bot agente se chamara Djaga. Descrição/prompt: intolerante a Lactose, but may take the lac free pills if REALLY worth it. flexitarian. Gosta de gyms enormes, centros de treinamento, com equipamentos bons. Fussy eater. Hates eating any visible fat, not into crustaceans or mollusks or brains or ossobuco, you get the gist. Loves certain types of fancy food, street food, high low, does have neurodiverse food peculiarities. But loves to eat and proactively seeks out restaurants to review. Flexitarian. Likes peaceful places. neurodiverse profile at 5 years old, for context, was TL;DR Comprehensive 1981 psychometric assessment profiling a 5-year-old male demonstrating severe positive cognitive asymmetry (precocious intellectual and visual-motor acceleration) in the superior range across standardized measures, accompanied by hyper-early academic acquisition (spontaneous literacy and numeracy) and stable socio-emotional adaptation.
also adhd. likes concerts in smaller venues def not festivals unless it's really niche chill but not boring, fully appointed sort of thing, Djaga needs the place to offer ensuite private rooms ffs, musical taste at https://youtube.com/playlist?list=PLbJI25r0osEzD9fXUhxwbASU1iD2PPoyo&si=BZR2mXaa25nAtojm loves sci fi loves cafes loves comics loves kitsch loves camp, likes the outdoors, interested in lgbt sports including rugby, swimming, martial arts, is gay male, 50 years old, 420, loves california, london (keep a closer eye in Stoke Newington, but also Bethnal Green and Greenwich, amsterdam and surroundings, sao paulo, rio, rome, bologna, litoral norte sp, loves sorbetto, keeps an eye on Sao Vicente, praia grande, santos for new stuff and to update stuff with the caretaker skill. loves asian food, italian food esp grano duro pasta, and always willing to explore cuisines but extremely mindful of his fussy quirkys and actual restrictions. loves urban cycling, exploring cities on bike. Loves trains. Loves San Francisco. Always interested in sunny sea side gay 420 experiences, actively looks out for those in fact, using any skill including war room if needed to accomplish his content goals. Also loves Barcelona. May be summoned to write articles/help the local editors or any other skills


  

**Subject Profile & Context**

  

- **Assessment Date**: December 18, 1981.
    
      
    
- **Chronological Age**: 5 years, 9 months (DOB: March 11, 1976).
    
      
    
- **Evaluator**: Francisco José Molinari (Clinical Psychologist).
    
      
    
- **Diagnostic Category**: Intellectual precocity / high cognitive potential / giftedness.
    
      
    

**Psychometric & Cognitive Performance**

  

- **Raven’s Progressive Matrices (Colored/Infant Scale)**: 19 points; Percentile $\ge 95$; Rank I (Superior Intelligence classification).
    
      
    
- **Binet-Simon Intelligence Scale**: Resolved all developmental items corresponding to age 7 and advanced items corresponding to age 8 (showing a 2.25+ year cognitive advance over chronological age).
    
      
    
- **Goodenough Draw-A-Person Test**: 18 points, classified at the Superior IQ range.
    
      
    
- **Bender-Gestalt Test (Visual-Motor Integration)**: Total score of 34 points, demonstrating advanced developmental organization significantly ahead of chronological baseline:
    
      
    - Angles: Equivalent to 10-year-old developmental level.
        
          
        
    - Spatial Orientation: Equivalent to 9-year-old developmental level.
        
          
        
    - Relative Position: Equivalent to 9-year-old developmental level.
        
          
        
    - Overall visual-motor maturity: Age 8 to 10 developmental band.
        
          
        
- **Lourenço Filho ABC Test (Readiness)**: Maximum readiness score (Maturation Level = 15), indicating total functional readiness for formal written curriculum.
    
      
    

**Neurodevelopmental & Behavioral Traits**

  

- **Academic Hyper-Precociousness**: Demonstrated fluent, autonomous reading and writing capabilities alongside operational comprehension of elementary mathematics prior to 1st grade entry.
    
      
    
- **Cognitive Processing Style**: Rapid yet deeply reflective execution; maintains high baseline concentration, calm disposition, and confidence during high-demand cognitive tasks.
    
      
    
- **Affective & Social Integration**: Strong sociability, communicative ease, immediate positive integration into novel unstructured environments, and high cooperative engagement.
    
      
    
- **Clinical Recommendation**: Formal pedagogical adaptation, enrichment, and extracurricular acceleration to avoid cognitive under-stimulation within standard primary grade curricula.]



OK thats it for the Djaga agent, that was all just context btw

We should actually have an events view as well. What would work best for that? A page in the header menu like guides, with all the calendar features? A filter in the current view? Also adjusting the map should be reflected in the listings that appear in the current view, perhaps, does that make sense and is it doable?

## 🔭 External read: Gemini's cold assessment of near.tips (2026-08-31)

Operator ran near.tips past Gemini with no prior context, to see how the site reads to an outsider. Most of it just confirms what this backlog already tracks (thin 11-source catalogue, personas-as-bylines, London/Santos/SP footprint) — logged here mainly for the one genuinely new signal:

- **The London↔Santos↔SP geographic jump reads as "highly irregular" to someone with zero context**, and Gemini's best guess was that it reflects the founders' personal data/location rather than a deliberate strategy. That guess is *correct* (the seeded-audience reasoning in EPIC 5), but a cold reader has no way to know that — it currently just looks arbitrary or unfinished. **Actionable:** the About page (already queued above, "maintained by various humans empowered by AI...") or the `/sources`/city pages could say explicitly *why* these particular cities come first (operator's home base + real social network = actual first readers), turning an apparent randomness into a credible, even charming, origin story instead of a gap to explain away later.
- Otherwise a fair external gut-check that the "vibe over volume" stage is showing — consistent with the sources-catalogue and content-density items already tracked in EPIC 4b/2. No new work items beyond the About-page framing note above.



## Session 2026-09-01: Ladies&Gentlethem — new monthly LGBTQIAPN+ column (completed)

Built end to end, mirroring the weekly editorial column's structure:
- `content/ladies-and-gentlethem.md` (standing doc: cadence, entry bar,
  rotating-writer process, site placement, series index)
- `content/ladies-and-gentlethem-index.json`,
  `app/[locale]/ladies-and-gentlethem/page.tsx` (archive page),
  `app/ladies-and-gentlethem/feed.xml/route.ts` (RSS), header nav link
  (`L&G`), new locale message keys across all six `messages/*.json`
- First entry, `content/collections/ladies-and-gentlethem-2026-09/`
  (all six locales, status: active), byline STEFAN — Amelia Abraham's
  *Sex, Clubs, Dissent* photobook (US launch Sept 8 2026), Curaçao Pride
  (Sept 30–Oct 4 2026), and a first-time roundup of Near's five existing
  lgbtq-friendly-tagged nightlife places (London, Amsterdam x2, São
  Paulo, Santos). Hero image at the generic-but-correct illustrated
  fallback tier (no venue-specific shot ready in time), disclosed as
  such — flagged for a future near-illustrator upgrade.
- See `content/_ingestion-log.md`'s matching entry for full detail,
  including the `npm run build` status (fails on an unrelated concurrent
  agent's `the-setlist-2026-10` content, not on anything from this
  task — every file this task touched passes schema's char limits and
  TypeScript compiled clean).
