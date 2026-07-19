import Link from "next/link";
import { Logo } from "./ui/Logo";
import { GlassButton } from "./ui/GlassButton";
import { CONTACT, NAV_ITEMS } from "@/lib/constants";
import { FOOTER } from "@/lib/content";
import { LEGAL_LINKS } from "@/lib/legal";

export function Footer() {
  return (
    <footer className="surface-navy-950 border-t border-white/8">
      <div className="container-x py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 — brand + contact */}
          <div className="lg:col-span-1">
            <Logo size={52} withSubtitle />
            <p className="text-white/75 text-sm mt-4 leading-relaxed max-w-xs">
              {FOOTER.tagline}
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              <li>
                <a href={CONTACT.phoneHref} className="text-white/85 hover:text-white transition-colors" dir="ltr">
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={CONTACT.emailHref} className="text-white/85 hover:text-white transition-colors" dir="ltr">
                  {CONTACT.email}
                </a>
              </li>
              <li className="text-white/75">{CONTACT.address}</li>
            </ul>
          </div>

          {/* Columns 2+3 — services & company. Paired side by side on mobile
              via this 2-col sub-grid; at md: it becomes `display:contents`,
              so the wrapper vanishes from the layout tree entirely and
              services/company rejoin the outer grid as plain direct
              children — the exact, untouched desktop structure as before. */}
          <div className="grid grid-cols-2 gap-10 md:contents">
            <FooterColumn title={FOOTER.columns.services.title}>
              <li>
                <Link
                  href="/knowledge"
                  className="text-white/80 hover:text-white text-sm transition-colors"
                >
                  מרכז הידע
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-white/80 hover:text-white text-sm transition-colors"
                >
                  שאלות נפוצות
                </Link>
              </li>
              <li>
                <Link
                  href={CONTACT.contactPath}
                  className="text-white/80 hover:text-white text-sm transition-colors"
                >
                  צור קשר
                </Link>
              </li>
            </FooterColumn>

            <FooterColumn title={FOOTER.columns.company.title}>
              {NAV_ITEMS.filter((n) =>
                (FOOTER.columns.company.items as readonly string[]).includes(
                  n.label,
                ),
              ).map((item) => (
                <FooterLink key={item.href} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </FooterColumn>
          </div>

          {/* Column 4 — CTA + small location map */}
          <div>
            <h3 className="font-display text-lg text-white mb-4">
              {FOOTER.ctaTitle}
            </h3>
            <GlassButton href={CONTACT.contactPath} variant="primary">
              {FOOTER.ctaButton}
            </GlassButton>

            {/* Small location map, directly under the CTA button */}
            <a
              href={CONTACT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`המיקום שלנו, ${CONTACT.address}, פתיחה ב־Google Maps`}
              className="group mt-6 block w-56 max-w-full overflow-hidden rounded-xl border border-white/12 bg-white/[0.03] shadow-[0_18px_40px_-30px_rgba(0,0,0,0.8)] transition-colors hover:border-white/25"
            >
              <iframe
                src={CONTACT.mapsEmbedUrl}
                title={`מפת מיקום, ${CONTACT.address}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                tabIndex={-1}
                aria-hidden="true"
                className="pointer-events-none block h-28 w-full grayscale-[0.2] opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                style={{ border: 0 }}
              />
              <span className="flex items-center gap-1.5 px-3 py-2 text-xs text-white/75 group-hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-[color:var(--gold-400)]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 10c0 5-8 12-8 12s-8-7-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="2.6" />
                </svg>
                {CONTACT.address}
              </span>
            </a>
          </div>
        </div>

        {/* Copyright on one side, the full legal list — including the
            accessibility statement — grouped together on the other. */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col items-center gap-4 text-center text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between sm:text-start">
          <span dir="ltr">{FOOTER.copyright}</span>
          <nav aria-label="קישורים משפטיים">
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:justify-end">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-display text-lg text-white mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  // In-page hash targets (e.g. "#process") only exist on the homepage, so from
  // any other route prefix them with "/" to jump home and then scroll — the
  // same behaviour the header nav uses. Real paths pass through unchanged.
  const resolved = href.startsWith("#") ? `/${href}` : href;
  return (
    <li>
      <a
        href={resolved}
        className="text-white/80 hover:text-white text-sm transition-colors"
      >
        {children}
      </a>
    </li>
  );
}
