"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export const EASE = "power3.out";
export const EASE_EXPO = "expo.out";

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function whenFontsReady(cb: () => void) {
  if (typeof document === "undefined") return;
  if (document.fonts?.status === "loaded") {
    cb();
    return;
  }
  document.fonts?.ready.then(cb).catch(() => cb());
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
