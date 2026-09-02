---
name: near-sources-war-room
description: A near-war-room variant aimed at the source catalogue instead of at content — deliberate discovery, verification, tiering and retirement of the outlets Near watches, plus fixing the /sources page behind them. Use when the operator asks for a sources push, when a war room finds a city or beat with no usable sources, or periodically so the catalogue gets built on purpose rather than as a side effect of writing articles. Produces no place pages.
---

# near-sources-war-room

**Operator request.** `near-sources` is a *health check* — it verifies
what is already listed and captures what a piece happened to turn up.
Nothing in Near deliberately goes looking. So the catalogue grows only
where articles happened to be written, which means it is strongest
exactly where it is least needed and empty everywhere Near is about to
expand. Bangkok is Tier 1 as of 2026-09-02 with **zero pins and no
sources**; that gap was never going to close as a side effect of writing.

This run produces **no place pages**. If it turns up an irresistible pin,
log it as a lead for a real war room and keep going — the failure mode
this skill exists to correct is source work being displaced by content
work every single time they compete.

## Relationship to the neighbouring skills

- **`near-sources`** owns the files and the per-run health check. This
  skill *calls* it; it does not replace it or duplicate its rules.
- **`near-war-room`** is the content equivalent. Same shape, different
  output: pins and collections there, catalogue entries here.
- **`near-trendsetter` (RADAR-X)** is the discovery engine — which
  outlets are actually live in a scene right now, as opposed to which
  ones rank. Do not run this skill without it.
- **`near-refresh`** consumes the result. A source that never reaches
  `sources.md` is never monitored.

## Pipeline

0. **Drain the feedback surfaces**, same as `near-war-room` step 0 —
   `BACKLOG.md` directives, `content/requests.md`,
   `content/opportunities.md`, `content/_ingestion-log.md`. The
   `/sources` revamp has been asked for repeatedly and the AAN member
   directory has been asked for **three times** now; check what is
   already owed before deciding what to hunt.

1. **Scope by gap, not by appetite.** Pick the target from where the
   catalogue is actually thin, in this order:
   - **A Tier 1 city with no sources.** Tier membership lives in
     `.claude/skills/content-rotation/SKILL.md`.
   - **A beat with no sources in a city Near already covers** — the
     filter set the board promises (Vira-noite, Sober Curious, Lenda
     Local, Pet-Friendly, Achado Escondido…) is a list of promises, and
     an unsourceable filter cannot be kept.
   - **A locale with no native-language sources.** Six locales ship;
     sourcing a `pt-BR` or `zh-CN` city entirely from English outlets is
     a real defect, not a rounding error.
   Name the gap and the target count in a scope block before starting.

2. **Audit what exists first.** Run `near-sources`' health check across
   the scoped region: every entry resolves, is still publishing (a
   masthead that stopped in 2023 resolves fine and is worthless), and is
   still what its description claims. Retire the dead with a reason and
   a date — a silently deleted source is indistinguishable from an
   oversight.

3. **Discover, with `near-trendsetter`.** Work the seams rather than
   searching "best <city> blog":
   - The **AAN member directory** — alt-weeklies are Near's own
     tradition and this is the standing, thrice-requested job.
   - **Who the venues themselves link to.** A place page's own press
     section names the outlets that actually cover that scene.
   - **Reddit and the local forums** — which outlet do locals cite when
     they answer a stranger's question? That is the live one.
   - **Native-language outlets first** in non-English cities, then the
     expat press, never the reverse.
   - **Aggregators, listings and event calendars**, which are worth more
     to `near-events` than another opinion outlet.
   - **The venue's own channels** — Instagram and TikTok are where hours
     and closures land first.

4. **Verify every candidate before it is written down.** Non-negotiable,
   because the standing rule is that a dead source link is the same
   failure as a dead citation. For each: it loads, it published
   something in the **last 90 days**, its beat and city are what you
   think, and any access quirk is recorded (login wall, no RSS, needs
   `claude-in-chrome` rather than `WebFetch`). Note whether it has a
   usable feed — that is what decides if `near-refresh` can watch it
   cheaply.

5. **Tier honestly.** Tier 1 = check every run. Tier 2 = check when
   working that region or beat. Tier 3 = opportunistic, mined for signal
   rather than obligation. **Most finds are Tier 3**, and a run that
   promotes half its discoveries to Tier 1 has not made a judgement. The
   promotion path is earned: two or three good hits move a source up.

6. **Write it down, and fix the page.** Entries into
   `content/sources.md` and `content/preferred-sources.md` in the
   existing formats. Then check `/sources` actually renders what the
   files now say — the page's thinness was the operator's original
   complaint, and building the catalogue without the page catching up
   fixes nothing the operator can see.

7. **Log and route.** Run summary to `content/_ingestion-log.md`. Any
   pin-worthy lead goes to `content/opportunities.md` for a real war
   room. Any structural finding — a city that cannot be sourced at all,
   a filter with no supporting outlets anywhere — goes to the operator,
   because that is a coverage decision and not this skill's to make.

## The bar

A source earns its place by being **checkable, current, and specific to
a beat or a place**. Volume is not the goal and a padded catalogue is
worse than a short one: it makes `near-refresh` slower and every run
less trustworthy. Ten verified live outlets beat forty that resolve.
