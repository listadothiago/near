import Image from "next/image";
import { useTranslations } from "next-intl";
import type {
  CollectionMeta,
  CollectionContentFrontmatter,
} from "@/lib/content/schema";

export default function CollectionHero({
  meta,
  frontmatter,
  placeCount,
}: {
  meta: CollectionMeta;
  frontmatter: CollectionContentFrontmatter;
  placeCount: number;
}) {
  const t = useTranslations("collection");

  return (
    <header>
      {meta.coverImage && (
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-surface-2">
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

      <p className="mt-5 text-[0.78rem] font-mono text-muted uppercase tracking-wide">
        {t("placesCount", { count: placeCount })}
      </p>
      <h1 className="mt-2 font-serif italic font-medium text-[clamp(2rem,4.5vw,2.8rem)] leading-tight">
        {frontmatter.title}
      </h1>
      <p className="mt-2 text-[1.05rem] text-muted max-w-[60ch]">
        {frontmatter.dek}
      </p>
    </header>
  );
}
