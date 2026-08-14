"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// Registered once, at module scope, so every component that imports from here
// gets the same configured gsap instance.
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/** Shared easing + duration language, so every animation on the site feels related. */
export const EASE = "power3.out";
export const EASE_EXPO = "expo.out";

/** Honour the OS-level reduced-motion setting. Read lazily: it is a browser API. */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * SplitText needs webfonts to be settled before it measures line boxes, otherwise
 * lines get split against the fallback font and re-wrap badly on swap.
 */
export function whenFontsReady(cb: () => void) {
  if (typeof document === "undefined") return;
  if (document.fonts?.status === "loaded") {
    cb();
    return;
  }
  document.fonts?.ready.then(cb).catch(() => cb());
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
