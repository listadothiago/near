#!/usr/bin/env node
/**
 * Pulls Search Console query data for near.tips.
 *
 *   node scripts/gsc-queries.mjs [days] [queries|pages|countries]
 *
 * Zero dependencies on purpose — this is one utility script, and adding
 * googleapis to a static content site's bundle graph for it isn't worth
 * it. The service-account JWT flow is about 40 lines with node:crypto.
 *
 * Setup (the parts only you can do — see the session notes):
 *   1. Google Cloud project -> enable "Google Search Console API"
 *   2. Create a service account, download its JSON key
 *   3. In Search Console -> Settings -> Users and permissions, add the
 *      service account's client_email as a Full or Restricted user
 *   4. export GSC_SERVICE_ACCOUNT_KEY=/absolute/path/to/key.json
 *
 * Nothing here reads or writes a credential into the repo; the key path
 * comes from the environment and *.json keys are gitignored.
 */
import { createSign } from "node:crypto";
import { readFileSync } from "node:fs";

const SITE = process.env.GSC_SITE_URL ?? "sc-domain:near.tips";
const KEY_PATH = process.env.GSC_SERVICE_ACCOUNT_KEY;
const DAYS = Number(process.argv[2] ?? 28);
const DIMENSION = process.argv[3] ?? "query";

if (!KEY_PATH) {
  console.error(
    "GSC_SERVICE_ACCOUNT_KEY is not set — point it at the service-account JSON key.\n" +
      "See the header of this file for the four setup steps.",
  );
  process.exit(1);
}

const key = JSON.parse(readFileSync(KEY_PATH, "utf8"));

function b64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(
    JSON.stringify({
      iss: key.client_email,
      scope: "https://www.googleapis.com/auth/webmasters.readonly",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  );
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claim}`);
  const signature = signer.sign(key.private_key, "base64url");

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${header}.${claim}.${signature}`,
    }),
  });
  if (!res.ok) throw new Error(`token exchange failed: ${res.status} ${await res.text()}`);
  return (await res.json()).access_token;
}

function isoDaysAgo(n) {
  return new Date(Date.now() - n * 86400_000).toISOString().slice(0, 10);
}

const token = await getAccessToken();
const res = await fetch(
  `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      startDate: isoDaysAgo(DAYS),
      endDate: isoDaysAgo(1),
      dimensions: [DIMENSION],
      rowLimit: 100,
    }),
  },
);

if (!res.ok) {
  console.error(`Search Console API error ${res.status}: ${await res.text()}`);
  console.error(
    "\nIf this is 403, the service account probably isn't added as a user in " +
      "Search Console yet (step 3), or GSC_SITE_URL doesn't match the property " +
      "exactly — a domain property is 'sc-domain:near.tips', a URL-prefix one is " +
      "'https://near.tips/'.",
  );
  process.exit(1);
}

const { rows = [] } = await res.json();
if (rows.length === 0) {
  console.log(
    `No rows for the last ${DAYS} days. Expected for a site this new — ` +
      "Search Console needs days-to-weeks of impressions before it reports anything.",
  );
  process.exit(0);
}

console.log(`\n${DIMENSION} · last ${DAYS} days · ${rows.length} rows\n`);
console.log("  impr  clicks   ctr   pos   " + DIMENSION);
for (const r of rows) {
  const [k] = r.keys;
  console.log(
    `  ${String(r.impressions).padStart(5)} ${String(r.clicks).padStart(6)} ` +
      `${(r.ctr * 100).toFixed(1).padStart(5)}% ${r.position.toFixed(1).padStart(5)}   ${k}`,
  );
}
