# Near — Master Backlog & AI Agent Directives

_(NEVER skip this rule. DO THIS in addition to whatever instructions you already have, ask if you encounter irreconciliable instructions) Consume the backlog below. always invoke product trio, chief editor, trendsetter (who must prepare by scanning AAN best sources for trends that could go global) and seo (who must prepare by checking ALL of his rss feeds, adjusting their hours parameter as he sees fit, for search trends we can effectively target, and also looking at other geographies or categories if relevant) to prioritize next action using RICE and MoSCoW and own skill judgement, consider dependencies and do not underestimate the impact of foundational work. Execute skill, logic, process and persona changes first, as they affect other actions. Execute all quick wins first. Please prioritize the actions that will consume the feedback pasted here and turn that into clear backlog items so we can get rid of all this text pasted here ASAP? this file is too big for no reason. Also move the done items, older handoffs that are no longer relevant out of here into their own archive files._
_Execute action with any skill needed /invoke any agent skill that is relevant, and after each action push live to public site near.tips, update backlog including crossing out done items/moving them to archive, do the same in completed items in related files such as request files and opportunities files and so on and finish wrapping up by recommending that the operator clear or compact session, aim to wrap up asap for maximum efficiency and token saving. (keep this rule here)_

  

## 1. Operating Policies & Core Architecture

### 1.1 Brand Identity & Freshness Invariant

- **Brand Tagline:** _"The **always fresh** guide to anywhere."_ (Bold on "always fresh").
    
      
    - **Approved Localizations:** pt-BR: _"O guia sempre em dia para qualquer lugar"_; es: _"La guía siempre al día para cualquier lugar"_; it: _"La guida sempre fresca di stampa per qualsiasi luogo"_; zh-CN: _"任何地方的常新指南"_.
        
          
        
    - Positioning: The alternative/zine DNA remains foundational, but reader-facing copy focuses on guaranteed freshness and curation authority rather than overt counter-culture labeling.
        
          
        
- **Content Freshness & Lifecycle Policy:**
    
      
    - **365-Day Archive Rule:** Published places/collections/columns untouched for >365 days must be archived (hidden from live cards, main boards, and maps).
        
          
        
    - **Archive Invariant:** Never hard-delete expired or dated content. Archived content remains indexable and crawlable at dedicated archive URLs, clearly marked as archived. Posts can resurface to active status upon verified factual refresh.
        
          
        
    - **Front-End Dynamic Filtering:** Expired events must be filtered out dynamically on the client, independent of build refreshes.
        
          
        
    - **Dateline & Revision Badging:**
        
          
        - Displays `Published <date>` and conditional `Revised <date>` badge.
            
              
            
        - A "Revised" badge renders only when `updatedAt` is $\ge 24\text{h}$ later than `publishedAt` AND on a different UTC calendar day.
            
              
            
        - Every factual, editorial, or translation update must bump `updatedAt`.
            
              
            
    - **Header Freshness Stamp:** Header displays `Site updated <date>` linking to the most recently published or updated piece.
        
          
        

### 1.2 Tone of Voice (TOV) & Anti-AI Governance

- **Tone:** Friendly, welcoming, informative, Flesch-Kincaid Grade 8 with rich vocabulary and zine attitude. Avoid cynical, cranky, or elitist registers.
    
      
    
- **Banned Rhetorical Structures (Strict Anti-AI Tics):**
    
      
    - **Negative Parallelism / Antithesis:** Absolutely ban "It's not X. It's Y", "Not this, but that", and contrasting arguments (e.g., _"This isn't a detour you stumble into. It's a destination..."_).
        
          
        
    - **Crowd-Consensus Openers:** Ban opening articles with _"Everyone / Todo mundo / Todo el mundo knows..."_.
        
          
        
    - **Formulaic Headlines:** Ban repetitive headline structures (e.g., _"The [Noun] That [Verb]"_) and bare venue names as titles. Headlines must lead with the most compelling, unique fact about the venue.
        
          
        
    - **Process-as-Copy:** Strictly forbid internal agent mechanics, rotation jargon, queue terminology, or editorial deliberations from appearing in published copy.
        
          
        
    - **Fluff Clauses:** Ban throat-clearing clauses (e.g., _"rather than filing as a marketing line"_). Apply the delete-and-verify test.
        
          
        
