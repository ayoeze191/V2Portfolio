"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/app/lib/gsap";

/**
 * Drives the whole page through Lenis and hands scroll position to ScrollTrigger.
 *
 * Lenis takes over the scroll position, so ScrollTrigger must be told to read
 * from it (lenis.on("scroll", ScrollTrigger.update)) and both must be driven by
 * a single ticker — otherwise pinned sections drift a frame behind the content.
 */
export default function SmoothScroll() {
  useEffect(() => {
    // Reduced motion: leave native scrolling entirely alone.
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Native momentum on touch feels better than a JS-interpolated one.
      syncTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Anchor links must go through Lenis, or they fight the interpolated position.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -8, duration: 1.2 });
    };

    document.addEventListener("click", onClick);

    // Late-loading images change document height; recalculate once settled.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
