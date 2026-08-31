import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import type { UpcomingEvent } from "@/lib/content/loader";

// What's actually coming up at a venue, listed on the venue's own page.
// Each event keeps its own page — this is the way in, not a replacement
// for it.
export default function UpcomingEvents({
  events,
}: {
  events: UpcomingEvent[];
}) {
  const t = useTranslations("place");
  const locale = useLocale();
  if (events.length === 0) return null;

  return (
    <section className="mt-8 max-w-[65ch]">
      <h2 className="text-[1.05rem] mb-3">{t("upcomingHere")}</h2>
      <ul className="flex flex-col gap-2">
        {events.map((e) => {
          const when = new Date(e.startsAt ?? e.endsAt);
          return (
            <li key={e.slug}>
              <Link
                href={`/place/${e.slug}`}
                className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-[3px] border-ink bg-surface px-3 py-2 shadow-[var(--shadow-sm)] hover:bg-accent hover:text-black transition-colors"
              >
                <span className="font-display font-bold uppercase tracking-[-0.5px] text-[0.95rem]">
                  {e.name}
                </span>
                <span className="font-mono text-[0.72rem] ml-auto whitespace-nowrap">
                  {when.toLocaleDateString(locale, {
                    day: "numeric",
                    month: "long",
                  })}
                  {e.startsAt &&
                    ` · ${when.toLocaleTimeString(locale, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
