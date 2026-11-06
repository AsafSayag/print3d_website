import { createProjectPage } from "@/lib/projectPage";
import {
  SEO_TITLE_TAG,
  META_DESCRIPTION,
  SPECS,
  HERO_SLIDES,
  HERO,
  IMAGE_ALT,
  GALLERY_ITEMS,
  SPEC_BG,
} from "./content";

const { metadata, ProjectPage } = createProjectPage({
  slug: "sela-baitar-hadera",
  title: SEO_TITLE_TAG,
  description: META_DESCRIPTION,
  specs: SPECS,
  images: HERO_SLIDES,
  hero: HERO,
  imageAlt: IMAGE_ALT,
  galleryItems: GALLERY_ITEMS,
  specBg: SPEC_BG,
});

export { metadata };
export default ProjectPage;
