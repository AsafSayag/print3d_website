import sharp from "sharp";

const src = "/Users/asafsayag/Desktop/פרוקיט דוד / לוגו Ashdar-2-1.jpg";

// The source is a navy + red logo on a WHITE background. The other client logos
// are white silhouettes on a TRANSPARENT background, so they read cleanly on the
// dark navy clients section. Convert Ashdar to match: turn the logo into a solid
// white silhouette and drop the white background to transparent, keeping smooth
// anti-aliased edges (no threshold noise).

const { width, height } = await sharp(src).metadata();

// Alpha mask: dark logo pixels -> opaque, white background -> transparent.
// grayscale() + negate() gives dark logo => high value, white bg => low value.
// threshold() makes the logo body a solid opaque shape (and drops the faint
// white anti-alias halo + jpeg noise around the diagonal). A gentle blur then
// softens just the binary boundary into a ~1px ramp, so the body stays fully
// opaque white while the edges read smooth — matching the other logos.
const alpha = await sharp(src)
  .grayscale()
  .negate()
  .threshold(60)
  .blur(0.6)
  .toColourspace("b-w")
  .raw()
  .toBuffer({ resolveWithObject: true });

// Solid white canvas, wearing that alpha mask.
const white = {
  create: { width, height, channels: 3, background: { r: 255, g: 255, b: 255 } },
};

await sharp(white)
  .joinChannel(alpha.data, {
    raw: { width: alpha.info.width, height: alpha.info.height, channels: 1 },
  })
  .webp({ quality: 92, effort: 6 })
  .toFile("public/clients/ashdar.webp");

console.log(`Ashdar logo -> white silhouette on transparent (${width}x${height})`);