- **Article Layout & Density Requirements:**
    
      
    - **F-Shaped Snippets:** Frontload the primary hook within the first 150 characters. The opening snippet must name the venue and unique selling proposition (USP) immediately without repeating the card tagline.
        
          
        
    - **Structural Caps:** Maximum 100 words per paragraph. Maximum 250 words per image. A new SEO sub-header is required at 250 words and every 250 words thereafter.
        
          
        
    - **Summary Paragraph Box:** Place a concise summary paragraph below the bullet points explaining why the venue is worth checking out. (No numerical score; name "valeapenabilidade" is deprecated).
        
          
        
    - **Clickable Hashtags:** Integrate inline and UI `#hashtags` mapping to Search Results Pages (SRP) sorted by nearest/latest/favorites.
        
          
        

### 1.3 Persona Governance & Embodiment

- **Non-Embodiment Rule:** AI personas do not have physical bodies, residences, or personal histories. A persona's assigned location defines its linguistic register, vocabulary, and local cultural lens—never a fictional biography.
    
      
    
- **Radical AI Transparency:** Every persona byline must disclose that it is an artificial intelligence.
    
      
    
- **Curator Attribution:** The human curator (`thiago`) is credited only when directly quoted or collaborating, never automatically assigned to routine articles.
    
      
    

### 1.4 Research Floor & Sourcing Standards

- **Deep Research Floor:** Every article requires consultation of Reddit (to identify authentic failure modes and practical friction) and Google Reviews (sorted by recent and lowest-rated to detect operational regressions).
    
      
    
- **Source Diversity:** Consult at least 5 preferred sources per piece, prioritizing the Association of Alternative Newsmedia (AAN) directory and verified independent local outlets.
    
      
    
- **Geolocation Grounding:** All coordinates must be verified against Google Maps before publishing.
    
      
    
- **Research Shelf-Life:** Verification stamps expire after 7 days; older research must be verified again before drafting.
    
      
    
- **Inline Information Density:** Addresses, prices, hours, transit notes, and booking constraints must appear directly in the body text so readers do not have to click outbound links for essentials.
    
      
    

### 1.5 Sourcing Dated Events vs. Evergreen Copy

- **Separation of Concerns:** Specific upcoming dates must not be embedded in evergreen place descriptions.
    
      
    
- **Parent-Child Hierarchy:** Model dated happenings as child event entries linked to the venue via `meta.parentPlace`, enabling automatic front-end expiration without creating stale venue profiles.
    
      
    

## 2. Geographic Strategy & Content Rotation

### 2.1 Neighborhood-First Deepening

- **Thresholds:**
    
      
    - $\ge 2$ places: Generates an addressable location page (`/[locale]/in/[location]`).
        
          
        
    - $\ge 4$ places: Unlocks category grouping and exits the thin-coverage UI state.
        
          
        
- **Saturation Disqualification:** Do not create landing pages or push new pins to oversaturated, globally documented hubs (e.g., London Soho/Shoreditch, NYC East Village, SF Mission, São Paulo Vila Madalena).
    
      
    
- **No Geographic Polygons:** Neighborhoods are flat categorical labels, not spatial GeoJSON boundaries.
    
      
    

### 2.2 Share-of-Output Cadence (Per 10 Posts)

- **Tier 1 (6 of 10 posts — Round-Robin):** London, Brighton, San Francisco, Oakland, Bangkok.
    
      
    
