import { GlassButton } from "@/components/ui/GlassButton";
import { Reveal } from "@/components/ui/Reveal";
import { CONTACT } from "@/lib/constants";
import { PORTFOLIO_CTA } from "@/lib/portfolioContent";

/**
 * Deliberately not the standard centered CTA card (see ContactBand /
 * CallbackCta) — an asymmetric editorial split, divided by a single thin gold
 * rule, on the same engineering-grid navy surface used elsewhere on the site.
 */
export function PortfolioCta() {
  return (
    <section
      className="surface-navy-950 section relative isolate overflow-hidden"
      aria-label={PORTFOLIO_CTA.title}
    >
      <div className="absolute inset-0 cta-grid opacity-60" aria-hidden />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 15% 15%, rgba(62, 121, 159,0.09), transparent 60%), radial-gradient(60% 50% at 85% 85%, rgba(110,147,184,0.1), transparent 60%)",
        }}
        aria-hidden
      />

      <div className="container-x relative">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1px_1fr] md:gap-12 items-center">
          <Reveal>
            <div>
              <p className="eyebrow text-[color:var(--gold-400)] mb-4">
                {PORTFOLIO_CTA.eyebrow}
              </p>
              <h2 className="h1 text-white text-balance leading-[1.1]">
                {PORTFOLIO_CTA.title}
              </h2>
            </div>
          </Reveal>

          <div
            aria-hidden
            className="hidden md:block w-px h-full min-h-[140px] bg-gradient-to-b from-transparent via-[color:var(--gold-500)]/60 to-transparent justify-self-center"
          />

          <Reveal delay={0.1}>
            <div>
              <p className="text-white/70 text-lg leading-relaxed max-w-sm">
                {PORTFOLIO_CTA.text}
              </p>
              <div className="mt-8">
                <GlassButton href={CONTACT.contactPath} variant="primary">
                  {PORTFOLIO_CTA.button}
                </GlassButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
