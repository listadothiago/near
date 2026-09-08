import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
    // Route next/image through weserv.nl instead of Vercel's metered
    // Image Optimization API — see lib/image/weservLoader.ts for why.
    loader: "custom",
    loaderFile: "./lib/image/weservLoader.ts",
  },
};

export default withNextIntl(nextConfig);
