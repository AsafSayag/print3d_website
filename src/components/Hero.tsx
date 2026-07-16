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

      {/* Desktop-only heading — enters with a fade + slide from the top-right
          and rests in the top-RIGHT of the hero, just below the navbar so it
          never sits on the PRINT3D logo in the footage. Holds the H1 + H2 as a
          single stacked group at the same height. Mobile is untouched: there
          the heading stays in the bottom group (see HeroContent). */}
      <div
        dir="rtl"
        className="hidden md:flex flex-col items-stretch gap-1.5 absolute z-20 top-[4.5rem] right-4 lg:top-[5.5rem] lg:right-8 text-right"
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed || reduce ? "none" : "translate(2.75rem, -1.75rem)",
          transition: reduce
            ? "none"
            : "opacity 0.85s var(--ease-brand) 0.15s, transform 0.95s var(--ease-brand) 0.15s",
          willChange: "opacity, transform",
          // Glass panel removed — the copy now sits directly on the footage,
          // so a strong multi-layer text-shadow carries the legibility.
          textShadow:
            "0 2px 14px rgba(0,0,0,0.9), 0 1px 5px rgba(0,0,0,0.95), 0 0 2px rgba(0,0,0,0.9)",
        }}
      >
        {/* whitespace-nowrap keeps each line intact; the clamped fonts are a
            touch smaller than the previous single line so the group stays
            compact in the corner. */}
        <h1 className="whitespace-nowrap text-white font-bold text-[clamp(1.1rem,1.75vw,1.65rem)] leading-snug text-right">
          {HERO_COPY.h1}
        </h1>
        {/* Luxurious accent rule under the main heading — brand royal-blue
            gradient, anchored at the right (RTL start) and fading to the left,
            with a soft glow so it reads as a premium underline. */}
        <span
          aria-hidden="true"
          className="my-0.5 h-[2px] w-full rounded-full"
          style={{
            background:
              "linear-gradient(to left, var(--gold-400) 0%, var(--gold-500) 32%, rgba(95,154,192,0.18) 62%, transparent 82%)",
            boxShadow: "0 0 12px rgba(95,154,192,0.5)",
          }}
        />
        <h2 className="whitespace-nowrap text-white/85 font-medium text-[clamp(0.9rem,1.35vw,1.3rem)] leading-snug text-right">
          {HERO_COPY.h2}
        </h2>
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
      {/* CTAs are the in-flow anchor of this bottom group, so they keep their
          original position on every breakpoint. The heading (former subtitle,
          now the H1) sits ABOVE the buttons on desktop (normal flow) but is
          pulled BELOW them on mobile via `absolute top-full`, so it no longer
          covers the video/logo there. */}
      <div className="absolute inset-x-0 bottom-32 sm:bottom-36 md:bottom-40 z-10 flex flex-col items-center justify-center px-4 gap-6">
        {/* Heading group — kept intentionally compact on mobile so it never
            overwhelms the small screen. Glass panel removed: the copy sits
            directly on the footage, carried by a strong text-shadow. */}
        <div
          style={{
            ...item(1),
            textShadow:
              "0 2px 12px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.95), 0 0 2px rgba(0,0,0,0.9)",
          }}
          className="absolute top-full inset-x-4 mx-auto mt-4 md:hidden text-white max-w-2xl text-center flex flex-col gap-1"
        >
          <h1 className="font-bold text-[1.15rem] sm:text-[1.28rem] leading-snug">
            {HERO_COPY.h1}
          </h1>
          {/* Same luxurious accent as desktop, centred to match the mobile
              centred heading — symmetric brand-blue gradient with a soft glow. */}
          <span
            aria-hidden="true"
            className="mx-auto my-1 h-[2px] w-28 rounded-full"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--gold-500) 28%, var(--gold-400) 50%, var(--gold-500) 72%, transparent)",
              boxShadow: "0 0 12px rgba(95,154,192,0.5)",
            }}
          />
          <h2 className="font-medium text-[0.92rem] sm:text-[1.02rem] text-white/85 leading-snug">
            {HERO_COPY.h2}
          </h2>
        </div>

        {/* CTAs — positioned just below subtitle */}
        <div
          style={item(1)}
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
            href="/portfolio"
            variant="secondary"
            className="!px-5 sm:!px-7 md:!px-8 !py-2.5 sm:!py-3.5 !text-[15px] sm:!text-base"
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
