"use client";

import { useEffect, useRef, useState } from "react";
import { SEQUENCE } from "@/lib/constants";
import { SEQUENCE_EYEBROW, SEQUENCE_STAGES } from "@/lib/content";

// Source frame dimensions (desktop). Frames are encoded at the full 1920px
// source width; these must match so the canvas caps its backing store at the
// real source size (never upscaling → keeps the composite cheap and crisp).
const FRAME_W = 1920;
const FRAME_H = 1073;
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

/**
 * Frame skipping — render only every Nth source frame to roughly halve the
 * runtime decode + canvas-paint work during a scrub. The animation still spans
 * the EXACT same scroll distance; the scrub simply maps progress across fewer,
 * evenly-spaced frames, so it feels identical but triggers ~half the image
 * swaps. 121 source frames, step 2 → ~61 active frames.
 */
const FRAME_STEP = 2;
/** 1-based source file numbers actually used, evenly spaced across the sequence. */
const FRAMES: number[] = (() => {
  const list: number[] = [];
  for (let f = 1; f <= SEQUENCE.totalFrames; f += FRAME_STEP) list.push(f);
  // Always finish on the final source frame so the completed building is shown.
  if (list[list.length - 1] !== SEQUENCE.totalFrames) {
    list.push(SEQUENCE.totalFrames);
  }
  return list;
})();
/** Active frame count — replaces SEQUENCE.totalFrames throughout this component. */
const ACTIVE_COUNT = FRAMES.length;

