import type { LocationFreshnessStats } from "@/lib/content/locationPages";

/**
 * "12 places · 9 checked in the last 90 days · newest 4 days ago."
 *
 * The design note called this the layer-2 page's whole credibility claim
 * in one row of mono type, and it's the one line here a directory
 * competitor cannot honestly print.
 *
 * Pure presentation: the arithmetic and the clock read both live in
 * `summarizeFreshness`, because a render must not call an impure function.
 */
export default function LocationFreshness({
  stats,
  labels,
}: {
  stats: LocationFreshnessStats;
  labels: {
    places: (n: number) => string;
    checked: (n: number) => string;
    newestToday: string;
    newest: (n: number) => string;
  };
}) {
  const parts = [
    labels.places(stats.total),
    labels.checked(stats.recent),
    stats.newestDays === 0
      ? labels.newestToday
      : labels.newest(stats.newestDays),
  ];

  return (
    <p className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-[var(--muted)] border-t-[length:var(--stroke)] border-[var(--ink)] pt-2 mb-6">
      {parts.join(" · ")}
    </p>
  );
}
