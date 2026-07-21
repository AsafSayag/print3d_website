import type { Metadata } from "next";
import { CONTACT } from "./constants";

/**
 * Metadata for anything that renders the 404 page — the not-found route itself
 * and any page that calls notFound().
 *
 * Deliberately bare: no description, no canonical, no OG/Twitter cards. A page
 * that 404s must not describe what would have been there. Hidden projects rely
 * on this — Next evaluates a page's `metadata` export even when the component
 * calls notFound(), so a project's real title and canonical URL would otherwise
 * still ship inside the 404 response.
 */
export const NOT_FOUND_METADATA: Metadata = {
  title: "משהו השתבש | Print3D",
  robots: { index: false, follow: true },
};

/**
 * Builds a complete, self-consistent Metadata object for a standalone page:
 * unique title (suffixed with the brand), description, canonical URL, and
 * matching Open Graph + Twitter cards. Titles stay under ~60 chars.
 */
export function buildPageMeta({
  title,
  description,
  path,
  index = true,
}: {
  title: string;
  description: string;
  /** Absolute path beginning with "/". */
  path: string;
  /** Utility pages (404, success) opt out of indexing. */
  index?: boolean;
}): Metadata {
  return build({ fullTitle: `${title} | Print3D`, description, path, index });
}

/**
 * Metadata for a project case-study page.
 *
 * Separate from `buildPageMeta` because a project's `SEO_TITLE_TAG` already
 * ends in its own brand suffix ("… | פרינט תלת מימד"); routing it through
 * `buildPageMeta` would append a second one. Everything else — the canonical
 * URL and the matching OG/Twitter cards — is identical.
 *
 * Use this on every project page. Declaring `metadata` inline instead silently
 * inherits the root layout's homepage canonical, which makes Google read the
 * page as a duplicate of the homepage and drop it from the index.
 */
export function buildProjectMeta({
  title,
  description,
  slug,
}: {
  /** The project's `SEO_TITLE_TAG` — used verbatim, no suffix appended. */
  title: string;
  description: string;
  /** Project slug, without the `/projects/` prefix. */
  slug: string;
}): Metadata {
  return build({ fullTitle: title, description, path: `/projects/${slug}` });
}

function build({
  fullTitle,
  description,
  path,
  index = true,
}: {
  /** Final `<title>`, already carrying whatever brand suffix it needs. */
  fullTitle: string;
  description: string;
  /** Absolute path beginning with "/". */
  path: string;
  /** Utility pages (404, success) opt out of indexing. */
  index?: boolean;
}): Metadata {
  const url = `${CONTACT.siteUrl}${path}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    robots: { index, follow: true },
    openGraph: {
      type: "website",
      locale: "he_IL",
      siteName: "Print3D",
      title: fullTitle,
      description,
      url,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Print3D — מודלים אדריכליים פיזיים לפרויקטי נדל״ן",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/og-image.jpg"],
    },
  };
}
