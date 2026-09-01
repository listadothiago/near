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

## Notes for `near-refresh`

- Work Tier 1 first, every run, regardless of what else is planned.
- Tier 2 only when the run's destination/beat matches.
- A source that goes stale (feed dead, site redesigned, stops covering
  actual places) should be flagged here and in `sources.md`
  (`status: paused`), not silently skipped run after run.
