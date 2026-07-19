"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Background video for the home hero. Serves a landscape cut on desktop and a
 * vertical cut on mobile, since a single 16:9 clip crops away most of the frame
 * on a portrait phone screen. The variant is chosen with matchMedia after mount
 * (and re-chosen on breakpoint crossings), so only the relevant file downloads.
 *
 * The LCP element is the poster, rendered as a server-side <picture>: the
 * browser picks the correct cut per breakpoint at parse time (no JS), so the
 * preload scanner discovers it immediately and fetches it at high priority.
 * The video sits on top and covers the poster once it starts.
 *
 * Autoplay is intentionally absent: with autoplay the browser ignores
 * preload="none" and downloads the full clip immediately, competing with the
 * poster for bandwidth during the LCP window. Instead we attach the sources and
 * call play() ourselves the moment the poster (the LCP element) has finished
 * loading — the earliest point at which the ~1.1–1.6MB clip can no longer steal
 * bandwidth from it. On a warm connection the poster lands in a blink, so the
 * ambient loop starts effectively immediately; on a throttled one it simply
 * waits its turn. muted + playsInline keep programmatic play allowed.
 */

const MOBILE_QUERY = "(max-width: 767px)";

// The posters ship as .jpg (fallback) alongside .webp/.avif siblings; swap the
// extension to point a <source> at the lighter format.
const posterExt = (jpg: string, ext: string) => jpg.replace(/\.jpg$/, ext);

const DESKTOP = {
  poster: "/videos/home-hero-poster.jpg",
  // Loops continuously as an ambient background — on every breakpoint.
  loop: true,
  sources: [
    { src: "/videos/home-hero.webm", type: "video/webm" },
    { src: "/videos/home-hero.mp4", type: "video/mp4" },
  ],
};

const MOBILE = {
  poster: "/videos/home-hero-mobile-poster.jpg",
  loop: true,
  sources: [
    { src: "/videos/home-hero-mobile.webm", type: "video/webm" },
    { src: "/videos/home-hero-mobile.mp4", type: "video/mp4" },
  ],
};

export function HeroVideo({ className }: { className?: string }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const posterRef = useRef<HTMLImageElement | null>(null);
  // Null until mount so no sources attach (and nothing downloads) before we
  // know which breakpoint we're on. The <picture> poster covers first paint.
  const [variant, setVariant] = useState<typeof DESKTOP | null>(null);
  // Gate the video's bytes on the poster (LCP) finishing, so the clip never
  // steals bandwidth from it — yet starts the instant the poster is secured.
  const [start, setStart] = useState(false);
  // The video fades in over the poster once it is actually playing, so the
  // hand-off from the static frame to live footage is a smooth dissolve rather
  // than a hard pop (and nothing shows until there is a real frame to show).
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const pick = () => setVariant(mq.matches ? MOBILE : DESKTOP);
    pick();
    mq.addEventListener("change", pick);
    return () => mq.removeEventListener("change", pick);
  }, []);

  // Start as soon as the poster has loaded (or is already cached). A safety
  // timeout covers the case where its load/error events are somehow missed.
  useEffect(() => {
    const img = posterRef.current;
    if (!img || img.complete) {
      setStart(true);
      return;
    }
    const done = () => setStart(true);
    img.addEventListener("load", done);
    img.addEventListener("error", done);
    const t = window.setTimeout(done, 2000);
    return () => {
      img.removeEventListener("load", done);
      img.removeEventListener("error", done);
      window.clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !variant || !start) return;
    el.load();
    el.play().catch(() => {});
  }, [variant, start]);

  return (
    <>
      {/* Poster (LCP): correct cut per breakpoint, chosen by <picture> at parse
          time — discoverable by the preload scanner with high priority. The
          video below covers it once playback starts; visually identical to the
          old poster. */}
      <picture>
        {/* Mobile cut, best format the browser supports first. */}
        <source
          media={MOBILE_QUERY}
          type="image/avif"
          srcSet={posterExt(MOBILE.poster, ".avif")}
        />
        <source
          media={MOBILE_QUERY}
          type="image/webp"
          srcSet={posterExt(MOBILE.poster, ".webp")}
        />
        <source media={MOBILE_QUERY} srcSet={MOBILE.poster} />
        {/* Desktop cut. */}
        <source type="image/avif" srcSet={posterExt(DESKTOP.poster, ".avif")} />
        <source type="image/webp" srcSet={posterExt(DESKTOP.poster, ".webp")} />
        <img
          ref={posterRef}
          src={DESKTOP.poster}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      <video
        // Remount on variant swap so the browser re-reads the new <source> set.
        key={variant?.sources[0].src ?? "idle"}
        ref={ref}
        className={`${className ?? ""} absolute inset-0`}
        style={{
          opacity: playing ? 1 : 0,
          transition: "opacity 0.7s ease-out",
        }}
        muted
        loop={(variant ?? DESKTOP).loop}
        playsInline
        preload="none"
        onPlaying={() => setPlaying(true)}
        aria-hidden="true"
      >
        {start &&
          variant?.sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
      </video>
    </>
  );
}
