"use client";

import {
  sanitizeParams,
  type AnalyticsEventName,
  type AnalyticsParams,
} from "./analytics";

/**
 * The browser-side half of the analytics system: sends events directly to GA4.
 *
 * Split out of `analytics.ts` because it touches `window`, and the
 * catalog/attribution helpers there must stay importable from Server
 * Components. Everything that decides *what* to send lives there; this file
 * only decides *how*.
 *
 * The GA4 bootstrap runs before hydration and queues events until gtag.js loads.
 */

/** Sends one event to GA4. Does nothing during SSR or without GA4. */
export function trackEvent<E extends AnalyticsEventName>(
  event: E,
  params: AnalyticsParams[E]
): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, sanitizeParams(params as Record<string, unknown>));
}
