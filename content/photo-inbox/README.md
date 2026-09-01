# Photo inbox

Drop real photos or screenshots here — of a specific place, a scene, a
flyer for a dated event, anything operator-sourced that near-illustrator
or near-editor might want. This is the operator's own equivalent of
`content/requests.md`: a queue, not an archive.

## How to use it

Just save the file into this folder. No naming convention is required,
but a filename hint (a place slug, a city, "quiosque-da-cris" style)
speeds up matching — if you know which piece it's for, say so in the
filename or leave a note in `_inbox-notes.md` (create it if it doesn't
exist) with the filename and context.

## How it gets drained

`near-illustrator` checks this folder at the start of every run (its own
image-decision pass on a piece) and `near-refresh` checks it once per
full pass. For each file:

1. Match it to a place/collection (by filename hint, or by asking the
   operator if genuinely ambiguous).
2. If it's a real, usable, venue-specific photo: this beats both a
   generic-but-correctly-located fallback photo and a generated
   illustration, per `near-illustrator`'s hero-image tier order. Straighten/
   crop as needed (note any edit in the `licenseNote`), copy it into
   `public/places/<slug>/` (or `public/collections/<slug>/` for a
   collection), and wire it into that piece's `meta.json` `heroImage`
   with `attribution: "Photo courtesy of the operator"` and
   `attributionLink` pointing at `/about`.
3. Once used, move the original out of this folder (delete it — it's
   preserved in git history via the commit, and duplicating it under
   `public/` is enough) so the inbox stays a queue of *unprocessed*
   drops, not a growing photo library.
4. If a file can't be matched to any existing or planned piece, leave it
   here and log a one-line note in `_inbox-notes.md` so the next pass
   doesn't have to re-investigate from scratch.

## Why this exists

Operator-sourced venue-specific photos are the best possible hero image —
better than a correctly-located-but-generic fallback, and better than a
generated illustration, per the existing tier order in
`.claude/skills/near-illustrator/SKILL.md`. Before this inbox existed,
getting a photo from the operator into the repo required an ad hoc
back-and-forth mid-session (find where it landed on disk, confirm
orientation, etc.) — this folder makes "just drop it somewhere I'll find
it" a standing, low-friction path instead of a one-off.
