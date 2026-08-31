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

## Recommended sequencing

1. **Phone AR-lite first.** Compass + geolocation waypoint view. Ships to
   everyone, proves the maths, and is genuinely useful on its own.
2. **Class 1 (Meta Ray-Ban Display)** next, as EPIC 3 already scopes —
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
