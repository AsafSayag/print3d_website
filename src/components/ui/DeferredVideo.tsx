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
export function DeferredVideo({ sources, poster, className, playDelayMs = 0 }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [load, setLoad] = useState(false);

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

  // Sources were just attached — load and start the loop.
  useEffect(() => {
    if (!load) return;
    const el = ref.current;
    if (!el) return;
    el.load();
    if (playDelayMs > 0) {
      const t = setTimeout(() => el.play().catch(() => {}), playDelayMs);
      return () => clearTimeout(t);
    }
    el.play().catch(() => {});
  }, [load, playDelayMs]);

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
          className={className}
          src={`${base}.jpg`}
          alt=""
          aria-hidden="true"
          loading="lazy"
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
          sources.map((s) => <source key={s.src} src={s.src} type={s.type} />)}
      </video>
    </>
  );
}
