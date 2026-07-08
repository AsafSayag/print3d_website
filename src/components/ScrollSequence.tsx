"use client";

import { useEffect, useRef, useState } from "react";
import { SEQUENCE } from "@/lib/constants";
import { SEQUENCE_EYEBROW, SEQUENCE_STAGES } from "@/lib/content";

const FRAME_W = 1600;
const FRAME_H = 894;
const ASPECT = `${FRAME_W} / ${FRAME_H}`;
const LAST = SEQUENCE.totalFrames; // 1-based last file number

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

/** Resolve the file path for a 1-based frame number. */
function framePath(fileNum: number, mobile: boolean) {
  return mobile
    ? SEQUENCE.framePathMobile(fileNum)
    : SEQUENCE.framePathDesktop(fileNum);
}

export function ScrollSequence() {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Loaded frame images, indexed 0..TOTAL-1 (file number = index + 1).
  const imagesRef = useRef<(HTMLImageElement | undefined)[]>([]);
  const loadedRef = useRef<boolean[]>([]);
  const currentRef = useRef(0); // smoothed float frame
  const drawnRef = useRef(-1); // last drawn integer frame
  const rafRef = useRef<number | null>(null);
  const readyRef = useRef(false); // guards the one-time reveal

  const [isMobile, setIsMobile] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false); // first frame painted
  const [stage, setStage] = useState(0);
  const stageRef = useRef(0);

  // Detect device + motion preference (client only → avoids SSR fallback flash).
  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const scrollVh = isMobile
    ? Math.round(SEQUENCE.scrollHeightVh * 0.75)
    : SEQUENCE.scrollHeightVh;

  // ---- Frame loading (staged) ----
  useEffect(() => {
    if (reduced) return; // reduced-motion uses a static <img>, no canvas
    imagesRef.current = new Array(SEQUENCE.totalFrames);
    loadedRef.current = new Array(SEQUENCE.totalFrames).fill(false);

    let cancelled = false;

    const loadFrame = (index: number) =>
      new Promise<void>((resolve) => {
        if (cancelled || loadedRef.current[index]) return resolve();
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          if (cancelled) return resolve();
          imagesRef.current[index] = img;
          loadedRef.current[index] = true;
          if (index === 0) {
            drawFrame(0, true);
            setReady(true);
          }
          resolve();
        };
        img.onerror = () => resolve();
        img.src = framePath(index + 1, isMobile);
      });

    const loadAll = async () => {
      // Eager: first N frames in order so the start is instantly smooth.
      const eager = Math.min(SEQUENCE.eagerCount, SEQUENCE.totalFrames);
      for (let i = 0; i < eager; i++) await loadFrame(i);
      // Background: the remainder in order.
      for (let i = eager; i < SEQUENCE.totalFrames && !cancelled; i++) {
        await loadFrame(i);
      }
    };

    // Start loading as the module approaches the viewport, with a safety
    // fallback that guarantees loading even if the observer never fires.
    let started = false;
    const begin = () => {
      if (started || cancelled) return;
      started = true;
      loadAll();
    };

    const outer = outerRef.current;
    let io: IntersectionObserver | null = null;
    if (outer && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io?.disconnect();
            begin();
          }
        },
        { rootMargin: "150% 0px" },
      );
      io.observe(outer);
    }
    // Fallback: begin loading shortly after mount regardless of the observer.
    const fallback = window.setTimeout(begin, 800);

    return () => {
      cancelled = true;
      io?.disconnect();
      window.clearTimeout(fallback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, isMobile]);

  // ---- Canvas sizing (DPR-aware) ----
  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      drawnRef.current = -1; // force redraw at new size
      drawFrame(Math.round(currentRef.current), true);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, ready]);

  // ---- Draw helper: nearest loaded frame, cover-fit ----
  function drawFrame(index: number, force = false) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!force && index === drawnRef.current) return;

    // Find nearest loaded frame so we never paint a blank canvas.
    let use = index;
    if (!loadedRef.current[use]) {
      let found = -1;
      for (let d = 1; d < SEQUENCE.totalFrames; d++) {
        if (loadedRef.current[index - d]) {
          found = index - d;
          break;
        }
        if (loadedRef.current[index + d]) {
          found = index + d;
          break;
        }
      }
      if (found === -1) return;
      use = found;
    }

    const img = imagesRef.current[use];
    if (!img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const scale = Math.max(cw / img.width, ch / img.height);
    const dw = img.width * scale;
    const dh = img.height * scale;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    drawnRef.current = index;

    // Reveal the canvas on the first successful paint (robust against the
    // StrictMode double-invoke that can swallow the frame-0 onload).
    if (!readyRef.current) {
      readyRef.current = true;
      setReady(true);
    }
  }

  // ---- rAF loop driven by scroll position ----
  useEffect(() => {
    if (reduced) return;
    const outer = outerRef.current;
    if (!outer) return;

    const tick = () => {
      const rect = outer.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = outer.offsetHeight - vh;
      const rawProgress =
        scrollable > 0 ? clamp(-rect.top / scrollable, 0, 1) : 0;

      // Scrub curve:
      //  • ease-out over the active region → fast at the start, slowing down as
      //    the building takes shape in the later frames.
      //  • a hold at the very end → the last scroll stretch dwells on the final
      //    frame so the complete building stays on screen before releasing.
      const hold = SEQUENCE.endHold;
      let progress: number;
      if (rawProgress >= 1 - hold) {
        progress = 1;
      } else {
        const t = rawProgress / (1 - hold); // 0..1 over the active region
        progress = 1 - Math.pow(1 - t, SEQUENCE.easeExp);
      }

      const target = progress * (SEQUENCE.totalFrames - 1);
      // Ease toward target; snap when extremely close to avoid idle churn.
      const cur = currentRef.current;
      const next =
        Math.abs(target - cur) < 0.01
          ? target
          : cur + (target - cur) * SEQUENCE.smoothing;
      currentRef.current = next;

      drawFrame(Math.round(next));

      // Update stage label only when it actually changes.
      const s =
        progress < SEQUENCE_STAGES[0].until
          ? 0
          : progress < SEQUENCE_STAGES[1].until
            ? 1
            : 2;
      if (s !== stageRef.current) {
        stageRef.current = s;
        setStage(s);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  // ---------- Reduced-motion / no-JS static fallback ----------
  if (reduced) {
    return (
      <section
        id="process"
        className="surface-navy-950 section"
        aria-label="כך נבנה מודל"
      >
        <SequenceFrame>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={framePath(LAST, isMobile)}
            alt="מודל אדריכלי מוגמר, מוכן להצבה"
            className="h-full w-full object-cover"
          />
        </SequenceFrame>
        <StageLabel eyebrow={SEQUENCE_EYEBROW} text={SEQUENCE_STAGES[2].text} />
      </section>
    );
  }

  return (
    <section id="process" aria-label="כך נבנה מודל">
      {/* Tall outer container defines the scroll "cost" of the sequence. */}
      <div
        ref={outerRef}
        className="relative surface-navy-950"
        style={{ height: `${scrollVh}vh` }}
      >
        {/* Pinned viewport */}
        <div
          className="sticky top-0 flex flex-col items-center justify-center gap-8 overflow-hidden"
          style={{ height: "100svh" }}
        >
          <p
            className="eyebrow text-[color:var(--steel-300)]"
            style={{ fontSize: "1rem", letterSpacing: "0.12em" }}
          >
            {SEQUENCE_EYEBROW}
          </p>

          <SequenceFrame>
            <canvas
              ref={canvasRef}
              className="h-full w-full block"
              style={{ opacity: ready ? 1 : 0, transition: "opacity 0.4s ease" }}
              aria-hidden="true"
            />
            {!ready && (
              <div className="absolute inset-0 grid place-items-center">
                <span className="caption text-white/40">טוען…</span>
              </div>
            )}
          </SequenceFrame>

          {/* Stage text (cross-fades by scroll progress) */}
          <div className="h-9 relative w-full text-center">
            {SEQUENCE_STAGES.map((st, i) => (
              <span
                key={i}
                className="absolute inset-x-0 text-white/75 transition-opacity duration-500"
                style={{ opacity: stage === i ? 1 : 0, fontSize: "1.3rem" }}
              >
                {st.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** The centered, framed "museum object" square that holds the sequence. */
function SequenceFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative w-full mx-auto"
      style={{
        maxWidth: "min(720px, 86vw)",
        aspectRatio: ASPECT,
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow:
          "0 30px 80px -20px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)",
        overflow: "hidden",
        background: "#05090f",
      }}
    >
      {children}
    </div>
  );
}

function StageLabel({ eyebrow, text }: { eyebrow: string; text: string }) {
  return (
    <div className="container-x text-center mt-8">
      <p className="eyebrow text-[color:var(--steel-300)] mb-2">{eyebrow}</p>
      <p className="text-white/70">{text}</p>
    </div>
  );
}
