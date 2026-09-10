export default function PublishNote({
  quote,
  attributedTo,
}: {
  quote: string;
  attributedTo: string;
}) {
  return (
    <section className="mt-3 max-w-[65ch] rounded-[var(--radius-panel)] border-[3px] border-ink bg-surface p-4 shadow-[var(--shadow-sm)]">
      <p className="font-sans text-[0.95rem] leading-relaxed italic">
        “{quote}”
      </p>
      <p className="mt-2 font-mono text-[0.75rem] uppercase tracking-wide text-muted">
        — {attributedTo}
      </p>
    </section>
  );
}
