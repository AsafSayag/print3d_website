"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { GlassButton } from "./ui/GlassButton";
import { Logo } from "./ui/Logo";
import { HERO, MOTION } from "@/lib/constants";
import { HERO_COPY } from "@/lib/content";

type Mode = "loading" | "video" | "poster";

export function Hero() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const startedRef = useRef(false);

  const [isMobile, setIsMobile] = useState(false);
  const [mode, setMode] = useState<Mode>("loading");
  // Content (logo/text/buttons) only enters once this is true.
  const [revealed, setRevealed] = useState(false);
  const [frozen, setFrozen] = useState(false);

  // Decide device profile once mounted.
  useEffect(() => {
    const mq = window.matchMedia(
      `(max-width: ${HERO.mobileMaxWidth - 1}px), (pointer: coarse)`,
    );
    setIsMobile(mq.matches);
  }, []);

  // Mobile or reduced-motion → static poster, content immediately.
  useEffect(() => {
    if (isMobile || reduce) {
      setMode("poster");
      setRevealed(true);
    } else {
      setMode("video");
    }
  }, [isMobile, reduce]);

  // Desktop video choreography.
  useEffect(() => {
    if (mode !== "video") return;
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = HERO.playbackRate;

    const onPlaying = () => {
      startedRef.current = true;
    };
    const onEnded = () => {
      setFrozen(true); // hold last frame + slow ken-burns
      setRevealed(true);
    };
    const tryPlay = () => {
      video.playbackRate = HERO.playbackRate;
      video.play().catch(() => {
        // Autoplay blocked → reveal over poster.
        setRevealed(true);
      });
    };

    video.addEventListener("playing", onPlaying);
    video.addEventListener("ended", onEnded);
    video.addEventListener("loadeddata", tryPlay);
    if (video.readyState >= 2) tryPlay();

    // Fallback: if the video never starts, don't hold the page hostage.
    const timeout = window.setTimeout(() => {
      if (!startedRef.current) setRevealed(true);
    }, HERO.videoTimeoutMs);

    return () => {
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("loadeddata", tryPlay);
      window.clearTimeout(timeout);
    };
  }, [mode]);

  const showVideo = mode === "video";

  return (
    <section
      className="relative w-full overflow-hidden surface-navy-950"
      style={{ height: "100svh", minHeight: "600px" }}
      aria-label="מודלים אדריכליים פיזיים לפרויקטי נדל״ן"
    >
      {/* Background layer: video (desktop) or poster (mobile/fallback) */}
      <div className="absolute inset-0">
        {showVideo ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            style={{
              transform: frozen ? "scale(1.05)" : "scale(1)",
              transition: frozen ? "transform 20s linear" : "none",
            }}
            muted
            playsInline
            preload="auto"
            poster="/videos/hero-poster.jpg"
          >
            <source src="/videos/hero.webm" type="video/webm" />
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/videos/hero-poster-mobile.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {/* Scrim — deepens once content is revealed for legibility */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 30%, rgba(7,13,23,0.25), rgba(7,13,23,0.75) 70%, rgba(7,13,23,0.92))",
          opacity: revealed ? 1 : 0.55,
        }}
      />

      {/* Content layer — always in the DOM (SEO/LCP), revealed on cue */}
      <div className="relative z-10 h-full container-x flex flex-col items-center justify-center text-center">
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
    <div className="flex flex-col items-center gap-6 max-w-4xl">
      <div style={item(0)} className="mb-1">
        <Logo variant="light" size={58} />
      </div>

      <p style={item(1)} className="eyebrow text-[color:var(--steel-300)]">
        {HERO_COPY.eyebrow}
      </p>

      <h1 style={item(2)} className="h1 text-white max-w-3xl text-balance">
        {HERO_COPY.h1}
      </h1>

      <p
        style={item(3)}
        className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed"
      >
        {HERO_COPY.subtitle}
      </p>

      <div
        style={item(4)}
        className="flex flex-wrap items-center justify-center gap-4 mt-3"
      >
        <GlassButton href="#contact" variant="primary">
          {HERO_COPY.primaryCta}
        </GlassButton>
        <GlassButton href="#portfolio" variant="secondary">
          {HERO_COPY.secondaryCta}
        </GlassButton>
      </div>
    </div>
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
