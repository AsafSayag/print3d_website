import type { Metadata } from "next";
import { buildProjectMeta } from "@/lib/pageMeta";
import { Header } from "@/components/Header";
import { ProjectView } from "./_components/ProjectView";
import { SEO_TITLE_TAG, IMAGE_ALT } from "./content";

export const metadata: Metadata = buildProjectMeta({
  title: SEO_TITLE_TAG,
  description: IMAGE_ALT,
  slug: "dafna-tidhar",
});

export default function DafnaTidharPage() {
  return (
    <div className="relative">
      <Header />
      <ProjectView />
    </div>
  );
}
