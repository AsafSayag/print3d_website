"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import {
  PORTFOLIO_FILTERS,
  PORTFOLIO_PROJECTS,
  PROJECT_TYPE_LABELS,
  type ProjectType,
} from "@/lib/portfolioContent";

const ALL = "all" as const;

const BRANDS = Array.from(new Set(PORTFOLIO_PROJECTS.map((p) => p.client)));
const SCALES = Array.from(new Set(PORTFOLIO_PROJECTS.map((p) => p.scale)));
const TYPES = Object.entries(PROJECT_TYPE_LABELS) as [ProjectType, string][];

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative">
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none cursor-pointer rounded-full border border-[color:var(--ink-950)]/15 bg-white ps-4 pe-9 py-2.5 text-sm font-[var(--font-body)] text-[color:var(--ink-950)] transition-colors duration-300 hover:border-[color:var(--gold-500)]/60 focus-visible:outline-2 focus-visible:outline-[color:var(--steel-300)] focus-visible:outline-offset-2"
      >
        <option value={ALL}>{label}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[color:var(--ink-950)]/50"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
}

/**
 * Elegant, minimal filter bar (brand / scale / type) driving a project grid.
 * Filters are three plain selects — deliberately not a heavy faceted-search
 * UI — plus a bold "all projects" reset pill. The grid reuses the same
 * portfolio-card visual language as the homepage.
 */
export function ProjectFilterGrid() {
  const [brand, setBrand] = useState<string>(ALL);
  const [scale, setScale] = useState<string>(ALL);
  const [type, setType] = useState<string>(ALL);

  const isAll = brand === ALL && scale === ALL && type === ALL;

  const filtered = useMemo(
    () =>
      PORTFOLIO_PROJECTS.filter(
        (p) =>
          (brand === ALL || p.client === brand) &&
          (scale === ALL || p.scale === scale) &&
          (type === ALL || p.type === type),
      ),
    [brand, scale, type],
  );

  const resetAll = () => {
    setBrand(ALL);
    setScale(ALL);
    setType(ALL);
  };

  const filterKey = `${brand}|${scale}|${type}`;

  return (
    <section id="filters" className="surface-ice section" aria-label={PORTFOLIO_FILTERS.title}>
      <div className="container-x">
        <SectionHeading eyebrow={PORTFOLIO_FILTERS.eyebrow} title={PORTFOLIO_FILTERS.title} tone="dark" />

        <Reveal index={1} className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={resetAll}
            aria-pressed={isAll}
            className={`rounded-full px-5 py-2.5 text-sm font-[var(--font-body)] font-semibold transition-colors duration-300 ${
              isAll
                ? "bg-[color:var(--ink-950)] text-white"
                : "border border-[color:var(--ink-950)]/15 bg-white text-[color:var(--ink-950)]/70 hover:border-[color:var(--gold-500)]/60"
            }`}
          >
            {PORTFOLIO_FILTERS.all}
          </button>

          <Select
            label={PORTFOLIO_FILTERS.brandLabel}
            value={brand}
            onChange={setBrand}
            options={BRANDS.map((b) => ({ value: b, label: b }))}
          />
          <Select
            label={PORTFOLIO_FILTERS.scaleLabel}
            value={scale}
            onChange={setScale}
            options={SCALES.map((s) => ({ value: s, label: s }))}
          />
          <Select
            label={PORTFOLIO_FILTERS.typeLabel}
            value={type}
            onChange={setType}
            options={TYPES.map(([value, label]) => ({ value, label }))}
          />
        </Reveal>

        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-[color:var(--ink-950)]/50">
            {PORTFOLIO_FILTERS.empty}
          </p>
        ) : (
          <div
            key={filterKey}
            className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-12 md:mt-14"
          >
            {filtered.map((p, i) => (
              <Reveal key={p.id} index={i % 3}>
                <div className="portfolio-card group relative overflow-hidden rounded-2xl aspect-[4/5]">
                  <Image
                    src={p.image}
                    alt={`${p.title} · מודל אדריכלי בקנה מידה ${p.scale}`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-brand)] group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-950)]/85 via-[color:var(--navy-950)]/15 to-transparent" />
                  <div className="portfolio-card-sheen" aria-hidden />
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                    <div className="portfolio-card-line" aria-hidden />
                    <div className="mt-3 flex flex-col items-start gap-2 sm:flex-row sm:items-end sm:justify-between">
                      <span
                        className="num sm:order-last text-[color:var(--gold-400)] text-sm shrink-0 bg-black/30 backdrop-blur px-2 py-0.5 rounded-full border border-white/10"
                        dir="ltr"
                      >
                        {p.scale}
                      </span>
                      <span className="text-white font-display text-base md:text-lg leading-tight">
                        {p.title}
                      </span>
                    </div>
                    <span className="mt-1.5 block text-[color:var(--steel-300)] text-sm">
                      {p.client}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
