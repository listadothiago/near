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
 */
export default function ThemeScript() {
  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }}
    />
  );
}
