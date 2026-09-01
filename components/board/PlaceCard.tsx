import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import Byline from "@/components/layout/Byline";
import FavoriteButton from "./FavoriteButton";
import { CATEGORY_COLOR_VAR } from "@/lib/content/categories";
import type { PlaceSummary } from "@/lib/content/schema";
import type { UpcomingEvent } from "@/lib/content/loader";

/**
 * Distance the way a person would say it: metres up close, kilometres
 * once that stops being useful. `toFixed(0)` alone renders anything
 * inside a kilometre as "0 km", which reads as a bug.
 */
function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  if (km < 10) return `${km.toFixed(1)} km`;
  return `${Math.round(km)} km`;
}

export default function PlaceCard({
  place,
  distanceKm,
  upcomingEvent,
  tab,
  featured = false,
}: {
  place: PlaceSummary;
  distanceKm?: number;
  upcomingEvent?: UpcomingEvent;
  /** Decides which stat leads the card — see the stat bar below. */
  tab?: "nearest" | "latest";
  /** Wide treatment on desktop/tablet. Rhythm, not ranking — see PlaceCards. */
  featured?: boolean;
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

  // Absolute date rather than "3 days ago" on purpose. This card renders
  // on the server and again on the client, and any relative time is a
  // hydration mismatch waiting for a slow build or a stale ISR page.
  const postedOn = new Date(place.meta.publishedAt).toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "2-digit",
  });

  const sources = place.meta.sources;
  const leadSource = sources[0];

  return (
    <Link
      href={`/place/${place.meta.slug}`}
      className="group flex h-full flex-col border-[3px] border-ink bg-surface shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
    >
      <div
        className={`relative w-full bg-surface-2 border-b-[3px] border-ink overflow-hidden ${
          featured ? "aspect-[4/3] md:aspect-[16/9]" : "aspect-[4/3]"
        }`}
      >
        {place.meta.heroImage ? (
          <Image
            src={place.meta.heroImage.url}
            alt=""
            fill
            sizes={
              featured
                ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 620px"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
            }
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
        <FavoriteButton slug={place.meta.slug} />
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

      {/* The two things a reader judges a card by before reading it:
          how far away it is (or how fresh it is), and who says so.
          Both used to be a grey afterthought in the footer. */}
      <div className="flex items-center justify-between gap-2 px-2.5 py-1 bg-surface-2 border-b-[3px] border-ink font-mono text-[0.62rem] uppercase tracking-wide">
        {tab === "nearest" && distanceKm !== undefined ? (
          <span className="font-bold whitespace-nowrap">
            {formatDistance(distanceKm)} {tp("away")}
          </span>
        ) : (
          <span className="font-bold whitespace-nowrap">{postedOn}</span>
        )}
        {leadSource && (
          <span
            className="flex items-baseline gap-1 min-w-0 text-muted"
            title={sources.map((s) => s.name).join(", ")}
          >
            <span className="truncate">{leadSource.name}</span>
            {sources.length > 1 && (
              <span className="flex-none">+{sources.length - 1}</span>
            )}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5 p-2.5 flex-1">
        {/* shortTitle is a catchy angle ("The Kiosk That Raised the Flag
            First"), not necessarily a name a reader recognizes — without
            this, a card can read as unclear about what place it even is. */}
        {place.frontmatter.shortTitle && (
          <span className="font-mono text-[0.62rem] uppercase tracking-wide text-muted truncate">
            {place.frontmatter.name}
          </span>
        )}
        <h3
          className={`leading-[1.15] group-hover:bg-accent group-hover:text-black transition-colors self-start ${
            featured ? "text-[0.95rem] md:text-[1.3rem]" : "text-[0.95rem]"
          }`}
        >
          {headline}
        </h3>
        <p className="font-mono text-[0.66rem] leading-snug text-muted line-clamp-2">
          {place.frontmatter.tagline}
        </p>
        {place.snippet && (
          <p
            className={`text-[0.78rem] leading-snug ${
              featured ? "line-clamp-3 md:line-clamp-4 md:text-[0.86rem]" : "line-clamp-3"
            }`}
          >
            {place.snippet}
          </p>
        )}

        <div className="mt-auto pt-1.5 flex items-center justify-between gap-2 border-t border-ink/25">
          <Byline slug={place.meta.author} asLink={false} />
          <span className="font-mono text-[0.6rem] text-muted whitespace-nowrap">
            {place.meta.place.city}
          </span>
        </div>
      </div>
    </Link>
  );
}
