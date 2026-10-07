/**
 * Google Consent Mode v2 for the cookie banner.
 *
 * Policy (one place to change it — CONSENT_DEFAULTS below):
 *  - Visitors from the EEA, the UK and Switzerland start with every
 *    non-essential storage DENIED until they accept in the banner (GDPR-style
 *    prior consent).
 *  - Everyone else (in practice: Israel) starts GRANTED — notice + opt-out —
 *    and can decline in the banner, which switches everything to denied.
 * The direct GA4 tag reads these signals; with consent denied it sends
 * cookieless pings only.
 *
 * Isomorphic on purpose (no "use client"): the inline bootstrap string is
 * rendered by the root layout on the server, and the helpers are used by the
 * client-side banner.
 */

/** localStorage key holding the visitor's choice: "granted" | "denied". */
export const CONSENT_STORAGE_KEY = "p3d_consent";

export type ConsentChoice = "granted" | "denied";

/** EU/EEA member states + IS, LI, NO, plus GB and CH (ISO 3166-1 alpha-2). */
const PRIOR_CONSENT_REGIONS = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU",
  "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES",
  "SE", "IS", "LI", "NO", "GB", "CH",
];

const consentState = (v: ConsentChoice) => ({
  ad_storage: v,
  ad_user_data: v,
  ad_personalization: v,
  analytics_storage: v,
});

/**
 * Inline bootstrap, rendered as a plain <script> at the top of <body> (or in
 * the campaign page's head before GTM) so it runs before either tag: creates `dataLayer` +
 * `gtag`, declares the consent defaults (the region-specific one first, as
 * Google requires), and immediately re-applies a choice the visitor made on an
 * earlier visit. Consent "default" must precede every tag and every "update",
 * which is why this is not left to the (later-hydrating) banner. The bootstrap
 * is idempotent because the campaign page renders it in both places.
 */
export const CONSENT_BOOTSTRAP = `(function(){
if(window.__p3dConsentInitialized)return;
window.__p3dConsentInitialized=true;
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
window.gtag=window.gtag||gtag;
gtag('consent','default',Object.assign(${JSON.stringify(consentState("denied"))},{wait_for_update:500,region:${JSON.stringify(PRIOR_CONSENT_REGIONS)}}));
gtag('consent','default',${JSON.stringify(consentState("granted"))});
gtag('set','ads_data_redaction',true);
try{var c=localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)});
if(c==='granted'||c==='denied'){gtag('consent','update',{ad_storage:c,ad_user_data:c,ad_personalization:c,analytics_storage:c});}}catch(e){}
})();`;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** The stored choice, or null if the visitor hasn't chosen yet. Browser only. */
export function readConsent(): ConsentChoice | null {
  try {
    const v = localStorage.getItem(CONSENT_STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/**
 * Records the visitor's choice and updates Consent Mode. If storage is blocked the choice
 * still applies for this page view; the banner simply returns next time.
 */
export function setConsent(choice: ConsentChoice): void {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    /* storage blocked — apply for this page only */
  }
  window.gtag?.("consent", "update", consentState(choice));
}
