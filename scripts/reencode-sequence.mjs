/**
 * Re-encode the ScrollSequence frames at higher quality.
 *
 * Source: the original 1920×1073 WebP frames (premium-architecture-landing/frames).
 * The shipped frames had been downscaled to 1280w (desktop) / 1080w (mobile) at
 * q85 — the client felt the building animation looked soft. This lifts them:
 *   - desktop → 1600w, q90  (sharper on retina, canvas can now back a bigger store)
 *   - mobile  → 1280w, q88
 *
 * Run from print3d-web:  node scripts/reencode-sequence.mjs
 */
import sharp from "sharp";
import { readdirSync } from "node:fs";

const SRC_DIR =
  "/Users/asafsayag/Downloads/premium-architecture-landing/frames";
const TOTAL = 121;

// Pushed to the full source resolution (1920w) at higher quality — this is the
// ceiling; going wider would only upscale the 1920×1073 source for no gain.
const DESKTOP = { dir: "public/sequence", width: 1920, quality: 93 };
const MOBILE = { dir: "public/sequence-mobile", width: 1440, quality: 90 };

const srcName = (i) => `frame${String(i).padStart(4, "0")}.webp`;
const destName = (i) => `frame_${String(i).padStart(3, "0")}.webp`;

// Sanity: confirm the source really holds all 121 frames before we overwrite.
const have = new Set(readdirSync(SRC_DIR));
for (let i = 1; i <= TOTAL; i++) {
  if (!have.has(srcName(i))) throw new Error(`missing source ${srcName(i)}`);
}

async function encodeSet({ dir, width, quality }, label) {
  let firstDims = null;
  for (let i = 1; i <= TOTAL; i++) {
    const pipeline = sharp(`${SRC_DIR}/${srcName(i)}`)
      .resize({ width, withoutEnlargement: false })
      .webp({ quality, effort: 6 });
    const info = await pipeline.toFile(`${dir}/${destName(i)}`);
    if (i === 1) firstDims = { w: info.width, h: info.height };
  }
  console.log(`${label}: ${TOTAL} frames → ${firstDims.w}×${firstDims.h} @ q${quality}`);
  return firstDims;
}

const d = await encodeSet(DESKTOP, "desktop");
const m = await encodeSet(MOBILE, "mobile");
console.log(
  `\nUpdate ScrollSequence.tsx: FRAME_W=${d.w} FRAME_H=${d.h}; mobile srcW=${m.w} srcH=${m.h}`,
);
