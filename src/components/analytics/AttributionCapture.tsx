"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/**
 * Stores the landing URL's ad-click params (gclid / UTM) once per page load,
 * so a lead submitted later — even after a refresh or a return visit — still
 * records which ad brought it. See lib/attribution.ts. Renders nothing.
 */
export function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
