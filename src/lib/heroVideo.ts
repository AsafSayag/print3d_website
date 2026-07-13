/**
 * Shared background-video descriptor for the "bright" page heroes (catalog +
 * about) so both pages present the same showroom footage.
 */
export const HERO_VIDEO: {
  poster: string;
  sources: { src: string; type: string }[];
} = {
  poster: "/videos/about-hero-poster.jpg",
  sources: [
    { src: "/videos/about-hero.webm", type: "video/webm" },
    { src: "/videos/about-hero.mp4", type: "video/mp4" },
  ],
};
