export type Lead = {
  name: string;
  phone: string;
  email: string;
  project?: string;
};

/**
 * Local stub for lead submission.
 * TODO: replace with a real endpoint that emails office@print3d.ltd.
 */
export async function submitLead(lead: Lead): Promise<{ ok: true }> {
  // Simulate network latency.
  await new Promise((resolve) => setTimeout(resolve, 900));
  // eslint-disable-next-line no-console
  console.info("[submitLead] would send to office@print3d.ltd:", lead);
  return { ok: true };
}
