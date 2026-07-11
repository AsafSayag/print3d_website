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

      <div
        className="relative z-10 container-x"
        style={{ textShadow: "0 2px 22px rgba(255,255,255,0.85), 0 1px 6px rgba(255,255,255,0.8), 0 0 3px rgba(255,255,255,0.6)" }}
      >
        <Reveal className="mb-6 md:mb-8 font-bold">
          <Breadcrumbs items={breadcrumbs} tone="dark" />
        </Reveal>
        <Reveal delay={0.06}>
          <p className="eyebrow text-[color:var(--navy-800)] mb-4 font-bold">
            {PORTFOLIO_HERO.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <h1 className="h1 heading-accent max-w-3xl text-[color:var(--ink-950)]">
            {PORTFOLIO_HERO.title}
          </h1>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-6 text-lg text-[color:var(--ink-950)]/75 max-w-2xl leading-relaxed font-bold">
            {PORTFOLIO_HERO.subtitle}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
