import { after, type NextRequest } from "next/server";
import { LEAD_SOURCES, leadSourceLabel, trafficType } from "@/lib/leadSources";
import { sanitizeAttribution, type Attribution } from "@/lib/attribution";

/**
 * Lead intake endpoint.
 *
 * Receives a lead from the site's LeadForm and fans it out to two channels:
 *   1. Email — an instant notification to the office inbox (via Resend).
 *   2. Google Sheet — an append-only record of every lead (via an Apps Script
 *      web-app webhook), so there is always one file with the full history.
 *
 * Both channels are best-effort and run in parallel. As soon as ONE of them
 * succeeds the lead is captured and we answer `{ ok: true }`; the other keeps
 * running after the response (`after`). Only if both fail do we return an
 * error, so the visitor is told to try again rather than silently losing
 * their details. (Waiting for both made visitors sit through the slow Apps
 * Script webhook — 10+ seconds — before reaching the thank-you page.)
 *
 * Abuse protection: a `company` honeypot field (silently accepted, never
 * sent), a per-IP in-memory rate limit (5 requests/minute/instance), and a
 * same-origin + JSON-only gate so other websites can't submit leads through
 * their visitors' browsers. Values bound for the Sheet are neutralised so a
 * visitor can't plant a spreadsheet formula.
 *
 * Configuration (environment variables — see LEADS_SETUP.md):
 *   RESEND_API_KEY          Resend API key (required for the email channel).
 *   LEAD_NOTIFY_TO          Recipient of the notification. Default: frank@print3d.co.il.
 *   LEAD_NOTIFY_FROM        Verified sender. Default: Print3D <leads@print3d.co.il>.
 *   LEADS_SHEET_WEBHOOK_URL Apps Script web-app URL (required for the Sheet channel).
 */

// Always run per-request; never prerender/cache this handler.
export const dynamic = "force-dynamic";

type LeadPayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  project?: unknown;
  /** Lead origin id (see lib/leadSources.ts); unknown values fall back to "website". */
  source?: unknown;
  /** Ad click id / UTMs captured on landing (see lib/attribution.ts). */
  attribution?: unknown;
  /** Honeypot — real visitors never see or fill this field. */
  company?: unknown;
};

const PHONE_RE = /^0\d{1,2}-?\d{7}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Field length bounds, enforced before any data reaches Resend or the Sheet webhook.
const MAX_BODY_BYTES = 10 * 1024; // 10KB
const NAME_MIN = 2;
const NAME_MAX = 100;
const PHONE_MAX = 20;
const EMAIL_MAX = 254;
const PROJECT_MAX = 1000;

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

/**
 * True when the request was sent by a page on another site. Browsers always
 * attach `Origin` (and `Sec-Fetch-Site`) to a cross-site POST, so this blocks
 * a foreign page from pushing leads through its visitors' browsers — the
 * per-IP rate limit can't stop that, since every visitor has a different IP.
 * Requests without `Origin` (curl, server-to-server) pass: they can't be
 * forged from a browser, and the remaining checks still apply to them.
 * Compares against the request's own host, so preview deployments and
 * localhost work unchanged.
 */
function isCrossSite(request: NextRequest): boolean {
  if (request.headers.get("sec-fetch-site") === "cross-site") return true;
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const host = (request.headers.get("x-forwarded-host") ?? request.headers.get("host"))
    ?.split(",")[0]
    ?.trim();
  try {
    return new URL(origin).host !== host;
  } catch {
    // `Origin: null` (sandboxed iframe, file://) — never our own form.
    return true;
  }
}

const NOTIFY_TO = process.env.LEAD_NOTIFY_TO || "frank@print3d.co.il";
// Sends from the business domain so notifications can reach any inbox (e.g.
// frank@print3d.co.il), not just the Resend account owner. This REQUIRES
// print3d.co.il to be verified in Resend (add the DKIM/SPF DNS records from the
// Resend dashboard — see LEADS_SETUP.md). Until then, override with the shared
// sender "Print3D <onboarding@resend.dev>" via LEAD_NOTIFY_FROM — but note that
// shared sender only delivers to the Resend account owner's address.
// (print3d.ltd is a separate WordPress site whose DNS we don't control, so it
// can't be verified as a sender.)
const NOTIFY_FROM = process.env.LEAD_NOTIFY_FROM || "Print3D <leads@print3d.co.il>";

/**
 * Google Sheets evaluates a cell that starts with = + - or @ as a formula, so
 * a visitor could plant one (e.g. `=IMPORTXML(...)` or `=HYPERLINK(...)`) via
 * the name or project field. A leading apostrophe makes Sheets store the value
 * as plain text, and the apostrophe itself isn't shown in the cell. Applied to
 * the Sheet payload only; the email shows the values as typed.
 */
const FORMULA_TRIGGER_RE = /^[=+\-@\t\r]/;

function sheetSafe(value: string): string {
  return FORMULA_TRIGGER_RE.test(value) ? `'${value}` : value;
}

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

