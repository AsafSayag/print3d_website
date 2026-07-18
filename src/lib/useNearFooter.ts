"use client";

import { useEffect, useState } from "react";

/**
 * True once the page's <footer> is about to enter the viewport. Used to
 * shrink the floating WhatsApp / accessibility buttons further as the user
 * nears the end of the page, so they stop crowding the footer content.
 *
 * A positive bottom rootMargin expands the observed root downward, so the
 * observer fires a little before the footer is actually on screen rather
 * than exactly when it crosses the edge.
 */
export function useNearFooter(rootMargin = "0px 0px 160px 0px") {
  const [near, setNear] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => setNear(entry.isIntersecting),
      { rootMargin },
    );
    io.observe(footer);
    return () => io.disconnect();
  }, [rootMargin]);

  return near;
}

/**
 * True once the page is scrolled to within `offset` px of the very bottom —
 * i.e. the footer's legal bar is in view. Used to lift the floating WhatsApp
 * button on mobile so it never sits on top of the copyright / legal links.
 */
export function useAtPageBottom(offset = 140) {
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    // A boolean that only flips near the page end — React bails out when the
    // value is unchanged, so checking directly on each scroll is cheap and
    // avoids depending on requestAnimationFrame (which pauses in background
    // tabs and would otherwise leave the flag stale).
    const check = () => {
      const doc = document.documentElement;
      setAtBottom(
        window.innerHeight + window.scrollY >= doc.scrollHeight - offset,
      );
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [offset]);

  return atBottom;
}
