import Link from "next/link";
import { Logo } from "./ui/Logo";
import { GlassButton } from "./ui/GlassButton";
import { PreferredSource } from "./PreferredSource";
import { CONTACT, SOCIAL_LINKS } from "@/lib/constants";
import { analyticsAttrs } from "@/lib/analytics";
import { FOOTER } from "@/lib/content";
import { LEGAL_HUB, LEGAL_LINKS } from "@/lib/legal";

/** The legal bar: the hub itself first, then each document under it. */
const LEGAL_BAR_LINKS = [
  { label: LEGAL_HUB.navLabel, href: LEGAL_HUB.path },
  ...LEGAL_LINKS,
];

export function Footer({
  quoteHref = CONTACT.contactPath,
}: {
  /** Where the footer's "get a quote" CTA points. On the contact page this is
   *  set to the in-page form anchor (#contact) instead of routing to /contact. */
  quoteHref?: string;
}) {
  return (
    <footer className="surface-navy-950 border-t border-white/8">
      <div className="container-x py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 — brand + contact */}
          <div className="lg:col-span-1 max-md:text-center">
            <Logo size={52} withSubtitle />
            <p className="text-white/75 text-sm mt-4 leading-relaxed max-w-xs max-md:mx-auto">
              {FOOTER.tagline}
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              <li>
                <a
                  href={CONTACT.phoneHref}
                  {...analyticsAttrs("phone_click", {
                    location: "footer",
                    phone_type: "office",
                  })}
                  className="text-white/85 hover:text-white transition-colors"
                  dir="ltr"
                >
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
            <ul className="mt-5 flex items-center gap-3 max-md:justify-center">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Print3D ב${social.label} (נפתח בחלון חדש)`}
                    className="block transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <SocialIcon name={social.name} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columns 2+3 — company & knowledge. Paired side by side on mobile
              via this 2-col sub-grid; at md: it becomes `display:contents`,
              so the wrapper vanishes from the layout tree entirely and
              the two columns rejoin the outer grid as plain direct
              children — the exact, untouched desktop structure as before.
              Both are driven off FOOTER.columns so the footer's link set is
              declared in one place and stays complete. */}
          <div className="grid grid-cols-2 gap-10 md:contents">
            {[FOOTER.columns.company, FOOTER.columns.knowledge].map((column) => (
              <FooterColumn key={column.title} title={column.title}>
                {column.links.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </FooterColumn>
            ))}
          </div>

          {/* Column 4 — CTA + small location map */}
          <div className="max-md:text-center">
            <h3 className="font-display text-lg text-white mb-4">
              {FOOTER.ctaTitle}
            </h3>
            <GlassButton
              href={quoteHref}
              variant="primary"
              {...analyticsAttrs("cta_click", {
                cta_name: "quote_request",
                location: "footer",
              })}
            >
              {FOOTER.ctaButton}
            </GlassButton>

            {/* Small location map, directly under the CTA button */}
            <a
              href={CONTACT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`המיקום שלנו, ${CONTACT.address}, פתיחה ב־Google Maps`}
              className="group mt-6 block w-56 max-w-full overflow-hidden rounded-xl border border-white/12 bg-white/[0.03] shadow-[0_18px_40px_-30px_rgba(0,0,0,0.8)] transition-colors hover:border-white/25 max-md:mx-auto"
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
            accessibility statement — grouped together on the other, with the
            opt-in "make Print3D a preferred source in Google" button sharing
            that same row. `items-center` on both this row and the group is what
            keeps the button vertically centred against the legal links rather
            than sitting below them. */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col items-center gap-4 text-center text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between sm:text-start">
          <span dir="ltr">{FOOTER.copyright}</span>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <nav aria-label="קישורים משפטיים">
              <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:justify-end">
                {LEGAL_BAR_LINKS.map((link) => (
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
            <PreferredSource />
          </div>
        </div>

        {/* Builder signature — the site's final line, centered on every page. */}
        <div className="mt-8 text-center text-xs text-white/45" dir="rtl">
          נבנה על ידי{" "}
          <span className="text-white/70" dir="ltr">Asaf Sayag</span>
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
    <div className="max-md:text-center">
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

/** Official brand marks in their real colours, so each network is instantly
 *  recognisable (Facebook's blue disc, Instagram's gradient, LinkedIn's blue tile). */
function SocialIcon({ name }: { name: (typeof SOCIAL_LINKS)[number]["name"] }) {
  const common = { viewBox: "0 0 24 24", className: "h-8 w-8", "aria-hidden": true } as const;
  switch (name) {
    case "Facebook":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="11.5" fill="#fff" />
          <path
            fill="#0866FF"
            d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"
          />
        </svg>
      );
    case "Instagram":
      return (
        <svg {...common}>
          <defs>
            <radialGradient id="ig-grad" cx="0.3" cy="1.07" r="1.2">
              <stop offset="0" stopColor="#FFDD55" />
              <stop offset="0.1" stopColor="#FFDD55" />
              <stop offset="0.5" stopColor="#FF543E" />
              <stop offset="1" stopColor="#C837AB" />
            </radialGradient>
            <radialGradient id="ig-grad-2" cx="-0.17" cy="0.07" r="0.6">
              <stop offset="0" stopColor="#3771C8" />
              <stop offset="0.13" stopColor="#3771C8" />
              <stop offset="1" stopColor="#6600FF" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="24" height="24" rx="6" fill="url(#ig-grad)" />
          <rect width="24" height="24" rx="6" fill="url(#ig-grad-2)" />
          <g fill="none" stroke="#fff" strokeWidth="1.8">
            <rect x="5" y="5" width="14" height="14" rx="4" />
            <circle cx="12" cy="12" r="3.4" />
          </g>
          <circle cx="16.1" cy="7.9" r="0.95" fill="#fff" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg {...common}>
          <rect width="24" height="24" rx="4" fill="#0A66C2" />
          <path
            fill="#fff"
            d="M7.3 9.6H4.7V19h2.6V9.6ZM6 5.1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM19.3 13.8c0-2.6-1.4-4.4-3.8-4.4-1.2 0-2.1.6-2.5 1.3V9.6h-2.6V19H13v-5c0-1.3.5-2.3 1.8-2.3s1.7 1 1.7 2.3v5h2.8v-5.2Z"
          />
        </svg>
      );
  }
}
