import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import type { CollectionSummary } from "@/lib/content/schema";

// The card grid shared by /guides and the home page's guides strip, so a
// blog post looks the same wherever it's surfaced.
export default function CollectionCards({
  collections,
}: {
  collections: CollectionSummary[];
}) {
  const t = useTranslations("collection");

  return (
    <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
      {collections.map((c) => (
        <Link
          key={c.meta.slug}
          href={`/collection/${c.meta.slug}`}
          className="block bg-surface border border-border rounded-2xl overflow-hidden group hover:border-accent transition-colors"
        >
          {c.meta.coverImage && (
            <div className="relative w-full aspect-[16/9] bg-surface-2">
              <Image
                src={c.meta.coverImage.url}
                alt={c.frontmatter.title}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
            </div>
          )}
          <div className="p-4">
            <p className="text-[0.72rem] font-mono text-muted uppercase tracking-wide">
              {t("placesCount", { count: c.meta.placeSlugs.length })}
            </p>
            <h2 className="mt-1 font-serif italic font-medium text-[1.2rem] group-hover:text-accent-ink transition-colors">
              {c.frontmatter.title}
            </h2>
            <p className="mt-1 text-[0.88rem] text-muted">{c.frontmatter.dek}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
