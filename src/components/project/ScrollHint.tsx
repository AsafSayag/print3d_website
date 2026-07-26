"use client";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/**
 * "SCROLL" hint pinned to the bottom of the hero, mirroring the homepage
 * hero's scroll cue (same mouse pill + bouncing dot, see globals.css
 * `.hint-dot` / `hint-bounce`). Alongside it sit two quick-nav labels —
 * גלריה (jumps to the gallery section) and מפרט טכני (jumps to the spec
 * section right after the hero) — styled like SCROLL and separated by
 * thin vertical dividers.
 */
export function ScrollHint() {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const heroSection = e.currentTarget.closest("section");
    heroSection?.nextElementSibling?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="absolute inset-x-0 bottom-7 z-10 flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={handleClick}
        aria-label="גלול לקטע הבא"
        className="flex items-center gap-3 cursor-pointer"
      >
        <span className="eyebrow text-white/70">SCROLL</span>
        <div className="h-9 w-[22px] rounded-full border border-white/40 flex justify-center pt-2">
          <span className="hint-dot block h-1.5 w-1 rounded-full bg-white/70" />
        </div>
      </button>

      <span className="h-4 w-px bg-white/30" aria-hidden="true" />

      <button
        type="button"
        onClick={() => scrollToId("gallery")}
        className="eyebrow text-white/70 cursor-pointer"
      >
        גלריה
      </button>

      <span className="h-3 w-px bg-white/30" aria-hidden="true" />

      <button
        type="button"
        onClick={() => scrollToId("technical-spec")}
        className="eyebrow text-white/70 cursor-pointer"
      >
        מפרט טכני
      </button>
    </div>
  );
}
