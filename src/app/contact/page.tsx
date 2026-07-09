import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Faq } from "@/components/Faq";
import { ContactHero } from "@/components/ContactHero";
import { LegalJsonLd } from "@/components/legal/LegalJsonLd";
import type { Crumb } from "@/components/legal/Breadcrumbs";
import { LeadForm } from "@/components/ui/LeadForm";
import { Reveal } from "@/components/ui/Reveal";
import { GlassButton } from "@/components/ui/GlassButton";
import { buildPageMeta } from "@/lib/pageMeta";
import { CONTACT } from "@/lib/constants";
import { CONTACT_PAGE } from "@/lib/content";

export const metadata: Metadata = buildPageMeta({
  title: CONTACT_PAGE.eyebrow,
  description: CONTACT_PAGE.subtitle,
  path: "/contact",
});

const breadcrumbs: Crumb[] = [
  { label: "בית", href: "/" },
  { label: CONTACT_PAGE.eyebrow },
];

export default function ContactPage() {
  return (
    <>
      <LegalJsonLd
        title={CONTACT_PAGE.title}
        description={CONTACT_PAGE.subtitle}
        path="/contact"
        breadcrumbs={breadcrumbs}
      />
      <a href="#main" className="skip-link">
        דלגו לתוכן הראשי
      </a>
      <Header />
      <main id="main" className="flex-1">
        <ContactHero
          eyebrow={CONTACT_PAGE.eyebrow}
          title={CONTACT_PAGE.title}
          description={CONTACT_PAGE.subtitle}
          breadcrumbs={breadcrumbs}
        />

        {/* Details + form */}
        <section
          className="surface-ice section"
          aria-label={CONTACT_PAGE.formTitle}
        >
          <div className="container-x">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-14 items-start">
              {/* Lead form in a dark card — shown first */}
              <Reveal>
                <div className="surface-navy-950 rounded-3xl p-6 sm:p-9 shadow-[0_30px_70px_-40px_rgba(10,21,38,0.55)]">
                  <h2 className="h3 text-white">{CONTACT_PAGE.formTitle}</h2>
                  <p className="text-white/60 mt-2 mb-7">
                    {CONTACT_PAGE.formSubtitle}
                  </p>
                  <LeadForm />
                </div>
              </Reveal>

              {/* Company details */}
              <Reveal delay={0.08}>
                <div>
                  <h2 className="h2 heading-accent text-[color:var(--ink-950)]">
                    {CONTACT_PAGE.detailsTitle}
                  </h2>
                  <p className="mt-4 text-[color:var(--ink-950)]/65 text-lg leading-relaxed max-w-md">
                    {CONTACT_PAGE.detailsSubtitle}
                  </p>

                  <ul className="mt-8 space-y-3">
                    <DetailRow
                      icon={<BuildingIcon />}
                      label={CONTACT_PAGE.labels.company}
                      value={CONTACT_PAGE.companyName}
                    />
                    <DetailRow
                      icon={<PinIcon />}
                      label={CONTACT_PAGE.labels.address}
                      value={CONTACT.address}
                      href={CONTACT.mapsUrl}
                      external
                    />
                    <DetailRow
                      icon={<PhoneIcon />}
                      label={CONTACT_PAGE.labels.phone}
                      value={CONTACT.phone}
                      href={CONTACT.phoneHref}
                      ltr
                    />
                    <DetailRow
                      icon={<MailIcon />}
                      label={CONTACT_PAGE.labels.email}
                      value={CONTACT.email}
                      href={CONTACT.emailHref}
                      ltr
                    />
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="surface-white section" aria-label={CONTACT_PAGE.map.title}>
          <div className="container-x">
            <Reveal>
              <p className="eyebrow text-[color:var(--gold-700)] mb-3">
                {CONTACT_PAGE.map.eyebrow}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="h2 heading-accent text-[color:var(--ink-950)]">
                    {CONTACT_PAGE.map.title}
                  </h2>
                  <p className="mt-4 text-[color:var(--ink-950)]/65 text-lg">
                    {CONTACT_PAGE.map.subtitle}
                  </p>
                </div>
                <div className="on-light shrink-0">
                  <GlassButton
                    href={CONTACT.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {CONTACT_PAGE.map.button}
                  </GlassButton>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-8 rounded-3xl overflow-hidden border border-[color:var(--ink-950)]/10 shadow-[0_24px_60px_-40px_rgba(10,21,38,0.5)]">
                <iframe
                  src={CONTACT.mapsEmbedUrl}
                  title={`מפת מיקום — ${CONTACT.address}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[360px] md:h-[460px] block"
                  style={{ border: 0 }}
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ — reused from the homepage */}
        <Faq />
      </main>
      <Footer />
    </>
  );
}

function DetailRow({
  icon,
  label,
  value,
  href,
  ltr,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  ltr?: boolean;
  external?: boolean;
}) {
  const valueEl = href ? (
    <a
      href={href}
      dir={ltr ? "ltr" : undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="font-display text-lg text-[color:var(--ink-950)] hover:text-[color:var(--gold-700)] transition-colors break-words"
    >
      {value}
    </a>
  ) : (
    <span dir={ltr ? "ltr" : undefined} className="font-display text-lg text-[color:var(--ink-950)] break-words">
      {value}
    </span>
  );

  return (
    <li className="flex items-start gap-4 rounded-2xl border border-[color:var(--ink-950)]/8 bg-white p-5">
      <span
        aria-hidden="true"
        className="shrink-0 grid place-items-center w-11 h-11 rounded-xl bg-[color:var(--navy-950)] text-[color:var(--gold-400)]"
      >
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block caption text-[color:var(--ink-950)]/50">{label}</span>
        <span className="block mt-0.5">{valueEl}</span>
      </span>
    </li>
  );
}

/* Inline icons — 20px, currentColor, decorative (wrapped in aria-hidden spans). */
const iconProps = {
  viewBox: "0 0 24 24",
  className: "w-5 h-5",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function BuildingIcon() {
  return (
    <svg {...iconProps}>
      <path d="M3 21h18M6 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16M14 21V9h3a1 1 0 0 1 1 1v11" />
      <path d="M9 7h2M9 11h2M9 15h2" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg {...iconProps}>
      <path d="M20 10c0 5-8 12-8 12s-8-7-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg {...iconProps}>
      <path d="M6.5 3.5h3l1.5 5-2 1.5a12 12 0 0 0 5 5l1.5-2 5 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 5.5a2 2 0 0 1 2-2Z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}
