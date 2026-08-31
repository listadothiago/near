"use client";

/**
 * Consent gate for GA4 specifically.
 *
 * Vercel Analytics stays cookieless and ungated — it's the reason Near
 * needed no banner at all until now. GA4 sets cookies and is what makes
 * a consent mechanism necessary in the first place, so only GA4's script
 * is gated on this; nothing else on the site should ever read this key.
 */
const KEY = "near-ga-consent";

export type Consent = "accepted" | "declined" | null;

export function getConsent(): Consent {
  try {
    const v = localStorage.getItem(KEY);
    return v === "accepted" || v === "declined" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: "accepted" | "declined") {
  try {
    localStorage.setItem(KEY, value);
    window.dispatchEvent(new Event("near-consent-change"));
  } catch {
    // Consent must never crash the page.
  }
}
