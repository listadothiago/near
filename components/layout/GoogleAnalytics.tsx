"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { getConsent } from "@/lib/consent";

/**
 * GA4, loaded only after explicit consent — and only if a measurement ID
 * is actually configured. Vercel Analytics stays ungated; this is the
 * one piece of the site that sets cookies, so it's the one piece gated.
 *
 * No measurement ID means no script tag at all, not a broken one — so
 * an unconfigured deploy fails silently rather than shipping a
 * half-wired tracker.
 */
export default function GoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = () => setAllowed(getConsent() === "accepted");
    sync();
    window.addEventListener("near-consent-change", sync);
    return () => window.removeEventListener("near-consent-change", sync);
  }, []);

  if (!id || !allowed) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
