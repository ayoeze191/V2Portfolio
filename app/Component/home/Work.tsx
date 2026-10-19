"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { container, item, viewport } from "../Reveal";
import { projects, type Project } from "@/app/data/projects";

/** What kind of product each one is — not what it's built with. */
const DOMAIN: Record<string, string> = {
  luideo: "E-commerce",
  ajo: "FinTech",
  "debsphere-academy": "SaaS · EdTech",
  learnpally: "EdTech",
  ekopages: "E-commerce",
  unilms: "EdTech",
};

// Roov leads the hero, so it isn't repeated here.
const SHOWN = ["luideo", "learnpally", "debsphere-academy", "ekopages"];

const FEATURED = SHOWN.map((slug) => projects.find((p) => p.slug === slug)).filter(
  (p): p is Project => Boolean(p),
);

// Matches --nav-h: the pinned area starts just under the sticky nav.
const NAV_H = 60;

function Heading() {
  return (
    <h2 className="h2 max-w-[20ch]">
      Selected work, <em>shipped and in use</em>
    </h2>
  );
}

/**
 * The card opens the live project; "Case study" is its own link on top.
 * Links can't nest, so the card link is stretched over the panel and the
 * case study link sits above it.
 */
function ProjectCard({ project }: { project: Project }) {
  const href = project.live ?? `/projects/${project.slug}`;

  return (
    <article className="panel panel-link lift relative flex flex-col h-full p-2.5 md:p-3">
      <a
        href={href}
        target={project.live ? "_blank" : undefined}
        rel={project.live ? "noopener noreferrer" : undefined}
        aria-label={project.live ? `Visit ${project.title}` : `${project.title} case study`}
        className="absolute inset-0 z-10 rounded-[var(--radius)]"
      />
      <div className="stage aspect-[16/10]">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} interface`}
            fill
            sizes="(max-width: 768px) 85vw, 600px"
            className="object-cover object-top"
          />
        ) : null}
      </div>
      <div className="flex-1 flex flex-col px-3 pt-5 pb-3">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="h4">
            {project.title}
            {project.live ? (
              <span className="text-[var(--fg-3)] font-normal" aria-hidden>
                {" "}↗
              </span>
            ) : null}
          </h3>
          <span className="meta shrink-0">
            {DOMAIN[project.slug] ?? project.role} · {project.year}
          </span>
        </div>
        <p className="small mt-1.5 flex-1 max-w-[60ch]">{project.summary}</p>
        <div className="flex items-center justify-between gap-4 mt-5">
          <p className="meta dotted">
            {project.tech.slice(0, 3).map((t) => (
              <span key={t}>{t}</span>
            ))}
          </p>
          <Link href={`/projects/${project.slug}`} className="link shrink-0 relative z-20">
            Case study <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

function SeeAll({ className = "" }: { className?: string }) {
  return (
    <Link href="/projects" className={`btn btn-secondary btn-lg ${className}`}>
      See all {projects.length} projects <span aria-hidden>→</span>
    </Link>
  );
}

/** A card in the rail: full strength when centred, dimmed either side. */
function RailCard({
  project,
  index,
  progress,
}: {
  project: Project;
  index: number;
  progress: MotionValue<number>;
}) {
  // Slots on the rail: every project plus the "More projects" card at the end.
  const slots = FEATURED.length;
  const at = index / slots;
  const step = 1 / slots;
  const range = [at - step, at, at + step];
  const opacity = useTransform(progress, range, [0.35, 1, 0.35]);
  const scale = useTransform(progress, range, [0.94, 1, 0.94]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="shrink-0 w-[min(560px,82vw)]"
    >
      <ProjectCard project={project} />
    </motion.div>
  );
}

/**
 * Vertical scroll drives a horizontal rail: the section pins under the
 * nav and the cards slide past one at a time. Purely scroll-linked —
 * nothing runs while the page is idle.
 */
function Rail() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // How far the track has to travel; 1px of scroll moves it 1px.
  const distance = useMotionValue(0);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const view = viewportRef.current;
      const section = sectionRef.current;
      if (!track || !view || !section) return;
      const d = Math.max(0, track.scrollWidth - view.clientWidth);
      distance.set(d);
      section.style.height = `calc(100vh - ${NAV_H}px + ${d}px)`;
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, [distance]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: [`start ${NAV_H}px`, "end end"],
  });
  // Range-mapped transforms clamp to [0, 1], so past the end the rail stays
  // put while the section unpins.
  const travelled = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x = useTransform(() => -travelled.get() * distance.get());

  return (
    <section id="work" ref={sectionRef} className="relative">
      <div
        className="sticky overflow-hidden flex flex-col justify-center"
        style={{ top: NAV_H, height: `calc(100vh - ${NAV_H}px)` }}
      >
        <div className="wrap flex flex-wrap items-end justify-between gap-4 mb-6 md:mb-8">
          <Heading />
          <div className="flex items-center gap-3 w-40">
            <div className="h-px flex-1 bg-[var(--line-strong)] overflow-hidden">
              <motion.div
                style={{ scaleX: travelled }}
                className="h-full bg-[var(--fg)] origin-left"
              />
            </div>
            <span className="meta">{FEATURED.length} projects</span>
          </div>
        </div>

        <div ref={viewportRef} className="wrap">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex items-stretch gap-4 w-max pr-[var(--gutter)]"
          >
            {FEATURED.map((project, i) => (
              <RailCard key={project.slug} project={project} index={i} progress={scrollYProgress} />
            ))}
            <div className="shrink-0 w-[min(320px,70vw)] panel grid place-items-center p-6 text-center">
              <div>
                <p className="h4">More projects</p>
                <p className="small mt-2">Personal builds, client work and everything else.</p>
                <SeeAll className="mt-6" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** Plain grid for anyone who has asked their OS for less motion. */
function Grid() {
  return (
    <section id="work" className="sec">
      <div className="wrap">
        <div className="sec-head">
          <Heading />
        </div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={container(0.07)}
          className="grid md:grid-cols-2 gap-3"
        >
          {FEATURED.map((project) => (
            <motion.div key={project.slug} variants={item}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-8 flex justify-center">
          <SeeAll />
        </div>
      </div>
    </section>
  );
}

export default function Work() {
  const reduce = useReducedMotion();
  return reduce ? <Grid /> : <Rail />;
}
