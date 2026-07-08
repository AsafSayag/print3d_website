import Image from "next/image";
import { Logo } from "@/components/ui/Logo";
import { GlassButton } from "@/components/ui/GlassButton";
import { CONTACT } from "@/lib/constants";
import { SpecSheet } from "./SpecSheet";
import { Gallery } from "./Gallery";
import { AboutProject } from "./AboutProject";
import { IMAGE_ALT, HERO, SPECS, ABOUT, GALLERY_IMAGES } from "../content";

/**
 * Design 1 — the editorial "case study" layout: full-bleed hero, spec sheet,
 * image gallery and an about accordion. Inherited from the gindi_v1 reference.
 */
export function DesignOne() {
  return (
    <main>
      {/* Minimal top bar — no homepage nav, just brand + a direct contact CTA.
          Sits to the right of the shared design toggle (top-left). */}
      <div className="absolute inset-x-0 top-0 z-10 container-x flex items-center justify-start py-6">
        <div className="flex items-center gap-4">
          <Logo variant="light" size={22} />
          <GlassButton
            href={CONTACT.emailHref}
            variant="primary"
            className="!py-2.5 !px-5 !text-[15px]"
          >
            בקשו הצעת מחיר
          </GlassButton>
        </div>
      </div>

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[440px] w-full overflow-hidden">
        <Image
          src={HERO.src}
          alt={IMAGE_ALT}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,13,23,0.92)] via-[rgba(7,13,23,0.35)] to-[rgba(7,13,23,0.15)]" />
        <div className="container-x relative h-full flex flex-col justify-end pb-14 text-white">
          <p className="eyebrow text-[color:var(--steel-300)] mb-3">
            {HERO.eyebrow}
          </p>
          <h1 className="h1 heading-accent max-w-3xl">{HERO.title}</h1>
          <span
            className="num mt-4 inline-flex w-fit items-center rounded-full border border-white/20 bg-black/30 px-3 py-1 text-sm backdrop-blur"
            dir="ltr"
          >
            {HERO.scale}
          </span>
        </div>
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

      {/* Minimal contact footer — no anchor links to homepage sections */}
      <footer className="surface-navy-950 border-t border-white/8">
        <div className="container-x py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo variant="light" size={22} />
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/75">
            <li>
              <a href={CONTACT.phoneHref} className="hover:text-white transition-colors" dir="ltr">
                {CONTACT.phone}
              </a>
            </li>
            <li>
              <a href={CONTACT.emailHref} className="hover:text-white transition-colors" dir="ltr">
                {CONTACT.email}
              </a>
            </li>
            <li className="text-white/60">{CONTACT.address}</li>
          </ul>
        </div>
      </footer>
    </main>
  );
}
