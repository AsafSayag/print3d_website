import type { Metadata } from "next";
import { GindiProjectView } from "./_components/GindiProjectView";
import { SEO_TITLE_TAG, IMAGE_ALT } from "./content";

export const metadata: Metadata = {
  title: SEO_TITLE_TAG,
  description: IMAGE_ALT,
};

export default function GindiKfarAzarPage() {
  return <GindiProjectView />;
}
