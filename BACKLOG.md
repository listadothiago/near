# Near — Master Backlog & AI Agent Directives

_(NEVER skip this rule. DO THIS in addition to whatever instructions you already have, ask if you encounter irreconciliable instructions) Consume the backlog below. always invoke product trio, chief editor, trendsetter (who must prepare by scanning AAN best sources for trends that could go global) and seo (who must prepare by checking ALL of his rss feeds, adjusting their hours parameter as he sees fit, for search trends we can effectively target, and also looking at other geographies or categories if relevant) to prioritize next action using RICE and MoSCoW and own skill judgement, consider dependencies and do not underestimate the impact of foundational work. Execute skill, logic, process and persona changes first, as they affect other actions. Execute all quick wins first. Please prioritize the actions that will consume the feedback pasted here and turn that into clear backlog items so we can get rid of all this text pasted here ASAP? this file is too big for no reason. Also move the done items, older handoffs that are no longer relevant out of here into their own archive files._

_Execute action with any skill needed /invoke any agent skill that is relevant, and after each action push live to public site near.tips, update backlog including crossing out done items/moving them to archive, do the same in completed items in related files such as request files and opportunities files and so on, reflect whatever is needed in agents.md for Codex claude.md for claude etc (always note what you have done and who you are (model) in the backlog so the other AI knows what changed by who. AI models can use this file to communicate with each other however they think it's relevant) and finish wrapping up by recommending that the operator clear or compact session, aim to wrap up asap for maximum efficiency and token saving. (keep this rule here)_

**Maintenance rule for this file:** keep it short. New operator feedback gets converted into a numbered item under the right priority section immediately — never appended as raw text at the bottom. Completed items move to `BACKLOG-ARCHIVE.md`, they do not stay here struck through.

**Cross-AI handoff:** use this file as the shared working memory between models whenever useful. Keep active notes concise, identify the agent and model, state what changed and what remains, and preserve decisions or verification evidence that the next agent needs to continue safely.

**Every rotation round must also:** check the local inbox folder (photos, documents, submissions) for anything actionable; attempt at least one hotel/accommodation article (see P3.4); run `geolocation-police` against Google Maps on every piece written or refreshed (see §1.4).

**Progress tracking (operator, 2026-09-08):** when any AI picks up a backlog item, mark it `IN PROGRESS (model, date)` in place immediately — before finishing, not after. Update that same line with brief progress notes if the item spans more than one session, then flip to `DONE` (or move to the archive) on completion. Don't wait until the end to reveal that something was ever touched.

---

## 1. Operating Policies & Core Architecture

### 1.0 North Star — Chief Editor & CEO Mandate (operator, 2026-09-07)

Shared standing goal directive for **both** the chief editor (editorial
substance) and `near-ceo` (cross-functional/business coordination) — every
prioritization decision (RICE/MoSCoW, rotation cadence, batch scoping)
should be read against it, and it's a joint goal rather than one role's
alone precisely because hitting it touches both editorial judgment and
resourcing/coordination calls. Grow London, the SF Bay Area, and NYC to
**1,000 places each**, with every other Tier 2/3 city growing in
proportion to its existing share-of-output cadence (section 2.2) rather
than being left behind while the Tier 1 trio scales.

**"1,000 places" names the pin count, not the ceiling on scope.** The
same growth-and-quality mandate applies to *everything else* Near
covers for those cities in corresponding proportion — dated events
(`near-events`'s own coverage, not just place pages that happen to host
one), collections/guides, standing-column presence, accommodation
(P3.4's every-round hotel attempt) — scaled the same way a city's place
count scales, not left as an afterthought once pins hit a number.

Volume is never the tradeoff against the
following, all of which must hold at the same time, not sequenced after:

- **Maximum quality** — no thin pins, no padding to hit a count (see
  `quality-gate-before-publish` in `content/rules.md`).
- **Freshness** — the currency-maintenance and age-decay-archive
  discipline scales with the catalogue, not despite it.
- **Cleanup and caretaking, as often as possible** — `near-caretaker`'s
  sweep is not a tax on growth; a catalogue this size only stays honest
  if maintenance keeps pace with new pins.
- **The voice**: alternative, hipster, queer, countercultural, cannabic
  yet sophisticated, occasionally luxurious, borderline snobbish but
  still streetwise — the classic alt-weekly's credibility, not a
  generic listings tone. Every persona's own character sheet is the
  specific instrument; this is the register the whole roster tunes to.

**Token efficiency is part of the mandate, not a side concern — and
chief editor, `near-ceo`, AND `parser` all share it, alongside their own
editorial/business/research-automation guidance.** 1,000 places per Tier
1 city, at full six-locale coverage, full event/accommodation/collection
coverage and the full `near-write-article` gate sequence, does not work
as a linear per-article cost. The chief editor enforces this from the
editorial side (scoping, batching, reuse across a research pass);
`near-ceo` enforces it from the business/coordination side (resourcing
calls, resolving deadlock between roles that would otherwise each
optimize their own function's cost independently); `parser` enforces it
from the research-automation/tooling side (see `parser/SKILL.md`'s own
2026-09-07 update — research-automation and freshness are now at least
half its role, not a sideline to voice/NLP commentary) — none of the
three treats this as only the other two's job. Standing instruction:
these three specifically (plus `near-cto` and `near-tech-lead` as
needed) find and ship token-saving changes to how content gets
researched, drafted, and reviewed at this scale — shared-research
patterns like `near-batch-30` generalized further, skill/prompt
consolidation, smarter reuse of already-verified facts across a
neighbourhood cluster, agent/skill redesign where the current shape is
the bottleneck. This is real scope, not a footnote: creating or changing
skills and agents to make the 1,000-place goal (and its event/
accommodation/collection counterpart) affordable is itself
backlog-worthy work, to be RICE/MoSCoW-prioritized like anything else.

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
- **Geolocation Grounding:** All coordinates must be verified against Google Maps before publishing. Non-negotiable — this is the core offering. See `geolocation-police/SKILL.md`.
- **Research Shelf-Life:** Verification stamps expire after 7 days; older research must be verified again before drafting.
- **Inline Information Density:** Addresses, prices, hours, transit notes, and booking constraints must appear directly in body text so readers do not have to click outbound links for essentials.

### 1.5 Sourcing Dated Events vs. Evergreen Copy

- **Separation of Concerns:** Specific upcoming dates must not be embedded in evergreen place descriptions.
- **Parent-Child Hierarchy:** Model dated happenings as child event entries linked to the venue via `meta.parentPlace`, enabling automatic front-end expiration without creating stale venue profiles.

---

## 2. Geographic Strategy & Content Rotation

### 2.1 Neighborhood-First Deepening

- **Thresholds:** ≥2 places generates an addressable location page (`/[locale]/in/[location]`); ≥4 places unlocks category grouping and exits the thin-coverage UI state.
- **Saturation Disqualification:** Do not create landing pages or push new pins to oversaturated, globally documented hubs (e.g., London Soho/Shoreditch, NYC East Village, SF Mission, São Paulo Vila Madalena). Exceptions are allowed when SEO and trendsetter jointly judge a venue exceptionally relevant. Pinheiros companion coverage is tracked in P2.16.
- **No Geographic Polygons:** Neighborhoods are flat categorical labels, not spatial GeoJSON boundaries.

### 2.2 Share-of-Output Cadence (Per 10 Posts)

- **Tier 1 (6 of 10 — Round-Robin):** London, NYC, San Francisco Bay Area. We must be oh so in the new in these destinations, they are super competitive.
- **Tier 2 (3 of 10 — Burst by City):** Brighton, San Francisco, Berkeley/Oakland/East Bay, Brooklyn NY, Manhattan NY, Bangkok, São Paulo (capital), Baixada Santista, Rio de Janeiro, Berlin, Amsterdam, Barcelona, Rome, Portland, Mexico City, Las Vegas, Orlando, Fort Lauderdale, Chengdu, Tokyo, Melbourne, Seattle, Los Angeles, Paris, Lisbon, Madrid plus one trending wildcard city.
- **Tier 3 (1 of 10 — Burst by City):** Florianópolis, Porto Alegre, Curitiba, Belo Horizonte, Recife, Salvador, Denver, Chicago, Miami, Bologna, Medellin, Montevideo, São Carlos/Rio Claro-SP(college age audience), Baixada Santista/Litoral Paulista, São Vicente-SP, New Jersey, San Diego, Buenos Aires, Palermo, Lugano/Italian Switzerland, Puerto Vallarta, Milan, Valencia, Porto, Campinas (standing priority cluster), Jaú/Bauru/Araraquara region(college age audience), Edinburgh, Glasgow, Dublin, Carcavelos (college age audience), Athens, plus one trending wildcard adventure or beach classic "revista trip" destination deep dive.
  - _Constraint:_ Tier 3 is **HELD** until each city possesses ≥1 verified independent local source and ≥3 verified candidate pins.
- **Gap:** No African city or neighborhood is in any tier. Pick at least one in north africa and another anywhere in Africa, SEO and trendsetter please choose — see P2.6. Progressive as possible, if possible, due to our various lenses. No currently politically problematic or sensitive cities please. 
- _Bangkok moved Tier 1 → Tier 2 per operator directive 2026-09-07. P2.2 (Bangkok seeding war room) still stands, now at Tier 2 cadence._

### 2.3 Locale Expansion Architecture

Locale-to-destination gaps, including Greek for Athens and British English, are tracked in P1.17. A city can be covered in existing locales while expansion is evaluated.

- **Current Core:** 6 uniform, fully synchronized locales (`en`, `pt-BR`, `it`, `es-ES`, `es-419`, `zh-CN`).
- **Expansion Wishlist (Ranked by RICE):** 1. `pt-PT` (2.4 — lowest effort, forks `pt-BR`) · 2. `de` (1.6 — high demand, supports Berlin) · 3. `nl` (1.0 — supports Amsterdam) · 4. `ca`, `ar`, `hi`, `ja`, `fr`, `da` (under review, subject to full 6-locale backfill feasibility).

### 2.4 `near-batch-30` continuity (fixed rule, operator 2026-09-07)

- **Always check first** whether `content/_batch-runs/` holds a run with `state` other than fully published/held-out (i.e. an unfinished `near-batch-30`), before starting anything else that would compete with it for a session's attention. If one exists, add "finish `near-batch-30` run `<run-id>`" to the active backlog (P0/P1 as volume warrants) rather than leaving it to be rediscovered by accident.
- **If no `near-batch-30` run is unfinished or in progress**, `near-seo` and `near-trendsetter` must jointly choose the focus of the *next* batch before one is opened — checking RSS feeds and Google Trends (`content/trends-feeds.md`, plus whatever live Google Trends check `near-seo` can run at batch-scoping time), AAN indie-paper sources first, and the rest of `content/preferred-sources.md` — the same standing joint-scoping step every other piece already requires (see `near-write-article/SKILL.md` step 1), applied at batch scope rather than per-article.

### 3.1 Hard Outreach Freeze — IN FORCE

`backlink-pr`, `affiliate-pr`, and `ad-sales` may conduct market research, build media lists, map affiliate programs, and prepare pitch templates, but **no outbound contact** (email, messaging, forms) may be executed without explicit human permission.

**Campaign readiness checkpoint:** 1,000 published places, six-locale coverage and verified Search Console indexation are a point to consider launching backlink PR, not automatic permission to contact anyone. Operator feedback requests reassessing campaign timing now (P3.8). Outbound contact still requires explicit authorization.

### 3.2 Lead Capture & Security

- **Direct Advertising:** Develop `/advertise` landing page explaining placement formats and value propositions.
- **PII Protection:** Inbound commercial leads and contact submissions must route through dedicated secure backend storage (e.g., dedicated API/KV), **never** through GitHub issues.

---

## 4. Prioritized Active Backlog

### Current handoff — 2026-09-08, Codex (GPT-6)

- **Batch continuity:** `2026-09-07-batch-30` remains 8/30 published, 22 candidates pending; next **Bar Etienne (NYC)**. See P0.15. This pass repaired a published pin and the handoff; it did not start another rotation or publish a new article.
- **Monkey Thief:** actual Google Maps listing verified in the signed-out Codex in-app browser; coordinates and geocode verdict corrected. OpenStreetMap/Nominatim cannot substitute for the Maps gate. Evidence: `content/_batch-runs/2026-09-07-batch-30/monkey-thief-geocode-correction.json`.
- **Priority decision, this pass:** Product Trio + chief editor: Must fix the known verification defect and restore batch continuity; Should shorten stale handoffs; Could collect fresh source leads; Won't start n8n, new persona brains or unrelated UI work. RICE: correctness has narrow reach but high trust impact, high confidence and low effort; it precedes new articles as an obligation.
- **SEO/trendsetter:** attempted all 27 saved Trends URLs (network resolution failed; two web fallbacks also failed); no current search-demand claim. AAN directory, East Bay Express and Portland Mercury scanned; bakery pop-ups and fall arts are research leads, not a verified global trend or grounds to replace the saved batch. 48 Hills fetch failed.
- **Validation:** geocode and content checks passed; production build passed via `npm run build -- --webpack` (1,011 pages). Default Turbopack hit a local worker port restriction.
- **Carry forward:** NYC seeding is complete, rotation is London; preserve `i-look-pretty-good-dead-internet-site` and first-party collection MDX handling. Curator `livedIn` decision and prior evidence are archived. P0.4 still requires a fresh session; P1.0 still requires the operator discussion.
- **Inbox:** `near.png` remains rejected as a logo. Video inbox also contains unreviewed creative direction; see P1.24.

### P0: Immediate Fixes & Critical Correctness

1. **Operator decision point at the 1,000-place mark (section 1.0's North Star).** 1,000 places in London/NYC/SF Bay Area is a pin, not a ceiling — the operator has explicitly said so. Schedule/flag a real meeting between the operator, the chief editor, and `near-ceo` once any Tier 1 city actually reaches 1,000 to decide what comes next. Candidate options already floated to bring to that meeting (none decided yet): raise the Tier 1 target further; extend a 1,000-place-style target to Tier 3 cities too (operator, 2026-09-07 — a live idea, not yet a decision); shift focus to depth/other formats instead of more pins; hold and consolidate. Do not let the roster unilaterally decide the post-1,000 direction on its own — this is an operator call. Track which city trips this first and surface it proactively rather than waiting to be asked.
2. **NEAR rebrand — operator's stated top priority ("reach and impact here are huge").** Home page and header title become `NEAR`, not `NEAR.TIPS`; near.tips stays as the URL only. Amend the browser tab title too. Keep the "tips near me" slug pattern — e.g. pt-BR: `Dicas perto de mim | NEAR`. (this is at least partly done as the home page seems updated for this)
3. **PARSER token-efficiency review — high priority.** Have PARSER review all skills and processes, and especially their interactions, for maximum token saving.
4. **Generate portable `AGENTS.md`** documenting the full tech stack (Vercel, GitHub), exact build and deploy commands, project structure, architectural boundaries, and all MCP server configs and tool dependencies, so any MCP-compatible agent can resume maintenance with no session history. _Operator directive: run this in a completely fresh session after `/clear`._ Note the current root `AGENTS.md` is the Next.js auto-generated stub — this replaces/extends it without dropping the generated block.
5. **DONE (verified 2026-09-08, Claude Sonnet 5).** Praia da Guaiúba copy correction — already completed in a prior session; `meta.json`'s changelog confirms the closing paragraph was rewritten across all six locales so Restaurante Almeida (Santos) reads as an optional inland detour, not a waypoint on the Santos–Guarujá bike-lane/ferry route. Re-read all six `.mdx` files: current text in every locale ("off the waterfront lane," "a small detour inland," and equivalents) matches the requested fix; no further edit needed.
6. **DONE (verified 2026-09-08, Claude Sonnet 5).** Purge Harry Potter references from `gato-vadio-porto` — already completed in a prior session; `meta.json`'s changelog note (line ~85) confirms the framing was removed and replaced across all six locales. Re-grepped all locale files and `meta.json` for "harry potter"/"rowling"/"hogwarts": no live traces remain, only the historical changelog note.
7. **DONE (2026-09-08).** Desktop map ad container overflow: `app/[locale]/page.tsx` re-passes `mapPromo` to `Board` using a fixed (non-`stretch`) `mobile-banner` `HousePromo`, which was the actual fix the operator's own 2026-09-07 comment in that file had already applied by removing the slot outright rather than fixing the box. Verified in-DOM at the live sidebar width (282px): promo box renders 254×94, no horizontal or vertical overflow. `Placement.tsx` itself was untouched — `stretch`'s `h-full` was the failure mode, so the fix was to stop using `stretch` for this slot, matching the backlog's first suggested option.
8. **DONE (verified 2026-09-08, Claude Sonnet 5).** Map tooltip responsiveness — already completed in a prior session. Both `Tooltip` blocks in `components/map/WorldMap.tsx` (single-pin and cluster fallback) use `w-[min(13rem,calc(100vw-3rem))] max-w-[13rem]`, a viewport-clamped width with an in-code comment explaining the fix (a pin near an edge no longer pushes the card past the map frame). No code change needed; re-confirmed by reading the file.
9. **PageSpeed / WebMCP compliance — ARIA portion DONE (2026-09-08, Claude Sonnet 5).** `components/map/WorldMap.tsx`'s three Leaflet `divIcon` builders (`dotIcon`, `clusterIcon`, `userIcon`) rendered plain `<svg>`/`<div>`/`<span>` HTML with no accessible name — a screen reader landed on each marker with nothing to announce. Added `role="img" aria-label="…"` to each icon's HTML (place name, "`N` places clustered here", "Your location") plus an escaping helper since Leaflet injects the HTML string directly into the DOM, and set the matching `alt` prop on each `<Marker>` for the native fallback. Verified with `npx tsc --noEmit` and `npx next build` (both clean). Remaining, not done in this pass: mobile CLS (0.52) and `llms.txt` H1-markdown conformance — `llms.txt` does not exist in the codebase yet (`grep` found no route or reference), so that sub-item is actually "create it," not "verify it," and needs its own scoping pass with near-seo before implementation.
10. **Search Console zero-indexation audit:** diagnose why 630 sitemap URLs are crawled but not indexed; verify canonical and hreflang tags across all 6 locales.
11. **Automated deployment verification:** inspect Vercel production alias settings to eliminate promotion delays; enforce live curl checks in publishing workflows. **Partial finding (2026-09-08, Claude Sonnet 5):** operator report of "not seeing latest updates live" traced to the installed PWA, not the deploy pipeline — `git log` confirmed local `main` matched `origin/main`, and `curl` confirmed `/sw.js`/`/manifest.webmanifest` serve with `cache-control: public, max-age=0, must-revalidate` (no server-side staleness). Root cause: `components/layout/InstallPrompt.tsx` registered the service worker but never called `registration.update()` or reacted to `controllerchange`, so a standalone PWA window — which rarely navigates and is the only trigger browsers use to recheck `/sw.js` — could sit on a stale worker indefinitely. Fixed: force an update check on `visibilitychange`/`focus`, and reload once when a new worker actually replaces an existing controller (guarded so first install doesn't reload). Verified with `tsc --noEmit` and `next build` (both clean). Vercel-side alias/promotion-delay audit itself remains open — **blocked 2026-09-08**: the Claude Vercel MCP connector 403s on team scope `eu-7e28` ("must re-authenticate to this scope") and `list_teams`/`list_projects` return empty even after the operator disconnected and reconnected the integration twice. Not a `vercel` CLI/website login issue — that's a separate credential from this connector. Needs the operator to check the connector's team-access grant specifically (some Vercel connectors require explicitly checking the target team at connect-time) before this can be retried.
13. **DONE (2026-09-08, Claude Sonnet 5).** Geolocation loading state. `components/board/Board.tsx`'s "My location" button now swaps its label to a new `locatingLabel` i18n string ("Locating…") and sets `aria-busy` while `locating` is true, on top of the existing disabled/dimmed state — added across all six locale files. `components/collection/CollectionPlaces.tsx` has no user-facing locate button (it geolocates silently on mount with a silent catch-all fallback), so there was no control there needing loading feedback. Verified with `tsc --noEmit` and JSON-validated all six `messages/*.json` files.
14. **Type scale increase across all breakpoints.** Operator: _"fonts should be larger in all breakpoints imho"_. UX research/design consulted 2026-09-07: the current CSS has no shared type-size scale; retain Space Grotesk/Courier Prime. Proposed shared root size 17–18px, larger card excerpts, five lines on normal cards and five/six on featured cards, plus expanded map taglines. Lead UX requires checking 320/390/768/1440px and 200% zoom because root sizing also affects sidebar/ad dimensions. Implement with P1.13(a), separately from SEO descriptions.

15. **Finish `near-batch-30` run `2026-09-07-batch-30` (Must, active).** Resume the existing manifest: 8/30 published, 22 candidates pending (4 NYC, 6 SF Bay Area, 3 Berlin, 3 Amsterdam, 3 Bangkok, 3 Curitiba), next Bar Etienne. Preserve scope, per-piece evidence and all six locales. Resolve the recorded Discover defects (P2.14/P2.15b/P2.20) before counting affected pieces as fully signed off. Do not open a competing batch.

### P1: Product & UI Enhancements

0. **DECISION PENDING — pause content, do foundational work, add AI-swappability (n8n)?** Operator, 2026-09-07: _"Maybe we should pause content generation momentarily, get all the foundational work done including some AI swappability solution like n8n so we can maximize our output... be ready to generate content with Claude AND other AIs. Maybe use VS Code as well? Let's discuss before taking any action. maybe the current agents.md already answers this and I'm confused lol"_ — **Explicitly gated on a discussion with the operator; do not act on it.** Note it partly overlaps P0.4 (portable `AGENTS.md`), which is the cheap half of the same idea: `AGENTS.md` today is only the Next.js auto-generated stub, so no, it does not yet answer this. Needs the Product Trio + PARSER to frame the actual trade-off (orchestration layer vs. more skill-file discipline) before the operator decides.

1. **Map-driven card filtering:** navigating/panning the map on the home page filters the card list to the pins currently in view. (Pairs with P1.2 two-way sync.)
2. **Map pin clustering:** finalize Supercluster implementation with click-to-zoom and two-way viewport synchronization between map pins and listing cards.
3. **Card freshness & distance badges:** replace the bold "52km de distância" with a prominent neon badge (`a 52km`), and surface freshness ("a week ago", "10 months ago") prominently in the gray horizontal badge, bold all-caps. Apply to article pages too. Get the UX team to advise. Must not conflict with the existing events badge, which is good and stays prominent.
4. **Readability reference:** consolidated into P0.14 + P1.13(a); use Gumroad’s readable scale while retaining Near’s design.
5. **DONE (2026-09-08, Claude Sonnet 5).** Columns index page. New `/columns` SEO landing page (`app/[locale]/columns/page.tsx`) hubs all five standing columns (editorial, The Setlist, Ladies&Gentlethem, The Pass, The Failure Mode) in one place, each with its own dek, badge, latest-issue excerpt (title/dek/cover, pulled from the newest slug in that column's own index.json) and links to its archive + RSS feed — real unique content per BACKLOG's SEO discipline, not a bare link list. Added `CollectionPage`/`ItemList`/`PeriodicalSeries` JSON-LD (`buildColumnsIndexJsonLd` in `lib/seo/jsonld.ts`), full `buildAlternates` canonical/hreflang, a title+meta description, and `columnsIndex*` i18n strings across all six locales. Wired into `app/sitemap.ts` alongside the five existing column pages, and the header's `ColumnsMenu` dropdown now leads with a bolded "Columns" link to this new hub above the five individual links. Verified with `tsc --noEmit` and `next build` (both clean, `/columns` prerendered for all 6 locales); all six `messages/*.json` JSON-validated.
6. **Dedicated full-screen map page:** implement a `/map` route linked prominently in header navigation.
7. **Desktop article rail optimization:** use desktop right-hand whitespace on article pages for sticky map widgets and secondary house-ad units.
8. **Sticky article favorites:** persistent, accessible favorite/like control on individual article pages.
9. **Infinite scroll parity:** extend infinite scroll with load-more to collection pages, place pages, and search results.
10. **Search query logging:** privacy-safe search event logging to identify uncovered queries for the SEO pipeline.
11. **Shareable URL filters:** full query-parameter state sync plus a native "Share" button for filtered/sorted views.
12. **DONE (2026-09-08, Claude Sonnet 5).** Date display offset. `lib/content/freshness.ts`'s `formatContentDate` already pinned `timeZone: "UTC"` (prior commit `4cf44a8`), but three other date-rendering spots didn't: `components/place/PlaceHero.tsx`'s "archived" badge month/year, `components/board/PlaceCard.tsx`'s upcoming-event date badge, and `components/place/UpcomingEvents.tsx`'s event date/time — all server+client rendered without pinning the zone, so a reader in a western timezone could see a different (earlier) calendar day than the server rendered for timestamps near UTC midnight. Added `timeZone: "UTC"` to all four `toLocale*` calls across the three files, matching the established pattern. Verified with `tsc --noEmit` and `next build` (both clean).
13. **Longer snippets.** Operator directive 2026-09-07: _"could we make snippets longer too"_ — raised in the same breath as the type-scale ask (P0.14), so treat the two as one readability pass rather than separate tickets. **Clarified 2026-09-07 — operator answered BOTH**, so this is two pieces of work under one ask, and they ship separately: (a) **card teaser/excerpt truncation** in the listing and map cards — a front-end clamp change owned by the Product Trio + near-lead-ux, cheap and reversible, and it should ride along with the P0.14 type-scale pass as a single readability change rather than a second pass over the same components; (b) **SEO meta descriptions / search-result snippets** — a content-length call owned by near-seo, touching every one of six locales on every page and interacting with how Google truncates, so it needs its own scoping pass and must not be bundled into the front-end change. Do (a) with P0.14; scope (b) with near-seo before touching any locale file.

15. **Searchable geographic hierarchy:** add San Francisco Bay Area and Baixada Santista as searchable, addressable regions; retain constituent city and neighborhood pages. Define aliases, membership and coverage thresholds with the Product Trio + SEO; reuse flat location labels, not polygons. Verify regional results include the right cities without duplicate pins.
16. **DONE (2026-09-08, Claude Sonnet 5).** Header brand mark. `components/layout/Header.tsx` swapped the outline map-pin `NearMark` SVG for `public/icons/icon-maskable.png` (the approved acid-green N on black, matching `--accent: #ccff00`), 24px, decorative (`alt=""`) since the adjacent "NEAR" text already gives the link its accessible name. Removed the now-unused `NearMark.tsx` component (no other callers). Confirmed at 944px and mobile widths in-browser; `tsc --noEmit` and `next build` both clean.
17. **Locale coverage audit:** map tier destinations to current locales; evaluate `el` for Athens, `en-GB`, and other gaps with SEO + translators. Rank demand against complete catalogue/UI backfill cost before adding a locale.
18. **Agent usability audit:** AEO + Product Trio audit public content, search/filter URLs, map alternatives, navigation, accessible controls, canonical links, feeds and structured data. Record reproducible failures and prioritize repairs; the new AEO skill checklist applies to every future touched surface.

19. **Opt-in PWA notifications:** first release follows selected cities for added/refreshed places with quiet delivery; favorites updates are the second trigger, user-set radius matching follows later. Product/UX + privacy review, durable subscriptions, service-worker delivery, unsubscribe and real-device tests required. Do not start during a content-publishing run.

20. **Multi-city SEO pilot and measurement:** act on `docs/multi-city-seo-fact-check.md`: audit one existing cluster for distinct hub/venue intent, useful crawlable links and descriptive geographic titles; measure indexation and impressions via P0.10 before scaling. Evaluate a small city/query/device rank sample; record the ranking URL and date. No arbitrary 15–20/100-page thresholds, mandatory 70-character URLs, blanket schema types or speculative URL migration. Regional hierarchy is P1.15; schema review is P1.18. Original supplied posts retained in `docs/operator-seo-feedback-2026-09-07.md`.
21. **Discover Stories quality & tooling (operator, 2026-09-07):** from a shared artifact review — `discover-view` should gain a "generate Claude Code prompt" button/function so a human viewer can manually copy feedback for pasting into Claude Code, but when `discover-view` runs as an invoked skill (not via that manual button) it should skip that step and convert findings directly into backlog items itself. Separately, the operator flagged live Discover-surface defects: boring/short titles, no enticing snippet, no tags at all, and missing the expandable "see more" snippet typical Discover cards have. `near-illustrator` + `near-seo` + `discover-view` to define a Discover-specific title-length and snippet strategy (longer and more compelling without going clickbait) and confirm what actually earns Near a spot in Google Discover. Scoping only — not yet implemented.
22. **"Discover police" gate (operator, 2026-09-07):** run a Discover-focused check (`discover-view` mode) at every article write and every review pass, not just periodic audits, logging fixes to the backlog as found. Also check rendering in available AR/preview simulators (Meta and other popular ones), watching image quality, headline attractiveness, snippet quality, and markup adequacy. Wire into `near-write-article`'s gate sequence alongside `near-tov-police`/`near-seo` sign-off.
23. **Ad placement heading proximity — deferred to UX, not a fix-now bug (operator, 2026-09-08).** Investigated on `https://near.tips/pt-BR/place/praia-do-bonete-ilhabela`: the only sticky ad rail (`app/[locale]/place/[slug]/page.tsx`'s `lg:sticky lg:top-6` `HousePromo`) is desktop-only and doesn't overlap the heading in that layout; no mobile sticky ad unit exists in the codebase (no AdSense/anchor-ad script wired in yet — current inventory is house promo only). Operator clarified live: "not quite overlapping the hero, just competing with it a bit, maybe it's fine — I defer to UX team." Leave as a UX judgment call, not a bug ticket; revisit only if near-lead-ux flags it. Also still worth evaluating: fitting two smaller square ad units side by side on desktop, since there's white space to the right of the current single unit.

25. **DONE (2026-09-08, operator report).** Header nav wrapped and broke its border styling in the mobile PWA — five pills (Tips/Guides/Columns/Sources/About) at full size didn't fit a phone's width, so the last one(s) wrapped to a second line and lost the `border-l-0` collapse against the item before them, rendering as a visually cut-off/broken button. Fixed in `components/layout/Header.tsx`: nav text steps down to `text-[0.6rem]` and item padding to `px-1.5` below the `sm` breakpoint (both revert to the prior size at `sm:` and up). Verified in-DOM: all 5 items now fit on one line (32px row height, no wrap) at 360/375/390/414px; still wraps only at an unrealistic 320px.

26. **Review the video inbox creative direction:** inspect `content/video-inbox/ADDITIONAL_CREATIVE_DIRECTION_.mp4`, extract actionable operator feedback into numbered items, and retain the original until processed. Discovered during inbox inventory, 2026-09-08; contents not yet reviewed.

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
14. **Discover image compliance — root cause found, confirmed sitewide, wider than the original 17-asset estimate (`discover-view` skill QA, 2026-09-07).** `lib/seo/ogImage.ts`'s `buildOgImages` requests Next's `/_next/image` optimizer at `w=1200` but the optimizer **preserves the source's original aspect ratio** — it never crops. A real check (fetch + header-parsed dimensions, no simulation) of the first 40 active places alphabetically found **38 of 40 fail** Discover's image requirement (most on aspect ratio, not width) — this is not a 17-asset problem, it's close to a site-wide one. Two fix paths found so far:
    - **Google-Business-photo heroes** (`lh3.googleusercontent.com`): the raw URL has no size/crop suffix, so Google's CDN serves back a small, source-aspect image regardless of Next's own `w=1200` request. Google's own URL syntax supports a forced center-crop: appending `=w1200-h675-c` (not just `-h675`, which only constrains without cropping) reliably returns exactly 1200×675, 16:9. **Fixed in this pass** for the 4 affected batch-30 pieces (The Divine, The Jago, The Pilgrm, Kirbee's) — all 4 now pass. Any other place with a `lh3.googleusercontent.com` hero should get the same `-c` suffix appended.
    - **Other hosts** (Wix, editmysite, Wikimedia, and presumably most of the other 460 catalogue photos): no equivalent crop-via-URL syntax. These need either a real 16:9-cropped replacement image, or a proper image proxy in front of Next's optimizer that supports `fit=cover` to a fixed aspect (e.g. wsrv.nl, imgproxy, or a Vercel Image/Sharp step). Two batch-30 pieces (Hausu, E. Pellicci) still fail for this reason.
    Needs `near-tech-lead` to pick the proxy/cropping mechanism for the non-Google-hosted majority; needs a full-catalogue re-run of `discover-view` once that mechanism exists — this sample-of-40 number will very likely hold roughly steady across the other 428 pages.
15b. **`discover-view` rate-limits (429) against several image hosts when checked back-to-back.** Add a longer/backoff delay or a small per-host concurrency cap before trusting a "FAIL: fetch failed (429)" result as a real image problem rather than a rate-limit artifact.

15. **Legends Brighton hero and event sourcing:** near-illustrator reviews the rejected hero against https://share.google/9aPPSEXDAVqMJyf9m and venue-owned alternatives. near-events reads https://www.instagram.com/legendsbrighton/?hl=en for current dated events; verify each date and use event expiry, not dates embedded in evergreen copy.
16. **Pinheiros companion coverage:** identify the operator-recalled old-fashioned café near Largo da Batata; confirm identity before drafting. Consider useful companion coverage for the isolated Beco do Batman pin under the SEO/trendsetter exception rule.
17. **NYC residual source audit:** verify whether `aan-the-daily-catch` is misclassified as Brooklyn instead of Hudson Valley, then correct its region if confirmed. Preserve useful stopped-run leads from the archive, dedupe against the now-shipped NYC queue, and reverify before promoting. No need to repeat the completed seeding pass.

18. **Legacy factual/voice refresh after copy repair:** Hazlitt’s still contains fictional first-person hotel-work claims in its English baseline and Chinese edition; Rush Hour still promotes a 2026-09-03 event in its SEO description. Caretaker + TOV review across six locales, verify dated claims and prices, and remove embodiment. This wording-only repair did not certify all historical article facts.
19. **Formalize a unified content-rotation model (operator, 2026-09-07):** rotation should jointly account for writer/editor persona rotation, not just destination — decided each round by `near-trendsetter`, `near-seo`, `near-cmo` and the chief editor together, setting proportions per topic/editor/destination/filter. `parser` + `near-tech-lead` figure out how this integrates with the existing destination-tier rotation (§2.2). Filters need their own rotation too. Over a full rotation round, all writer personas, all filters, and all tiered destinations should get touched; each round should also publish any column post due per its stated frequency, publish at least one full guide/blog piece, and re-check `content/sources.md` for additions/removals. Depends on `near-trendsetter` and `near-cmo` having their own brain files (see P3.12). Scoping only — not yet built.

20. **DONE (2026-09-08, Claude Sonnet 5).** Correct false "Discover audit: clean" claims in batch-30's first 4 published `statusHistory` entries. Re-ran the fetch+dimension check per-piece against `content/_reports/discover-audit.json`: The Divine now genuinely passes (fixed by item 14's Google-photo `-c` crop suffix), so its original claim stands uncorrected. Hausu (Wix, 0.77:1), TOAD Bakery (editmysite.com, 2.27:1) and E. Pellicci (Wikimedia, 747px/0.56:1) still fail — appended a corrective `statusHistory` entry to each of the three `meta.json` files naming the real failure and pointing at item 14's still-open proxy/cropping fix, rather than leaving the false "clean"/"clears spec" claim standing uncorrected. All three files JSON-validated.

21. **Rewrite bot bios around focus, beat and lens (operator, 2026-09-08):** use the roster’s direct descriptions as the model for short About-page bios across six locales; remove forced personality and fictional biography while preserving AI disclosure. Coordinate with P2.7’s specific persona corrections. Captured during batch resume; do not interrupt batch production to implement.

### P3: New Skills, Personas & Infrastructure

1. **n8n / swappable content factory — OPEN QUESTION, needs a recommendation, not an implementation.** Operator asks: (1) should I work in VS Code? (2) is n8n a good idea for Near? (3) can we make the content system have more swappable parts? (4) can you connect directly to n8n via MCP? Blueprint is extracted to `docs/n8n-blueprint.md` — read it there. Answer the four questions and stop; do not build anything until the operator picks a direction.
2. **Recurring site QA agent:** scheduled cloud agent running weekly crawls of near.tips to detect broken links, layout regressions, missing images, and console errors.
3. **Persistent column scripts:** standardize launchd automation for all recurring weekly and monthly columns.
4. **"Do Not Disturb" accommodation column (weekly, NITE-PORTER).** Standing RADAR-X collaboration: Trendsetter and SEO pick destinations and flavour (RADAR-X co-signs publicly, SEO collaborates but does not); NITE-PORTER finds the hotels to feature (no duplicates), assigns a persona to write each missing hotel article, and writes the column about the collection. NITE-PORTER must write or collaborate on — and be credited in — every hotel article. Hotel article directives: always frontload unique selling points in copy and bullets, always keep information current. **Every content refresh or rotation round must attempt at least one hotel article**, always checking whether the destination still has un-covered hotels worth writing about.
6. **Specialist column additions:** scope and launch _Zero Day_ (technology), _Pri Sizada_ (budget travel), and _Ariana Granny_ (hip senior curation).
7. **Curator profile & inaugural essay:** reformat `/about/thiago` to the standard persona layout — first name only as handle, 8-bit avatar rather than a photo — publish the approved introductory post (_"hello, world!"_), and show the operator's posts and collaborations on that page.

8. **Backlink PR readiness:** backlink-pr + SEO assess whether a focused campaign is worthwhile now and prepare concrete targets/pitches for review. Treat 1,000 places as a readiness checkpoint; sending still needs explicit operator permission.
9. **Image sourcing and art direction:** near-illustrator + design review photo-first heroes, varied vector styles and a colorful/brutalist palette. near-legal-counsel evaluates a practical sourcing policy for Google Images/Photos and venue assets, with recorded provenance and usage basis; a takedown plan alone does not establish permission. Legends hero is P2.15.
10. **CUBIC-V naming proposal:** consult the CUBIC-V persona on “Neondrian” and give a recommendation before changing bylines, biography keys or indexed URLs.
11. **Give near-seo, backlink-pr and ad-sales their own running knowledge-base .md files** (operator, 2026-09-08), same pattern as `content/parser-knowledge-base.md`, `content/near-ceo-knowledge-base.md` and `content/chief-editor-knowledge-base.md`: a place for each role's own cross-session judgment calls, source/prospect notes and patterns worth remembering, separate from the per-piece logs (`content/backlink-outreach.md`, `content/ad-sales-outreach.md`, etc.) that already exist. Wire each into its own skill file's "how it works" section the same way the three existing ones were. Do not implement until picked up as its own task — this is a backlog entry, not a green light to build it now.
12. **Give every agent/persona its own markdown "brain" file (operator, 2026-09-07):** generalize the existing pattern (`content/parser-knowledge-base.md`, `content/near-ceo-knowledge-base.md`, `content/chief-editor-knowledge-base.md`, and the near-seo/backlink-pr/ad-sales ones requested in P3.11) across the full roster — starting with `near-trendsetter` and `near-cmo`, which the rotation formalization in P2.19 depends on. Not yet scoped or approved to build.
13. **`near-content-round` skill (operator, 2026-09-07):** a `near-batch-30`-style skill for one full content-rotation pass (writers + filters + destinations + due columns + at least one guide + a sources check, per P2.19), sized to complete token-efficiently within a single chat session, ideally twice per session — exact post count per pass left to `parser`'s recommendation. Sequence: `parser` first runs a deep-research pass (via `near-deep-researcher`) on content-rotation/content-ops best practices, then authors the skill for maximum efficiency and quality. Not yet started.

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
| **Pree C. Zaddam**  | Specialist   | High-taste budget curation (_planned_)                                                                        | Pragmatic spender with luxury sensibilities |
| **Ariana Granny**   | Specialist   | Active senior lifestyle & hip aging (_planned_)                                                               | Discerning elder scene-insider              |
| **thiago baraldi**  | Curator      | Human site curator (`/about/thiago`)                                                                          | 8-bit retro avatar with glasses & mustache  |

Completed work lives in `BACKLOG-ARCHIVE.md`.

**map-sidebar ad below the home page map: pulled, not fixed (2026-09-08).** Third round of this same overflow bug (P0.7 stretch/h-full fix, then a flex-row/flex-col wrapper fix that checked out clean on localhost via computed-layout inspection — no element overflowing its box — but the operator still saw it broken live). Rather than burn more tokens chasing a repro gap between localhost and live, removed the `mapPromo`/`map-sidebar` `HousePromo` call entirely from `app/[locale]/page.tsx`; `Board.tsx`'s `mapPromo` prop is optional so the slot and its wrapper `<div>` just don't render. The `board-inline` mrec promo (the other `HousePromo` usage, same page) was left alone — this note only covers `map-sidebar`. If this placement comes back: verify against the actual deployed/live URL, not just `next dev`, before calling it fixed — whatever's different between those two environments is what broke this twice.

**P1.22 addendum (operator, 2026-09-08):** Discover headlines are still boring per a `discover-view` artifact review (https://claude.ai/code/artifact/42d66fd6-2f43-478d-9103-17110d90dd49) — apply the "Discover police" gate (P1.22) to capture and log these. Operator also asked whether an AR/VR-view variant of the `discover-view` artifact (rendering the live site through an AR meta-view lens, similar to a Chrome AR-view plugin they installed) is feasible — scoping question for `discover-view` + near-tech-lead, not yet answered or built; current AR view quality was called out as poor.

**DONE (2026-09-08, Claude Sonnet 5).** Login UI showed "Sign in to [Clerk instance name]" instead of the brand. `app/[locale]/layout.tsx`'s `ClerkProvider` had no `localization` override, so Clerk's default `{{applicationName}}` interpolation pulled whatever name is set in the Clerk Dashboard rather than "Near". Added a `localization` prop hardcoding `signIn.start.title`/`titleCombined` to "Sign in to Near" and `signUp.start.title`/`titleCombined` to "Create your Near account", independent of the Dashboard's configured app name. Verified with `tsc --noEmit` and `next build` (both clean); not yet checked live in-browser against the actual modal render.

**Share-link hero thumbnail (operator, 2026-09-08):** update the Open Graph/share-link hero thumbnail shown when https://near.tips/ is shared to use the new logo (see P1.16's approved acid-green N mark). Not yet scoped — needs `lib/seo/ogImage.ts`/`near-illustrator` to confirm which template generates the home-page share image and swap the asset.



