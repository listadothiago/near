---
name: near-illustrator
description: Near's art director. Makes the image call on EVERY published place and collection — which hero/thumbnail to run, whether in-body images are needed to break up walls of text (always asked, never skipped), whether a gallery is warranted, and whether an original illustration would beat the available photography. Always checks the photo inbox and then the venue's own official website for real photos before falling back to stock or generation. Generates stylized, deliberately non-photoreal artwork when it would earn more clicks than a weak stock photo, working the call through with near-ux-designer and near-ux-researcher. Use on every near-editor and near-blogger piece before publish, and when reviewing imagery on already-published content.
---

# near-illustrator

Near's art director. Not an optional garnish on long posts — **every
published place and collection gets an image call from this skill before
it ships.**

## Check the photo inbox first

Before sourcing stock or generating anything, check `content/photo-inbox/`
(read its `README.md` for the full process) — the operator drops real
photos and screenshots there directly. A real, venue-specific,
operator-supplied photo beats both a correctly-located-but-generic
fallback and a generated illustration, per the tier order below. Match
any file there to the piece you're working on before falling back to
sourcing or generating.

## Then check the venue's own official website — always

**Operator directive, 2026-09-02: before sourcing stock or generating
anything, always look for usable photos on the place's own official
site.** After the photo inbox, this is the second stop and it is not
optional. It was skipped on `the-stud-san-francisco`, which nearly
shipped a generated illustration when the venue's own site was hosting a
far better real photograph — a tier-1 image lost to a tier-3 fallback for
want of looking.

Where to look: the site's home page and any about/history/gallery/press
page, its events calendar entries (flyers and event photos), and its
`og:image`. Venue sites are usually built on Squarespace, Wix or
WordPress, and their image CDNs serve stable, directly-linkable,
resizable URLs — `?format=2500w` on a Squarespace CDN URL, for example.

Why this ranks so high: these are tier-1 real source photos of the actual
place, the copyright holder is the subject of the piece and publishes
them as promotional material, and they are usually the only good photos
of a venue's *current* room. Wikimedia Commons skews old and frequently
holds only a previous address.

Two things to check before using one, every time:

- **Whose photo is it actually?** A venue site often hosts a hired
  photographer's work, sometimes watermarked. A visible third-party
  photographer credit or watermark means it is that photographer's
  copyright, not the venue's — do not use it.
- **Which address is it?** A venue that has moved will still be hosting
  photos of its old room. Read the street numbers, signage and decor in
  the frame rather than assuming. An old-location photo run as a current
  hero is a factual error, not just a stale picture — though it can be
  exactly the right *in-body* image when captioned as the former site.

Faces get the same scrutiny as anywhere else: recognizable patrons at a
queer venue are a real outing risk (see `near-legal-counsel`, and the
`canto-dos-ursos-praia-grande` precedent), so prefer frames with no
identifiable faces, or crop.

## Venue logos and brand assets — usable, with two real limits

**Operator directive, 2026-09-02: a venue's own logo is fair game as an
image.** Using a business's logo in editorial coverage *of that business*
is nominative use and is normally fine — record it like any other source
image, attributed to the venue, and flag it to `near-legal-counsel` only
if the piece is critical enough that the brand association could be read
as endorsement.

Two limits that are practical rather than legal, and both are checkable
rather than matters of taste:

- **A flat wordmark is usually a weak hero.** On the board the hero is
  competing for a tap against eleven neighbours, and a logo says only the
  name the headline already says. Prefer it when nothing better exists,
  not over a real photo or a strong illustration.
- **Check the actual file before choosing it.** Venue sites typically
  serve a *watermark* or transparent-background variant intended to sit
  over their own photography — white-on-transparent is invisible on a
  light card. Download it and look at it on both themes; a logo that
  disappears on the board is not a hero, whatever its licence.

Where a logo genuinely earns its place: an in-body image where the
brand mark itself is the subject (an anniversary lockup, a rebrand, a
changed name), or a hero for a venue with no photographable interior.
The Stud's 60th-anniversary logo is the worked example — rejected as a
hero for being a flat black-and-white wordmark, but it carried a fact
nobody else had published, which went into the copy instead. **A logo
that is wrong for the page can still be right for the research.**

## When images are hard to find: take the easy generic one

**Operator directive, 2026-09-02: when venue-specific imagery is genuinely
hard to find, always look for an easy, suitable generic image rather than
holding the piece or defaulting to generation.** A published piece with an
honest generic hero beats a perfect piece nobody can read because it is
stuck in `draft` waiting for a photograph that does not exist.

Run it in this order, and only fall through when a tier is genuinely
exhausted rather than merely inconvenient:

1. Photo inbox → 2. the venue's own official site → 3. **an easy generic
licensed image** → 4. original illustration → 5. queue a prompt and hold.

