/**
 * Perf pass — resize/re-encode images that ship far larger than they render,
 * with NO perceptible quality loss (every target stays >=2x its display size).
 * Sources flagged by PageSpeed "Improve image delivery". Run from print3d-web:
 *   node scripts/perf-resize-images.mjs
 * Originals were backed up to /tmp/print3d-img-backup before the first run.
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";

const KB = (n) => (n / 1024).toFixed(1) + "K";
let before = 0;
let after = 0;

async function write(file, pipeline) {
  const orig = fs.statSync(file).size;
  const buf = await pipeline.toBuffer();
  // Never regress: keep the original if the re-encode came out larger.
  if (buf.length >= orig) {
    console.log(`  keep   ${path.basename(file)} (${KB(orig)} <= ${KB(buf.length)})`);
    before += orig;
    after += orig;
    return;
  }
  fs.writeFileSync(file, buf);
  console.log(`  ${KB(orig)} -> ${KB(buf.length)}  ${path.basename(file)}`);
  before += orig;
  after += buf.length;
}

// 1) Client logos — rendered at height 70px (desktop) / 54px (mobile), max-width
//    240px. Cap at 480x160 (>=2x everywhere) as white-silhouette webp with alpha.
console.log("Client logos:");
const logoDir = "public/clients";
for (const f of fs.readdirSync(logoDir).filter((f) => f.endsWith(".webp"))) {
  const file = path.join(logoDir, f);
  await write(
    file,
    sharp(file)
      .resize({ width: 480, height: 160, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 86, alphaQuality: 100 })
  );
}

// 2) Header wordmark — rendered at 34px tall (Header). Cap at 120px tall.
console.log("Brand marks:");
await write(
  "public/brand/print3d-mark.webp",
  sharp("public/brand/print3d-mark.webp")
    .resize({ height: 120, withoutEnlargement: true })
    .webp({ quality: 90, alphaQuality: 100 })
);
// Footer lockup — rendered at 52px tall. Cap at 180px tall.
await write(
  "public/brand/print3d-logo.webp",
  sharp("public/brand/print3d-logo.webp")
    .resize({ height: 180, withoutEnlargement: true })
    .webp({ quality: 90, alphaQuality: 100 })
);

// 3) CTA video poster — full-bleed on desktop, so keep 1440x1080 but drop
//    quality. It is a <video poster>, visible only until the clip starts, so
//    moderate compression is imperceptible. Re-encode all three siblings.
console.log("CTA poster (compression only, dims kept for desktop):");
await write("public/videos/cta-poster.webp", sharp("public/videos/cta-poster.webp").webp({ quality: 68 }));
await write("public/videos/cta-poster.avif", sharp("public/videos/cta-poster.avif").avif({ quality: 50 }));
await write("public/videos/cta-poster.jpg", sharp("public/videos/cta-poster.jpg").jpeg({ quality: 70, mozjpeg: true }));

// 4) Home hero MOBILE poster — mobile-only, the LCP element. Rendered ~412x515;
//    downscale 1080x1350 -> 864x1080 (>=2x) to speed up LCP. Keep quality high.
console.log("Home hero mobile poster (LCP, downscale to 864x1080):");
const mob = (ext, enc) =>
  write(
    `public/videos/home-hero-mobile-poster.${ext}`,
    enc(sharp(`public/videos/home-hero-mobile-poster.${ext}`).resize({ width: 864 }))
  );
await mob("webp", (s) => s.webp({ quality: 80 }));
await mob("avif", (s) => s.avif({ quality: 60 }));
await mob("jpg", (s) => s.jpeg({ quality: 80, mozjpeg: true }));

console.log(`\nTotal: ${KB(before)} -> ${KB(after)}  (saved ${KB(before - after)})`);
