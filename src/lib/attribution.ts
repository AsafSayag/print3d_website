/**
 * Ad-click attribution — which ad / campaign / keyword brought a lead.
 *
 * When a visitor lands from a Google Ads click the URL carries a click id
 * (`gclid`, or `gbraid`/`wbraid` on iOS) and, if the campaign is tagged, UTM
 * parameters. `captureAttribution` stores them on landing; `readAttribution`
 * hands them to the lead form on submit, so every lead in the sheet/email
 * records where it came from. The gclid is what Google Ads needs to import a
 * lead back as an offline conversion once it actually closes.
 *
 * Last-touch: a new tagged landing replaces the stored set. Kept for 90 days —
 * the window in which Google Ads accepts a gclid for conversion import.
 *
 * Isomorphic on purpose (no "use client"): the key list and sanitizer are also
 * used by the API route to validate what arrives.
 */

export const ATTRIBUTION_KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];
export type Attribution = Partial<Record<AttributionKey, string>>;

const STORAGE_KEY = "p3d_attribution";
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;
const MAX_VALUE_LENGTH = 200;
/** Click ids and UTM values are URL tokens — letters (any script, so Hebrew
 *  campaign names pass), digits and a few separators. Anything else is dropped. */
const VALUE_RE = /^[\p{L}\p{N} _.\-:|+~/]+$/u;

/** Keeps only known keys with short, token-shaped string values. */
export function sanitizeAttribution(raw: unknown): Attribution {
  const out: Attribution = {};
  if (!raw || typeof raw !== "object") return out;
  for (const key of ATTRIBUTION_KEYS) {
    const value = (raw as Record<string, unknown>)[key];
    if (typeof value !== "string") continue;
    const v = value.trim().slice(0, MAX_VALUE_LENGTH);
    if (v && VALUE_RE.test(v)) out[key] = v;
  }
  return out;
}

/** Stores the current URL's attribution params, if it has any. Browser only. */
export function captureAttribution(): void {
  try {
    const params = new URLSearchParams(window.location.search);
    const found = sanitizeAttribution(
      Object.fromEntries(ATTRIBUTION_KEYS.map((k) => [k, params.get(k)])),
    );
    if (Object.keys(found).length === 0) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ at: Date.now(), data: found }));
  } catch {
    // Storage blocked (private mode, disabled site data) — attribution is a
    // nice-to-have, never a reason to break the page.
  }
}

/** The stored attribution, or `{}` if none / expired. Browser only. */
export function readAttribution(): Attribution {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const { at, data } = JSON.parse(raw) as { at?: number; data?: unknown };
    if (typeof at !== "number" || Date.now() - at > MAX_AGE_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return {};
    }
    return sanitizeAttribution(data);
  } catch {
    return {};
  }
}
