"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * Universal share button, mounted once in Header.tsx so every page gets
 * one — not just the board. Takes no props on purpose: `window.location.
 * href` + `document.title` already describe whatever page it's rendered
 * on, board or otherwise, so there is nothing page-specific to thread in.
 *
 * On the board specifically this also covers the filtered/sorted view:
 * query, categories, tags, sort tab and favorites-only all live in the
 * URL (see lib/board/controls.tsx and Board.tsx's own URL sync), so the
 * current address IS the shareable artifact. Operator directive,
 * 2026-09-03: "any location, filtered, sorted etc view should have a
 * share link and share button" — his stated case was sending a
 * sober-curious filtered board to a friend. Extended site-wide,
 * 2026-09-08: "everything really should be shareable."
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

  const label = copied ? t("shareCopied") : t("share");

  return (
    <button
      type="button"
      onClick={share}
      aria-label={label}
      title={label}
      className="inline-flex items-center gap-1.5 border-[3px] border-ink bg-surface px-1.5 sm:px-2 py-1 font-mono text-[0.72rem] uppercase tracking-wide text-ink hover:bg-accent hover:text-black transition-colors"
    >
      {/* Icon-only in the header's compact/mobile state — there isn't
          room for a labelled button once search and the section nav are
          competing for the same row (operator, 2026-09-08); the label
          returns from sm up, where every other header control is
          already text + icon. aria-label/title above carry the name for
          anyone who can't see the glyph, icon-only or not. */}
      <span aria-hidden="true">↗</span>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
