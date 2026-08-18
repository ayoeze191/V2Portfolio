"use client";

import { useRef, type ElementType } from "react";
import { gsap, useGSAP, EASE, prefersReducedMotion } from "@/app/lib/gsap";
import SectionHead from "./SectionHead";
import { SplitReveal, Marquee } from "./Anim";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiExpress,
  SiFirebase,
  SiVuedotjs,
  SiDjango,
  SiThreedotjs,
  SiJavascript,
  SiRedux,
  SiGraphql,
  SiPrisma,
  SiRedis,
  SiVercel,
  SiGreensock,
  SiExpo,
} from "react-icons/si";
import { FaMobileAlt, FaPython } from "react-icons/fa";

type Tech = { name: string; icon: ElementType };

/** Grouped the way dorisfaki.tech splits competence, numbered the way anthonyokeh.com does. */
const GROUPS: { label: string; items: Tech[] }[] = [
  {
    label: "Frontend & Mobile",
    items: [
      { name: "React", icon: SiReact },
      { name: "React Native", icon: FaMobileAlt },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Expo", icon: SiExpo },
      { name: "Vue 3", icon: SiVuedotjs },
      { name: "Redux", icon: SiRedux },
      { name: "Tailwind", icon: SiTailwindcss },
      { name: "GSAP", icon: SiGreensock },
      { name: "Three.js", icon: SiThreedotjs },
    ],
  },
  {
    label: "Backend & Data",
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express", icon: SiExpress },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Prisma", icon: SiPrisma },
      { name: "Redis", icon: SiRedis },
      { name: "GraphQL", icon: SiGraphql },
      { name: "Python", icon: FaPython },
      { name: "Django", icon: SiDjango },
    ],
  },
  {
    label: "Platform & Tooling",
    items: [
      { name: "Docker", icon: SiDocker },
      { name: "Git", icon: SiGit },
      { name: "Firebase", icon: SiFirebase },
      { name: "Vercel", icon: SiVercel },
    ],
  },
];

/**
 * Numbering runs continuously across groups (01 … 24). Precomputed rather than
 * incremented during render — a render-time counter is not idempotent.
 */
const GROUP_OFFSETS = GROUPS.reduce<number[]>((acc, group, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + GROUPS[i - 1].items.length);
  return acc;
}, []);

const TOTAL_TOOLS = GROUPS.reduce((n, g) => n + g.items.length, 0);

const MARQUEE_WORDS = [
  "React Native",
  "Node.js",
  "TypeScript",
  "PostgreSQL",
  "Next.js",
  "Express",
  "Prisma",
  "Redis",
];

export default function TechStack() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set("[data-cell]", { opacity: 1 });
        return;
      }

      gsap.set("[data-cell]", { opacity: 1 });

      // Cells pop in per-group, so each block reads as its own unit.
      gsap.utils.toArray<HTMLElement>("[data-group]").forEach((group) => {
        gsap.from(group.querySelectorAll("[data-cell]"), {
          opacity: 0,
          scale: 0.9,
          duration: 0.55,
          ease: EASE,
          stagger: { each: 0.035, from: "start" },
          scrollTrigger: { trigger: group, start: "top 88%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="stack" className="section">
      <div className="shell" ref={root}>
        <SectionHead index="04" title="Stack" aside={`${TOTAL_TOOLS} tools`} />

        <SplitReveal as="h2" className="display-md max-w-[16ch] mb-4">
          The tools I reach for first.
        </SplitReveal>
        <p className="lede mb-14">
          Deep in the React and Node ecosystem, comfortable everywhere else.
          Nothing here is on the list because it looked good on a CV.
        </p>

        <div className="space-y-12">
          {GROUPS.map((group, gi) => (
            <div key={group.label} data-group>
              <div className="flex items-baseline gap-4 mb-5">
                <span className="mono-accent">{group.label}</span>
                <span className="mono ml-auto">{group.items.length}</span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1.5">
                {group.items.map((tech, ti) => (
                  <div
                    key={tech.name}
                    data-cell
                    className="stack-cell"
                    style={{ opacity: 0 }}
                  >
                    <span className="num">
                      {String(GROUP_OFFSETS[gi] + ti + 1).padStart(2, "0")}
                    </span>
                    <tech.icon className="w-6 h-6 self-start" />
                    <span className="label">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-bleed marquee — the one piece of pure motion in this section */}
      <div className="mt-20 py-6">
        <Marquee speed={34}>
          {MARQUEE_WORDS.map((word, i) => (
            <span
              key={word}
              className={`marquee-item ${i % 2 === 1 ? "solid" : ""}`}
            >
              {word} <span className="text-[var(--accent)]">·</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
