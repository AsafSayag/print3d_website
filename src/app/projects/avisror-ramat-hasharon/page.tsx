import { createProjectPage } from "@/lib/projectPage";
import { ProjectView } from "./_components/ProjectView";
import {
  SEO_TITLE_TAG,
  META_DESCRIPTION,
  SPECS,
  HERO_SLIDES,
} from "./content";

const { metadata, ProjectPage } = createProjectPage({
  slug: "avisror-ramat-hasharon",
  title: SEO_TITLE_TAG,
  description: META_DESCRIPTION,
  specs: SPECS,
  images: HERO_SLIDES,
  view: ProjectView,
});

export { metadata };
export default ProjectPage;
