"use client";

import { useState } from "react";
import Image from "next/image";
import type { GalleryItem } from "@/lib/projectImages";
import { Lightbox } from "./Lightbox";

/**
 * The project-page media grid. Shared by all project pages — the per-project
 * `content.ts` supplies `items`, derived from the asset folder by
 * `projectImages`, so tile order and membership are controlled by filenames.
 *
 * Video tiles show their poster with a permanent play badge (rather than the
 * hover-only zoom glyph) so they read as video at a glance; the clip itself is
 * only fetched once the lightbox opens.
 */
export function Gallery({ items, alt }: { items: GalleryItem[]; alt: string }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, i) => {
          const isVideo = item.kind === "video";
          return (
            <button
              type="button"
              key={item.src}
              onClick={() => setLightbox(i)}
              aria-label={isVideo ? "הפעלת סרטון" : `הגדלת תמונה ${i + 1}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-[color:var(--navy-800)]/10 focus-visible:outline-none"
            >
              <Image
                src={isVideo ? item.poster : item.src}
                alt={alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 ease-[var(--ease-brand)] group-hover:scale-[1.04]"
              />

              {isVideo ? (
                <>
                  {/* Video tiles keep their scrim and play glyph always on, so
                      the tile is identifiable as video without hovering. */}
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 grid place-items-center"
                  >
                    <span className="grid h-14 w-14 place-items-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-sm transition-transform duration-300 ease-[var(--ease-brand)] group-hover:scale-110">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-6 w-6 -me-0.5"
                        fill="currentColor"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </>
              ) : (
                <>
                  {/* Hover affordance — subtle scrim + zoom glyph */}
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="pointer-events-none absolute bottom-3 end-3 grid h-9 w-9 place-items-center rounded-full border border-white/30 bg-black/35 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
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
                  </span>
                </>
              )}
            </button>
          );
        })}
      </div>

      {lightbox !== null && (
        <Lightbox
          items={items}
          index={lightbox}
          alt={alt}
          onClose={() => setLightbox(null)}
          onIndexChange={setLightbox}
        />
      )}
    </>
  );
}
