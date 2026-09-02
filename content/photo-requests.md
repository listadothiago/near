# Photo/illustration requests

A queue of ready-to-copy prompts for when AI image generation isn't
working in-session (near-illustrator wants to generate an illustration
but the generation tooling itself is unavailable or broken). This is the
mirror image of `content/photo-inbox/`: that folder is where results come
*in*, this file is where requests go *out*.

## How it works

1. `near-illustrator` decides a piece genuinely needs a generated
   illustration (see `.claude/skills/near-illustrator/SKILL.md` for when
   that's the right call — a concept piece, weak/hostile photography,
   no stably-hostable image) but can't run generation itself this
   session.
2. It appends an entry below with a **fully self-contained prompt** —
   written so it can be copy-pasted as-is into *any* image tool or agent
   (Midjourney, DALL-E, Gemini, another Claude session, whatever the
   operator has on hand that session), with zero assumed context about
   this repo, this skill file, or Near itself. That means every entry
   spells out, inline, in the prompt text itself:
   - The scene/subject in concrete visual detail (not "per the piece,"
     actually describe what's in frame).
   - **Explicitly non-photorealistic** — name the specific style (bold
     flat-colour risograph, high-contrast woodcut, ligne claire,
     mid-century travel-poster, halftone/duotone, cut-paper collage, zine
     photocopy grain — pick one, don't leave it vague) and say outright
     "must not look like a real photograph."
   - Aspect ratio: **16:9** (the site's hero-image crop).
   - No real person's likeness, ever, unless the request entry explicitly
     says a verified reference photo exists and generating that person is
     genuinely appropriate — default is no recognizable real people.
   - No embedded/legible text in the image.
3. Operator (or whichever agent is handling this) runs the prompt
   externally, and drops the result into `content/photo-inbox/` — a
   filename hint matching the slug below speeds up matching it back.
4. Once `near-illustrator` (or `near-refresh`) picks the result up from
   the inbox and wires it into `meta.json`, it removes that entry from
   this file. Disclosure is mandatory either way: `heroImage.strategy:
   "illustration"` and an `attribution` that says so plainly (e.g.
   `"Illustration by NEAR — AI-generated"`), `attributionLink` pointing
   at near.tips' `/about` page — an operator-generated image is still a
   generated image and gets disclosed exactly like one generated in-app.

## Open requests

### the-setlist-2026-10 — replace the stock Interlagos racetrack photo, operator called it ugly

```
Bold flat-colour risograph / screenprint illustration, 16:9 aspect
ratio. Scene: an outdoor music festival crowd at night seen from
slightly behind and above, silhouetted concert-goers with raised arms
packed together, facing a distant stage lit by a few tall stage-light
towers throwing warm orange and hot-pink beams up into a dark sky.
Scattered flecks of confetti or light caught mid-air. Limited palette:
deep navy/black background, hot pink, acid/lime green, and warm orange
as the only accent colours, visible print misregistration and grain
texture like a screenprinted festival poster. Must not look like a real
photograph — no photographic lighting, no realistic skin/fabric texture,
flat poster-style colour blocking only. No legible text anywhere in the
image. No real, identifiable people — all figures are anonymous flat
silhouettes. No band logos, no real venue signage, no readable text of
any kind.
```

Reason: this issue's hero currently uses a real Wikimedia Commons photo
of the empty Autódromo José Carlos Pace (Interlagos) racetrack — factually
tied to the venue but visually flat/generic for a live-music piece (an
empty racetrack straightaway, no music, no crowd, no energy). Operator
flagged it directly as ugly and said even a generated image would beat
it. Swap `content/collections/the-setlist-2026-10/meta.json`'s
`coverImage` to `strategy: "illustration"` once a result lands in
`content/photo-inbox/`, with `attribution: "Illustration by NEAR — AI-
generated"` and `attributionLink` pointing at `/about`, then remove this
entry.
