import { Footer } from "@/components/Footer";
import { Faq } from "@/components/Faq";
import { TechnicalSpec, type SpecRow } from "@/components/project/TechnicalSpec";
import { HeroSlider } from "@/components/project/HeroSlider";
import { Gallery } from "@/components/project/Gallery";
import { ProjectCta } from "@/components/project/ProjectCta";
import { RelatedProjects } from "@/components/project/RelatedProjects";
import type { Project } from "@/lib/portfolioContent";
import type { GalleryItem } from "@/lib/projectImages";

/**
 * The project page layout: full-bleed hero, spec sheet and image gallery.
 */
export function ProjectView({ hero, heroSlides, imageAlt, galleryItems, specBg, specs, related }: {
  hero: { eyebrow?: string; title: string };
  heroSlides: string[];
  imageAlt: string;
  galleryItems: GalleryItem[];
  specBg: string;
  specs: readonly SpecRow[];
  /** Other case studies to link to after the gallery. */
  related: Project[];
}) {
  return (
    <main>
      {/* Hero — full-bleed image slider with manual arrows + auto-advance. */}
      <HeroSlider
        slides={heroSlides}
        alt={imageAlt}
        eyebrow={hero.eyebrow}
        title={hero.title}
      />

      {/* מפרט טכני — dark, full-bleed section with a frosted-glass spec panel. */}
      <TechnicalSpec specBg={specBg} specs={specs} />

      {/* Gallery */}
      <section id="gallery" className="section surface-ice">
        <div className="container-x">
          <h2 className="h2 heading-accent mb-10">תמונות נוספות</h2>
          <Gallery items={galleryItems} alt={imageAlt} />
        </div>
      </section>

      <RelatedProjects projects={related} />

      <ProjectCta projectName={hero.title} />

      <Faq />

      <Footer />
    </main>
  );
}
