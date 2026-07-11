import Image from "next/image";
import { Footer } from "@/components/Footer";
import { SpecSheet } from "./SpecSheet";
import { ScrollHint } from "./ScrollHint";
import { Gallery } from "./Gallery";
import { AboutProject } from "./AboutProject";
import {
  IMAGE_ALT,
  HERO,
  DESIGN_ONE_HERO_SLIDES,
  SPECS,
  ABOUT,
  GALLERY_IMAGES,
} from "../content";

/**
 * Design 1 — the editorial "case study" layout: full-bleed hero, spec sheet,
 * image gallery and an about accordion. Inherited from the gindi_v1 reference.
 */
export function DesignOne() {
  return (
    <main>
      {/* Hero — fills the viewport so only it (plus the headline) shows on entry;
          the second section sits just past the fold. Anchored to the bottom so the
          street-level foreground of the shot stays visible. */}
      <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-[color:var(--navy-950)]">
        {DESIGN_ONE_HERO_SLIDES.map((src, i) => (
          <div
            key={src}
            className="kb-slide absolute inset-0"
            style={{ animationDelay: `${i * 3}s` }}
          >
            <Image
              src={src}
              alt={IMAGE_ALT}
              fill
              priority={i === 0}
              loading={i === 0 ? undefined : "eager"}
              sizes="100vw"
              className="object-cover object-[center_55%]"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,13,23,0.92)] via-[rgba(7,13,23,0.32)] to-[rgba(7,13,23,0.12)]" />
        <div className="container-x relative h-full flex flex-col items-center justify-center text-center text-white">
          <p className="eyebrow text-[color:var(--steel-300)] mb-3">
            {HERO.eyebrow}
          </p>
          <h1 className="h1 heading-accent heading-accent--center max-w-3xl">
            {HERO.title}
          </h1>
          <span
            className="num mt-4 inline-flex w-fit items-center rounded-full border border-white/20 bg-black/30 px-3 py-1 text-sm backdrop-blur"
            dir="ltr"
          >
            {HERO.scale}
          </span>
        </div>
        <ScrollHint />
      </section>

      {/* Spec sheet */}
      <section className="section surface-white">
        <div className="container-x max-w-4xl">
          <h2 className="h2 heading-accent mb-10">מפרט המודל</h2>
          <SpecSheet rows={SPECS} />
        </div>
      </section>

      {/* Gallery */}
      <section className="section surface-ice">
        <div className="container-x">
          <h2 className="h2 heading-accent mb-10">תמונות המודל</h2>
          <Gallery images={GALLERY_IMAGES} alt={IMAGE_ALT} />
        </div>
      </section>

      {/* About project */}
      <section className="section surface-white">
        <div className="container-x max-w-4xl">
          <AboutProject about={ABOUT} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
