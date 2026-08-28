# Near — Backlog

Working backlog of everything requested but not yet done. Check items off
(`- [x]`) as they're completed; don't delete finished items, just tick
them, so this stays a real record. Organized by category, not strict
chronological order. Agreed sequencing (see "Sequencing" below) still
governs what actually gets worked next — this file is the *scope*, not
the *order*.

## Sequencing (explicit, operator-confirmed)

1. **Content first** — beef up destination/place coverage across many
   different markets (breadth over depth) to get multi-market traction
   before leaning on UGC.
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

- [ ] Console error on locale switch (seen switching to Italian, on
  localhost dev): "Encountered a script tag while rendering React
  component" from `components/layout/ThemeScript.tsx` — reported twice.
  Likely a benign Next.js dev-mode warning but confirm no real hydration
  issue; consider an alternative to `dangerouslySetInnerHTML` on a
  `<script>` tag if it can be avoided cleanly.
- [ ] The es-419 locale switcher icon currently uses a globe — replace
  with the Mexican flag.

## UI/UX

- [x] Mobile: header locale/theme controls stack vertically on mobile/
  tablet (done). Filter chips still need their own mobile treatment —
  see the next item, not yet done.
- [ ] Mobile: collapse category/tag filters under a filter menu/button so
  the map and listings sit more above the fold.
- [ ] **Mobile pass, broader** (2026-08-28, operator: "really slick web
  app that's immediately understandable and usable... right now it's
  kind of ugly and cluttered on mobile... desktop looks better,
  haven't tested tablet"). Broader than the filter-collapse item above
  — a real audit of every page at mobile viewport width, not just the
  filter row. In progress.
- [ ] Nearest/Latest (and future Follows) listing rows should show a
  thumbnail image, not just text.
- [x] Rename "Use my location" to "My location"; clicking it now
  zooms/centers the map to the user's immediate neighborhood around
  their geolocation (zoom 14), and the app proactively requests
  geolocation on load instead of requiring a click first (done
  2026-08-28).
- [ ] Move the search box up onto the title/tagline line; make
  search + locale switcher + theme toggle sticky at the top of the
  viewport — including on pin detail pages.
- [ ] Map should support drag/pan; the listings panel should update to
  reflect the current map viewport/selection (real-estate-site style
  "search this area").
- [ ] Admin/curators should be able to create a new pin page directly
  from the map (click-to-create UX).
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
