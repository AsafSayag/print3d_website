"use client";

import { useEffect, useRef, useState } from "react";
import { LeadForm } from "@/components/ui/LeadForm";
import { LEAD_BUDGETS, type LeadBudget } from "@/lib/leadBudgets";
import { LP_GATE, LP_LOCATION, LP_THANK_YOU_PATH } from "../content";

const BUDGET_IDS = Object.keys(LEAD_BUDGETS) as LeadBudget[];

/**
 * The page's screening step, and its only way to reach us: one question about
 * the budget, asked before any contact details. The brackets start at the
 * minimum project size, so a visitor below it has nothing to pick and never
 * reaches the lead form; picking one opens the form, with the bracket recorded
 * on the lead.
 *
 * Nothing else on the landing page offers a phone number or WhatsApp, so an
 * enquiry can't skip the question.
 */
export function LpQualifier() {
  const [budget, setBudget] = useState<LeadBudget | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const answered = useRef(false);

  // Each step replaces the previous one in place, so move focus to the new
  // step's heading: keyboard and screen-reader users land on what changed.
  useEffect(() => {
    if (!answered.current) return;
    headingRef.current?.focus();
  }, [budget]);

  const choose = (next: LeadBudget | null) => {
    answered.current = true;
    setBudget(next);
  };

  if (budget === null) {
    return (
      <div id="lead" className="lp-gate lp-gate--ask">
        <div>
          <h2 ref={headingRef} tabIndex={-1} className="lp-gate-title">
            {LP_GATE.question}
          </h2>
          <p className="lp-gate-hint">{LP_GATE.hint}</p>
        </div>
        <div className="lp-gate-options">
          {BUDGET_IDS.map((id) => (
            <button key={id} type="button" className="lp-gate-option" onClick={() => choose(id)}>
              {LEAD_BUDGETS[id]}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div id="lead" className="lp-gate lp-gate--form">
      <h2 ref={headingRef} tabIndex={-1} className="lp-gate-title">
        {LP_GATE.formTitle}
      </h2>
      <p className="lp-gate-hint">
        {LP_GATE.budgetLabel} {LEAD_BUDGETS[budget]}
        {" · "}
        <button type="button" className="lp-gate-back" onClick={() => choose(null)}>
          {LP_GATE.change}
        </button>
      </p>
      <div className="mt-5">
        <LeadForm
          location={LP_LOCATION}
          source="lp_sales_model"
          emailOptional
          budget={budget}
          successRedirectPath={LP_THANK_YOU_PATH}
        />
      </div>
    </div>
  );
}
