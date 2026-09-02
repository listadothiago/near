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
- `qlist.app` — venue-listing aggregator for LGBTQIA+ nightlife (used to
  cross-verify AMUSE Beach Club's address/hours, 2026-09-01). Worth
  checking again next time a Baixada Santista or São Paulo LGBTQIA+
  venue needs verification, not yet formally onboarded off one hit.
- Instagram `@amuseclub` — AMUSE Beach Club's own account, active with
  a live September 2026 event calendar; the same current-status-check
  pattern already used for `@crisdoquiosque`. Worth the same "check
  before any statusHistory update" treatment near-caretaker gives that
  account.
- Instagram `@cantodosursos520` — Canto dos Ursos's own account
  (bear-community karaoke bar, Praia Grande), 18.3K followers, posting
  multiple times a week; the primary source for that place's address,
  hours, and event calendar (found while writing
  `content/places/canto-dos-ursos-praia-grande`, 2026-09-01). Worth
  checking for Praia Grande LGBTQIA+ nightlife generally, not just this
  one venue's own currency checks — same `nightlife-sound`/
  `lgbtq-friendly` beat as `@amuseclub`/`@crisdoquiosque`.
- Canto dos Ursos's own site (`sites.google.com/cantodosursos.club`) —
  found alongside the Instagram above; a Google Sites page, not
  fetchable via the normal `WebFetch` path (redirects to a Google login
  wall), so any future check of it needs `claude-in-chrome` or a
  logged-in fetch instead of the default tool.
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

## Notes for `near-refresh`

- Work Tier 1 first, every run, regardless of what else is planned.
- Tier 2 only when the run's destination/beat matches.
- A source that goes stale (feed dead, site redesigned, stops covering
  actual places) should be flagged here and in `sources.md`
  (`status: paused`), not silently skipped run after run.
