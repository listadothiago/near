import { useTranslations } from "next-intl";

export default function ReasonsList({ bullets }: { bullets: string[] }) {
  const t = useTranslations("place");

  return (
    <section className="mt-8 max-w-[65ch]">
      <h2 className="font-serif font-medium text-[1.15rem] mb-3">
        {t("reasonsToCheckOut")}
      </h2>
      <ul className="space-y-2.5">
        {bullets.map((bullet, i) => (
          <li key={i} className="flex gap-2.5 text-[1rem] leading-relaxed">
            <span className="text-accent mt-0.5 flex-none">—</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