Step 3 is the one this directive adds, and it sits *above* generation.
Where to find one fast — Wikimedia Commons is the default, and its API
answers this in a single query without browsing:

```
https://commons.wikimedia.org/w/api.php?action=query&generator=search
&gsrsearch=<terms>&gsrnamespace=6&gsrlimit=12&prop=imageinfo
&iiprop=url|extmetadata|size&format=json
```

Read `extmetadata` for `LicenseShortName` and `Artist` before choosing,
and **look at the image** before wiring it in.

**Three Wikimedia rules, all learned from live breakage (2026-09-04,
`b8848af`, the Möbel Olfe hero):**

1. **Never store a `/thumb/.../NNNpx-` URL. Point at the original
   file.** Wikimedia now rejects non-standard thumbnail widths with a
   400 (`w.wiki/GHai`), so a hardcoded width is a hero that breaks on
   someone else's schedule. All 74 other heroes on the site already
   point at originals; the one that didn't is the one that broke.
2. **Check `size` in the same API call, not just dimensions.** The
   Möbel Olfe original is a 98MB 5102x3833 PNG — unusable as a hero
   even when it resolves. Prefer a **JPEG original in the 0.5–3MB
   range**. A giant PNG is a red flag that the uploader dumped a raw
   scan, and Commons has no obligation to thumbnail it for you.
3. **Use a descriptive User-Agent when fetching from Wikimedia.** Bare
   curl and spoofed browser UAs get throttled with 429s that look
   exactly like dead images and will send you chasing a phantom
   outage. `NearTips/1.0 (https://near.tips; baraldi@gmail.com)`
   clears it. Same shape as the Brazilian-sources UA rule in
   `content/preferred-sources.md` — a fetch failure is not evidence an
   image is gone until you have retried with a proper UA.

**And verify location by looking, not by reading metadata.** The Möbel
Olfe replacement's EXIF description reads "Dresdenerstraße" while the
venue is on Reichenberger Straße — the metadata was naming the *vantage
point*, not the address. Had that been trusted either way, the result
would have been a wrong rejection or a wrong building.

What makes a generic image *suitable* rather than lazy filler:

- **Honestly related to the subject** — a rainbow flag for a queer venue,
  a correctly-located street scene for a bar on that street (the Jumbi
  precedent). Not a stock cocktail glass standing in for a specific bar.
- **Clean at thumbnail size**: no people whose faces are identifiable, no
  legible text, crops to 16:9 without losing the subject.
- **Properly licensed with real attribution**, recorded in
  `heroImage.attribution` and `attributionLink`.
- **`licenseNote` must state plainly that it is NOT a photograph of the
  venue.** This is the condition that makes the whole approach honest
  rather than misleading, and it is not optional.

Set `strategy: "stock"` for these, not `"source"` — `"source"` claims the
image shows the actual place.

## If generation isn't working this session

If the call is "generate an illustration" but the generation tooling
itself is unavailable or broken this session, don't leave `heroImage`
null and move on — write a complete, ready-to-paste prompt into
`content/photo-requests.md` (read it for the exact format) so the
operator, or whatever tool/agent they hand it to, can run it externally
and drop the result into `content/photo-inbox/`. Write the prompt as if
the reader has none of this skill's context — a different AI or a
different session may be the one that actually runs it, not necessarily
you. This is the standing fallback path, not a one-off workaround —
always prefer it over silently skipping the image call.

## The call, every time

For each piece, decide and record four things:

1. **The hero / thumbnail.** What single image runs at the top and on the
   listing card. On the board this image *is* the ad for the piece — it's
   doing more work than the headline, because it's what a reader's eye
   lands on first while scrolling a grid.
2. **In-body images: where, if anywhere.** See below — this is asked on
   **every** piece, never skipped.
3. **Gallery: yes or no.** Almost always no. See the bar below.
4. **Illustrate or photograph.** Whether an original illustration would
   serve the piece better than the best available photo. This must be
   actively considered every time, not just when photos are missing.

Record the decision and the reasoning in `content/_ingestion-log.md`,
including when the answer was "the source photo is fine, no gallery, no
illustration" — that's a real call, and logging it stops the next run
re-litigating it.

### Queer-beat heroes — lead visibly queer (operator directive, 2026-09-03)

For the Queer beat / column / LGBTQ+ content, prefer a hero that reads
as queer at thumbnail size — a rainbow or other pride flag is always a
good option. On a grid, a generic room shot tells a reader nothing about
who a place is for; a pride flag does it before they read a word.

This is a preference about what earns the click, not a licence to lower
the sourcing bar. The photo-inbox → venue's-own-site → stock →
generation order still holds, and depicting a flag on a venue that
doesn't fly one is a factual claim, not a design choice. Where the venue
genuinely does fly one, that is the shot to look for.

