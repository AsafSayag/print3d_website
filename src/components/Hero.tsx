"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { GlassButton } from "./ui/GlassButton";
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
      className="relative w-full overflow-hidden surface-navy-950"
      style={{ height: "100svh", minHeight: "600px" }}
      aria-label="מודלים אדריכליים פיזיים לפרויקטי נדל״ן"
    >
      {/* Background layer: a single high-quality still of the models showroom. */}
      <div className="absolute inset-0">
        <picture>
          <source srcSet="/hero-hall.webp" type="image/webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-hall.jpg"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
        </picture>
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
      <div className="relative z-10 h-full container-x flex flex-col items-center justify-start text-center pt-24 md:pt-28">
        <HeroContent revealed={revealed} reduce={!!reduce} />
      </div>

      {/* Scroll hint */}
      <AnimatedScrollHint revealed={revealed} reduce={!!reduce} />
    </section>
  );
}

/* Standalone band directly beneath the hero — carries the copy that used to
   float over the showroom photo, now read as its own statement on solid
   ground. */
export function HeroTagline() {
  return (
    <section
      className="hero-tagline text-white py-10 md:py-14"
      aria-label={HERO_COPY.subtitle}
    >
      {/* Decorative layers — a fine engineering grid + soft glows, faded at the
          edges so the copy stays the focus. */}
      <span aria-hidden="true" className="hero-tagline__grid" />
      <span aria-hidden="true" className="hero-tagline__glow" />

      <div className="container-x relative flex justify-center text-center">
        {/* Same glass pill as the hero H1 — a translucent dark card with a
            hairline border, blur and soft shadow. */}
        <p className="hero-tagline__copy text-white font-bold text-lg md:text-xl max-w-2xl leading-relaxed text-balance">
          {HERO_COPY.subtitle}
        </p>
      </div>
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
      {/* Headline — anchored to the top, beneath the navbar. */}
      <div className="flex flex-col items-center">
        <h1
          style={{
            ...item(0),
            border: "1px solid rgba(255,255,255,0.28)",
            background: "rgba(7,13,23,0.32)",
            backdropFilter: "blur(10px) saturate(140%)",
            WebkitBackdropFilter: "blur(10px) saturate(140%)",
            borderRadius: "16px",
            padding: "0.5rem 1.1rem",
            textShadow:
              "0 2px 10px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.95)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.18), 0 10px 30px -12px rgba(7,13,23,0.45)",
          }}
          className="h1 hero-h1 text-white whitespace-nowrap"
        >
          {HERO_COPY.h1}
        </h1>
      </div>

      {/* CTAs are anchored low in the hero — fully visible on entry, but sitting
          near the bottom so the showroom image reads first. Absolutely placed
          against the (relative) content layer, above the scroll hint. */}
      <div className="absolute inset-x-0 bottom-24 z-10 flex justify-center px-4">
        <div
          style={item(1)}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-5"
        >
          <GlassButton
            href={CONTACT.contactPath}
            variant="primary"
            className="!px-9 !py-4 !text-lg"
          >
            {HERO_COPY.primaryCta}
          </GlassButton>
          <GlassButton
            href="/portfolio"
            variant="secondary"
            className="!px-9 !py-4 !text-lg"
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
      className="absolute inset-x-0 bottom-7 z-10 flex justify-center"
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
