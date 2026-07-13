"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { GlassButton } from "./ui/GlassButton";
import { HERO, MOTION, CONTACT } from "@/lib/constants";
import { HERO_COPY } from "@/lib/content";

type Mode = "loading" | "video" | "poster";

export function Hero() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const startedRef = useRef(false);

  const [mode, setMode] = useState<Mode>("loading");
  // Content (logo/text/buttons) only enters once this is true.
  const [revealed, setRevealed] = useState(false);

  // Decide device profile AND the resulting mode in a single pass, so the
  // `<video>` only ever mounts once the device is confirmed to be desktop.
  //
  // Splitting these into two effects meant the mode effect ran once on mount
  // with the default (desktop) assumption, briefly mounting the video on mobile
  // too — and because it is `preload="auto"`, the browser eagerly fetched the
  // full ~1.6MB file before the device-detection effect could switch to the
  // poster. That download was pure waste on every mobile visit. Deciding both
  // together keeps `mode` at "loading" (poster only) until the real device is
  // known, so mobile never touches the video. Desktop behaviour is unchanged.
  useEffect(() => {
    const mobile = window.matchMedia(
      `(max-width: ${HERO.mobileMaxWidth - 1}px), (pointer: coarse)`,
    ).matches;
    if (mobile || reduce) {
      setMode("poster");
      setRevealed(true);
    } else {
      setMode("video");
    }
  }, [reduce]);

  // Desktop video choreography.
  useEffect(() => {
    if (mode !== "video") return;
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = HERO.playbackRate;

    const onPlaying = () => {
      startedRef.current = true;
    };

    // Freeze on the current frame — pause and hold it, perfectly static.
    const freeze = () => {
      if (!video.paused) video.pause();
    };

    // Pause a hair BEFORE the natural end so the browser never repaints the
    // end-of-stream frame — that repaint is what caused the flicker.
    const onTimeUpdate = () => {
      if (
        video.duration &&
        video.currentTime >= video.duration - HERO.freezeLeadSec
      ) {
        video.removeEventListener("timeupdate", onTimeUpdate);
        freeze();
      }
    };

    const tryPlay = () => {
      video.playbackRate = HERO.playbackRate;
      video.play().catch(() => {});
    };

    video.addEventListener("playing", onPlaying);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", freeze); // safety net
    video.addEventListener("loadeddata", tryPlay);
    if (video.readyState >= 2) tryPlay();

    // Reveal the content shortly after entering the site — independent of the
    // video, which keeps playing behind it.
    const revealTimer = window.setTimeout(
      () => setRevealed(true),
      HERO.revealDelayMs,
    );

    return () => {
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", freeze);
      video.removeEventListener("loadeddata", tryPlay);
      window.clearTimeout(revealTimer);
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
              // Held perfectly still once the video freezes on its last frame —
              // no ken-burns zoom, so there is no drift/jitter at the hand-off.
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
              // Lift the footage — the raw frames read too dark.
              filter: "brightness(1.22) contrast(1.02)",
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
            fetchPriority="high"
            className="h-full w-full object-cover"
            style={{ filter: "brightness(1.22) contrast(1.02)" }}
          />
        )}
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
    <div className="flex flex-col items-center gap-6 max-w-4xl mt-18 md:mt-22">
      <h1 style={item(0)} className="h1 hero-h1 text-white max-w-3xl text-balance">
        {HERO_COPY.h1}
      </h1>

      <p
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
        className="text-white font-bold text-lg md:text-xl max-w-2xl leading-relaxed -mt-3"
      >
        {HERO_COPY.subtitle}
      </p>

      {/* Primary CTA is brought forward to reveal with the subtitle — one beat
          after the headline (index 1, not last) — so the main action appears
          promptly. The single-beat cascade (headline → subtitle + CTAs) keeps
          the choreographed feel. */}
      <div
        style={item(1)}
        className="flex flex-wrap items-center justify-center gap-4 mt-26 md:mt-34"
      >
        <GlassButton href={CONTACT.contactPath} variant="primary">
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
