import { GlassButton } from "./ui/GlassButton";
import { HeroVideo } from "./ui/HeroVideo";
import { analyticsAttrs } from "@/lib/analytics";
import { HERO_COPY } from "@/lib/content";

/**
 * Home hero. A Server Component: the headline, subtitle and CTAs enter with
 * pure-CSS animations that start on the first paint (.hero-drop / .hero-rise /
 * .hero-scrim / .hero-hint in globals.css). They used to wait on a React state
 * flipped after hydration, so on a first mobile visit the hero showed the photo
 * with no headline and no buttons for ~3s while the JS loaded.
 */
export function Hero() {
  return (
    <section
      // The hero takes the exact aspect ratio of its background video — the
      // vertical cut on mobile, the landscape cut on desktop — so the footage
      // fills edge to edge with no crop and no letterbox bars, and the PRINT3D
      // logo in the frame stays fully visible the whole way through.
      className="relative w-full overflow-hidden surface-navy-950 aspect-[4/5] md:aspect-[1914/1080]"
      aria-label="מודלים אדריכליים פיזיים לפרויקטי נדל״ן"
    >
      {/* Background layer: the models-showroom video — landscape on desktop,
          vertical on mobile. Poster paints instantly for LCP. */}
      <div
        className="absolute inset-0"
        // Lift the footage: it was shot fairly dark, so brighten + gently lift
        // saturation/contrast on both mobile and desktop.
        style={{ filter: "brightness(1.18) saturate(1.06) contrast(1.02)" }}
      >
        {/* Mobile: vertical cut fills the portrait screen (object-cover).
            Desktop: landscape cut shown in full so the whole frame + the
            PRINT3D logo stay visible (object-contain); the navy section
            background fills any letterbox. */}
        <HeroVideo className="h-full w-full object-cover" />
      </div>

      {/* Scrim — lighter than before so the brighter footage reads through;
          still deepens a touch as the copy enters, for legibility. */}
      <div
        className="hero-scrim absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 30%, rgba(7,13,23,0.04), rgba(7,13,23,0.3) 70%, rgba(7,13,23,0.5))",
        }}
      />

      {/* One H1 for both breakpoints. The panel and the companion H2 retain
          their existing mobile and desktop layouts. */}
      <div
        className="hero-drop absolute z-20 inset-x-0 top-[5.25rem] flex justify-center px-4 md:top-[5rem] md:px-0 md:[--hero-from:-1.75rem] lg:top-[6rem]"
      >
        <div
          dir="rtl"
          className="hero-heading-panel flex max-w-[calc(100%-1rem)] flex-col items-center rounded-2xl px-5 py-2.5 text-center md:max-w-none md:items-stretch md:rounded-[18px] md:px-4 md:py-[3px] lg:px-5 lg:py-[6px]"
        >
          <div className="flex items-baseline justify-center md:gap-4 lg:gap-6">
            <h1 className="font-bold text-[1.15rem] leading-snug text-white sm:text-[1.28rem] md:whitespace-nowrap md:text-[clamp(1.35rem,2.15vw,2.05rem)]">
              {HERO_COPY.h1}
            </h1>
            <span
              aria-hidden="true"
              className="hidden whitespace-nowrap text-[clamp(1.1rem,1.7vw,1.6rem)] font-semibold leading-snug text-white/75 md:inline"
            >
              -
            </span>
            <h2 className="hidden whitespace-nowrap text-[clamp(1.1rem,1.7vw,1.6rem)] font-semibold leading-snug text-white md:block">
              {HERO_COPY.h2}
            </h2>
          </div>
          <span
            aria-hidden="true"
            className="mx-auto mt-1 h-[2px] w-28 rounded-full md:hidden"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--gold-500) 28%, var(--gold-400) 50%, var(--gold-500) 72%, transparent)",
              boxShadow: "0 0 12px rgba(95,154,192,0.5)",
            }}
          />
          <span
            aria-hidden="true"
            className="mt-2 hidden h-[2px] w-full rounded-full md:block"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--gold-500) 18%, var(--gold-400) 50%, var(--gold-500) 82%, transparent)",
              boxShadow: "0 0 12px rgba(95,154,192,0.5)",
            }}
          />
        </div>
      </div>

      {/* Content layer — always in the DOM (SEO/LCP), animated in by CSS.
          Top-aligned so the headline sits just beneath the navbar rather than
          floating in the vertical centre. */}
      <div className="relative z-10 h-full container-x flex flex-col items-center justify-start text-center pt-32 md:pt-28">
        <HeroContent />
      </div>

      {/* Scroll hint */}
      <AnimatedScrollHint />
    </section>
  );
}

