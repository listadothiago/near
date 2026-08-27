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
  return (
    <Link
      href={`/place/${place.meta.slug}`}
      className="flex gap-2.5 py-2.5 border-t border-border first:border-t-0 group"
    >
      <span
        className="w-2 h-2 rounded-full mt-1.5 flex-none"
        style={{ background: `var(${CATEGORY_COLOR_VAR[place.meta.category]})` }}
      />
      <div>
        <div className="font-semibold text-[0.92rem] group-hover:text-accent-ink transition-colors">
          {place.frontmatter.name}
        </div>
        <div className="text-[0.76rem] text-muted font-mono mt-0.5">
          {distanceKm !== undefined && `${distanceKm.toFixed(0)} km · `}
          {place.meta.place.city}, {place.meta.place.country} · {place.meta.source.name}
        </div>
      </div>
    </Link>
  );
}
