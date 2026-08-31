import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tips Near Me | near.tips",
    short_name: "Near",
    description: "What's opening, playing, and worth checking out.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f4f0",
    theme_color: "#ccff00",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
