"use client";

import {
  sanitizeParams,
  type AnalyticsEventName,
  type AnalyticsParams,
} from "./analytics";

/**
 * The browser-side half of the analytics system: the one place that hands an
 * event to Google Tag Manager.
 *
 * Split out of `analytics.ts` because it touches `window`, and the
 * catalog/attribution helpers there must stay importable from Server
 * Components. Everything that decides *what* to send lives there; this file
 * only decides *how*.
 *
 * Every event is a plain `dataLayer.push({ event, ...params })`. GTM decides
 * what happens with it (GA4 event, Google Ads conversion, …) — see
 * TRACKING.md for the data layer contract the container is built on. The
 * `dataLayer` array is created by the consent bootstrap at the top of <body>
 * (components/analytics/consent.ts), long before any of our code runs, and
 * gtm.js replays everything already in it when it loads — so there is no
 * "is GTM ready yet?" queue to manage here.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/**
 * Pushes one event to the data layer. Does nothing during SSR.
 *
 * GTM's data model is persistent: a key pushed once stays set for every later
 * event unless overwritten. So each event is preceded by a reset — otherwise a
 * `cta_click`'s `cta_name` would still be attached to the next
 * `whatsapp_click`, and an optional parameter missing from one push would
 * silently inherit the previous event's value.
 */
export function trackEvent<E extends AnalyticsEventName>(
  event: E,
  params: AnalyticsParams[E]
): void {
  if (typeof window === "undefined") return;
  const dl = (window.dataLayer = window.dataLayer || []);
  dl.push(function (this: { reset: () => void }) {
    this.reset();
  });
  dl.push({ event, ...sanitizeParams(params as Record<string, unknown>) });
}
