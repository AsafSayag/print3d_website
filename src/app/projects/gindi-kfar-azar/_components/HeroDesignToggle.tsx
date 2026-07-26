"use client";

import { useState } from "react";
import { HeroSlider } from "./HeroSlider";

type Props = {
  slides: string[];
  alt: string;
  eyebrow?: string;
  title: string;
};

/**
 * Gindi-only preview wrapper: lets us flip the hero between עיצוב 1 (the static
 * top-left title) and עיצוב 2 (the title glides in from the center). Switching
 * remounts the slider via `key` so the animation replays from the start.
 */
export function HeroDesignToggle(props: Props) {
  const [design, setDesign] = useState<1 | 2>(1);

  return (
    <>
      <HeroSlider key={design} {...props} animated={design === 2} />

      <div className="hero-design-toggle" role="group" aria-label="בחירת עיצוב">
        <button
          type="button"
          aria-pressed={design === 1}
          data-active={design === 1}
          onClick={() => setDesign(1)}
        >
          עיצוב 1
        </button>
        <button
          type="button"
          aria-pressed={design === 2}
          data-active={design === 2}
          onClick={() => setDesign(2)}
        >
          עיצוב 2
        </button>
      </div>

      <style>
        {
          '.hero-design-toggle{position:fixed;z-index:50;top:5.25rem;left:1.5rem;display:inline-flex;gap:.25rem;padding:.3rem;border-radius:9999px;background:rgba(7,13,23,0.72);border:1px solid rgba(255,255,255,0.22);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);box-shadow:0 10px 30px -14px rgba(0,0,0,0.85)}.hero-design-toggle button{appearance:none;border:0;cursor:pointer;padding:.4rem .9rem;border-radius:9999px;font-size:.85rem;font-weight:600;color:rgba(255,255,255,0.72);background:transparent;transition:background .25s,color .25s}.hero-design-toggle button:hover{color:#fff}.hero-design-toggle button[data-active="true"]{background:var(--gold-400);color:var(--navy-950)}'
        }
      </style>
    </>
  );
}
