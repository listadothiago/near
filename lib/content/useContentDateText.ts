"use client";

import { useEffect, useState } from "react";
import { formatContentDate } from "./freshness";

const DIVISIONS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 60 * 60 * 24 * 365],
  ["month", 60 * 60 * 24 * 30],
  ["week", 60 * 60 * 24 * 7],
  ["day", 60 * 60 * 24],
  ["hour", 60 * 60],
  ["minute", 60],
];

function formatRelative(iso: string, locale: string): string {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  const diffSec = (new Date(iso).getTime() - Date.now()) / 1000;
  const abs = Math.abs(diffSec);
  for (const [unit, secs] of DIVISIONS) {
    if (abs >= secs) return rtf.format(Math.round(diffSec / secs), unit);
  }
  return rtf.format(Math.round(diffSec), "second");
}

/**
 * Hydration-safe display text for a content date (operator, 2026-09-08:
 * past dates should read "3 days ago"/"2 weeks ago" etc, future dates
 * stay absolute).
 *
 * Absolute (via `formatContentDate`) until mount, so the server render
 * and the first client paint agree byte for byte — `formatContentDate`'s
 * own doc comment explains why relative time can't be the *first* thing
 * rendered: a static/ISR page can outlive its build, and "3 days ago"
 * baked into cached HTML silently goes wrong the moment the cache does.
 * Swapping to relative only after mount keeps that guarantee: the
 * mismatch-prone render never happens, and the upgrade to relative time
 * happens client-side where it's always computed against the real
 * current time.
 *
 * A date in the future never swaps — it's a real point on the calendar
 * (an event, say), and "in 3 weeks" is a worse answer than the actual
 * date once the reader is deciding whether to go.
 */
export function useContentDateText(iso: string, locale: string): string {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const absolute = formatContentDate(iso, locale);
  if (!mounted) return absolute;

  const target = new Date(iso).getTime();
  if (Number.isNaN(target) || target > Date.now()) return absolute;

  return formatRelative(iso, locale);
}
