"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { getConsent, setConsent } from "@/lib/consent";

/**
 * The one consent decision this site asks for: GA4, specifically.
 *
 * Vercel Analytics needed no banner because it's cookieless — this
 * banner exists purely because GA4 doesn't share that property. Declining
 * changes nothing else about the site; there's no dark pattern here
 * because there's only one real toggle.
 */
export default function ConsentBanner() {
  const t = useTranslations("consent");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Nothing to ask about if GA4 was never configured.
    if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) return;
    setVisible(getConsent() === null);
  }, []);

  if (!visible) return null;

  function choose(value: "accepted" | "declined") {
    setConsent(value);
    setVisible(false);
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[1300] border-t-[4px] border-ink bg-surface px-4 py-3 shadow-[var(--shadow)]">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-3">
        <p className="m-0 flex-1 min-w-[220px] font-mono text-[0.78rem] leading-snug text-ink">
          {t("body")}
        </p>
        <div className="flex gap-2 flex-none">
          <button
            type="button"
            onClick={() => choose("declined")}
            className="border-[2px] border-ink bg-surface px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-wide hover:bg-surface-2 transition-colors"
          >
            {t("decline")}
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="border-[2px] border-ink bg-accent text-black px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-wide hover:bg-ink hover:text-surface transition-colors"
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
