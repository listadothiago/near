"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * Shares the board exactly as the reader has it — query, categories and
 * tags all live in the URL (see lib/board/controls.tsx), so the current
 * address IS the shareable artifact and this button just hands it over.
 *
 * Operator directive, 2026-09-03: "any location, filtered, sorted etc view
 * should have a share link and share button". His stated case is sending a
 * sober-curious filtered board to a friend, which is precisely a filtered
 * view that has to survive being pasted into a chat.
 *
 * Prefers the native share sheet where it exists — on a phone that is the
 * difference between "copied, now go find the app" and actually sending
 * it. Falls back to the clipboard, and then to a visible URL for browsers
 * with neither, because a share button that silently does nothing is worse
 * than no share button.
 */
export default function ShareViewButton() {
  const t = useTranslations("board");
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  // Feature-detected after mount: navigator.share doesn't exist during SSR,
  // and branching on it during render would mismatch hydration.
  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  async function share() {
    const url = window.location.href;
    if (canShare) {
      try {
        await navigator.share({ url, title: document.title });
        return;
      } catch {
        // A cancelled share sheet lands here alongside a real failure, and
        // the two are indistinguishable. Fall through to the clipboard:
        // copying after a deliberate cancel is a harmless outcome, while
        // doing nothing after a genuine failure is a dead button.
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // No clipboard permission (or an insecure context). Select the URL
      // so the reader can copy it by hand rather than being told nothing.
      window.prompt(t("share"), url);
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex items-center gap-1.5 border-[3px] border-ink bg-surface px-2 py-1 font-mono text-[0.72rem] uppercase tracking-wide text-ink hover:bg-accent hover:text-black transition-colors"
    >
      <span aria-hidden="true">↗</span>
      {copied ? t("shareCopied") : t("share")}
    </button>
  );
}
