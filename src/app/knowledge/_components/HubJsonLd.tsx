import { CONTACT } from "@/lib/constants";
import { FaqPageJsonLd, JsonLdScript } from "@/components/JsonLd";
import type { Crumb } from "@/components/legal/Breadcrumbs";
import {
  absoluteUrl,
  breadcrumbListSchema,
  organizationRef,
} from "@/lib/schema";
import type { HubFaqItem } from "../hub-faq";

/**
 * Structured data for the /knowledge hub: Article (describing the hub
 * page itself), FAQPage (the extended FAQ set) and BreadcrumbList — all
 * emitted as JSON-LD, mirroring the pattern used on individual article pages.
 */
export function HubJsonLd({
  title,
  description,
  path,
  publishDate,
  updatedDate,
  breadcrumbs,
  faq,
}: {
  title: string;
  description: string;
  path: string;
  publishDate: string;
  updatedDate: string;
  breadcrumbs: Crumb[];
  faq: HubFaqItem[];
}) {
  const url = absoluteUrl(path);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: [absoluteUrl("/og-image.jpg")],
    inLanguage: "he-IL",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    datePublished: publishDate,
    dateModified: updatedDate,
    author: { "@type": "Organization", name: "צוות Print3D", url: CONTACT.siteUrl },
    publisher: organizationRef,
  };

  return (
    <>
      <JsonLdScript data={articleSchema} />
      <JsonLdScript data={breadcrumbListSchema(breadcrumbs)} />
      <FaqPageJsonLd items={faq} />
    </>
  );
}
