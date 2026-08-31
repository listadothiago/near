const THEME_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("near-theme");
    if (stored === "light" || stored === "dark") {
      document.documentElement.dataset.theme = stored;
    }
  } catch (e) {}
})();
`;

/**
 * Applies the stored theme before first paint, so a reader who chose
 * light doesn't get a flash of dark on every navigation.
 *
 * This has to be a raw inline <script> in <head>, executed synchronously
 * while the document is parsed. It was briefly switched to next/script
 * with strategy="beforeInteractive" to silence React's dev warning about
 * script tags rendered as component children — but that defers execution
 * past first paint and reintroduced exactly the flash this exists to
 * prevent. It showed up most clearly when switching locale, which is a
 * full navigation: the page repainted in the system default before the
 * stored preference was applied.
 *
 * The warning is a dev-only console message. The flash is something
 * every reader sees, every navigation. Keeping the raw script.
 *
 * Re-reported 2026-08-31 (seen in the installed app on macOS, which is
 * the Next dev overlay pointing at localhost) and re-assessed to the
 * same conclusion. For the record, the two alternatives and why neither
 * is taken:
 *
 * - `next/script strategy="beforeInteractive"` — already tried, already
 *   regressed. See above. Do not try it a third time.
 * - Store the preference in a cookie and render `data-theme` on <html>
 *   during SSR. This genuinely removes the script, the flash and the
 *   warning — but reading cookies in the layout opts every route out of
 *   static rendering, which trades a dev-only console line for the
 *   entire site's prerendering. Not worth it for a project whose stated
 *   constraint is staying cheap to run.
 */
export default function ThemeScript() {
  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }}
    />
  );
}
