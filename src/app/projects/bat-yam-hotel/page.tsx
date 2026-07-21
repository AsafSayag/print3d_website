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
  slug: "bat-yam-hotel",
});

export default function BatYamHotelPage() {
  if (HIDDEN_PROJECT_SLUGS.includes("bat-yam-hotel")) notFound();

  return (
    <div className="relative">
      <Header />
      <ProjectView />
    </div>
  );
}