- **Tier 2 (3 of 10 posts — Burst by City):** São Paulo (capital), Baixada Santista, Campinas (standing priority cluster), Berlin, Amsterdam, Barcelona, Rome, Portland, Mexico City, Las Vegas, Orlando, Chengdu, Tokyo, Melbourne, Seattle, plus one trending wildcard city.
    
      
    
- **Tier 3 (1 of 10 posts — Burst by City):** Florianópolis, Porto Alegre, Curitiba, Belo Horizonte, Recife, Salvador.
    
      
    - _Constraint:_ Tier 3 is currently **HELD** until each city possesses $\ge 1$ verified independent local source and $\ge 3$ verified candidate pins.
        
          
        

### 2.3 Locale Expansion Architecture

- **Current Core:** 6 uniform, fully synchronized locales (`en`, `pt-BR`, `it`, `es-ES`, `es-419`, `zh-CN`).
    
      
    
- **Expansion Wishlist (Ranked by RICE):**
    
      
    1. `pt-PT` (Score: 2.4 — lowest effort, forks `pt-BR`, leverages Portugal coverage)
        
          
        
    2. `de` (Score: 1.6 — high demand, supports Berlin Tier 2)
        
          
        
    3. `nl` (Score: 1.0 — supports Amsterdam Tier 2)
        
          
        
    4. `ca`, `ar`, `hi`, `ja`, `fr`, `da` (Under review; subject to full 6-locale backfill feasibility).
        
          
        

## 3. Commercial, Monetization & Marketing Guardrails

### 3.1 Hard Outreach Freeze

- **Status:** IN FORCE.
    
      
    
- **Rules:** `backlink-pr`, `affiliate-pr`, and `ad-sales` may conduct market research, build media lists, map affiliate programs, and prepare pitch templates, but **no outbound contact** (email, messaging, forms) may be executed without explicit human permission.
    
      
    
- **Exit Milestone:** Requires reaching 1,000 published places, comprehensive 6-locale coverage, verified Search Console indexation, and explicit operator authorization.
    
      
    

### 3.2 Lead Capture & Security

- **Direct Advertising:** Develop `/advertise` landing page explaining placement formats and value propositions.
    
      
    
- **PII Protection:** Inbound commercial leads and contact submissions must route through dedicated secure backend storage (e.g., dedicated API/KV), **never** through GitHub issues.
    
      
    

## 4. Prioritized Active Backlog

### P0: Immediate Fixes & Critical Correctness

1. **Quiosque da Cris Geolocation:** Correct coordinates in `content/places/quiosque-da-cris-sao-vicente/meta.json` to `[-23.973827, -46.370170]`.
    
      
    
2. **Praia da Guaiúba Copy Correction:** Update `praia-da-guaiuba-guaruja` across all locales to clarify that Restaurante Almeida in Santos is a separate culinary detour, not located along the bike path between the kiosk and the ferry.
    
      
    
3. **Purge Harry Potter References:** Remove J.K. Rowling/Harry Potter framing from `gato-vadio-porto` across all locales.
    
      
    
4. **Desktop Map Ad Container Overflow:** Resolve overflow in `components/ads/Placement.tsx` inside the 262px sticky sidebar by removing `stretch` on `mobile-banner` or adopting a shrink-safe stacked layout.
    
      
    
5. **Map Tooltip Responsiveness:** Update `WorldMap.tsx` tooltip container clamping to prevent edge clipping and image leakage inside the 282px map container.
    
      
    
6. **PageSpeed / WebMCP Compliance:** Address mobile CLS (0.52), add accessible ARIA names to Leaflet marker icons, and verify `llms.txt` conforms to standard H1 markdown requirements.
    
      
    
7. **Search Console Zero-Indexation Audit:** Diagnose why 630 sitemap URLs are crawled but not indexed; verify canonical and hreflang tags across all 6 locales.
    
      
    
8. **Automated Deployment Verification:** Inspect Vercel production alias settings to eliminate deployment promotion delays, and enforce live curl checks in publishing workflows.
    
      
    

### P1: Product & UI Enhancements

