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

### santos-guaiuba-de-bike — hero for CICLOVIA's Santos → Guaiúba route piece

```
Mid-century travel-poster illustration of a stylized, schematic coastal
bike route map, 16:9 aspect ratio, viewed from a high oblique angle so
the coastline reads as a map but the landscape still has depth.

Composition, left to right: a long curving city beachfront on the left,
drawn as a simple arc of pale sand with a strip of green park running
its whole length and a row of flat, blocky pastel apartment towers
behind it. The towers cluster densest at the left end of the arc, where the
route begins, thinning out toward the headland point where the arc ends. From that point, a wide
blue-green water channel cuts diagonally across the middle of the frame,
with two or three enormous flat-silhouette container ships stacked with
tiny coloured cargo boxes moving through it, plus a small blunt-nosed
car ferry crossing perpendicular to them. On the right bank, low green
hills covered in dense tropical forest, rising steeper toward the back
of the frame. Nestled into those hills on the far right, a small
sheltered cove beach with calm water and two or three tiny flat
silhouettes of stand-up paddleboarders standing upright on boards.

Running across the whole scene, a single bold continuous route line —
solid, confident, one unbroken stroke — tracing from the left beachfront,
along the green strip, to the headland point, across the water on the
ferry, and over the hills to the cove. Mark four or five points along the
line with simple flat geometric dots or circles. No text labels of any
kind on the markers.

Style: mid-century modern travel poster / vintage railway tourism poster
reduction. Flat blocked colour with hard edges, heavily simplified
geometric shapes, subtle paper grain and slight ink misregistration.
Limited palette: warm cream/sand, deep teal and ocean blue, forest and
olive green, burnt orange, with a single acid/lime green used only for
the route line so it pops against everything else. Slightly muted,
printed-poster colour, not digital-bright.

Must not look like a real photograph and must not look like a screenshot
of a real digital map application — no satellite imagery, no photographic
texture, no realistic water reflections, no 3D rendering, no glossy
airbrushed "AI art" finish. Flat poster colour blocking only.

Absolutely no legible text, letters, numbers, road numbers, place names,
compass roses with letters, or scale bars anywhere in the image. No real,
identifiable people — the paddleboarders and any other figures are
anonymous flat silhouettes with no facial features. No real company
logos, shipping-line branding, or brand marks on the container ships.
```

Reason: CICLOVIA's debut piece is a route with stops (Santos beachfront →
Ponta da Praia ferry terminal → across the Port of Santos channel →
Guarujá side → Guaiúba cove). `near-illustrator` lists "a route" and "a
comparison or a sequence" as the strongest cases for generating rather
than sourcing — an illustrated route map does argumentative work a photo
of any single stop cannot, and there is no existing photograph that shows
the route as a route. Style deliberately varied away from the riso
default, which is already carrying `the-setlist-2026-10`.

Note the container ships are not decoration: the balsa crosses the working
channel of Latin America's largest port, and that crossing is the piece's
hook. Keep them large in frame.

Drop the result in `content/photo-inbox/` with a filename containing
`santos-guaiuba`. Wire it in with `strategy: "illustration"`,
`attribution: "Illustration by NEAR — AI-generated"`, `attributionLink`
pointing at `/about`, then remove this entry.
