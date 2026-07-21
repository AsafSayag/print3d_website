/**
 * Shared background-video descriptor for the "bright" page heroes (catalog +
 * about) so both pages present the same showroom footage.
 */
export const HERO_VIDEO: {
  poster: string;
  posterVariants: boolean;
  sources: { src: string; type: string }[];
} = {
  // Must be the `.webp` base: DeferredVideo derives every poster variant
  // (`.jpg`/`.avif` + `-mobile.*`) by stripping this `.webp` suffix. A `.jpg`
  // here produced broken URLs (`…jpg.jpg`, `…jpg-mobile.avif`) that 404'd, so
  // the hero painted no poster and its LCP stalled on the video/heading.
  poster: "/videos/about-hero-poster.webp",
  // This poster has the full derived set on disk (`-mobile.{avif,webp,jpg}` +
  // `.{avif,jpg}`), so DeferredVideo may serve the responsive cuts.
  posterVariants: true,
  sources: [
    { src: "/videos/about-hero.webm", type: "video/webm" },
    { src: "/videos/about-hero.mp4", type: "video/mp4" },
  ],
};