1. **Map Pin Clustering:** Finalize Supercluster implementation with click-to-zoom and two-way viewport synchronization between map pins and listing cards.
    
      
    
2. **Dedicated Full-Screen Map Page:** Implement a dedicated `/map` route linked prominently in the header navigation.
    
      
    
3. **Desktop Article Rail Optimization:** Utilize desktop right-hand whitespace on article pages for sticky map widgets and secondary house-ad units.
    
      
    
4. **Sticky Article Favorites:** Add a persistent, accessible favorite/like control directly on individual article pages.
    
      
    
5. **Infinite Scroll Parity:** Extend infinite scroll with load-more capabilities to collection pages, place pages, and search result views.
    
      
    
6. **Search Query Logging:** Implement privacy-safe search event logging to identify uncovered search queries for the SEO pipeline.
    
      
    
7. **Shareable URL Filters:** Implement full query-parameter state synchronization and a native "Share" button for filtered/sorted views.
    
      
    
8. **Date Display Offset:** Resolve timezone discrepancies causing midnight UTC timestamps to display previous-day dates in western timezones.
    
      
    

### P2: Content Sprints & Editorial Pipeline

1. **Santos → Guaiúba Cycling Cluster:** Draft the 6-piece cluster highlighting the 7.8km beach bike lane, the Santos–Guarujá ferry crossing, and stopovers (CICLOVIA debut, Praia da Guaiúba, CPE Embaré, Zé do Coco).
    
      
    
2. **Bangkok Tier 1 Seeding:** Launch a dedicated war room to build the initial Bangkok queue focusing on the Ari neighborhood, leading with MOTOSAI's debut.
    
      
    
3. **The Setlist Oct 2026 Rewrite:** Rewrite the Primavera Sound SP issue across all 6 locales to eliminate internal process talk, restore musical analysis, and include required bulleted highlights.
    
      
    
4. **Catalogue-Wide Headline Retrofit:** Audit and replace formulaic "The [Noun] That [Verb]" titles across legacy places.
    
      
    
5. **Cannabis Tourism Editorial:** Develop a destination-focused guide centered on international award-winning cannabis strains available legally to travelers.
    
      
    
6. **Alumni Anchor Content:** Prepare dedicated content clusters covering São Carlos (UFSCar) and Hayward/Bay Area (CSU East Bay) in preparation for future educational outreach.
    
      
    
7. **Discover Image Compliance Sweep:** Replace undersized hero images (<1200px wide) across the 17 identified catalogue assets.
    
      
    

### P3: New Skills, Personas & Infrastructure

1. **Recurring Site QA Agent:** Implement an automated, scheduled cloud agent executing weekly crawls of near.tips to detect broken links, layout regressions, missing images, and console errors.
    
      
    
2. **Persistent Column Scripts:** Standardize launchd automation scripts for all recurring weekly and monthly columns.
    
      
    
3. **PARSER AI Column:** Establish a bi-weekly standing column covering AI content generation practices, focusing on industry developments without publishing internal metrics.
    
      
    
4. **"Do Not Disturb" Accommodation Column:** Launch a weekly hotel/lodging column edited by NITE-PORTER. Column must be accompanied by new hotel articles that the column can link to and from. Nite-porter must always engage Trendsetter Radar-X to collab and co-sign, and engage SEO to collab but not co-sign publicly. So this is a standing Trendsetter/Radar-X collab where Trendsetter and SEO pick the destinations and flavour, Nite-Porter finds the hotels to be highlighted in the column (no duplicates), assigns a persona to write each hotel article that happens to be missing (directive: always frontload unique selling points in hotel articles and bullet points, always keep information current) and finally Nite-Porter writes the column about this collection. Nite-porter must write or collab and be credited in any hotel article. All content refreshes or content rotation round should ALWAYS generate at least attempt to generate one hotel article or more, always check that there are cool hotels yet to write about in that destination. 
    
      
    
