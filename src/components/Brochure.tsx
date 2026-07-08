import { BROCHURE } from "@/lib/content";
import { GlassButton } from "./ui/GlassButton";
import { Reveal } from "./ui/Reveal";

export function Brochure() {
  return (
    <section className="surface-navy-900" aria-label={BROCHURE.heading}>
      <div className="container-x py-16 md:py-20">
        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-8 py-10 md:px-12 md:py-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-start">
            <div>
              <h2 className="h2 text-white mb-2">{BROCHURE.heading}</h2>
              <p className="text-white/65">{BROCHURE.line}</p>
            </div>
            <div className="shrink-0">
              <GlassButton
                href="/brochure/print3d-brochure.pdf"
                variant="primary"
                target="_blank"
                rel="noopener"
              >
                {BROCHURE.cta}
              </GlassButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
