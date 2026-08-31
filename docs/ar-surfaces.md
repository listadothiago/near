# Near in AR — surfaces, and what each can actually do

Operator question, 2026-08-31: does this have to be Meta-only, or do other
AR glasses need their own spec?

**Not Meta-only — but they do need separate specs, because "AR glasses"
is three device classes with three different capability ceilings.**
Designing one AR experience for all of them produces an overlay that
can't exist on most of the hardware.

Near is unusually well placed for this: every place already carries
coordinates, a category, and a short title. That's precisely the shape an
AR view needs, and it's why most content sites can't do AR meaningfully
and Near can.

## The three classes

### 1. Heads-up display glasses
Meta Ray-Ban Display, Even Realities and similar. A small monocular
display in the corner of vision. **No world tracking, no depth, no 6DoF.**

You cannot pin content to a building here — there is no spatial
understanding to pin it to. What you can do is a card, a short list, a
compass bearing and a distance. That is exactly the constraint EPIC 3
already describes: fixed ~600×600, zero scrolling, D-pad/Neural Band
input, high-contrast dark palette for a see-through micro-display.

Realistic Near views: **browse** (nearest/latest, filters collapsed to a
single cycling control), **waypoint** (bearing arrow + distance + name).
Map browse is marginal — a map is dense and this display is not.

### 2. Screen-mirroring glasses
Xreal, Viture, Rokid. These are a large virtual monitor fed by a phone or
laptop. Currently the biggest installed base of anything called "AR
glasses", and **they need nothing special from Near** — the responsive
site already works. A wide, low-density layout is the only thing worth
considering, and the existing desktop layout is close.

Worth knowing mainly so we don't build for them by mistake.

### 3. World-tracked headsets
Quest 3/3S, Apple Vision Pro, Android XR devices. Full 6DoF tracking,
plane detection, real passthrough. **This is the only class where a true
world overlay is possible**, via WebXR `immersive-ar` with hit-testing
and anchors.

This is where "look at the street and see what Near knows about it"
genuinely works.

## What the open web actually gives us

- **WebXR Device API** (`immersive-ar`) — class 3 only. Session, pose,
  hit-test, anchors.
- **Geolocation + DeviceOrientation** — available everywhere, including
  phones. Enough to compute a bearing from the reader to a place and draw
  an arrow or a floating label at that bearing. Approximate, and drifts
  with compass error, but it is the honest 80% version of an overlay and
  it works on hardware people already own.
- **What we don't get:** browser-level *geospatial anchoring* — the thing
  that would let a label stick precisely to a real shopfront across
  sessions. ARCore's Geospatial API does this natively, not through
  WebXR. So a web-based world overlay is bearing-and-distance
  approximate, not survey-accurate. Design for that honestly rather than
  promising precision we can't deliver.

## The four views, mapped

| View | HUD glasses | Mirroring | Headsets | Phone |
|---|---|---|---|---|
| Browse (nearest/latest + filters) | Yes, redesigned | Yes, as-is | Yes | Yes (shipped) |
| Map browse | Marginal | Yes, as-is | Yes | Yes (shipped) |
| World overlay | Bearing only | No | Yes, properly | Yes, bearing-based |
| Directions to waypoint | Yes (arrow + distance) | No | Yes | Yes |

The row worth noticing is the last one. **A bearing-and-distance waypoint
view works on a phone today**, needs no glasses, and is the single most
useful thing Near could add for someone actually standing on a street.
It's also the natural prototype for the glasses version — same maths,
different rendering. Build it on the phone first, where there are users.

## Target devices (operator decision, 2026-08-31)

Constraint for picking *new* targets: **wearable outside.** But headsets
are **not excluded** — operator clarification, same day: Quest 2 and
Vision Pro are already in scope (EPIC 3 already names Quest 2 as a test
device), they're just not what the outdoor question was about.

That matters, because it puts a true anchored overlay back on the table.
The split is by *use context* rather than by device tier:

