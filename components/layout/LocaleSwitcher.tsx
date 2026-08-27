"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { routing } from "@/lib/i18n/routing";

const FLAGS: Record<string, string> = {
  en: "🇺🇸",
  "pt-BR": "🇧🇷",
  it: "🇮🇹",
  "es-ES": "🇪🇸",
  "es-419": "🌎",
  "zh-CN": "🇨🇳",
};

const NAMES: Record<string, string> = {
  en: "English (US)",
  "pt-BR": "Português (Brasil)",
  it: "Italiano",
  "es-ES": "Español (España)",
  "es-419": "Español (Latinoamérica)",
  "zh-CN": "中文（简体）",
};

export default function LocaleSwitcher() {
  const activeLocale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("a11y");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("changeLanguage")}
        aria-expanded={open}
        className="flex items-center justify-center w-9 h-9 rounded-full border border-border bg-surface text-[1.05rem] leading-none hover:border-accent"
      >
        <span aria-hidden="true">{FLAGS[activeLocale]}</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+6px)] z-20 bg-surface border border-border rounded-xl shadow-[0_10px_28px_rgba(32,38,42,.12)] p-1.5 flex flex-col gap-0.5 min-w-[44px]"
        >
          {routing.locales.map((locale) => (
            <Link
              key={locale}
              role="menuitem"
              href={pathname}
              locale={locale}
              onClick={() => setOpen(false)}
              aria-label={NAMES[locale]}
              className={`flex items-center justify-center w-9 h-9 rounded-lg text-[1.1rem] leading-none hover:bg-surface-2 ${
                locale === activeLocale ? "bg-surface-2" : ""
              }`}
            >
              <span aria-hidden="true">{FLAGS[locale]}</span>
              <span className="sr-only">{NAMES[locale]}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
