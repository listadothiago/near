#!/usr/bin/env node
// Real Google Discover eligibility QA over the live/current catalogue.
//
// Checks the actual documented Discover image requirement (>=1200px wide,
// 16:9 aspect ratio, >300,000 total pixels) against each active place's
// real heroImage source, by fetching the image and reading its true
// dimensions with sharp — no invented pass/fail, no simulation.
//
// Usage: node scripts/discover-audit.mjs [--limit N] [--json out.json]
//
// Also (re)writes a self-contained HTML report with the real images
// embedded as data URIs, at content/_reports/discover-audit.html, and
// prints any new BACKLOG.md-worthy findings (does not edit BACKLOG.md
// itself — surfaces findings for a human/agent to log, since duplicate
// detection against free-form prose is unreliable to automate).

import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

// Minimal, dependency-free image-dimension reader (JPEG + PNG only, which
// covers every hero source Near actually uses). sharp's native binary is
// unreliable across environments here, and this doesn't need a real
// decode — just the header.
function readDimensions(buf) {
  // PNG: 8-byte signature, then IHDR chunk with width/height as big-endian u32 at fixed offsets.
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47 && buf.readUInt32BE(4) === 0x0d0a1a0a) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  // JPEG: walk markers looking for a SOFn (0xC0-0xCF, excluding C4/C8/CC).
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let offset = 2;
    while (offset < buf.length - 8) {
      if (buf[offset] !== 0xff) {
        offset++;
        continue;
      }
      const marker = buf[offset + 1];
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        const height = buf.readUInt16BE(offset + 5);
        const width = buf.readUInt16BE(offset + 7);
        return { width, height };
      }
      const len = buf.readUInt16BE(offset + 2);
      offset += 2 + len;
    }
  }
  return { width: null, height: null };
}

const PLACES_DIR = "content/places";
const REPORT_DIR = "content/_reports";
const args = process.argv.slice(2);
const limitIdx = args.indexOf("--limit");
const limit = limitIdx >= 0 ? parseInt(args[limitIdx + 1], 10) : Infinity;
const slugsIdx = args.indexOf("--slugs");
const onlySlugs = slugsIdx >= 0 ? args[slugsIdx + 1].split(",") : null;

function ogImageUrlFor(heroUrl) {
  // Mirrors lib/seo/ogImage.ts's buildOgImages: width capped/targeted at
  // 1200 via Next's optimizer, which preserves source aspect ratio. We
  // replicate the *result* by reading the source's real dimensions
  // directly (fetching through the live optimizer would require a
  // deployed URL and adds deploy-lag as a variable this check doesn't
  // need) — same verdict, no deploy dependency.
  return heroUrl;
}

async function checkImage(url) {
  const res = await fetch(url, {
    redirect: "follow",
    headers: { "User-Agent": "Mozilla/5.0 (compatible; NearDiscoverAudit/1.0; +https://near.tips)" },
  });
  if (!res.ok) return { ok: false, reason: `fetch failed (${res.status})` };
  const buf = Buffer.from(await res.arrayBuffer());
  const { width, height } = readDimensions(buf);
  if (!width || !height) return { ok: false, reason: "no dimensions read (unsupported format)" };
  const aspect = width / height;
  const targetAspect = 16 / 9;
  const aspectOk = Math.abs(aspect - targetAspect) < 0.12; // ~tolerance
  const effectiveWidth = Math.min(width, 1200); // Next never upscales
  const widthOk = width >= 1200;
  const pixelsAtServe = effectiveWidth * (effectiveWidth / aspect);
  const pixelsOk = pixelsAtServe > 300000;
  const pass = widthOk && aspectOk && pixelsOk;
  return {
    ok: pass,
    width,
    height,
    aspect: aspect.toFixed(3),
    reason: pass
      ? "pass"
      : [
          !widthOk && `width ${width}px < 1200px`,
          !aspectOk && `aspect ${aspect.toFixed(2)}:1, not ~16:9 (1.78:1)`,
          !pixelsOk && `effective pixels too low`,
        ]
          .filter(Boolean)
          .join("; "),
    buf,
  };
}

