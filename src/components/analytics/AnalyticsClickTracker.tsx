"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analyticsClient";
import type { AnalyticsEventName, AnalyticsParams } from "@/lib/analytics";

/**
 * The site's entire click-tracking layer, mounted once in the root layout.
 *
 * A single delegated listener on `document` catches every click on an element
 * carrying `data-analytics-event` (see `analyticsAttrs`) and forwards it to
 * GA4. Delegation is what keeps the rest of the site untouched: a Server
 * Component instruments a CTA by adding two static attributes, so no page or
 * section has to become a Client Component, nothing extra is hydrated, and the
 * cost of measurement across the whole site is this one listener.
 *
 * Renders nothing and never touches the DOM, so it cannot affect layout,
 * styling or behaviour.
 */
export function AnalyticsClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;

      const el = target.closest<HTMLElement>("[data-analytics-event]");
      if (!el) return;

      const event = el.dataset.analyticsEvent as AnalyticsEventName | undefined;
      if (!event) return;

      let params: AnalyticsParams[AnalyticsEventName] = {} as never;
      const raw = el.dataset.analyticsParams;
      if (raw) {
        try {
          params = JSON.parse(raw);
        } catch {
          // A malformed payload should cost us the parameters, not the event.
          return;
        }
      }

      trackEvent(event, params);
    };

    // Capture phase: some interactive elements stop propagation on click, and a
    // hit should never depend on the bubble path staying clear. Passive because
    // this only reads — navigation is left entirely alone (gtag beacons the hit
    // via `navigator.sendBeacon`, which survives the page unloading).
    document.addEventListener("click", onClick, { capture: true, passive: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
