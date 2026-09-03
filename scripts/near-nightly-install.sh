#!/bin/zsh
# Install (or reinstall) the Near nightly runs as persistent launchd agents.
#
#   scripts/near-nightly-install.sh            # install / reinstall both
#   scripts/near-nightly-install.sh uninstall  # remove both
#   scripts/near-nightly-install.sh status     # show whether they are loaded
#
# Two editions, both America/Sao_Paulo (launchd uses local time):
#   02:07  the overnight edition
#   08:03  the morning edition
# Off-the-hour minutes on purpose — everything on earth fires at :00.

set -u

REPO="/Users/thiagobaraldi/Documents/near"
AGENTS="$HOME/Library/LaunchAgents"
LABELS=("tips.near.nightly-0207" "tips.near.nightly-0803")

mkdir -p "$AGENTS" "$HOME/.claude/near-nightly"
chmod +x "$REPO/scripts/near-nightly-run.sh"

case "${1:-install}" in
  uninstall)
    for L in $LABELS; do
      launchctl bootout "gui/$UID/$L" 2>/dev/null \
        || launchctl unload "$AGENTS/$L.plist" 2>/dev/null
      rm -f "$AGENTS/$L.plist"
      echo "removed $L"
    done
    ;;
  status)
    for L in $LABELS; do
      if launchctl list | grep -q "$L"; then
        echo "loaded:     $L"
      else
        echo "NOT loaded: $L"
      fi
    done
    ;;
  *)
    for L in $LABELS; do
      cp "$REPO/scripts/launchd/$L.plist" "$AGENTS/$L.plist"
      # bootout first so a reinstall picks up changes rather than silently
      # keeping the previously-loaded definition.
      launchctl bootout "gui/$UID/$L" 2>/dev/null
      launchctl bootstrap "gui/$UID" "$AGENTS/$L.plist" \
        || launchctl load "$AGENTS/$L.plist"
      echo "installed $L"
    done
    echo
    echo "Logs: ~/.claude/near-nightly/near-nightly.log"
    echo "Run one by hand:  scripts/near-nightly-run.sh manual"
    ;;
esac
