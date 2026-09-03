#!/usr/bin/env bash
# Verify every place/collection on disk is actually live on near.tips.
#
# Written 2026-09-03 after two stale-tick incidents in one day: post-plan.md
# recorded pieces as shipped that had never been committed and 404'd in
# production. A tick in post-plan.md is not evidence a piece is live.
# Run this before trusting any queue's checkboxes.
set -uo pipefail
BASE="${BASE:-https://near.tips}"
fail=0
check() { # $1 = url path, $2 = label
  code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 "$BASE$1")
  if [ "$code" = "200" ]; then printf '  ok   %s\n' "$2"
  else printf '  %-4s %s  <-- NOT LIVE\n' "$code" "$2"; fail=$((fail+1)); fi
}
echo "Checking places (status: active only) against $BASE"
for d in content/places/*/; do
  slug=$(basename "$d")
  [ -f "$d/meta.json" ] || { printf '  ---  %s  <-- no meta.json, invisible to the loader\n' "$slug"; fail=$((fail+1)); continue; }
  status=$(python3 -c "import json,sys;print(json.load(open('$d/meta.json')).get('status',''))")
  [ "$status" = "active" ] || { printf '  skip %s (status: %s)\n' "$slug" "$status"; continue; }
  check "/en/place/$slug" "$slug"
done
echo "Checking collections"
for d in content/collections/*/; do check "/en/collection/$(basename "$d")" "$(basename "$d")"; done
echo
[ "$fail" -eq 0 ] && echo "All active content is live." || echo "$fail problem(s) found."
exit $((fail > 0))
