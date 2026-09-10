import { useTranslations } from "next-intl";

/**
 * Required control on every tier-1 Google Maps/official-site/Instagram
 * hero per content/rules.md's HERO IMAGE TIERS entry (operator,
 * 2026-09-10) — that tier's whole legal basis is take-down-on-request,
 * so the request path has to actually be reachable from the image
 * itself, not just documented as a policy. Reuses the existing inbox
 * form's "removal" type rather than a new channel.
 */
export default function ReportImageLink({ imageUrl }: { imageUrl: string }) {
  const t = useTranslations("image");
  return (
    <a
      href={`/sources?reportImage=${encodeURIComponent(imageUrl)}#submit-form`}
      className="hover:text-accent-ink underline decoration-muted/40 underline-offset-2"
    >
      {t("report")}
    </a>
  );
}