function HeroContent() {
  // Staggered fade+rise (.hero-rise), timed from the first paint.
  const item = (i: number): React.CSSProperties => ({
    animationDelay: `${0.15 + i * 0.12}s`,
  });

  return (
    <>
      {/* Bottom group. On mobile the H1 lives up top over the video; here the H2 subtitle sits first and the
          CTAs now follow directly BENEATH it. The base offset (bottom-10) is
          tuned so the H2 keeps the exact position it had before the buttons were
          moved below it (~96px from the section bottom). Desktop is unaffected:
          the H2 here is md:hidden, so only the buttons remain and they keep their
          original offset (md:bottom-40). */}
      <div className="absolute inset-x-0 bottom-[34px] sm:bottom-[42px] md:bottom-40 z-10 flex flex-col items-center justify-center px-4 gap-5">
        {/* Mobile-only subtitle — pinned in place; buttons follow below it.
            md:hidden so desktop (which shows the H2 in its top row) stays
            untouched. Carries the same blue accent rule beneath it as the H1. */}
        <div
          className="hero-rise md:hidden flex flex-col items-center"
          style={item(1)}
        >
          <h2
            dir="rtl"
            className="font-medium text-[1.05rem] sm:text-[1.15rem] text-white/85 leading-snug"
            style={{
              textShadow:
                "0 2px 12px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.95), 0 0 2px rgba(0,0,0,0.9)",
            }}
          >
            {HERO_COPY.h2}
          </h2>
          <span
            aria-hidden="true"
            className="mt-1 h-[2px] w-28 rounded-full"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--gold-500) 28%, var(--gold-400) 50%, var(--gold-500) 72%, transparent)",
              boxShadow: "0 0 12px rgba(95,154,192,0.5)",
            }}
          />
        </div>

        {/* CTAs — nudged up slightly via bottom margin (container is anchored to
            the section bottom, so mb lifts the buttons off the bottom edge). */}
        <div
          style={item(2)}
          className="hero-rise mb-6 sm:mb-8 md:mb-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5"
        >
          <GlassButton
            href="#contact"
            variant="primary"
            {...analyticsAttrs("cta_click", {
              cta_name: "quote_request",
              location: "hero",
            })}
            className="!px-5 sm:!px-7 md:!px-8 !py-2.5 sm:!py-3.5 !text-[15px] sm:!text-base"
          >
            {HERO_COPY.primaryCta}
          </GlassButton>
          <GlassButton
            href="/projects"
            variant="secondary"
            {...analyticsAttrs("cta_click", {
              cta_name: "view_projects",
              location: "hero",
            })}
            className="hero-secondary-cta !px-5 sm:!px-7 md:!px-8 !py-2.5 sm:!py-3.5 !text-[15px] sm:!text-base"
          >
            {HERO_COPY.secondaryCta}
          </GlassButton>
        </div>
      </div>
    </>
  );
}

function AnimatedScrollHint() {
  return (
    <div
      aria-hidden="true"
      className="hero-hint absolute inset-x-0 bottom-7 z-10 hidden md:flex justify-center"
    >
      <div className="h-9 w-[22px] rounded-full border border-white/40 flex justify-center pt-2">
        <span className="hint-dot block h-1.5 w-1 rounded-full bg-white/70" />
      </div>
    </div>
  );
}
