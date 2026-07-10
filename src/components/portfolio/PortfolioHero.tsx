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
        poster="/videos/cta-poster.jpg"
        sources={[
          { src: "/videos/cta-loop.webm", type: "video/webm" },
          { src: "/videos/cta-loop.mp4", type: "video/mp4" },
        ]}
      />

      <div className="cta-layer cta-gradient" />
      <div className="cta-layer cta-grid" />
      <div className="cta-layer cta-noise" />
      <div
        className="cta-layer"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,13,23,0.55) 0%, rgba(7,13,23,0.18) 45%, rgba(7,13,23,0.6) 100%), linear-gradient(270deg, rgba(7,13,23,0.5) 0%, rgba(7,13,23,0.05) 60%)",
        }}
      />

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

      <div
        className="relative z-10 container-x"
        style={{ textShadow: "0 2px 22px rgba(7,13,23,0.95), 0 1px 6px rgba(7,13,23,0.9), 0 0 3px rgba(7,13,23,0.75)" }}
      >
        <Reveal className="mb-6 md:mb-8">
          <Breadcrumbs items={breadcrumbs} />
        </Reveal>
        <Reveal delay={0.06}>
          <p className="eyebrow text-[color:var(--steel-300)] mb-4">
            {PORTFOLIO_HERO.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <h1 className="h1 heading-accent max-w-3xl text-white">
            {PORTFOLIO_HERO.title}
          </h1>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-6 text-lg text-white/75 max-w-2xl leading-relaxed">
            {PORTFOLIO_HERO.subtitle}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
