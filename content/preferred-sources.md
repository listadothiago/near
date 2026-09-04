# Near — Preferred Sources

Maintained by the `near-refresh` skill. This is a priority ordering layered
on top of `content/sources.md`'s full catalog — which sources to check
*first* on a refresh run, and why. `sources.md` is the technical catalog
(feed URLs, trust tier, category); this file is the editorial judgment
about which of those sources are actually worth checking every time versus
occasionally.

A source doesn't need to be in `sources.md` yet to be listed here as a
candidate to add — `near-refresh` is also responsible for discovering and
proposing new sources (see its SKILL.md), and a strong candidate that
hasn't been formally onboarded yet can be noted below with a "candidate,
not yet in sources.md" flag.

## Tier 1 — check every run

These have been reliable, on-topic, and worth the request budget on every
`near-refresh` pass:

- `atlas-obscura` — consistently place-specific, low noise, exactly Near's
  beat (world-culture-news).
- `eater-national` — high signal-to-noise for food-drink; regional Eater
  sub-sites (Eater LA, Eater NY, etc.) are good candidates to add
  individually rather than relying on the national feed alone.
- `timeout-london` — reliable city-culture feed, good freshness.
- `juicy-santos` — verified working RSS
  (`https://www.juicysantos.com.br/feed/`), genuinely place-specific
  city-culture coverage for the Baixada Santista region. Also the closest
  thing to a Praia Grande feed (via its Praia Grande section) — see the
  note in `sources.md`.

## Tier 2 — check when working that region/beat

Not worth a request on every single run regardless of what's being
researched, but reliable when the run is actually about their beat/region:

- `catraca-livre` — city-culture, br, but feed has been historically
  flaky; expect to fall back to the Chrome-automation path often.
- `resident-advisor` — nightlife-sound, global, always needs the
  Chrome-automation fallback (no real feed) — budget extra time for it.
- `a-tribuna` — Santos's main daily; no RSS, always html-extract. Good for
  broader Baixada Santista news context, not just place tips — filter
  hard for actual places per the "filter to places" pipeline step.
- `sf-standard` — reliable for SF openings specifically, always
  html-extract (no feed found). Good og:image availability for source-tier
  hero images.
- `the-oaklandside` — reliable for Oakland/East Bay openings, always
  html-extract. Remember it's the same organization as Berkeleyside — one
  source entry, not two.

## Candidates not yet in `sources.md`

Found while researching specific places, worth formal onboarding once a
second or third genuinely good item from them shows up (don't add a
source to the permanent catalog off a single lucky find):

- `dazeddigital.com` (Dazed) — UK culture/queer-beat coverage, strong on
  founder-interview pieces (e.g. La Camionera's Alex Loveless/Clara Solis
  interview, found researching `la-camionera-hackney-london`,
  2026-09-04). Good for city-culture and nightlife-sound stories with a
  real subject interview, not just a listing.
- `i-d.co` (i-D) — same beat as Dazed, queer/youth-culture angle; found
  on the same La Camionera pass (2026-09-04), independently corroborated
  the founder story and FLINTA-owned framing.
- `camra.org.uk` (CAMRA pub listings) — useful for a live, dated
  "still open, these are the hours" cross-check on UK pubs/bars
  specifically, since CAMRA volunteers update listings on the ground;
  found verifying `la-camionera-hackney-london` (2026-09-04). Not a
  press/editorial source, a currency-check source.
- `theinfatuation.com` — restaurant/bar review site, useful as a
  UGC-adjacent proxy for queue/crowd/service behaviour when Google
  Maps/Tripadvisor reviews are blocked to fetch tools; found on the same
  La Camionera pass (2026-09-04).
- Time Out's other city editions beyond London (Time Out São Paulo, Time
  Out New York, etc.) — same publisher, same reliability profile as
  `timeout-london`, straightforward to onboard per-city as coverage
  expands into those cities.
- Local alt-weekly-style publications for whichever `preferred-destinations.md`
  cities get worked next — the whole point of the alt-weekly voice
  reference (see the style guide) is that these outlets exist in most
  major cities; actively look for the local equivalent (a Chicago Reader-
  style paper, etc.) when starting a new city rather than defaulting to
  generic travel-blog sources only.
- `vamosgay.com` — Latin America LGBTQIA+ travel guide, useful for
  cross-checking São Paulo coast (São Vicente/Santos/Guarujá) queer
  venues; found while verifying AMUSE Beach Club (2026-09-01). Only one
  genuinely good hit so far, not yet formally onboarded.
