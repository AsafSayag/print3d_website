/**
 * Tells IndexNow-enabled search engines (Bing — which also feeds ChatGPT
 * search and Copilot — Yandex, Naver, Seznam) which URLs changed, so they
 * re-crawl within hours instead of whenever they next get round to it.
 *
 * Run from print3d-web, AFTER a production deploy has gone live:
 *
 *   npm run indexnow                    every URL in the live sitemap
 *   npm run indexnow -- /projects/x /   only these paths
 *   npm run indexnow -- --dry-run       list what would be sent, send nothing
 *
 * The key is not a secret: IndexNow proves ownership by fetching
 * https://print3d.co.il/<KEY>.txt and comparing its contents, which is why that
 * file lives in public/. To rotate the key, replace both the file and KEY.
 * Google does not take part in IndexNow — it reads the sitemap on its own.
 */
import { readFileSync } from "node:fs";

/** Mirrors CONTACT.siteUrl in src/lib/constants.ts. */
const SITE = "https://print3d.co.il";
const KEY = "53585f6f6c99f6b10084b1974ffbdceb";
const KEY_URL = `${SITE}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const paths = args.filter((a) => !a.startsWith("--"));

const fail = (msg) => {
  console.error(`indexnow: ${msg}`);
  process.exit(1);
};

// The local key file must match KEY, or the deployed one never will.
let localKey;
try {
  localKey = readFileSync(`public/${KEY}.txt`, "utf8").trim();
} catch {
  fail(`public/${KEY}.txt not found — run this from print3d-web.`);
}
if (localKey !== KEY) fail(`public/${KEY}.txt does not contain the key.`);

async function liveSitemapUrls() {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) fail(`could not fetch the live sitemap (HTTP ${res.status}).`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
}

const urls = paths.length
  ? paths.map((p) => {
      if (!p.startsWith("/")) fail(`"${p}" — pass paths that start with "/".`);
      return `${SITE}${p}`;
    })
  : await liveSitemapUrls();

if (urls.length === 0) fail("no URLs to submit.");

if (dryRun) {
  console.log(urls.join("\n"));
  console.log(`\n${urls.length} URLs — dry run, nothing sent.`);
  process.exit(0);
}

// Submitting before the key file is live gets every URL rejected (403).
const keyRes = await fetch(KEY_URL);
if (!keyRes.ok || (await keyRes.text()).trim() !== KEY) {
  fail(`${KEY_URL} is not live yet — deploy first, then run this again.`);
}

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE).host,
    key: KEY,
    keyLocation: KEY_URL,
    urlList: urls,
  }),
});

const MEANING = {
  200: "accepted",
  202: "accepted — key validation pending",
  400: "bad request",
  403: "key not valid for this host",
  422: "URLs do not belong to this host",
  429: "too many requests — try again later",
};
const meaning = MEANING[res.status] ?? (await res.text());
console.log(`indexnow: HTTP ${res.status} (${meaning}) for ${urls.length} URLs.`);
if (res.status >= 300) process.exit(1);
