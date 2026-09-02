import { useTranslations } from "next-intl";

export default function ReasonsList({
  bullets,
  // Collections reuse this box under their own heading ("Why you should
  // go"), so the label is overridable while the styling stays shared.
  title,
}: {
  bullets: string[];
  title?: string;
}) {
  const t = useTranslations("place");

  return (
    <section className="mt-8 max-w-[65ch] border-[3px] border-ink bg-surface p-4 shadow-[var(--shadow-sm)]">
      <h2 className="text-[1.05rem] mb-3">{title ?? t("reasonsToCheckOut")}</h2>
      <ul className="space-y-2">
        {bullets.map((bullet, i) => (
          <li
            key={i}
            className="flex gap-2.5 font-mono text-[0.85rem] leading-relaxed"
          >
            <span
              aria-hidden="true"
              className="mt-1.5 w-2 h-2 bg-accent border border-ink flex-none"
            />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
