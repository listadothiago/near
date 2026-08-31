import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import Byline from "@/components/layout/Byline";
import { CATEGORY_COLOR_VAR } from "@/lib/content/categories";
import { TAG_GLYPH } from "@/lib/content/tags";
import type { PlaceSummary } from "@/lib/content/schema";
import type { UpcomingEvent } from "@/lib/content/loader";

export default function PlaceCard({
  place,
  distanceKm,
  upcomingEvent,
}: {
  place: PlaceSummary;
  distanceKm?: number;
  upcomingEvent?: UpcomingEvent;
}) {
  const t = useTranslations("categories");
  const tp = useTranslations("place");
  const locale = useLocale();
  const categoryColor = `var(${CATEGORY_COLOR_VAR[place.meta.categories[0]]})`;
  const headline = place.frontmatter.shortTitle ?? place.frontmatter.name;
  const eventDate = upcomingEvent
    ? new Date(upcomingEvent.startsAt ?? upcomingEvent.endsAt).toLocaleDateString(
        locale,
        { day: "numeric", month: "short" },
      )
    : null;

  return (
    <Link
      href={`/place/${place.meta.slug}`}
      className="group flex flex-col border-[3px] border-ink bg-surface shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
    >
      <div className="relative w-full aspect-[4/3] bg-surface-2 border-b-[3px] border-ink overflow-hidden">
        {place.meta.heroImage ? (
          <Image
            src={place.meta.heroImage.url}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
            className="object-cover"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: categoryColor, opacity: 0.3 }}
          />
        )}
        <span
          className="absolute top-0 left-0 px-1.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wide text-black border-r-[3px] border-b-[3px] border-ink"
          style={{ background: "var(--accent)" }}
        >
          {t(place.meta.categories[0])}
        </span>
      </div>

      {/* A venue with something coming up says so on the card, rather than
          the event existing as a competing listing for the same address. */}
      {upcomingEvent && (
        <div className="flex items-baseline gap-1.5 px-2.5 py-1 bg-accent text-black border-b-[3px] border-ink">
          <span className="font-mono text-[0.58rem] uppercase tracking-wide font-bold flex-none">
            {tp("nextEvent")}
          </span>
          <span className="font-mono text-[0.62rem] truncate">
            {upcomingEvent.shortTitle ?? upcomingEvent.name}
          </span>
          <span className="font-mono text-[0.58rem] ml-auto flex-none">
            {eventDate}
          </span>
        </div>
      )}

      <div className="flex flex-col gap-1.5 p-2.5 flex-1">
        <h3 className="text-[0.95rem] leading-[1.15] group-hover:bg-accent group-hover:text-black transition-colors self-start">
          {headline}
        </h3>
        <p className="font-mono text-[0.66rem] leading-snug text-muted line-clamp-2">
          {place.frontmatter.tagline}
        </p>

        {place.meta.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {place.meta.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                aria-hidden="true"
                className="border border-ink px-1 font-mono text-[0.6rem] leading-tight"
              >
                {TAG_GLYPH[tag]}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-1.5 flex items-center justify-between gap-2 border-t border-ink/25">
          <Byline slug={place.meta.author} asLink={false} />
          <span className="font-mono text-[0.6rem] text-muted whitespace-nowrap">
            {distanceKm !== undefined && `${distanceKm.toFixed(0)} km · `}
            {place.meta.place.city}
          </span>
        </div>
      </div>
    </Link>
  );
}