- `dolphinclub.org` — official site for San Francisco's Dolphin Club
  (Aquatic Park open-water swim club); has the authoritative, currently-
  maintained guest day-use fee/hours (caught an outdated $10 fee vs. the
  actual current $12), useful for any future SF Bay open-water swimming
  piece (South End Rowing Club, Aquatic Park itself). Found while
  verifying Dolphin Club (2026-09-01).
- `qlist.app` — venue-listing aggregator for LGBTQIA+ nightlife (used to
  cross-verify AMUSE Beach Club's address/hours, 2026-09-01). Worth
  checking again next time a Baixada Santista or São Paulo LGBTQIA+
  venue needs verification, not yet formally onboarded off one hit.
- Instagram `@amuseclub` — AMUSE Beach Club's own account, active with
  a live September 2026 event calendar; the same current-status-check
  pattern already used for `@crisdoquiosque`. Worth the same "check
  before any statusHistory update" treatment near-caretaker gives that
  account.
- `goldminemag.com` (Goldmine Magazine) — record-collecting trade press,
  runs a "Record Store Recon" review series on individual indie record
  stores; used to corroborate 1-2-3-4 Go! Records' Oakland reputation
  (2026-09-03). Worth checking again for any future record-shop/vinyl
  pieces.
- `discogs.com/record-stores` — Discogs' record-store directory, useful
  for cross-checking a record shop/label's existence, address, and
  (for labels) release catalog; used for 1-2-3-4 Go! Records
  (2026-09-03).
- `visitoakland.com` — Oakland's official tourism-board listings site;
  used to corroborate 1-2-3-4 Go! Records' address/hours (2026-09-03).
  Treat as a lower-editorial-weight but useful corroborating source for
  Oakland venues generally (city tourism sites confirm existence/hours,
  not scene credibility).
- `nationaltoday.com` — general holiday/observance-date reference site;
  used to confirm the official Record Store Day 2027 date (April 17)
  alongside `hepcat.se` and `craterecords.be`, none of which is Record
  Store Day's own site — worth finding recordstoreday.com's own release
  calendar as the primary source next time this date is needed.
- Instagram `@cantodosursos520` — Canto dos Ursos's own account
  (bear-community karaoke bar, Praia Grande), 18.3K followers, posting
  multiple times a week; the primary source for that place's address,
  hours, and event calendar (found while writing
  `content/places/canto-dos-ursos-praia-grande`, 2026-09-01). Worth
  checking for Praia Grande LGBTQIA+ nightlife generally, not just this
  one venue's own currency checks — same `nightlife-sound`/
  `lgbtq-friendly` beat as `@amuseclub`/`@crisdoquiosque`.
- `prinz-eisenherz.buchkatalog.de` — Eisenherz Buchladen's own site
  (Berlin's/Germany's oldest gay bookshop); used to verify founding
  history and current address/programming while drafting
  `content/places/eisenherz-buchladen-berlin` (2026-09-01). Worth
  onboarding for Berlin `city-culture`/`lgbtq-friendly` currency checks
  generally, alongside `visitberlin.de` (city-culture beat, English-
  language municipal tourism site, also used on this piece for a
  second-source cross-check).
- Canto dos Ursos's own site (`sites.google.com/cantodosursos.club`) —
  found alongside the Instagram above; a Google Sites page, not
  fetchable via the normal `WebFetch` path (redirects to a Google login
  wall), so any future check of it needs `claude-in-chrome` or a
  logged-in fetch instead of the default tool.
- `so36.com` — SO36's own official ticket shop/site (Berlin, Kreuzberg);
  its per-date event pages list the full run of upcoming dates for a
  recurring night (used to independently confirm all four 2026 GAYHANE
  dates while writing `content/places/so36-berlin`, 2026-09-02) — a
  reliable primary source for any future SO36 piece and a model for
  checking other Berlin venues' own ticket shops directly rather than
  trusting aggregator listings.
- `the-berliner.com` (The Berliner, formerly Exberliner) already in
  `sources.md`, cross-checked here for SO36's 40th-anniversary
  retrospective — no new onboarding needed, noting the hit for context.
- `evgrieve.com` (EV Grieve) — long-running East Village neighborhood
  blog, genuinely local rather than a generic aggregator; tracked The
  Rabbit Books and Bar's buildout across three posts (announcement,
  pre-opening, grand opening) and was the primary source for
  `content/places/rabbit-books-and-bar-east-village-nyc` (2026-09-01,
  Near's first NYC-proper pin — no NYC alt-weekly is in `sources.md`
  yet, worth onboarding this one formally once a second good hit turns
  up).