export function ScrollSequence() {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Loaded frame images, indexed 0..ACTIVE_COUNT-1 (source file = FRAMES[index]).
  const imagesRef = useRef<(HTMLImageElement | undefined)[]>([]);
  const loadedRef = useRef<boolean[]>([]);
  const currentRef = useRef(0); // smoothed float frame
  const drawnRef = useRef(-1); // last drawn integer frame
  const rafRef = useRef<number | null>(null);
  const readyRef = useRef(false); // guards the one-time reveal
  // Cached scroll geometry — measured on mount/resize, read (never re-measured)
  // inside the per-frame scrub tick to avoid forced synchronous layout.
  const layoutRef = useRef({ elemTop: 0, scrollable: 0 });

  const [isMobile, setIsMobile] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false); // first frame painted (internal)
  // True only once the core buffer of frames is fully downloaded AND decoded
  // (img.decode() resolved). Until then a loading overlay masks the canvas so
  // the user never sees a cold, stuttering first scrub.
  const [isSequenceReady, setIsSequenceReady] = useState(false);
  const [stage, setStage] = useState(0);
  const stageRef = useRef(0);

  // Detect device + motion preference (client only → avoids SSR fallback flash).
  // Tracked live (not just at mount) so resizing a desktop window down to a
  // phone width — or rotating a tablet — switches to the mobile frame size.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const scrollVh = isMobile
    ? Math.round(SEQUENCE.scrollHeightVh * 0.75)
    : SEQUENCE.scrollHeightVh;

  // ---- Frame loading (staged) ----
  useEffect(() => {
    if (reduced) return; // reduced-motion uses a static <img>, no canvas
    imagesRef.current = new Array(ACTIVE_COUNT);
    loadedRef.current = new Array(ACTIVE_COUNT).fill(false);

    let cancelled = false;

    // Load one frame. When `decode` is set, the image is fully decoded before it
    // is marked ready, so the scroll loop never pays the decode cost mid-scrub.
    const loadFrame = (index: number, decode = false) =>
      new Promise<void>((resolve) => {
        if (cancelled || loadedRef.current[index]) return resolve();
        const img = new Image();
        img.decoding = "async";
        const commit = () => {
          if (cancelled) return resolve();
          imagesRef.current[index] = img;
          loadedRef.current[index] = true;
          if (index === 0) {
            drawFrame(0, true);
            setReady(true);
          }
          resolve();
        };
        img.onload = () => {
          if (cancelled) return resolve();
          if (decode && typeof img.decode === "function") {
            img.decode().then(commit, commit);
          } else {
            commit();
          }
        };
        img.onerror = () => resolve();
        img.src = framePath(FRAMES[index], isMobile);
      });

    // Load [from, to) with a bounded pool of parallel workers pulling from a
    // shared cursor. This replaces the old one-at-a-time await chain (which,
    // over a real network, left the section stalling on frame 0 because frames
    // arrived serially), while staying progressive — frames stream in steadily
    // rather than in a single blocking burst.
    const loadRange = async (
      from: number,
      to: number,
      concurrency: number,
      decode = false,
    ) => {
      let cursor = from;
      const worker = async () => {
        while (cursor < to && !cancelled) {
          await loadFrame(cursor++, decode);
        }
      };
      await Promise.all(
        Array.from({ length: Math.max(1, Math.min(concurrency, to - from)) }, worker),
      );
    };

    const buffer = Math.min(SEQUENCE.eagerCount, ACTIVE_COUNT);

    let started = false;
    const start = () => {
      if (started || cancelled) return;
      started = true;
      window.removeEventListener("scroll", start);
      io?.disconnect();
      void (async () => {
        // 1) Warm-up buffer — the first frames, loaded in parallel AND fully
        //    decoded (each img.decode() is awaited inside loadFrame). Only once
        //    every buffer frame has resolved its decode do we mark the sequence
        //    ready and lift the loading overlay, so the first scrub is smooth
        //    (no runtime decode cost mid-scroll).
        await loadRange(0, buffer, 6, true);
        if (!cancelled) setIsSequenceReady(true);
        // 2) Remaining frames stream in progressively in the background.
        await loadRange(buffer, ACTIVE_COUNT, 4, false);
      })();
    };

    // Head-start accelerants: the FIRST scroll (the user heading down toward the
    // section, a full viewport before they reach it) starts the preload right
    // away, and — as a backup — the section actually scrolling into view does
    // too. The negative bottom margin is deliberate: this section is 240vh tall,
    // so with a 0 margin its top edge merely *touching* the viewport bottom at
    // mount already counts as "intersecting" and would fire instantly, defeating
    // the delay. Requiring it to be ~20% into view means the observer only fires
    // on real approach, never at mount.
    let io: IntersectionObserver | null = null;
    const outer = outerRef.current;
    if (outer && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) start();
        },
        { rootMargin: "0px 0px -20% 0px" },
      );
      io.observe(outer);
    }
    window.addEventListener("scroll", start, { passive: true, once: true });

    // Deferred fallback: if the user just watches the hero without scrolling,
    // hold the frame preload for a beat so the hero's ~1.6MB video gets the
    // connection to itself first — otherwise the ~4MB of frames download
    // alongside it, choke the pipe, and stutter both on the first visit. The
    // accelerants above fire it sooner the moment the user heads for the section.
    const startTimer = window.setTimeout(start, SEQUENCE.preloadDelayMs);

    // Safety net: never leave the loading overlay up indefinitely if the network
    // stalls mid-buffer — reveal after a hard cap regardless of decode progress.
    const revealSafety = window.setTimeout(() => {
      if (!cancelled) setIsSequenceReady(true);
    }, 8000);

    return () => {
      cancelled = true;
      io?.disconnect();
      window.removeEventListener("scroll", start);
      window.clearTimeout(startTimer);
      window.clearTimeout(revealSafety);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, isMobile]);

  // ---- Canvas sizing (DPR-aware) ----
  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      // Never size the canvas backing store larger than the source frames.
      // Upscaling beyond the source resolution adds per-frame compositing cost
      // (the GPU/compositor has to paint an oversized surface every frame) for
      // ZERO quality gain — the frame can't show more detail than its source.
      // On a high-DPR display this had grown the canvas to ~2277px from a 1600px
      // source, dropping the scrub to ~39fps whenever compositing fell back to
      // software. Capping to the source keeps it crisp and composite-cheap.
      const srcW = isMobile ? 1440 : FRAME_W;
      const srcH = isMobile ? 805 : FRAME_H;
      const rawDpr = Math.min(window.devicePixelRatio || 1, 2);
      const dpr = Math.max(
        1,
        Math.min(rawDpr, srcW / rect.width, srcH / rect.height),
      );
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      drawnRef.current = -1; // force redraw at new size
      drawFrame(Math.round(currentRef.current), true);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // isMobile is a dep because the frame's aspect ratio (and thus the canvas
    // CSS size) changes when it settles on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, ready, isMobile]);

  // ---- Draw helper: nearest loaded frame, cover-fit ----
  function drawFrame(index: number, force = false) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!force && index === drawnRef.current) return;

    // Find nearest loaded frame so we never paint a blank canvas.
    let use = index;
    if (!loadedRef.current[use]) {
      let found = -1;
      for (let d = 1; d < ACTIVE_COUNT; d++) {
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
    // Highest-quality resampling — keeps frames crisp at the larger display size.
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

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

    let active = false;

    // Measure the scroll geometry ONCE here (and on resize) instead of every
    // frame. `getBoundingClientRect()` and `offsetHeight` both force a synchronous
    // layout; doing them inside the rAF tick meant a full reflow every frame
    // (layout thrashing) that competed with the scroll compositor and dropped the
    // scrub's frame rate. We cache the element's document-absolute top and the
    // scrollable distance; the per-frame path then reads only `window.scrollY`,
    // which returns the current scroll offset without triggering layout.
    const measure = () => {
      const rect = outer.getBoundingClientRect();
      const vh = window.innerHeight;
      layoutRef.current.elemTop = rect.top + window.scrollY;
      layoutRef.current.scrollable = outer.offsetHeight - vh;
    };

    const tick = () => {
      if (!active) return;
      const { elemTop, scrollable } = layoutRef.current;
      // Equivalent to getBoundingClientRect().top, but derived from the cached
      // absolute top and the (non-reflowing) scroll position — no forced layout.
      const rectTop = elemTop - window.scrollY;
      const rawProgress =
        scrollable > 0 ? clamp(-rectTop / scrollable, 0, 1) : 0;

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

      const target = progress * (ACTIVE_COUNT - 1);
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

    const startLoop = () => {
      if (active) return;
      // Refresh the cached geometry when the section (re)enters view — cheap,
      // happens at most once per visibility change, and catches any layout shift
      // that occurred while the loop was parked.
      measure();
      active = true;
      rafRef.current = requestAnimationFrame(tick);
    };
    const stopLoop = () => {
      active = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };

    // The scrub only needs to run while the pinned section is on (or near) the
    // screen. Off-screen it would keep easing + drawing every frame for nothing
    // and steal main-thread time from whatever the user is actually viewing.
    // A 50% margin starts it just before entry so there is no cold-start jump.
    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) startLoop();
          else stopLoop();
        },
        { rootMargin: "50% 0px" },
      );
      io.observe(outer);
    } else {
      startLoop();
    }

    // Re-measure only on resize (viewport or layout changes) — never per frame.
    measure();
    window.addEventListener("resize", measure, { passive: true });

    return () => {
      stopLoop();
      io?.disconnect();
      window.removeEventListener("resize", measure);
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
        <SequenceFrame mobile={isMobile}>
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
          className="sticky top-0 relative overflow-hidden"
          style={{ height: "100svh" }}
        >
          {/* Caption — desktop: a heading anchored top-right, clear of the model.
              Mobile: the same copy inside a light bordered "chip" so it reads as
              its own element above the model rather than floating on top of it. */}
          <div
            className={`absolute inset-x-0 z-10 pointer-events-none ${
              isMobile ? "" : "container-x text-start"
            }`}
            style={{
              top: isMobile
                ? "clamp(2.5rem, 7vh, 4rem)"
                : "clamp(4.5rem, 13vh, 9rem)",
            }}
          >
            <div
              className={isMobile ? "mx-auto text-center" : ""}
              style={
                isMobile
                  ? {
                      width: "min(86vw, 22rem)",
                      padding: "0.85rem 1.1rem 1rem",
                      borderRadius: "16px",
                      border: "1px solid rgba(255,255,255,0.16)",
                      background: "rgba(9,15,26,0.55)",
                      backdropFilter: "blur(10px) saturate(140%)",
                      WebkitBackdropFilter: "blur(10px) saturate(140%)",
                      boxShadow: "0 14px 34px -16px rgba(0,0,0,0.7)",
                    }
                  : undefined
              }
            >
              <p
                className="mb-2 font-semibold text-[color:var(--gold-500)]"
                style={{ fontSize: "0.875rem", letterSpacing: "0.28em" }}
              >
                {SEQUENCE_EYEBROW}
              </p>
              {/* Stage text (cross-fades by scroll progress) */}
              <div
                className="relative"
                style={{
                  height: isMobile ? "2.25rem" : "clamp(2.5rem, 6vw, 3.5rem)",
                }}
              >
                {SEQUENCE_STAGES.map((st, i) => (
                  <span
                    key={i}
                    className="absolute text-white transition-opacity duration-500"
                    style={{
                      insetInlineStart: 0,
                      insetInlineEnd: isMobile ? 0 : undefined,
                      top: 0,
                      opacity: stage === i ? 1 : 0,
                      fontFamily: "var(--font-display), sans-serif",
                      fontSize: isMobile
                        ? "1.4rem"
                        : "clamp(1.6rem, 3.8vw, 2.6rem)",
                      fontWeight: 700,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {st.text}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Model — centred in the space below the caption. The top padding
              mirrors the caption's height + offset, so however large the frame
              grows it can never slide underneath the text. */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 sm:gap-5"
            style={{
              paddingTop: isMobile
                ? "clamp(8.5rem, calc(7vh + 6rem), 12rem)"
                : "clamp(10rem, calc(13vh + 6rem), 15rem)",
              paddingBottom: isMobile
                ? "clamp(2rem, 6vh, 4rem)"
                : "clamp(1rem, 3vh, 2rem)",
            }}
          >
            {/* Floating scroll hint — sits directly ABOVE the model; gently
                bobs, then retreats once the model is complete (last stage). */}
            <div
              aria-hidden="true"
              className="seq-scroll-hint-wrap pointer-events-none z-20 flex justify-center px-4 transition-opacity duration-700"
              style={{ opacity: stage === SEQUENCE_STAGES.length - 1 ? 0 : 1 }}
            >
              <span
                className="seq-scroll-hint inline-flex items-center gap-2.5 rounded-full border px-6 py-3 text-base sm:text-lg font-semibold text-white"
                style={{
                  borderColor: "rgba(255,255,255,0.22)",
                  background: "rgba(9,15,26,0.5)",
                  backdropFilter: "blur(10px) saturate(140%)",
                  WebkitBackdropFilter: "blur(10px) saturate(140%)",
                  boxShadow: "0 12px 30px -14px rgba(0,0,0,0.7)",
                }}
              >
                גלילה למטה תבנה את הפרויקט
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "var(--gold-400)" }}
                >
                  <path d="M12 5v14M6 13l6 6 6-6" />
                </svg>
              </span>
              <style>
                {
                  "@keyframes seqBob{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}.seq-scroll-hint{animation:seqBob 1.8s var(--ease-brand) infinite}@media (prefers-reduced-motion: reduce){.seq-scroll-hint{animation:none}}"
                }
              </style>
            </div>

            <SequenceFrame mobile={isMobile}>
              <canvas
                ref={canvasRef}
                className="h-full w-full block"
                style={{
                  opacity: isSequenceReady ? 1 : 0,
                  transition: "opacity 0.5s ease",
                }}
                aria-hidden="true"
              />
              {/* Loading overlay — masks the canvas until the core frame buffer
                  is hot (downloaded + decoded). Fades out smoothly once ready so
                  the user only ever sees a fully-decoded, non-stuttering scrub. */}
              <div
                className="absolute inset-0 grid place-items-center"
                aria-hidden="true"
                style={{
                  background: "#05090f",
                  opacity: isSequenceReady ? 0 : 1,
                  visibility: isSequenceReady ? "hidden" : "visible",
                  pointerEvents: isSequenceReady ? "none" : "auto",
                  transition: `opacity 0.5s ease, visibility 0s linear ${
                    isSequenceReady ? "0.5s" : "0s"
                  }`,
                }}
              >
                <style>{"@keyframes seqSpin{to{transform:rotate(360deg)}}"}</style>
                <div className="flex flex-col items-center gap-4">
                  <span
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      border: "2px solid rgba(255,255,255,0.14)",
                      borderTopColor: "var(--gold-500)",
                      animation: "seqSpin 0.9s linear infinite",
                    }}
                  />
                  <span
                    className="caption"
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      letterSpacing: "0.12em",
                    }}
                  >
                    טוען…
                  </span>
                </div>
              </div>
            </SequenceFrame>
          </div>
        </div>
      </div>
    </section>
  );
}

/** The centered, framed "museum object" square that holds the sequence. */
function SequenceFrame({
  children,
  mobile = false,
}: {
  children: React.ReactNode;
  mobile?: boolean;
}) {
  return (
    <div
      className="relative w-full mx-auto"
      style={{
        // Desktop: as large as the viewport allows — capped by width AND by the
        // height remaining below the caption (so the two never collide).
        // Mobile: full-bleed width and a tall 3:4 frame (vs the source 16:9).
        // Cover-fit scales the landscape frame to fill the height, cropping only
        // the empty background at the sides while the whole tower stays fully in
        // frame — so the model renders far larger, using the ample vertical space
        // that the old 3:2 frame left empty.
        maxWidth: mobile
          ? "min(78vw, 20rem)"
          : "min(1150px, 92vw, calc((100svh - clamp(11rem, 13vh + 7rem, 16rem)) * 1.7))",
        aspectRatio: mobile ? "4 / 5" : ASPECT,
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
