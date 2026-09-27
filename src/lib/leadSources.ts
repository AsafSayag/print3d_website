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
