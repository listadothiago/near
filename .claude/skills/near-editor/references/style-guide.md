# Voice and content selection

## What Near is for

Near exists to make someone standing on a street want to walk somewhere.
Not "here is a museum that exists" — "here is why this specific block is
worth your next hour." Every page should earn a second read from someone
who found it via social media and has no particular reason to keep
scrolling.

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