- `shelf-awareness.com` — book-trade press, used to cross-verify the
  same Rabbit Books and Bar opening details (owners, address, timeline).
  Niche but reliable for anything bookshop-related; worth checking again
  for other bookstore/literary-venue pieces.
- `mackbooks.co.uk` — MACK's own site, publisher of Amelia Abraham's
  *Sex, Clubs, Dissent: Visualising Queer Nightlife*; primary source for
  the book's launch/event details, used in the Ladies&Gentlethem Sept
  2026 issue (link-police retroactive pass, 2026-09-01). Worth checking
  for other queer-photography/art-book coverage.
- `huckmag.com` (Huck Magazine) — used for its own coverage/framing of
  *Sex, Clubs, Dissent*'s argument about queer-nightlife slang being
  absorbed and stripped of credit, same piece as above. Culture/
  subculture-focused; worth a second look for other queer-scene angles.
- `curacaopride.org` — official Curaçao Pride site, used for the 2026
  "Make Waves" dates/theme in the same L&G issue. Straightforward
  primary source for that one recurring dated event.
- `santos.sp.gov.br` — Santos city hall's own news page, used as the
  primary source for the 9th Parada do Orgulho LGBT+ mention in the same
  issue. An official municipal source, reliable for Santos civic/Pride
  event coverage specifically.
- `ingresse.com` — official ticketing site for Primavera Sound São
  Paulo 2026, used as the external link for The Setlist's first issue
  (link-police full pass, 2026-09-01). Worth checking for other
  São Paulo festival/ticketed-event coverage.

## Tier 3 — AAN member directory batch (2026-09-01), check opportunistically

96 outlets added to `sources.md` in one pass on 2026-09-01, from the live
AAN directory (`aan.org/member-directory/`, 90 US outlets) plus a first
international pass (6 non-US outlets: The Skinny/Scotland, The
Berliner/Berlin, Chilango/Mexico City, Broadsheet/Australia, Metropolis
Japan/Tokyo, Concrete Playground/Australia-NZ). None have a confirmed
RSS feed — all `feedType: html-extract`, `trust: auto`, `status: active`
but functionally untested. Per the operator's directive, RADAR-X should
read across this whole batch for **trending themes and topics**, not
just per-city place leads — that's the actual point of onboarding all of
it rather than cherry-picking a handful. Don't expect near-editor to work
all 96 every run; treat this tier as "mine for signal when a run touches
that city/region, or when RADAR-X does a broad trend sweep," and promote
individual outlets to Tier 1/2 once they've produced two or three
genuinely good hits.

Still open from this batch:
- ~10 AAN directory rows had no URL listed in the live fetch (The Pitch
  KC, Volume One, Queen City Nerve, American Prospect, Pittsburgh
  Current, Dallas Voice | OUT North Texas, BlueDot Living, Sydney City
  Hub, Yellow Scene) — need a manual lookup pass to find their sites
  before they can be added.
- The international pass above is a first pass only (6 outlets across 5
  countries) — Latin America (beyond Mexico City) and Asia-Pacific
  (beyond Japan/Australia/NZ) are thin. Needs a dedicated follow-up pass,
  per the operator's directive to `near-deep-researcher` or similar.

- `guiadasemana.com.br` — São Paulo bares/restaurantes desk, covers
  openings and promos specifically (e.g. the "inaugura" piece on Pracinha
  do Seu Justino, plus its own recurring-promo coverage). Found while
  researching `pracinha-do-seu-justino-sao-paulo`; `feedType` untested,
  no RSS confirmed yet — html-extract candidate. Good for disambiguating
  near-identical venue names (it ran both the opening piece and later
  promo coverage, which is what confirmed Pracinha and Seu Justino are
  related-but-distinct addresses).
- `baressp.com.br` — São Paulo bar directory/listicle site with per-venue
  pages carrying address, phone, hours, and a dedicated venue photo
  (reliable `og:image`, useful for source-tier hero images). Found
  researching the same piece; not yet trust-tested across multiple hits.

### Brighton — found during the 2026-09-02 seeding pass (Tier 1 city, zero sources)

Brighton is Tier 1 and had **no watched sources and no queue** — the same
pattern found in San Francisco earlier the same day. Two of these are
strong enough to onboard to `sources.md` on the next pass rather than
waiting for a second hit.

- `gscene.com` / `scenemag.co.uk` — **Gscene / Scene Magazine**, LGBTQ+
  news and listings with deep Brighton roots. It carried both the "Queer
  the Marly" campaign outcome and the community objections to the Pride
  Village Party move. This is the alt-press outlet Near's style guide
  keeps pointing at, for the UK's queer capital. **Top graduation
  candidate.**
