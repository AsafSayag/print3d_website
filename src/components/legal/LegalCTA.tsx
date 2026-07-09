import { GlassButton } from "@/components/ui/GlassButton";
import { Reveal } from "@/components/ui/Reveal";
import { LEGAL_CTA } from "@/lib/legal";

/**
 * Closing call-to-action shared by every legal page. Links to the contact form
 * on the homepage. Mirrors the dark, centered CTA rhythm used across the site.
 */
export function LegalCTA() {
  return (
    <section className="surface-navy-950 section" aria-label={LEGAL_CTA.title}>
      <div className="container-x max-w-2xl text-center">
        <Reveal>
          <h2 className="h2 text-white">{LEGAL_CTA.title}</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-white/70 mt-4 text-lg">{LEGAL_CTA.text}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 flex justify-center">
            <GlassButton href="/contact" variant="primary">
              {LEGAL_CTA.button}
            </GlassButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
