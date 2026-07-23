export type Lead = {
  name: string;
  phone: string;
  email: string;
  project?: string;
  /** Honeypot — must stay empty. Real visitors never see or fill this field. */
  company?: string;
};

/**
 * Send a lead to the intake endpoint (`/api/lead`), which emails the office and
 * appends the lead — with an exact Israel-time timestamp — to the leads sheet.
 * Throws on failure so the form can surface an error and let the visitor retry.
 */
export async function submitLead(lead: Lead): Promise<{ ok: true }> {
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });

  if (!res.ok) {
    throw new Error(`Lead submission failed with status ${res.status}`);
  }

  return { ok: true };
}
