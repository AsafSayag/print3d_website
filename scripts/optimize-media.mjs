/**
 * One-off media optimization:
 *  - public/og-image.jpg      (1200x630 social-share image from the hero poster)
 *  - public/projects/*.webp   (compressed replacements for the two heavy sources)
 * Run from print3d-web:  node scripts/optimize-media.mjs
 */
import sharp from "sharp";

await sharp("public/videos/hero-poster.jpg")
  .resize(1200, 630, { fit: "cover", position: "attention" })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile("public/og-image.jpg");
console.log("og-image.jpg written");

await sharp("public/projects/neve-gan.jpg")
  .webp({ quality: 78 })
  .toFile("public/projects/neve-gan.webp");
console.log("neve-gan.webp written");

await sharp("public/projects/gindi-tlv.png")
  .webp({ quality: 80 })
  .toFile("public/projects/gindi-tlv.webp");
console.log("gindi-tlv.webp written");
