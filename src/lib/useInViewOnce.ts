"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveal-once when an element scrolls into view.
 *
 * Every consumer shares a SINGLE IntersectionObserver instead of each running
 * its own requestAnimationFrame polling loop. Previously ~20 reveal elements on
 * a page each spun a rAF loop doing `getBoundingClientRect()` every few frames —
 * dozens of concurrent forced-layout reads that competed with scroll-driven
 * animation (the ScrollSequence scrub) for the main thread. One observer, native
 * and batched, removes that per-element cost entirely.
 *
 * Safety net (why the old code avoided IntersectionObserver): if the observer
 * hasn't fired within 1s, the element's position is checked directly; if still
 * off-screen it is handed to ONE shared passive scroll listener. So content is
 * never left stuck hidden, without reintroducing per-element rAF loops.
 *
 * Returns a ref to attach and a boolean that flips true once in view.
 */

type Pending = { el: Element; reveal: () => void; threshold: number };

let sharedIO: IntersectionObserver | null = null;
const ioEntries = new WeakMap<Element, Pending>();

const scrollPending = new Set<Pending>();
let scrollBound = false;

function isInView(p: Pending): boolean {
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const rect = p.el.getBoundingClientRect();
  return rect.top < vh * p.threshold && rect.bottom > 0;
}

function checkScrollPending() {
  for (const p of Array.from(scrollPending)) {
    if (isInView(p)) {
      scrollPending.delete(p);
      p.reveal();
    }
  }
  if (scrollPending.size === 0) unbindScroll();
}

function bindScroll() {
  if (scrollBound) return;
  scrollBound = true;
  window.addEventListener("scroll", checkScrollPending, { passive: true });
  window.addEventListener("resize", checkScrollPending, { passive: true });
}

function unbindScroll() {
  if (!scrollBound) return;
  scrollBound = false;
  window.removeEventListener("scroll", checkScrollPending);
  window.removeEventListener("resize", checkScrollPending);
}

function addScrollFallback(p: Pending) {
  if (isInView(p)) {
    p.reveal();
    return;
  }
  scrollPending.add(p);
  bindScroll();
}

function getIO(): IntersectionObserver | null {
  if (typeof IntersectionObserver === "undefined") return null;
  if (!sharedIO) {
    sharedIO = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const p = ioEntries.get(e.target);
          if (p) {
            ioEntries.delete(e.target);
            sharedIO!.unobserve(e.target);
            p.reveal();
          }
        }
      },
      // Fire as the element enters view — mirrors the old `top < vh * 0.88`
      // trigger (reveal once the element is ~12% up from the bottom edge).
      { rootMargin: "0px 0px -12% 0px" },
    );
  }
  return sharedIO;
}

export function useInViewOnce<T extends HTMLElement>(threshold = 0.88) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setInView(true);
    };
    const p: Pending = { el, reveal, threshold };

    const io = getIO();
    let fallback = 0;
    if (io) {
      ioEntries.set(el, p);
      io.observe(el);
      // If the observer hasn't fired within 1s, verify position directly and,
      // if still off-screen, hand off to the shared scroll listener.
      fallback = window.setTimeout(() => {
        if (done) return;
        if (ioEntries.has(el)) {
          ioEntries.delete(el);
          io.unobserve(el);
        }
        addScrollFallback(p);
      }, 1000);
    } else {
      // No IntersectionObserver support → reveal via the shared scroll listener.
      addScrollFallback(p);
    }

    return () => {
      done = true;
      window.clearTimeout(fallback);
      if (ioEntries.has(el)) {
        ioEntries.delete(el);
        sharedIO?.unobserve(el);
      }
      if (scrollPending.delete(p) && scrollPending.size === 0) unbindScroll();
    };
  }, [inView, threshold]);

  return [ref, inView] as const;
}
