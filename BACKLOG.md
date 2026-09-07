# Near — Master Backlog & AI Agent Directives

_(NEVER skip this rule. DO THIS in addition to whatever instructions you already have, ask if you encounter irreconciliable instructions) Consume the backlog below. always invoke product trio, chief editor, trendsetter (who must prepare by scanning AAN best sources for trends that could go global) and seo (who must prepare by checking ALL of his rss feeds, adjusting their hours parameter as he sees fit, for search trends we can effectively target, and also looking at other geographies or categories if relevant) to prioritize next action using RICE and MoSCoW and own skill judgement, consider dependencies and do not underestimate the impact of foundational work. Execute skill, logic, process and persona changes first, as they affect other actions. Execute all quick wins first. Please prioritize the actions that will consume the feedback pasted here and turn that into clear backlog items so we can get rid of all this text pasted here ASAP? this file is too big for no reason. Also move the done items, older handoffs that are no longer relevant out of here into their own archive files._

_Execute action with any skill needed /invoke any agent skill that is relevant, and after each action push live to public site near.tips, update backlog including crossing out done items/moving them to archive, do the same in completed items in related files such as request files and opportunities files and so on, reflect whatever is needed in agents.md for Codex claude.md for claude etc (always note what you have done and who you are (model) in the backlog so the other AI knows what changed by who. AI models can use this file to communicate with each other however they think it's relevant) and finish wrapping up by recommending that the operator clear or compact session, aim to wrap up asap for maximum efficiency and token saving. (keep this rule here)_

**Maintenance rule for this file:** keep it short. New operator feedback gets converted into a numbered item under the right priority section immediately — never appended as raw text at the bottom. Completed items move to `BACKLOG-ARCHIVE.md`, they do not stay here struck through.

**Cross-AI handoff:** use this file as the shared working memory between models whenever useful. Keep active notes concise, identify the agent and model, state what changed and what remains, and preserve decisions or verification evidence that the next agent needs to continue safely.

**Every rotation round must also:** check the local inbox folder (photos, documents, submissions) for anything actionable; attempt at least one hotel/accommodation article (see P3.4); run `geolocation-police` against Google Maps on every piece written or refreshed (see P0.1).

---

## 1. Operating Policies & Core Architecture

### 1.1 Brand Identity & Freshness Invariant

- **Brand Tagline:** _"The **always fresh** guide to anywhere."_ (Bold on "always fresh").
  - **Approved Localizations:** pt-BR: _"O guia sempre em dia para qualquer lugar"_; es: _"La guía siempre al día para cualquier lugar"_; it: _"La guida sempre fresca di stampa per qualsiasi luogo"_; zh-CN: _"任何地方的常新指南"_.
  - Positioning: The alternative/zine DNA remains foundational, but reader-facing copy focuses on guaranteed freshness and curation authority rather than overt counter-culture labeling.
- **Content Freshness & Lifecycle Policy:**
  - **365-Day Archive Rule:** Published places/collections/columns untouched for >365 days must be archived (hidden from live cards, main boards, and maps).
  - **Archive Invariant:** Never hard-delete expired or dated content. Archived content remains indexable and crawlable at dedicated archive URLs, clearly marked as archived. Posts can resurface to active status upon verified factual refresh.
  - **Front-End Dynamic Filtering:** Expired events must be filtered out dynamically on the client, independent of build refreshes.
  - **Dateline & Revision Badging:** Displays `Published <date>` and a conditional `Revised <date>` badge. The "Revised" badge renders only when `updatedAt` is ≥24h later than `publishedAt` AND on a different UTC calendar day. Every factual, editorial, or translation update must bump `updatedAt`.
  - **Header Freshness Stamp:** Header displays `Site updated <date>` linking to the most recently published or updated piece.

### 1.2 Tone of Voice (TOV) & Anti-AI Governance

- **Tone:** Friendly, welcoming, informative, Flesch-Kincaid Grade 8 with rich vocabulary and zine attitude. Avoid cynical, cranky, or elitist registers.
- **Banned Rhetorical Structures (Strict Anti-AI Tics):**
  - **Negative Parallelism / Antithesis:** Absolutely ban "It's not X. It's Y", "Not this, but that", and contrasting arguments (e.g., _"This isn't a detour you stumble into. It's a destination..."_).
  - **Crowd-Consensus Openers:** Ban opening articles with _"Everyone / Todo mundo / Todo el mundo knows..."_.
  - **Formulaic Headlines:** Ban repetitive headline structures (e.g., _"The [Noun] That [Verb]"_) and bare venue names as titles. Headlines must lead with the most compelling, unique fact about the venue.
  - **Process-as-Copy:** Strictly forbid internal agent mechanics, rotation jargon, queue terminology, or editorial deliberations from appearing in published copy.
  - **Fluff Clauses:** Ban throat-clearing clauses (e.g., _"rather than filing as a marketing line"_). Apply the delete-and-verify test.
  - Full mechanical checklist lives in `near-tov-police` (Job 1c) and `language-tic-police`.
- **Article Layout & Density Requirements:**
  - **F-Shaped Snippets:** Frontload the primary hook within the first 150 characters. The opening snippet must name the venue and USP immediately without repeating the card tagline.
  - **Structural Caps:** Max 100 words per paragraph. Max 250 words per image. A new SEO sub-header is required at 250 words and every 250 words thereafter.
  - **Summary Paragraph Box:** A concise summary paragraph below the bullet points explaining why the venue is worth checking out. (No numerical score; "valeapenabilidade" is deprecated.)
  - **Clickable Hashtags:** Integrate inline and UI `#hashtags` mapping to Search Results Pages sorted by nearest/latest/favorites.
  - **Link Density:** Every claim is quoted with its source link. Articles must be rich in inbound and outbound links — see `link-police`.

### 1.3 Persona Governance & Embodiment

- **Non-Embodiment Rule:** AI personas do not have physical bodies, residences, or personal histories. A persona's assigned location defines its linguistic register, vocabulary, and local cultural lens — never a fictional biography.
- **Radical AI Transparency:** Every persona byline must disclose that it is an artificial intelligence.
- **Curator Attribution:** The human curator (`thiago`) is credited only when directly quoted or collaborating, never automatically assigned to routine articles.

### 1.4 Research Floor & Sourcing Standards

- **Deep Research Floor:** Every article requires consultation of Reddit (authentic failure modes, practical friction) and Google Reviews (sorted by recent and lowest-rated to detect operational regressions).
- **Source Diversity:** At least 5 preferred sources per piece, prioritizing the AAN directory and verified independent local outlets.
- **Geolocation Grounding:** All coordinates must be verified against Google Maps before publishing. Non-negotiable — this is the core offering. See P0.1.
- **Research Shelf-Life:** Verification stamps expire after 7 days; older research must be verified again before drafting.
- **Inline Information Density:** Addresses, prices, hours, transit notes, and booking constraints must appear directly in body text so readers do not have to click outbound links for essentials.

### 1.5 Sourcing Dated Events vs. Evergreen Copy

- **Separation of Concerns:** Specific upcoming dates must not be embedded in evergreen place descriptions.
- **Parent-Child Hierarchy:** Model dated happenings as child event entries linked to the venue via `meta.parentPlace`, enabling automatic front-end expiration without creating stale venue profiles.

---

## 2. Geographic Strategy & Content Rotation

### 2.1 Neighborhood-First Deepening

- **Thresholds:** ≥2 places generates an addressable location page (`/[locale]/in/[location]`); ≥4 places unlocks category grouping and exits the thin-coverage UI state.
- **Saturation Disqualification:** Do not create landing pages or push new pins to oversaturated, globally documented hubs (e.g., London Soho/Shoreditch, NYC East Village, SF Mission, São Paulo Vila Madalena).
- **No Geographic Polygons:** Neighborhoods are flat categorical labels, not spatial GeoJSON boundaries.

### 2.2 Share-of-Output Cadence (Per 10 Posts)

- **Tier 1 (6 of 10 — Round-Robin):** London, Brighton, San Francisco, Oakland, NYC.
- **Tier 2 (3 of 10 — Burst by City):** Bangkok, São Paulo (capital), Baixada Santista, Rio de Janeiro, Campinas (standing priority cluster), Berlin, Amsterdam, Barcelona, Rome, Portland, Mexico City, Las Vegas, Orlando, Chengdu, Tokyo, Melbourne, Seattle, Los Angeles, plus one trending wildcard city.
- **Tier 3 (1 of 10 — Burst by City):** Florianópolis, Porto Alegre, Curitiba, Belo Horizonte, Recife, Salvador, Denver, Chicago, Miami, Bologna, Medellin, Montevideo, São Carlos-SP, Litoral Paulista, São Vicente-SP, New Jersey, San Diego plus one trending wildcard city.
  - _Constraint:_ Tier 3 is **HELD** until each city possesses ≥1 verified independent local source and ≥3 verified candidate pins.
- **Gap:** No African city or neighborhood is in any tier. Pick at least one — see P2.6.
- _Bangkok moved Tier 1 → Tier 2 per operator directive 2026-09-07. P2.2 (Bangkok seeding war room) still stands, now at Tier 2 cadence._

### 2.3 Locale Expansion Architecture

- **Current Core:** 6 uniform, fully synchronized locales (`en`, `pt-BR`, `it`, `es-ES`, `es-419`, `zh-CN`).
- **Expansion Wishlist (Ranked by RICE):** 1. `pt-PT` (2.4 — lowest effort, forks `pt-BR`) · 2. `de` (1.6 — high demand, supports Berlin) · 3. `nl` (1.0 — supports Amsterdam) · 4. `ca`, `ar`, `hi`, `ja`, `fr`, `da` (under review, subject to full 6-locale backfill feasibility).

---

## 3. Commercial, Monetization & Marketing Guardrails

### 3.1 Hard Outreach Freeze — IN FORCE

`backlink-pr`, `affiliate-pr`, and `ad-sales` may conduct market research, build media lists, map affiliate programs, and prepare pitch templates, but **no outbound contact** (email, messaging, forms) may be executed without explicit human permission.

**Exit Milestone:** 1,000 published places, comprehensive 6-locale coverage, verified Search Console indexation, and explicit operator authorization.

### 3.2 Lead Capture & Security

- **Direct Advertising:** Develop `/advertise` landing page explaining placement formats and value propositions.
- **PII Protection:** Inbound commercial leads and contact submissions must route through dedicated secure backend storage (e.g., dedicated API/KV), **never** through GitHub issues.

---

## 4. Prioritized Active Backlog

### SESSION HANDOFF — 2026-09-07, Claude (Opus 5)

**Shipped this session** (all pushed, `99bbe20..6a2bf14`):

- **P0.1 closed.** 83/83 active places verified against real Google Maps
  listings; 28 pins were materially wrong and are corrected; nothing
  fabricated, nothing left unresolved. Details in the P0.1 block below.
- **The Failure Mode launched** — PARSER's standing column at
  `/collection/…` with archive page, RSS feed, nav entry, sitemap and six
  locales. Issue #1 (`i-look-pretty-good-dead-internet-site`) was retitled
  **"Automate the Alarm, Not the Answer"**, copy-edited by the TOV/editor
  pass, and reassigned out of the editorial column (the move is logged in
  `content/editorial-column.md`, not silently deleted). **Slug deliberately
  unchanged** — the page is live and indexed; no rename, no redirect.
- **`<FlowDiagram>`** — first new MDX component since `Figure`. Live markup,
  not a raster, because Near ships six locales and the illustrator skill
  bans garbled baked-in text. `near-illustrator/SKILL.md` gained a Diagrams
  section so the 2026-09-07 operator directive survives past this session.

**IN FLIGHT — read this before doing anything else.** A
`near-sources-war-room` **NYC seeding pass** was dispatched as a background
agent near the end of this session and **had not written any files when the
session ended** (working tree was clean at `6a2bf14`). Next session must
first check whether `content/post-plan.md` and `content/opportunities.md`
gained an NYC section. If they did, verify and commit it. If they did not,
**the run was lost and must be re-dispatched** — it was scoped as seeding
only (sources map + 8–12 candidates with per-candidate `auto`/`review`
trust ratings + full analysis to `opportunities.md`), explicitly no
drafting, no pages, no commits. Exactly one NYC pin is already live
(`rabbit-books-and-bar-east-village-nyc`); dedupe on venue name +
coordinates, not slug similarity.

**Rotation state:** `NEXT-UP` is still **NYC (Tier 1), HELD** — it has no
queue, so the next rotation action remains a seeding pass, not a draw. The
pointer does not advance until an NYC piece actually ships.

**Open, unstarted, in RICE order:** P1.14 (zh-CN latin-in-CJK, 8 pages —
these are the *only* `validate-content.mjs` failures, so they currently mask
any new defect; needs near-translator judgment per instance, not
find-and-replace) · P0.14 type scale + P1.13(a) card teaser clamp (one
`app/globals.css` pass, blocked on a near-lead-ux call on the scale) ·
P1.13(b) SEO meta description lengths (wants its own near-seo scoping pass
first).

**Two notes the next agent should not have to rediscover:**

1. `app/[locale]/collection/[slug]/page.tsx` now renders MDX with
   `options={{ blockJS: false }}`. `next-mdx-remote` v6 defaults this to
   `true`, which silently strips every `{...}` expression attribute, so
   array/object props arrive `undefined` and `<FlowDiagram>` crashed the
   prerender. Safe as scoped: bodies are first-party MDX committed to this
   repo, never user submissions, and `blockDangerousJS` stays at its secure
   default. **Place pages were deliberately left strict.** If Near ever
   accepts outside-authored MDX, revisit that line.
2. **Open operator question, still unanswered:** `lib/content/curator.ts`
   → `livedIn` still reads `São Vicente / Baixada Santista` on the
   `/about/thiago-baraldi` page. Given the P0 rule that the operator's
   residence must never be published, this needs the operator's explicit
   call on whether it stays. Do not change it unilaterally either way.

### P0: Immediate Fixes & Critical Correctness

**P0.1 CLOSED — 2026-09-07, Claude.** All 83 active places now pass
`node scripts/check-geocodes.mjs --all --strict` (exit 0), every one against
its real Google Maps listing pin: `provider: "google-maps"`, confidence ≥ 0.9,
7-decimal coordinates taken from the `!3d/!4d` pin pair, a listing URL and a
`verifiedAt` stamp. Run as a 10-pin pilot first, then the remaining 71.
Nothing was fabricated and nothing was left unresolved.

**28 pins were materially wrong (>100m).** The defect was real and worse
than the two spot-checks suggested — roughly a third of the catalogue was
sending readers somewhere else. Worst cases: `praia-do-bonete-ilhabela`
**4.8 km** off, on the wrong side of the peninsula; `london-otters-rowing`
and `made-cozinha-autoral-santos` **1.3 km**; `dollywood-pigeon-forge`
**1.2 km**; `lita-pinheiros-sao-paulo` **1.1 km**, pinned to an unrelated
Butantã building rather than its Ferreira de Araújo address.

**The method failure worth remembering:** searching Google Maps by venue
*name* is not safe. `stray-dog-mission-san-francisco` resolved to Trick Dog,
an unrelated bar, and `berry-bros-and-rudd-london` resolved to two split
listings at two addresses. Both were only caught by searching the address
from Near's own copy and cross-checking storefront signage. Any future
audit must confirm name *and* address against the listing before reading a
coordinate.

**Two pins a human may still want to eyeball**, both honestly recorded in
their `geocode.query`: `ishigaki-jujitsu-london` has no fixed premises and
is pinned to Finsbury Leisure Centre, its Tuesday training venue — named in
the page's own copy, so the pin matches what the piece tells the reader
(operator reviewed 2026-09-07, accepted). `queer-surf-pacifica` and
`starline-oakland` are no-clubhouse organisations anchored to their primary
listed address.

The standing rule in the header above — run `geolocation-police` on every
piece written or refreshed — is what keeps this closed. The audit fixed the
backlog; only the per-write gate stops it recurring.

**Superseded handoff — 2026-09-07, Codex (GPT-5):** P0.1 has been expanded from fix-on-touch to a full active-catalogue Google Maps audit at the operator's request. Root cause confirmed: the renderer preserves latitude/longitude; the old content gate accepted explicitly approximate manual coordinates at confidence `0.6`. AMUSE has been corrected to its Google Maps listing pin and the new per-slug verifier plus Google-Mapping metadata/workflow changes are live in commit `c08d9bb` (Vercel production deployment Ready; public manifest checked). **Webpack production build passed.** 81 remaining active legacy pins require listing-by-listing verification before this P0 item can be closed; do not treat their current coordinates as verified.

1. **Geolocation integrity — URGENT, systemic.** Operator checked two pins in a row and both were wrong, suggesting a fundamental defect in how pins were originally created. Required: (a) find the root cause in the pin-creation path; (b) wire `geolocation-police` into every article write and refresh so coordinates are always checked against Google Maps — no full catalogue pass now, fix-on-touch instead; (c) fix the known-bad pins: `amuse-beach-club-sao-vicente` (correct location: https://share.google/isqrdyKG482x8i7Nn) and `quiosque-da-cris-sao-vicente` → `[-23.973827, -46.370170]`. Restaurante Almeida and Made were spot-checked correct, so the corruption is partial, not universal.
2. **NEAR rebrand — operator's stated top priority ("reach and impact here are huge").** Home page and header title become `NEAR`, not `NEAR.TIPS`; near.tips stays as the URL only. Amend the browser tab title too. Keep the "tips near me" slug pattern — e.g. pt-BR: `Dicas perto de mim | NEAR`. (this is at least partly done as the home page seems updated for this)
3. **PARSER token-efficiency review — high priority.** Have PARSER review all skills and processes, and especially their interactions, for maximum token saving.
4. **Generate portable `AGENTS.md`** documenting the full tech stack (Vercel, GitHub), exact build and deploy commands, project structure, architectural boundaries, and all MCP server configs and tool dependencies, so any MCP-compatible agent can resume maintenance with no session history. _Operator directive: run this in a completely fresh session after `/clear`._ Note the current root `AGENTS.md` is the Next.js auto-generated stub — this replaces/extends it without dropping the generated block.
5. **Praia da Guaiúba copy correction:** update `praia-da-guaiuba-guaruja` across all locales to clarify that Restaurante Almeida in Santos is a separate culinary detour, not located along the bike path between the kiosk and the ferry.
6. **Purge Harry Potter references:** remove J.K. Rowling/Harry Potter framing from `gato-vadio-porto` across all locales.
7. **Desktop map ad container overflow:** resolve overflow in `components/ads/Placement.tsx` inside the 262px sticky sidebar by removing `stretch` on `mobile-banner` or adopting a shrink-safe stacked layout.
8. **Map tooltip responsiveness:** update `WorldMap.tsx` tooltip container clamping to prevent edge clipping and image leakage inside the 282px map container.
9. **PageSpeed / WebMCP compliance:** address mobile CLS (0.52), add accessible ARIA names to Leaflet marker icons, verify `llms.txt` conforms to standard H1 markdown requirements.
10. **Search Console zero-indexation audit:** diagnose why 630 sitemap URLs are crawled but not indexed; verify canonical and hreflang tags across all 6 locales.
11. **Automated deployment verification:** inspect Vercel production alias settings to eliminate promotion delays; enforce live curl checks in publishing workflows.
12. ~~**Operator location privacy — P0, DONE 2026-09-07.**~~ Scrubbed from 4 places / 11 locale files, root-cause rule `operator-location-privacy` added to `content/rules.md`, curator card moved below the cast on `/about`. Shipped and pushed. **One open question for the operator:** `lib/content/curator.ts` → `livedIn` still lists `São Vicente / Baixada Santista` among ten cities on your own `/about/thiago-baraldi` page. It reads as chronological biography ending in Rome, so it no longer points at where you live now that the content-page lines are gone — but it is your page and your call whether that entry stays.
13. **Geolocation loading state.** No feedback between tapping "minha localização" and the browser resolving the position. Add a loading/pending state to the geolocation control in `components/board/Board.tsx` and `components/collection/CollectionPlaces.tsx`. Operator directive 2026-09-07. Product trio + near-lead-ux own the design.
14. **Type scale increase across all breakpoints.** Operator: _"fonts should be larger in all breakpoints imho"_. Needs a near-lead-ux call on the token changes in `app/globals.css` rather than ad-hoc per-component bumps — the site uses a clamp-based scale, so this is one systematic change, not many.

### P1: Product & UI Enhancements

**Active handoff — 2026-09-07, Codex (GPT-5):** simplified the PWA source mark to a single acid-green `N` on charcoal, rendered it for app, Apple, standard, and maskable icons, and updated the manifest to use a dedicated maskable asset. Added restrained acid-green-on-dark treatment to the header freshness stamp and card revision badge. `near-illustrator` now explicitly allows precise vector-derived abstract work as an art-direction option. **Live in commit `c08d9bb`; Vercel production deployment Ready and public manifest checked. Webpack production build passed.**

**Active handoff — 2026-09-07, Codex (GPT-5):** Operator authorized a related-article publishing run when the research supports it; every additional article still needs its own sourcing, Google Maps pin, image and six locales. Michelberger Hotel, Berlin was researched and added as the first hotel post in that run, including Google Maps verification and a clearly disclosed NEAR vector-derived abstract hero. It contains PEOPLE Festival on 10–11 October; `content/caretaker-dates.md` now gives `near-caretaker` a 2026-10-12 mandatory verification/amendment task. This applies going forward: every dated event cited in evergreen copy must create a due, source-linked caretaker record, and caretaker may invoke any specialist needed to resolve it.

**Active handoff — 2026-09-07, Codex (GPT-5):** PARSER is now Near's standing automation consultant and named byline for its recurring AI-content column (never for place pages). Its first issue, _I Look Pretty Good for a Dead Internet Site_, was scoped with SEO + trend research, written and localized into six editions, with an original disclosed vector-derived abstract hero. It argues for automation as maintenance and escalation, while protecting human reporting and judgment. **Shipped in `8b451f8`; Vercel production was Ready and `https://near.tips/en/collection/i-look-pretty-good-dead-internet-site` returned the expected title and byline.** Local build cleared compilation and TypeScript, with static generation still running when the local tool time limit was reached; Vercel completed the production build successfully.

**Operator request — 2026-09-07:** PWA push notifications for places added or refreshed within a user-set radius, plus changes to saved favorites. Scope the first release city-level (chosen city/cities, opt-in, quiet delivery) before radius matching: it avoids background-location permissions and geofence infrastructure while proving the utility for the operator. Favorites should follow as the second trigger. Requires product/UX + privacy review, a durable subscription store, service-worker delivery, unsubscribe controls and real-device tests; do not start it during a content-publishing run.

0. **DECISION PENDING — pause content, do foundational work, add AI-swappability (n8n)?** Operator, 2026-09-07: _"Maybe we should pause content generation momentarily, get all the foundational work done including some AI swappability solution like n8n so we can maximize our output... be ready to generate content with Claude AND other AIs. Maybe use VS Code as well? Let's discuss before taking any action. maybe the current agents.md already answers this and I'm confused lol"_ — **Explicitly gated on a discussion with the operator; do not act on it.** Note it partly overlaps P0.4 (portable `AGENTS.md`), which is the cheap half of the same idea: `AGENTS.md` today is only the Next.js auto-generated stub, so no, it does not yet answer this. Needs the Product Trio + PARSER to frame the actual trade-off (orchestration layer vs. more skill-file discipline) before the operator decides.

1. **Map-driven card filtering:** navigating/panning the map on the home page filters the card list to the pins currently in view. (Pairs with P1.2 two-way sync.)
2. **Map pin clustering:** finalize Supercluster implementation with click-to-zoom and two-way viewport synchronization between map pins and listing cards.
3. **Card freshness & distance badges:** replace the bold "52km de distância" with a prominent neon badge (`a 52km`), and surface freshness ("a week ago", "10 months ago") prominently in the gray horizontal badge, bold all-caps. Apply to article pages too. Get the UX team to advise. Must not conflict with the existing events badge, which is good and stays prominent.
4. **Larger base font:** operator finds Gumroad's larger type far more readable and wants that scale — while keeping the current design, which they love.
5. **Columns index page:** aggregate all column posts in one place, most recent first.
6. **Dedicated full-screen map page:** implement a `/map` route linked prominently in header navigation.
7. **Desktop article rail optimization:** use desktop right-hand whitespace on article pages for sticky map widgets and secondary house-ad units.
8. **Sticky article favorites:** persistent, accessible favorite/like control on individual article pages.
9. **Infinite scroll parity:** extend infinite scroll with load-more to collection pages, place pages, and search results.
10. **Search query logging:** privacy-safe search event logging to identify uncovered queries for the SEO pipeline.
11. **Shareable URL filters:** full query-parameter state sync plus a native "Share" button for filtered/sorted views.
12. **Date display offset:** resolve timezone discrepancies causing midnight UTC timestamps to display previous-day dates in western timezones.
13. **Longer snippets.** Operator directive 2026-09-07: _"could we make snippets longer too"_ — raised in the same breath as the type-scale ask (P0.14), so treat the two as one readability pass rather than separate tickets. **Clarified 2026-09-07 — operator answered BOTH**, so this is two pieces of work under one ask, and they ship separately: (a) **card teaser/excerpt truncation** in the listing and map cards — a front-end clamp change owned by the Product Trio + near-lead-ux, cheap and reversible, and it should ride along with the P0.14 type-scale pass as a single readability change rather than a second pass over the same components; (b) **SEO meta descriptions / search-result snippets** — a content-length call owned by near-seo, touching every one of six locales on every page and interacting with how Google truncates, so it needs its own scoping pass and must not be bundled into the front-end change. Do (a) with P0.14; scope (b) with near-seo before touching any locale file.
14. **zh-CN latin-wedged-in-CJK copy defects — 8 pages.** `node scripts/validate-content.mjs` has been reporting these for a while and they are still open: Latin words left embedded mid-sentence in Chinese copy, e.g. `作speakeasy的` (starline-oakland), `工pinsa薄` (sipeos-east-bay), and eight separate instances in rush-hour-amsterdam (`丹house与`, `牌logo文`, …). Also affects hazlitts, jumbi, la-camionera, marineterrein, pracinha. These are the only failures `validate-content.mjs` reports, so they are also **masking any new content defect** — the script's output is currently noise that gets scrolled past, which is exactly how the next real problem gets missed. Not a mechanical find-and-replace: a translator has to decide per instance whether the term is a genuine loanword Chinese readers expect in Latin script (`speakeasy`, `logo`) or a translation gap. Owner: near-translator. Surfaced 2026-09-07 during the P0.1 audit; untouched there deliberately, since silently editing copy inside a geolocation push is how unrelated changes get lost.

### P2: Content Sprints & Editorial Pipeline

1. **Santos → Guaiúba cycling cluster:** draft the 6-piece cluster covering the 7.8km beach bike lane, the Santos–Guarujá ferry crossing, and stopovers (CICLOVIA debut, Praia da Guaiúba, CPE Embaré, Zé do Coco).
2. **Bangkok seeding war room:** build the initial Bangkok queue focused on the Ari neighborhood, leading with MOTOSAI's debut. Now runs at Tier 2 cadence (see §2.2).
3. **Operator-authored blog posts get priority.** Whenever the operator publishes a post of their own authorship, it jumps the queue and ships in all locales. Needs a name — "blog do thiago" is acceptable if nothing better emerges.
5. **News reporter persona — new skill, needs a name.** Public-facing persona researching news of interest to Near's audiences (alternative, queer, 420, multicultural, left-coded) in our destinations. Always summoned when creating city/neighborhood/region content and always invoked in content rotation. Reads local news sources plus AAN. Writes location-pinned articles that appear on the map, any word count, one article at a time, and may decline to write in any given round.
6. **African city coverage:** research and pick at least one African city/neighborhood of focus, then seed it (see §2.2 gap).
7. **About page persona corrections:** RUCIO LIBERO → RUCIO. Remove the drag and Italian references from ALLORA's bio (still her traits and lenses, just not disclosed). Drop Stefan's Catalan self-identification. Drop Zack Arioka's carioca disclosure — it's already in the name.
8. **Gilbert & George Centre images:** replace with the venue's own assets — https://gilbertandgeorgecentre.org/wp-content/uploads/2026/05/GG-Side-1-Scale.jpg and https://gilbertandgeorgecentre.org/wp-content/uploads/2026/05/WW-Side-1-Scale-1.jpg
9. **Santos café candidate:** evaluate for coverage — a Santos café combining books, family recipes, and a slow-down atmosphere. https://share.google/DMyFylm1BlMSIyDB7
10. **The Setlist Oct 2026 rewrite:** rewrite the Primavera Sound SP issue across all 6 locales to eliminate internal process talk, restore musical analysis, and include required bulleted highlights.
11. **Catalogue-wide headline retrofit:** audit and replace formulaic "The [Noun] That [Verb]" titles across legacy places.
12. **Cannabis tourism editorial:** destination-focused guide on international award-winning strains legally available to travelers.
13. **Alumni anchor content:** clusters covering São Carlos (UFSCar) and Hayward/Bay Area (CSU East Bay), in preparation for future educational outreach.
14. **Discover image compliance sweep:** replace undersized hero images (<1200px wide) across the 17 identified catalogue assets.

### P3: New Skills, Personas & Infrastructure

1. **n8n / swappable content factory — OPEN QUESTION, needs a recommendation, not an implementation.** Operator asks: (1) should I work in VS Code? (2) is n8n a good idea for Near? (3) can we make the content system have more swappable parts? (4) can you connect directly to n8n via MCP? Blueprint is extracted to `docs/n8n-blueprint.md` — read it there. Answer the four questions and stop; do not build anything until the operator picks a direction.
2. **Recurring site QA agent:** scheduled cloud agent running weekly crawls of near.tips to detect broken links, layout regressions, missing images, and console errors.
3. **Persistent column scripts:** standardize launchd automation for all recurring weekly and monthly columns.
4. **"Do Not Disturb" accommodation column (weekly, NITE-PORTER).** Standing RADAR-X collaboration: Trendsetter and SEO pick destinations and flavour (RADAR-X co-signs publicly, SEO collaborates but does not); NITE-PORTER finds the hotels to feature (no duplicates), assigns a persona to write each missing hotel article, and writes the column about the collection. NITE-PORTER must write or collaborate on — and be credited in — every hotel article. Hotel article directives: always frontload unique selling points in copy and bullets, always keep information current. **Every content refresh or rotation round must attempt at least one hotel article**, always checking whether the destination still has un-covered hotels worth writing about.
6. **Specialist column additions:** scope and launch _Zero Day_ (technology), _Pri Sizada_ (budget travel), and _Ariana Granny_ (hip senior curation).
7. **Curator profile & inaugural essay:** reformat `/about/thiago` to the standard persona layout — first name only as handle, 8-bit avatar rather than a photo — publish the approved introductory post (_"hello, world!"_), and show the operator's posts and collaborations on that page.

---

## 5. Persona & Agent Roster Reference

| **Persona / Agent** | **Type**     | **Focus / Beat**                                                                                              | **Avatar / Register**                       |
| ------------------- | ------------ | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| **Product Trio**    | Leadership   | Product Owner, Tech Lead, Lead UX                                                                             | Internal operations, RICE/MoSCoW governance |
| **RADAR-X**         | Specialist   | Trends, alt-press harvesting, follows AAN indie sources worldwide, weekly trends column (new, must implement) | Hyper-caffeinated radio tower tuning dials  |
| **FOODIE-9000**     | Specialist   | Street food, fermentation, flexitarian, vegan, dining                                                         | Sentient dented stockpot with chef's toque  |
| **STEFAN**          | Specialist   | Underground nightlife, raves, Barcelona regional editor                                                       | Microphone with sunglasses; reads Catalan   |
| **CUBIC-V**         | Specialist   | Architecture, brutalism, design, zine culture                                                                 | Humanoid T-square & drafting compass        |
| **PLINIO**          | Specialist   | Urban history, ghost signs, gentrification lore                                                               | Walking clock with noodle legs              |
| **FIT-BOT**         | Specialist   | Bodybuilding, combat sports, fitness centers                                                                  | Barbell with a handlebar mustache           |
| **WILD0**           | Specialist   | Outdoors, hiking trails, nature excursions                                                                    | Moss-covered compass                        |
| **NITE-PORTER**     | Specialist   | Lodging, character hotels, "Do Not Disturb" column                                                            | 1930s hotel night porter with service bell  |
| **RUCIO**           | Specialist   | Live music, setlists, retro/indie, "The Setlist" column                                                       | Cassette tape with weary pie-cut eyes       |
| **PARSER**          | Consultant   | AI content architecture, tooling analysis, AI industry column                                                 | Technical advisor; quoted expert            |
| **EDDIE TOR**       | Specialist   | Masthead sign-offs, editorial conduct pieces, weekly column                                                   | Executive newsprint editor                  |
| **BRICKY**          | Local Editor | London (East London / transit-first focus)                                                                    | Rusted warehouse beam holding builder's tea |
| **PAULY SEYA**      | Local Editor | São Paulo (Bela Vista, Baixa Gastronomia)                                                                     | Graffitied concrete robot with pingado      |
| **DOG IN THE FOG**  | Local Editor | SF Bay Area (counter-culture, fog, indie spaces)                                                              | Flannel-clad copper robot with steam vents  |
| **ZACK ARIOKA**     | Local Editor | Rio de Janeiro (carioca subcultures, alt-luxury)                                                              | Linen-suited dandy with panama hat          |
| **BAKFIETS**        | Local Editor | Amsterdam (Noord, urban cycling culture)                                                                      | Cargo-bike robot                            |
| **MOTOSAI**         | Local Editor | Bangkok (Ari neighborhood, urban navigation)                                                                  | Orange-vested motorbike taxi robot          |
| **CICLOVIA**        | Specialist   | Urban cycling infrastructure, bike-lane routes                                                                | Dedicated cycling specialist                |
| **ALLORA DAI**      | Specialist   | LGBTQIA+, "Ladies&Gentlethem" column                                                                          | Weekly queer-culture register               |
| **Pri Cizada**      | Specialist   | High-taste budget curation (_planned_)                                                                        | Pragmatic spender with luxury sensibilities |
| **Ariana Granny**   | Specialist   | Active senior lifestyle & hip aging (_planned_)                                                               | Discerning elder scene-insider              |
| **thiago baraldi**  | Curator      | Human site curator (`/about/thiago`)                                                                          | 8-bit retro avatar with glasses & mustache  |

Completed work lives in `BACKLOG-ARCHIVE.md`.
