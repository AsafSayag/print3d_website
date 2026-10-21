import { JsonLdScript } from "@/components/JsonLd";
import {
  absoluteUrl,
  breadcrumbListSchema,
  organizationRef,
} from "@/lib/schema";

/** How many carousel photos to list as the model's images. */
const MAX_IMAGES = 6;

/**
 * Structured data for a project case-study page: the model itself as a
 * CreativeWork made by Print3D, plus the page's place in the site
 * (בית › קטלוג › project). Everything is read from data the page already
 * shows — its מפרט טכני rows and its hero photos — so the markup can never
 * describe something the visitor cannot see.
 */
export function ProjectJsonLd({
  slug,
  name,
  description,
  specs,
  images,
}: {
  slug: string;
  /** Display name, as on the catalog card. */
  name: string;
  description: string;
  specs: readonly { label: string; value?: string }[];
  images: readonly string[];
}) {
  const url = absoluteUrl(`/projects/${slug}`);
  const modelName = specs.find((row) => row.label === "שם המודל")?.value;

  const model = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#model`,
    name: modelName ?? `מודל אדריכלי — ${name}`,
    description,
    url,
    mainEntityOfPage: url,
    image: images.slice(0, MAX_IMAGES).map(absoluteUrl),
    genre: "מודל אדריכלי",
    inLanguage: "he-IL",
    creator: organizationRef,
  };

  return (
    <>
      <JsonLdScript data={model} />
      <JsonLdScript
        data={breadcrumbListSchema([
          { label: "בית", href: "/" },
          { label: "קטלוג", href: "/projects" },
          { label: name },
        ])}
      />
    </>
  );
}
