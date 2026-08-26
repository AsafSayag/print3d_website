import Script from "next/script";
import { PreferredSourceInit } from "./PreferredSourceInit";

/** `dark` to match the navy footer; `he` because the site is Hebrew and the
 *  default is the *browser* UI language, which for Israeli users is frequently
 *  English. Shared by the container's attributes and the `init` call so the
 *  two can't drift. */
const THEME = "dark";
const LANG = "he";

/**
 * Google "preferred sources" button.
 *
 * Lets a reader mark print3d.co.il as a preferred source in Google Search.
 * Once they do, our pages surface more prominently for them in Top Stories and
 * can be highlighted in AI Mode / AI Overviews. The effect is per-reader — it
 * is not a ranking signal — so this is a small opt-in affordance, not an SEO
 * lever. See https://developers.google.com/search/docs/appearance/preferred-sources
 *
 * Three moving parts:
 *   1. publisher.js, loaded with `preferred-sources-control="manual"`.
 *   2. The container, marked by the valueless
 *      `google-add-preferred-source-btn` attribute (typed in
 *      src/types/google-preferred-source.d.ts).
 *   3. PreferredSourceInit, which fills the container and refills it after
 *      client-side navigation — see there for why that's necessary.
 *
 * `lazyOnload` rather than the `afterInteractive` used for GA: this is a
 * footer widget nobody is waiting on, so it loads during idle time and stays
 * off the critical path.
 *
 * Note the script's origin (news.google.com) is allowlisted in the CSP in
 * next.config.ts — script-src, frame-src and connect-src. Without that the
 * whole thing is silently blocked.
 *
 * Google renders nothing here unless the current domain is a recognised
 * source, so on localhost and preview deploys the reserved box stays empty.
 */
export function PreferredSource() {
  return (
    <div className="w-56 max-w-full shrink-0">
      {/* On init the script stamps `width:100%; min-height:60px` onto the
          container, so it is sized from the outside here — hence the explicit
          width on the wrapper above: as a flex item next to the legal links it
          would otherwise shrink to its content, and its content is a child
          asking for 100% of it, which resolves to zero. The 60px is reserved up
          front so filling the iframe doesn't shift the signature row below
          it (CLS). */}
      <div
        google-add-preferred-source-btn=""
        data-theme={THEME}
        data-lang={LANG}
        className="min-h-[60px] w-full"
      />
      <Script
        id="google-preferred-source"
        strategy="lazyOnload"
        preferred-sources-control="manual"
        src="https://news.google.com/swg/js/v1/publisher.js"
      />
      <PreferredSourceInit theme={THEME} lang={LANG} />
    </div>
  );
}
