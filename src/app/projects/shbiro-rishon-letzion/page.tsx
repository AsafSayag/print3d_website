import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { ProjectView } from "./_components/ProjectView";
import { SEO_TITLE_TAG, IMAGE_ALT } from "./content";

export const metadata: Metadata = {
  title: SEO_TITLE_TAG,
  description: IMAGE_ALT,
};

export default function ShbiroRishonLetzionPage() {
  return (
    <div className="relative">
      <Header />
      <ProjectView />
    </div>
  );
}
