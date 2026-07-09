import { CONTACT_CTA } from "@/lib/content";
import { LeadForm } from "./ui/LeadForm";
import { Reveal } from "./ui/Reveal";

export function ContactCta() {
  return (
    <section id="contact" className="surface-navy-950 section" aria-label={CONTACT_CTA.heading}>
      <div className="container-x max-w-3xl text-center">
        <Reveal>
          <h2 className="h2 text-white">{CONTACT_CTA.heading}</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-white/70 mt-4 text-lg">{CONTACT_CTA.line}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10">
            <LeadForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
