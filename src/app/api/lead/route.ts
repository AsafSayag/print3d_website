import type { NextRequest } from "next/server";

/**
 * Lead intake endpoint.
 *
 * Receives a lead from the site's LeadForm and fans it out to two channels:
 *   1. Email — an instant notification to the office inbox (via Resend).
 *   2. Google Sheet — an append-only record of every lead (via an Apps Script
 *      web-app webhook), so there is always one file with the full history.
 *
 * Both channels are best-effort and run in parallel. As long as ONE of them
 * succeeds we consider the lead captured and return `{ ok: true }`; only if
 * both fail do we return an error, so the visitor is told to try again rather
 * than silently losing their details.
 *
 * Abuse protection: a `company` honeypot field (silently accepted, never
 * sent) plus a per-IP in-memory rate limit (5 requests/minute/instance).
 *
 * Configuration (environment variables — see LEADS_SETUP.md):
 *   RESEND_API_KEY          Resend API key (required for the email channel).
 *   LEAD_NOTIFY_TO          Recipient of the notification. Default: asaf00500@gmail.com.
 *   LEAD_NOTIFY_FROM        Verified sender. Default: Resend's shared test sender.
 *   LEADS_SHEET_WEBHOOK_URL Apps Script web-app URL (required for the Sheet channel).
 */

// Always run per-request; never prerender/cache this handler.
export const dynamic = "force-dynamic";

type LeadPayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  project?: unknown;
  /** Honeypot — real visitors never see or fill this field. */
  company?: unknown;
};

const PHONE_RE = /^0\d{1,2}-?\d{7}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort in-memory rate limit: caps repeat submissions from the same IP.
// Only shared across requests that land on the same warm serverless instance
// (not a distributed guarantee), but it stops the common case of a script
// hammering the endpoint in a tight loop within one instance's lifetime.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const submissionsByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissionsByIp.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  recent.push(now);
  submissionsByIp.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

function getClientIp(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

const NOTIFY_TO = process.env.LEAD_NOTIFY_TO || "asaf00500@gmail.com";
// Resend's shared onboarding sender works out-of-the-box but only delivers to
// the address that owns the Resend account. Once print3d.ltd is verified in
// Resend, set LEAD_NOTIFY_FROM to e.g. "Print3D <leads@print3d.ltd>".
const NOTIFY_FROM = process.env.LEAD_NOTIFY_FROM || "Print3D <onboarding@resend.dev>";

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Human-readable date + time in Israel's timezone, e.g. "20.7.2026, 14:35:07". */
function formatIsraelTime(date: Date): string {
  return new Intl.DateTimeFormat("he-IL", {
    timeZone: "Asia/Jerusalem",
    dateStyle: "short",
    timeStyle: "medium",
  }).format(date);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendEmail(lead: {
  name: string;
  phone: string;
  email: string;
  project: string;
  receivedAt: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");

  const rows: [string, string][] = [
    ["שם", lead.name],
    ["טלפון", lead.phone],
    ["תאריך ושעת השארת פרטים", lead.receivedAt],
  ];
  if (lead.email) rows.push(["אימייל", lead.email]);
  if (lead.project) rows.push(["על הפרויקט", lead.project]);

  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr>
           <td style="padding:8px 14px;font-weight:700;color:#0E1A2C;white-space:nowrap;">${escapeHtml(label)}</td>
           <td style="padding:8px 14px;color:#15263D;">${escapeHtml(value)}</td>
         </tr>`,
    )
    .join("");

  const html = `<!doctype html>
<html dir="rtl" lang="he">
  <body style="margin:0;background:#F4F7FA;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:560px;margin:0 auto;padding:28px 20px;">
      <div style="background:#0E1A2C;color:#fff;border-radius:16px 16px 0 0;padding:22px 24px;">
        <h1 style="margin:0;font-size:20px;">לקוח מתעניין חדש השאיר פרטים</h1>
      </div>
      <div style="background:#fff;border:1px solid #e5e9ef;border-top:0;border-radius:0 0 16px 16px;padding:20px 10px;">
        <p style="margin:0 14px 12px;color:#15263D;">אלו הפרטים שלו:</p>
        <table style="width:100%;border-collapse:collapse;font-size:15px;">${rowsHtml}</table>
      </div>
    </div>
  </body>
</html>`;

  const textLines = [
    "לקוח מתעניין חדש השאיר פרטים",
    "אלו הפרטים שלו:",
    `שם: ${lead.name}`,
    `טלפון: ${lead.phone}`,
    `תאריך ושעת השארת פרטים: ${lead.receivedAt}`,
  ];
  if (lead.email) textLines.push(`אימייל: ${lead.email}`);
  if (lead.project) textLines.push(`על הפרויקט: ${lead.project}`);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: NOTIFY_FROM,
      to: [NOTIFY_TO],
      reply_to: lead.email || undefined,
      subject: "לקוח מתעניין חדש השאיר פרטים",
      html,
      text: textLines.join("\n"),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend responded ${res.status}: ${detail}`);
  }
}

async function appendToSheet(lead: {
  name: string;
  phone: string;
  email: string;
  project: string;
  receivedAt: string;
  receivedAtIso: string;
}): Promise<void> {
  const webhook = process.env.LEADS_SHEET_WEBHOOK_URL;
  if (!webhook) throw new Error("LEADS_SHEET_WEBHOOK_URL is not set");

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Sheet webhook responded ${res.status}: ${detail}`);
  }
}

export async function POST(request: NextRequest) {
  if (isRateLimited(getClientIp(request))) {
    return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot tripped — a bot filled a field real visitors never see. Report
  // success without actually sending anything, so scripts don't learn to
  // leave it blank.
  if (clean(body.company)) {
    return Response.json({ ok: true });
  }

  const name = clean(body.name);
  const phone = clean(body.phone);
  const email = clean(body.email);
  const project = clean(body.project);

  // Mirror the client-side validation so the endpoint is safe on its own.
  if (name.length < 2 || !PHONE_RE.test(phone.replace(/\s/g, ""))) {
    return Response.json({ ok: false, error: "invalid_lead" }, { status: 400 });
  }
  if (email && !EMAIL_RE.test(email)) {
    return Response.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const now = new Date();
  const lead = {
    name,
    phone,
    email,
    project,
    receivedAt: formatIsraelTime(now),
    receivedAtIso: now.toISOString(),
  };

  const [emailResult, sheetResult] = await Promise.allSettled([
    sendEmail(lead),
    appendToSheet(lead),
  ]);

  if (emailResult.status === "rejected") {
    console.error("[lead] email notification failed:", emailResult.reason);
  }
  if (sheetResult.status === "rejected") {
    console.error("[lead] sheet append failed:", sheetResult.reason);
  }

  // As long as the lead reached at least one channel, treat it as captured.
  if (emailResult.status === "fulfilled" || sheetResult.status === "fulfilled") {
    return Response.json({ ok: true });
  }

  return Response.json(
    { ok: false, error: "delivery_failed" },
    { status: 502 },
  );
}
