"use client";

import {
  sanitizeParams,
  type AnalyticsEventName,
  type AnalyticsParams,
} from "./analytics";

/**
 * The browser-side half of the analytics system: the one place that actually
 * hands an event to gtag.
 *
 * Split out of `analytics.ts` because it touches `window`, and the
 * catalog/attribute helpers there must stay importable from Server Components.
 * Everything that decides *what* to send lives there; this file only decides
 * *how*.
 */

declare global {
  interface Window {
    /** Defined by the GA bootstrap's inline snippet (see GoogleAnalytics.tsx). */
    gtag?: (...args: unknown[]) => void;
  }
}

/** How often to re-check whether GA has finished booting. */
const READY_POLL_MS = 200;
/** After this long we assume GA is simply not configured and drop the queue. */
const READY_TIMEOUT_MS = 10_000;

/**
 * Events raised before GA finished booting. This queue is the reason view
 * events survive at all: the GA snippet is injected with `next/script`'s
 * `afterInteractive` strategy, so the script that defines `gtag` runs *after*
 * React has hydrated and flushed its effects. Anything reported from an effect
 * on first paint — the initial `page_view`, plus every `project_view` and
 * `article_view` — therefore arrives before GA exists and would otherwise be
 * silently lost.
 */
let pending: Array<() => void> = [];
let draining = false;
let waitedMs = 0;

/**
 * True once the GA snippet has run.
 *
 * Testing for `gtag` rather than for `dataLayer` means we call the very
 * function Google's snippet defines, instead of re-implementing its queue
 * protocol. It also carries the ordering guarantee we need: the snippet defines
 * `gtag` and pushes `js` + `config` in one synchronous block, so by the time any
 * of our timer- or effect-driven code can observe `gtag`, `config` is already
 * queued ahead of whatever we send.
 */
function analyticsReady(): boolean {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

function drain(): void {
  if (analyticsReady()) {
    draining = false;
    waitedMs = 0;
    const queued = pending;
    pending = [];
    for (const send of queued) send();
    return;
  }

  waitedMs += READY_POLL_MS;
  if (waitedMs >= READY_TIMEOUT_MS) {
    // No measurement ID configured (the root layout then never renders
    // `<GoogleAnalytics>`), or the script was blocked. Drop the queue instead of
    // polling and holding closures for the life of the page.
    draining = false;
    waitedMs = 0;
    pending = [];
    return;
  }

  window.setTimeout(drain, READY_POLL_MS);
}

function scheduleDrain(): void {
  if (draining) return;
  draining = true;
  window.setTimeout(drain, READY_POLL_MS);
}

/**
 * Sends one event to GA4, queueing it if GA has not booted yet.
 *
 * Does nothing during SSR, and gives up quietly in any environment where
 * `NEXT_PUBLIC_GA_MEASUREMENT_ID` is unset.
 */
export function trackEvent<E extends AnalyticsEventName>(
  event: E,
  params: AnalyticsParams[E]
): void {
  if (typeof window === "undefined") return;

  const clean = sanitizeParams(params as Record<string, unknown>);
  const send = () => window.gtag?.("event", event, clean);

  if (analyticsReady()) {
    send();
    return;
  }

  pending.push(send);
  scheduleDrain();
}
