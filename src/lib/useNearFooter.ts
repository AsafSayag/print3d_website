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