- **Outdoors, in motion** — HUD and mirroring glasses. Bearing and
  distance only. No world anchoring is possible on this hardware.
- **Indoors, stationary** — Quest 3, Vision Pro. Full WebXR
  `immersive-ar`, real anchoring. Not a street-guide context, but a
  genuine one: planning a trip, browsing a city map at wall scale,
  reading a guide in a room-scale layout.

Worth noting on Quest 2 specifically: its passthrough is low-resolution
and monochrome, so it's poor for looking *through* at the real world. It
is perfectly good as a large virtual screen, which puts it closer to the
mirroring class than to Quest 3 for our purposes.

1. **Meta Ray-Ban Display** — HUD class. The primary target, already
   scoped in EPIC 3.
2. **Xreal (Air / One series)** — mirroring class. Probably the largest
   installed base of consumer display glasses. Needs no new work beyond
   checking the existing responsive layout reads well on a large virtual
   screen at their FOV.
3. **Viture (Luma / Pro)** — mirroring class, same story as Xreal.

So of the three, only one needs real design work. That's a good outcome,
not a disappointing one: it means the effort concentrates on the HUD
build rather than being spread across three half-experiences.

**Worth raising, because it may be a bigger prize than 2 and 3 combined:**
the audio-only Ray-Ban Meta glasses (no display) have sold in far larger
numbers than any display glasses. Near on those isn't a visual surface at
all — it's voice: ask what's nearby, hear a name, a beat and a distance.
That's a genuinely different product with different content requirements
(everything must work read aloud), and it's not in scope here. But if
reach is the goal, it deserves its own evaluation rather than being
ignored because it has no screen.

_Device popularity moves fast and this file has a knowledge cutoff.
Re-check unit numbers and current model lines before committing
engineering time._

## What we can actually test

**The operator owns a Quest 2 and nothing else.** That is the single most
practical fact in this document and it should drive sequencing more than
any market-share argument.

Everything else here — Ray-Ban Display, Xreal, Viture, Vision Pro — would
be built blind, verified only in a simulator, and shipped on hope. Near
has already been bitten this session by things that looked right in a
simulator and behaved differently on real hardware (the PWA install
prompt never fired, despite a valid manifest, because a service worker
was missing).

So: **Quest 2 is the first AR surface to build**, not because it's the
best AR device — its passthrough is low-res monochrome and it's a poor
window onto the real world — but because it's the one that can be held
in a hand and checked. And what Quest 2 does well is exactly the cheap
win: a large virtual screen. Near's existing responsive layout is most of
the way there already; what it needs is a wide, low-density,
comfortable-at-distance reading layout.

That also happens to be the same layout Xreal and Viture want. One piece
of work, three devices, and the only one that gets verified on hardware
is the one we own.

## Recommended sequencing

0. **Quest 2 browse layout** — the only thing testable on hardware we
   have. Wide, low-density, readable at virtual-screen distance. Doubles
   as the Xreal/Viture layout.
1. **Phone AR-lite.** Compass + geolocation waypoint view. Ships to
   everyone, proves the maths, and is genuinely useful on its own.
2. **Meta Ray-Ban Display**, as EPIC 3 scopes — but note this is the first step that cannot be verified on hardware we own —
   the constraint set is well documented and the browse/waypoint views
   port directly from step 1.
3. **Class 3 (WebXR immersive-ar)** last. Highest effort, smallest
   audience today, but the only one that delivers the real thing.
4. **Class 2 needs nothing.** Don't spend on it.

## Honest caveats

- Device landscape here moves fast and parts of this may already be
  stale — verify current WebXR support and Meta's web-app capabilities
  against their own docs before building, rather than trusting this file.
- Battery and heat are real constraints on all glasses. A view that
  polls GPS and compass continuously is a view that empties a battery.
- Any camera-adjacent feature carries a social cost. EPIC 3's launch-story
  note is right that Near's angle is the non-creepy one — a guide that
  points you somewhere, not a device that records people. That should
  constrain the design, not just the press release.
