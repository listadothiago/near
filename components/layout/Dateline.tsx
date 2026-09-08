"use client";

import { useTranslations, useLocale } from "next-intl";
import { isRevised } from "@/lib/content/freshness";
import { useContentDateText } from "@/lib/content/useContentDateText";

/**
 * The reader-facing evidence for the tagline's freshness claim, at the
 * top of every place and collection page.
 *
 * Both dates are only ever shown together when they actually say
 * different things — see isRevised(). Printing "Published 4
 * Jun · Revised 5 Jun" on every piece is noise that trains readers to
 * skip the line, which costs the site the one signal it was added to
 * send.
 */
export default function Dateline({
  publishedAt,
  updatedAt,
}: {
  publishedAt: string;
  updatedAt: string;
}) {
  const t = useTranslations("freshness");
  const locale = useLocale();
  const revised = isRevised(publishedAt, updatedAt);
  const publishedText = useContentDateText(publishedAt, locale);
  const updatedText = useContentDateText(updatedAt, locale);

  return (
    <p className="mt-3 flex flex-wrap items-center gap-2 font-mono text-[0.72rem] uppercase tracking-wide">
      {/* Own badge, not plain text (operator, 2026-09-08: recency should
          read as a badge on the card AND the article page) — lime-on-
          black, matching the board card's recency badge. */}
      <span className="inline-flex items-center gap-1 border-[2px] border-ink bg-ink px-2 py-0.5 font-black text-accent">
        {t("published")} <time dateTime={publishedAt}>{publishedText}</time>
      </span>
      {revised && (
        // The revision is the newer claim, so it gets the brighter
        // black-on-lime treatment and sits beside the (still true)
        // publish badge rather than replacing it.
        <span className="inline-flex items-center gap-1 border-[2px] border-ink bg-accent px-2 py-0.5 font-black text-black">
          {t("revised")} <time dateTime={updatedAt}>{updatedText}</time>
        </span>
      )}
    </p>
  );
}
