import type { MetadataRoute } from "next";
import { CONTACT } from "@/lib/constants";

/**
 * AI crawlers, named explicitly so the policy toward them is a decision on
 * record rather than an accident of the `*` rule: every one of them is
 * welcome. Being readable by AI search and assistants is how the site gets
 * cited in their answers. Covers both answer/search fetchers and model
 * training crawlers.
 *
 * A crawler obeys only the most specific group that names it and ignores `*`,
 * which is why this group repeats the `*` disallow list.
 */
const AI_CRAWLERS = [
  // OpenAI
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google (Gemini) and Apple (Apple Intelligence) — control tokens, not crawlers
  "Google-Extended",
  "Applebot-Extended",
  // Others
  "meta-externalagent",
  "Amazonbot",
  "DuckAssistBot",
  "MistralAI-User",
  "CCBot",
];

/** API routes return JSON to the site's own forms — nothing worth crawling. */
const DISALLOW = ["/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: DISALLOW },
    ],
    sitemap: `${CONTACT.siteUrl}/sitemap.xml`,
    host: CONTACT.siteUrl,
  };
}
