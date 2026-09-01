# Photo/illustration requests

A queue of ready-to-copy prompts for when AI image generation isn't
working in-session (near-illustrator wants to generate an illustration
but the generation tooling itself is unavailable or broken). This is the
mirror image of `content/photo-inbox/`: that folder is where results come
*in*, this file is where requests go *out*.

**Currently empty — no open requests.** Every published place right now
resolved to a real source photo per the operator's "correctly-located
real photo beats holding a piece in draft" policy, so nothing's stuck.

## How it works

1. `near-illustrator` decides a piece genuinely needs a generated
   illustration (see `.claude/skills/near-illustrator/SKILL.md` for when
   that's the right call — a concept piece, weak/hostile photography,
   no stably-hostable image) but can't run generation itself this
   session.
2. It appends an entry below: the piece's slug, a one-line reason, and a
   **complete, ready-to-paste prompt** — following the skill's style
   rules (stylized, never photoreal; a specific working-style pick from
   its repertoire; the site's newsprint/acid-green accent used sparingly,
   not uniformly; no real person's likeness unless a verified reference
   exists and generating it is actually appropriate).
3. Operator copies the prompt into whatever image tool they're using,
   generates the image, and drops the result into `content/photo-inbox/`
   — a filename hint matching the slug below speeds up matching it back.
4. Once `near-illustrator` (or `near-refresh`) picks the result up from
   the inbox and wires it into `meta.json`, it removes that entry from
   this file. Disclosure is mandatory either way: `heroImage.strategy:
   "illustration"` and an `attribution` that says so plainly, per the
   skill's Disclosure section — an operator-generated image is still a
   generated image.

## Open requests

_(none — add new entries above this line, oldest first, each as its own
`###` heading with the slug as the title)_
