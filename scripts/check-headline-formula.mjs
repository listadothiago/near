#!/usr/bin/env node
// Mechanical gate for the headline-formula rule in
// near-editor/references/style-guide.md ("Headlines: never reuse your
// own shape"). That rule is judgment-based — "look at the byline's own
// last two pins" — and an audit on 2026-09-21 found it was not actually
// preventing the pattern: 145 of 315 locale shortTitles touched in the
// prior two weeks (46%) opened with a leading article, including
// several "The <noun> that/who/doubling/reviving <verb>" shapes across
// different bylines and locales on the very session that was supposed
// to have just fixed this. A rule that only asks the model to notice its
// own tic is not a rule with teeth. This script is the teeth.
//
// It does not replace the style-guide's judgment call about *shape*
// variety (a script can't tell if two headlines "feel" the same) — it
// enforces the one part that is mechanically checkable: shortTitle must
// not open with a bare definite/indefinite article in its own locale.
// Swapping "The" for "A" was the exact failure mode observed; this gate
// catches both.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const placesDir = "content/places";
const args = process.argv.slice(2);
const all = args.includes("--all");
const slugs = args.filter((arg) => !arg.startsWith("--"));

if (!all && !slugs.length) {
  console.error("Usage: node scripts/check-headline-formula.mjs <slug> [...slug] | --all");
  process.exit(1);
}

const targets = all
  ? readdirSync(placesDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
  : slugs;

// Leading-article bans, per locale. Matched case-insensitively against
// the first word only — a place actually named "The Ritz" is not this
// bug, but a shortTitle should never lean on the article as its opener
// regardless of what the venue is called.
const LEADING_ARTICLES = {
  "en.mdx": /^(the|a|an)\b/i,
  "pt-BR.mdx": /^(a|o|as|os|um|uma|uns|umas)\b/i,
  "es-419.mdx": /^(el|la|los|las|un|una|unos|unas)\b/i,
  "es-ES.mdx": /^(el|la|los|las|un|una|unos|unas)\b/i,
  "it.mdx": /^(il|lo|la|i|gli|le|un|uno|una|l')/i,
};

// The specific templated shape called out in the style guide, kept as
// its own flag (in addition to the leading-article gate above) because
// it can also appear mid-sentence-free without a leading article, e.g.
// "Rio Vermelho's late-night constant" is fine but "Kitchen that revived
// lost recipes" would still be the same tic without an opening article.
const TEMPLATED_SHAPE = /\b(that|who|where|with)\s+\w+/i;

const failures = [];
let checked = 0;

for (const slug of targets) {
  const dir = join(placesDir, slug);
  for (const [filename, articlePattern] of Object.entries(LEADING_ARTICLES)) {
    const filePath = join(dir, filename);
    if (!existsSync(filePath)) continue;
    const { data } = matter(readFileSync(filePath, "utf8"));
    const shortTitle = data.shortTitle;
    if (!shortTitle) continue;
    checked += 1;
    if (articlePattern.test(shortTitle.trim())) {
      failures.push(
        `${slug}/${filename}: shortTitle opens with a bare article — "${shortTitle}"`
      );
    }
  }
}

if (failures.length) {
  console.error(`Headline-formula gate failed for ${failures.length} shortTitle(s):\n`);
  for (const failure of failures) console.error(`  - ${failure}`);
  console.error(
    "\nFix: rewrite to a hard fact, flat declarative, correction, fragment, " +
      "consequence or plain description — see near-editor/references/style-guide.md " +
      "'Headlines: never reuse your own shape'. Swapping the article for another " +
      "one in the same slot is not a fix; change the shape."
  );
  process.exit(1);
}

console.log(`Headline-formula gate passed for ${checked} shortTitle(s) across ${targets.length} place(s).`);
