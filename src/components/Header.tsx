"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Logo } from "./ui/Logo";
import { GlassButton } from "./ui/GlassButton";
import { WhatsAppButton } from "./ui/WhatsAppButton";
import { NAV_ITEMS } from "@/lib/constants";
import { HERO_COPY } from "@/lib/content";

const SCROLL_THRESHOLD = 80;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

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
              href={item.href}
              aria-current={
                active === item.href.slice(1) ? "page" : undefined
              }
              className="nav-link text-[15px] font-[var(--font-body)] text-white/85 hover:text-white aria-[current=page]:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* End cluster (left under RTL): WhatsApp + CTA (desktop) + hamburger */}
        <div className="flex items-center gap-2 md:gap-3">
          <WhatsAppButton />

          <div className="hidden lg:block">
            <GlassButton
              href="#contact"
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

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-drawer"
            className="lg:hidden fixed inset-0 top-[72px] z-40"
            initial={reduce ? undefined : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ background: "rgba(7,13,23,0.97)", backdropFilter: "blur(12px)" }}
          >
            <nav
              aria-label="ניווט ראשי"
              className="container-x flex flex-col gap-1 pt-8"
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="h1-serif text-2xl text-white/90 py-3 border-b border-white/10"
                  initial={reduce ? undefined : { opacity: 0, y: 12 }}
                  animate={reduce ? undefined : { opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35 }}
                  style={{ fontFamily: "var(--font-display), serif" }}
                >
                  {item.label}
                </motion.a>
              ))}
              <div className="pt-6">
                <GlassButton href="#contact" variant="primary" onClick={() => setOpen(false)}>
                  {HERO_COPY.primaryCta}
                </GlassButton>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
