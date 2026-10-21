import { JsonLdScript } from "@/components/JsonLd";
import {
  absoluteUrl,
  breadcrumbListSchema,
  organizationRef,
  WEBSITE_ID,
} from "@/lib/schema";
import type { Crumb } from "./Breadcrumbs";

/**
 * Structured data for a legal / utility page: WebPage and a BreadcrumbList
 * built from the same crumbs shown in the UI. The site-wide WebSite and
 * LocalBusiness (Organization) nodes are emitted once in the root layout; the
 * WebPage points at them by `@id`.
 */
export function LegalJsonLd({
  title,
  description,
  path,
  breadcrumbs,
}: {
  title: string;
  description: string;
  /** Absolute path beginning with "/". */
  path: string;
  breadcrumbs: Crumb[];
}) {
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: absoluteUrl(path),
    inLanguage: "he-IL",
    isPartOf: { "@id": WEBSITE_ID },
    publisher: organizationRef,
  };

  return (
    <>
      <JsonLdScript data={webPage} />
      <JsonLdScript data={breadcrumbListSchema(breadcrumbs)} />
    </>
  );
}
