"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveal-once hook based on a throttled requestAnimationFrame position check.
 *
 * Uses rAF polling (not IntersectionObserver or scroll events) because in the
 * target environment neither fired reliably. rAF always runs, so this reveals
 * content dependably in every browser. The loop self-terminates the moment the
 * element enters view, so idle cost is nil once revealed.
 *
 * Returns a ref to attach and a boolean that flips true once in view.
 */
export function useInViewOnce<T extends HTMLElement>(threshold = 0.88) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let frame = 0;

    const tick = () => {
      // Throttle the measurement to roughly every 4th frame.
      if (frame++ % 4 === 0) {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top < vh * threshold && rect.bottom > 0) {
          setInView(true);
          return; // stop polling
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [threshold]);

  return [ref, inView] as const;
}
