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

## Notes for `near-refresh`

- Work Tier 1 first, every run, regardless of what else is planned.
- Tier 2 only when the run's destination/beat matches.
- A source that goes stale (feed dead, site redesigned, stops covering
  actual places) should be flagged here and in `sources.md`
  (`status: paused`), not silently skipped run after run.
