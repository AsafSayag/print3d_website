import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { LEGAL_UPDATED, LEGAL_UPDATED_ISO } from "@/lib/legal";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs: Crumb[];
  /** Last-updated line is hidden on the hub page. */
  showUpdated?: boolean;
};

/**
 * Dark, architectural hero for legal pages. Holds the single H1, a short
 * description, the breadcrumb trail and the last-updated date. The fixed header
 * sits over this navy surface, so generous top padding keeps content clear.
 */
export function LegalHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  showUpdated = true,
}: Props) {
  return (
    <section className="legal-hero pt-28 pb-14 sm:pt-32 sm:pb-16 md:pt-36 md:pb-20">
      <span className="legal-grid" aria-hidden="true" />
      <div className="container-x">
        <div className="mb-6 md:mb-8">
          <Breadcrumbs items={breadcrumbs} />
        </div>
        <p className="eyebrow text-[color:var(--steel-300)] mb-4">{eyebrow}</p>
        <h1 className="h1 heading-accent max-w-3xl">{title}</h1>
        <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
          {description}
        </p>
        {showUpdated && (
          <p className="mt-8 text-sm text-white/45">
            עודכן לאחרונה:{" "}
            <time dateTime={LEGAL_UPDATED_ISO} className="text-white/70">
              {LEGAL_UPDATED}
            </time>
          </p>
        )}
      </div>
    </section>
  );
}
