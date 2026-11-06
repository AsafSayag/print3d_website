/**
 * Lead field rules shared by the form (LeadForm) and the intake endpoint
 * (/api/lead). Keeping them in one module is the point: the form used to
 * accept text the server then rejected (no maxLength vs NAME_MAX/PROJECT_MAX),
 * and both carried their own copy of a phone regex that turned away common
 * ways of typing a number.
 */

export const LEAD_LIMITS = {
  nameMin: 2,
  nameMax: 100,
  /** Raw input length, before normalisation ("+972-50-123-4567" is 16). */
  phoneMax: 20,
  emailMax: 254,
  projectMax: 1000,
} as const;

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Turns an Israeli phone number typed any common way into local digits, or
 * returns null if it isn't one. Accepted: "050-1234567", "050-123-4567",
 * "050 123 4567", "(03) 647-3338", "+972-50-123-4567", "972501234567",
 * "00972501234567". A valid result is 9 digits (landline) or 10 (mobile),
 * starting with 0 — the same range the old /^0\d{1,2}-?\d{7}$/ allowed.
 */
export function normalizeIsraeliPhone(input: string): string | null {
  // Letters mean it isn't a phone number, not a number with noise around it.
  if (/[A-Za-z֐-׿]/.test(input)) return null;
  let digits = input.replace(/\D/g, "");
  let international = false;
  if (digits.startsWith("00972")) {
    digits = digits.slice(5);
    international = true;
  } else if (digits.startsWith("972")) {
    digits = digits.slice(3);
    international = true;
  }
  // A missing leading zero is valid only after an Israeli country prefix.
  if (international && !digits.startsWith("0")) digits = `0${digits}`;
  return /^0\d{8,9}$/.test(digits) ? digits : null;
}

/** "0501234567" → "050-1234567", "036473338" → "03-6473338". */
export function formatIsraeliPhone(digits: string): string {
  return digits.length === 10
    ? `${digits.slice(0, 3)}-${digits.slice(3)}`
    : `${digits.slice(0, 2)}-${digits.slice(2)}`;
}
