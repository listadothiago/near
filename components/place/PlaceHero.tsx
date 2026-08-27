import Image from "next/image";
import { useTranslations } from "next-intl";
import { CATEGORY_COLOR_VAR } from "@/lib/content/categories";
import { TAG_GLYPH } from "@/lib/content/tags";
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
  const tTag = useTranslations("tags");
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

      <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.78rem] font-mono text-muted">
        {meta.categories.map((cat, i) => (
          <span key={cat} className="flex items-center gap-2">
            {i > 0 && <span className="opacity-50">/</span>}
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: `var(${CATEGORY_COLOR_VAR[cat]})` }}
            />
            <span>{tCat(cat)}</span>
          </span>
        ))}
        <span className="opacity-50">·</span>
        <span>{location}</span>
      </div>

      <h1 className="mt-2 font-serif italic font-medium text-[clamp(2rem,4.5vw,2.8rem)] leading-tight">
        {frontmatter.name}
      </h1>
      <p className="mt-2 text-[1.05rem] text-muted max-w-[60ch]">
        {frontmatter.tagline}
      </p>

      {meta.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {meta.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[0.76rem] text-muted"
            >
              <span aria-hidden="true">{TAG_GLYPH[tag]}</span>
              {tTag(tag)}
            </span>
          ))}
        </div>
      )}

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
