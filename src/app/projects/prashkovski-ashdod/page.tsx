import { createProjectPage } from "@/lib/projectPage";
import { ProjectView } from "./_components/ProjectView";
import { SEO_TITLE_TAG, IMAGE_ALT } from "./content";

const { metadata, ProjectPage } = createProjectPage({
  slug: "prashkovski-ashdod",
  title: SEO_TITLE_TAG,
  description: IMAGE_ALT,
  view: ProjectView,
});

export { metadata };
export default ProjectPage;
