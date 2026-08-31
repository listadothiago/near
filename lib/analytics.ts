"use client";

import { track } from "@vercel/analytics";

/**
 * Near's conversion events.
 *
 * There's no checkout, so the funnel isn't linear — it's depth of
 * relationship. Reach -> engage -> return -> commit -> advocate. These
 * are the points on that ladder worth counting.
 *
 * Vercel Analytics is cookieless, which is the whole reason Near needs
 * no consent banner. Nothing here may ever carry personal data: no
 * coordinates, no free text, no identifiers. Slugs and slot names only.
 */
export type NearEvent =
  /** COMMIT — the strongest signal Near has. A home-screen icon is a
   *  repeat visitor, and it's the closest thing to a signup that costs
   *  the reader nothing. Primary conversion goal. */
  | "install_accepted"
  | "install_dismissed"
  /** RETURN — first real intent, no login required. Secondary goal. */
  | "favorite_added"
  | "favorite_removed"
  /** Diagnostic rather than a goal: rare by nature, and mostly says
   *  someone is about to change device. */
  | "favorites_exported"
  /** ADVOCATE — free acquisition. */
  | "share_native"
  | "share_copied"
  /** ENGAGE — for an ad-supported site this is the number that actually
   *  moves revenue, and it's what the placements exist to improve. */
  | "engaged_session"
  /** Placement performance, so internal promos can be judged before real
   *  inventory ever runs. */
  | "placement_view"
  | "placement_click";

export function nearTrack(
  event: NearEvent,
  props?: Record<string, string | number | boolean>,
) {
  try {
    track(event, props);
  } catch {
    // Analytics must never take a page down.
  }
}
