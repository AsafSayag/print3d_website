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
      <div className="absolute inset-0">
        {/* Mobile: vertical cut fills the portrait screen (object-cover).
            Desktop: landscape cut shown in full so the whole frame + the
            PRINT3D logo stay visible (object-contain); the navy section
            background fills any letterbox. */}
        <HeroVideo className="h-full w-full object-cover" />
      </div>

      {/* Scrim — deepens once content is revealed for legibility */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 30%, rgba(7,13,23,0.12), rgba(7,13,23,0.5) 70%, rgba(7,13,23,0.72))",
          opacity: revealed ? 1 : 0.5,
        }}
      />

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
      {/* CTAs are the in-flow anchor of this bottom group, so they keep their
          original position on every breakpoint. The heading (former subtitle,
          now the H1) sits ABOVE the buttons on desktop (normal flow) but is
          pulled BELOW them on mobile via `absolute top-full`, so it no longer
          covers the video/logo there. */}
      <div className="absolute inset-x-0 bottom-32 sm:bottom-36 md:bottom-40 z-10 flex flex-col items-center justify-center px-4 gap-6">
        {/* Heading in glass frame */}
        <h1
          style={{
            ...item(1),
            border: "1px solid rgba(255,255,255,0.28)",
            background: "rgba(7,13,23,0.32)",
            backdropFilter: "blur(10px) saturate(140%)",
            WebkitBackdropFilter: "blur(10px) saturate(140%)",
            borderRadius: "16px",
            padding: "0.6rem 1.4rem",
            textShadow:
              "0 2px 10px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.95)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.18), 0 10px 30px -12px rgba(7,13,23,0.45)",
          }}
          className="absolute top-full inset-x-4 mx-auto mt-4 md:static md:inset-x-auto md:mt-0 text-white font-bold text-[1.1rem] sm:text-[1.2rem] md:text-xl max-w-2xl leading-relaxed text-center"
        >
          {HERO_COPY.subtitle}
        </h1>

        {/* CTAs — positioned just below subtitle */}
        <div
          style={item(1)}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5"
        >
          <GlassButton
            href={CONTACT.contactPath}
            variant="primary"
            className="!px-6 sm:!px-8 md:!px-9 !py-3 sm:!py-4 !text-base sm:!text-lg"
          >
            {HERO_COPY.primaryCta}
          </GlassButton>
          <GlassButton
            href="/portfolio"
            variant="secondary"
            className="!px-6 sm:!px-8 md:!px-9 !py-3 sm:!py-4 !text-base sm:!text-lg"
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
