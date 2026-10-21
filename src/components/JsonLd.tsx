import { FAQ } from "@/lib/content";
import {
  organizationSchema,
  serializeJsonLd,
  websiteSchema,
} from "@/lib/schema";

/** One inline `<script type="application/ld+json">` block. */
export function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

/**
 * Site-wide structured data: the business (LocalBusiness, which extends
 * Organization) and the WebSite, as one graph. Emitted in the root layout, so
 * it applies to every page — page-level markup references both by `@id`.
 */
export function JsonLd() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@graph": [organizationSchema, websiteSchema],
      }}
    />
  );
}

/**
 * FAQPage structured data. Rendered only on the homepage, where the matching
 * questions are actually displayed — required for Google's FAQ rich results.
 */
export function FaqJsonLd() {
  return <FaqPageJsonLd items={FAQ.items} />;
}

/** FAQPage structured data for an arbitrary question set (e.g. the /faq page). */
export function FaqPageJsonLd({
  items,
}: {
  items: readonly { q: string; a: string }[];
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }}
    />
  );
}