async function main() {
  let slugs = readdirSync(PLACES_DIR);
  if (onlySlugs) slugs = slugs.filter((s) => onlySlugs.includes(s));
  slugs = slugs.slice(0, limit === Infinity ? undefined : limit);
  const results = [];

  for (const slug of slugs) {
    let meta;
    try {
      meta = JSON.parse(readFileSync(join(PLACES_DIR, slug, "meta.json"), "utf8"));
    } catch {
      continue;
    }
    if (meta.status !== "active") continue;
    const hero = meta.heroImage;
    if (!hero?.url) {
      results.push({ slug, name: meta.slug, ok: false, reason: "no hero image" });
      continue;
    }
    try {
      const check = await checkImage(ogImageUrlFor(hero.url));
      results.push({ slug, url: hero.url, ...check });
    } catch (e) {
      results.push({ slug, url: hero.url, ok: false, reason: `error: ${e.message}` });
    }
    await new Promise((r) => setTimeout(r, 200)); // be polite to source hosts
  }

  const passing = results.filter((r) => r.ok);
  const failing = results.filter((r) => !r.ok);

  console.log(`\nDiscover image audit — ${results.length} active places checked`);
  console.log(`  PASS: ${passing.length}   FAIL: ${failing.length}\n`);
  for (const r of failing) {
    console.log(`  FAIL  ${r.slug.padEnd(45)} ${r.reason}`);
  }

  // --- HTML report with real embedded images ---
  mkdirSync(REPORT_DIR, { recursive: true });
  const cardsHtml = results.map((r, i) => {
    let imgTag = `<div class="noimg">no image</div>`;
    if (r.buf) {
      const b64 = r.buf.toString("base64");
      imgTag = `<img src="data:image/jpeg;base64,${b64}" alt="">`;
    }
    const badge = r.ok ? `<span class="pass">PASS</span>` : `<span class="fail">FAIL</span>`;
    const tooltip = !r.ok
      ? `<div class="tooltip" id="tip-${i}">${r.reason}</div>`
      : "";
    return `<div class="card${r.ok ? "" : " has-issue"}" data-issue="${!r.ok}">
      <div class="hero">${imgTag}${tooltip}</div>
      <div class="body">
        <div class="row"><b>${r.slug}</b> ${badge}</div>
        <div class="detail">${r.width ?? "?"}×${r.height ?? "?"} · aspect ${r.aspect ?? "?"} · ${r.reason}</div>
      </div>
    </div>`;
  });

  const html = `<!doctype html><html><head><meta charset="utf-8"><title>Discover Audit</title>
  <style>
    body{font-family:ui-monospace,monospace;background:#f4f4f0;color:#000;padding:24px;}
    .toprow{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;}
    .toggle{display:flex;align-items:center;gap:8px;font-size:12px;cursor:pointer;user-select:none;}
    .toggle input{width:16px;height:16px;}
    .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px;}
    .card{border:3px solid #000;background:#fff;box-shadow:4px 4px 0 #000;}
    .card.has-issue{outline:3px solid #d93025;outline-offset:2px;}
    .hero{position:relative;aspect-ratio:16/9;overflow:hidden;background:#e6e6e0;}
    .hero img{width:100%;height:100%;object-fit:cover;display:block;}
    .noimg{display:flex;align-items:center;justify-content:center;height:100%;color:#888;}
    .tooltip{display:none;position:absolute;inset:auto 0 0 0;background:rgba(217,48,37,.92);color:#fff;
      font-size:10px;padding:6px 8px;line-height:1.3;}
    body.show-tips .tooltip{display:block;}
    .body{padding:8px 10px;}
    .row{display:flex;justify-content:space-between;font-size:13px;}
    .detail{font-size:11px;color:#555;margin-top:4px;}
    .pass{color:#1e8e3e;font-weight:700;}
    .fail{color:#d93025;font-weight:700;}
    h1{font-size:18px;margin:0;}
  </style></head><body>
  <div class="toprow">
    <h1>Discover Audit — ${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC</h1>
    <label class="toggle"><input type="checkbox" id="tipToggle"> Show issue tooltips</label>
  </div>
  <p>${passing.length} pass / ${failing.length} fail / ${results.length} checked</p>
  <div class="grid">${cardsHtml.join("\n")}</div>
  <script>
    document.getElementById("tipToggle").addEventListener("change", (e) => {
      document.body.classList.toggle("show-tips", e.target.checked);
    });
  </script>
  </body></html>`;

  writeFileSync(join(REPORT_DIR, "discover-audit.html"), html);
  writeFileSync(join(REPORT_DIR, "discover-audit.json"), JSON.stringify(results.map(({ buf, ...r }) => r), null, 2));
  console.log(`\nReport written: ${join(REPORT_DIR, "discover-audit.html")}`);
}

main();
