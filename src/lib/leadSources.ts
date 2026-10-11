import type { Attribution } from "@/lib/attribution";

/**
 * Where a lead came from — sent with every submission and recorded in both
 * lead channels (notification email + Google Sheet "מקור" column).
 *
 * A closed list on purpose: the API maps the id to its label and falls back to
 * "website" for anything unknown, so a visitor can't inject arbitrary text into
 * the sheet. Add an entry here for every new landing page / campaign surface.
 */
export const LEAD_SOURCES = {
  website: "אתר",
  lp_sales_model: "דף נחיתה – פרסום ממומן",
} as const;

export type LeadSource = keyof typeof LEAD_SOURCES;

export function leadSourceLabel(source: unknown): string {
  return typeof source === "string" && Object.hasOwn(LEAD_SOURCES, source)
    ? LEAD_SOURCES[source as LeadSource]
    : LEAD_SOURCES.website;
}

/** Surfaces reached only from ads — every lead from them is paid traffic. */
const PAID_SOURCES: ReadonlySet<string> = new Set<LeadSource>(["lp_sales_model"]);

/** utm_medium values that mark a paid click (Google Ads, Meta, display…). */
const PAID_MEDIUM_RE = /^(cpc|ppc|cpm|cpv|paid|paid[_-]?social|paidsocial|display|ads?)$/i;

/**
 * "ממומן" (paid) or "אורגני" (organic) — the sheet's "מקור" column. Paid when
 * the lead came through a paid-only landing page, carries a Google Ads click
 * id, or was tagged with a paid utm_medium; organic otherwise.
 */
export function trafficType(source: unknown, attribution: Attribution): "ממומן" | "אורגני" {
  const paid =
    (typeof source === "string" && PAID_SOURCES.has(source)) ||
    Boolean(attribution.gclid || attribution.gbraid || attribution.wbraid) ||
    PAID_MEDIUM_RE.test(attribution.utm_medium ?? "");
  return paid ? "ממומן" : "אורגני";
}
