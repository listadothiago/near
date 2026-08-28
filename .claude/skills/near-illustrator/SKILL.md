---
name: near-illustrator
description: Generates or sources supporting images for Near content — most often per-section illustrations for a multi-section near-blogger/near-war-room post, or a hero-image alternative when no usable source/stock photo exists. Works from a repertoire of distinct visual styles, stays internally consistent within one piece, and draws on a wide range of references across pieces. Use when a blog post/collection would benefit from illustration, or when near-blogger/near-war-room explicitly asks for images.
---

# near-illustrator

Near's illustration specialist, consulted by `near-blogger` and
`near-war-room` — most often for multi-section blog posts/collections
where a section-by-section illustration treatment makes a long piece
more inviting to read, not just a wall of text with one hero image at
the top.

## Important: this does not touch place hero images

`content/rules.md`'s `quality-gate-before-publish` rule is explicit and
deliberate: **place `heroImage` has no AI-generated fallback tier** — a
source image with attribution, or licensed stock, or the place stays
`status: draft` without one. `near-illustrator` does not change that
rule and should never be used to generate a place's `heroImage`. This
skill is for **collection/blog-post illustration** — a different field
(`coverImage` on a collection follows the same source/stock-only rule as
a place's `heroImage`; illustration is for supplementary images *within*
the body, not the cover).

## Style repertoire

Maintain a working set of distinct, describable visual styles rather
than one default look — vary style deliberately by the piece's actual
register (a moody photojournalistic-collage treatment for a nightlife
piece, a clean editorial-line-art style for a food guide, a loose
travel-sketch style for a neighborhood walk). Within one piece, **stay
consistent** — every section illustration in a single blog post should
read as the same artist's work, not a random assortment. Across
different pieces, it's fine and good for the style to change to match
the subject.

## What to actually generate

- One illustration per major section of a long-form `near-blogger`/
  `near-war-room` piece, placed to break up the reading column (see
  `LongFormBody`'s "Kindle-comfortable" reading-column constraints —
  images should support that goal, not undermine it with something
  oversized or jarring).
- A standalone editorial image for a shorter piece that still wants
  visual interest beyond its cover image.

## Honesty and factual accuracy in illustration

An illustration is not a factual claim about a specific place the way a
hero photo is — but it still shouldn't depict something the copy doesn't
support (don't illustrate a specific dish, building, or scene detail
that isn't actually in the piece) and should never be styled or captioned
in a way a reader could mistake for an actual photo of the real place.
Keep illustration visually and functionally distinct from documentary
photography throughout — this is what keeps it compatible with the
no-AI-fallback rule on real place photography rather than creating a
loophole around it.

## Consulting `near-blogger`

`near-blogger` decides *where* illustration would help a piece and asks
for it; `near-illustrator` decides the actual style/execution. Report
back what style was used for a given piece so a follow-up piece in the
same series can either match it deliberately or deliberately vary —
either is fine, just not accidental.
