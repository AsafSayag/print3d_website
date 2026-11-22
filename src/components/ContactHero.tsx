import { Breadcrumbs, type Crumb } from "./legal/Breadcrumbs";
import { Reveal } from "./ui/Reveal";
import { DeferredVideo } from "./ui/DeferredVideo";
import { ArchitecturalBlueprint } from "./ui/ArchitecturalBlueprint";

// Same deterministic particle field used by the immersive CTA, trimmed for the
// hero (avoids SSR/CSR hydration mismatch — no Math.random at render time).
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
  description: string;
  breadcrumbs: Crumb[];
  action?: React.ReactNode;
  background?: "video" | "blueprint";
  /** Override the background video (defaults to the shared drone-loop). */
  video?: {
    poster: string;
    /** True only when the poster's derived cuts exist — see DeferredVideo. */
    posterVariants?: boolean;
    sources: { src: string; type: string }[];
  };
};

const DEFAULT_VIDEO = {
  poster: "/videos/cta-poster.webp",
  // Full derived set present on disk.
  posterVariants: true,
  sources: [
    { src: "/videos/cta-loop.webm", type: "video/webm" },
    { src: "/videos/cta-loop.mp4", type: "video/mp4" },
  ],
};

/** Shared contact-style hero; partner pages use the quiet blueprint variant. */
export function ContactHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  action,
  background = "video",
  video = DEFAULT_VIDEO,
}: Props) {
  return (
    <section
      className={`cta-immersive pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24${background === "blueprint" ? " partner-hero" : ""}`}
      aria-label={title}
    >
      {background === "blueprint" ? (
        <div className="cta-layer partner-hero-art" aria-hidden="true">
          <span className="lp-hero-glow" />
          <ArchitecturalBlueprint />
        </div>
      ) : (
        <>
          {/* The existing video treatment remains for contact and FAQ. */}
          <DeferredVideo
            className="cta-layer h-full w-full object-cover"
            poster={video.poster}
            posterVariants={video.posterVariants}
            sources={video.sources}
            priority
            posterOnlyOnMobile
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
        </>
      )}

      {/* The video variant needs a text shadow; the blueprint variant stays clear. */}
      <div
        className="relative z-10 container-x"
        style={background === "video" ? { textShadow: "0 2px 22px rgba(7,13,23,0.95), 0 1px 6px rgba(7,13,23,0.9), 0 0 3px rgba(7,13,23,0.75)" } : undefined}
      >
        <Reveal className="mb-6 md:mb-8">
          <Breadcrumbs items={breadcrumbs} />
        </Reveal>
        <Reveal delay={0.06}>
          <p className="eyebrow text-[color:var(--steel-300)] mb-4">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.12}>
          <h1 className="h1 heading-accent max-w-3xl text-white">{title}</h1>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-6 text-lg text-white/75 max-w-2xl leading-relaxed">
            {description}
          </p>
        </Reveal>
        {action && <Reveal delay={0.24} className="mt-7">{action}</Reveal>}
      </div>
    </section>
  );
}
