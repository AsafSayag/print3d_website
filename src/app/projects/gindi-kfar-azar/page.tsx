import { createProjectPage } from "@/lib/projectPage";
import { DesignOne } from "./_components/DesignOne";
import {
  SEO_TITLE_TAG,
  META_DESCRIPTION,
  SPECS,
  HERO_SLIDES,
} from "./content";

const { metadata, ProjectPage } = createProjectPage({
  slug: "gindi-kfar-azar",
  title: SEO_TITLE_TAG,
  description: META_DESCRIPTION,
  specs: SPECS,
  images: HERO_SLIDES,
  view: DesignOne,
});

export { metadata };
export default ProjectPage;