- `brightonandhovenews.org` — **Brighton and Hove News**, genuinely
  independent local news (Brighton, Hove, Portslade, Rottingdean,
  Woodingdean). Broke the Green Door Store Pride charity concert. Proven
  on a real story, not just present.
- `democracy.brighton-hove.gov.uk` — the council's own decisions,
  agendas and papers. Not a feed and not discovery, but **authoritative**
  for civic stories: it holds the actual Pride 2022-2026 decisions and an
  "Evolution of Pride in Kemptown" paper. Use as a verification source
  for anything about council policy — this is how the Pride Village Party
  piece avoids being he-said-she-said.
- `quartersbrighton.co.uk` — Quarters' own site and listings; the primary
  source for Polyglamorous dates now that the party has moved there from
  Chalk.
- `thegreendoorstore.co.uk` — Green Door Store's own site, for listings.

_Flagged for `near-caretaker`: Brighton listicles and directories are
unusually stale — they still call The Actors "The Marlborough" and still
place Polyglamorous at Chalk. Treat any Brighton aggregator as
unverified until checked against the two outlets above._

### Baixada Santista — found researching `barraca-da-dheia-guaruja` (2026-09-02)

- `andadireito.com.br` — **Anda Direito**, a Brazilian LGBTQ+ community
  platform that maps queer-run and queer-friendly places nationally,
  including categories (`barraquinhas`) no mainstream guide indexes. It
  was the only source that confirmed Barraca da Dhéia was open AND
  carried the venue's own words. Strongest new candidate here and a
  national-scope asset, not just a Baixada one — high-priority
  graduation. Note: some detail sits behind a registered-user wall.
- `benditoguia.com.br` — Brazilian business directory with LGBT
  categories; useful for address/phone confirmation. **Low trust on
  operational data** — it served office hours (Mon-Fri 9-18) for a beach
  barraca and a 5.0 rating from zero reviews. Corroborate, never rely.
- `diariodolitoral.com.br` — Baixada Santista daily, covers the regional
  LGBTQIAPN+ beat. Blocked WebFetch with 403 this pass; may need browser
  automation.
- `turismo.sp.gov.br` / `plataforma.turismo.sp.gov.br` — São Paulo state
  tourism secretariat, owner of the **Mapa do Turismo LGBT**. Authoritative
  for which municipalities are certified. Access is poor: the plataforma
  subdomain has an **expired TLS certificate** and the main site returns a
  portal index rather than article bodies. Flagged for `near-caretaker`.
- `atribuna.com.br` — already known for the Baixada, but recording that
  article bodies did not render via WebFetch this pass (navigation chrome
  only), so it needs browser automation to be genuinely usable.

### San Francisco — whole-city gap, found researching `the-stud-san-francisco` (2026-09-02)

SF is a **Tier 1 rotation city with three published pins and zero
watched sources**. Every source below was found from scratch on a single
piece, which is the tell. Worth a batch onboarding pass rather than
adding one at a time.

- `missionlocal.org` — nonprofit local newsroom, Mission/SoMa focus.
  Broke the Meta/Instagram reversal on The Stud and covered the Stud
  Alley arrests independently. Strongest of these for Near's beat:
  neighbourhood-level, covers queer nightlife as civic news rather than
  listings. Highest-priority graduation candidate.
- `sfist.com` — SF news/culture blog, close daily coverage of nightlife,
  venues and closures. Reliable dated reporting; useful for currency
  checks by `near-caretaker`.
- `sfbaytimes.com` — LGBTQ+ community paper, publishes the small-business
  and community-institution angle other outlets skip. Directly on
  Near's beat.
- `sfheritage.org` — SF Heritage's Legacy Business profiles. Not a feed
  and not news, but an authoritative reference for founding dates,
  addresses, ownership history and legacy status. Best used as a
  verification source, not a discovery one.
- `sfchronicle.com` — metro daily. **Paywalled**, headline/lede only via
  fetch; usable for corroboration, not as a primary.
- `studsf.com` — the venue's own site and calendar. Flagged for
  `near-caretaker`: its `/closed` page is a spring-2020 announcement with
  **no visible date**, and it still ranks — the direct cause of the
  false-closure signal this piece had to correct.

### Baixada Santista cycling + transport — found researching the Santos → Guaiúba route (2026-09-02)

