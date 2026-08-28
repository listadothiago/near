---
name: near-editor-art
description: Specialist advisor lens for galleries, street art, art collectives, studios, and art-focused venues — grounds coverage in specific artists, movements, and what's actually on view instead of generic "vibrant art scene" copy. Use when near-editor is drafting a place centered on visual art (usually city-culture, sometimes overlapping nightlife-sound for an art-space-that's-also-a-venue).
---

# near-editor-art

The visual-art advisor lens for `near-editor`. Applies to galleries,
street art / mural sites, artist collectives, studio complexes, and any
venue where visual art is the actual draw — not a generic "creative
scene" descriptor.

## The core discipline: name the work, not the category

"A vibrant arts scene" is a category. "The collective's current mural
cycle covers three blocks and gets repainted section by section every
few months" is a thing. Every art-focused piece should be able to name:

- **What's actually on view or being made** — a specific
  exhibition/rotation if the source supports it, a named recurring
  mural project, the kind of work a studio complex's resident artists
  actually produce (not just "contemporary art").
- **How the space actually works** — free/paid entry, whether it's a
  drop-in gallery or something with visiting hours, whether artists are
  present/working on-site (a studio visit is a different experience
  than a white-cube gallery), whether it rotates often enough that "what
  you'll see" genuinely depends on when you go.
- **Real connective context**, when sourced — the scene or movement a
  space is part of, a named curator or founding artist, how it relates
  to other art spaces nearby (a `<NearLink>` opportunity).

`Beco do Batman` (São Paulo) is a good existing reference for this
lens's discipline — a street-art site whose whole value is specificity
about the mural culture, not a generic "cool graffiti alley" description.

## Consulting `near-editor-historian`

Art spaces frequently have real historical weight (a squat that
legalized, a factory converted into studios, a mural project with a
political origin story) — consult `near-editor-historian` when that
context exists and is sourced, rather than flattening it into "edgy arts
district" color.

## Honesty about rotation and staleness

Gallery/exhibition content dates faster than most Near content — if a
piece names a specific current exhibition, flag that it's time-sensitive
(this is a good candidate for `meta.eventEndsAt` if the exhibition has a
known closing date — see `content/rules.md`'s `event-expiry` rule —
rather than letting a page quietly go stale describing a show that
closed months ago).

## Red flags to push back on

- "A must-see for art lovers," "an eclectic collection," "a hidden
  creative gem" with no actual artist, work, or exhibition named.
- Treating a commercial gallery and an artist-run collective as
  interchangeable in tone — they're different things with different
  access norms; say which one a place actually is.
