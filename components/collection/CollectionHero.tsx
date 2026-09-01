import Image from "next/image";
import { useTranslations } from "next-intl";
import type {
  CollectionMeta,
  CollectionContentFrontmatter,
} from "@/lib/content/schema";
import Byline from "@/components/layout/Byline";

export default function CollectionHero({
  meta,
  frontmatter,
  placeCount,
  isColumn = false,
}: {
  meta: CollectionMeta;
  frontmatter: CollectionContentFrontmatter;
  placeCount: number;
  /** True for entries in Near's recurring weekly editorial column (see
   * content/editorial-column.md) — these read as the masthead's own
   * opinion piece, not a generic place-tagging guide, so they get a
   * distinct badge instead of the usual "{count} places" one. */
  isColumn?: boolean;
}) {
  const t = useTranslations("collection");

  return (
    <header>
      {meta.coverImage && (
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-surface-2 border-[4px] border-ink">
          <Image
            src={meta.coverImage.url}
            alt={frontmatter.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
        </div>
      )}
      {meta.coverImage && (
        <p className="mt-1.5 text-[0.72rem] font-mono text-muted">
          <a
            href={meta.coverImage.attributionLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-ink"
          >
            {meta.coverImage.attribution}
          </a>
        </p>
      )}

      <p className="mt-5 inline-block bg-accent text-black border-[3px] border-ink px-2 py-0.5 text-[0.72rem] font-mono uppercase tracking-wide">
        {isColumn ? t("weeklyColumnBadge") : t("placesCount", { count: placeCount })}
      </p>
      <h1 className="mt-2 text-[clamp(2rem,5.5vw,3.2rem)]">
        {frontmatter.title}
      </h1>
      <p className="mt-2 font-mono text-[0.95rem] text-muted max-w-[60ch]">
        {frontmatter.dek}
      </p>
      {(meta.editor || meta.author) && (
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
          {meta.editor && meta.editor !== meta.author && (
            <span className="inline-flex items-center gap-1.5">
              <span className="font-mono text-[0.66rem] uppercase tracking-wide text-muted">
                {t("editedBy")}
              </span>
              <Byline slug={meta.editor} size="md" />
            </span>
          )}
          {meta.author && (
            <span className="inline-flex items-center gap-1.5">
              {meta.editor && meta.editor !== meta.author && (
                <span className="font-mono text-[0.66rem] uppercase tracking-wide text-muted">
                  {t("writtenBy")}
                </span>
              )}
              <Byline slug={meta.author} size="md" />
            </span>
          )}
        </div>
      )}
    </header>
  );
}
