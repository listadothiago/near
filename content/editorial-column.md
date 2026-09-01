# Near's weekly editorial column

**Decision (2026-09-01, operator confirmed):** the inaugural piece,
["The Zombie Listicle
Problem"](collections/zombie-listicle-problem/en.mdx), is not a one-off —
Near now runs a **recurring weekly editorial column**, in `near-editor`'s
own house voice (even-keeled register, not `near-blogger`'s fiercer
individual-columnist voice — this is the *masthead* speaking, not one
byline). Structural home is a `content/collections/` entry per the
same reasoning as the inaugural piece (schema.ts's own "editorial story"
framing), tying honestly to real places wherever the argument supports
it, per `collectionMetaSchema`'s `placeSlugs.min(1)` requirement.

**Audience note (operator, 2026-09-01):** write with an eye toward being
genuinely shareable on LinkedIn — a somewhat more professional-leaning
readership than Near's usual alt-weekly crowd. This shifts register
slightly (an argument that holds up in front of people who work in
travel/media/hospitality, not just people looking for a bar), but it's
still unmistakably *Near's* voice and specifically the chief editor's
own — not a corporate-blog register, not near-blogger's fiercer
individual-columnist voice either. Think "the kind of sharp, opinionated
industry take a media professional forwards to a colleague," not
"thought leadership." The honesty, sourcing, and willingness to say an
uncomfortable thing about Near's own process (per the inaugural piece)
stay exactly as demanding as before — this is a register adjustment, not
a softening.

## Cadence

One column per week. `near-refresh` checks this file every run (see its
own SKILL.md) and, if more than 7 days have passed since the last
published entry below, treats writing the next one as this run's
priority near-editor task — consulting `near-seo` + RADAR-X together for
the topic, per Near's standing content-decision process, exactly like
the inaugural piece was scoped. Don't force a column if nothing genuine
turned up that week; a real gap in the log is more honest than a forced
entry, but should be rare — near-refresh's own research pass routinely
surfaces exactly this kind of pattern (dead listings, a recurring theme
across sources, a real editorial opinion worth having).

## Column editor: RADAR-X

**Clarified 2026-09-01 (operator):** RADAR-X is this column's editor,
not a fixed byline that must sign every issue — same model as every
Near column editor (RUCIO LIBERO for The Setlist, and any future one):
**write it personally or defer to whichever persona actually fits that
week's material, editor's own call.** RADAR-X wrote the inaugural piece
himself because the alt-press-harvester beat was the natural fit for a
column about listicle rot; a future week might genuinely call for
someone else's voice (PARSER, if the week's real hook is an AI-content-
tooling story; a specialist advisor lens; another cast member entirely).
Being the column's editor is not the same job as being that week's
article writer — RADAR-X owns the column's continuity and quality bar,
the byline on any given issue is whoever actually earns it that week.

## What makes a good entry

Same bar as the inaugural piece: grounded in something Near's own
research actually ran into that week (not an invented hook), genuinely
opinionated (Near's whole premise is a transparently artificial cast
with real points of view, not a neutral aggregator), honest about
Near's own limitations where relevant, sourced and fact-checked like
any other piece, ties to real places where the argument naturally
supports it rather than forcing a plug.

**Standing structure, from the second entry onward (operator directive,
2026-09-01):** every column is still one piece, chosen and written by
the chief editor with whichever specialist skills/consultancies the
topic actually needs (near-seo, RADAR-X, a specialist advisor lens,
etc. — same joint scoping as the inaugural piece) — but from here on it
routinely covers, in whatever proportion the week's material actually
supports:

1. **The opinion itself** — same bar as above, the column's actual
   argument.
2. **A recap of the scene reflected in that week's own recent posts** —
   what pattern, mood, or throughline shows up across what Near
   actually published recently (a geographic push, a recurring theme
   across bylines, what a run of new places says about a scene right
   now). This is Near looking at its own output and finding the
   throughline, not inventing a trend from nothing.
3. **An honest look at the AI-content-creation process and the wider
   AI-in-content scene** — how Near's own pipeline is actually working
   (or where it's straining), and what's happening more broadly in
   AI-generated/AI-assisted content as a space. When this surfaces a
   genuine best practice — something Near does, or sees done well
   elsewhere, that's worth another outlet or reader adopting — say so
   plainly and specifically, not as a vague "AI is changing things"
   aside. This is Near being transparent about its own machinery, which
   is the same radical-transparency commitment behind every byline's
   AI disclosure, applied to the column format itself.

Not every week needs all three in equal weight — some weeks the real
opinion piece IS the AI-process story (like the inaugural piece was,
in effect). Use judgment on proportion; don't force a mechanical
three-section template onto material that doesn't naturally split that
way. But the recap-of-the-scene and AI-process/best-practice threads
should be a running presence in the column over time, not a one-off.

**PARSER (added 2026-09-01)** is the standing consultant to invite into
point 3 above whenever it needs a specialist voice rather than the
masthead speaking generically about "AI in content" — an AI-content-
industry specialist (`lib/content/authors.ts`, consultant tier, same as
ROVER-5/Eli The DEI Guy: named and quotable, no place-writing beat of
its own). Not mandatory every week — only when the AI-process thread
would genuinely benefit from a real specialist's read (a tooling shift,
a failure mode worth naming, a genuine best practice), same standard as
any other quoted collaboration per `style-guide.md`'s "Quoting
collaborating personas" rule. Quote PARSER by name in the body when
consulted, same as any other specialist lens.

**Update (2026-09-01, later same day) — reverses the line above.**
Operator decided the inaugural piece should in fact be rewritten to the
LinkedIn-shareable/professional-audience register above, rather than
staying untouched as a historical record. See BACKLOG.md's open threads
for the scoped task. Facts, sourcing, and the honest AI-process framing
that made the original piece work should carry over — this is a
register/audience rewrite, not a re-reporting.

## Site placement

A `COLUMN` link sits in the header nav (same visual weight as
Tips/Guides/Sources/About — a nav link, not a homepage banner or hero;
operator's explicit call, 2026-09-01, after trying a few more prominent
options). It always resolves to whichever entry is currently latest via
`app/[locale]/column/page.tsx`, which reads
`content/editorial-column-index.json`'s `slugs` array and
redirects to `/collection/<slug>`.

**Whoever flips a column entry's `meta.json` `status` from `draft` to
`active` must also prepend its slug to
`content/editorial-column-index.json`'s `slugs` array** — the nav
link 404s (by design, via `notFound()`) as long as the index is empty or
only lists slugs that aren't actually active yet, rather than ever
pointing at unpublished content. Keep this file and the Series Index
below in sync.

## Series index

Chronological, most recent first. Each entry: title, slug, publish
date, one-line topic.

1. **"The Zombie Listicle Problem"** — `zombie-listicle-problem` —
   published 2026-09-01. Outdated "best of" listicles recommending
   permanently-closed venues; Near's verify-before-and-after-publish
   discipline as the actual differentiator.
