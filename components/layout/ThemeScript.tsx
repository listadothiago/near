import Script from "next/script";

// Applies the stored theme before first paint so a dark-mode visitor
// doesn't get a flash of the light palette.
//
// This has to run ahead of hydration, hence strategy="beforeInteractive"
// — Next injects it into the initial HTML. A bare <script> element works
// too, but React 19 warns about script tags rendered as component
// children (they're inert on client render), so next/script is the
// supported way to express this. Inline scripts need an id for Next to
// track them.
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

export default function ThemeScript() {
  return (
    <Script
      id="near-theme"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }}
    />
  );
}
