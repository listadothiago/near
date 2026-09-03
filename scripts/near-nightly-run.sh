#!/bin/zsh
# Near nightly run — persistent, launchd-driven.
#
# Operator, 2026-09-02: "well built that persistent recurring thing for the
# 8:03 AM daily then. In fact run it twice a day persistently, 2am and 8 am
# editions so i wake up to shit that got done."
#
# This exists because CronCreate jobs are session-only: they die when the
# Claude session exits, which made them useless for an overnight schedule.
# This script + the two launchd plists in scripts/launchd/ are the durable
# replacement. Pattern mirrored from the working
# com.nautplus.productnaut-telegram-agent job on this machine.
#
# Install/uninstall:  scripts/near-nightly-install.sh

set -u

# launchd gives a job almost no environment. Both of these are load-bearing:
# claude lives in ~/.local/bin, and without LANG set zsh aborts on the first
# non-ASCII byte (PT-BR accents, emoji) with "character not in range" and no
# visible error anywhere but the launchd log.
export PATH="/Users/thiagobaraldi/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
export LANG="en_US.UTF-8"
export LC_ALL="en_US.UTF-8"

REPO="/Users/thiagobaraldi/Documents/near"
PROMPT_FILE="$REPO/scripts/near-nightly-prompt.md"
LOCKFILE="/tmp/near-nightly-run.lock"
LOGDIR="/Users/thiagobaraldi/.claude/near-nightly"
LOGFILE="$LOGDIR/near-nightly.log"

NEAR_EDITION="${1:-manual}"
export NEAR_EDITION

mkdir -p "$LOGDIR"

log() { echo "$(date -u +%FT%TZ) [$NEAR_EDITION] $*" >> "$LOGFILE"; }

# The 02:07 and 08:03 editions must never overlap, and a hung run must not
# block the next one forever — the timeout below guarantees the lock is
# always released.
if [ -f "$LOCKFILE" ]; then
  PID=$(cat "$LOCKFILE" 2>/dev/null)
  if [ -n "$PID" ] && kill -0 "$PID" 2>/dev/null; then
    log "previous run (pid $PID) still in flight, skipping this edition"
    exit 0
  fi
  log "stale lock from pid ${PID:-unknown}, reclaiming"
fi
echo $$ > "$LOCKFILE"
trap 'rm -f "$LOCKFILE"' EXIT

if [ ! -f "$PROMPT_FILE" ]; then
  log "FATAL: no prompt file at $PROMPT_FILE"
  exit 1
fi

cd "$REPO" || { log "FATAL: cannot cd to $REPO"; exit 1; }

# Resolve the Claude Code binary explicitly.
#
# This is not paranoia. On 2026-09-02 the only `claude` on this machine was
# ~/.local/bin/claude, a symlink pointing at
# ~/.local/share/claude/versions/2.1.247 — a path that does not exist, because
# the versions directory is empty and the actually-running binary was an
# already-deleted inode in ~/.Trash/2.1.232. An update had swapped the symlink
# and binned the old build while it was still running. A launchd job that just
# calls `claude` in that state fails with "command not found" at 02:07 every
# night and leaves nothing but an empty log, which is the worst possible
# failure mode for an unattended run.
CLAUDE_BIN=""
for CANDIDATE in \
  "$HOME/.local/bin/claude" \
  "/opt/homebrew/bin/claude" \
  "/usr/local/bin/claude" \
  "$(command -v claude 2>/dev/null)"
do
  if [ -n "$CANDIDATE" ] && [ -x "$CANDIDATE" ]; then
    CLAUDE_BIN="$CANDIDATE"
    break
  fi
done

if [ -z "$CLAUDE_BIN" ]; then
  log "FATAL: no working claude binary found."
  log "  ~/.local/bin/claude is $( [ -L "$HOME/.local/bin/claude" ] && echo 'a symlink' || echo 'absent' )$( [ -L "$HOME/.local/bin/claude" ] && [ ! -e "$HOME/.local/bin/claude" ] && echo ' and its target does not exist' )"
  log "  FIX: reinstall Claude Code, then run scripts/near-nightly-install.sh status"
  log "  Until then every scheduled edition will no-op."
  exit 1
fi
log "using claude at $CLAUDE_BIN"

log "=== run starting ==="
log "branch: $(git rev-parse --abbrev-ref HEAD 2>/dev/null), head: $(git rev-parse --short HEAD 2>/dev/null)"

PROMPT="$(cat "$PROMPT_FILE")

---

This run is the **${NEAR_EDITION}** edition, started $(date '+%Y-%m-%d %H:%M %Z')."

# Three hours. A real run does research, drafts several pieces in six locales
# each, runs the sign-offs and pushes — that is genuinely long. The 02:07
# edition still finishes well before the operator wakes up.
MAX_WAIT=10800

"$CLAUDE_BIN" -p "$PROMPT" \
  --allowedTools "Bash Read Write Edit Glob Grep WebFetch WebSearch Skill ToolSearch TaskCreate TaskUpdate TaskList" \
  --disallowedTools "AskUserQuestion ExitPlanMode Agent" \
  >> "$LOGFILE" 2>&1 &
CLAUDE_PID=$!
log "claude headless session started (pid $CLAUDE_PID), ceiling ${MAX_WAIT}s"

ELAPSED=0
while kill -0 "$CLAUDE_PID" 2>/dev/null; do
  sleep 15
  ELAPSED=$((ELAPSED + 15))
  if [ "$ELAPSED" -ge "$MAX_WAIT" ]; then
    kill -9 "$CLAUDE_PID" 2>/dev/null
    log "TIMEOUT: session exceeded ${MAX_WAIT}s, force-killed (pid $CLAUDE_PID)"
    break
  fi
done
wait "$CLAUDE_PID" 2>/dev/null

log "head after run: $(git rev-parse --short HEAD 2>/dev/null)"
log "=== run finished ==="
