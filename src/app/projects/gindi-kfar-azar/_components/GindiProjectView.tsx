"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { DesignOne } from "./DesignOne";
import { DesignTwo } from "./DesignTwo";

type Design = "editorial" | "product";

/**
 * Client wrapper for the Gindi · כפר אז"ר project page. Holds the active design
 * and renders a small top-left toggle to flip between the two candidate layouts
 * while the final direction is being decided.
 */
export function GindiProjectView() {
  const [design, setDesign] = useState<Design>("editorial");

  return (
    <div className="relative">
      <Header />

      {/* Small design toggle, pinned top-left — pushed below the fixed navbar */}
      <div className="fixed top-20 sm:top-24 left-4 z-50" dir="ltr">
        <div className="flex items-center rounded-full border border-black/10 bg-white/80 p-0.5 text-xs font-medium shadow-lg backdrop-blur">
          <button
            type="button"
            onClick={() => setDesign("editorial")}
            aria-pressed={design === "editorial"}
            className={`rounded-full px-3 py-1 transition ${
              design === "editorial"
                ? "bg-[color:var(--ink-950)] text-white"
                : "text-[color:var(--ink-950)]/60 hover:text-[color:var(--ink-950)]"
            }`}
          >
            עיצוב 1
          </button>
          <button
            type="button"
            onClick={() => setDesign("product")}
            aria-pressed={design === "product"}
            className={`rounded-full px-3 py-1 transition ${
              design === "product"
                ? "bg-[color:var(--ink-950)] text-white"
                : "text-[color:var(--ink-950)]/60 hover:text-[color:var(--ink-950)]"
            }`}
          >
            עיצוב 2
          </button>
        </div>
      </div>

      {design === "editorial" ? <DesignOne /> : <DesignTwo />}
    </div>
  );
}
