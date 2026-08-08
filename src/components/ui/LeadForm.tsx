"use client";

import { useRef, useState } from "react";
import { CONTACT_CTA } from "@/lib/content";
import { submitLead } from "@/lib/submitLead";
import { trackEvent } from "@/lib/analyticsClient";
import { ThankYouModal } from "./ThankYouModal";

type Errors = Partial<Record<"name" | "phone" | "email", string>>;

const PHONE_RE = /^0\d{1,2}-?\d{7}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: {
  name: string;
  phone: string;
  email: string;
}): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "נא להזין שם מלא";
  if (!PHONE_RE.test(values.phone.trim().replace(/\s/g, "")))
    errors.phone = "נא להזין מספר טלפון תקין";
  if (!EMAIL_RE.test(values.email.trim()))
    errors.email = "נא להזין כתובת אימייל תקינה";
  return errors;
}

/**
 * Reusable lead-capture form (name / phone / email + optional project note).
 * Dark-surface styling — place it on a navy surface or inside a dark card.
 * Shared by the homepage contact section and the dedicated contact page.
 *
 * The same component is mounted on four surfaces, so it reports a `location`
 * alongside its `form_name` — that pair is what tells the four instances apart
 * in GA4. Only the form's identity is ever sent: no field value, and nothing
 * derived from one, leaves the browser through analytics.
 */
export function LeadForm({
  formName = "lead_form",
  location,
}: {
  /** Identifies the form itself. There is currently only one across the site. */
  formName?: string;
  /** Which surface this instance sits on, e.g. `"home_contact_section"`. */
  location: string;
}) {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    project: "",
    company: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [showThankYou, setShowThankYou] = useState(false);
  // Whether a fill round is currently open. A ref, not state: it changes while
  // the visitor is mid-typing and must not trigger a re-render.
  const startedRef = useRef(false);

  /**
   * Opens a fill round and reports it as `form_start`. Bound to the <form>
   * itself: `input` events bubble, so one handler covers every field, present
   * and future. Deliberately not `focus` — tabbing past the form would then
   * count as an abandoned fill — and deliberately not inside `update()`, which
   * runs during render and so may not touch a ref.
   */
  const markStarted = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent("form_start", { form_name: formName, location });
  };

  const update =
    (key: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setStatus("sending");
    try {
      await submitLead(values);
      // Only a lead that actually reached the intake endpoint counts as a
      // submission — a failed POST leaves the visitor on the form, retrying.
      trackEvent("form_submit", { form_name: formName, location });
      // Close the round. The form stays mounted and is cleared below, so a
      // visitor sending a second lead starts a genuinely new fill and gets its
      // own `form_start`. Reset only on success: after a failed POST the
      // visitor is still inside the same round, and their corrections must not
      // be reported as a fresh start.
      startedRef.current = false;
      // Clear the form and celebrate with the thank-you popup.
      setValues({ name: "", phone: "", email: "", project: "", company: "" });
      setStatus("idle");
      setShowThankYou(true);
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
    <form
      onSubmit={onSubmit}
      onInput={markStarted}
      noValidate
      className="grid sm:grid-cols-2 gap-4 text-start"
    >
      {/* Honeypot — invisible to real visitors, irresistible to form-filling bots.
          Clipped rather than display:none so it still renders (and so still
          looks like a real field to a scraper), but stays out of the layout.

          Deliberately NOT positioned off-screen with a negative offset: on this
          RTL site `-left-[9999px]` extended the document's scroll width to
          ~11,000px on every page carrying this form, which is real horizontal
          overflow (body's `overflow-x: clip` hides it, but the metric still
          leaks into anything that measures the page). The sr-only clip pattern
          takes up no space in any direction. */}
      <input
        type="text"
        name="company"
        value={values.company}
        onChange={update("company")}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />
      <Field
        label={CONTACT_CTA.fields.name}
        value={values.name}
        onChange={update("name")}
        error={errors.name}
        autoComplete="name"
      />
      <Field
        label={CONTACT_CTA.fields.phone}
        value={values.phone}
        onChange={update("phone")}
        error={errors.phone}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        // Browsers default type="tel" inputs to LTR via their own UA
        // stylesheet even with no dir attribute at all — force RTL to match
        // how Hebrew is actually typed.
        dir="rtl"
      />
      <Field
        label={CONTACT_CTA.fields.email}
        value={values.email}
        onChange={update("email")}
        error={errors.email}
        type="email"
        inputMode="email"
        autoComplete="email"
        dir="rtl"
        className="sm:col-span-2"
      />
      <div className="sm:col-span-2">
        <label htmlFor="lead-project" className="block mb-2 text-sm font-semibold text-white/85">
          {CONTACT_CTA.fields.project}{" "}
          <span className="font-normal text-white/40">(רשות)</span>
        </label>
        <textarea
          id="lead-project"
          value={values.project}
          onChange={update("project")}
          rows={3}
          className="w-full rounded-xl bg-white/[0.06] border border-white/20 px-4 py-3.5 text-white placeholder-white/30 outline-none transition-all duration-200 focus:border-[color:var(--gold-400)] focus:bg-white/[0.09] focus:ring-2 focus:ring-[color:var(--gold-500)]/30"
        />
      </div>

      <div className="sm:col-span-2 flex flex-col items-center gap-3 mt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="glass-btn glass-btn--primary min-w-[220px] disabled:opacity-70"
        >
          {status === "sending" ? "שולח…" : CONTACT_CTA.submit}
        </button>
        {status === "error" && (
          <p role="alert" className="text-sm text-red-300 text-center">
            אירעה תקלה בשליחת הפרטים. אפשר לנסות שוב או להתקשר 053-724-7958.
          </p>
        )}
      </div>
    </form>

    <ThankYouModal open={showThankYou} onClose={() => setShowThankYou(false)} />
    </>
  );
}

function Field({
  label,
  error,
  className,
  dir,
  ...rest
}: {
  label: string;
  error?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = `field-${label}`;
  return (
    <div className={className}>
      <label htmlFor={id} className="block mb-2 text-sm font-semibold text-white/85">
        {label}
      </label>
      <input
        id={id}
        dir={dir}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`w-full rounded-xl bg-white/[0.06] border px-4 py-3.5 text-white placeholder-white/30 outline-none transition-all duration-200 ${
          error
            ? "border-red-400/70 focus:ring-2 focus:ring-red-400/30"
            : "border-white/20 focus:border-[color:var(--gold-400)] focus:bg-white/[0.09] focus:ring-2 focus:ring-[color:var(--gold-500)]/30"
        }`}
        {...rest}
      />
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
