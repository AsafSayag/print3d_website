"use client";

import { useEffect, useRef, useState } from "react";

// Phones get the `-mobile` poster cut (see the <picture> below).
const POSTER_MOBILE_QUERY = "(max-width: 767px)";

type Source = { src: string; type: string };

type Props = {
  sources: Source[];
  /** Poster path. Must be the `.webp`; it is used verbatim as the fallback. */
  poster: string;
  className?: string;
  /**
   * Set only when the derived poster cuts (`-mobile.{avif,webp,jpg}` and
   * `.{avif,jpg}`) genuinely exist next to the `.webp` — see the <picture>
   * comment below for why guessing is not safe. Defaults to false, which
   * serves the `.webp` alone: heavier on phones, but never broken.
   */
  posterVariants?: boolean;
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
  /**
   * Carousel gate. In a horizontal slider every slide shares the same vertical
   * position, so the proximity check alone treats them all as "near" and fires
   * every clip at once — downloading the whole reel up front. Pass `false` for
   * slides outside the active window to hold them on their poster; pass `true`
   * for the active slide and its immediate neighbours, and the bytes load then
   * — and stay loaded, so a slide reachable in one step always plays instantly
   * and revisiting never re-downloads. Defaults to `true`, so the single-video
   * callers (heroes, CTAs) are completely unaffected.
   */
  active?: boolean;
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
  posterVariants = false,
  playDelayMs = 0,
  priority = false,
  active = true,
}: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const posterRef = useRef<HTMLImageElement | null>(null);
  const [load, setLoad] = useState(false);
  // Gate that holds the video's bytes until the LCP poster is painted. Only
  // meaningful in `priority` (hero) mode; for ambient videos it opens at mount.
  const [posterReady, setPosterReady] = useState(!priority);

  // Proximity gate. Polls until the element is within ~2 viewports, then flips
  // `load` on for good. `active` lets a carousel hold non-neighbour slides back:
  // while it is false we don't even poll (so the whole reel can't load at once);
  // when the slide enters the active window `active` turns true, the effect
  // re-runs, and — since `load` is never reset — the clip loads once and stays.
  useEffect(() => {
    if (load) return; // already committed to loading — nothing left to gate
    if (!active) return; // carousel: hold this slide on its poster for now
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
  }, [load, active]);

  // Hero mode: hold the ~731KB clip until the page has fully loaded. The poster
  // paints almost immediately, so gating the video on the poster alone let it
  // start downloading within ~150ms and saturate a slow link right through the
  // LCP window — Lighthouse then charges the poster's paint with that bandwidth
  // and CPU contention. Waiting for the `load` event keeps the whole critical
  // path (poster, CSS, JS, fonts) clear first; a timeout covers the rare case
  // where `load` is delayed. The poster is already showing, so the deferred clip
  // just fades in a beat later.
  useEffect(() => {
    if (!priority) return;
    if (document.readyState === "complete") {
      setPosterReady(true);
      return;
    }
    const done = () => setPosterReady(true);
    window.addEventListener("load", done, { once: true });
    const t = window.setTimeout(done, 5000);
    return () => {
      window.removeEventListener("load", done);
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
  //
  // Those extra cuts are emitted ONLY under `posterVariants`, because <picture>
  // has no fallback-on-error: the browser commits to the first <source> whose
  // media+type match and, if that URL 404s, renders nothing at all — it does not
  // try the next one. Emitting the full set by convention therefore broke every
  // poster that only had its `.webp` (which was most of them): every AVIF-capable
  // browser picked the missing `.avif` and painted an empty box. Default off so
  // the failure mode of forgetting the flag is a heavier image, not a blank one.
  const base = poster.replace(/\.webp$/, "");

  // When may the poster's bytes be fetched? The hero (priority) poster is the
  // LCP element and loads immediately. Every other poster waits for the same
  // proximity/`active` gate as the video (`load`): otherwise a horizontal reel's
  // slides all share one vertical position, so their `loading="lazy"` posters
  // are all "near" at once and download together at first paint — a ~300KB
  // flood that starves the hero's LCP poster of bandwidth. Holding them until
  // the reel nears the viewport (and, per slide, until it's in the active
  // window) keeps that bandwidth for the LCP and still loads each poster before
  // it can be seen.
  const showPoster = priority || load;

  return (
    <>
      <picture>
        {showPoster && posterVariants && (
          <>
            <source media={POSTER_MOBILE_QUERY} type="image/avif" srcSet={`${base}-mobile.avif`} />
            <source media={POSTER_MOBILE_QUERY} type="image/webp" srcSet={`${base}-mobile.webp`} />
            <source media={POSTER_MOBILE_QUERY} srcSet={`${base}-mobile.jpg`} />
            <source type="image/avif" srcSet={`${base}.avif`} />
            <source type="image/webp" srcSet={`${base}.webp`} />
          </>
        )}
        <img
          ref={posterRef}
          className={className}
          // The `.webp` poster itself — the one file guaranteed to exist. In
          // variant mode the <source> list above wins for browsers that can use
          // it; here it is only the last resort. (It used to be a derived
          // `.jpg`, which 404'd for posters that had no jpg cut.) Until the gate
          // opens for non-priority posters, `src` is omitted so nothing loads.
          src={showPoster ? (posterVariants ? `${base}.jpg` : poster) : undefined}
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
        // Hero mode: a full-bleed background <video> is unavoidably the LCP
        // element (it's the largest paint the user sees). Without a `poster` its
        // LCP paint is the first decoded video frame — which only arrives after
        // the JS-injected, preload="none" clip downloads, so Lighthouse's LCP
        // simulation projects it many seconds out and marks the resource
        // "not discoverable". Giving it the poster (already in the initial HTML,
        // loaded eagerly regardless of preload) makes the poster image the
        // video's contentful paint: discoverable, fast, and identical to the
        // <picture> still beneath it. Ambient videos keep no poster attr so their
        // posters are never eagerly fetched below the fold.
        poster={priority ? poster : undefined}
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