- `cicloviasdesantos.com` — **Ciclovias de Santos**, a dedicated local
  site for the city's cycling network. Potentially a real find for
  CICLOVIA's beat and the only non-municipal source found that treats
  the lane network as a subject in itself. **Currency unverified** — do
  not cite until someone confirms it is still publishing.
- `servicos.sp.gov.br` — São Paulo state's service catalogue. Carries
  the **official Travessia Santos–Guarujá fare table** (`Ciclistas:
  Gratuito`, `COBRANÇA UNIDIRECIONAL`) with a last-updated date on the
  page. Authoritative for fares and gratuities; a reference source, not
  a discovery one.
- `alltrails.com` — the orla ciclovia page carries ~35 rider reviews.
  Recorded specifically because **Reddit returned nothing usable on this
  crossing across four separate queries** — a genuine null result, not a
  gap in searching. Where a Brazilian coastal route has no Reddit
  presence, AllTrails and Google reviews are the available UGC surface
  and the research floor's Reddit step has to be satisfied elsewhere.
- ⚠️ `santos.sp.gov.br` — already listed above and still authoritative
  for civic news, but **flagged for a specific defect**: it publishes
  mutually contradictory figures for the size of its own bike network
  (20,9 km, 21 km, 30,9 km and 50 km across municipal and press
  sources). Cite its *dated, specific* claims (the 7.874 m orla stretch,
  Lei 4.221/2023, the R$ 88,38 fine) and treat its aggregate statistics
  as unreliable.
- 🚫 `santosbikes.com.br` — **not usable.** A Santos bike shop whose
  rental page returns "Nenhum registro encontrado", with rental absent
  from its live service menu and a **(47)** contact number (Santa
  Catarina, not the Baixada). Recorded so the next run does not
  re-discover it and link it as a rental option.

### Sitges / Catalonia — found on the 2026-09-03 Sitges war room

All used on the four Sitges pins shipped that day; none was previously in
`sources.md`.

- `casinoprado.cat` — Casino Prado Suburense's own site. Its `/historia/`
  page is a properly detailed institutional history (founding, architect,
  the 1968 fantastic-cinema week, awards) and is the primary source for
  `content/places/casino-prado-sitges`. Good candidate for onboarding on
  the Catalonia `city-culture` beat.
- `elretirositges.cat` — Societat Recreativa El Retiro's own site. Its
  `/remodelacio/` page is the authoritative record of the renovation that
  closed the hall on 4 May 2024, and is the reason that pin was NOT
  written. Check it on every future Sitges pass — the reopening is itself
  the story.
- `sitges.cat` — Ajuntament de Sitges. The `parc-escultoric` catalogue is
  a genuinely good municipal source with materials, dimensions and
  inscriptions per work; primary source for the Monument contra
  l'homofòbia pin.
- `sitgesanytime.com` — the town's official tourism board. Carries the
  festival's confirmed 2026 dates and edition number; the most reliable
  date source available given the access quirk below.
- `gaysitgesguide.com` — dedicated local gay guide. The only source found
  that gives Parrots' **seasonal** opening window (March–October plus
  Carnival) rather than reprinting year-round hours; that caveat is the
  most useful thing on the Parrots pin.
- `parrots-sitges.com` — Parrots Group's own site; the source for the
  group's venue list and its AFGAL founding membership.
- `thegaypassport.com`, `misterbandb.com`, `tapasitges.com` — guide/
  aggregator tier, used for cross-checks (venue counts, Bears Week and
  Carnival dates) and always attributed as guides rather than as fact.
  `tapasitges.com` self-flags that the Ajuntament confirms Carnival dates
  each autumn, which is the right posture and worth remembering.
- `thepinknews.com` — contemporaneous 2006 report on the Sitges monument's
  unveiling. Useful generally for pre-2010 LGBTQ+ civic history where a
  municipal page is thin.
- **ACCESS QUIRK, important:** `sitgesfilmfestival.com` — the festival's
  own site — returns **HTTP 403 to WebFetch on every path tried**
  (2026-09-03), as does `festivalesdeespana.com`, `visitsitges.com` and
  Tripadvisor. The official 2026 announcement text was only readable
  through the search index's rendering of the page. Anyone re-verifying
  the lineup needs `claude-in-chrome`, not WebFetch.
- **TOOLING GAP, not a source:** `reddit.com` is refused outright to this
  session's search backend ("domains not accessible to our user agent"),
  so `near-write-article`'s step 4-0 Reddit leg could not be run on any
  of these four pins. Google/Tripadvisor reviews were likewise 403. This
  is a standing constraint, not a one-off — worth solving with
  `claude-in-chrome` before the next research floor is claimed as met.