/** Labelled attribution rows for the email — only the params that are present. */
function attributionRows(a: Attribution): [string, string][] {
  const rows: [string, string][] = [];
  if (a.utm_campaign) rows.push(["קמפיין", a.utm_campaign]);
  if (a.utm_term) rows.push(["מילת מפתח", a.utm_term]);
  if (a.utm_content) rows.push(["מודעה", a.utm_content]);
  if (a.utm_source || a.utm_medium)
    rows.push(["מקור / מדיום", [a.utm_source, a.utm_medium].filter(Boolean).join(" / ")]);
  if (a.search_referrer) rows.push(["מנוע חיפוש מפנה", a.search_referrer]);
  const clickId = a.gclid || a.gbraid || a.wbraid;
  if (clickId) rows.push(["מזהה קליק (Google Ads)", clickId]);
  return rows;
}

async function sendEmail(lead: {
  name: string;
  phone: string;
  email: string;
  project: string;
  source: string;
  receivedAt: string;
  attribution: Attribution;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");

  const rows: [string, string][] = [
    ["שם", lead.name],
    ["טלפון", lead.phone],
    ["מקור", lead.source],
    ["תאריך ושעת השארת פרטים", lead.receivedAt],
  ];
  if (lead.email) rows.push(["אימייל", lead.email]);
  if (lead.project) rows.push(["על הפרויקט", lead.project]);
  rows.push(...attributionRows(lead.attribution));

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
    `מקור: ${lead.source}`,
    `תאריך ושעת השארת פרטים: ${lead.receivedAt}`,
  ];
  if (lead.email) textLines.push(`אימייל: ${lead.email}`);
  if (lead.project) textLines.push(`על הפרויקט: ${lead.project}`);
  for (const [label, value] of attributionRows(lead.attribution)) {
    textLines.push(`${label}: ${value}`);
  }

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
      // Paid-traffic leads are flagged in the subject so they stand out in the inbox.
      subject:
        lead.source === LEAD_SOURCES.website
          ? "לקוח מתעניין חדש השאיר פרטים"
          : `לקוח מתעניין חדש השאיר פרטים · ${lead.source}`,
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
  source: string;
  /** "ממומן" / "אורגני" / "לא ידוע" — the sheet's "מקור" column. */
  channel: string;
  receivedAt: string;
  receivedAtIso: string;
  attribution: Attribution;
}): Promise<void> {
  const webhook = process.env.LEADS_SHEET_WEBHOOK_URL;
  if (!webhook) throw new Error("LEADS_SHEET_WEBHOOK_URL is not set");

  // Attribution is flattened to top-level fields (gclid, utm_campaign, …) so
  // the Apps Script reads them like any other column — see LEADS_SETUP.md.
  const { attribution, ...rest } = lead;
  const row = Object.fromEntries(
    Object.entries({ ...rest, ...attribution }).map(([key, value]) => [
      key,
      typeof value === "string" ? sheetSafe(value) : value,
    ]),
  );
  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(row),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Sheet webhook responded ${res.status}: ${detail}`);
  }
}

export async function POST(request: NextRequest) {
  if (isCrossSite(request)) {
    return Response.json({ ok: false, error: "forbidden" }, { status: 403 });
  }
  // Our form always posts JSON. Rejecting everything else also rules out the
  // "simple" request types (text/plain, form-encoded) that a foreign page can
  // send without a CORS preflight.
  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.startsWith("application/json")) {
    return Response.json({ ok: false, error: "unsupported_media_type" }, { status: 415 });
  }

  if (isRateLimited(getClientIp(request))) {
    return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) {
    return Response.json({ ok: false, error: "payload_too_large" }, { status: 413 });
  }

  let body: LeadPayload;
  try {
    body = JSON.parse(rawBody) as LeadPayload;
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
  if (
    name.length < NAME_MIN ||
    name.length > NAME_MAX ||
    phone.length > PHONE_MAX ||
    !PHONE_RE.test(phone.replace(/\s/g, ""))
  ) {
    return Response.json({ ok: false, error: "invalid_lead" }, { status: 400 });
  }
  if (email && (email.length > EMAIL_MAX || !EMAIL_RE.test(email))) {
    return Response.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  if (project.length > PROJECT_MAX) {
    return Response.json({ ok: false, error: "invalid_project" }, { status: 400 });
  }

  const now = new Date();
  const attribution = sanitizeAttribution(body.attribution);
  const lead = {
    name,
    phone,
    email,
    project,
    source: leadSourceLabel(body.source),
    channel: trafficType(body.source, attribution),
    receivedAt: formatIsraelTime(now),
    receivedAtIso: now.toISOString(),
    attribution,
  };

  const emailSent = sendEmail(lead);
  const sheetAppended = appendToSheet(lead);
  emailSent.catch((err) => console.error("[lead] email notification failed:", err));
  sheetAppended.catch((err) => console.error("[lead] sheet append failed:", err));
  // Keep the function alive until both channels finish, even after we answer.
  after(() => Promise.allSettled([emailSent, sheetAppended]));

  // Answer as soon as the lead reached at least one channel.
  try {
    await Promise.any([emailSent, sheetAppended]);
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { ok: false, error: "delivery_failed" },
      { status: 502 },
    );
  }
}
