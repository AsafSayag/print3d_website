import Script from "next/script";

/** Longest we hold gtag.js back after the init snippet runs (see below). */
const GTAG_MAX_DEFER_MS = 3000;

/**
 * Loads gtag.js and configures the GA4 tag.
 *
 * This replaces `<GoogleAnalytics>` from `@next/third-parties/google` for one
 * reason: that component hardcodes `gtag('config', id)`, which always sends a
 * `page_view` on load and exposes no way to turn it off. Owning the snippet
 * lets us pass `send_page_view: false`, so that *every* page_view — the first
 * load included — is reported by `PageViewTracker` instead. One code path, one
 * hit per view, and no dependence on how a remote GA4 setting happens to be
 * configured.
 *
 * The init snippet runs `afterInteractive` and defines `gtag` + `dataLayer`
 * synchronously, so every event from then on is queued in `dataLayer` (and
 * `trackEvent` sees `gtag` and sends straight into that queue). The gtag.js
 * library itself (~175KB) is then fetched only once the window `load` event
 * fires, or GTAG_MAX_DEFER_MS after init, whichever comes first — on a slow
 * phone it used to download in the middle of the hero image, competing with
 * it for bandwidth. Nothing is lost: gtag.js replays the queued `dataLayer`
 * when it arrives. The trade-off is a visitor who leaves within those first
 * seconds, whose hits never get sent. `'unsafe-inline'` is already in the
 * site's script-src, so the inline snippet needs no CSP change.
 *
 * `adsId` (optional, `AW-…`) adds a second `config` on the same gtag.js for
 * Google Ads: it sets the conversion-linker cookie from the landing gclid and
 * lets `trackAdsConversion` report lead submissions as Ads conversions.
 *
 * A Server Component: `next/script` needs no client boundary here.
 */
export function GoogleAnalytics({ gaId, adsId }: { gaId: string; adsId?: string }) {
  const src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
  return (
    <Script
      id="ga-init"
      strategy="afterInteractive"
      // Creates the queue and configures the tag in one synchronous block, so
      // "gtag exists" implies "config is already queued" — the ordering
      // guarantee trackEvent's queue relies on.
      dangerouslySetInnerHTML={{
        __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(gaId)}, { send_page_view: false });${
          adsId ? `\ngtag('config', ${JSON.stringify(adsId)});` : ""
        }
(function(){var done=0;function load(){if(done)return;done=1;var s=document.createElement('script');s.async=true;s.src=${JSON.stringify(src)};document.head.appendChild(s);}
if(document.readyState==='complete'){load();}else{window.addEventListener('load',load,{once:true});setTimeout(load,${GTAG_MAX_DEFER_MS});}})();`,
      }}
    />
  );
}
