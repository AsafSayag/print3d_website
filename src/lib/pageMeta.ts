import type { Metadata } from "next";
import { CONTACT } from "./constants";

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
  const fullTitle = `${title} | Print3D`;
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
