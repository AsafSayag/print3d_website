/**
 * Analytics event catalog — the single source of truth for everything this site
 * reports to Google Analytics 4.
 *
 * ## Architecture
 *
 * There is deliberately no per-event tracking code scattered around the app.
 * Everything funnels through two mechanisms:
 *
 *  1. **Declarative click tracking.** A server component that renders a link or
 *     button spreads {@link analyticsAttrs} onto it, which emits inert
 *     `data-analytics-*` attributes. A single delegated listener mounted once in
 *     the root layout (`AnalyticsClickTracker`) reads them on click and fires
 *     the event. This is the reason instrumenting a CTA never forces a page or
 *     section to become a Client Component, and why adding measurement cannot
 *     introduce a hydration mismatch — the attributes are static strings that
 *     render identically on the server and the client.
 *
 *  2. **Imperative tracking** via `trackEvent` (see `analyticsClient.ts`), used
 *     only where a click is not the trigger — a view on mount, or a form
 *     submission resolving successfully.
 *
 * This module is isomorphic on purpose: it must stay importable from Server
 * Components, so it may never import anything marked `"use client"`. The gtag
 * transport lives in `analyticsClient.ts` for exactly that reason.
 *
 * ## page_view
 *
 * Sent entirely from here, by `PageViewTracker` — both the landing view and
 * every soft navigation.
 *
 * That required taking the snippet over: `<GoogleAnalytics>` from
 * `@next/third-parties` hardcodes `gtag('config', id)`, which always sends its
 * own `page_view` and offers no way to suppress it. Our `GoogleAnalytics`
 * component passes `send_page_view: false` instead, so gtag contributes nothing
 * and there is exactly one producer of the event.
 *
 * The discarded alternative was to let gtag do it: `config` covers the first
 * load, and GA4 Enhanced Measurement's "page changes based on browser history
 * events" covers soft navigations. That does work — but it puts half the
 * measurement in a remote setting that can be toggled off without anyone
 * touching this repository, and it cannot be tested here.
 *
 * ## Privacy
 *
 * No personally identifying information ever reaches GA4. The parameter types
 * below only admit values that come from static site content — project names,
 * article titles, CTA identifiers, surface names. Nothing a visitor types is
 * accepted anywhere: the form events carry the form's identity, never its
 * contents. {@link sanitizeParams} is a belt-and-braces backstop that drops any
 * value that still looks like an email address or a phone number.
 */

/**
 * Every event the site sends, mapped to the parameters it carries.
 *
 * `location` is always a stable snake_case English identifier for the *surface*
 * the interaction happened on (`"header"`, `"footer"`, `"hero"`), never the
 * page URL — GA4 already records the URL on every hit.
 */
export type AnalyticsParams = {
  /**
   * A route was viewed. Carries no parameters: gtag fills `page_location`,
   * `page_title` and `page_referrer` from the document at send time, which is
   * both more accurate than anything we could pass and immune to the 100-char
   * truncation in {@link sanitizeParams}.
   */
  page_view: Record<string, never>;
  /** A project case-study page was viewed. */
  project_view: {
    project_name: string;
    project_category?: string;
    project_slug?: string;
  };
  /** A knowledge-centre article was viewed. */
  article_view: {
    article_name: string;
    article_category?: string;
    article_slug?: string;
  };
  /** A WhatsApp link was clicked. */
  whatsapp_click: { location: string };
  /** A `tel:` link was clicked. */
  phone_click: {
    location: string;
    /** Which of the two published lines — the office or the mobile/WhatsApp one. */
    phone_type?: "office" | "mobile";
  };
  /** A call-to-action link or button was clicked. */
  cta_click: {
    /** Stable identifier for the CTA's intent, e.g. `"quote_request"`. */
    cta_name: string;
    location: string;
  };
  /** The visitor typed into a form for the first time in this page view. */
  form_start: { form_name: string; location: string };
  /** A form was submitted and the submission succeeded. */
  form_submit: { form_name: string; location: string };
};

export type AnalyticsEventName = keyof AnalyticsParams;

/** GA4 truncates event parameter values beyond 100 characters. */
const MAX_PARAM_LENGTH = 100;

/** Values shaped like contact details never belong in analytics — see the
 *  privacy note above. These only ever fire if a future call site passes
 *  something it shouldn't. */
const EMAIL_LIKE = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const PHONE_LIKE = /\d[\d\s()+-]{6,}/;

/**
 * Normalises a parameter bag before it is sent: drops empty values, trims and
 * truncates the rest, and refuses anything resembling personal contact details.
 */
export function sanitizeParams(
  params: Record<string, unknown>
): Record<string, string> {
  const clean: Record<string, string> = {};
  for (const [key, raw] of Object.entries(params)) {
    if (raw === undefined || raw === null) continue;
    const value = String(raw).trim();
    if (!value) continue;
    if (EMAIL_LIKE.test(value) || PHONE_LIKE.test(value)) continue;
    clean[key] = value.slice(0, MAX_PARAM_LENGTH);
  }
  return clean;
}

/** The attribute pair `AnalyticsClickTracker` looks for on a clicked element. */
export type AnalyticsAttrs = {
  "data-analytics-event": AnalyticsEventName;
  "data-analytics-params"?: string;
};

/**
 * Builds the inert attributes that mark an element as tracked. Spread the result
 * onto any anchor or button — including ones rendered by Server Components,
 * which is the whole point:
 *
 * ```tsx
 * <GlassButton href="/contact" {...analyticsAttrs("cta_click", {
 *   cta_name: "quote_request",
 *   location: "footer",
 * })}>
 * ```
 *
 * The click is picked up by the delegated listener in the root layout, so the
 * component rendering the button needs no `onClick`, no `"use client"`, and
 * ships no extra JavaScript.
 */
export function analyticsAttrs<E extends AnalyticsEventName>(
  event: E,
  params: AnalyticsParams[E]
): AnalyticsAttrs {
  const clean = sanitizeParams(params as Record<string, unknown>);
  const attrs: AnalyticsAttrs = { "data-analytics-event": event };
  if (Object.keys(clean).length > 0) {
    attrs["data-analytics-params"] = JSON.stringify(clean);
  }
  return attrs;
}
