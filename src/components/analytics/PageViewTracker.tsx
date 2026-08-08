"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analyticsClient";

/**
 * Reports every `page_view` on the site, mounted once in the root layout.
 *
 * This is the *only* source of page_view. The GA bootstrap deliberately
 * configures the tag with `send_page_view: false`, so gtag contributes none of
 * its own — not on first load, and not on history changes. One code path means
 * one hit per view, and it cannot drift with a remote GA4 setting.
 *
 * Both halves are covered here: the first commit reports the landing view, and
 * each later pathname change reports a soft navigation. A repeated pathname is
 * ignored, so re-clicking the current route sends nothing.
 *
 * `usePathname` rather than `useSearchParams` is a load-bearing choice:
 * `useSearchParams` opts a route out of static rendering unless it sits behind
 * its own Suspense boundary, and reading it from the root layout would drag all
 * 168 prerendered pages with it. The site has no query-driven routes, so the
 * pathname alone identifies a view. It also excludes the hash, which is what we
 * want — the in-page `#contact` CTAs scroll, they do not navigate.
 *
 * Renders nothing.
 */
export function PageViewTracker() {
  const pathname = usePathname();
  // Last reported path. Also what makes React 19's development remount of
  // effects harmless: the second run sees the same value and sends nothing.
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (lastPathRef.current === pathname) return;
    lastPathRef.current = pathname;
    trackEvent("page_view", {});
  }, [pathname]);

  return null;
}
