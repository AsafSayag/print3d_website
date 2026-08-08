import Script from "next/script";

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
 * The markup is otherwise the same pair of `afterInteractive` scripts the
 * third-party component emits, so loading behaviour and performance are
 * unchanged. `'unsafe-inline'` is already present in the site's script-src, so
 * the inline snippet needs no CSP change.
 *
 * A Server Component: `next/script` needs no client boundary here.
 */
export function GoogleAnalytics({ gaId }: { gaId: string }) {
  return (
    <>
      <Script
        id="ga-init"
        strategy="afterInteractive"
        // Creates the queue and configures the tag in one synchronous block, so
        // "dataLayer exists" implies "config is already queued" — the ordering
        // guarantee trackEvent's queue relies on.
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(gaId)}, { send_page_view: false });`,
        }}
      />
      <Script
        id="ga-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`}
      />
    </>
  );
}
