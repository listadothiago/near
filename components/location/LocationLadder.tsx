import { Link } from "@/lib/i18n/navigation";
import type { LocationPage } from "@/lib/content/locationPages";

/**
 * Traversal between the four rungs of the location ladder.
 *
 * The design note argued a location page should *feel* like a position in
 * a hierarchy rather than a flat bucket, and this is the element carrying
 * that. It matters most at the coarse end: a country page's job is mostly
 * to route you down to the levels that actually hold pins.
 *
 * Only published rungs are ever linked — `getAncestors`/`getChildren`
 * filter to locations that cleared the coverage floor, so this can't send
 * a reader to a 404.
 */
export default function LocationLadder({
  ancestors,
  descendants,
  countLabel,
}: {
  ancestors: LocationPage[];
  descendants: LocationPage[];
  countLabel: (n: number) => string;
}) {
  if (ancestors.length === 0 && descendants.length === 0) return null;

  return (
    <nav className="mb-6 flex flex-col gap-3">
      {ancestors.length > 0 && (
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-[var(--muted)]">
          {ancestors.map((a, i) => (
            <li key={a.segments.join("/")} className="flex items-center gap-2">
              <Link
                href={`/in/${a.segments.join("/")}`}
                className="underline underline-offset-4 hover:text-[var(--ink)]"
              >
                {a.label}
              </Link>
              {/* Separator between rungs, not after the last one — the
                  trailing slash read as a broken link. */}
              {i < ancestors.length - 1 && <span aria-hidden="true">/</span>}
            </li>
          ))}
        </ol>
      )}

      {descendants.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {descendants.map((c) => (
            <li key={c.segments.join("/")}>
              <Link
                href={`/in/${c.segments.join("/")}`}
                className="inline-flex items-baseline gap-1.5 border-[length:var(--stroke)] border-[var(--ink)] px-2.5 py-1 text-[0.85rem] hover:shadow-[var(--shadow-sm)] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-transform"
              >
                <span>{c.label}</span>
                <span className="font-mono text-[0.7rem] text-[var(--muted)]">
                  {countLabel(c.places.length)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
