import { useTranslations, useLocale } from "next-intl";
import { formatContentDate, isRevised } from "@/lib/content/freshness";

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

  return (
    <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.72rem] uppercase tracking-wide text-muted">
      <span>
        {t("published")}{" "}
        <time dateTime={publishedAt}>
          {formatContentDate(publishedAt, locale)}
        </time>
      </span>
      {revised && (
        <>
          <span aria-hidden="true" className="opacity-50">
            ·
          </span>
          {/* The revision is the claim being made, so it gets the accent
              box and the publish date stays plain text beside it. */}
          <span className="inline-flex items-center gap-1 border-[3px] border-ink bg-accent px-2 py-0.5 font-bold text-black">
            {t("revised")}{" "}
            <time dateTime={updatedAt}>
              {formatContentDate(updatedAt, locale)}
            </time>
          </span>
        </>
      )}
    </p>
  );
}
