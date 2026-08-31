import Image from "next/image";
import { useTranslations } from "next-intl";
import Byline from "@/components/layout/Byline";
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
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-surface-2 border-[4px] border-ink">
          <Image
            src={meta.heroImage.url}
            alt={frontmatter.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover zine-img"
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
              className="w-2 h-2 border border-ink"
              style={{ background: `var(${CATEGORY_COLOR_VAR[cat]})` }}
            />
            <span>{tCat(cat)}</span>
          </span>
        ))}
        <span className="opacity-50">·</span>
        <span>{location}</span>
        <span className="opacity-50">·</span>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${meta.coordinates.lat},${meta.coordinates.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-ink underline decoration-accent/40 underline-offset-2 hover:decoration-accent-ink transition-colors"
        >
          {t("directions")}
        </a>
      </div>

      <h1 className="mt-2 text-[clamp(2rem,5.5vw,3.2rem)]">
        {frontmatter.name}
      </h1>
      <p className="mt-2 font-mono text-[0.95rem] text-muted max-w-[60ch]">
        {frontmatter.tagline}
      </p>

      {meta.author && (
        <p className="mt-3">
          <Byline slug={meta.author} size="md" />
        </p>
      )}

      {meta.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {meta.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 border-[2px] border-ink bg-surface px-2 py-0.5 font-mono text-[0.7rem] uppercase tracking-wide text-ink"
            >
              <span aria-hidden="true">{TAG_GLYPH[tag]}</span>
              {tTag(tag)}
            </span>
          ))}
        </div>
      )}

      {meta.status === "closed" && (
        <p className="mt-3 inline-block bg-accent text-black border-[3px] border-ink px-2.5 py-1 font-mono text-[0.78rem] uppercase tracking-wide font-bold">
          {t("closed")}
        </p>
      )}
      {meta.status === "archived" && (
        <p className="mt-3 inline-block bg-accent text-black border-[3px] border-ink px-2.5 py-1 font-mono text-[0.78rem] uppercase tracking-wide font-bold">
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
