"use client";

import { useEffect } from "react";

/**
 * Makes same-page hash links (e.g. the "קבלו הצעת מחיר" CTAs pointing to
 * "#contact") scroll to their target on EVERY click — not just the first.
 *
 * A native `<a href="#contact">` only scrolls when the URL hash actually
 * changes; clicking it again while the hash is already "#contact" does nothing.
 * This delegated handler intercepts such clicks and scrolls to the target by
 * writing the scroll container's scrollTop directly (which the browser animates
 * via the page's CSS `scroll-behavior: smooth`), honouring the fixed-header
 * offset (html's scroll-padding-top). Writing scrollTop is far more reliable
 * across engines than scrollIntoView({behavior:"smooth"}).
 */
export function InPageAnchorScroll() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Respect modifier clicks / non-primary buttons (new tab, etc.).
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const target = e.target instanceof Element ? e.target : null;
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      const id = decodeURIComponent(href.slice(1));
      if (!id) return;

      const el = document.getElementById(id);
      if (!el) return; // not an on-page target — let the browser handle it

      e.preventDefault();
      const root = (document.scrollingElement ||
        document.documentElement) as HTMLElement;
      const pad =
        parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) ||
        0;
      const top = Math.max(0, el.getBoundingClientRect().top + root.scrollTop - pad);
      root.scrollTop = top;
      history.replaceState(null, "", href);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
