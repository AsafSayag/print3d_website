import { Breadcrumbs, type Crumb } from "@/components/legal/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { DeferredVideo } from "@/components/ui/DeferredVideo";
import { PORTFOLIO_HERO } from "@/lib/portfolioContent";

// Same deterministic particle field used across the site's immersive sections
// (avoids SSR/CSR hydration mismatch — no Math.random at render time).
const PARTICLES = [
  { left: 10, size: 3, dur: 12, delay: 0 },
  { left: 24, size: 2, dur: 9, delay: 3 },
  { left: 40, size: 4, dur: 13, delay: 1 },
  { left: 58, size: 2, dur: 10, delay: 5 },
  { left: 72, size: 3, dur: 11, delay: 2 },
  { left: 88, size: 2, dur: 14, delay: 4 },
];

const breadcrumbs: Crumb[] = [
  { label: "בית", href: "/" },
  { label: PORTFOLIO_HERO.eyebrow },
];

/**
 * Portfolio page hero — reuses the same drone-loop video + grid + noise
 * treatment as ContactHero so secondary pages share one consistent hero
 * language across the site.
 */
export function PortfolioHero() {
  return (
    <section
      className="cta-immersive pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24"
      aria-label={PORTFOLIO_HERO.title}
    >
      <DeferredVideo
        className="cta-layer h-full w-full object-cover"
        poster="/videos/portfolio-hero-poster.jpg"
        sources={[
          { src: "/videos/portfolio-hero-loop.webm", type: "video/webm" },
          { src: "/videos/portfolio-hero-loop.mp4", type: "video/mp4" },
        ]}
      />

      <div
        className="cta-layer"
        style={{
          background:
            "radial-gradient(90% 70% at 50% 34%, rgba(255,255,255,0.15), transparent 78%), linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 42%, rgba(255,255,255,0.28) 100%)",
        }}
      />
      <div className="cta-layer cta-grid" />
      <div className="cta-layer cta-noise" />

      <div className="cta-layer overflow-hidden" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="cta-particle"
            style={{
              left: `${p.left}%`,
              bottom: "12%",
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container-x">
        <Reveal className="mb-6 md:mb-8">
          <div style={{ textShadow: "0 2px 18px rgba(255,255,255,0.9), 0 1px 4px rgba(255,255,255,0.8)" }}>
            <Breadcrumbs
              items={breadcrumbs}
              tone="dark"
              className="text-lg sm:text-xl font-bold"
            />
          </div>
        </Reveal>

        {/* Eyebrow + title stay on the banner in solid black, lifted for
            legibility by a strong white halo over the bright footage. The
            descriptive copy is lifted off the banner into its own glass frame
            below it (see PortfolioIntro). */}
        <div
          style={{
            textShadow:
              "0 0 3px rgba(255,255,255,1), 0 0 16px rgba(255,255,255,0.95), 0 2px 28px rgba(255,255,255,0.9)",
          }}
        >
          <Reveal delay={0.06}>
            <p
              className="eyebrow text-black mb-4 font-bold"
              style={{ fontSize: "clamp(1.05rem, 2.6vw, 1.5rem)", letterSpacing: "0.16em" }}
            >
              {PORTFOLIO_HERO.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <h1
              className="heading-accent max-w-none text-black font-display font-bold whitespace-nowrap"
              style={{
                fontSize: "clamp(1.15rem, 5.3vw, 3.5rem)",
                lineHeight: 1.12,
                letterSpacing: "-0.015em",
              }}
            >
              {PORTFOLIO_HERO.title}
            </h1>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
