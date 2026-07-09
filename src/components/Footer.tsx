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
            <Logo variant="light" size={28} />
            <p className="text-white/60 text-sm mt-4 leading-relaxed max-w-xs">
              {FOOTER.tagline}
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              <li>
                <a href={CONTACT.phoneHref} className="text-white/75 hover:text-white transition-colors" dir="ltr">
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={CONTACT.emailHref} className="text-white/75 hover:text-white transition-colors" dir="ltr">
                  {CONTACT.email}
                </a>
              </li>
              <li className="text-white/60">{CONTACT.address}</li>
            </ul>
          </div>

          {/* Column 2 — services */}
          <FooterColumn title={FOOTER.columns.services.title}>
            {FOOTER.columns.services.items.map((item) => (
              <FooterLink key={item} href="#services">
                {item}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Column 3 — company */}
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

          {/* Column 4 — CTA */}
          <div>
            <h3 className="font-display text-lg text-white mb-4">
              {FOOTER.ctaTitle}
            </h3>
            <GlassButton href="#contact" variant="primary">
              {FOOTER.ctaButton}
            </GlassButton>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-white/50">
          <span dir="ltr">{FOOTER.copyright}</span>
          <nav aria-label="קישורים משפטיים">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white/80 transition-colors"
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
  return (
    <li>
      <a
        href={href}
        className="text-white/65 hover:text-white text-sm transition-colors"
      >
        {children}
      </a>
    </li>
  );
}
