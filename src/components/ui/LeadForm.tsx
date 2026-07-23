"use client";

import { useState } from "react";
import { CONTACT_CTA } from "@/lib/content";
import { submitLead } from "@/lib/submitLead";
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
 */
export function LeadForm() {
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
    <form onSubmit={onSubmit} noValidate className="grid sm:grid-cols-2 gap-4 text-start">
      {/* Honeypot — invisible to real visitors, irresistible to form-filling bots.
          Off-screen (not display:none) so it still exists in the accessibility
          tree the way scrapers expect a real field to. */}
      <input
        type="text"
        name="company"
        value={values.company}
        onChange={update("company")}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] w-px h-px overflow-hidden"
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