- `oaklandnorth.net` — Oakland North, UC Berkeley J-school's local news
  outlet; good long-form local-history reporting on Oakland institutions
  (used for corroborating the 1906-earthquake/tilted-floor legend at
  Heinold's First and Last Chance Saloon). Found researching
  `heinolds-first-last-chance-oakland`; not yet trust-tested across
  multiple hits.

## Notes for `near-refresh`

- Work Tier 1 first, every run, regardless of what else is planned.
- Tier 2 only when the run's destination/beat matches.
- A source that goes stale (feed dead, site redesigned, stops covering
  actual places) should be flagged here and in `sources.md`
  (`status: paused`), not silently skipped run after run.
- `vam.ac.uk` (and its `/east` section) — the V&A's own site, including
  live alert banners for closures and industrial action, plus per-
  exhibition pages carrying prices and closing dates. Found researching
  V&A East Museum (2026-09-03). The alert banner is the single most
  useful part: it is where the 4–5 September 2026 strike closure was
  published, and it is authoritative in a way no aggregator is. Treat
  the exhibition pages as authoritative for price/date but still expect
  disagreement with the venue's own partner listings (see below).
- `pcs.org.uk` news — Public and Commercial Services Union. Publishes
  strike dates and "action short of a strike" for UK public museums and
  galleries before venues put notices up. Found researching V&A East
  Museum (2026-09-03), where it was the only source explaining that the
  overtime ban and work-to-rule continue indefinitely past the two
  announced closure days. Genuinely load-bearing for any UK national
  museum piece with a dated visit hook.
- `museumsassociation.org` (Museums Journal) — UK museum-sector trade
  press; sober, dated, and good on labour disputes, closures and
  funding. Cross-checked the V&A strike ballot figures (2026-09-03).
- `queenelizabetholympicpark.co.uk` — official listings for the Olympic
  Park venues (V&A East, Sadler's Wells East, London College of
  Fashion, UCL East). Useful for what is on across the East Bank
  cluster. CAVEAT WORTH RECORDING: on V&A East it published a different
  full price and a different exhibition closing date than the V&A's own
  page, so it is a discovery source, not a price/date authority.
- `londonist.com` — London city-culture site; ran a genuinely critical
  V&A East review (the headset audio complaint) rather than press-
  release copy. Worth watching for London pins generally.
- `ianvisits.co.uk` — London transport/museum news, strong on closures
  and openings. NOTE: 403s on automated fetch; reachable via search
  summaries or a browser, so budget for that.
- `theartnewspaper.com` — international art-world news, and notably
  better than the general press on **museum labour**. Found researching
  V&A East Storehouse (2026-09-03), where it was the ONLY source
  carrying the building-specific ballot (100% of collections access
  officers for strike action, 88% turnout) and Prospect's actual
  demands, none of which appears on the PCS release or in the sector
  trade press. Use it whenever a museum piece has an industrial-relations
  angle; `pcs.org.uk` gives you the dates, this gives you the substance.
- `artfund.org` — UK art charity; runs Museum of the Year and publishes
  the winner/finalist announcements plus a museum directory whose
  structured data carries clean addresses and coordinates. Found
  researching V&A East Storehouse (2026-09-03), where it settled that
  the venue was a *finalist*, not the winner — its own site still badges
  it "Shortlisted". Good for catching a venue's stale self-description.
- `vam.ac.uk` per-venue event listings (`/whatson`, and the `/event/<id>/`
  detail pages) — worth calling out separately from the `vam.ac.uk` entry
  above, because this is where the *dated, free, drop-in* programming
  lives that the visit pages and every aggregator omit entirely. The
  10 September 2026 Remiiya Badru drop-in was found here and nowhere
  else. NOTE the access quirk: `/east/whats-on` and `/east/storehouse/whats-on`
  both 404, and the venue filter on `/whatson` is applied client-side —
  fetch `/whatson` whole and filter the event teasers yourself.
- Tripadvisor — attempted for visitor testimony on V&A East Storehouse
  queues (2026-09-03) and returned **HTTP 403 to every automated fetch**,
  so no quote could be read and verified and none was published. Logged
  as a known-blocked source rather than a candidate: budget a browser
  session for it, or use a first-party queue policy instead, which in
  that piece was the stronger citation anyway.
- `dolphinclub.org` — official site of San Francisco's Dolphin Club
  (founded 1877), the source of truth for its current day-use fee and
  guest hours; caught a live price drift this session (queue note said
  ~$10, official visit page says $12/$12.67). Found researching Dolphin
  Club, Aquatic Park (2026-09-03). Good for any future SF outdoors/
  wellness piece touching Aquatic Park.
- `serc.com` — official site of the South End Rowing Club, Dolphin
  Club's next-door neighbor at Aquatic Park; confirmed the alternating
  public-access-day arrangement between the two clubs. Found in the same
  research pass (2026-09-03). Also the likely subject of its own future
  pin — same cove, same guest-day model, un-pinned as of this session.
- `openwaterpedia.com` — wiki focused on open-water swimming clubs and
  venues; useful secondary cross-check for Dolphin Club/South End
  history but carries some stale figures (an old $6.50 guest fee still
  posted there as of 2026-09-03) — cross-check its numbers against the
  venue's own current page before trusting them.

### Bangkok — whole-city gap, found during the 2026-09-03 seeding pass (Tier 1 city, zero sources)

Bangkok was promoted to Tier 1 on 2026-09-02 with **zero pins and zero
sources**. This pass seeded it. All entries freshness-checked 2026-09-03
against the 90-day rule. None is Tier 1 yet — none has been used on a
published piece.

**Tier 2 — check when working Bangkok**

- **BK Magazine** (`bkmagazine.com`, English) — the one genuinely
  Near-shaped outlet in the city, descended from the free print weekly.
  Newest post 2026-09-01; fetches cleanly. **Caveat: it is itself part
  of the biggest correction in the city** — its "10 best live music
  venues" listicle still carries Studio Lam, which closed. Use it, don't
  trust it unchecked.
- **The MATTER** (`thematter.co`, **Thai only**) — indie culture and
  society. Newest 2026-09-03.
- **The Momentum** (`themomentum.co`, **Thai only**) — long-form
  reported features, including sex-worker rights and gender reporting.
  Newest 2026-09-03.
- **art4d** (`art4d.com`, Thai + English) — architecture, design and art
  in Bangkok since 1995. September 2026 content live.

**Tier 3 — opportunistic**

- **Prachatai English** — independent news; **403s on WebFetch**, needs a
  browser session. Live via its index.
- **Time Out Bangkok** — listicle-grade for editorial, but its events
  desk is current. **Calendar use only.**
- **Spectrum** (`spectrumth.com`) — Thai queer/gender magazine, Bangkok
  Pride award 2025. **403s, and its index only surfaces 2025 content, so
  freshness is NOT confirmed.** Candidate, not verified — do not cite
  until a browser session confirms it is still publishing.
- **Bangkok Art Biennale**, **Made in Song Wat** — institutional
  primaries, good for dated programming.

**Rejected this pass, with reasons** (recorded so the next pass doesn't
re-litigate them): **Fungjaizine** — would be the ideal music source,
but last post 2024-12-18, dormant. **Friday Bangkok** — English front
page newest item March 2026. **Coconuts Bangkok** — archive-only. The
named expat-SEO listicle layer — fails the editorial bar outright.

**No AAN member exists in Bangkok, or anywhere in Asia** — the directory
is 126 North American titles plus one in Sydney. Nothing was substituted
in its place; the AAN-first rule simply has nothing to reach for here,
which is a fact about the city's media landscape, not a gap in the pass.

**Two stale facts nearly propagated, logged as traps:** Talad Rot Fai
Srinakarin has **not** closed (the Ratchada site closed, then reopened
2026-03-27), and the "G-Star reopened" thread conflicts with a closure
reading. Both marked do-not-use without a primary source.

**New candidates, found drafting `bangkok-art-biennale-2026` (2026-09-04):**
none of Bangkok's four Tier 2 sources above (BK Magazine, art4d, The
MATTER, The Momentum) has covered BAB 2026 yet, so the piece leaned on
international art press instead. Logging these as candidates for the
`world-culture-news`/city-culture beat, not yet added to `sources.md`:

