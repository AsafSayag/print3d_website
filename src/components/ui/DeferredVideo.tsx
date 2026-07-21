"use client";

import { useEffect, useRef, useState } from "react";

// Phones get the `-mobile` poster cut (see the <picture> below).
const POSTER_MOBILE_QUERY = "(max-width: 767px)";

type Source = { src: string; type: string };

type Props = {
  sources: Source[];
  poster: string;
  className?: string;
  /** Delay (ms) between the video becoming ready and its first play() call. */
  playDelayMs?: number;
  /**
   * Above-the-fold hero mode. The poster is the page's LCP element, so it is
   * loaded eagerly at high priority (never `loading="lazy"`, which would tank
   * LCP), and the video bytes are held until the poster has painted so the clip
   * can never steal bandwidth from the LCP image. Leave `false` for the ambient
   * below-the-fold videos, which stay lazy + proximity-gated.
   */
  priority?: boolean;
};

/**
 * Background video whose bytes are fetched only when the element comes
 * within ~2 viewports of the screen. Until then only the poster paints.
 *
 * Uses the same throttled-rAF proximity check as useInViewOnce (see its
 * comment for why not IntersectionObserver). `autoplay` is intentionally
 * absent — with autoplay the browser ignores preload="none" and downloads
 * the full file immediately; we call play() ourselves after attaching the
 * sources.
 */
export function DeferredVideo({
  sources,
  poster,
  className,
  playDelayMs = 0,
  priority = false,
}: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const posterRef = useRef<HTMLImageElement | null>(null);
  const [load, setLoad] = useState(false);
  // Gate that holds the video's bytes until the LCP poster is painted. Only
  // meaningful in `priority` (hero) mode; for ambient videos it opens at mount.
  const [posterReady, setPosterReady] = useState(!priority);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let frame = 0;

    const tick = () => {
      if (frame++ % 8 === 0) {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top < vh * 2 && rect.bottom > -vh) {
          setLoad(true);
          return; // stop polling
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Hero mode: open the video gate only once the eager poster (the LCP element)
  // has finished, so the ~750KB clip never competes with it. A safety timeout
  // covers a missed load/error event.
  useEffect(() => {
    if (!priority) return;
    const img = posterRef.current;
    if (!img || img.complete) {
      setPosterReady(true);
      return;
    }
    const done = () => setPosterReady(true);
    img.addEventListener("load", done);
    img.addEventListener("error", done);
    const t = window.setTimeout(done, 2500);
    return () => {
      img.removeEventListener("load", done);
      img.removeEventListener("error", done);
      window.clearTimeout(t);
    };
  }, [priority]);

  // Sources were just attached — load and start the loop. Waits for both the
  // proximity gate (`load`) and, in hero mode, the poster gate (`posterReady`).
  useEffect(() => {
    if (!load || !posterReady) return;
    const el = ref.current;
    if (!el) return;
    el.load();
    if (playDelayMs > 0) {
      const t = setTimeout(() => el.play().catch(() => {}), playDelayMs);
      return () => clearTimeout(t);
    }
    el.play().catch(() => {});
  }, [load, posterReady, playDelayMs]);

  // The poster is served through a <picture> instead of the <video>'s `poster`
  // attribute so the browser can pick a phone-sized cut on mobile (the full
  // 1440×1080 still is wasteful there) and the best format it supports. It also
  // lets us mark the still `loading="lazy"` — the section is below the fold, so
  // the poster now downloads only as it nears the viewport rather than on first
  // load. Paths follow a convention off the `.webp` poster: `<name>.{avif,webp,
  // jpg}` for desktop and `<name>-mobile.{avif,webp,jpg}` for phones. Visually
  // identical: the still fills the same box and the video covers it on play.
  const base = poster.replace(/\.webp$/, "");

  return (
    <>
      <picture>
        <source media={POSTER_MOBILE_QUERY} type="image/avif" srcSet={`${base}-mobile.avif`} />
        <source media={POSTER_MOBILE_QUERY} type="image/webp" srcSet={`${base}-mobile.webp`} />
        <source media={POSTER_MOBILE_QUERY} srcSet={`${base}-mobile.jpg`} />
        <source type="image/avif" srcSet={`${base}.avif`} />
        <source type="image/webp" srcSet={`${base}.webp`} />
        <img
          ref={posterRef}
          className={className}
          src={`${base}.jpg`}
          alt=""
          aria-hidden="true"
          // Hero posters are the LCP element — fetch them eagerly at high
          // priority. Ambient below-the-fold posters stay lazy.
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
        />
      </picture>
      <video
        ref={ref}
        className={className}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      >
        {load &&
          posterReady &&
          sources.map((s) => <source key={s.src} src={s.src} type={s.type} />)}
      </video>
    </>
  );
}
