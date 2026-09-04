import fs from "node:fs";
import path from "node:path";
import { placeMetaSchema, collectionMetaSchema } from "./schema";
import { isRevised, type SiteFreshness } from "./freshness";

const PLACES_ROOT = path.join(process.cwd(), "content", "places");
const COLLECTIONS_ROOT = path.join(process.cwd(), "content", "collections");

/**
 * Deliberately reads `meta.json` only — never the MDX bodies and never a
 * locale resolution. The header renders on every page of the site, so
 * this cannot be a full content scan: `getAllPlaces()` parses every
 * locale file through gray-matter and Zod for all ~300 places, which is
 * the wrong order of magnitude for a strip of chrome. Meta files are
 * small, already schema-validated, and locale-independent, so one pass
 * over them answers the question.
 *
 * Memoized at module scope on top of that. Content is read from disk and
 * cannot change within a running server, so the first page to ask pays
 * for the scan and every subsequent render — of any page, in any locale
 * — reads the cached answer. This mirrors how the rest of `lib/content/`
 * treats the content tree as build-time-immutable.
 */
let cached: SiteFreshness | null = null;

export function getSiteFreshness(): SiteFreshness | null {
  if (cached) return cached;

  let best: SiteFreshness | null = null;

  function consider(at: string, href: string, kind: SiteFreshness["kind"]) {
    const t = new Date(at).getTime();
    if (Number.isNaN(t)) return;
    // Never let a bad clock or a fat-fingered future date pin the header
    // to a timestamp that hasn't happened.
    if (t > Date.now()) return;
    if (!best || t > new Date(best.at).getTime()) best = { at, href, kind };
  }

  function scan(
    root: string,
    parse: (raw: unknown) => {
      slug: string;
      status: string;
      publishedAt: string;
      updatedAt: string;
    },
    prefix: string,
  ) {
    if (!fs.existsSync(root)) return;
    for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const metaPath = path.join(root, entry.name, "meta.json");
      if (!fs.existsSync(metaPath)) continue;
      let meta;
      try {
        meta = parse(JSON.parse(fs.readFileSync(metaPath, "utf8")));
      } catch {
        // A malformed or draft-shaped meta file must not take the header
        // down on every page of the site.
        continue;
      }
      // Drafts and archived pieces aren't the site's public freshness.
      if (meta.status === "draft" || meta.status === "archived") continue;
      const href = `${prefix}/${meta.slug}`;
      consider(meta.publishedAt, href, "published");
      if (isRevised(meta.publishedAt, meta.updatedAt)) {
        consider(meta.updatedAt, href, "revised");
      }
    }
  }

  scan(PLACES_ROOT, (raw) => placeMetaSchema.parse(raw), "/place");
  scan(COLLECTIONS_ROOT, (raw) => collectionMetaSchema.parse(raw), "/collection");

  cached = best;
  return best;
}
