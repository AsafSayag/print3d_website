/**
 * Budget brackets asked on the paid landing page before any contact details.
 * The list starts at the minimum project size on purpose: there is no lower
 * bracket to pick, which tells a visitor with a smaller budget that the page
 * isn't for them.
 *
 * A closed list (like lib/leadSources.ts): the form sends only the id, and the
 * API maps it to its label, so a visitor can't inject free text into the
 * notification email or the leads sheet through this field.
 */
export const LEAD_BUDGETS = {
  "20k_50k": "20,000 עד 50,000 ₪",
  "50k_100k": "50,000 עד 100,000 ₪",
  over_100k: "מעל 100,000 ₪",
} as const;

export type LeadBudget = keyof typeof LEAD_BUDGETS;

/** The bracket's label, or null for a missing / unknown id. */
export function leadBudgetLabel(budget: unknown): string | null {
  return typeof budget === "string" && Object.hasOwn(LEAD_BUDGETS, budget)
    ? LEAD_BUDGETS[budget as LeadBudget]
    : null;
}
