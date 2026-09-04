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

Launch set (the first 11 entries below) was deliberately small and varied
(see Stage 1 in the project plan) — chosen to exercise both the
clean-RSS path and the Chrome-automation fallback path, plus the
geocoding and hero-image chains.

**2026-09-01 catalogue expansion:** per the operator's ASAP directive
(see BACKLOG.md, "Sources catalogue"), the AAN (Association of
Alternative Newsmedia) member directory was fetched live from
`aan.org/member-directory/` and every member outlet with a working
homepage URL shown in the directory was added below (prefixed `aan-`),
plus a first pass of six non-US alt-press equivalents (UK, Germany,
Mexico, Australia/NZ, Japan). None of these ~96 new entries have a
verified RSS feed yet — they're all `feedType: html-extract` until
`near-editor`/`near-sources` confirms a working feed or the
Chrome-automation fallback on first real use, and `near-sources` should
pause any that turn out dead, squatted, or off-beat on that first
check. ~10 AAN directory rows had no URL listed at all (The Pitch KC,
Volume One, Queen City Nerve, American Prospect, Pittsburgh Current,
Dallas Voice, BlueDot Living, Sydney City Hub, Yellow Scene) — still
open, need a manual lookup pass.

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
  - id: aan-arkansas-times
    name: "Arkansas Times"
    category: city-culture
    region: us-arkansas
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Arkansas. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.arktimes.com — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-austin-chronicle
    name: "Austin Chronicle"
    category: city-culture
    region: us-austin-tx
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Austin TX. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.austinchronicle.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-boise-weekly
    name: "Boise Weekly"
    category: city-culture
    region: us-boise-id
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Boise ID. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.boiseweekly.com — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-boulder-weekly
    name: "Boulder Weekly"
    category: city-culture
    region: us-boulder-co
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Boulder CO. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.boulderweekly.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-c-ville-weekly
    name: "C-Ville Weekly"
    category: city-culture
    region: us-charlottesville-va
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Charlottesville VA. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.c-ville.com — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-charleston-city-paper
    name: "Charleston City Paper"
    category: city-culture
    region: us-charleston-sc
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Charleston SC. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.charlestoncitypaper.com — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-chicago-reader
    name: "Chicago Reader"
    category: city-culture
    region: us-chicago-il
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Chicago IL. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.chicagoreader.com — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-chico-news-review
    name: "Chico News & Review"
    category: city-culture
    region: us-chico-ca
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Chico CA. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      https://chico.newsreview.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-cincinnati-citybeat
    name: "Cincinnati CityBeat"
    category: city-culture
    region: us-cincinnati-oh
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Cincinnati OH. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.citybeat.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-city-magazine
    name: "CITY Magazine"
    category: city-culture
    region: us-rochester-ny
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Rochester NY. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://roccitynews.org — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-city-pulse
    name: "City Pulse"
    category: city-culture
    region: us-lansing-mi
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Lansing MI. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.lansingcitypulse.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-cleveland-scene-magazine
    name: "Cleveland Scene Magazine"
    category: city-culture
    region: us-cleveland-oh
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Cleveland OH. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.clevescene.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-coachella-valley-independent
    name: "Coachella Valley Independent"
    category: city-culture
    region: us-coachella-valley-ca
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Coachella Valley CA. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.cvindependent.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-colorado-springs-independent
    name: "Colorado Springs Independent"
    category: city-culture
    region: us-colorado-springs-co
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Colorado Springs CO. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.csindy.com — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-creative-loafing-tampa
    name: "Creative Loafing Tampa"
    category: city-culture
    region: us-tampa-fl
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Tampa FL. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://cltampa.com — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-dallas-observer
    name: "Dallas Observer"
    category: city-culture
    region: us-dallas-tx
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Dallas TX. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.dallasobserver.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-east-bay-express
    name: "East Bay Express"
    category: city-culture
    region: us-east-bay-ca
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, East Bay CA. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.eastbayexpress.com — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-erie-reader
    name: "Erie Reader"
    category: city-culture
    region: us-erie-pa
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Erie PA. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.eriereader.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-eugene-weekly
    name: "Eugene Weekly"
    category: city-culture
    region: us-eugene-or
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Eugene OR. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.eugeneweekly.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-flagpole-magazine
    name: "Flagpole Magazine"
    category: city-culture
    region: us-athens-ga
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Athens GA. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.flagpole.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-folio-weekly
    name: "Folio Weekly"
    category: city-culture
    region: us-jacksonville-fl
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Jacksonville FL. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.folioweekly.com — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-gambit
    name: "Gambit"
    category: city-culture
    region: us-new-orleans-la
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, New Orleans LA. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.bestofneworleans.com — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-good-times-santa-cruz
    name: "Good Times Santa Cruz"
    category: city-culture
    region: us-santa-cruz-ca
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Santa Cruz CA. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.gtweekly.com — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-houston-press
    name: "Houston Press"
    category: city-culture
    region: us-houston-tx
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Houston TX. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.houstonpress.com — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-illinois-times
    name: "Illinois Times"
    category: city-culture
    region: us-springfield-il
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Springfield IL. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.illinoistimes.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-indy-week
    name: "INDY Week"
    category: city-culture
    region: us-durham-nc
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Durham NC. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.indyweek.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-inlander
    name: "Inlander"
    category: city-culture
    region: us-spokane-wa
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Spokane WA. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.inlander.com — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-isthmus
    name: "Isthmus"
    category: city-culture
    region: us-madison-wi
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Madison WI. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.isthmus.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-mississippi-free-press
    name: "Mississippi Free Press"
    category: city-culture
    region: us-jackson-ms
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Jackson MS. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.jacksonfreepress.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-lagniappe
    name: "Lagniappe"
    category: city-culture
    region: us-mobile-al
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Mobile AL. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.lagniappemobile.com — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-las-vegas-weekly
    name: "Las Vegas Weekly"
    category: city-culture
    region: us-las-vegas-nv
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Las Vegas NV. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://lasvegasweekly.com — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-leo-weekly
    name: "LEO Weekly"
    category: city-culture
    region: us-louisville-ky
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Louisville KY. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.leoweekly.com — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-little-village
    name: "Little Village"
    category: city-culture
    region: us-iowa-city-ia
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Iowa City IA. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://littlevillagemag.com — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-memphis-flyer
    name: "Memphis Flyer"
    category: city-culture
    region: us-memphis-tn
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Memphis TN. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.memphisflyer.com — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-metro-silicon-valley
    name: "Metro Silicon Valley"
    category: city-culture
    region: us-san-jose-ca
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, San Jose CA. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://metroactive.com — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-metro-times
    name: "Metro Times"
    category: city-culture
    region: us-detroit-mi
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Detroit MI. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.metrotimes.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-miami-new-times
    name: "Miami New Times"
    category: city-culture
    region: us-miami-fl
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Miami FL. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.miaminewtimes.com — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-monterey-county-weekly
    name: "Monterey County Weekly"
    category: city-culture
    region: us-monterey-ca
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Monterey CA. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.montereycountyweekly.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-mountain-xpress
    name: "Mountain Xpress"
    category: city-culture
    region: us-asheville-nc
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Asheville NC. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.mountainx.com — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-nashville-scene
    name: "Nashville Scene"
    category: city-culture
    region: us-nashville-tn
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Nashville TN. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.nashvillescene.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-north-bay-bohemian
    name: "North Bay Bohemian"
    category: city-culture
    region: us-north-bay-ca
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, North Bay CA. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.bohemian.com — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-north-coast-journal
    name: "North Coast Journal"
    category: city-culture
    region: us-humboldt-county-ca
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Humboldt County CA. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.northcoastjournal.com — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-oklahoma-gazette
    name: "Oklahoma Gazette"
    category: city-culture
    region: us-oklahoma-city-ok
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Oklahoma City OK. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.okgazette.com — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-orlando-weekly
    name: "Orlando Weekly"
    category: city-culture
    region: us-orlando-fl
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Orlando FL. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.orlandoweekly.com — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-palo-alto-weekly
    name: "Palo Alto Weekly"
    category: city-culture
    region: us-palo-alto-ca
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Palo Alto CA. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.paloaltoonline.com — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-phoenix-new-times
    name: "Phoenix New Times"
    category: city-culture
    region: us-phoenix-az
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Phoenix AZ. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.phoenixnewtimes.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-the-portland-mercury
    name: "The Portland Mercury"
    category: city-culture
    region: us-portland-or
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Portland OR. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.portlandmercury.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-random-lengths-news
    name: "Random Lengths News"
    category: city-culture
    region: us-long-beach-ca
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Long Beach CA. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.randomlengthsnews.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-reno-news-review
    name: "Reno News & Review"
    category: city-culture
    region: us-reno-nv
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Reno NV. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      https://reno.newsreview.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-sacramento-news-review
    name: "Sacramento News & Review"
    category: city-culture
    region: us-sacramento-ca
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Sacramento CA. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      https://sacramento.newsreview.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-salt-lake-city-weekly
    name: "Salt Lake City Weekly"
    category: city-culture
    region: us-salt-lake-city-ut
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Salt Lake City UT. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.cityweekly.net — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-san-antonio-current
    name: "San Antonio Current"
    category: city-culture
    region: us-san-antonio-tx
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, San Antonio TX. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.sacurrent.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-san-diego-citybeat
    name: "San Diego CityBeat"
    category: city-culture
    region: us-san-diego-ca
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, San Diego CA. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://sdcitybeat.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-san-diego-reader
    name: "San Diego Reader"
    category: city-culture
    region: us-san-diego-ca
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, San Diego CA. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.sandiegoreader.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-new-times-slo
    name: "New Times SLO"
    category: city-culture
    region: us-san-luis-obispo-ca
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, San Luis Obispo CA. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.newtimesslo.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-santa-barbara-independent
    name: "Santa Barbara Independent"
    category: city-culture
    region: us-santa-barbara-ca
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Santa Barbara CA. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.independent.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-santa-fe-reporter
    name: "Santa Fe Reporter"
    category: city-culture
    region: us-santa-fe-nm
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Santa Fe NM. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.sfreporter.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-seven-days
    name: "Seven Days"
    category: city-culture
    region: us-burlington-vt
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Burlington VT. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.sevendaysvt.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-shepherd-express
    name: "Shepherd Express"
    category: city-culture
    region: us-milwaukee-wi
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Milwaukee WI. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.expressmilwaukee.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-source-weekly
    name: "Source Weekly"
    category: city-culture
    region: us-bend-or
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Bend OR. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.bendsource.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-style-weekly
    name: "Style Weekly"
    category: city-culture
    region: us-richmond-va
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Richmond VA. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.styleweekly.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-toledo-city-paper
    name: "Toledo City Paper"
    category: city-culture
    region: us-toledo-oh
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Toledo OH. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.toledocitypaper.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-washington-city-paper
    name: "Washington City Paper"
    category: city-culture
    region: us-washington-dc
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Washington DC. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.washingtoncitypaper.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-the-paper
    name: "The Paper"
    category: city-culture
    region: us-albuquerque-nm
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Albuquerque NM. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      https://abq.news/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-westword
    name: "Westword"
    category: city-culture
    region: us-denver-co
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Denver CO. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.westword.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-willamette-week
    name: "Willamette Week"
    category: city-culture
    region: us-portland-or
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Portland OR. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.wweek.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-yes-weekly
    name: "YES! Weekly"
    category: city-culture
    region: us-greensboro-nc
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Greensboro NC. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.yesweekly.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-chronogram
    name: "Chronogram"
    category: city-culture
    region: us-hudson-valley-ny
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Hudson Valley NY. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      https://www.chronogram.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-pacific-sun
    name: "Pacific Sun"
    category: city-culture
    region: us-marin-county-ca
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Marin County CA. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      https://pacificsun.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-smoky-mountain-news
    name: "Smoky Mountain News"
    category: city-culture
    region: us-western-nc
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Western NC. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      https://smokymountainnews.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-vallejo-sun
    name: "Vallejo Sun"
    category: city-culture
    region: us-vallejo-ca
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Vallejo CA. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      https://www.vallejosun.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-watermark
    name: "Watermark"
    category: city-culture
    region: us-orlando-fl
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Orlando FL. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      https://watermarkonline.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-philadelphia-gay-news
    name: "Philadelphia Gay News"
    category: city-culture
    region: us-philadelphia-pa
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Philadelphia PA. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      https://epgn.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-dallas-weekly
    name: "Dallas Weekly"
    category: city-culture
    region: us-dallas-tx
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Dallas TX. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      https://dallasweekly.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-open-vallejo
    name: "Open Vallejo"
    category: city-culture
    region: us-vallejo-ca
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Vallejo CA. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      https://openvallejo.org/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-the-frisc
    name: "The Frisc"
    category: city-culture
    region: us-san-francisco-ca
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, San Francisco CA. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      https://thefrisc.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-tucson-sentinel
    name: "Tucson Sentinel"
    category: city-culture
    region: us-tucson-az
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Tucson AZ. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      https://www.tucsonsentinel.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-planet-detroit
    name: "Planet Detroit"
    category: city-culture
    region: us-detroit-mi
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Detroit MI. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      https://planetdetroit.org/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-windy-city-times
    name: "Windy City Times"
    category: city-culture
    region: us-chicago-il
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Chicago IL. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      https://windycitytimes.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-the-lens
    name: "The Lens"
    category: city-culture
    region: us-new-orleans-la
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, New Orleans LA. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      https://thelensnola.org/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-stet-news
    name: "Stet News"
    category: city-culture
    region: us-palm-beach-fl
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Palm Beach FL. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      https://www.stetnews.org/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-santa-maria-sun
    name: "Santa Maria Sun"
    category: city-culture
    region: us-santa-maria-ca
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Santa Maria CA. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      https://www.santamariasun.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-the-jersey-vindicator
    name: "The Jersey Vindicator"
    category: city-culture
    region: us-new-jersey
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, New Jersey. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      https://jerseyvindicator.org/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-bucket-list-community-news
    name: "Bucket List Community News"
    category: city-culture
    region: us-us
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, US. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      https://bucketlistcommunitycafe.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-baltimore-beat
    name: "Baltimore Beat"
    category: city-culture
    region: us-baltimore-md
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Baltimore MD. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      https://baltimorebeat.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-the-daily-catch
    name: "The Daily Catch"
    category: city-culture
    region: us-brooklyn-ny
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Brooklyn NY. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://thedailycatch.org/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-georgia-voice
    name: "Georgia Voice"
    category: city-culture
    region: us-atlanta-ga
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Atlanta GA. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://www.thegavoice.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-rural-intelligence
    name: "Rural Intelligence"
    category: city-culture
    region: us-us
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, US. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      https://ruralintelligence.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-lookout
    name: "LOOKOUT"
    category: city-culture
    region: us-phoenix-az
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, Phoenix AZ. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      https://www.lookoutphx.org/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: aan-black-belt-news-network
    name: "Black Belt News Network"
    category: city-culture
    region: us-us-south
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      AAN (Association of Alternative Newsmedia) member, US South. Added from
      the live aan.org/member-directory fetch on 2026-09-01. Homepage:
      http://blackbeltnewsnetwork.com/ — no RSS feed verified yet; near-editor should confirm a
      working feed or use the Chrome-automation fallback against the
      site's own listing pages before first use, and near-sources should
      pause this entry if the site turns out dead or squatted.

  - id: the-skinny-scotland
    name: "The Skinny"
    category: city-culture
    region: uk-scotland
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      Independent (Radge Media C.I.C.) culture/entertainment magazine
      covering Glasgow, Edinburgh, and Dundee — genuinely alt-weekly in
      register, not a syndicated listicle site. First non-US pass added
      2026-09-01. No RSS verified; use the Chrome-automation fallback
      against theskinny.co.uk's listings.

  - id: the-berliner
    name: "The Berliner (formerly Exberliner)"
    category: city-culture
    region: de-berlin
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      Berlin's independent English-language culture/politics magazine,
      self-financed since 2002. Renamed from Exberliner to The Berliner
      in 2024 — site is the-berliner.com (exberliner.com may still
      redirect). First non-US pass added 2026-09-01. No RSS verified;
      use the Chrome-automation fallback.

  - id: chilango
    name: "Chilango"
    category: city-culture
    region: mx-mexico-city
    language: es
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      Mexico City culture/nightlife/restaurant guide, launched 2003 as a
      Time-Out-style local equivalent, independently owned since 2017.
      First non-US pass added 2026-09-01. No RSS verified; use the
      Chrome-automation fallback against chilango.com.

  - id: broadsheet-australia
    name: "Broadsheet"
    category: city-culture
    region: au
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      Independent Australian city-culture/food-drink magazine covering
      Melbourne, Sydney, Adelaide, Perth, and Brisbane. First non-US
      pass added 2026-09-01. No RSS verified; use the Chrome-automation
      fallback against broadsheet.com.au.

  - id: metropolis-japan
    name: "Metropolis Japan"
    category: city-culture
    region: jp-tokyo
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      Independently owned English-language Tokyo/Kanto culture magazine,
      the largest-distribution English publication in Japan. First
      non-US pass added 2026-09-01. No RSS verified; use the
      Chrome-automation fallback against metropolisjapan.com.

  - id: concrete-playground
    name: "Concrete Playground"
    category: city-culture
    region: au-nz
    language: en
    feedUrl: null
    feedType: html-extract
    trust: auto
    status: active
    notes: >
      Digital city guide covering Sydney, Melbourne, Brisbane, Perth,
      Auckland, and Wellington. First non-US pass added 2026-09-01. No
      RSS verified; use the Chrome-automation fallback against
      concreteplayground.com.

  # --- Tier 3 Brazil seeding pass, 2026-09-03 ---
  # One watchable local feed per Tier 3 city. Every feedUrl below was
  # fetched on 2026-09-03 and returned a <pubDate> from the last 48h
  # unless noted. See preferred-sources.md for the reasoning and the
  # rejects.

  - id: matinal
    name: "Matinal"
    category: city-culture
    region: br
    language: pt-BR
    feedUrl: "https://www.matinal.org/feed/"
    feedType: rss
    trust: auto
    status: active
    notes: >
      Porto Alegre. Reader-funded, non-profit, explicitly independent —
      the closest thing Near has to an alt-weekly in southern Brazil.
      Runs "Agendão", a weekly cultural listings product, which is the
      part near-events wants. Feed verified 2026-09-03.

  - id: sul21
    name: "Sul 21"
    category: world-culture-news
    region: br
    language: pt-BR
    feedUrl: "https://sul21.com.br/feed/"
    feedType: rss
    trust: auto
    status: active
    notes: >
      Porto Alegre. Independent, not tied to the big economic groups,
      with a standing /editoria/agenda/ culture desk. ACCESS QUIRK: the
      feed 502s without a browser User-Agent and returns 200 with one —
      it is a bot filter, not an outage. Do not retire it on a bare-curl
      failure. Verified 2026-09-03.

  - id: plural-curitiba
    name: "Plural"
    category: city-culture
    region: br
    language: pt-BR
    feedUrl: "https://www.plural.jor.br/feed/"
    feedType: rss
    trust: auto
    status: active
    notes: >
      Curitiba and Paraná. Crowdfunded via Catarse in 2019, takes no
      public advertising money, funded by subscribers — an unusually
      clean independence statement. Publishes many times a day. ACCESS
      QUIRK: 403s without a browser User-Agent, same shape as sul21.
      Verified 2026-09-03.

  - id: curitiba-cult
    name: "Curitiba Cult"
    category: city-culture
    region: br
    language: pt-BR
    feedUrl: "https://curitibacult.com.br/feed/"
    feedType: rss
    trust: auto
    status: active
    notes: >
      Curitiba's cultural agenda. Listings-grade rather than editorial —
      use it for dated programming, not for a point of view. Verified
      2026-09-03.

  - id: under-floripa
    name: "Under Floripa"
    category: nightlife-sound
    region: br
    language: pt-BR
    feedUrl: "https://underfloripa.com.br/feed/"
    feedType: rss
    trust: auto
    status: active
    notes: >
      Florianópolis. Weekly agenda of the local and independent music
      scene — the only Floripa outlet found that covers the underground
      rather than the tourist calendar. Verified 2026-09-03.

  - id: marco-zero-conteudo
    name: "Marco Zero Conteúdo"
    category: world-culture-news
    region: br
    language: pt-BR
    feedUrl: "https://marcozero.org/feed/"
    feedType: rss
    trust: auto
    status: active
    notes: >
      Recife. Independent, non-profit, investigative — strongest on
      urban and social coverage of Pernambuco, thinner on nightlife.
      Best used for context and for the city's own arguments about
      itself, not as a listings feed. Verified 2026-09-03.

  - id: correio-nago
    name: "Correio Nagô"
    category: city-culture
    region: br
    language: pt-BR
    feedUrl: "https://correionago.com.br/feed/"
    feedType: rss
    trust: auto
    status: active
    notes: >
      Salvador. Portal of the Instituto Mídia Étnica; Black Brazilian
      press, human rights and Afro-Bahian culture. Academic mappings of
      Brazilian Black media single it out for collaborative reporting
      and independent sourcing. For Salvador this is not one source
      among several — covering the city's culture from the commercial
      dailies alone would misrepresent it. Verified 2026-09-03.

  - id: bhaz
    name: "BHAZ"
    category: city-culture
    region: br
    language: pt-BR
    feedUrl: "https://bhaz.com.br/feed/"
    feedType: rss
    trust: auto
    status: active
    notes: >
      Belo Horizonte. Digital-native local outlet, publishes daily, feed
      verified 2026-09-03. WEAKEST of the seven — it is a local news
      site rather than a declared independent in the sense Matinal,
      Plural, Marco Zero and Correio Nagô are, and BH's ownership
      picture was not established this pass. Treat as provisional and
      re-examine before BH's first turn.
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
