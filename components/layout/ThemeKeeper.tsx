"use client";

import { useEffect } from "react";

/**
 * Keeps the chosen theme applied across client-side navigation.
 *
 * ThemeScript sets `data-theme` on <html> while the document is parsed,
 * which is correct for a full page load and does nothing for a soft
 * navigation. React owns the <html> element here, and on a client
 * transition it reconciles that element and drops the attribute it
 * didn't render — so clicking the wordmark, or switching locale, threw
 * the reader back to the system default. That's the bug behind "every
 * time I change language it goes back to dark mode", and it was never
 * about locale specifically: any soft navigation did it.
 *
 * The fix watches the attribute rather than re-applying on a timer or on
 * pathname change. A MutationObserver callback runs as a microtask,
 * before the browser paints, so the attribute is restored in the same
 * frame it was removed and there is no flash. Re-applying in an effect
 * keyed on the route would run a frame late and show one.
 */
export default function ThemeKeeper() {
  useEffect(() => {
    const root = document.documentElement;

    function stored(): "light" | "dark" | null {
      try {
        const value = localStorage.getItem("near-theme");
        return value === "light" || value === "dark" ? value : null;
      } catch {
        return null;
      }
    }

    function apply() {
      const want = stored();
      // No stored preference means the reader hasn't chosen — leave the
      // attribute off and let prefers-color-scheme decide.
      if (!want) return;
      // Guarded, so restoring doesn't retrigger this observer forever.
      if (root.dataset.theme !== want) root.dataset.theme = want;
    }

    apply();
    const observer = new MutationObserver(apply);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return null;
}
