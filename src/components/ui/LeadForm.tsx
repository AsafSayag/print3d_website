"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { CONTACT_CTA } from "@/lib/content";
import { CONTACT, whatsappHref } from "@/lib/constants";
import { submitLead } from "@/lib/submitLead";
import { trackEvent } from "@/lib/analyticsClient";
import { analyticsAttrs } from "@/lib/analytics";
import { readAttribution } from "@/lib/attribution";
import { EMAIL_RE, LEAD_LIMITS, normalizeIsraeliPhone } from "@/lib/leadValidation";
import { ThankYouModal } from "./ThankYouModal";
import type { LeadSource } from "@/lib/leadSources";

type FieldKey = "name" | "phone" | "email" | "project";
type Errors = Partial<Record<FieldKey, string>>;

/** After this long without an answer the button says so, instead of a silent spinner. */
const SLOW_AFTER_MS = 8_000;

function validate(
  values: { name: string; phone: string; email: string; project: string },
  emailOptional: boolean,
): Errors {
  const errors: Errors = {};
  const name = values.name.trim();
  if (name.length < LEAD_LIMITS.nameMin) errors.name = "נא להזין שם מלא";
  else if (name.length > LEAD_LIMITS.nameMax) errors.name = `השם ארוך מדי (עד ${LEAD_LIMITS.nameMax} תווים)`;
  // Any common way of typing an Israeli number is fine (050-123-4567,
  // +972 50…, spaces) — the shared normaliser decides, same as the server.
  if (!normalizeIsraeliPhone(values.phone.trim()))
    errors.phone = "נא להזין מספר טלפון תקין, למשל 050-1234567";
  const email = values.email.trim();
  if (!(emailOptional && !email) && (!EMAIL_RE.test(email) || email.length > LEAD_LIMITS.emailMax))
    errors.email = "נא להזין כתובת אימייל תקינה";
  if (values.project.trim().length > LEAD_LIMITS.projectMax)
    errors.project = `התיאור ארוך מדי (עד ${LEAD_LIMITS.projectMax.toLocaleString("he-IL")} תווים)`;
  return errors;
}

/**
 * Reusable lead-capture form (name / phone / email + optional project note).
 * Dark-surface styling — place it on a navy surface or inside a dark card.
 * Shared by the homepage contact section and the dedicated contact page.
 *
 * The same component is mounted on several surfaces, so it reports a
 * `location` alongside its `form_name` — that pair is what tells the
 * instances apart in GA4. Only the form's identity is ever sent: no field
 * value, and nothing derived from one, leaves the browser through analytics.
 */
