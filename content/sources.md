# Near — Source Catalog

Canonical list of feeds Near watches. The `near-editor` skill parses the YAML
block below — edit this file directly to add, pause, or remove a source.

Every source has a `trust` tier:

- `auto` — curated by the operator; `near-editor` may generate and commit
  content from these automatically, gated only by `content/rules.md`.
- `review` — anything surfaced through the `near-inbox` (visitor
  submissions) or an ad-hoc chat request. `near-editor` always writes these
  as `status: draft` and never auto-commits them to the published set,
  regardless of how well they score against the rules.

Launch set is deliberately small and varied (see Stage 1 in the project
plan) — chosen to exercise both the clean-RSS path and the
Chrome-automation fallback path, plus the geocoding and hero-image chains.
The full catalog (~24 feeds) gets added here once the pipeline is proven.

```yaml
sources:
  - id: the-stranger
    name: "The Stranger"
    category: city-culture
    region: us-seattle
    language: en
    feedUrl: "https://www.thestranger.com/rss"
    feedType: rss
    trust: auto
    status: active
    # Operator suggestion, 2026-08-31. Seattle alt-weekly and one of the
    # clearest living examples of the register near-editor's style guide
    # points at — opinionated city coverage, real politics, nightlife and
    # arts written from inside the scene. Verified publishing and serving
    # a working RSS feed before being added. Seattle isn't a Tier 1 hub,
    # so treat it as a voice reference and an occasional source rather
    # than a destination feed to work every run.

  - id: atlas-obscura
    name: "Atlas Obscura"
    category: world-culture-news
    region: global
    language: en
    feedUrl: "https://www.atlasobscura.com/feeds/latest"
    feedType: rss
    trust: auto
    status: active

  - id: eater-national
    name: "Eater"
    category: food-drink
    region: us
    language: en
    feedUrl: "https://www.eater.com/rss/index.xml"
    feedType: rss
    trust: auto
    status: active

  - id: timeout-london
    name: "Time Out London"
    category: city-culture
    region: uk
    language: en
    feedUrl: "https://www.timeout.com/london/blog/feed.rss"
    feedType: rss
    trust: auto
    status: active

  - id: catraca-livre
    name: "Catraca Livre"
    category: city-culture
    region: br
    language: pt-BR
    feedUrl: "https://catracalivre.com.br/feed/"
    feedType: rss
    trust: auto
    status: active
    notes: >
      Feed has historically been unreliable. If the RSS fetch fails or
      returns malformed XML, near-editor should fall back to
      claude-in-chrome navigation against the site's listing pages.

  - id: resident-advisor
    name: "Resident Advisor — News"
    category: nightlife-sound
    region: global
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: "No classic RSS feed — near-editor must use the Chrome-automation fallback against ra.co/news."

  - id: juicy-santos
    name: "Juicy Santos"
    category: city-culture
    region: br
    language: pt-BR
    feedUrl: "https://www.juicysantos.com.br/feed/"
    feedType: rss
    trust: auto
    status: active
    notes: >
      Covers Santos and the Baixada Santista (coastal São Paulo state
      region), including a "Praia Grande" section
      (juicysantos.com.br/praia-grande/) and an Instagram-only offshoot
      (@juicy.praiagrande) — "Juicy Praia Grande" is not a separate site
      with its own feed, it's part of this same outlet. Don't add it as a
      distinct source entry.

  - id: a-tribuna
    name: "A Tribuna"
    category: world-culture-news
    region: br
    language: pt-BR
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      Santos's main daily newspaper. No discoverable RSS feed as of
      2026-08-27 (checked /feed and the homepage <link> tags, both came up
      empty) — near-editor must use the Chrome-automation fallback against
      the site's own section pages.

  - id: teatro-clube-da-eskyna-instagram
    name: "Teatro Clube da Eskyna — Instagram (@teatroclubedaeskyna)"
    category: nightlife-sound
    region: br
    language: pt-BR
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      The venue's own Instagram account — verified 2026-08-27 by reading a
      linked post directly (instagram.com/p/DchOD52Rhjh/) and confirming it
      was posted by @teatroclubedaeskyna itself. This is the venue's actual
      events calendar (see the note on teatro-clube-da-eskyna-santos: there's
      no separate site with listings). No RSS; near-editor must use the
      Chrome-automation fallback against the account's post grid. Event
      announcements here are prime candidates for expirable event pins
      (meta.eventEndsAt) rather than updates to the venue's own evergreen
      page. Don't hotlink Instagram's own CDN for hero images — treat it the
      same as any other source with no stably-hostable image.

  - id: sf-standard
    name: "SF Standard"
    category: city-culture
    region: us
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      San Francisco digital newsroom, strong on restaurant/bar openings
      with real specificity (named chefs, exact addresses, on-record
      quotes) — a good fit for Near's "current and alive" content bias.
      No discoverable public RSS feed as of 2026-08-27; near-editor should
      use the Chrome-automation fallback against its restaurant-openings
      roundup pages. Article og:image tags are usable as source-tier hero
      images with attribution back to the specific article.

  - id: the-oaklandside
    name: "The Oaklandside"
    category: city-culture
    region: us
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      Nonprofit East Bay newsroom (Cityside), sister publication to
      Berkeleyside — same organization, same articles often run on both
      sites, don't add Berkeleyside as a separate distinct source. Strong,
      specific restaurant/bar coverage for Oakland. No discoverable public
      RSS feed as of 2026-08-27; use the Chrome-automation fallback.
      Article images are credited to named photographers and usable
      source-tier with attribution.
```

## Categories

- `travel` — Travel & Luxury
- `world-culture-news` — World & Culture News
- `city-culture` — City & Culture
- `food-drink` — Food & Drink
- `nightlife-sound` — Nightlife & Sound
- `wellness-fitness` — Wellness & Fitness

## Notes for `near-editor`

- Only `status: active` sources are read on a run.
- `feedType: html-extract` or a failed/malformed `rss` fetch both route to
  the same fallback: `claude-in-chrome` navigation + text extraction
  against the source's own listing page.
- A source with `feedUrl: null` always uses the fallback path.
