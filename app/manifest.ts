import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Tips Near Me | near.tips",
    short_name: "Near",
    description: "The alternative guide to everywhere.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    // minimal-ui as the fallback rather than browser: if a platform won't
    // do standalone, a slim toolbar still reads as an app. Falling all
    // the way back to full browser chrome would undo the point.
    display_override: ["standalone", "minimal-ui"],
    orientation: "portrait-primary",
    background_color: "#f4f4f0",
    // Acid green tints the Android status bar, so the system chrome joins
    // the design rather than sitting outside it. It's the single most
    // visible "this is an app, not a tab" cue on Android.
    theme_color: "#ccff00",
    categories: ["travel", "lifestyle", "food", "entertainment"],
    lang: "en",
    dir: "ltr",
    // Long-press the home-screen icon and these appear — one of the few
    // genuinely app-like affordances the web gives you, and cheap.
    shortcuts: [
      {
        name: "Guides",
        short_name: "Guides",
        url: "/en/guides",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Sources",
        short_name: "Sources",
        url: "/en/sources",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "About",
        short_name: "About",
        url: "/en/about",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
    ],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      // Maskable lets Android crop to the launcher's shape without
      // clipping the mark. Same asset for now; a dedicated maskable
      // version with more padding around the pin would be better.
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
