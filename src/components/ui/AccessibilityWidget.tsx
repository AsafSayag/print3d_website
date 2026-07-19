"use client";

import { useEffect, useRef, useState } from "react";
import { useNearFooter, useAtPageBottom } from "@/lib/useNearFooter";

/** Persisted accessibility preferences. */
type Prefs = {
  /** Font-scale step: 0 = default, up to 3. */
  font: number;
  contrast: boolean;
  links: boolean;
  motion: boolean;
};

const DEFAULT_PREFS: Prefs = { font: 0, contrast: false, links: false, motion: false };
const STORAGE_KEY = "print3d-a11y";
const FONT_SIZES = ["", "112.5%", "125%", "137.5%"];

function apply(prefs: Prefs) {
  const root = document.documentElement;
  root.style.fontSize = FONT_SIZES[prefs.font] || "";
  root.classList.toggle("a11y-contrast", prefs.contrast);
  root.classList.toggle("a11y-links", prefs.links);
  root.classList.toggle("a11y-motion", prefs.motion);
}

/**
 * Floating Hebrew accessibility menu (bottom-left). Lets visitors enlarge the
 * text, raise contrast, highlight links and stop animations. Preferences
 * persist in localStorage and apply on every page load. Fully RTL / Hebrew.
 */
export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const compact = useNearFooter();
  const atBottom = useAtPageBottom();

  // Load saved preferences once, on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = { ...DEFAULT_PREFS, ...JSON.parse(raw) } as Prefs;
        // Hydrate once from persisted prefs on mount. Reading localStorage in a
        // useState initializer would mismatch SSR, so this belongs in an effect.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPrefs(saved);
        apply(saved);
      }
    } catch {
      /* ignore malformed storage */
    }
  }, []);

  // Persist + apply on every change.
  useEffect(() => {
    apply(prefs);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      /* storage may be unavailable */
    }
  }, [prefs]);

  // Close on Escape and on outside click.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !btnRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const set = (patch: Partial<Prefs>) => setPrefs((p) => ({ ...p, ...patch }));
  const isDefault =
    prefs.font === 0 && !prefs.contrast && !prefs.links && !prefs.motion;

  return (
    <div
      className={`a11y-widget${atBottom ? " a11y-widget--raised" : ""}`}
      dir="rtl"
    >
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="תפריט נגישות"
          className="a11y-panel"
        >
          <div className="a11y-panel-head">
            <span className="font-display text-base text-white">נגישות</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="סגירת תפריט הנגישות"
              className="a11y-close"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          {/* Text size */}
          <div className="a11y-row">
            <span className="a11y-label">גודל הטקסט</span>
            <div className="a11y-stepper">
              <button
                type="button"
                onClick={() => set({ font: Math.max(0, prefs.font - 1) })}
                disabled={prefs.font === 0}
                aria-label="הקטנת הטקסט"
                className="a11y-step"
              >
                A−
              </button>
              <span className="a11y-step-val" aria-hidden="true">
                {prefs.font === 0 ? "רגיל" : `+${prefs.font}`}
              </span>
              <button
                type="button"
                onClick={() => set({ font: Math.min(3, prefs.font + 1) })}
                disabled={prefs.font === 3}
                aria-label="הגדלת הטקסט"
                className="a11y-step"
              >
                A+
              </button>
            </div>
          </div>

          <ToggleRow
            label="ניגודיות גבוהה"
            checked={prefs.contrast}
            onChange={(v) => set({ contrast: v })}
          />
          <ToggleRow
            label="הדגשת קישורים"
            checked={prefs.links}
            onChange={(v) => set({ links: v })}
          />
          <ToggleRow
            label="עצירת אנימציות"
            checked={prefs.motion}
            onChange={(v) => set({ motion: v })}
          />

          <div className="a11y-panel-foot">
            <button
              type="button"
              onClick={() => setPrefs(DEFAULT_PREFS)}
              disabled={isDefault}
              className="a11y-reset"
            >
              איפוס הגדרות
            </button>
            <a href="/legal/accessibility" className="a11y-statement">
              הצהרת נגישות
            </a>
          </div>
        </div>
      )}

      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="תפריט נגישות"
        className={`a11y-fab${compact ? " a11y-fab--compact" : ""}`}
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
          <circle cx="12" cy="3.6" r="1.9" />
          <path d="M20 7.5c0 .7-.5 1.2-1.2 1.3l-4.3.6v2.3l2.3 6.6a1.3 1.3 0 0 1-2.45.85L12 15.3l-2.35 4.45a1.3 1.3 0 0 1-2.45-.85l2.3-6.6V9.4l-4.3-.6A1.28 1.28 0 0 1 5.2 6.3l5 .95a11 11 0 0 0 3.6 0l5-.95c.6-.1 1 .3 1 .95Z" />
        </svg>
      </button>
    </div>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="a11y-row a11y-toggle-row"
    >
      <span className="a11y-label">{label}</span>
      <span className={`a11y-switch ${checked ? "is-on" : ""}`} aria-hidden="true">
        <span className="a11y-knob" />
      </span>
    </button>
  );
}
