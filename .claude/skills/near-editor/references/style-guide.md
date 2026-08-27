# Voice and content selection

## What Near is for

Near exists to make someone standing on a street want to walk somewhere.
Not "here is a museum that exists" — "here is why this specific block is
worth your next hour." Every page should earn a second read from someone
who found it via social media and has no particular reason to keep
scrolling.

## Attribution and honesty — non-negotiable

Every fact, quote, or observation in a Near piece traces back to a real
source, and every source used gets credited and linked — not just the
one `sources[0]` entry from the original ingestion. If, while researching
or updating a place, near-editor reads a second, third, or fourth review
or article and pulls anything from it — a detail, a quote, a data point —
that source goes into `meta.sources` (dedupe by URL, per
`dedupe-by-place`) and gets a real in-text link in the body where it's
used. Don't paraphrase a source's specific observation without linking to
it; a passing "as one reviewer put it" with no link is not attribution.

**Include the negative alongside the positive.** If a source — any
source, not just the primary one — raises a real criticism (slow service,
overpriced, declined since a change of ownership, inconsistent food,
whatever), that belongs in the piece too, honestly and specifically, not
smoothed over into vague positivity. Near is not a press release. A piece
that only ever says nice things about every place stops being trustworthy
to the reader, and trustworthiness is the entire point of linking sources
in the first place. This doesn't mean manufacturing balance where none
exists — if every source is genuinely positive, say so; the rule is
*don't suppress what's actually there*, not *always find something bad to
say*.

## Describe audiences by interest, never by age

When a piece characterizes who a place appeals to — including honestly
noting it *isn't* for everyone, per the honesty rule above — describe
that by interest, scene, or vibe ("artistically inclined," "the
nightlife crowd," "families with young kids," "serious runners"), never
by age or generation ("young people," "millennials," "an older crowd").
Age-coding a crowd reads as ageist even when the underlying observation
(a place skews toward a particular taste or scene) is accurate and worth
saying — say the real thing (what kind of interest or taste it draws)
instead of reaching for an age bracket as shorthand for it. Near is
ageless: a specific, well-observed detail about *why* a place suits one
kind of visitor over another is always available without resorting to
"young" or "old" as the explanation.

## Content bias — lean toward what's current and alive

When a source offers a choice between a well-worn landmark story and
something that reads as current, local, and specific, **prefer the
current one.** The operator has flagged this directly: Near should skew
toward recent openings, nightlife, hyped/hipster spots, restaurants,
parties, clubs, and scenes — the kind of thing a well-connected local
friend would text you about — not primarily heritage/tourist-board
content. Institutional landmarks are fine as part of the mix, not the
default.

Concretely, when scanning source items, weight upward:
- Recent openings (restaurant, bar, club, shop, gallery) — "just opened"
  or "reopened" beats "has existed forever," all else equal.
- Nightlife and music — club nights, festival lineups, DJ residencies,
  a bar with a specific and current reason to go tonight rather than
  someday.
- Scene and culture pieces — where a neighborhood's creative/food/going-out
  identity is shifting, not static.
- A specific, walkable stretch of a neighborhood, not just a single venue.

Weight downward (don't skip entirely, but don't default to it):
- Pure hard news with no place to visit (politics, disasters, market
  reports) — `world-culture-news` sources will surface plenty of this;
  most of it isn't a Near page.
- Investor relations, corporate press releases, listicle round-ups with no
  specific place.
- A landmark that's been unchanged and already well-covered everywhere —
  fine occasionally for texture, not the backbone of the catalog.

## Categories, tags, and "advisor lenses"

A place can carry more than one category (`meta.categories`) when it
genuinely spans beats, and any number of `meta.tags` when the content
actually supports them (see `content-schema.md` for the full list and the
ground rule: never assign a tag the source doesn't back up).

Different beats reward a different angle — think of these as lenses, not
separate voices to fake:
- **`food-drink`** — the gastronomic lens: specific about what's actually
  on the plate/in the glass, why this kitchen's version of a familiar
  thing is worth the trip, not just "delicious food."
- **`nightlife-sound`**, especially anything tagged `hipster`,
  `see-and-be-seen`, or `celebrity-spotted` — the insider-tastemaker lens:
  write like someone who's actually been there and knows who shows up and
  when, with real specific color (a resident DJ, a door policy, the hour
  it actually gets good) — not generic "vibrant nightlife scene" copy.
  It's fine for this lens to have personality and be a little breathless.
  It is never fine to invent who was there — no fabricated celebrity
  sightings, no imagined crowd. If the source doesn't name it, Near
  doesn't claim it.
- **`wellness-fitness`** — the practitioner lens: what you'd actually do
  there and why it's different from the studio down the block.
- **`travel-luxury`** / **`world-culture-news`** / **`city-culture`** —
  the field-guide lens: specific, walkable, grounded in the neighborhood.

A future version of Near may split these into dedicated named "advisor"
skills with more distinct voices per beat — not built yet, flagged here as
a real idea worth revisiting once there's enough published content to
tell whether one skill's voice is straining to cover every beat.

## Neighborhoods are a first-class idea

Always try to capture `place.neighborhood` in `meta.json`, not just city.
Near's editorial identity leans hard on neighborhood specificity —
"Alcântara," not just "Lisbon." When a source doesn't name a neighborhood
explicitly, it's worth the extra step (a geocode reverse-lookup, or a
`claude-in-chrome` check against a map) to find the real one rather than
leaving it blank. A long-form body should give the reader enough sense of
the neighborhood — what's around, what the walk there feels like — that
they could string two or three Near pages into an actual afternoon.

## Long-form body

Kindle-comfortable means the prose has to earn a long paragraph, not just
fill one. Concretely:

- Open with something specific and true, not a throat-clearing "nestled
  in the heart of..." sentence.
- Prefer one well-observed, concrete detail over three generic adjectives.
- It's fine — good, even — for a piece to have a point of view. "The line
  for a slice is a reasonable proxy for how busy the whole complex is that
  day" tells the reader more than "it's often crowded."
- End with a bridge outward: a `<NearLink>` to something nearby or related,
  framed as a next move, not a footnote.

## Bullets

Each bullet is a *reason*, not a fact-dump. "Housed in a 19th-century
customs warehouse on the Alfama waterfront" earns its place because it's
specific; "Has great food" doesn't, because it's true of thousands of
places and tells the reader nothing to act on.

## Taglines

Written last, after the body exists — a tagline that's true only because
it's vague is worse than a shorter, sharper one that commits to something
specific about *this* place.
