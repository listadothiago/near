"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { routing } from "@/lib/i18n/routing";

const LABELS: Record<string, string> = {
  en: "EN",
  "pt-BR": "PT-BR",
  it: "IT",
  "es-ES": "ES",
  "es-419": "ES-419",
  "zh-CN": "中文",
};

export default function LocaleSwitcher() {
  const activeLocale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 font-mono text-[0.78rem]">
      {routing.locales.map((locale, i) => (
        <span key={locale} className="flex items-center gap-1">
          {i > 0 && <span className="text-muted/50">·</span>}
          <Link
            href={pathname}
            locale={locale}
            className={
              locale === activeLocale
                ? "text-ink font-semibold"
                : "text-muted hover:text-accent-ink"
            }
          >
            {LABELS[locale]}
          </Link>
        </span>
      ))}
    </div>
  );
}
