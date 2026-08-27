import Image from "next/image";
import { useTranslations } from "next-intl";
import { CATEGORY_COLOR_VAR } from "@/lib/content/categories";
import type { PlaceMeta, PlaceContentFrontmatter } from "@/lib/content/schema";

export default function PlaceHero({
  meta,
  frontmatter,
}: {
  meta: PlaceMeta;
  frontmatter: PlaceContentFrontmatter;
}) {
  const t = useTranslations("place");
  const tCat = useTranslations("categories");
  const location = [meta.place.neighborhood, meta.place.city, meta.place.country]
    .filter(Boolean)
    .join(", ");

  return (
    <header>
      {meta.heroImage && (
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-surface-2">
          <Image
            src={meta.heroImage.url}
            alt={frontmatter.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
        </div>
      )}
      {meta.heroImage && (
        <p className="mt-1.5 text-[0.72rem] font-mono text-muted">
          <a
            href={meta.heroImage.attributionLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-ink"
          >
            {meta.heroImage.attribution}
          </a>
        </p>
      )}

      <div className="mt-5 flex items-center gap-2 text-[0.78rem] font-mono text-muted">
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: `var(${CATEGORY_COLOR_VAR[meta.category]})` }}
        />
        <span>{tCat(meta.category)}</span>
        <span className="opacity-50">·</span>
        <span>{location}</span>
      </div>

      <h1 className="mt-2 font-serif italic font-medium text-[clamp(2rem,4.5vw,2.8rem)] leading-tight">
        {frontmatter.name}
      </h1>
      <p className="mt-2 text-[1.05rem] text-muted max-w-[60ch]">
        {frontmatter.tagline}
      </p>

      {meta.status === "closed" && (
        <p className="mt-3 inline-block bg-surface-2 border border-border rounded-lg px-3 py-1.5 text-[0.82rem] font-semibold text-muted">
          {t("closed")}
        </p>
      )}
      {meta.status === "archived" && (
        <p className="mt-3 inline-block bg-surface-2 border border-border rounded-lg px-3 py-1.5 text-[0.82rem] font-semibold text-muted">
          {t("archived", {
            month: new Date(meta.publishedAt).toLocaleString("en", {
              month: "long",
            }),
            year: new Date(meta.publishedAt).getFullYear(),
          })}
        </p>
      )}
    </header>
  );
}
