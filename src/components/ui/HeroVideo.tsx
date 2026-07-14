"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Background video for the home hero. Serves a landscape cut on desktop and a
 * vertical cut on mobile, since a single 16:9 clip crops away most of the frame
 * on a portrait phone screen. The variant is chosen with matchMedia after mount
 * (and re-chosen on breakpoint crossings), so only the relevant file downloads.
 *
 * Autoplay requires muted + playsInline. The poster paints immediately for LCP;
 * the matching variant is decoded and started as soon as its sources attach.
 */

const MOBILE_QUERY = "(max-width: 767px)";

const DESKTOP = {
  poster: "/videos/home-hero-poster.jpg",
  // Desktop loops continuously as an ambient background.
  loop: true,
  sources: [
    { src: "/videos/home-hero.webm", type: "video/webm" },
    { src: "/videos/home-hero.mp4", type: "video/mp4" },
  ],
};

const MOBILE = {
  poster: "/videos/home-hero-mobile-poster.jpg",
  // Mobile plays through once and then holds on its final frame (no loop —
  // a paused <video> keeps painting the last decoded frame after it ends).
  loop: false,
  sources: [
    { src: "/videos/home-hero-mobile.webm", type: "video/webm" },
    { src: "/videos/home-hero-mobile.mp4", type: "video/mp4" },
  ],
};

export function HeroVideo({ className }: { className?: string }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  // Null until mount so no sources attach (and nothing downloads) before we
  // know which breakpoint we're on. The CSS poster covers this first paint.
  const [variant, setVariant] = useState<typeof DESKTOP | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const pick = () => setVariant(mq.matches ? MOBILE : DESKTOP);
    pick();
    mq.addEventListener("change", pick);
    return () => mq.removeEventListener("change", pick);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !variant) return;
    el.load();
    el.play().catch(() => {});
  }, [variant]);

  return (
    <video
      // Remount on variant swap so the browser re-reads the new <source> set.
      key={variant?.sources[0].src ?? "poster"}
      ref={ref}
      className={className}
      muted
      loop={(variant ?? DESKTOP).loop}
      playsInline
      autoPlay
      preload="auto"
      poster={(variant ?? DESKTOP).poster}
      aria-hidden="true"
    >
      {variant?.sources.map((s) => (
        <source key={s.src} src={s.src} type={s.type} />
      ))}
    </video>
  );
}
