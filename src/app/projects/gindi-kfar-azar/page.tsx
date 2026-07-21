import { createProjectPage } from "@/lib/projectPage";
import { DesignOne } from "./_components/DesignOne";
import { SEO_TITLE_TAG, IMAGE_ALT } from "./content";

const { metadata, ProjectPage } = createProjectPage({
  slug: "gindi-kfar-azar",
  title: SEO_TITLE_TAG,
  description: IMAGE_ALT,
  view: DesignOne,
});

export { metadata };
export default ProjectPage;
