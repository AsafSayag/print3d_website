"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { GlassButton } from "./ui/GlassButton";
import { HeroVideo } from "./ui/HeroVideo";
import { HERO, MOTION, CONTACT } from "@/lib/constants";
import { HERO_COPY } from "@/lib/content";

export function Hero() {
  const reduce = useReducedMotion();

  // Content (logo/text/buttons) only enters once this is true.
  const [revealed, setRevealed] = useState(false);

  // The hero is a single static image (the showroom of models). Reveal the
  // copy shortly after entry — immediately when reduced motion is requested.
  useEffect(() => {
    if (reduce) {
      setRevealed(true);
      return;
    }
    const t = window.setTimeout(() => setRevealed(true), HERO.revealDelayMs);
    return () => window.clearTimeout(t);
  }, [reduce]);

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
          still deepens a touch once content is revealed for legibility. */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 30%, rgba(7,13,23,0.04), rgba(7,13,23,0.3) 70%, rgba(7,13,23,0.5))",
          opacity: revealed ? 1 : 0.5,
        }}
      />

      {/* Desktop-only heading — a row anchored top-RIGHT just below the navbar:
          the H1 sits first (rightmost) and the H2 follows immediately after it
          on the same line, both at the same height, each with its own
          royal-blue accent rule. Mobile is untouched: there the heading stays
          in the bottom group (see HeroContent). */}
      <div
        className="hidden md:flex flex-col items-center absolute z-20 top-[5rem] inset-x-0 lg:top-[6rem]"
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed || reduce ? "none" : "translateY(-1.75rem)",
          transition: reduce
            ? "none"
            : "opacity 0.85s var(--ease-brand) 0.15s, transform 0.95s var(--ease-brand) 0.15s",
          willChange: "opacity, transform",
          // Glass panel removed — the copy sits directly on the footage, so a
          // strong multi-layer text-shadow carries the legibility.
          textShadow:
            "0 2px 14px rgba(0,0,0,0.9), 0 1px 5px rgba(0,0,0,0.95), 0 0 2px rgba(0,0,0,0.9)",
        }}
      >
        {/* Centred group: H1 (rightmost) + H2 share ONE line and baseline, now
            joined by a slim dash between them; a single accent rule below
            connects underneath both. The inner block shrinks to the row width so
            the rule matches the headings, then the outer flex centres the whole
            thing. It's wrapped in an especially delicate liquid-glass frame —
            deliberately more subtle and a touch smaller than the buttons'
            material (lighter fill, hairline border, softer blur + shadow). */}
        <div
          dir="rtl"
          className="flex flex-col items-stretch text-center px-4 py-[3px] lg:px-5 lg:py-[6px] rounded-[18px]"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.18)",
            backdropFilter: "blur(12px) saturate(140%)",
            WebkitBackdropFilter: "blur(12px) saturate(140%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.22), 0 6px 22px rgba(7,13,23,0.28)",
          }}
        >
          <div className="flex items-baseline justify-center gap-4 lg:gap-6">
            {/* Desktop heading is a <p>, NOT an <h1>: the mobile block below
                carries the single semantic <h1> (mobile-first indexing), so the
                page never ships two h1s. Visually identical to the old h1. */}
            <p className="whitespace-nowrap text-white font-bold text-[clamp(1.35rem,2.15vw,2.05rem)] leading-snug">
              {HERO_COPY.h1}
            </p>
            {/* Slim dash joining the two headings. */}
            <span
              aria-hidden="true"
              className="whitespace-nowrap text-white/75 font-semibold text-[clamp(1.1rem,1.7vw,1.6rem)] leading-snug"
            >
              -
            </span>
            <h2 className="whitespace-nowrap text-white font-semibold text-[clamp(1.1rem,1.7vw,1.6rem)] leading-snug">
              {HERO_COPY.h2}
            </h2>
          </div>
          {/* One continuous royal-blue accent rule spanning both headings —
              symmetric: strong at the centre, fading gently to both ends. */}
          <span
            aria-hidden="true"
            className="mt-2 h-[2px] w-full rounded-full"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--gold-500) 18%, var(--gold-400) 50%, var(--gold-500) 82%, transparent)",
              boxShadow: "0 0 12px rgba(95,154,192,0.5)",
            }}
          />
        </div>
      </div>

      {/* Mobile-only heading — anchored near the TOP over the video, just below
          the navbar (moved up from its former spot beneath the buttons per
          request). It stays within the darker upper band of the footage so the
          panel never sits over the sharp models below. Desktop keeps its own
          top row above; this one is md:hidden. */}
      <div
        dir="rtl"
        className="md:hidden absolute z-20 top-[5.25rem] inset-x-0 px-4 flex justify-center"
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed || reduce ? "none" : "translateY(-1.25rem)",
          transition: reduce
            ? "none"
            : "opacity 0.85s var(--ease-brand) 0.15s, transform 0.95s var(--ease-brand) 0.15s",
          willChange: "opacity, transform",
        }}
      >
        {/* Very subtle transparent glass panel — a hairline frosted frame that
            lets the footage read clearly through it (kept light so it never
            reads as a blurred patch over the video). */}
        <div
          className="flex flex-col items-center text-center rounded-2xl px-5 py-2.5 max-w-[calc(100%-1rem)]"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.14)",
            backdropFilter: "blur(3px) saturate(120%)",
            WebkitBackdropFilter: "blur(3px) saturate(120%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.16), 0 6px 20px rgba(7,13,23,0.2)",
            textShadow:
              "0 2px 12px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.95), 0 0 2px rgba(0,0,0,0.9)",
          }}
        >
          <h1 className="font-bold text-[1.15rem] sm:text-[1.28rem] leading-snug text-white">
            {HERO_COPY.h1}
          </h1>
          <span
            aria-hidden="true"
            className="mx-auto mt-1 h-[2px] w-28 rounded-full"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--gold-500) 28%, var(--gold-400) 50%, var(--gold-500) 72%, transparent)",
              boxShadow: "0 0 12px rgba(95,154,192,0.5)",
            }}
          />
        </div>
      </div>

      {/* Content layer — always in the DOM (SEO/LCP), revealed on cue.
          Top-aligned so the headline sits just beneath the navbar rather than
          floating in the vertical centre. */}
      <div className="relative z-10 h-full container-x flex flex-col items-center justify-start text-center pt-32 md:pt-28">
        <HeroContent revealed={revealed} reduce={!!reduce} />
      </div>

      {/* Scroll hint */}
      <AnimatedScrollHint revealed={revealed} reduce={!!reduce} />
    </section>
  );
}

