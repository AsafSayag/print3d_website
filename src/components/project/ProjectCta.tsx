import { GlassButton } from "@/components/ui/GlassButton";
import { analyticsAttrs } from "@/lib/analytics";
import { CONTACT, whatsappHref } from "@/lib/constants";

/** Shared next step after every case-study gallery. */
export function ProjectCta({ projectName }: { projectName: string }) {
  return (
    <section className="surface-navy-950 py-14 md:py-20" aria-labelledby="project-cta-title">
      <div className="container-x mx-auto max-w-3xl text-center">
        <h2 id="project-cta-title" className="h2 heading-accent heading-accent--center text-white">
          רוצים מודל כזה לפרויקט שלכם?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
          שלחו תוכניות או תיאור קצר של הפרויקט, ונחזור עם הצעת מחיר ולוח זמנים תוך יום עסקים.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <GlassButton
            href={CONTACT.contactPath}
            variant="primary"
            {...analyticsAttrs("cta_click", { cta_name: "quote_request", location: "project_case_study" })}
          >
            קבלו הצעת מחיר
          </GlassButton>
          <a
            href={whatsappHref(`היי, ראיתי את ${projectName} באתר Print3D. אשמח לשמוע על מודל דומה לפרויקט שלי.`)}
            target="_blank"
            rel="noopener noreferrer"
            {...analyticsAttrs("whatsapp_click", { location: "project_case_study" })}
            className="glass-btn"
          >
            שלחו פרטים בוואטסאפ
          </a>
        </div>
      </div>
    </section>
  );
}
