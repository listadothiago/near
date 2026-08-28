import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { CATEGORY_COLOR_VAR } from "@/lib/content/categories";
import type { PlaceSummary } from "@/lib/content/schema";

export default function PlaceRow({
  place,
  distanceKm,
}: {
  place: PlaceSummary;
  distanceKm?: number;
}) {
  const categoryColor = `var(${CATEGORY_COLOR_VAR[place.meta.categories[0]]})`;

  return (
    <Link
      href={`/place/${place.meta.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-3 py-2.5 border-t border-border first:border-t-0 group"
    >
      <div
        className="relative w-14 h-14 flex-none rounded-lg overflow-hidden bg-surface-2"
        style={
          place.meta.heroImage ? undefined : { background: categoryColor, opacity: 0.35 }
        }
      >
        {place.meta.heroImage && (
          <Image
            src={place.meta.heroImage.url}
            alt=""
            fill
            sizes="56px"
            className="object-cover"
          />
        )}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full flex-none"
            style={{ background: categoryColor }}
          />
          <span className="font-semibold text-[0.92rem] group-hover:text-accent-ink transition-colors">
            {place.frontmatter.name}
          </span>
        </div>
        <div className="text-[0.76rem] text-muted font-mono mt-0.5">
          {distanceKm !== undefined && `${distanceKm.toFixed(0)} km · `}
          {place.meta.place.city}, {place.meta.place.country} · {place.meta.sources[0].name}
          {place.meta.sources.length > 1 && ` +${place.meta.sources.length - 1}`}
        </div>
      </div>
    </Link>
  );
}
