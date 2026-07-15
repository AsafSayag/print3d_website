import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BrightHero } from "@/components/BrightHero";
import { HERO_VIDEO } from "@/lib/heroVideo";
import { ClientLogos } from "@/components/ClientLogos";
import { LeadForm } from "@/components/ui/LeadForm";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { LegalJsonLd } from "@/components/legal/LegalJsonLd";
import type { Crumb } from "@/components/legal/Breadcrumbs";
import { buildPageMeta } from "@/lib/pageMeta";
import {
  ABOUT,
  WHY,
  SERVICES,
  WHO_FOR,
  STATS,
  CONTACT_CTA,
} from "@/lib/content";

export const metadata: Metadata = buildPageMeta({
  title: ABOUT.hero.eyebrow,
  description:
    "מי אנחנו ולמה מובילי הנדל״ן בישראל בוחרים ב־Print3D: מודלים אדריכליים ברמת גימור יוצאת דופן, ייצור מתקדם וגימור יד אומן, כבר יותר מ־15 שנה.",
  path: "/about",
});

const breadcrumbs: Crumb[] = [
  { label: "בית", href: "/" },
  { label: ABOUT.hero.eyebrow },
];

export default function AboutPage() {
  return (
    <>
      <LegalJsonLd
        title={ABOUT.hero.title}
        description={ABOUT.hero.description}
        path="/about"
        breadcrumbs={breadcrumbs}
      />
      <Header />
      <main id="main" className="flex-1">
        <BrightHero
          eyebrow={ABOUT.hero.eyebrow}
          title={ABOUT.hero.title}
          description={ABOUT.hero.description}
          breadcrumbs={breadcrumbs}
          video={HERO_VIDEO}
        />

        {/* ── Story + stats ─────────────────────────────────────────── */}
        <section className="surface-navy-950 section" aria-label={WHY.heading}>
          <div className="container-x">
            <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-start">
              <div className="lg:col-span-5">
                <Reveal>
                  <p className="eyebrow text-[color:var(--gold-700)] mb-3">
                    {ABOUT.story.eyebrow}
                  </p>
                  <h2 className="h2 heading-accent text-white">{WHY.heading}</h2>
                </Reveal>

                <Reveal delay={0.1} className="mt-8">
                  <figure className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_24px_60px_-40px_rgba(0,0,0,0.8)]">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src="/why-print3d.jpg"
                        alt="חלל תצוגה עם מודל אדריכלי מואר של מגדל, מעשה ידי Print3D"
                        fill
                        sizes="(max-width: 1024px) 92vw, 40vw"
                        className="object-cover transition-transform duration-[900ms] ease-[var(--ease-brand)] group-hover:scale-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-950)]/70 via-transparent to-transparent" />
                    </div>
                  </figure>
                </Reveal>
              </div>

              <div className="lg:col-span-7">
                <Reveal>
                  <div className="space-y-4">
                    {WHY.paragraphs.map((p, i) => (
                      <p
                        key={i}
                        className="text-white/75 text-lg leading-[1.85] text-pretty"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Stats band */}
            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 mt-16 sm:mt-20 border-t border-white/10 pt-12">
              {STATS.map((s, i) => (
                <Reveal
                  as="li"
                  index={i}
                  key={s.label}
                  className="text-center sm:text-start"
                >
                  {s.value !== null ? (
                    <span className="block font-display text-[color:var(--gold-400)] text-4xl sm:text-5xl leading-none">
                      <CountUp end={s.value} suffix={s.suffix} />
                    </span>
                  ) : (
                    <span
                      dir="ltr"
                      className="block font-display text-[color:var(--gold-400)] text-xl sm:text-2xl leading-tight"
                    >
                      {s.display}
                    </span>
                  )}
                  <span className="block mt-2 text-white/60 text-sm sm:text-base">
                    {s.label}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Values / what sets us apart ───────────────────────────── */}
        <section className="surface-ice section" aria-label={ABOUT.values.title}>
          <div className="container-x">
            <Reveal>
              <p className="eyebrow text-[color:var(--gold-700)] mb-3">
                {ABOUT.values.eyebrow}
              </p>
            </Reveal>
            <Reveal index={1}>
              <h2 className="h2 heading-accent text-[color:var(--ink-950)]">
                {ABOUT.values.title}
              </h2>
            </Reveal>

            <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mt-14">
              {WHY.cards.map((card, i) => (
                <Reveal as="li" index={i} key={card.n}>
                  <article className="group relative pt-7">
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-px bg-[color:var(--gold-500)]/40 sm:bg-[color:var(--ink-950)]/15 transition-colors duration-700 sm:group-hover:bg-[color:var(--gold-500)]/70"
                    />
                    <span className="why-arrow" aria-hidden="true">
                      <svg
                        viewBox="0 0 24 24"
                        width="34"
                        height="34"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M19 12H5M11 6l-6 6 6 6" />
                      </svg>
                    </span>
                    <h3 className="h3 mt-4 mb-2 text-[color:var(--ink-950)] text-lg">
                      {card.title}
                    </h3>
                    <p className="text-[color:var(--ink-950)]/60 text-[15px] leading-relaxed">
                      {card.text}
                    </p>
                  </article>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ── What we do / services ─────────────────────────────────── */}
        <section
          className="surface-navy-950 section"
          aria-label={SERVICES.heading}
        >
          <div className="container-x">
            <div className="max-w-3xl">
              <Reveal>
                <p className="eyebrow text-[color:var(--gold-700)] mb-3">
                  {ABOUT.services.eyebrow}
                </p>
              </Reveal>
              <Reveal index={1}>
                <h2 className="h2 heading-accent text-white">
                  {SERVICES.heading}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-6 space-y-4">
                  {SERVICES.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="text-white/70 text-lg leading-[1.85] text-pretty"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            </div>

            <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
              {SERVICES.cards.map((c, i) => (
                <Reveal as="li" index={i} key={c.title}>
                  <article className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-500 hover:border-[color:var(--gold-500)]/40 hover:bg-white/[0.07] hover:-translate-y-1">
                    <h3 className="h3 text-white text-lg mb-2">{c.title}</h3>
                    <p className="text-white/60 text-[15px] leading-relaxed">
                      {c.text}
                    </p>
                  </article>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Who we work for ───────────────────────────────────────── */}
        <section className="surface-ice section" aria-label={WHO_FOR.heading}>
          <div className="container-x">
            <div className="grid lg:grid-cols-12 gap-x-12 gap-y-8 items-start">
              <div className="lg:col-span-6">
                <Reveal>
                  <p className="eyebrow text-[color:var(--gold-700)] mb-3">
                    {ABOUT.audience.eyebrow}
                  </p>
                </Reveal>
                <Reveal index={1}>
                  <h2 className="h2 heading-accent text-[color:var(--ink-950)]">
                    {WHO_FOR.heading}
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="mt-6 text-[color:var(--ink-950)]/65 text-lg leading-[1.85] text-pretty">
                    {WHO_FOR.paragraph}
                  </p>
                </Reveal>
              </div>

              <div className="lg:col-span-6 lg:pt-4">
                <ul className="grid sm:grid-cols-2 gap-4">
                  {WHO_FOR.items.map((item, i) => (
                    <Reveal as="li" index={i} key={item}>
                      <div className="flex items-center gap-3 rounded-2xl border border-[color:var(--ink-950)]/10 bg-white p-5 h-full shadow-[0_18px_40px_-34px_rgba(10,21,38,0.5)] transition-all duration-500 hover:border-[color:var(--gold-500)]/50 hover:-translate-y-1">
                        <span
                          aria-hidden="true"
                          className="shrink-0 grid place-items-center w-10 h-10 rounded-xl bg-[color:var(--navy-950)] text-[color:var(--gold-400)]"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </span>
                        <span className="font-display text-[color:var(--ink-950)] text-[17px]">
                          {item}
                        </span>
                      </div>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Clients (kept from the reference) ─────────────────────── */}
        <ClientLogos />

        {/* ── Lead-capture module (replaces "join our team") ────────── */}
        <section
          className="surface-navy-950 section"
          aria-label={CONTACT_CTA.heading}
        >
          <div className="container-x max-w-3xl text-center">
            <Reveal>
              <p className="eyebrow text-[color:var(--gold-500)] mb-3">
                {ABOUT.lead.eyebrow}
              </p>
            </Reveal>
            <Reveal index={1}>
              <h2 className="h2 text-white">{CONTACT_CTA.heading}</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-white/70 mt-4 text-lg">{CONTACT_CTA.line}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10">
                <LeadForm />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
