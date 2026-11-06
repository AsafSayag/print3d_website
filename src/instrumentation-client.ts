import { initBotId } from "botid/client/core";

// Attach BotID's verification headers only to lead submissions. Next runs
// this before hydration, so every LeadForm can use the existing fetch path.
initBotId({ protect: [{ path: "/api/lead", method: "POST", advancedOptions: { checkLevel: "basic" } }] });
