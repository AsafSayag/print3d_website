"use client";

import { useState } from "react";
import Image from "next/image";
import { GlassButton } from "@/components/ui/GlassButton";
import { CONTACT } from "@/lib/constants";
import { IMAGE_ALT, HERO, SPECS, ABOUT, ALL_IMAGES } from "../content";
import { SpecCarousel } from "./SpecCarousel";
import { Lightbox } from "./Lightbox";

/**
 * Design 2 — a product-detail layout modelled on an e-commerce PDP: an enlarged
 * image gallery on the left (hero + every model shot) and the project "spec"
 * panel on the right, where a shop would place colour/size selectors and a buy
 * button. The spec rows paginate in a 2-page carousel so the two columns match
 * in height. Double-clicking any image opens a full-size lightbox.
 */
export function DesignTwo() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const count = ALL_IMAGES.length;
  const go = (delta: number) => setActive((i) => (i + delta + count) % count);

  return (
    <main className="on-light surface-white min-h-screen">
      <div className="container-x-wide pt-28 pb-20 sm:pt-32">
        {/* dir=ltr fixes gallery to the left and details to the right, per brief.
            items-stretch keeps both columns at equal height on desktop. */}
        <div
          dir="ltr"
          className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14 lg:items-stretch"
        >
          {/* ---------- Left: image gallery (enlarged) ---------- */}
          {/* On lg the main image grows (flex-1) to fill the column so its height
              matches the details side with no empty gap; a fixed aspect keeps it
              from collapsing when the layout stacks on smaller screens. */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-[color:var(--navy-800)]/10 bg-[color:var(--ice-050)] lg:aspect-auto lg:min-h-0 lg:flex-1">
              <Image
                key={ALL_IMAGES[active]}
                src={ALL_IMAGES[active]}
                alt={`${IMAGE_ALT} — תמונה ${active + 1}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                onDoubleClick={() => setLightbox(active)}
                className="object-cover cursor-zoom-in"
              />

              {/* Prev / next arrows */}
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="התמונה הקודמת"
                className="absolute start-3 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full border border-[color:var(--navy-800)]/10 bg-white/85 backdrop-blur text-[color:var(--ink-950)] shadow-sm transition hover:bg-white"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="התמונה הבאה"
                className="absolute end-3 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full border border-[color:var(--navy-800)]/10 bg-white/85 backdrop-blur text-[color:var(--ink-950)] shadow-sm transition hover:bg-white"
              >
                ›
              </button>

              {/* Zoom hint */}
              <button
                type="button"
                onClick={() => setLightbox(active)}
                aria-label="הגדלת התמונה"
                className="absolute end-3 bottom-3 grid h-10 w-10 place-items-center rounded-full border border-[color:var(--navy-800)]/10 bg-white/85 text-[color:var(--ink-950)] backdrop-blur shadow-sm transition hover:bg-white"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="10.5" cy="10.5" r="6.5" />
                  <line x1="15.5" y1="15.5" x2="21" y2="21" />
                  <line x1="10.5" y1="7.5" x2="10.5" y2="13.5" />
                  <line x1="7.5" y1="10.5" x2="13.5" y2="10.5" />
                </svg>
              </button>
            </div>

            {/* Thumbnails */}
            <div className="grid shrink-0 grid-cols-5 gap-3">
              {ALL_IMAGES.map((src, i) => (
                <button
                  type="button"
                  key={src}
                  onClick={() => setActive(i)}
                  onDoubleClick={() => setLightbox(i)}
                  aria-label={`הצג תמונה ${i + 1}`}
                  aria-current={i === active}
                  className={`relative aspect-square overflow-hidden rounded-xl border transition ${
                    i === active
                      ? "border-[color:var(--gold-500)] ring-2 ring-[color:var(--gold-500)]/40"
                      : "border-[color:var(--navy-800)]/10 hover:border-[color:var(--navy-800)]/30"
                  }`}
                >
                  <Image src={src} alt="" fill sizes="120px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* ---------- Right: project details ---------- */}
          <div dir="rtl" className="flex flex-col lg:pt-2">
            <p className="eyebrow text-[color:var(--gold-700)] mb-3">
              {HERO.eyebrow}
            </p>
            <h1 className="h2 heading-accent">{HERO.title}</h1>

            <div className="mt-4 flex items-center gap-3">
              <span
                className="num inline-flex items-center rounded-full border border-[color:var(--navy-800)]/15 bg-[color:var(--ice-050)] px-3 py-1 text-sm"
                dir="ltr"
              >
                קנה מידה {HERO.scale}
              </span>
            </div>

            <p className="mt-5 text-[1.0625rem] leading-relaxed text-[color:var(--ink-950)]/80">
              {IMAGE_ALT}
            </p>

            {/* Spec details — paginated carousel (the PDP's "options" area) */}
            <div className="mt-7 flex flex-1 flex-col">
              <SpecCarousel rows={SPECS} />
            </div>

            {/* About — client / represented project */}
            <div className="mt-6 rounded-2xl border border-[color:var(--navy-800)]/10 bg-[color:var(--ice-050)] p-5 text-[1.0625rem] leading-relaxed">
              <p>
                <span className="eyebrow text-[color:var(--gold-700)] ms-1">
                  לקוח:
                </span>{" "}
                {ABOUT.client}
              </p>
              <p className="mt-1.5">
                <span className="eyebrow text-[color:var(--gold-700)] ms-1">
                  הפרויקט המיוצג:
                </span>{" "}
                {ABOUT.represented}
              </p>
            </div>

            {/* CTAs — the PDP's "add to cart" / "buy now" */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <GlassButton
                href={CONTACT.emailHref}
                variant="primary"
                className="!py-3.5 flex-1 justify-center"
              >
                בקשו הצעת מחיר
              </GlassButton>
              <GlassButton
                href={CONTACT.phoneHref}
                className="!py-3.5 flex-1 justify-center"
              >
                חייגו {CONTACT.phone}
              </GlassButton>
            </div>
          </div>
        </div>
      </div>

      {lightbox !== null && (
        <Lightbox
          images={ALL_IMAGES}
          index={lightbox}
          alt={IMAGE_ALT}
          onClose={() => setLightbox(null)}
          onIndexChange={setLightbox}
        />
      )}
    </main>
  );
}
