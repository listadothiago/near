<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Durable operator preference: content execution and token efficiency

Recorded 2026-09-08 after a batch session produced no new publications while
parallel agents repeatedly hit usage limits. The operator explicitly requested
that this lesson persist across sessions.

- Default to one coordinator completing one article through the required gates
  before starting another. Prefer a finished, publishable article over a broad
  queue of researched candidates. Keep every mandatory quality gate.
- Resume from the manifest and saved evidence; reconcile other workers' completed
  work first. Recheck mutable facts and changed inputs without restarting settled
  research or reloading whole catalogues/history into every job.
- Permission to use agents is not a reason to use them. Delegate only a narrow,
  independent task with a concrete deliverable and a clear benefit relative to
  duplicated context. Give it only the necessary context. Parallelism is not a
  token-saving claim.
- Do not repeatedly restart agents that hit the same usage limit. Save the
  checkpoint and continue locally where possible; report any actual blocker.
- Keep review decisions compact and distinct, repair only affected work, and
  avoid repeated setup, planning, or checks without changed inputs.
- Reuse verified research for additional places and genuinely dated associated
  events wherever it supports them; save compact evidence and reusable lessons.
  Keep image hunts bounded. Editorial illustrations may be vector-derived,
  abstract, artistic or humorous without depicting the venue; disclose their
  nature and retain factual, rights and image-quality checks.
- Persist explicit approvals and consult them on resume; do not ask again for
  the same authorization. Never claim measured token savings without telemetry.