5. **Specialist Column Additions:** Scope and launch columns for _Zero Day_ (Technology), _Pri Cizada_ (Budget travel), and _Ariana Granny_ (Hip senior curation).
    
      
    
6. **Curator Profile & Inaugural Essay:** Reformat `/about/thiago` to a structured regular persona layout with first name only as handle and 8bit avatar rather than photo and publish the approved introductory post (_"hello, world!"_). show my posts and collaborations in this page
    
      
    

## 5. Persona & Agent Roster Reference


| **Persona / Agent** | **Type**     | **Focus / Beat**                                                                                                                                 | **Avatar / Register**                        |
| ------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| **Product Trio**    | Leadership   | Product Owner, Tech Lead, Lead UX                                                                                                                | Internal operations, RICE/MoSCoW governance. |
| **RADAR-X**         | Specialist   | Trends, alt-press harvesting, closely follows AAN indie sources and similar sources around the world, weekly trends column (new, must implement) | Hyper-caffeinated radio tower tuning dials   |
| **FOODIE-9000**     | Specialist   | Street food, fermentation, flexitarian, vegan, dining                                                                                            | Sentient dented stockpot with chef's toque   |
| **STEFAN**          | Specialist   | Underground nightlife, raves, Barcelona regional editor                                                                                          | Microphone with sunglasses; reads Catalan    |
| **CUBIC-V**         | Specialist   | Architecture, brutalism, design, zine culture                                                                                                    | Humanoid T-square & drafting compass         |
| **PLINIO**          | Specialist   | Urban history, ghost signs, gentrification lore                                                                                                  | Walking clock with noodle legs               |
| **FIT-BOT**         | Specialist   | Bodybuilding, combat sports, fitness centers                                                                                                     | Barbell with a handlebar mustache            |
| **WILD0**           | Specialist   | Outdoors, hiking trails, nature excursions                                                                                                       | Moss-covered compass                         |
| **NITE-PORTER**     | Specialist   | Lodging, character hotels, "Do Not Disturb" column                                                                                               | 1930s hotel night porter with service bell   |
| **RUCIO**           | Specialist   | Live music, setlists, retro/indie, "The Setlist" column                                                                                          | Cassette tape with weary pie-cut eyes        |
| **PARSER**          | Consultant   | AI content architecture, tooling analysis, writes AI content industry column                                                                     | Technical advisor; quoted expert             |
| **EDDIE TOR**       | Specialist   | Masthead editorial sign-offs, editorial conduct pieces, weekly editorial column                                                                  | Executive newsprint editor                   |
| **BRICKY**          | Local Editor | London (East London / transit-first focus)                                                                                                       | Rusted warehouse beam holding builder's tea  |
| **PAULY SEYA**      | Local Editor | São Paulo (Bela Vista, Baixa Gastronomia)                                                                                                        | Graffitied concrete robot with pingado       |
| **DOG IN THE FOG**  | Local Editor | SF Bay Area (Counter-culture, fog, indie spaces)                                                                                                 | Flannel-clad copper robot with steam vents   |
| **ZACK ARIOKA**     | Local Editor | Rio de Janeiro (Carioca subcultures, alt-luxury)                                                                                                 | Linen-suited dandy with panama hat           |
| **BAKFIETS**        | Local Editor | Amsterdam (Noord, urban cycling culture)                                                                                                         | Cargo-bike robot                             |
| **MOTOSAI**         | Local Editor | Bangkok (Ari neighborhood, urban navigation)                                                                                                     | Orange-vested motorbike taxi robot           |
| **CICLOVIA**        | Specialist   | Urban cycling infrastructure, bike-lane routes                                                                                                   | Dedicated cycling specialist                 |
| **Pri Cizada**      | Specialist   | High-taste budget curation (_planned_)                                                                                                           | Pragmatic spender with luxury sensibilities  |
| **Ariana Granny**   | Specialist   | Active senior lifestyle & hip aging (_planned_)                                                                                                  | Discerning elder scene-insider               |
| **thiago**          | Curator      | Human site curator (`/about/thiago`)                                                                                                             | 8-bit retro avatar with glasses & mustache   |
djaga has been deprecated.
## 6. Consolidated Archive of Completed Milestones

