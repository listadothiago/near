# Near — Backlog

Working backlog of everything requested but not yet done. Check items off
(`- [x]`) as they're completed; don't delete finished items, just tick
them, so this stays a real record. Organized by category, not strict
chronological order. Agreed sequencing (see "Sequencing" below) still
governs what actually gets worked next — this file is the *scope*, not
the *order*.

## Where things stand (updated 2026-08-28)

**Content priority changed 2026-08-28**: the operator redirected the push
to **Baixada Santista (where they live) and São Paulo (nearby)**, ahead of
the other focus cities. A New York/*The Warriors* war room was scoped and
researched first, then parked — its verified research is preserved inline
under that war-room entry below so it can be resumed without redoing it.

First result of that redirect: an audit found all 7 `status: draft` places
were held back solely by the missing-hero-image quality gate, and all 7
were São Paulo/Santos. Hero images were resolved from each place's own
source article, so the live board went from 9 to **16 active places** —
including the first Santos coverage to actually appear on the map. See
`content/_ingestion-log.md` for the per-place detail.

Everything is committed and pushed to `origin/main`, which Vercel
auto-deploys to https://near.tips — there is no manual deploy step.

Working state: clean tree, `npx tsc --noEmit` passes, `npm run build`
passes (121 pages). 16 places indexed and **all 16 now `status: active`**
(no drafts remain), 10 sources watched, all published places carry full
6-locale coverage. **0 collections exist** — see "Blog view" below.

### Next session: start here

1. **Write the first collection.** Everything needed to view one is now
   built and shipped; there is simply no post to read. Best-supported by
   pins that already exist: an **Asian food in São Paulo** piece tying
   together `rong-he-sao-paulo` (hand-pulled noodles, Liberdade),
   `thai-e-san-sao-paulo` (Liberdade) and `djapa-sao-paulo` (Moema) — all
   three published this session. Rong He's noodle photograph is the
   obvious cover image. Shipping `en` only is fine to start:
   `resolveLocaleContent` falls back to English with a
   "translation pending" note, per `full-locale-coverage`.
2. **Finish the pin → post backlink.** `getCollectionsForPlace()` exists in
   `lib/content/collectionsLoader.ts` and is fully working but has **no
   caller** — place pages never show which guides mention them, so the
   cross-linking is one-directional. A "Featured in" section on
   `app/[locale]/place/[slug]/page.tsx` closes it; the
   `collection.featuredIn` UI string is already translated in all six
   `messages/*.json`. Left undone this session only for lack of budget.
3. **Continue the mobile audit** on place/collection/`/guides`/`/sources`
   pages — only the home page was actually done.

**Standing instruction from the operator: keep this file up to date** as
work happens — it's the handoff document between sessions.

The single highest-value next move is **content for the focus cities**
(see Sequencing below) — the app itself is in good shape; what it lacks
is depth of coverage.

## Sequencing (explicit, operator-confirmed)

1. **Content first** — beef up destination/place coverage. Originally
   scoped as breadth-across-markets; refined 2026-08-28 into a set of
   **focus cities to flesh out with real depth first**: London, Rome,
   San Francisco Bay Area, São Paulo, Baixada Santista, Rio de Janeiro,
   Barcelona, New York, Miami, Chengdu, Seattle, Portland, Medellín,
   Lisbon, Porto, Amsterdam — see the "Focus cities" section at the top
   of `content/preferred-destinations.md` for the authoritative list.
   Only once these are genuinely fleshed out does the plan move to step 2.
2. **Google Analytics 4** setup for near.tips.
3. **Google Search Console** submission.
4. **User accounts** (Google login) + the full social/UGC feature set
   (favorites, collections, comments, ratings, follows, paid pin
   creation, admin area).

Radio-station feature was proposed then explicitly withdrawn by the
operator ("radio is a bad idea, abort radio requirements") — **do not
build it**, kept here only as a record it was considered and dropped.

## ⚠️ Failed background runs — need retry

Both hit the session token limit mid-run and did not finish or commit:

- [x] **Locale backfill** — the failed agent had actually finished 5 of
  7 places before dying (`beco-do-batman-sao-paulo`,
  `borough-market-london`, `boxpark-shoreditch-london`,
  `dollywood-pigeon-forge`, `lx-factory-lisbon` all landed). Finished the
  remaining 2 (`old-truman-brewery-london`, `time-out-market-lisboa` —
  es-ES/es-419/zh-CN) directly. Also found and fixed real bugs from the
  agent's earlier output: a YAML-breaking unescaped quote in
  `bar-skula-oakland/zh-CN.mdx`, and 9 taglines over the 90-char schema
  limit across `borough-market-london`, `boxpark-shoreditch-london`,
  `dollywood-pigeon-forge`, and `lx-factory-lisbon`'s es-ES/es-419/it
  files. Full audit now confirms zero locale gaps on any active+auto
  place; `npm run build` passes clean (121 pages). Not committed to git
  yet — still pending along with the rest of this session's work.
- [ ] **Breadth-first content refresh** (was opening 2-3 new destinations
  across different regions beyond São Paulo/London/SF) — re-check
  `content/_ingestion-log.md` and `git log` before retrying to see what
  (if anything) landed before it died.

## New locale

- [ ] Add `en-GB` (British English) as a supported locale — UK flag icon
  in the locale switcher. Needs: added to `lib/i18n/routing.ts`'s
  `locales` array and `lib/content/schema.ts`'s `LOCALES`, a
  `messages/en-GB.json` UI-string file, a `references/locales/en-GB.md`
  persona for `near-translator` (distinct register from plain `en` —
  British spelling/vocabulary, London/UK-specific framing where it
  matters), and a full backfill pass across every existing place/
  collection once the locale exists (same shape of work as the pt-BR/it/
  es-ES/es-419/zh-CN backfill already done/in progress).

## Known bugs

- [x] ~~Console error on locale switch~~ — **investigated 2026-08-28:
  dev-only, does not affect production.** Verified by reproducing the
  exact path (locale switch to Italian) on both localhost and
  https://near.tips: the warning fires only against the React dev
  build; the production console is completely clean, on load and on
  locale switch. Tried `next/script` with `strategy="beforeInteractive"`
  as a fix — it does *not* silence the dev warning (React still walks
  the script tag during client navigation), so that change was reverted
  rather than kept as complexity that buys nothing. The real fix, if it
  ever becomes worth doing, is architectural: hoist `<html>`/`<head>` +
  ThemeScript into a true root `app/layout.tsx` that doesn't re-render
  on locale navigation, leaving `app/[locale]/layout.tsx` as a
  passthrough. Not worth it for a dev-only console message — revisit
  only if it starts masking real errors during debugging.
- [x] The es-419 locale switcher icon used a globe — now the Mexican
  flag (done 2026-08-28).

## UI/UX

- [x] Mobile: header locale/theme controls stack vertically on mobile/
  tablet (done). Filter chips still need their own mobile treatment —
  see the next item, not yet done.
- [x] Mobile: collapse category/tag filters under a filter menu/button so
  the map and listings sit more above the fold (done — commit `857fe77`).
- [ ] **Mobile pass, broader** (2026-08-28, operator: "really slick web
  app that's immediately understandable and usable... right now it's
  kind of ugly and cluttered on mobile... desktop looks better,
  haven't tested tablet"). Broader than the filter-collapse item above
  — a real audit of every page at mobile viewport width, not just the
  filter row. In progress. Landed so far (2026-08-28, home page):
  - [x] Tagline: dash prefix dropped, smaller on mobile
    (`0.76rem`/`0.92rem`). Was briefly truncated to force it onto one
    line; the operator then relaxed that ("the tagline doesnt have to be
    in same line as title anymore"), so it now wraps in full instead of
    ellipsizing.
  - [x] Filters button now shares the search field's row — `SearchBox`
    went from `w-full` to `flex-1 min-w-0` so the button no longer wraps.
  - [x] Locale switcher, theme toggle, and the places-indexed/sources-
    watched/last-sync line all moved out of `Header` and into `Footer`
    (which now takes the `stats` prop `Header` used to). `LocaleSwitcher`
    gained a `dropUp` prop so its menu opens upward from the footer.
  - [x] Map is a disclosure below `md`, collapsed by default; always open
    from `md` up, where it has its own grid column. Resolved via
    `matchMedia` after mount rather than CSS-hidden, so Leaflet is never
    loaded on a phone until the map is actually opened.
  - Still to audit at mobile width: place pages, collection pages,
    `/guides`, `/sources`.
- [x] Nearest/Latest listing rows now show a hero-image thumbnail
  (done 2026-08-28). `PlaceRow` is shared, so the "Nearby on near.tips"
  section on every place page got thumbnails from the same change.
  Falls back to a muted category-colored block when a place has no hero
  image. Future Follows tab will inherit this automatically.
- [x] Rename "Use my location" to "My location"; clicking it now
  zooms/centers the map to the user's immediate neighborhood around
  their geolocation (zoom 14), and the app proactively requests
  geolocation on load instead of requiring a click first (done
  2026-08-28).
- [x] Refined 2026-08-28: a neighborhood-level view centered on the user
  is useless when it cuts the closest pin out of frame (the operator's
  own location in the Baixada Santista has its nearest pin ~57km away in
  São Paulo). On load and on "My location", the map now fits bounds over
  the user *plus* the nearest pin(s) — everything within 15% of the
  closest pin's distance, so a cluster on one block all stays in frame —
  capped at zoom 14 so a pin 50m away doesn't zoom to street level.
- [ ] Move the search box up onto the title/tagline line; make
  search + locale switcher + theme toggle sticky at the top of the
  viewport — including on pin detail pages.
- [ ] Map should support drag/pan; the listings panel should update to
  reflect the current map viewport/selection (real-estate-site style
  "search this area").
- [ ] Admin/curators should be able to create a new pin page directly
  from the map (click-to-create UX).
- [x] **Blog view for blog posts** (2026-08-28, operator: "blog posts
  are associated with multiple place and event pins in the map
  potentially, but they are not a pin in themselves. We need some way to
  view the blog view of blog posts"). The routes already existed
  (`/[locale]/guides` index + `/[locale]/collection/[slug]` detail) but
  were reachable only from a small footer link, and `/guides` rendered as
  a bare heading over an empty grid. Added:
  - `components/collection/CollectionCards.tsx` — the card grid, now
    shared so a post looks identical wherever it's surfaced.
  - `components/collection/GuidesStrip.tsx` — a "Guides" section on the
    home page under the board, showing up to 3 posts with a "See all"
    link. Renders `null` while no collections exist, so it stays
    invisible until there's something to read.
  - An empty state on `/guides` instead of a blank grid.
  - New `collection.seeAll` / `collection.empty` / `collection.featuredIn`
    strings across all six locales.
  Still open from this same request: the pin → post backlink (see "Next
  session: start here" at the top of this file), and writing an actual
  post.
- [x] Title format is now `Dicas perto de mim | near.tips` — the localized
  wordmark leads, the domain trails (was `near.tips | <wordmark>`).
  Sub-pages use the `%s | near.tips` template.
- [ ] **Event ↔ venue linking** (2026-08-28): every event pin
  conceptually belongs to a location/venue (confirmed with operator).
  A venue's own place page should list upcoming events happening there
  (e.g. teatro-clube-da-eskyna-santos should show Cabaret Latino as an
  upcoming event). An event's page should link back to its venue's page
  — currently only done informally via a `<NearLink>` in the body copy
  (see cabaret-latino-teatro-eskyna-santos), not a structured
  relationship. Event pages already get "Nearby on near.tips" for free
  (they're regular places using the same PlacePage component/
  RelatedPlaces logic) — that part needs no new work. What's actually
  missing: a structured venue-relationship field (e.g. an optional
  `venueSlug` on `placeMetaSchema`) plus a "Upcoming events here"
  section component on the venue's own page.

## New skills to build

- [x] **near-blogger** — the "hipster writer" persona (Village Voice / NME
  / SF Gate / Le Cool register; Brazilian equivalents Lúcio Ribeiro,
  Érika Palomino as tonal references). Funny, fierce, harsh-but-fair,
  joyful when pleased. Deep-research capable for history/context/travel/
  economy/safety, but also finds genuinely current media-mentioned and
  word-of-mouth-legend spots. Writes blog posts that map to multiple
  pins — every mentioned pin gets linked, and pins cross-link to each
  other where relevant. Works together with near-editor on joint posts.
  Built on top of the existing `collections` content type.
- [x] **near-deep-researcher** — deep web + training-data research,
  available to every other persona/skill. Can also generate a
  copy-paste-ready prompt for the operator to run manually in Gemini
  Deep Research, for the operator to paste the result back in.
- [x] **near-adiciona** ("near-add") — given a place/link, always creates
  the relevant pin(s), and proactively proposes (and creates, when
  clearly warranted) associated blog posts/collections; flexes out full
  content via near-editor; translates/localizes via every
  near-translator persona. Built as a thin orchestration wrapper around
  near-editor's existing ad-hoc entry point rather than a competing
  pipeline.
- [x] **near-war-room** — orchestrator that invokes the full roster
  (near-blogger, near-editor, every near-translator locale, near-editor-
  stefon, near-editor-gastronomic, plus the new specialist advisors
  below, near-seo, near-deep-researcher) to produce a real content push
  on a topic/destination: itineraries, guides, "best of" selections,
  routes, blog posts, collections, and pins together. This is the
  mechanism for working through the huge "war room" list below.
- [x] New specialist advisor lenses (same pattern as
  near-editor-gastronomic / near-editor-stefon):
  - [x] near-editor-wellness
  - [x] near-editor-historian
  - [x] near-editor-art
  - [x] near-editor-sports (sports/activities-to-do, not spectating)
  - [x] near-editor-outdoors
  - [x] near-editor-party
  - [x] near-editor-luxury
  - [x] near-editor-shopping
- [x] **near-seo** — dedicated SEO specialist skill, invoked by
  near-war-room (distinct from the shared `llm-seo.md` reference every
  editor/translator persona already follows — scoped as active
  opportunity-research + a QA pass, not a duplicate of the reference doc).
- [x] UX skills: **near-ux-researcher**, **near-ux-designer**.
- [x] **near-illustrator** — generates/sources images for blog posts
  (e.g. one illustration per section of a multi-section post). Should
  have a repertoire of distinct visual styles/design systems, stay
  internally consistent once a style is picked for a piece, but draw on
  a wide range of references. Explicitly does not touch place hero
  images (no-AI-fallback rule stays intact).

All 16 skills above are built (`.claude/skills/`), registered, and
frontmatter-validated as of 2026-08-28. **Not yet done: actually running
them** — no war rooms, blog posts, or new specialist-lens-authored pins
have been produced yet. That's the next phase of work, not part of this
checkbox.

## Cross-cutting skill policies to add (apply to every content skill)

- [x] **Dedupe discipline everywhere**: promoted into `content/rules.md`
  as the `dedupe-everywhere` rule — extends the existing `dedupe-by-place`
  rule to collections and source entries, not just places.
- [x] **Source enrichment everywhere**: promoted into `content/rules.md`
  as the `source-enrichment` rule.
- [x] **Human-content preservation rule**: promoted into
  `content/rules.md` as the `human-content-preservation` rule — documented
  now, ahead of the actual UGC feature, so it's already in place once
  human-authored pins exist.

## Individual places to add

- [ ] Chou Noodle Bar — mention it's worth the road trip if not already
  in Itu. Source: https://share.google/jFDY7tehdKrZ7F0Hx
- [ ] Balcão — excellent falafel. Source:
  https://share.google/sWrDLaXlUakzTYgMS
- [ ] Tommy's Joint (San Francisco) — include the rockstar-favorite /
  notable-regulars stories.
- [ ] Castro Theatre (San Francisco)
- [ ] Dalston Superstore (London)
- [ ] Largo do Arouche (São Paulo) — gay-scene angle
- [ ] **Akai** (São Vicente, SP) — a genuinely enormous multi-floor
  perfumery/department store: legit imported perfume brands, but also
  professional barber equipment and a wide spread of non-perfumery
  goods. Operator's framing: "like what Walgreens sells, but way bigger
  than a typical Walgreens, even bigger than a big Walgreens — it has
  floors and takes up a good part of a block, more like a department
  store." Likely `shopping` lens (`near-editor-shopping`) filed under
  `city-culture`. Ties into the existing São Vicente interest (see the
  LGBTQIA+/centro item above and the Litoral Norte/Baixada Santista war
  rooms).
- [ ] **Katz's Delicatessen** (New York) — the "I'll have what she's
  having" deli from *When Harry Met Sally*. Operator asked to include it
  "if it's still open" — verify per `rules.md`'s
  `verify-still-open-before-create` before creating. Natural fit for the
  NYC war rooms below.

## LGBTQIA+ coverage pushes

- [ ] SF, Berkeley, Oakland: LGBTQIA+ bars, especially hipster/
  alternative ones (category overlap fine) — near-editor-stefon POV.
  Also source events through Dec 2026 in this theme: shows, theatre,
  sports.
- [ ] Same LGBTQIA+ coverage pass for São Paulo, London, Santos,
  Brighton.
- [ ] São Vicente, SP — investigate reported small hip venues in the
  centro + the local gay scene (near-editor-stefon assist). Also has its
  own war-room entry below (Litoral Norte SP cluster).
- [ ] Referenced two large pasted research documents as source material
  (see "Research documents to mine" below) covering global queer urban
  geography and an Amsterdam/SF Bay Area queer+cannabis+music nightlife
  guide — both explicitly flagged for war-room treatment.

## Destinations to add to `content/preferred-destinations.md`

Individually named:

- [ ] Sitges, Fort Lauderdale, Orlando, San Diego, Modesto, Reno, Las
  Vegas, Frankfurt, Rotterdam, Ouro Preto, João Pessoa, Maceió, Puglia,
  Sorocaba
- [ ] Angra dos Reis
- [ ] Saquarema, Búzios, Cabo Frio
- [ ] São Sebastião, Ilhabela, Maresias, Barra do Una, Juquehy, Bertioga,
  São Vicente SP (LGBT focus — call in near-editor-stefon), Balneário
  Camboriú, Brasília
- [ ] Stockholm, Oslo, Helsinki
- [ ] 2 more French cities (TBD which)
- [ ] 2 more Chinese cities (TBD which — confirm current count, operator
  believes there are already 2)
- [ ] 2 more Japanese cities (TBD which)
- [ ] More Australian and New Zealand cities (some already requested
  separately below)
- [ ] A Moscow entry — flagged as politically sensitive, confirm
  approach before adding
- [ ] One Middle East city that's safer for women/LGBTQ+ travelers and
  isn't Israel — needs research to identify a genuine, honest candidate
  rather than forcing one
- [ ] Porto Seguro
- [ ] Rio Quente / Pantanal crystal-clear-water destinations
- [ ] Lima, Peru
- [ ] Thailand (country-level — likely multiple cities, Bangkok/Chiang
  Mai already came up in pasted research)
- [ ] Palm Springs, CA
- [ ] Lake Tahoe
- [ ] Barra Bonita, SP
- [ ] ABC Paulista + Baixada Santista (region)
- [ ] Litoral Norte SP (region)
- [ ] Campinas
- [ ] Florida (state-level ask — clarify which specific cities beyond
  Fort Lauderdale/Orlando already listed)
- [ ] Paris, Barcelona, Lugano (Switzerland), Amsterdam
- [ ] Australian cities (add some — count/cities TBD)
- [ ] Patagonia
- [ ] At least ~10 Africa destinations — research which have the
  highest LGBTQIA+-relevant demand across Near's languages before
  picking the specific 10

## Research documents to mine (already pasted in chat, not yet processed)

- [ ] **"Geografia Urbana Queer"** — a long structured report (Portuguese)
  on global queer urban geography: megacities vs. alternative-refuge
  cities, a trans-inclusion index, the sapphic-bar-resilience trend, and
  detailed venue/neighborhood breakdowns across Brazil, the rest of Latin
  America, North America, Europe, Asia, Oceania, and Africa — includes
  two CSV-style city tables ready to mine for `preferred-destinations.md`
  entries and specific venue pins. Operator asked to also use deep
  research to extend it, and to source or generate illustrative images.
  Capture future destinations from it too, not just this pass.
- [ ] **"Guia Mapeado"** — Amsterdam + San Francisco Bay Area
  queer/cannabis/electronic-music nightlife guide (Portuguese), with
  structured Venues / Events_2026_27 / Taxonomy_Tags tables (Club RAUM,
  TILLATEC, Het Groene Veld, The Stud, Outside Lands' Dolores' stage +
  Grass Lands, Hard French, Moe Greens, etc.) — operator explicitly asked
  for a war room built from this document specifically.

## Candidate sources to triage into `content/sources.md` / `preferred-sources.md`

- [ ] Amsterdam/SF-focused list of sites the operator pasted as "great
  sites to monitor": amsterdamalternative.nl, Melkweg's own agenda,
  offbeat.amsterdam, Club Raum / Resident Advisor listings, rainbowdiscoclub.com,
  various SF/Oakland queer-nightlife sources (studsf.com, help.lex.lgbt,
  Hard French / DoTheBay, Moe Greens, Outside Lands / Dolores' /
  sfoutsidelands.com, thegaycalendar.com, quericonightclub.com,
  visitoakland.com, tillatec.com) — triage each for a real feed vs.
  html-extract fallback per existing sources.md conventions.
- [ ] Verify and add, if still active: Le Cool Magazine, NME, SFGate,
  Village Voice (or its closest current successor), and Brazilian
  columnists Lúcio Ribeiro and Érika Palomino's current outlets — named
  explicitly as tonal references for near-blogger and as candidate
  sources in their own right.
- [ ] Standing policy: every skill should keep enriching this list going
  forward (see "Cross-cutting skill policies" above).

## War rooms requested (each = a themed content push: blog post(s) + pins + collections)

- [ ] Hipster/indie-sleaze dance joints, Rio de Janeiro
- [ ] Sports activities, Oakland (paddleboard/kayak rental, kung fu
  school, bartitsu class, joinable rugby team — bonus for gay rugby or
  any gay sports team, yoga schools, gyms, bodybuilding centers)
- [ ] Sports activities, Baixada Santista + São Paulo + Rio de Janeiro +
  Campinas + New York + London + Rome (same activity list as Oakland)
- [ ] Sports activities, San Diego (same activity list)
- [ ] Gay San Diego — flesh existing pin coverage out into a full blog
  post, include events
- [ ] Vegan gastronomy: London, São Paulo, New York
- [ ] Cannabis, New York
- [ ] Asian food, New York
- [ ] Food, China
- [ ] Sleeper ensuite cabin long-haul train trips — luxury edition
- [ ] Sleeper ensuite cabin long-haul train trips — budget edition
      (separate war room from the luxury one)
- [ ] "Angine de poitrine" tour dates content — phrase as given is
  ambiguous (literally "angina pectoris" in French; may refer to a
  band/artist name or be a mis-transcription) — clarify with operator
  before running this one.
- [ ] Cycling in nature, Amsterdam
- [ ] Urban cycling, SF Bay Area
- [ ] NYC block parties
- [ ] London block parties
- [ ] London street food
- [ ] London luxury food
- [ ] Restaurants for the lactose intolerant, London
- [ ] Comida asiática em Lisboa
- [ ] Ramen no Brasil
- [ ] Clubs around the world still mainly playing old-school house music
- [ ] Bars/cafés/parties/gay-bear ("ursos") points around the world
- [ ] Authentic international food in and around Shoreditch, London
- [ ] Melhores guiozas de São Paulo
- [ ] Bartitsu in London
- [ ] Swimming in Olympic-size pools, London and Brighton
- [ ] Everything Brighton: food, LGBT Brighton, art Brighton
- [ ] Moema, São Paulo — food, music, bookstores, unique shops
- [ ] ABC Paulista e Baixada Santista
- [ ] Litoral Norte SP
- [ ] Campinas (general coverage)
- [ ] Sports, Campinas (distinct from the general Campinas war room)
- [ ] Gyms / bodybuilding (fisiculturismo), Lisboa
- [ ] Training centers / fisiculturismo, Baixada Santista
- [ ] Lutas (martial arts / fight gyms), Baixada Santista
- [ ] Lutas, SF Bay Area
- [ ] Lutas, China
- [ ] Gay China
- [ ] Ballroom scene (voguing etc.): Brazil, USA, London, Europe
- [ ] Most delicious vegan restaurants around the world (global)
- [ ] Melhores restaurantes veganos: Baixada Santista, São Paulo, Rio de
  Janeiro, Belo Horizonte
- [ ] Brasília: LGBT, hipster, gastronomic, party
- [ ] Florida (war room)
- [ ] Paris (war room)
- [ ] Barcelona (war room)
- [ ] Lugano, Switzerland (war room)
- [ ] Amsterdam (war room)
- [ ] Best places to stand-up paddle, around the world
- [ ] Nerdy Las Vegas: nuclear history, UFOs, history, dispensaries,
  comics, camp museums
- [ ] Spooky/haunted London
- [ ] Indie sleaze meccas (global)
- [ ] Fresh mozzarella in Naples
- [ ] Best grano duro pasta in Italy
- [ ] Vegan ramen in Tokyo
- [ ] San Diego cannabis scene
- [ ] Hip hop: São Paulo + Baixada Santista
- [ ] Ballroom scene, NYC (distinct from the broader multi-city ballroom
  war room already listed above — this one is NYC-specific)
- [ ] Daytime/weekday NYC — what's actually good on a weekday afternoon,
  not the nightlife angle
- [ ] Chicago daytime/weekday best summer spots — explicitly framed as a
  ***Ferris Bueller's Day Off*-inspired collection**: create the content
  and capture the interesting locations as pins tied together in that
  collection. Note the film's real Chicago locations are a natural spine
  for it (Art Institute, Wrigley Field, the Loop parade route, Sears/
  Willis Tower) — verify each is still visitable/open per
  `verify-still-open-before-create`, and don't assert a filming location
  as fact without a real source.
- [ ] New York homage to *The Warriors* — operator's asks: the Broadway
  stage adaptation of *The Warriors*, riding the F line out to Coney
  Island, "what else?" (open-ended — `near-deep-researcher` should map
  the film's actual route/locations and find what's still there). Pairs
  naturally with Katz's Delicatessen above and the other NYC war rooms.
  **Research already done and verified 2026-08-28** (this push was
  started, then deprioritized in favour of Baixada Santista/São Paulo —
  pick it up from here rather than re-researching):
  - The musical is real and dated: *Warriors*, by Lin-Manuel Miranda and
    Eisa Davis, opens at the **Lunt-Fontanne Theatre**, previews March
    2027, opening April 2027. Directed by Jenny Koons, co-directed/
    choreographed by Andy Blankenbuehler, grew out of the Oct 2024
    concept album exec-produced by Nas. Gender-flipped — an all-female
    gang. Sources: Playbill, Broadway.com, NBC New York.
  - Katz's Delicatessen: **verified open**, 205 E Houston St. (The
    separate Katz's opening near Memorial City Mall is a different,
    Houston-Texas business — don't conflate them.)
  - Confirmed filming locations (movie-locations.com + Scouting NY):
    the conclave was **97th St Playground / "Dinosaur Playground"** at
    Riverside Drive (*not* Van Cortlandt Park); the Baseball Furies
    fight was at the **Firemen's Memorial, W 100th St at Riverside
    Drive**; the Furies subway scene was **72nd St station**, not the
    96th St the film claims. **Hoyt–Schermerhorn**'s two disused outer
    platforms doubled for several stations (crews taped "Union" over
    "Hoyt" tiles). The **Punks bathroom fight was the only set in the
    film**, built at Kaufman-Astoria Studios in Queens — so it is *not*
    a visitable location, don't write it as one.
  - Coney Island: the Warriors emerge at **Stillwell Avenue station**,
    but the boardwalk entrance has been rebuilt with ramps and you can
    no longer get underneath it. **Stauch's Baths**, the final-scene
    building, was demolished in the 1980s; **Tom's Restaurant Coney
    Island** has stood on the spot since 2012 — a good pin. The beach
    confrontation itself was probably *not* shot at Coney (Michael Beck
    said Jones Beach; others suggest Fort Tilden) — flag as disputed
    rather than asserting either.
  - Proposed pin set (5, respecting `run-volume-cap`): Katz's
    Delicatessen, the Firemen's Memorial in Riverside Park,
    Hoyt–Schermerhorn Streets station, Deno's Wonder Wheel (verified
    open — 2026 season opened Mar 29, 106th anniversary of the wheel),
    Nathan's Famous at Surf & Stillwell (trading since 1916; note the
    Jan 2026 $450m Smithfield acquisition). Tom's Coney Island gets a
    mention in the collection body rather than its own pin.
- [ ] Coolest libraries in the world (global)
- [ ] War room built from the "Geografia Urbana Queer" document (see
  above)
- [ ] War room built from the "Guia Mapeado" Amsterdam/SF document (see
  above)

## Feature buildout — accounts, social, monetization (Stage 4, after content + GA4 + Search Console)

- [ ] Google OAuth login. Operator's own login (baraldi@gmail.com) is
  the permanent admin ("Maximus") account — build an admin area.
- [ ] User profile: photo, about text, one external link, a shareable
  profile URL, latest favorites, latest comments, latest ratings given.
- [ ] Favoriting: users can favorite both pins and blog posts/articles.
- [ ] Collections: users can bundle favorites into custom-named
  collections; private or public; a collection can itself be favorited
  and added into other collections.
- [ ] Comments — NOT a generic "leave a comment" box. The UX should
  actively prompt the reader for their POV on specific things the
  article/pin mentions, and separately invite free-form contribution
  about the pin itself.
- [ ] Ratings: star rating for places/services; flame rating for
  time-bound things (events/shows/plays that expire and archive).
- [ ] Follows: users can follow each other; "Follows" becomes a tab
  alongside Nearest/Latest in listing views.
- [ ] Pin-creation access model (latest revision — supersedes earlier,
  stricter drafts of this same idea from earlier in the conversation):
  - Free users **can** create pins (UGC has real value) — 1 active pin
    at a time each, no follower-only visibility restriction (that
    restriction was explicitly dropped).
  - Paid tier (naming/pricing TBD — "pro" vs. "sponsor", pricing not yet
    decided) can have multiple simultaneous active pins.
  - Admin, curator/editor, and paid-tier users can all create pins
    without the free tier's 1-active-pin limit.
  - Since the original "paid-only pin creation" monetization angle is
    now off the table, a different monetization mechanism needs to be
    worked out.
  - Admin/editor/curator posts are visible to everyone by default, or as
    configured by admin.
- [ ] Admin/curators can create pin pages directly from the map (also
  listed under UI/UX above).
- [ ] Easy UX for any user to suggest something or file a complaint about
  anything — likely an extension of the existing near-inbox mechanism
  rather than a wholly separate system; decide when building.
- [ ] AI-edit-preserves-human-content rule (see "Cross-cutting skill
  policies" above) becomes load-bearing once human-authored pins exist.

## Explicitly withdrawn — do not build

- [x] ~~Internet radio station bar~~ — proposed in detail (per-map-
  viewport station list, sticky bar under the header, no autoplay, no
  auto-switching), then the operator explicitly retracted it: "radio is
  a bad idea, abort radio requirements." Left here only so it isn't
  re-proposed later without context.
