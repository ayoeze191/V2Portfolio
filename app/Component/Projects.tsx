"use client";

import { useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { gsap, useGSAP, EASE, prefersReducedMotion } from "@/app/lib/gsap";
import SectionHead from "./SectionHead";
import { SplitReveal } from "./Anim";

import debsphere from "./../assets/images/Projects/debsphere.png";
import learnpally from "./../assets/images/Projects/learnpally.png";
import ekopages from "./../assets/images/Projects/ekopages.png";
import mctechy from "./../assets/images/Projects/Mctechy.png";
import unilms from "./../assets/images/Projects/unilms.png";
import shibayc from "./../assets/images/Projects/shibayc.png";

type Work = {
  title: string;
  role: string;
  year: string;
  summary: string;
  tech: string[];
  live?: string;
  image?: StaticImageData;
};

const WORK: Work[] = [
  {
    title: "Debsphere Academy",
    role: "Tech Lead",
    year: "2025",
    summary:
      "Led the team building a full-stack learning platform — queue-backed background jobs, Prisma data layer, and a Next.js frontend.",
    tech: ["Next.js", "Node.js", "Prisma", "PostgreSQL", "Redis", "BullMQ"],
    live: "https://www.debshphereacademy.com/",
    image: debsphere,
  },
  {
    title: "Learnpally",
    role: "Full-Stack Engineer",
    year: "2024",
    summary:
      "E-learning platform across web and mobile. Course management, Paystack payments, background jobs for email and video processing, and PostHog analytics.",
    tech: ["React", "React Native", "Node.js", "Express", "MongoDB", "Paystack"],
    live: "https://learn.learnpally.com",
    image: learnpally,
  },
  {
    title: "RentAnything",
    role: "Full-Stack Developer",
    year: "2024",
    summary:
      "Rental marketplace with a custom Vue 3 SSR pipeline, full booking and pricing workflows, and Google Maps location search.",
    tech: ["Vue 3", "Vite SSR", "Node.js", "Google Maps API"],
    live: "https://rentanything.io",
  },
  {
    title: "EkoPages",
    role: "Frontend Developer",
    year: "2023",
    summary:
      "Educational platform teaching African children about the SDGs through illustrated stories, courses, and blended learning programmes.",
    tech: ["Next.js", "TypeScript", "Django", "Tailwind"],
    live: "https://ekopages.com",
    image: ekopages,
  },
  {
    title: "UniLMS",
    role: "Full-Stack Developer",
    year: "2024",
    summary:
      "University learning management system covering course delivery, assignments, assessments, and student progress tracking.",
    tech: ["Next.js", "TypeScript", "Prisma", "Tailwind"],
    live: "https://eazy-lmsfrontend.netlify.app/",
    image: unilms,
  },
  {
    title: "McTechy",
    role: "Frontend Developer",
    year: "2023",
    summary:
      "Conversion-focused landing site for a tech bootcamp — course catalogue, graduate stories, and lead capture.",
    tech: ["React", "Tailwind", "Framer Motion"],
    live: "https://mktechy.netlify.app/",
    image: mctechy,
  },
  {
    title: "ShibaYC",
    role: "Frontend Developer",
    year: "2022",
    summary:
      "Web3 collection landing experience with minting flow and animated reveal sequence.",
    tech: ["React", "Web3", "CSS"],
    image: shibayc,
  },
];

export default function Projects() {
  const root = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  /* Cursor-tracking preview: quickTo keeps it buttery without a listener storm. */
  useGSAP(
    () => {
      const preview = previewRef.current;
      if (!preview || prefersReducedMotion()) return;

      // Only meaningful for real pointers — skip entirely on touch.
      if (!window.matchMedia("(hover: hover)").matches) return;

      const xTo = gsap.quickTo(preview, "x", { duration: 0.55, ease: "power3" });
      const yTo = gsap.quickTo(preview, "y", { duration: 0.55, ease: "power3" });

      const onMove = (e: MouseEvent) => {
        // Offset so the panel sits beside the cursor, not under it.
        xTo(e.clientX + 28);
        yTo(e.clientY - 100);
      };

      const el = root.current;
      el?.addEventListener("mousemove", onMove);
      return () => el?.removeEventListener("mousemove", onMove);
    },
    { scope: root },
  );

  /* Fade the preview in and out as rows are entered and left. */
  useGSAP(
    () => {
      const preview = previewRef.current;
      if (!preview || prefersReducedMotion()) return;

      gsap.to(preview, {
        opacity: active !== null && WORK[active]?.image ? 1 : 0,
        scale: active !== null ? 1 : 0.92,
        duration: 0.45,
        ease: EASE,
      });
    },
    { dependencies: [active] },
  );

  /* Row-by-row entrance. */
  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set("[data-work-row]", { opacity: 1 });
        return;
      }
      gsap.set("[data-work-row]", { opacity: 1 });
      gsap.from("[data-work-row]", {
        opacity: 0,
        y: 44,
        duration: 0.85,
        ease: EASE,
        stagger: 0.07,
        scrollTrigger: { trigger: "[data-work-list]", start: "top 82%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section id="work" className="section">
      <div className="shell" ref={root}>
        <SectionHead index="03" title="Selected Work" aside="2022 — 2025" />

        <SplitReveal as="h2" className="display-md max-w-[15ch] mb-12">
          Things I&apos;ve shipped and still stand behind.
        </SplitReveal>

        <div data-work-list className="border-t border-[var(--line)]">
          {WORK.map((item, i) => {
            const Row = (
              <div className="grid grid-cols-12 gap-4 items-baseline">
                <span className="row-index col-span-2 md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="col-span-10 md:col-span-4 row-title">
                  <h3 className="text-xl md:text-3xl font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mono mt-1">{item.role}</p>
                </div>

                <p className="col-span-12 md:col-span-4 text-sm leading-relaxed mt-3 md:mt-0">
                  {item.summary}
                </p>

                <div className="col-span-8 md:col-span-2 flex flex-wrap gap-1.5 mt-3 md:mt-0">
                  {item.tech.slice(0, 3).map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>

                <span className="mono col-span-4 md:col-span-1 text-right mt-3 md:mt-0">
                  {item.live ? "↗" : ""} {item.year}
                </span>

                {/* Touch devices get an inline thumbnail instead of the hover preview. */}
                {item.image && (
                  <div className="col-span-12 mt-4 md:hidden relative aspect-[3/2] border border-[var(--line)] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            );

            return (
              <div
                key={item.title}
                data-work-row
                className="row"
                style={{ opacity: 0 }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                {item.live ? (
                  <a
                    href={item.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {Row}
                  </a>
                ) : (
                  Row
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <Link href="/projects" className="link-arrow">
            View the full archive <span className="arrow">→</span>
          </Link>
          <span className="mono hidden md:inline">Hover a row to preview</span>
        </div>
      </div>

      {/* Floating cursor preview — desktop only, driven by gsap.quickTo */}
      <div
        ref={previewRef}
        className="row-preview hidden md:block"
        aria-hidden="true"
      >
        {WORK.map((item, i) =>
          item.image ? (
            <Image
              key={item.title}
              src={item.image}
              alt=""
              fill
              sizes="300px"
              className="object-cover transition-opacity duration-300"
              style={{ opacity: active === i ? 1 : 0 }}
            />
          ) : null,
        )}
      </div>
    </section>
  );
}