- **ArtReview** (`artreview.com`, English) — established international
  art-press title; ran a full BAB 2026 announcement piece with curator
  and artist detail 2026-06-26. No access quirk.
- **ArtAsiaPacific** (`artasiapacific.com`, English) — the most complete
  BAB 2026 venue list found this session; established regional art-press
  title. No access quirk.
- **The Beat (Bangkok)** (`thebeat.asia`, English) — appears to be a
  BK Magazine-adjacent city title; carried its own BAB 2026 writeup.
  Worth confirming its relationship to BK Magazine before treating as a
  fully independent second English source.
- **My Modern Met** (`mymodernmet.com`, English) — international art/
  design blog; ran a BAB 2026 preview. Aggregator-adjacent — useful for
  a second opinion, not a primary.

### Tier 3 Brazil — seeding pass, 2026-09-03

Ran to clear the hold on the six Tier 3 cities (Florianópolis, Porto
Alegre, Curitiba, Belo Horizonte, Recife, Salvador). Before this pass,
**all six had zero entries in either sources file** — the tier existed
on paper and had nothing behind it.

**Feeds found and verified.** One watchable feed per city minimum, all
fetched 2026-09-03: `matinal.org` and `sul21.com.br` (Porto Alegre),
`plural.jor.br` and `curitibacult.com.br` (Curitiba),
`underfloripa.com.br` (Florianópolis), `marcozero.org` (Recife),
`correionago.com.br` (Salvador), `bhaz.com.br` (Belo Horizonte). All are
in `sources.md` with per-source notes.

