"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { SignInButton, useUser } from "@clerk/nextjs";

/**
 * Fires briefly whenever a visitor favorites something — the moment
 * they've just demonstrated they'll want this list later is the only
 * moment a sign-in nudge earns its interruption. Local-only persistence
 * (lib/favorites.ts) is a real, working feature on its own; this is
 * upsell, not a blocker, so it auto-dismisses and never blocks the star
 * button itself.
 *
 * Mount exactly one of these per page (Board.tsx does, wrapped in
 * `<Show when="signed-out">` so it never even renders for a signed-in
 * visitor who has nothing to gain from the nudge). Every FavoriteButton
 * on the page dispatches a plain window event on add — cheaper than
 * threading a callback through every card just to reach one shared toast.
 */
export default function FavoriteToast() {
  const t = useTranslations("board");
  const { isSignedIn, isLoaded } = useUser();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onFavorite() {
      // A signed-in visitor's favorites already sync to their account —
      // no nudge to show them. isLoaded guards the brief window before
      // Clerk resolves auth state on first paint.
      if (isLoaded && !isSignedIn) setVisible(true);
    }
    window.addEventListener("near:favorite-added", onFavorite);
    return () => window.removeEventListener("near:favorite-added", onFavorite);
  }, [isLoaded, isSignedIn]);

  useEffect(() => {
    if (!visible) return;
    const id = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(id);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      role="status"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 border-[3px] border-ink bg-surface px-3 py-2 shadow-[var(--shadow-sm)] font-mono text-[0.72rem]"
    >
      <span aria-hidden="true">★</span>
      <span>{t("favoriteToastSaved")}</span>
      <SignInButton mode="modal">
        <button
          type="button"
          className="border-[2px] border-ink bg-accent px-2 py-0.5 uppercase tracking-wide text-black whitespace-nowrap hover:bg-surface hover:text-ink transition-colors"
        >
          {t("favoriteToastSignIn")}
        </button>
      </SignInButton>
    </div>
  );
}
