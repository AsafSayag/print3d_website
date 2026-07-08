"use client";

import { useEffect, useRef, useState } from "react";

type Source = { src: string; type: string };

type Props = {
  sources: Source[];
  poster: string;
  className?: string;
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
export function DeferredVideo({ sources, poster, className }: Props) {
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
    el.play().catch(() => {});
  }, [load]);

  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-hidden="true"
    >
      {load &&
        sources.map((s) => <source key={s.src} src={s.src} type={s.type} />)}
    </video>
  );
}
