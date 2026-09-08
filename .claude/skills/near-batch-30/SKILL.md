---
name: near-batch-30
description: Create a repeatable batch of 30 new Near articles with shared research, compact role reviews, six locale editions and resumable checkpoints. Use when asked to run or resume a 30-article batch; follows near-write-article quality gates.
---

# Near batch of 30

Invoke with `$near-batch-30`, optionally adding cities, beats, source leads,
`draft only`, or `resume <run-id>`. A bare invocation requests creation and
publication through the existing trust gate. A request to design or edit this
skill does not start a publishing run.

Deliver 30 distinct new original articles, each with all six locale editions
when publishable: 180 editions, not 180 articles. Default to place articles;
choose guides or columns only when editorial merit and the requested scope
justify their different length requirements. Updates, translations, shell
pages and duplicate venue/event pins do not count toward 30.

## Read once, reuse deliberately

Read `content/rules.md` and `near-write-article/SKILL.md` at run start.
This skill schedules that pipeline; every mandatory consultation, research
requirement and quality gate remains applicable to every article. Read each
required role's skill when performing its work, once per retained context;
re-read changed instructions or anything lost after compaction. Do not load the
whole skills catalogue, catalogue bodies, or prior conversation into every job.

Use PARSER, the internal chief editor, near-cto and near-tech-lead for one brief
batch setup decision: research reuse, editorial scope, architecture and execution.
Use their skills as role lenses in one coordinator by default; a separate agent
per role per article wastes context. Delegate only when explicitly requested or
when applicable instructions require it. Keep distinct review decisions distinct,
including the independent chief-editor sign-off for an EDDIE TOR byline.

Use existing tools and flat files. No new provider account, paid service,
asynchronous API queue or CMS is required. Do not change model settings unless
authorized. Shared research and less rework are the savings hypothesis; never
claim a measured saving without comparable usage data.

## Plan and checkpoint

Create a unique run directory under `content/_batch-runs/<run-id>/` and a
`manifest.json`. On resume, load that manifest instead of rediscovering work. Preserve its scope
and mode unless the user explicitly changes them; resuming draft-only never
authorizes publication. Changed rule/skill hashes require rereading changed
instructions and invalidating/repeating affected gates.
Record: run ID, requested scope, target 30, mode, start time, applicable rule/skill
hashes, baseline working-tree changes, and one row per candidate containing:

- slug, content type, city/beat cluster, author, origin URL and trust basis;
- state (`candidate`, `researched`, `source-approved`, `localized`, `checked`,
  `ready`, `published`, `held`), file paths and current content/source hashes;
- evidence packet path; individual gate verdicts with reviewer role, timestamp,
  input hash and findings; per-locale state; blockers and retry count;
- publication commit and verified live URL when actually published.

These internal packets stay out of public copy. Do not add unsupported fields to
public metadata. Update existing required public provenance/log fields through
normal pipeline rules. Only the coordinator updates shared indexes and logs.

Respect the requested geography/beat; otherwise use existing Near editorial
priorities and SEO/trendsetter consultation to select worthwhile gaps. Group
related candidates into roughly six clusters of five, adjusting for actual source
coverage. Check duplicates against the catalogue, drafts and the entire batch.
Keep replacement leads only for rejected or held items. Never manufacture a thin
article to reach the count. The batch cap is 30 successful new articles across
all clusters, not five per cluster with an unlimited number of clusters.

## Research once where it applies

Create one compact shared source packet per city/beat cluster plus one evidence
packet per article. Store source URL, publication date when available, actual
check time, concise supported claims, contradictions and access limitations.
Link claim IDs to their supporting sources and the specific article they support.
Reuse relevant verified context; do not paste full pages into every draft job.

A source read for one venue does not verify its neighbour. Each article retains
its own preferred-source relevance, mandatory Reddit/Google-review checks and
fallback record, Instagram/events check, current-status check, exact Google Maps
pin, prices and image rights. Follow the shared pipeline's explicit handling of
blocked legs. Recheck mutable facts in the current session on resume, especially
prices and dated events. Do not treat cached source text as a fresh verification.

## Produce and review in bounded groups

1. Complete research before drafting. Write naturally concise place articles
   of at least 150 words under the current rule: enough specific substance to serve the
   reader, no padding, no forced shortness to avoid image requirements. Guides,
   Featured Articles and columns retain their depth requirements.
2. Perform required role consultations and English reviews across a small cluster.
   Return compact findings and an explicit verdict per article. Every mandatory
   role actually examines its required inputs; a cluster-wide “pass” is inadequate.
   Preserve step order, including separate tone, language-tic, legal and chief
   editor decisions. Fix the source before translating it.
3. Freeze approved English and its hash. For each target locale, supply only the
   approved source, evidence needed for facts, glossary, relevant author voice and
   that locale's translator instructions. Localize small groups to avoid truncated
   output. All five translations remain genuine local editions.
4. Run all required final checks across every relevant locale: language tics,
   structure, imagery, links, SEO/AEO, legal issues introduced by edits, red team,
   Discover and revenue verdicts. Keep the outreach freeze; no messages are sent.
5. Repair only failed files or passages. Any changed source fact invalidates affected
   translations and dependent approvals; any changed draft invalidates reviews of
   that draft. Keep unaffected siblings. After two unsuccessful repairs to the same
   blocker, mark held with the reason, use a qualified replacement if available and
   report unresolved items rather than retrying indefinitely.

Use existing `scripts/validate-content.mjs`, `scripts/check-duplicates.mjs` and
`scripts/check-geocodes.mjs` with their supported arguments. Mechanical scripts
are partial checks, not proof of editorial quality, rights or live venue accuracy.
Run cheap checks before expensive final review, then again after relevant edits.
Run the required actual build once against the final publishable set before push;
repeat only if that set changes or a failure requires it. Follow existing commit
rules; one final push may contain the individual article commits.

## Finish honestly

Apply `content/rules.md` trust gate individually. Explicitly review-trust sources
remain drafts awaiting approval. User-named places carry the approval described
there; do not infer that every discovered source becomes trusted just because the
batch was requested. `draft only` means no activation, commit or push. A complete
draft-only batch has 30 researched originals saved at draft status; auto-trust
items receive all six editions, while review-trust items defer localization under
the shared pipeline. Report that distinction and any pending publication gates.

Keep unrelated pre-existing changes out of commits. Record real publication times,
update required stats/indexes/logs, and verify publication before claiming live.
A completed publish batch requires 30 new articles, all six editions, passed gates
and confirmed publication. Report completed, held and remaining counts separately;
30 attempted candidates is not completion. Resume from evidence and hash-validated
checkpoints. If blocked with no sound replacement, report the shortfall and cause.

If tool/provider telemetry supplies actual tokens, record input, output, cached
input and retry tokens, and tokens per accepted six-locale article. Otherwise
record `unavailable`; word counts, account usage percentages and wall time are
not token measurements. Compare an initial cluster with later clusters when data
allows; do not invent a percentage saving or equate parallelism with fewer tokens.

Return a short result with counts, article links, blockers, run ID for resuming,
and measured spend or its unavailability. Do not echo all article text into chat.