function HeroContent({
  revealed,
  reduce,
}: {
  revealed: boolean;
  reduce: boolean;
}) {
  // Reveal is driven by pure CSS transitions toggled on `revealed` — this
  // animates reliably on a delayed state change (unlike a late framer update),
  // keeps the H1 in the DOM from first paint (SEO/LCP), and is GPU-cheap.
  const item = (i: number): React.CSSProperties => {
    const dur = reduce ? 0 : MOTION.revealDuration;
    const delay = revealed && !reduce ? i * 0.12 : 0;
    return {
      opacity: revealed ? 1 : 0,
      transform: revealed || reduce ? "none" : `translateY(${MOTION.revealDistance}px)`,
      transition: `opacity ${dur}s var(--ease-brand) ${delay}s, transform ${dur}s var(--ease-brand) ${delay}s`,
      willChange: "opacity, transform",
    };
  };

  return (
    <>
      {/* Bottom group. On mobile the H1 lives up top over the video (see the
          md:hidden block in Hero above); here the H2 subtitle sits first and the
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
          className="md:hidden flex flex-col items-center"
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

        {/* CTAs */}
        <div
          style={item(2)}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5"
        >
          <GlassButton
            href={CONTACT.contactPath}
            variant="primary"
            className="!px-5 sm:!px-7 md:!px-8 !py-2.5 sm:!py-3.5 !text-[15px] sm:!text-base"
          >
            {HERO_COPY.primaryCta}
          </GlassButton>
          <GlassButton
            href="/projects"
            variant="secondary"
            className="hero-secondary-cta !px-5 sm:!px-7 md:!px-8 !py-2.5 sm:!py-3.5 !text-[15px] sm:!text-base"
          >
            {HERO_COPY.secondaryCta}
          </GlassButton>
        </div>
      </div>
    </>
  );
}

function AnimatedScrollHint({
  revealed,
  reduce,
}: {
  revealed: boolean;
  reduce: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 bottom-7 z-10 hidden md:flex justify-center"
      style={{
        opacity: revealed ? 1 : 0,
        transition: `opacity 0.6s var(--ease-brand) ${reduce ? 0 : 0.4}s`,
      }}
    >
      <div className="h-9 w-[22px] rounded-full border border-white/40 flex justify-center pt-2">
        <span className="hint-dot block h-1.5 w-1 rounded-full bg-white/70" />
      </div>
    </div>
  );
}
