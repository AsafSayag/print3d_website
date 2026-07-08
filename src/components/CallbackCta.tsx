import { CALLBACK_CTA } from "@/lib/content";
import { GlassButton } from "./ui/GlassButton";
import { Reveal } from "./ui/Reveal";

export function CallbackCta() {
  return (
    <section
      id="callback"
      className="surface-navy-950"
      aria-label="צור קשר בשיחת טלפון"
    >
      <div className="container-x py-14 md:py-20">
        <Reveal>
          {/* Luxury brand card — button left, text right (RTL) */}
          <div className="lux-card px-8 py-10 md:px-12 md:py-12 flex flex-col md:flex-row items-center gap-8 text-center md:text-start">
            {/* Text — right */}
            <div className="flex-1">
              <h2 className="h3 md:text-[1.8rem] text-white leading-snug text-balance">
                {CALLBACK_CTA.textPre}
                <span className="text-[color:var(--gold-400)]">
                  {CALLBACK_CTA.textHighlight}
                </span>
                {CALLBACK_CTA.textPost}
              </h2>
            </div>

            {/* Button — left */}
            <div className="shrink-0">
              <GlassButton href="#contact" variant="primary">
                {CALLBACK_CTA.button}
              </GlassButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
