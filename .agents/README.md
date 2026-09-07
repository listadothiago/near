# `.agents/` — portability shim, not a second skill tree

`skills` here is a **symlink** to `../.claude/skills`. It exists so an
agent that looks for `.agents/skills/` finds Near's real skills instead
of nothing.

**Do not replace it with a copy.** That was tried on 2026-09-07: a
snapshot of all 71 skills was written here with the paths rewritten
`.claude` → `.Codex`. Within hours it had drifted badly —

- `content-rotation` still carried **Bangkok as Tier 1**, having been
  taken before the 2026-09-07 tier directive (Bangkok → Tier 2, NYC → Tier 1).
- `near-write-article` and `near-editor` still carried the **geocode
  confidence gate at 0.6**, the exact defect commit `c08d9bb` raised to
  0.9 to fix P0.1.
- `geolocation-police` — mandatory on every write and refresh per
  BACKLOG.md P0.1 — was **missing entirely**.

A copy of a skill tree is a fork, and a forked skill tree silently runs
the old pipeline. That is the same failure mode as an uncommitted
directive in `BACKLOG.md` (see `near-backlog` step 0-A): the instruction
exists, but not where the agent reads.

The `.Codex/skills/...` paths that rewrite introduced pointed at a
directory that never existed. The prose in these skills should name
`.claude/skills/` — the real location every agent resolves through this
symlink.

If some future agent genuinely cannot follow a symlink, generate the
mirror at run time from `.claude/skills` and delete it afterward. Never
commit a second copy.
