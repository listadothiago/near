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
      // Cross-language bleed. Twice now a stray token from another
      // language has landed mid-sentence in a zh-CN file (a Russian word,
      // then an English one) — invisible on review unless you read every
      // character. Latin letters are legitimate in Chinese copy for proper
      // nouns and URLs, so only flag a Latin run wedged directly between
      // two CJK characters, which is what the bleed looks like.
      if (f === "zh-CN.mdx") {
        const body = readFileSync(join(dir, f), "utf8");
        // Lowercase only: "Shoreditch" or "DJ" wedged between CJK is a
        // proper noun and correct; "professional" or "historic" is an
        // English word that leaked in mid-sentence.
        const bleed = body.match(/[\u4e00-\u9fff][a-z]{3,}[\u4e00-\u9fff]/g);
        if (bleed) {
          problems.push(`${kind}/${slug}/${f}  latin wedged in CJK: ${[...new Set(bleed)].join(", ")}`);
        }
        const cyr = body.match(/[\u0400-\u04FF]+/g);
        if (cyr) {
          problems.push(`${kind}/${slug}/${f}  cyrillic: ${[...new Set(cyr)].join(", ")}`);
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
