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
        {/* Architectural elevation fragments trace in slowly behind the copy.
            No script or images: the lines remain quiet and motion can be disabled. */}
        <svg className="lp-hero-blueprint" viewBox="0 0 1440 900" preserveAspectRatio="none" fill="none">
          <g className="lp-plan-fragment lp-plan-fragment--one">
            <path pathLength="1" d="M42 274V122h356v182M42 178h356M104 122v182M337 122v182" />
            <path pathLength="1" d="M104 274h132v-58h101M236 274v71h162M104 304v94h132" />
            <path pathLength="1" d="M60 92h320m-320-8v16m320-16v16M22 140v155m-8-155h16m-16 155h16" />
            <circle cx="104" cy="178" r="5" /><circle cx="337" cy="216" r="5" />
          </g>
          <g className="lp-plan-fragment lp-plan-fragment--two">
            <path pathLength="1" d="M1032 174h332v256h-332V174ZM1032 252h332M1108 174v256M1288 174v256" />
            <path pathLength="1" d="M1108 252v84h86v94M1194 336h94M1288 252v92h76" />
            <path pathLength="1" d="M1012 145h352m-352-8v16m352-16v16M1390 174v256m-8-256h16m-16 256h16" />
            <circle cx="1194" cy="336" r="5" /><circle cx="1288" cy="252" r="5" />
          </g>
          <g className="lp-plan-fragment lp-plan-fragment--three">
            <path pathLength="1" d="M74 580h386v205H74V580ZM74 665h386M174 580v205M360 580v205" />
            <path pathLength="1" d="M174 665h96v78h90M270 665v-42h90" />
            <path pathLength="1" d="M56 810h404m-404-8v16m404-16v16" />
            <circle cx="270" cy="665" r="5" />
          </g>
          <g className="lp-plan-fragment lp-plan-fragment--four">
            <path pathLength="1" d="M1060 566h298v222h-298V566ZM1060 640h298M1140 566v222M1278 566v222" />
            <path pathLength="1" d="M1140 640h74v76h64M1214 640v-36h64" />
            <path pathLength="1" d="M1038 810h320m-320-8v16m320-16v16" />
            <circle cx="1214" cy="640" r="5" />
          </g>
        </svg>
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