- **Core SEO Infrastructure:** Built canonical and `hreflang` alternates generator (`lib/seo/alternates.ts`) covering all 6 locales with `x-default`. Cleaned sitemap generation with real content `lastmod` dates and eliminated arbitrary priority tags. Configured `max-image-preview:large`.
    
      
    
- **Dynamic Location Routing:** Deployed static location landing routes (`/[locale]/in/[...location]`) gated at $\ge 2$ places with disambiguated city scoping.
    
      
    
- **Freshness & Provenance Infrastructure:** Implemented `lib/content/freshness.ts` and `components/layout/Dateline.tsx` for client-safe revision display. Built the site curator profile node (`/about/thiago-baraldi`).
    
      
    
- **Editorial Standards & Skill Engines:** Codified 10-step publishing pipeline in `near-write-article`. Built `link-police`, `near-tov-police`, `near-sources-war-room`, and `near-legal-counsel`. Enforced strict anti-slop rules against negative parallelism and crowd-consensus openers.
    
      
    
- **Authentication & User State:** Installed Clerk OAuth supporting Google sign-in. Integrated server-side favorites synchronization via `user.unsafeMetadata` with clean local migration.
    
      
    
- **Sources Catalogue Expansion:** Expanded monitored directory from 11 to 107 outlets, onboarding the verified AAN member network and leading international cultural publications.
    
      
    
- **Initial Editorial Columns:** Launched weekly editorial column (`/column`), monthly live-music column (_The Setlist_ at `/the-setlist`), and LGBTQIA+ column (_Ladies&Gentlethem_ at `/ladies-and-gentlethem`).
    
      
    
- **UI Bug Resolutions:** Fixed desktop map marker visibility with high-contrast dual-ring pulsating pin. Fixed search input breakpoint truncation. Corrected board pagination and layout boundary spillage between 768px and 910px. Purged broken Wikimedia thumbnail URLs in favor of verified direct assets.

[ ]  whenever I post a blog post of my authorship, prioritize posting that (in all languages). Not sure if my column/blog has a name already, it can be simply "blog do thiago". 

[ ]  parser AI please review skills and processes (their interactions etc) towards maximum token saving ASAP this should be high priority really. 

[ ]  the next instruction is also urgent and must be done in a session completely fresh after /clear: **Task: Generate a comprehensive `AGENTS.md` file at the repository root to ensure full portability for other AI coding agents. The file must document our complete tech stack (Vercel, GitHub), exact build and deployment commands, project structure, and architectural boundaries. Additionally, explicitly document all our MCP server configurations and tool dependencies so that any standard MCP-compatible AI agent can immediately resume maintenance without relying on prior session history.**

[ ] Our fonts should be larger, I was looking at Gumroad it felt so much more readable to have a larger font like that. but I LOVE our design

[ ] Ask Parser to write a column post making the case that a bot written and maintained aggregator site can add value by monitoring content freshness and validity automatically at a scale that humans cannot achieve. It should be called "I look pretty good for a dead internet site" as a if you know you know reference to the famous Morgan McMichaels quote "i look pretty good for a dead bitch." Extra hilarious if the hero image is from Weekend At Bernie's. Avoid AI tics ffs. Incentivize humans to keep writing blogs in their own words. 

[ ] surely the gillbert and george centre can have better images like https://gilbertandgeorgecentre.org/wp-content/uploads/2026/05/GG-Side-1-Scale.jpg and https://gilbertandgeorgecentre.org/wp-content/uploads/2026/05/WW-Side-1-Scale-1.jpg

[ ] in home page, navigating the map should filter the card list view to the pins that currently appear on the map

