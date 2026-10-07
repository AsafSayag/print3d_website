import Script from "next/script";

/** Longest we hold gtm.js back after the loader runs (see below). */
const GTM_MAX_DEFER_MS = 3000;

/**
 * Loads the Google Tag Manager container. GA4 and Google Ads are configured
 * inside GTM (tags, triggers, conversions) — the site itself only pushes
 * events to `dataLayer` (lib/analyticsClient.ts) under the contract in
 * TRACKING.md.
 *
 * `dataLayer`, `gtag` and the Consent Mode defaults already exist by the time
 * this runs: the consent bootstrap (components/analytics/consent.ts) is an
 * inline script at the top of <body>. This loader only records `gtm.start` and
 * fetches gtm.js — once the window `load` event fires, or GTM_MAX_DEFER_MS
 * after the loader runs, whichever comes first, so the container (which pulls
 * in the GA4 / Ads libraries) never competes with the hero image for
 * bandwidth. Everything pushed before then is replayed when GTM arrives; the
 * trade-off is a visitor who leaves within those first seconds, whose hits are
 * never sent.
 *
 * A Server Component: `next/script` needs no client boundary here.
 */
export function GoogleTagManager({ gtmId }: { gtmId: string }) {
  const src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
  return (
    <Script
      id="gtm-loader"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(){window.dataLayer=window.dataLayer||[];
dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var done=0;function load(){if(done)return;done=1;var s=document.createElement('script');s.async=true;s.src=${JSON.stringify(src)};document.head.appendChild(s);}
if(document.readyState==='complete'){load();}else{window.addEventListener('load',load,{once:true});setTimeout(load,${GTM_MAX_DEFER_MS});}})();`,
      }}
    />
  );
}

/** GTM's no-JavaScript fallback; place it at the top of <body>. */
export function GoogleTagManagerNoScript({ gtmId }: { gtmId: string }) {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(gtmId)}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