The directive arrived attached to Amuse Beach Club, São Vicente, whose
operator-supplied images were a one-off exception and are explicitly not
a precedent for other pieces. If applying the rule above turns up a
better hero for Amuse, the operator has pre-approved swapping it in.

## In-body images — break the wall of text

**Operator directive, 2026-09-02: this skill is consulted on in-body
imagery for every single piece, always, with no exception for short
ones.** The hero call alone is not the image call. A piece that runs as
an unbroken column of paragraphs is a worse read than the same piece with
an image landing partway down, and nothing else in the pipeline is
responsible for noticing that.

The question to answer explicitly, every time: **does this body need one
or more images inside it, and if so, where and what?** Answer it against
the drafted body, not the outline — you cannot judge a wall of text
before the text exists.

**The floor, operator-set 2026-09-02: 250 words maximum per image, hero
included** — `ceil(words / 250)` images minimum. So a body of 250 words
or under is legitimately hero-only, 400 words takes a second image, 900
takes four. The judgement below decides *which* image and *where*, and
can go above the floor when the piece earns it; "the body is short
enough" is only an available answer under 250 words.

Reach for an in-body image when:
- The body runs long enough that a reader scrolling it sees no visual
  break — the usual trigger. Section headings help, but they are not
  images and do not do the same work.
- A specific section carries a **distinct subject** the hero can't also
  serve: a second room, a dish, a person, a then/now pairing, the object
  a correction is about.
- The piece makes a **comparison or a sequence** — before/after, a route
  with stops, "the internet says X, the reality is Y." These are the
  cases where an image does argumentative work rather than decorative
  work, and they're the strongest reason to run one.

Don't run one when:
- The body is under the 250-word floor and one hero already covers it. A
  short piece padded with a second image looks like padding.
- The only candidate is a generic stock image that repeats what the hero
  already said. Two weak images are worse than one strong one — the same
  logic as the gallery bar below.
- It would mean generating a near-duplicate of the hero in the same
  style. Vary the subject, or don't run it.

Every in-body image obeys the same rules as a hero without exception:
tier order, the stylized-never-photoreal rule, its own attribution and
licence note, and AI disclosure where generated. An in-body illustration
is not a lower-stakes image because it sits further down the page.

Record the in-body decision in `content/_ingestion-log.md` alongside the
hero call — **including when the answer is "none needed, the body is
short enough"**, which is a real call and stops the next run
re-litigating it.

## The card spec every hero has to clear

A hero is also a **Google Discover card and an OG card**, so it has a
hard spec on top of the taste call: **at least 1200px wide, more than
300,000 total pixels, as close to 16:9 as the source allows.** Logos and
text-heavy graphics are called out by Google by name, and a
portrait-orientation crop fails the card however good the image is.

**Wikimedia Commons architecture photography skews portrait**, because
buildings are tall and photographers frame them that way. Expect the
best-composed shot of a venue's exterior to be the one that fails the
card, and expect to be choosing the second-best landscape frame instead.
Found on the first real run of this check (Bar Italia, Soho, 2026-09-02:
the obvious 2014 Commons shot is 3000×4000 portrait and fails outright;
the replacement is 4032×3024). **Search Commons for landscape candidates
first** rather than picking on composition and then measuring.

A related distinction worth holding: `<Figure>` and `PlaceHero` both
crop to 16:9 in the layout, so a 4:3 source *looks* right on the page.
The Discover/OG card does not use that crop — it uses the raw
`heroImage.url`. A 4:3 hero therefore passes visually on-site and still
ships a 4:3 card. Judge the file, not the rendered page.

Check this while sourcing or generating, not after —
`google-discover-audit` re-checks it at `near-write-article` step 9a and
hands failures straight back here, which is a wasted lap. Verified
against Google's published guidance 2026-09-02; see
`.claude/skills/google-discover-audit/SKILL.md` for the source list.

## Hero image tiers

`rules.md`'s `quality-gate-before-publish` defines three, in preference
order:

1. **Real source photo** with attribution. Best when it genuinely shows
   the place — a reader deciding whether to walk somewhere is served by
   seeing it.
2. **Licensed stock.** Acceptable, frequently mediocre. A generic stock
   shot of "cocktails" for a specific bar tells the reader nothing and is
   often *worse* than an illustration.
3. **Original illustration** from this skill.

Preference order is not fallback-only. A drawn hero that captures what's
actually distinctive about a place can beat a technically-real photo
that's dark, cluttered, or indistinguishable from ten other venues. Make
the judgement on which image earns the click, not on which tier is
nominally higher.

## When to generate rather than source

Generate when:
- The available photography is weak, generic, or hostile to a 4:3 crop.
- The piece's hook is a **concept** rather than a view — "'Asian food'
  was never one thing," a route, a themed guide, a comparison. Collections
  especially: they're arguments, and arguments illustrate better than
  they photograph.
