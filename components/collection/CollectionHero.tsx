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
        {t("placesCount", { count: placeCount })}
      </p>
      <h1 className="mt-2 text-[clamp(2rem,5.5vw,3.2rem)]">
        {frontmatter.title}
      </h1>
      <p className="mt-2 font-mono text-[0.95rem] text-muted max-w-[60ch]">
        {frontmatter.dek}
      </p>
    </header>
  );
}
