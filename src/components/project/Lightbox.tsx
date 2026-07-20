"use client";

import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { GalleryItem } from "@/lib/projectImages";

type LightboxProps = {
  items: GalleryItem[];
  index: number;
  alt: string;
  onClose: () => void;
  onIndexChange: (i: number) => void;
};

/**
 * Full-screen viewer for the project gallery. Shows the current item
 * `object-contain` (never cropped), with prev/next controls, keyboard nav
 * (Esc closes, ← / → navigate), backdrop-click to close and a body scroll lock.
 *
 * Video items play with controls and sound. Playback needs no explicit cleanup:
 * the `key` on the media element remounts it whenever the index changes, and
 * closing unmounts the whole portal — both stop the clip.
 */
export function Lightbox({
  items,
  index,
  alt,
  onClose,
  onIndexChange,
}: LightboxProps) {
  const count = items.length;
  const closeRef = useRef<HTMLButtonElement>(null);
  const item = items[index];

  const go = useCallback(
    (delta: number) => onIndexChange((index + delta + count) % count),
    [index, count, onIndexChange],
  );

  // Keyboard: Esc closes, arrows navigate. In an RTL page ArrowLeft reads as
  // "next" visually, but we keep the natural mapping (Left = previous index).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  // Lock body scroll while open.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      dir="ltr"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8 lb-fade"
    >
      {/* Close */}
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="סגירה"
        className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-2xl leading-none text-white backdrop-blur transition hover:bg-white/20"
      >
        ×
      </button>

      {/* Current item — stopPropagation so clicks on it don't close */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative h-full max-h-[88vh] w-full max-w-[92vw]"
      >
        {item.kind === "video" ? (
          <video
            key={item.src}
            src={item.src}
            poster={item.poster}
            controls
            autoPlay
            playsInline
            aria-label={`${alt} — סרטון`}
            className="h-full w-full object-contain"
          />
        ) : (
          <Image
            key={item.src}
            src={item.src}
            alt={`${alt} — ${index + 1}`}
            fill
            sizes="92vw"
            priority
            className="object-contain"
          />
        )}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label="הקודם"
            className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-2xl leading-none text-white backdrop-blur transition hover:bg-white/20 sm:left-6"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            aria-label="הבא"
            className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-2xl leading-none text-white backdrop-blur transition hover:bg-white/20 sm:right-6"
          >
            ›
          </button>

          {/* Counter */}
          <span className="num absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-sm text-white/90 backdrop-blur">
            {index + 1} / {count}
          </span>
        </>
      )}
    </div>,
    document.body,
  );
}
