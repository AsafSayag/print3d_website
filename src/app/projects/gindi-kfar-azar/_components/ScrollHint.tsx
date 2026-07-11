/**
 * "SCROLL" hint pinned to the bottom of the hero, mirroring the homepage
 * hero's scroll cue (same mouse pill + bouncing dot, see globals.css
 * `.hint-dot` / `hint-bounce`), with the label spelled out alongside it.
 */
export function ScrollHint() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 bottom-7 z-10 flex items-center justify-center gap-3"
    >
      <span className="eyebrow text-white/70">SCROLL</span>
      <div className="h-9 w-[22px] rounded-full border border-white/40 flex justify-center pt-2">
        <span className="hint-dot block h-1.5 w-1 rounded-full bg-white/70" />
      </div>
    </div>
  );
}
