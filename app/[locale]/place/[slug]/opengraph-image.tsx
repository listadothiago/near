import { ImageResponse } from "next/og";
import { getPlaceContent } from "@/lib/content/loader";
import { CATEGORY_COLOR_VAR } from "@/lib/content/categories";
import type { ContentLocale } from "@/lib/content/schema";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const HEX_BY_VAR: Record<string, string> = {
  "--color-cat-travel-luxury": "#4c6e7a",
  "--color-cat-world-culture-news": "#8a7c64",
  "--color-cat-city-culture": "#4f7a46",
  "--color-cat-food-drink": "#a15a3b",
  "--color-cat-nightlife-sound": "#7a4f71",
  "--color-cat-wellness-fitness": "#3f8078",
};

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const content = getPlaceContent(slug, locale as ContentLocale);
  const accent = content
    ? HEX_BY_VAR[CATEGORY_COLOR_VAR[content.meta.categories[0]]]
    : "#5c7a6c";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#F1F0EA",
          padding: 64,
        }}
      >
        <div style={{ width: 64, height: 8, background: accent, marginBottom: 40 }} />
        <div style={{ fontSize: 28, color: "#6C766F", marginBottom: 16, display: "flex" }}>
          Near
        </div>
        <div
          style={{
            fontSize: 64,
            fontStyle: "italic",
            color: "#20262A",
            lineHeight: 1.15,
            display: "flex",
            flex: 1,
          }}
        >
          {content?.frontmatter.name ?? "Near"}
        </div>
        <div style={{ fontSize: 28, color: "#6C766F", display: "flex" }}>
          {content?.frontmatter.tagline ?? ""}
        </div>
      </div>
    ),
    { ...size },
  );
}