**Access quirk worth generalising: two of the best sources look dead to
a bare `curl`.** `sul21.com.br/feed/` returns 502 and
`plural.jor.br/feed/` returns 403 with no User-Agent, and both return
200 with a browser UA. Brazilian independents run aggressive bot
filters. **A bare-curl failure is not evidence a Brazilian source is
dead** — retry with a UA before retiring anything in this region.

**Rejected, with reasons** (so the next pass doesn't re-litigate):
`guiafloripa.com.br` — feed resolves, newest item 2025-11-13, fails the
90-day rule. `culturalizabh.com.br` and `revistaencontro.com.br` — no
feed at either `/feed` or `/feed/`, 404. `otempo.com.br` — no feed found
at the obvious paths; it is also a mainstream daily, so it was not worth
a browser session. The expat/SEO listicle layer (`viajali`,
`grupodicas`, hotel blogs) fails the editorial bar outright, same as in
Bangkok.

**Candidate pins, by city.** These are *leads*, not verified pins —
`near-write-article`'s research floor still applies to every one.

- **Porto Alegre** (strongest): Caos Bar, Rua João Alfredo, Cidade Baixa
  — motto "música independente ou morte". Espaço Cultural 512, same
  street, an atelier turned MPB/forró/samba room. Bar Ocidente. Butikin
  Hifi, Av. Independência — vinyl-only listening room in its original
  1960s building, reopened 2024.
- **Curitiba**: 92 Graus The Underground Pub, São Francisco — staging
  original bands since 1991, and locally described as the city's most
  traditional alternative music house. Changes, R. Presidente Carlos
  Cavalcanti 1138 — reopened 2026 in a historic corner. Harvest Folk
  Bar, São Francisco.
- **Salvador**: Discodelia Pub & Records, Rua do Meio 141, Rio Vermelho
  — pub and record shop in one, exactly Near-shaped. SAN, R. Conselheiro
  Pedro Luiz 488, Rio Vermelho — LGBTQIA+ nightlife anchor. Casa da
  Felicidade, Rua da Paciência, Rio Vermelho.
- **Florianópolis**: Coffeeshop Club, R. Manoel Severino de Oliveira
  592, Lagoa da Conceição. Caverna Bugio, Centro Histórico. ⚠️
  Underground Rock Bar surfaces constantly in search and is **historic,
  not current** — the 2026 hits are tribute nights held elsewhere. Do
  not draft it as a live venue.
- **Recife**: Cais do Sertão, Armazém 10, Recife Antigo. Caixa Cultural
  Recife. Flowers Records, Boa Vista — ⚠️ the only citation found is a
  2013 blog post; confirm it still exists before drafting.
- **Belo Horizonte** (weakest): Discoteca Pública, R. Hermilo Alves 134,
  Santa Tereza — strong on Minas music specifically. Old Bar, Santa
  Tereza — live music and drag, run by a same-sex couple. Bar Museu,
  Santa Tereza.

**No AAN member exists anywhere in Brazil** — the directory is 126 North
American titles plus one in Sydney, the same wall Bangkok hit. But
unlike Bangkok, Brazil has a real substitute: **AJOR**, the national
association of independent digital journalism. Matinal, Plural and Marco
Zero all belong to that world. Next Brazilian pass should work the AJOR
membership list the way earlier passes worked the AAN directory.

**Structural finding for the operator.** The sourcing quality is *not*
even across the six, and it does not track city size. Porto Alegre,
Curitiba, Recife and Salvador each have a declared, funded, genuinely
independent local outlet. **Belo Horizonte — the largest of the six —
has the thinnest independent layer of any of them**, and BHAZ is a
provisional stand-in rather than a real find. If the tier is ordered by
readiness rather than by population, BH goes last.
