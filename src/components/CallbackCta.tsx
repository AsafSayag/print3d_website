import { CALLBACK_CTA } from "@/lib/content";
import { CONTACT } from "@/lib/constants";
import { GlassButton } from "./ui/GlassButton";
import { Reveal } from "./ui/Reveal";
import { DeferredVideo } from "./ui/DeferredVideo";

// Deterministic particle field (avoids SSR/CSR hydration mismatch).
const PARTICLES = [
  { left: 6, size: 3, dur: 11, delay: 0 },
  { left: 14, size: 2, dur: 9, delay: 3 },
  { left: 22, size: 4, dur: 13, delay: 1 },
  { left: 30, size: 2, dur: 8, delay: 5 },
  { left: 38, size: 3, dur: 12, delay: 2 },
  { left: 46, size: 2, dur: 10, delay: 6 },
  { left: 54, size: 3, dur: 9, delay: 1.5 },
  { left: 62, size: 4, dur: 14, delay: 4 },
  { left: 70, size: 2, dur: 8, delay: 0.5 },
  { left: 78, size: 3, dur: 11, delay: 3.5 },
  { left: 86, size: 2, dur: 10, delay: 2.5 },
  { left: 94, size: 3, dur: 12, delay: 5.5 },
  { left: 18, size: 2, dur: 13, delay: 7 },
  { left: 50, size: 2, dur: 15, delay: 4.5 },
  { left: 82, size: 3, dur: 9, delay: 6.5 },
  { left: 34, size: 2, dur: 12, delay: 8 },
];

export function CallbackCta() {
  return (
    <section
      id="callback"
      className="cta-immersive"
      aria-label="הציגו את הפרויקט כאילו הוא כבר נבנה"
    >
      {/* Background video (drone around building) — bytes fetched only when
          the section nears the viewport; the poster paints until then. */}
      <DeferredVideo
        className="cta-layer h-full w-full object-cover"
        poster="/videos/cta-poster.webp"
        // Full derived set present on disk.
        posterVariants
        sources={[
          { src: "/videos/cta-loop.webm", type: "video/webm" },
          { src: "/videos/cta-loop.mp4", type: "video/mp4" },
        ]}
      />

      {/* Overlays */}
      <div className="cta-layer cta-gradient" />
      <div className="cta-layer cta-grid" />
      <div className="cta-layer cta-noise" />

      {/* Particles */}
      <div className="cta-layer overflow-hidden" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="cta-particle"
            style={{
              left: `${p.left}%`,
              bottom: "18%",
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container-x flex flex-col items-center text-center py-[clamp(5rem,14vh,9rem)]">
        <Reveal>
          <div className="cta-glass max-w-2xl mx-auto px-8 py-11 md:px-14 md:py-14">
            <h2 className="h2 text-white leading-[1.15] text-balance">
              {CALLBACK_CTA.title}
            </h2>
            <p className="mt-5 text-[color:var(--steel-300)] text-xl md:text-2xl font-display leading-snug text-balance">
              {CALLBACK_CTA.subtitle}
            </p>
            <div className="mt-9 flex justify-center">
              <GlassButton href={CONTACT.contactPath} variant="primary">
                {CALLBACK_CTA.button}
              </GlassButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
