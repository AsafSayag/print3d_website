import type { LeadSource } from "./leadSources";
import type { Attribution } from "./attribution";

export type Lead = {
  name: string;
  phone: string;
  email: string;
  project?: string;
  /** Which surface the lead came from — see lib/leadSources.ts. */
  source?: LeadSource;
  /** Ad click id / UTMs captured on landing — see lib/attribution.ts. */
  attribution?: Attribution;
  /** Honeypot — must stay empty. Real visitors never see or fill this field. */
  hp?: string;
};

/**
 * Longer than the server's slowest channel (the Sheet webhook, capped at 25s
 * in /api/lead), so the browser never gives up on a request the server is
 * still about to answer with success — that would show an error for a lead
 * that was actually captured.
 */
const CLIENT_TIMEOUT_MS = 30_000;

/**
 * Send a lead to the intake endpoint (`/api/lead`), which emails the office and
 * appends the lead — with an exact Israel-time timestamp — to the leads sheet.
 * Throws on failure or timeout so the form can surface an error and let the
 * visitor retry or call instead.
 */
export async function submitLead(lead: Lead): Promise<{ ok: true }> {
  // AbortController + setTimeout rather than AbortSignal.timeout(), which
  // Safari only gained in 16; .browserslistrc still targets 15.4.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CLIENT_TIMEOUT_MS);
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new Error(`Lead submission failed with status ${res.status}`);
    }
    return { ok: true };
  } finally {
    clearTimeout(timer);
  }
}
