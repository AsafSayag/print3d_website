import { Breadcrumbs, type Crumb } from "./legal/Breadcrumbs";
import { Reveal } from "./ui/Reveal";
import { DeferredVideo } from "./ui/DeferredVideo";

// Deterministic particle field (no Math.random at render → no hydration drift).
const PARTICLES = [
  { left: 10, size: 3, dur: 12, delay: 0 },
  { left: 24, size: 2, dur: 9, delay: 3 },
  { left: 40, size: 4, dur: 13, delay: 1 },
  { left: 58, size: 2, dur: 10, delay: 5 },
  { left: 72, size: 3, dur: 11, delay: 2 },
  { left: 88, size: 2, dur: 14, delay: 4 },
];

type Props = {
  eyebrow: string;
  title: string;
  /** Optional lead copy — rendered inside a frosted glass frame in the hero. */
  description?: string;
  breadcrumbs: Crumb[];
  video: { poster: string; sources: { src: string; type: string }[] };
  /** Keep the title on a single line at every breakpoint (used by the catalog). */
  singleLineTitle?: boolean;
  /** Hide the visible breadcrumb row (SEO breadcrumbs live in JSON-LD anyway). */
  hideBreadcrumbs?: boolean;
  /** Hide the glass eyebrow chip (the catalog drops it so the title leads). */
  hideEyebrow?: boolean;
};

/**
 * Shared "bright" page hero: a light-treated background video with BLACK copy
 * lifted by a white halo, a glass eyebrow chip and an enlarged breadcrumb.
 * On mobile the copy sits lower in a taller banner; on desktop it centres.
 * Used by both the catalog and the about pages so they read identically.
 */
export function BrightHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  video,
  singleLineTitle,
  hideBreadcrumbs,
  hideEyebrow,
}: Props) {
  return (
    <section
      className="cta-immersive min-h-[58svh] sm:min-h-0 flex items-end sm:items-center pt-28 pb-14 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24"
      aria-label={title}
    >
      <DeferredVideo
        className="cta-layer h-full w-full object-cover"
        poster={video.poster}
        sources={video.sources}
      />

      {/* Bright overlays for the black-copy treatment */}
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

      <div className="relative z-10 container-x w-full">
        {hideBreadcrumbs ? null : (
          <Reveal className="mb-6 md:mb-8">
            <div
              style={{
                textShadow:
                  "0 2px 18px rgba(255,255,255,0.9), 0 1px 4px rgba(255,255,255,0.8)",
              }}
            >
              <Breadcrumbs
                items={breadcrumbs}
                tone="dark"
                className="text-lg sm:text-xl font-bold"
              />
            </div>
          </Reveal>
        )}

        <div
          style={{
            textShadow:
              "0 0 3px rgba(255,255,255,1), 0 0 16px rgba(255,255,255,0.95), 0 2px 28px rgba(255,255,255,0.9)",
          }}
        >
          {hideEyebrow ? null : (
          <Reveal delay={0.06}>
            <span
              className="eyebrow inline-block text-black font-black mb-4"
              style={{
                // The catalog's short "קטלוג" eyebrow is enlarged so it reads as
                // the prominent page label now that the breadcrumb above it is
                // hidden. Other pages (about) keep the standard size.
                fontSize: singleLineTitle
                  ? "clamp(1.5rem, 4vw, 2.35rem)"
                  : "clamp(1.05rem, 2.6vw, 1.5rem)",
                letterSpacing: "0.16em",
                background: "rgba(255,255,255,0.34)",
                border: "1px solid rgba(255,255,255,0.65)",
                backdropFilter: "blur(9px) saturate(140%)",
                WebkitBackdropFilter: "blur(9px) saturate(140%)",
                borderRadius: "14px",
                padding: singleLineTitle ? "0.5rem 1.4rem" : "0.4rem 1rem",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.7), 0 8px 24px -14px rgba(7,13,23,0.4)",
              }}
            >
              {eyebrow}
            </span>
          </Reveal>
          )}

          <Reveal delay={0.12}>
            {singleLineTitle ? (
              <h1
                className="heading-accent max-w-none text-black font-display font-black tracking-[-0.02em] whitespace-normal text-[2.35rem] leading-[1.14] md:whitespace-nowrap md:text-[clamp(2rem,5.3vw,4.5rem)] md:leading-[1.1]"
              >
                {title}
              </h1>
            ) : (
              <h1 className="h1 heading-accent max-w-3xl md:max-w-none md:whitespace-nowrap text-black">
                {title}
              </h1>
            )}
          </Reveal>
        </div>

        {description ? (
          <Reveal delay={0.18}>
            <div className="portfolio-hero-glass max-w-2xl mt-6">
              <p className="text-black text-lg leading-relaxed font-medium">
                {description}
              </p>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
