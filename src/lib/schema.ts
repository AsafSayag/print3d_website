import type { Crumb } from "@/components/legal/Breadcrumbs";
import { BUSINESS_HOURS, CONTACT, SOCIAL_PROFILES } from "./constants";

/**
 * Shared building blocks for the site's schema.org structured data (JSON-LD).
 *
 * The business and the website are each described exactly once, site-wide, in
 * the root layout (`<JsonLd />`), under a stable `@id`. Every other page's
 * markup points back at those nodes by `@id` instead of re-describing them, so
 * search engines and AI assistants see one consistent entity — same name, logo
 * and profiles — whichever page they enter the site from.
 */

export const ORGANIZATION_ID = `${CONTACT.siteUrl}/#organization`;
export const WEBSITE_ID = `${CONTACT.siteUrl}/#website`;

const BRAND_NAME = "Print3D";
const BRAND_NAME_HE = "פרינט תלת מימד";

/** Absolute URL for a site path beginning with "/". */
export const absoluteUrl = (path: string) => `${CONTACT.siteUrl}${path}`;

/**
 * The square cube mark. Google shows the organization logo on a white
 * background, which rules out the wordmark files — their lettering is white.
 */
const LOGO = {
  "@type": "ImageObject",
  url: absoluteUrl("/brand/print3d-logo-square.png"),
  width: 192,
  height: 192,
};

/** The business — emitted once, in the root layout. */
export const organizationSchema = {
  "@type": "LocalBusiness",
  "@id": ORGANIZATION_ID,
  name: BRAND_NAME,
  alternateName: BRAND_NAME_HE,
  description:
    "ייצור מודלים אדריכליים פיזיים לפרויקטי נדל״ן — טכנולוגיות מתקדמות וגימור יד אומן.",
  url: CONTACT.siteUrl,
  logo: LOGO,
  image: absoluteUrl("/og-image.jpg"),
  telephone: "+972-3-6473338",
  email: CONTACT.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT.addressStreet,
    addressLocality: CONTACT.addressCity,
    addressCountry: "IL",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: BUSINESS_HOURS.days,
      opens: BUSINESS_HOURS.opens,
      closes: BUSINESS_HOURS.closes,
    },
  ],
  areaServed: { "@type": "Country", name: "Israel" },
  sameAs: Object.values(SOCIAL_PROFILES),
  knowsAbout: [
    "מודלים אדריכליים",
    "מודלים אדריכליים למשרדי מכירות",
    "מודלים עירוניים",
    "הדפסת תלת מימד",
    "חיתוך לייזר",
    "שיווק פרויקטי נדל״ן",
  ],
};

/** The website — emitted once, in the root layout. Also feeds Google's site name. */
export const websiteSchema = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: BRAND_NAME,
  alternateName: BRAND_NAME_HE,
  url: CONTACT.siteUrl,
  inLanguage: "he-IL",
  publisher: { "@id": ORGANIZATION_ID },
};

/**
 * A pointer to the business for `publisher` / `creator` fields. It carries the
 * name, URL and logo as well as the `@id`, so it still reads correctly to a
 * consumer that does not resolve `@id` references.
 */
export const organizationRef = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: BRAND_NAME,
  url: CONTACT.siteUrl,
  logo: LOGO,
};

/** BreadcrumbList for the given trail; the current page's crumb has no href. */
export function breadcrumbListSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: absoluteUrl(c.href) } : {}),
    })),
  };
}

/**
 * JSON for an inline `<script type="application/ld+json">`. Escapes `<` so a
 * string value can never close the script tag early — the sanitising step the
 * Next.js JSON-LD guide calls for.
 */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
