"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Logo } from "./ui/Logo";
import { GlassButton } from "./ui/GlassButton";
import { WhatsAppButton } from "./ui/WhatsAppButton";
import { NAV_ITEMS, CONTACT } from "@/lib/constants";
import { HERO_COPY } from "@/lib/content";

const SCROLL_THRESHOLD = 80;

export function Header({ transparent = false }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const onHome = pathname === "/";

  // On the transparent variant (used by a single project page) the bar never
  // tints or re-tints on scroll — it stays fully see-through over the hero.
  const isScrolled = transparent ? false : scrolled;

  // On the homepage the nav uses in-page hash anchors (with scroll-spy); from any
  // other route those same targets are reached by prefixing the homepage path, so
  // the header stays functional site-wide without changing homepage behaviour.
  // Items whose href is a real path (e.g. "/projects") link there directly.
  const toHome = (hash: string) => (onHome ? hash : `/${hash}`);
  const navHref = (href: string) => (href.startsWith("#") ? toHome(href) : href);
  const isNavCurrent = (href: string) =>
    href.startsWith("#") ? onHome && active === href.slice(1) : pathname === href;

  // Active-section highlight via a SINGLE IntersectionObserver — no
  // getBoundingClientRect on scroll frames at all. Each in-page nav target is
  // observed against a thin detection line at 35% of the viewport height (the
  // same line the old scroll handler compared against); the observer fires only
  // when a section crosses that line, never per frame. The section crossing the
  // line is the active one; during the small gaps between sections the last
  // active section is kept (matching the old "last section past the line").
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const ids = NAV_ITEMS.filter((n) => n.href.startsWith("#")).map((n) =>
      n.href.slice(1),
    );
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const intersecting = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) intersecting.add(e.target.id);
          else intersecting.delete(e.target.id);
        }
        // The deepest (last in nav order) section crossing the line wins. If
        // none currently cross it (a gap between sections), keep the last one.
        let current: string | null = null;
        for (const id of ids) if (intersecting.has(id)) current = id;
        if (current !== null) setActive(current);
      },
      // Collapse the root to a ~0-height band at 35% from the top: inset the top
      // by 35% and the bottom by 65%.
      { rootMargin: "-35% 0px -65% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Scrolled state (past the threshold) from a passive scroll listener that
  // reads ONLY window.scrollY — a scroll-position read, not a layout query, so
  // it never calls getBoundingClientRect or forces reflow. setState bails out
  // when the boolean is unchanged, so this only re-renders on the transition.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
        background: transparent
          ? "transparent"
          : isScrolled
            ? "rgba(7,13,23,0.9)"
            : "rgba(7,13,23,0.28)",
        backdropFilter: transparent
          ? "none"
          : isScrolled
            ? "blur(18px) saturate(150%)"
            : "blur(10px) saturate(130%)",
        WebkitBackdropFilter: transparent
          ? "none"
          : isScrolled
            ? "blur(18px) saturate(150%)"
            : "blur(10px) saturate(130%)",
        borderBottom: transparent
          ? "none"
          : isScrolled
            ? "1px solid rgba(62, 121, 159,0.22)"
            : "1px solid rgba(255,255,255,0.1)",
        boxShadow: transparent
          ? "none"
          : isScrolled
            ? "0 8px 30px rgba(7,13,23,0.35)"
            : "0 6px 24px rgba(7,13,23,0.25)",
      }}
    >
      {/* Persistent top scrim so the navbar stays defined over the hero.
          Skipped entirely on the transparent variant. */}
      {!transparent && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 transition-opacity duration-500"
          style={{
            height: "180%",
            background:
              "linear-gradient(to bottom, rgba(7,13,23,0.72), rgba(7,13,23,0))",
            opacity: isScrolled ? 0 : 1,
          }}
        />
      )}
      <div className="container-x relative flex items-center justify-between gap-6 h-[72px] md:h-20">
        <Logo size={34} />

        {/* Desktop nav — centered */}
        <nav
          aria-label="ניווט ראשי"
          className="hidden lg:flex items-center gap-8 absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={navHref(item.href)}
              aria-current={isNavCurrent(item.href) ? "page" : undefined}
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
              href={navHref(item.href)}
              aria-current={isNavCurrent(item.href) ? "page" : undefined}
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
            href="/faq"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            aria-current={pathname === "/faq" ? "page" : undefined}
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
            שאלות נפוצות
          </a>
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
                : `opacity 0.35s var(--ease-brand) ${open ? 0.05 * (NAV_ITEMS.length + 1) + 0.05 : 0}s, transform 0.35s var(--ease-brand) ${open ? 0.05 * (NAV_ITEMS.length + 1) + 0.05 : 0}s`,
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