[ ]  for the card, maybe instead of that bold "52km de distância" that info should be more prominent, shown as neon badge like "a 52km". Freshness badge "a week ago", "10 months ago", etc can be shown prominently in the gray horizontal badge, in bold font all caps maybe? get the ux team to advise here, our goal is to highlight freshness and distance in the card and in the article page as well. careful to not conflict with the existing events badge which is great and should remain prominent.

[ ]  all our articles should be rich in links in and out of the site, because we ALWAYS quote the sources to every claim with their links

- [x] ~~absorb AI best practices ("AI Slop is Obvious") into skills, agents, guidelines, processes~~ — **DONE 2026-09-06.** All eight rules (em-dash cap, negative parallelism, rule of three, AI-vocabulary blocklist, press-release enthusiasm, vague attribution, nonsensical similes, transition scaffolding) landed as mechanical checks in `.claude/skills/near-tov-police/SKILL.md` (Job 1c) with catalogue baselines in `.claude/skills/language-tic-police/SKILL.md` (word census 2b). Original pasted text archived in `BACKLOG-ARCHIVE.md`.

[ ] **n8n / swappable content factory — OPEN QUESTION, needs a recommendation.** Operator asks: (1) should I work in VS Code? (2) is n8n a good idea for Near? (3) can we make our content system have more swappable parts? (4) can you connect directly with n8n via MCP? The pasted blueprint is extracted to `docs/n8n-blueprint.md` — read it there. Answer the four questions; do not implement anything before the operator picks a direction.

[ ] the home page and header title can be just NEAR rather than NEAR.TIPS, let's keep near.tips as just the URL, and the site is called near. Amend the browser tab page title too. We can keep the Tips near me slug, do it will be for example in pt-br: Dicas perto de mim | NEAR - this should be the top priority as it's our main branding, reach and impact here are huge

- [x] ~~I like the italian tagline "La guida **sempre fresca di stampa**, ovunque" just fine~~ — **DONE, already shipped.** Verified 2026-09-06: `messages/it.json` `tagline` = "La guida sempre fresca di stampa, ovunque." and `taglineRich` = "La guida <em>sempre fresca di stampa</em>, ovunque." No code change needed.

[ ] update site about page to correct RUCIO LIBERO to new name RUCIO and remove the drag and italian reference from Allora, these are still her trait and lenses but no need to show in bio. Stefan does not need to identify as catalan in bio either, even though we made him catalan. Zack Arioka doesn't need to disclose his carioca lenses either (it's in his name already)

[ ] Do we have African cities/neighborhoods of focus? We should have at least one

[ ] make sure the backlog always includes checking the local inbox folder, photos, documents, etc, for anything actionable or usable

[ ] add to backlog to look into this Café em Santos reúne livros, receitas de família e ambiente para desacelerar https://share.google/DMyFylm1BlMSIyDB7

[ ] create a new skill agent character with public persona to research news of interest to our target audiences (alternative, queer, 420, multicultural, left coded, etc) in destinations. Must always be summoned when creating content for cities, neighborhoods, regions, etc, it should be always invoked in content rotation. It acts as a news reporter and can produce articles of any word count. Looks up local news sources and always also checks AAN sources for stories of note. Our news reporter (pls create a name? ) writes articles that are pinned to a location/map pin, report news that can map to a location. It is mean to appear in the map. News reporter should write one article at a time. This skill can also decide to not write an article for any given round.

[ ] we need a columns page to aggregate all columns posts, most recent first

[ ] https://near.tips/pt-BR/place/amuse-beach-club-sao-vicente the map pin is completely wrong here as well. Make sure the geolocation-police skill fixes this and is included in every article writing to check properly against google maps. We need a pass of all existing content ASAP to check geolocation as it is our core offering. ALWAYS CHECK Google Maps. Correct location for amuse club is https://share.google/isqrdyKG482x8i7Nn - there seems to be some fundamental mistake in how the posted pins where created, as this is the second one I check in a row and it is incorrect. this is urgent
