"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import {
  gsap,
  SplitText,
  useGSAP,
  EASE,
  EASE_EXPO,
  prefersReducedMotion,
  whenFontsReady,
} from "@/app/lib/gsap";

/* ============================================================
   SplitReveal — masked line-by-line rise for display headlines.
   The signature move of the site: text climbs out from behind a
   clipped box rather than just fading in.
   ============================================================ */
export function SplitReveal({
  children,
  as: Tag = "h2",
  className = "",
  type = "lines",
  stagger = 0.09,
  delay = 0,
  start = "top 85%",
  immediate = false,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  type?: "lines" | "chars" | "words";
  stagger?: number;
  delay?: number;
  start?: string;
  immediate?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        gsap.set(el, { opacity: 1 });
        return;
      }

      let split: SplitText | null = null;

      whenFontsReady(() => {
        if (!ref.current) return;
        gsap.set(el, { opacity: 1 });

        split = SplitText.create(el, {
          type,
          mask: type,
          autoSplit: true,
        });

        const targets =
          type === "chars"
            ? split.chars
            : type === "words"
              ? split.words
              : split.lines;

        gsap.from(targets, {
          yPercent: 115,
          duration: 1.1,
          ease: EASE_EXPO,
          stagger,
          delay,
          ...(immediate
            ? {}
            : { scrollTrigger: { trigger: el, start, once: true } }),
        });
      });

      return () => split?.revert();
    },
    { scope: ref },
  );

  // opacity:0 avoids a flash of unsplit text before fonts settle; GSAP restores it.
  return (
    <Tag ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </Tag>
  );
}

/* ============================================================
   FadeUp — the workhorse scroll reveal for blocks of content.
   Children are staggered when `stagger` is set.
   ============================================================ */
export function FadeUp({
  children,
  className = "",
  as: Tag = "div",
  y = 40,
  delay = 0,
  duration = 0.9,
  stagger,
  start = "top 88%",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  y?: number;
  delay?: number;
  duration?: number;
  stagger?: number;
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        gsap.set(el, { opacity: 1 });
        return;
      }

      const targets =
        stagger != null ? (Array.from(el.children) as HTMLElement[]) : el;

      gsap.set(el, { opacity: 1 });
      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        delay,
        ease: EASE,
        stagger,
        scrollTrigger: { trigger: el, start, once: true },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </Tag>
  );
}

/* ============================================================
   Counter — animates a number up when it scrolls into view.
   Used for the impact metrics in About.
   ============================================================ */
export function Counter({
  to,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        el.textContent = `${prefix}${to}${suffix}`;
        return;
      }

      const counter = { value: 0 };
      gsap.to(counter, {
        value: to,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(counter.value)}${suffix}`;
        },
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}

/* ============================================================
   Marquee — seamless infinite scroller driven by GSAP.
   Duplicates its children once and translates by exactly -50%,
   so the loop point is invisible.
   ============================================================ */
export function Marquee({
  children,
  speed = 30,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = ref.current?.firstElementChild;
      if (!track || prefersReducedMotion()) return;

      gsap.to(track, {
        xPercent: reverse ? 0 : -50,
        ease: "none",
        duration: speed,
        repeat: -1,
        startAt: { xPercent: reverse ? -50 : 0 },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div className="flex w-max">
        {/* Two identical halves, so a -50% translate lands exactly on the seam. */}
        <span className="flex shrink-0">{children}</span>
        <span aria-hidden="true" className="flex shrink-0">
          {children}
        </span>
      </div>
    </div>
  );
}
