# Do Not Disturb — Near's accommodation column

**Byline: NITE-PORTER.** House column for the accommodation beat
(`near-editor-accommodation`), same model as Near's other standing
columns — one editor owns continuity and the quality bar, but defers to
whichever cast member actually fits a given issue's material if that's
ever the better call.

## Mandatory guidance step — near-seo + near-trendsetter (RADAR-X), every issue

Same standing rule as every other Near column
(`content/editorial-column.md`, `content/the-setlist.md`,
`content/ladies-and-gentlethem.md`, `content/gastronomic-column.md`): no
issue gets scoped solo. Consult `near-seo` for the query/market gap this
issue fills and `near-trendsetter`/RADAR-X for what's actually current,
together, before settling the theme. Confirmed working 2026-09-08 on
issue #1: the two roles surfaced a real connecting thread across already-
published hotel pages — "hotels that are honest, or not, about what's
happening below the room" — rather than a theme invented from tags alone.

## Mandatory guidance step — near-illustrator, every issue

**Added 2026-09-08, operator directive.** `near-illustrator` is consulted
on the visual package for every Do Not Disturb issue, not just the
text — this is a standing addition to the normal per-piece hero/in-body
call, specific to how this column's visuals work:

- **Hero:** because an issue is usually a comparison across several
  venues rather than a single place, the hero is normally an **original
  editorial illustration** (per near-illustrator's "editorial freedom"
  rule — abstract, artistic or humorous, not required to depict any one
  venue), not a photo of one featured hotel standing in for all of them.
  Riso/flat-colour vector-derived style is the house default absent a
  stronger specific idea. A visual pun on the column's own title ("Do
  Not Disturb" signage, a night-porter's bell, a room key) is fair game
  and has been the strongest idea so far.
- **Chart/diagram:** actively consider a vector-derived `<FlowDiagram>`-
  style graphic (live markup, never a raster — see near-illustrator's
  diagram rules) whenever an issue's real claim is a **comparison or a
  spectrum** — e.g. a "sells silence → sells the noise" axis placing that
  issue's hotels along it. Only run one when it makes a claim the prose
  doesn't already make as well; skip it when the comparison is simple
  enough that a paragraph does the job.
- **Photo gallery:** this column has a standing, narrow exception to
  near-illustrator's normal high bar for galleries. Because a Do Not
  Disturb issue by construction features **multiple already-published
  Near place pages**, each with its own cleared, attributed hero image,
  an issue that covers more than one venue **defaults to a gallery built
  from those existing place-page hero images** — one frame per featured
  hotel, each carrying its original attribution and licence note
  unchanged. This satisfies near-illustrator's own gallery test without
  new sourcing or generation: the images already exist, are already
  rights-checked, and a multi-venue comparison piece genuinely rewards
  seeing each place rather than only reading about it. Do not generate
  new gallery images to pad this out, and do not build a gallery for a
  single-venue issue — the normal high bar still applies there.

## Publishing path — always the normal pipeline

**Operator directive, 2026-09-08:** every Do Not Disturb issue ships
through `near-write-article`, the same shared pipeline as every other
Near piece — no shortcut version for this column. That means the full
sequence still applies on top of the two mandatory guidance steps above:
sourcing/fact-check even when drawing on already-published pages (recheck
mutable facts, don't re-litigate settled research), near-seo + aeo QA,
the google-discover-audit feed check, near-tov-police + near-legal-counsel
+ chief editor sign-off, all six locales via near-translator, the
mechanical publish gates, and the git push.

## Cadence and format

Not yet fixed to a schedule (contrast the weekly editorial column) —
issue cadence follows genuine material, per near-trendsetter's normal
standard, and `near-refresh` should treat a real cross-venue thread
surfaced during its research pass as a candidate issue rather than
forcing one. Structural home: `content/collections/`, one entry per
issue, tying to the real place pages it discusses via `placeSlugs`.

## Issue log

- **Issue 1 (scoped 2026-09-08, not yet published):** "hotels honest, or
  not, about what's below the room." Core: Central Station (King's
  Cross), Legends Hotel (Brighton Kemptown), Michelberger Hotel (Berlin
  Friedrichshain). Closing foil: Hazlitt's (Soho) — the one place that
  actually sells silence. The Pilgrm (Paddington) considered and held for
  a future issue about hotels that removed something on principle — a
  different axis (sustainability, not noise) that would have muddied
  this issue's thread.
