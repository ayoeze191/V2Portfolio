"use client";

import { useRef } from "react";
import {
  gsap,
  useGSAP,
  SplitText,
  EASE_EXPO,
  prefersReducedMotion,
  whenFontsReady,
} from "@/app/lib/gsap";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();

      if (reduced) {
        gsap.set("[data-anim]", { opacity: 1 });
        return;
      }

      const splits: SplitText[] = [];

      whenFontsReady(() => {
        if (!root.current) return;

        const lines = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
        lines.forEach((line) => {
          splits.push(SplitText.create(line, { type: "chars", mask: "chars" }));
        });

        gsap.set("[data-anim]", { opacity: 1 });

        const tl = gsap.timeline({ defaults: { ease: EASE_EXPO } });

        tl.from("[data-hero-eyebrow]", {
          yPercent: 100,
          opacity: 0,
          duration: 0.8,
        })
          .from(
            splits.flatMap((s) => s.chars),
            { yPercent: 110, duration: 1.2, stagger: 0.022 },
            "-=0.45",
          )
          .from(
            "[data-hero-copy] > *",
            { y: 26, opacity: 0, duration: 0.9, stagger: 0.09 },
            "-=0.8",
          )
          .from(
            "[data-hero-meta] > *",
            { y: 18, opacity: 0, duration: 0.7, stagger: 0.08 },
            "-=0.7",
          );

        gsap.to("[data-hero-title]", {
          yPercent: -14,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });

        gsap.to("[data-hero-cue]", {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=240",
            scrub: true,
          },
        });
      });

      return () => splits.forEach((s) => s.revert());
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="hero"
      className="flex flex-col justify-end pt-24 pb-12 md:min-h-svh md:pt-32 md:pb-10"
    >
      <div className="shell w-full">
        <div className="overflow-hidden mb-8">
          <div data-anim data-hero-eyebrow style={{ opacity: 0 }}>
            <span className="status">
              <span className="dot" />
              Available for work
            </span>
          </div>
        </div>

        <h1 data-hero-title className="display mb-8">
          <span
            data-anim
            data-hero-line
            className="block"
            style={{ opacity: 0 }}
          >
            Software
          </span>
          <span
            data-anim
            data-hero-line
            className="block text-[var(--fg-faint)]"
            style={{ opacity: 0 }}
          >
            Engineer
          </span>
        </h1>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mt-12">
          <div
            data-anim
            data-hero-copy
            className="lg:col-span-7 space-y-6"
            style={{ opacity: 0 }}
          >
            <p className="lede">
              I build web and mobile products end to end — interfaces people
              actually enjoy using, and the APIs that keep them fast.
            </p>

            <p className="mono !normal-case tracking-[0.06em] text-[var(--fg-muted)]">
              Currently at{" "}
              <span className="text-[var(--accent)]">Roov Africa</span>, a
              property tech company, working in React Native and Node.js.
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-1">
              <a href="#work" className="link-arrow">
                Selected work <span className="arrow">→</span>
              </a>
              <a href="#contact" className="link-arrow">
                Get in touch <span className="arrow">→</span>
              </a>
            </div>
          </div>

          <div
            data-anim
            data-hero-meta
            className="lg:col-span-5 lg:justify-self-end grid grid-cols-2 gap-x-10 gap-y-5 w-full lg:w-auto"
            style={{ opacity: 0 }}
          >
            <div>
              <p className="mono mb-1.5">Based in</p>
              <p className="text-sm text-[var(--fg)]">Lagos, Nigeria</p>
            </div>
            <div>
              <p className="mono mb-1.5">Focus</p>
              <p className="text-sm text-[var(--fg)]">Web · Mobile · APIs</p>
            </div>
            <div>
              <p className="mono mb-1.5">Experience</p>
              <p className="text-sm text-[var(--fg)]">4+ years</p>
            </div>
            <div>
              <p className="mono mb-1.5">Core</p>
              <p className="text-sm text-[var(--fg)]">React Native · Node.js</p>
            </div>
          </div>
        </div>

        <div data-hero-cue className="mt-16 flex items-center justify-between">
          <span className="mono flex items-center gap-2">
            Scroll
            <span className="inline-block animate-bounce">↓</span>
          </span>
          <span className="mono">Est. 2021</span>
        </div>
      </div>
    </section>
  );
}
