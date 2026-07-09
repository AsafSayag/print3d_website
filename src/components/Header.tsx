"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { Logo } from "./ui/Logo";
import { GlassButton } from "./ui/GlassButton";
import { WhatsAppButton } from "./ui/WhatsAppButton";
import { NAV_ITEMS, CONTACT } from "@/lib/constants";
import { HERO_COPY } from "@/lib/content";

const SCROLL_THRESHOLD = 80;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const onHome = pathname === "/";

  // On the homepage the nav uses in-page hash anchors (with scroll-spy); from any
  // other route those same targets are reached by prefixing the homepage path, so
  // the header stays functional site-wide without changing homepage behaviour.
  const toHome = (hash: string) => (onHome ? hash : `/${hash}`);

  // rAF-driven: tracks the scrolled state and the active section (scroll-spy).
  useEffect(() => {
    let raf = 0;
    let frame = 0;
    const ids = NAV_ITEMS.map((n) => n.href.slice(1));

    const tick = () => {
      if (frame++ % 5 === 0) {
        setScrolled(window.scrollY > SCROLL_THRESHOLD);
        const line = window.innerHeight * 0.35;
        let current: string | null = null;
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= line) current = id;
        }
        setActive(current);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-500"
      style={{
        background: scrolled ? "rgba(7,13,23,0.9)" : "rgba(7,13,23,0.28)",
        backdropFilter: scrolled
          ? "blur(18px) saturate(150%)"
          : "blur(10px) saturate(130%)",
        WebkitBackdropFilter: scrolled
          ? "blur(18px) saturate(150%)"
          : "blur(10px) saturate(130%)",
        borderBottom: scrolled
          ? "1px solid rgba(199,165,102,0.22)"
          : "1px solid rgba(255,255,255,0.1)",
        boxShadow: scrolled
          ? "0 8px 30px rgba(7,13,23,0.35)"
          : "0 6px 24px rgba(7,13,23,0.25)",
      }}
    >
      {/* Persistent top scrim so the navbar stays defined over the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 transition-opacity duration-500"
        style={{
          height: "180%",
          background:
            "linear-gradient(to bottom, rgba(7,13,23,0.72), rgba(7,13,23,0))",
          opacity: scrolled ? 0 : 1,
        }}
      />
      <div className="container-x relative flex items-center justify-between gap-6 h-[72px] md:h-20">
        <Logo variant="light" size={24} />

        {/* Desktop nav — centered */}
        <nav
          aria-label="ניווט ראשי"
          className="hidden lg:flex items-center gap-8 absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={toHome(item.href)}
              aria-current={
                onHome && active === item.href.slice(1) ? "page" : undefined
              }
              className="nav-link text-[15px] font-[var(--font-body)] text-white/85 hover:text-white aria-[current=page]:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href={CONTACT.contactPath}
            aria-current={pathname === CONTACT.contactPath ? "page" : undefined}
            className="nav-link text-[15px] font-[var(--font-body)] text-white/85 hover:text-white aria-[current=page]:text-white transition-colors"
          >
            צור קשר
          </a>
        </nav>

        {/* End cluster (left under RTL): WhatsApp + CTA (desktop) + hamburger */}
        <div className="flex items-center gap-2 md:gap-3">
          <WhatsAppButton contactHref={CONTACT.contactPath} />

          <div className="hidden lg:block">
            <GlassButton
              href={CONTACT.contactPath}
              variant="primary"
              className="!py-2.5 !px-5 !text-[15px]"
            >
              {HERO_COPY.primaryCta}
            </GlassButton>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={open ? "סגירת תפריט" : "פתיחת תפריט"}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex flex-col justify-center gap-[5px] w-11 h-11 items-center"
          >
            <span
              className="block h-[2px] w-6 bg-white transition-transform duration-300"
              style={{ transform: open ? "translateY(7px) rotate(45deg)" : "none" }}
            />
            <span
              className="block h-[2px] w-6 bg-white transition-opacity duration-300"
              style={{ opacity: open ? 0 : 1 }}
            />
            <span
              className="block h-[2px] w-6 bg-white transition-transform duration-300"
              style={{ transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }}
            />
          </button>
        </div>
      </div>
    </header>

      {/* Mobile drawer — rendered OUTSIDE <header> so its fixed positioning is
          viewport-relative (inside the header, whose backdrop-filter makes it
          the containing block, the drawer collapsed to zero height).

          Kept permanently mounted and toggled purely via CSS. An AnimatePresence
          version left the panel mounted at opacity 0 after closing, where — now
          that it spans the full viewport — it silently blocked every tap on the
          page. pointer-events:none + delayed visibility make "closed" inert. */}
      <div
        id="mobile-drawer"
        className="lg:hidden fixed inset-x-0 top-[72px] bottom-0 z-40"
        aria-hidden={!open}
        style={{
          // Frosted glass: a strong dark tint obscures the hero even where
          // backdrop-filter is unavailable, while the blur adds the premium
          // frost on devices that support it.
          background: "rgba(9, 16, 28, 0.9)",
          backdropFilter: "blur(28px) saturate(140%)",
          WebkitBackdropFilter: "blur(28px) saturate(140%)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          visibility: open ? "visible" : "hidden",
          transition: reduce
            ? "none"
            : `opacity 0.3s var(--ease-brand), visibility 0s linear ${open ? "0s" : "0.3s"}`,
        }}
      >
        <nav
          aria-label="ניווט ראשי"
          className="container-x flex flex-col gap-1 pt-8"
        >
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.href}
              href={toHome(item.href)}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className="text-2xl text-white/90 py-3 border-b border-white/10"
              style={{
                fontFamily: "var(--font-display), serif",
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(12px)",
                transition: reduce
                  ? "none"
                  : `opacity 0.35s var(--ease-brand) ${open ? 0.05 * i + 0.05 : 0}s, transform 0.35s var(--ease-brand) ${open ? 0.05 * i + 0.05 : 0}s`,
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href={CONTACT.contactPath}
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            aria-current={pathname === CONTACT.contactPath ? "page" : undefined}
            className="text-2xl text-white/90 py-3 border-b border-white/10"
            style={{
              fontFamily: "var(--font-display), serif",
              opacity: open ? 1 : 0,
              transform: open ? "none" : "translateY(12px)",
              transition: reduce
                ? "none"
                : `opacity 0.35s var(--ease-brand) ${open ? 0.05 * NAV_ITEMS.length + 0.05 : 0}s, transform 0.35s var(--ease-brand) ${open ? 0.05 * NAV_ITEMS.length + 0.05 : 0}s`,
            }}
          >
            צור קשר
          </a>
          <div className="pt-6">
            <GlassButton href={CONTACT.contactPath} variant="primary" onClick={() => setOpen(false)}>
              {HERO_COPY.primaryCta}
            </GlassButton>
          </div>
        </nav>
      </div>
    </>
  );
}
