"use client";

import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Whether the user asked for reduced motion. A tiny drop-in replacement for
 * framer-motion's hook of the same name — behaviourally identical (same media
 * query, live updates on change) — so the above-the-fold components (Hero,
 * Header) that only needed this one hook no longer pull the whole framer-motion
 * bundle into the initial JS. framer stays only where real animation runs
 * (the FAQ accordion, loaded on demand).
 *
 * Returns false during SSR / first paint (motion allowed), then reflects the
 * real preference after mount — matching framer's default.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