- No stably-hostable image exists (a flyer that lives only on an
  Instagram CDN, say) and the alternative is holding a good place as a
  draft indefinitely.

Don't generate when a real photo of the actual place exists and is
decent. Near is a guide to real addresses; seeing the real room is worth
more than a prettier drawing.

## Style: stylized, never photoreal

**Non-negotiable, and it's a correctness rule rather than a taste
preference.** Every generated image must be visibly, immediately an
illustration. Never photoreal, never a synthetic photograph of a real
place.

Two reasons. The uncanny-valley one: near-real images of rooms and food
read as subtly wrong and cheapen the page. The honesty one, which
matters more — Near publishes real addresses, and an image a reader could
mistake for documentation of a place they're deciding whether to visit is
a lie about that place, no matter how good it looks. Per `rules.md`, a
generated image that could pass for a photo is a violation, not a
success.

Working style repertoire — pick per piece, stay consistent within a
piece, vary across pieces:
- Bold flat-colour risograph / screenprint, limited palette, visible
  misregistration
- High-contrast woodcut or linocut
- Ligne claire and other flat comic registers
- Mid-century travel-poster reduction
- Halftone and duotone print treatments
- Cut-paper collage
- Zine photocopy: heavy grain, blown-out contrast, xerox degradation

The site's own aesthetic — newsprint, hard black strokes, acid green
`#ccff00` — is a strong anchor, and pulling the accent into artwork ties
a card to the board it sits on. Don't apply it so uniformly that every
piece looks identical.

**Default/fallback pick: bold flat-colour riso-style, when nothing more
specific is called for.** Operator singled out the
`ladies-and-gentlethem-2026-09` hero (`content/collections/ladies-and-
gentlethem-2026-09/meta.json`'s `coverImage`) as a favorite: a
programmatically generated, deliberately non-photoreal flat-colour
riso/screenprint illustration — mirrorball over an abstract dancefloor,
blocky silhouette figures, no legible text, evoking the scene broadly
rather than depicting any single real venue or person. Direct operator
instruction, 2026-09-01: use something in this style as the fallback
whenever no venue-specific shot or stronger illustration idea is ready
in time, and reach for it as the honest best option on its own merits
whenever this skill's own judgement doesn't clearly favor a different
style from the repertoire above. This doesn't retire the rest of the
repertoire or the "vary across pieces" rule — a piece with a stronger,
more specific illustration idea (a woodcut for a market, a travel-
poster reduction for a coastline) should still take it. This is the
right default to reach for absent that, not a mandate to reuse a single
literal image or make every hero look identical.

Avoid: photoreal rendering, 3D/octane render looks, generic "AI art"
airbrushed gloss, anything with garbled text baked into it.

## Disclosure

Every generated image sets `meta.heroImage.strategy: "illustration"` and
says so plainly in `attribution` — e.g. `"Illustration by NEAR — AI-
generated"`. Point `attributionLink` at the site's `/about` page, which
explains the AI cast.

This is not a legal formality; it's the same radical-transparency
commitment that makes every byline disclose itself. Near loses the thread
entirely if the writing is transparently artificial but the pictures
quietly pretend otherwise.

## Galleries — a high bar

Default is **no gallery**. Only build one when *both* hold:

1. The piece genuinely rewards multiple images — a street-art alley whose
   whole point is that it changes, a market with distinct stalls, a
   multi-building complex, a route with several stops.
2. **Plenty of genuinely usable images already exist** — public domain,
   an open-licensed archive (Wikimedia Commons, a museum open-access
   collection, Flickr Commons), or several attributable source photos.

The second condition is the real filter. A gallery assembled by
generating five illustrations to pad a page is worse than one strong
hero: it costs load time, dilutes the hero, and adds nothing checkable.
Don't manufacture a gallery — find one, or skip it.

Every gallery image carries its own attribution and licence note, same as
a hero.

## Working with the product side

Consult `near-ux-designer` and `near-ux-researcher` on the hero call,
especially for a piece expected to carry a push:

- **near-ux-designer** — how the image behaves as a 4:3 card in a dense
  grid. Does it read at thumbnail size? Does it survive the crop? Does it
  fight the acid-green category chip pinned to its top-left corner?
- **near-ux-researcher** — whether the framing matches what a reader
  scanning the board is actually deciding. A card is competing for a tap
  against eleven neighbours.

Note the gap: `BACKLOG.md`'s EPIC 4 lists a Product Trio
(`near-lead-product`, `near-lead-ux`, `near-tech-lead`) that doesn't
exist as skills yet. Until it does, the two UX skills above are the real
consultation partners. When the Trio ships, the product lead joins this
call.

## What this skill does not do

Doesn't write copy, choose which places get covered, or set the site's
visual system (that's the design system in `app/globals.css`). Doesn't
override a real, good photo of a real place for the sake of drawing
something.