export function LeadForm({
  formName = "lead_form",
  location,
  source = "website",
  emailOptional = false,
  successRedirectPath,
}: {
  /** Identifies the form itself. There is currently only one across the site. */
  formName?: string;
  /** Which surface this instance sits on, e.g. `"home_contact_section"`. */
  location: string;
  /** Lead origin recorded in the email + sheet. Defaults to the main site. */
  source?: LeadSource;
  /** Email becomes optional (name + phone suffice) — used on the paid landing
   *  page, where every required field costs conversions. */
  emailOptional?: boolean;
  /** Full-page destination after a successful submission, for campaign forms. */
  successRedirectPath?: string;
}) {
  // Field ids are derived from useId, not from the visible label: the label
  // "שם מלא" contains a space, which broke aria-describedby (a space-separated
  // id list), and two forms on one page would otherwise share ids.
  const uid = useId();
  const ids: Record<FieldKey, string> = {
    name: `${uid}-name`,
    phone: `${uid}-phone`,
    email: `${uid}-email`,
    project: `${uid}-project`,
  };

  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    project: "",
    hp: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [slow, setSlow] = useState(false);
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
    const found = validate(values, emailOptional);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Take the visitor straight to the first problem — on a phone the error
      // can sit above the fold while the submit button is in view.
      const first = (["name", "phone", "email", "project"] as const).find((k) => found[k]);
      if (first) document.getElementById(ids[first])?.focus();
      return;
    }
    setStatus("sending");
    setSlow(false);
    const slowTimer = window.setTimeout(() => setSlow(true), SLOW_AFTER_MS);
    try {
      await submitLead({ ...values, source, attribution: readAttribution() });
      // Only a lead that actually reached the intake endpoint counts as a
      // submission — a failed POST leaves the visitor on the form, retrying.
      trackEvent("form_submit", { form_name: formName, location });
      if (successRedirectPath) {
        window.location.assign(successRedirectPath);
        return;
      }
      // Close the round. The form stays mounted and is cleared below, so a
      // visitor sending a second lead starts a genuinely new fill and gets its
      // own `form_start`. Reset only on success: after a failed POST the
      // visitor is still inside the same round, and their corrections must not
      // be reported as a fresh start.
      startedRef.current = false;
      setValues({ name: "", phone: "", email: "", project: "", hp: "" });
      setStatus("idle");
      setShowThankYou(true);
    } catch {
      setStatus("error");
    } finally {
      window.clearTimeout(slowTimer);
      setSlow(false);
    }
  };

  const errorCount = Object.keys(errors).length;
  const projectLength = values.project.length;

  return (
    <>
    <form
      onSubmit={onSubmit}
      onInput={markStarted}
      noValidate
      className="grid sm:grid-cols-2 gap-4 text-start"
    >
      {/* Honeypot — invisible to real visitors, irresistible to form-filling bots.
          Named `p3d_hp` on purpose: it used to be `company`, which browser
          autofill recognises as "company name" — a developer with a saved
          company would fill it unseen and the lead was dropped as spam.

          Clipped rather than display:none so it still renders (and so still
          looks like a real field to a scraper), but stays out of the layout.
          Not positioned off-screen with a negative offset: on this RTL site
          that extended the document's scroll width to ~11,000px. */}
      <input
        type="text"
        name="p3d_hp"
        value={values.hp}
        onChange={update("hp")}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />
      <Field
        id={ids.name}
        label={CONTACT_CTA.fields.name}
        value={values.name}
        onChange={update("name")}
        error={errors.name}
        required
        maxLength={LEAD_LIMITS.nameMax}
        autoComplete="name"
      />
      <Field
        id={ids.phone}
        label={CONTACT_CTA.fields.phone}
        value={values.phone}
        onChange={update("phone")}
        error={errors.phone}
        required
        maxLength={LEAD_LIMITS.phoneMax}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        // Browsers default type="tel" inputs to LTR via their own UA
        // stylesheet even with no dir attribute at all — force RTL to match
        // how Hebrew is actually typed.
        dir="rtl"
      />
      <Field
        id={ids.email}
        label={CONTACT_CTA.fields.email}
        optional={emailOptional}
        required={!emailOptional}
        value={values.email}
        onChange={update("email")}
        error={errors.email}
        maxLength={LEAD_LIMITS.emailMax}
        type="email"
        inputMode="email"
        autoComplete="email"
        dir="rtl"
        className="sm:col-span-2"
      />
      <div className="sm:col-span-2">
        <label htmlFor={ids.project} className="block mb-2 text-sm font-semibold text-white/85">
          {CONTACT_CTA.fields.project}{" "}
          <span className="font-normal text-white/60">(רשות)</span>
        </label>
        <textarea
          id={ids.project}
          value={values.project}
          onChange={update("project")}
          rows={3}
          // Same cap the server enforces, so a long description can no longer
          // pass the form and then fail at the endpoint with a generic error.
          maxLength={LEAD_LIMITS.projectMax}
          aria-invalid={!!errors.project}
          aria-describedby={`${ids.project}-count${errors.project ? ` ${ids.project}-err` : ""}`}
          className="w-full rounded-xl bg-white/[0.06] border border-white/20 px-4 py-3.5 text-white placeholder-white/30 outline-none transition-all duration-200 focus:border-[color:var(--gold-400)] focus:bg-white/[0.09] focus:ring-2 focus:ring-[color:var(--gold-500)]/30"
        />
        <p
          id={`${ids.project}-count`}
          className={`mt-1.5 text-xs text-white/55 text-end ${projectLength < LEAD_LIMITS.projectMax - 200 ? "sr-only" : ""}`}
        >
          {projectLength.toLocaleString("he-IL")} / {LEAD_LIMITS.projectMax.toLocaleString("he-IL")} תווים
        </p>
        {errors.project && (
          <p id={`${ids.project}-err`} className="mt-1.5 text-sm text-red-300">
            {errors.project}
          </p>
        )}
      </div>

      <div className="sm:col-span-2 flex flex-col items-center gap-3 mt-2">
        {/* Announced once per failed attempt; focus has already moved to the
            first invalid field, whose own message is tied to it. */}
        {errorCount > 0 && (
          <p role="alert" className="text-sm text-red-300 text-center">
            {errorCount === 1 ? "יש שדה אחד לתיקון." : `יש ${errorCount} שדות לתיקון.`}
          </p>
        )}
        <button
          type="submit"
          disabled={status === "sending"}
          className="glass-btn glass-btn--primary min-w-[220px] disabled:opacity-70"
        >
          {status === "sending" ? (slow ? "עוד רגע, שולחים…" : "שולח…") : CONTACT_CTA.submit}
        </button>
        {status === "error" && (
          <p role="alert" className="text-sm text-red-300 text-center">
            לא הצלחנו לשלוח את הפרטים. אפשר לנסות שוב, להתקשר ל־
            <a
              href={CONTACT.phoneHref}
              dir="ltr"
              className="font-semibold text-white underline underline-offset-4"
              {...analyticsAttrs("phone_click", { location: `${location}_error`, phone_type: "office" })}
            >
              {CONTACT.phone}
            </a>{" "}
            או{" "}
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="לכתוב לנו בוואטסאפ (נפתח בחלון חדש)"
              className="font-semibold text-white underline underline-offset-4"
              {...analyticsAttrs("whatsapp_click", { location: `${location}_error` })}
            >
              לכתוב לנו בוואטסאפ
            </a>
            .
          </p>
        )}
        {/* Notice at the point of collection (Israeli Privacy Protection Law,
            s.11): why the details are asked for and where the policy is. */}
        <p className="text-xs leading-relaxed text-white/60 text-center max-w-md">
          נחזור אליכם תוך יום עסקים. הפרטים ישמשו רק לטיפול בפנייה שלכם, כמפורט ב
          <Link href="/legal/privacy" className="underline underline-offset-2 text-white/80 hover:text-white">
            מדיניות הפרטיות
          </Link>
          .
        </p>
      </div>
    </form>

    {!successRedirectPath && (
      <ThankYouModal open={showThankYou} onClose={() => setShowThankYou(false)} />
    )}
    </>
  );
}

function Field({
  id,
  label,
  error,
  className,
  dir,
  optional = false,
  required = false,
  ...rest
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
  /** Appends the same "(רשות)" hint the project textarea carries. */
  optional?: boolean;
  /** Announced to screen readers via aria-required (the form is noValidate,
   *  so native `required` would only add browser bubbles we don't use). */
  required?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "required">) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block mb-2 text-sm font-semibold text-white/85">
        {label}
        {optional && (
          <>
            {" "}
            <span className="font-normal text-white/60">(רשות)</span>
          </>
        )}
      </label>
      <input
        id={id}
        dir={dir}
        aria-required={required || undefined}
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
