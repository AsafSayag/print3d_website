"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "./Lightbox";

export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {images.map((src, i) => (
          <button
            type="button"
            key={src}
            onClick={() => setLightbox(i)}
            aria-label={`הגדלת תמונה ${i + 1}`}
            className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-[color:var(--navy-800)]/10 focus-visible:outline-none"
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 ease-[var(--ease-brand)] group-hover:scale-[1.04]"
            />
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
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <Lightbox
          images={images}
          index={lightbox}
          alt={alt}
          onClose={() => setLightbox(null)}
          onIndexChange={setLightbox}
        />
      )}
    </>
  );
}
