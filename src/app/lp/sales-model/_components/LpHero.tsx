import { getImageProps } from "next/image";
import { LP_HERO } from "../content";
import { LpQualifier } from "./LpQualifier";

/**
 * Landing hero — one centred column across the full width of the screen:
 * headline, the screening question as a wide bar, and under them the model
 * photo, large and untouched (no scrim, zoom or blend over it, so it stays as
 * sharp as the file). The photo runs past the first screen on purpose: its top
 * peeking in under the question is the cue to scroll.
 *
 * A server component with pure-CSS entrances (see .lp-rise): the H1 is the LCP
 * element, so it must paint from the SSR HTML on the first frame — never gated
 * behind hydration.
 */
export function LpHero() {
  // Art direction: phones get the portrait crop (LP_HERO.imageMobile), larger
  // screens the landscape frame. The photo is never wider than 1280 CSS px.
  const common = { alt: "", fill: true, quality: 90, loading: "eager", fetchPriority: "high" } as const;
  const { props: desktopImg } = getImageProps({
    ...common,
    sizes: "(min-width: 1392px) 1280px, 92vw",
    src: LP_HERO.image.src,
  });
  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({ ...common, sizes: "100vw", src: LP_HERO.imageMobile.src });

  return (
    <section className="lp-hero surface-navy-950" aria-labelledby="lp-hero-title">
      <div aria-hidden="true" className="lp-hero-media">
        <span className="lp-hero-glow" />
        <span className="lp-hero-grid" />
      </div>

      <div className="container-x lp-hero-inner">
        <p className="lp-rise eyebrow text-white/80" style={{ animationDelay: "0s" }}>
          {LP_HERO.eyebrow}
        </p>

        <h1 id="lp-hero-title" className="lp-hero-title mt-4">
          <span className="lp-rise lp-hero-title-line" style={{ animationDelay: "0.05s" }}>
            {LP_HERO.titleTop}
          </span>{" "}
          <span
            className="lp-rise lp-hero-title-line lp-hero-title-accent"
            style={{ animationDelay: "0.12s" }}
          >
            {LP_HERO.titleBottom}
          </span>
        </h1>

        <p className="lp-rise lp-hero-sub" style={{ animationDelay: "0.2s" }}>
          {LP_HERO.subtitle}
        </p>

        {/* The screening question takes the place of the CTAs: it is the first
            thing a visitor can act on, and the only way to reach us. */}
        <div className="lp-rise lp-hero-gate" style={{ animationDelay: "0.25s" }}>
          <LpQualifier />
        </div>
      </div>

      <div className="lp-rise lp-hero-stage" style={{ animationDelay: "0.3s" }}>
        <picture>
          <source media="(max-width: 767px)" srcSet={mobileSrcSet} sizes="100vw" />
          <img {...desktopImg} alt={LP_HERO.image.alt} className="lp-hero-img" />
        </picture>
      </div>
    </section>
  );
}
