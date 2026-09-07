/**
 * A two-lane process diagram for an argument piece.
 *
 * Exists because of an operator directive (2026-09-07): PARSER's column,
 * The Failure Mode, "could always include some lucid chart (but not ugly)
 * type of visual flow" built with the vector-derived method. See
 * `near-illustrator`'s style repertoire — "precise vector-derived
 * abstraction: a small vocabulary of deliberate geometric forms, hard
 * edges, and the existing Near palette, composed in SVG/code."
 *
 * Composed as live markup rather than a rasterized PNG, which is a
 * deliberate departure from that entry's "and then rasterized" clause.
 * Three reasons, all of which apply specifically to charts and not to the
 * abstract heroes that clause was written for:
 *
 *   1. Near publishes six locales. A raster bakes English labels into an
 *      image, so either five locales get a chart they can't read or the
 *      art gets regenerated six times per issue.
 *   2. `near-illustrator` bans "anything with garbled text baked into it."
 *      A generated raster of a labelled diagram is the single most
 *      reliable way to produce exactly that. Markup cannot garble text.
 *   3. A raster can't reflow. On a phone a wide flow chart becomes an
 *      unreadable strip; this reflows to a vertical stack, with the
 *      connectors rotating to match.
 *
 * It also stays theme-aware for free (the tokens resolve per theme), the
 * labels are selectable and searchable, and screen readers get a real
 * ordered list instead of alt text approximating one.
 *
 * The visual grammar is deliberately the site's own: hard 2px ink strokes,
 * offset shadow, mono type, acid green reserved for the single moment the
 * diagram is actually about. It is a chart, not decoration — every issue
 * that uses it should have one claim the picture makes better than the
 * paragraph does.
 */

function Arrow({ label }: { label?: string }) {
  return (
    <div
      className="flex shrink-0 flex-col items-center justify-center gap-1 self-center py-2 md:py-0"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 rotate-90 text-ink md:rotate-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="square"
      >
        <path d="M3 12h16M13 6l6 6-6 6" />
      </svg>
      {label && (
        <span className="font-mono text-[0.6rem] uppercase tracking-wide text-muted">
          {label}
        </span>
      )}
    </div>
  );
}

function Step({ label, note }: { label: string; note?: string }) {
  return (
    <div className="flex-1 border-2 border-ink bg-surface p-2.5 shadow-[3px_3px_0_var(--ink)]">
      <span className="block font-mono text-[0.7rem] font-semibold uppercase leading-tight tracking-wide text-ink">
        {label}
      </span>
      {note && (
        <span className="mt-1 block font-mono text-[0.65rem] leading-snug text-muted">
          {note}
        </span>
      )}
    </div>
  );
}

function Lane({
  label,
  steps,
}: {
  label: string;
  steps: { label: string; note?: string }[];
}) {
  return (
    <div>
      <p className="mb-2 inline-block border-2 border-ink bg-ink px-1.5 py-0.5 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-paper">
        {label}
      </p>
      {/* ol > li > div, deliberately: the arrows have to live *inside* a
          list item, since an ol may only contain li children and an li may
          not contain another li. Each item is itself a flex row so the box
          and its trailing connector sit side by side. */}
      <ol className="flex flex-col md:flex-row md:items-stretch">
        {steps.map((step, i) => (
          <li
            key={step.label}
            className="flex flex-1 flex-col md:flex-row md:items-stretch"
          >
            <Step label={step.label} note={step.note} />
            {i < steps.length - 1 && <Arrow />}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function FlowDiagram({
  title,
  machineLabel,
  machineSteps,
  handoffLabel,
  humanLabel,
  humanSteps,
  loopLabel,
  caption,
}: {
  title: string;
  machineLabel: string;
  machineSteps: { label: string; note?: string }[];
  /** The one transition the diagram exists to make visible. Gets the accent. */
  handoffLabel: string;
  humanLabel: string;
  humanSteps: { label: string; note?: string }[];
  /** The feedback edge — what sends the process back to the top. */
  loopLabel?: string;
  caption?: string;
}) {
  return (
    <figure className="my-8">
      <div className="border-[4px] border-ink bg-surface-2 p-4">
        <p className="mb-4 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-ink">
          {title}
        </p>

        <Lane label={machineLabel} steps={machineSteps} />

        {/* The handoff is the whole argument: the point where the machine
            stops being allowed to decide. It is the only accented element. */}
        <div className="my-3 flex items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 shrink-0 rotate-90 text-ink"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="square"
            aria-hidden="true"
          >
            <path d="M3 12h16M13 6l6 6-6 6" />
          </svg>
          <span className="border-2 border-ink bg-accent px-1.5 py-0.5 font-mono text-[0.65rem] font-semibold uppercase tracking-wide text-black">
            {handoffLabel}
          </span>
          <span className="h-0.5 flex-1 bg-ink" aria-hidden="true" />
        </div>

        <Lane label={humanLabel} steps={humanSteps} />

        {loopLabel && (
          <div className="mt-3 flex items-center gap-2 border-t-2 border-dashed border-ink pt-2">
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 shrink-0 text-muted"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="square"
              aria-hidden="true"
            >
              <path d="M21 12H5M11 6l-6 6 6 6" />
            </svg>
            <span className="font-mono text-[0.65rem] uppercase tracking-wide text-muted">
              {loopLabel}
            </span>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-1.5 font-mono text-[0.72rem] text-muted">
          <span className="text-ink">{caption}</span>
          <span className="opacity-50"> · </span>
          <span>Diagram by NEAR</span>
        </figcaption>
      )}
    </figure>
  );
}
