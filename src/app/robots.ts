import type { MetadataRoute } from "next";
import { CONTACT } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Utility page with no standalone value for search engines.
      disallow: ["/contact/success"],
    },
    sitemap: `${CONTACT.siteUrl}/sitemap.xml`,
    host: CONTACT.siteUrl,
  };
}
