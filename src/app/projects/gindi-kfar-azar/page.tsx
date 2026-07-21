import type { Metadata } from "next";
import { buildProjectMeta } from "@/lib/pageMeta";
import { Header } from "@/components/Header";
import { DesignOne } from "./_components/DesignOne";
import { SEO_TITLE_TAG, IMAGE_ALT } from "./content";

export const metadata: Metadata = buildProjectMeta({
  title: SEO_TITLE_TAG,
  description: IMAGE_ALT,
  slug: "gindi-kfar-azar",
});

export default function GindiKfarAzarPage() {
  return (
    <div className="relative">
      <Header />
      <DesignOne />
    </div>
  );
}
