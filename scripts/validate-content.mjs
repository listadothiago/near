#!/usr/bin/env node
/**
 * Checks every place/collection locale file against the frontmatter
 * limits in lib/content/schema.ts, without needing a full Next build.
 *
 * A build failure only names the first page that blew up, which is
 * useless when backfilling dozens of locale files at once — this lists
 * every violation in one pass.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const LIMITS = { shortTitle: 48, tagline: 90, seoDescription: 320, dek: 160 };
const problems = [];

function frontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  return m ? m[1] : "";
}

function checkDir(root, kind) {
  if (!existsSync(root)) return;
  for (const slug of readdirSync(root)) {
    const dir = join(root, slug);
    let files;
    try {
      files = readdirSync(dir).filter((f) => f.endsWith(".mdx"));
    } catch {
      continue;
    }
    for (const f of files) {
      const fm = frontmatter(readFileSync(join(dir, f), "utf8"));
      for (const [field, max] of Object.entries(LIMITS)) {
        const m = fm.match(new RegExp(`^${field}: "([\\s\\S]*?)"$`, "m"));
        if (!m) continue;
        const len = [...m[1]].length;
        if (len > max) {
          problems.push(`${kind}/${slug}/${f}  ${field} ${len}>${max}`);
        }
      }
      // bullets: schema requires >= 3
      const bullets = (fm.match(/^\s*- "/gm) || []).length;
      if (kind === "places" && bullets > 0 && bullets < 3) {
        problems.push(`${kind}/${slug}/${f}  only ${bullets} bullets (min 3)`);
      }
    }
  }
}

checkDir("content/places", "places");
checkDir("content/collections", "collections");

if (problems.length === 0) {
  console.log("content ok — all frontmatter within schema limits");
} else {
  console.log(`${problems.length} problem(s):\n`);
  for (const p of problems) console.log("  " + p);
  process.exit(1);
}
