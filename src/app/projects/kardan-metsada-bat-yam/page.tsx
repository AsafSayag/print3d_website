import type { Metadata } from "next";
import { buildProjectMeta } from "@/lib/pageMeta";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { HIDDEN_PROJECT_SLUGS } from "@/lib/hiddenProjects";
import { ProjectView } from "./_components/ProjectView";
import { SEO_TITLE_TAG, IMAGE_ALT } from "./content";

export const metadata: Metadata = buildProjectMeta({
  title: SEO_TITLE_TAG,
  description: IMAGE_ALT,
  slug: "kardan-metsada-bat-yam",
});

export default function KardanMetsadaBatYamPage() {
  if (HIDDEN_PROJECT_SLUGS.includes("kardan-metsada-bat-yam")) notFound();

  return (
    <div className="relative">
      <Header />
      <ProjectView />
    </div>
  );
}
