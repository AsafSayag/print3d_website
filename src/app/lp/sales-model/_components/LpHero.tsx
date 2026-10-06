import { getImageProps } from "next/image";
import { GlassButton } from "@/components/ui/GlassButton";
import { CONTACT } from "@/lib/constants";
import { analyticsAttrs } from "@/lib/analytics";
import { LP_HERO, LP_LOCATION } from "../content";

/**
 * Landing hero. A server component with pure-CSS entrances (see .lp-hero-*):
 * the H1 is the LCP element, so it must paint from the SSR HTML on the first
 * frame — never gated behind hydration. The stagger is kept tight (all within
 * 0.35s) so the CTAs arrive with the headline, not a second after it.
 */
export function LpHero() {
  const waHref = `https://wa.me/${CONTACT.whatsappNumber}`;

  // Art direction: phones get a portrait crop of the photo (the strip a
  // portrait hero actually shows at object-position 30% — see
  // LP_HERO.imageMobile), desktop the full landscape frame. The phone used to
  // download the whole 4:3 photo at 1920w (~320KB) only to crop two-thirds of
  // it away; the crop is ~130–160KB at the same on-screen sharpness.
  const common = { alt: "", sizes: "100vw", fill: true, loading: "eager", fetchPriority: "high" } as const;
  const { props: desktopImg } = getImageProps({ ...common, src: LP_HERO.image.src });
  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({ ...common, src: LP_HERO.imageMobile.src });

  return (
    <section className="lp-hero surface-navy-950" aria-labelledby="lp-hero-title">
      <div aria-hidden="true" className="lp-hero-media">
        <picture>
          <source media="(max-width: 767px)" srcSet={mobileSrcSet} sizes="100vw" />
          <img {...desktopImg} alt="" className="lp-hero-img" />
        </picture>
        {/* Ambient life over the still photo (all pure CSS, see .lp-hero-*):
            a warm glow that breathes and drifts, and a slow light sweep —
            under the scrim so they never cost the copy its contrast — plus
            faint rising specks of light above it. */}
        <span className="lp-hero-glow" />
        <span className="lp-hero-sweep" />
        <span className="lp-hero-scrim" />
        <span className="lp-hero-specks" />
        <span className="lp-hero-grid" />
      </div>

      <div className="container-x relative z-10 lp-hero-inner">
        <div className="max-w-3xl">
          <p className="lp-rise eyebrow text-white" style={{ animationDelay: "0s" }}>
            {LP_HERO.eyebrow}
          </p>

          <h1 id="lp-hero-title" className="lp-hero-title mt-5">
            <span className="lp-rise block" style={{ animationDelay: "0.05s" }}>
              {LP_HERO.titleTop}
            </span>
            <span className="lp-rise block lp-hero-title-accent" style={{ animationDelay: "0.12s" }}>
              {LP_HERO.titleBottom}
            </span>
          </h1>

          <p
            className="lp-rise lp-hero-sub mt-6 text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl text-pretty"
            style={{ animationDelay: "0.2s" }}
          >
            {LP_HERO.subtitle}
          </p>

          <div
            className="lp-rise lp-hero-ctas mt-9 flex flex-col sm:flex-row gap-3 sm:items-center"
            style={{ animationDelay: "0.25s" }}
          >
            <GlassButton
              href="#lead"
              variant="primary"
              className="cta-glow lp-cta-lg lp-cta-main"
              {...analyticsAttrs("cta_click", {
                cta_name: "quote_request",
                location: `${LP_LOCATION}_hero`,
              })}
            >
              {LP_HERO.primaryCta}
              <ArrowDown />
            </GlassButton>
            <GlassButton
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="lp-cta-lg lp-cta-dark lp-cta-alt"
              {...analyticsAttrs("whatsapp_click", { location: `${LP_LOCATION}_hero` })}
            >
              {LP_HERO.secondaryCta}
            </GlassButton>
          </div>

          <p className="lp-rise lp-hero-micro mt-4 caption text-white/60" style={{ animationDelay: "0.3s" }}>
            {LP_HERO.microcopy}
          </p>

          <ul
            className="lp-rise lp-hero-trust mt-10 flex flex-wrap gap-x-6 gap-y-2 text-white/75 text-[15px]"
            style={{ animationDelay: "0.35s" }}
          >
            {LP_HERO.trust.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span aria-hidden="true" className="lp-check">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3.5 8.5 3 3 6-7" />
                  </svg>
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* The "path" begins here: a glowing line with a light pulse flowing
          down into the next section — the page's guiding motif. */}
      <a href="#lp-journey" className="lp-flow-hint" aria-label="המשיכו לגלול">
        <span className="lp-flow-line" aria-hidden="true">
          <span className="lp-flow-pulse" />
        </span>
      </a>
    </section>
  );
}

function ArrowDown() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="w-4 h-4 lp-arrow-bob" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 4v12M5 11l5 5 5-5" />
    </svg>
  );
}
