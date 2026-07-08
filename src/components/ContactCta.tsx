"use client";

import { useState } from "react";
import { CONTACT_CTA } from "@/lib/content";
import { submitLead } from "@/lib/submitLead";
import { Reveal } from "./ui/Reveal";

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

export function ContactCta() {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    project: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const update = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setStatus("sending");
    await submitLead(values);
    setStatus("done");
  };

  return (
    <section id="contact" className="surface-navy-950 section" aria-label={CONTACT_CTA.heading}>
      <div className="container-x max-w-3xl text-center">
        <Reveal>
          <h2 className="h2 text-white">{CONTACT_CTA.heading}</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-white/70 mt-4 text-lg">{CONTACT_CTA.line}</p>
        </Reveal>

        {status === "done" ? (
          <Reveal>
            <div
              role="status"
              className="mt-10 rounded-2xl border border-[color:var(--gold-500)]/40 bg-[color:var(--gold-500)]/10 px-8 py-10"
            >
              <p className="h3 text-white">{CONTACT_CTA.success}</p>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              noValidate
              className="mt-10 grid sm:grid-cols-2 gap-4 text-start"
            >
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
                dir="ltr"
              />
              <Field
                label={CONTACT_CTA.fields.email}
                value={values.email}
                onChange={update("email")}
                error={errors.email}
                type="email"
                inputMode="email"
                autoComplete="email"
                dir="ltr"
                className="sm:col-span-2"
              />
              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm text-white/70">
                  {CONTACT_CTA.fields.project}{" "}
                  <span className="text-white/40">(רשות)</span>
                </label>
                <textarea
                  value={values.project}
                  onChange={update("project")}
                  rows={3}
                  className="w-full rounded-xl bg-white/[0.04] border border-white/15 px-4 py-3 text-white placeholder-white/30 focus:border-[color:var(--steel-300)] outline-none transition-colors"
                />
              </div>

              <div className="sm:col-span-2 flex justify-center mt-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="glass-btn glass-btn--primary min-w-[220px] disabled:opacity-70"
                >
                  {status === "sending" ? "שולח…" : CONTACT_CTA.submit}
                </button>
              </div>
            </form>
          </Reveal>
        )}
      </div>
    </section>
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
      <label htmlFor={id} className="block mb-2 text-sm text-white/70">
        {label}
      </label>
      <input
        id={id}
        dir={dir}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`w-full rounded-xl bg-white/[0.04] border px-4 py-3 text-white placeholder-white/30 outline-none transition-colors ${
          error
            ? "border-red-400/70"
            : "border-white/15 focus:border-[color:var(--steel-300)]"
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
