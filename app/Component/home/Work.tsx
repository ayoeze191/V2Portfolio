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
import SectionHead from "../site/SectionHead";
import { container, item, viewport } from "../Reveal";
import { projects, type Project } from "@/app/data/projects";

/** What kind of product each one is — not what it's built with. */
const DOMAIN: Record<string, string> = {
  roov: "PropTech",
  luideo: "E-commerce",
  ajo: "FinTech",
  "debsphere-academy": "EdTech",
  learnpally: "EdTech",
  ekopages: "E-commerce",
  unilms: "EdTech",
};

const SHOWN = ["roov", "ajo", "debsphere-academy", "luideo", "learnpally", "ekopages"];

const FEATURED = SHOWN.map((slug) => projects.find((p) => p.slug === slug)).filter(
  (p): p is Project => Boolean(p),
);

// Matches --nav-h: the pinned area starts just under the sticky HUD.
const NAV_H = 52;

const head = (
  <SectionHead
    giant
    index="01"
    cmd={
      <>
        <span className="k">kubectl</span> get deployments -n work
      </>
    }
    title={
      <>
        Deploy<em>ments</em>
      </>
    }
  />
);

function Stage({ project }: { project: Project }) {
  if (project.screens?.length) {
    return (
      <div className="stage aspect-[16/10] flex items-start justify-center gap-[4%] pt-[6%] bp-grid">
        {project.screens.slice(0, 3).map((screen, i) => (
          <div key={screen.label} className={`phone w-[26%] shrink-0 ${i === 1 ? "mt-[5%]" : ""}`}>
            <Image src={screen.src} alt={`${project.title} — ${screen.label}`} sizes="160px" className="w-full h-auto" />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="stage aspect-[16/10]">
      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.title} interface`}
          fill
          sizes="(max-width: 768px) 85vw, 560px"
          className="object-cover object-top"
        />
      ) : null}
    </div>
  );
}

/**
 * A deployment, drawn as a pod. The card opens the live project; "Describe"
 * (the case study) is its own link above the stretched card link.
 */
function ProjectPod({ project }: { project: Project }) {
  const href = project.live ?? `/projects/${project.slug}`;
  const running = Boolean(project.live);

  return (
    <article className="pod panel-link lift relative flex flex-col h-full">
      <a
        href={href}
        target={project.live ? "_blank" : undefined}
        rel={project.live ? "noopener noreferrer" : undefined}
        aria-label={project.live ? `Visit ${project.title}` : `${project.title} case study`}
        className="absolute inset-0 z-10 rounded-[var(--radius)]"
      />
      <div className="pod-bar">
        <span className={`dot ${running ? "ok" : ""}`} />
        <span className={running ? "text-[var(--fg)]" : ""}>{running ? "Running" : "Archived"}</span>
        <span className="text-[var(--fg-3)]">deploy/{project.slug}</span>
        <span className="ml-auto text-[var(--fg-3)]">
          {DOMAIN[project.slug] ?? project.role} · {project.year}
        </span>
      </div>
      <div className="p-2.5">
        <Stage project={project} />
      </div>
      <div className="flex-1 flex flex-col px-5 pt-2 pb-5">
        <div className="flex items-end justify-between gap-4">
          <h3 className="giant text-[2.5rem] md:text-[2.9rem]">
            {project.title}
            {project.live ? (
              <span className="text-[var(--fg-3)] text-[0.5em] align-top ml-1" aria-hidden>
                ↗
              </span>
            ) : null}
          </h3>
          <span className="tag pb-1.5 shrink-0">{project.role}</span>
        </div>
        <p className="small mt-2 flex-1 max-w-[56ch]">{project.summary}</p>
        <div className="flex items-center justify-between gap-4 mt-5 pt-4 border-t border-[var(--line)]">
          <p className="meta dotted">
            {project.tech.slice(0, 3).map((t) => (
              <span key={t}>{t}</span>
            ))}
          </p>
          <Link href={`/projects/${project.slug}`} className="link shrink-0 relative z-20 mono !text-[0.75rem]">
            describe <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

function SeeAll({ className = "" }: { className?: string }) {
  return (
    <Link href="/projects" className={`btn btn-secondary btn-lg ${className}`}>
      All {projects.length} deployments <span aria-hidden>→</span>
    </Link>
  );
}

/** A pod on the rail, with its node on the mesh line above it. */
function RailPod({
  project,
  x,
  viewW,
}: {
  project: Project;
  x: MotionValue<number>;
  viewW: MotionValue<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const centre = useMotionValue(0);
  const span = useMotionValue(560);

  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      centre.set(el.offsetLeft + el.offsetWidth / 2);
      span.set(el.offsetWidth + 20);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, [centre, span]);

  // Distance from the ingress packet (viewport centre), in card widths.
  const rel = useTransform(() => (centre.get() + x.get() - viewW.get() / 2) / span.get());
  const opacity = useTransform(rel, [-1, 0, 1], [0.35, 1, 0.35]);
  const scale = useTransform(rel, [-1, 0, 1], [0.94, 1, 0.94]);
  const glow = useTransform(rel, [-0.35, 0, 0.35], [0, 1, 0]);

  return (
    <div ref={ref} className="relative shrink-0 w-[min(540px,84vw)]">
      {/* Mesh node, centred over the pod */}
      <div className="absolute -top-[46px] left-1/2 -translate-x-[9px] flex items-center gap-2.5">
        <span className="relative grid place-items-center w-[18px] h-[18px] rounded-[5px] border border-[var(--line-strong)] bg-[var(--panel-2)]">
          <motion.span style={{ opacity: glow }} className="absolute inset-[-6px] rounded-[8px] border border-[var(--accent)] bg-[var(--accent-tint)] shadow-[0_0_18px_2px_rgba(79,139,255,0.45)]" />
          <span className="relative w-1.5 h-1.5 rounded-[2px] bg-[var(--fg-2)]" />
        </span>
        <span className="tag !text-[0.62rem]">svc/{project.slug}</span>
      </div>
      <motion.div style={{ opacity, scale }} className="h-full">
        <ProjectPod project={project} />
      </motion.div>
    </div>
  );
}

/**
 * Vertical scroll drives a horizontal rail of deployments. The rail is
 * padded so every pod can pass the centre, where the ingress packet sits:
 * traffic seems to reach each service in turn. Purely scroll-linked.
 */
function Rail() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const distance = useMotionValue(0);
  const viewW = useMotionValue(1440);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const view = viewportRef.current;
      const section = sectionRef.current;
      if (!track || !view || !section) return;
      const d = Math.max(0, track.scrollWidth - view.clientWidth);
      distance.set(d);
      viewW.set(view.clientWidth);
      section.style.height = `calc(100vh - ${NAV_H}px + ${d}px)`;
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, [distance, viewW]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: [`start ${NAV_H}px`, "end end"],
  });
  const travelled = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x = useTransform(() => -travelled.get() * distance.get());
  const total = FEATURED.length + 1; // pods plus the archive card
  const count = useTransform(travelled, (v) =>
    String(Math.min(total, Math.round(v * (total - 1)) + 1)).padStart(2, "0"),
  );

  return (
    <section id="work" data-hud="01 · deployments" ref={sectionRef} className="relative bp-grid border-t border-[var(--line)]">
      <div
        className="sticky overflow-hidden flex flex-col justify-center"
        style={{ top: NAV_H, height: `calc(100vh - ${NAV_H}px)` }}
      >
        <div className="wrap-wide flex flex-wrap items-end justify-between gap-4 mb-2 [&_.sec-head]:mb-0 [&_.sec-title]:!text-[clamp(2.6rem,7vw,6rem)]">
          {head}
          <div className="flex items-center gap-4 w-56 pb-2">
            <motion.span className="giant text-[1.6rem] tabular-nums">{count}</motion.span>
            <div className="h-px flex-1 bg-[var(--line-strong)] overflow-hidden">
              <motion.div style={{ scaleX: travelled }} className="h-full bg-[var(--accent)] origin-left" />
            </div>
            <span className="tag">{String(total).padStart(2, "0")}</span>
          </div>
        </div>

        <div ref={viewportRef} className="relative w-full pt-[64px]">
          {/* Ingress: fixed at the centre of the viewport; traffic flows in from the left. */}
          <div className="absolute z-10 top-[27px] inset-x-0 h-px pointer-events-none" aria-hidden>
            <div className="absolute top-0 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-[rgba(79,139,255,0.35)] to-[var(--accent)]" />
            <div className="absolute top-[10px] left-[var(--gutter)] tag !text-[0.6rem] !text-[var(--accent)]">ingress ▸</div>
            <div className="absolute -top-[4px] left-1/2 -translate-x-1/2 w-[9px] h-[9px] rounded-full bg-[var(--accent)] shadow-[0_0_16px_4px_rgba(79,139,255,0.6)]" />
          </div>

          <motion.div
            ref={trackRef}
            style={{ x }}
            className="relative flex items-stretch gap-5 w-max px-[calc(50vw-min(270px,42vw))]"
          >
            {/* Mesh line, moves with the rail */}
            <div className="absolute -top-[37px] left-0 right-0 border-t border-dashed border-[var(--line-strong)]" aria-hidden />
            {FEATURED.map((project) => (
              <RailPod key={project.slug} project={project} x={x} viewW={viewW} />
            ))}
            <div className="relative shrink-0 w-[min(540px,84vw)]">
              <div className="absolute -top-[46px] left-1/2 -translate-x-[9px] flex items-center gap-2.5">
                <span className="w-[18px] h-[18px] rounded-[5px] border border-dashed border-[var(--line-strong)]" />
                <span className="tag !text-[0.62rem]">svc/archive</span>
              </div>
              <div className="pod h-full grid place-items-center p-6 text-center">
                <div>
                  <p className="tag">{projects.length - FEATURED.length} more replicas</p>
                  <p className="giant text-[4rem] mt-3">The rest</p>
                  <p className="small mt-3 max-w-[30ch] mx-auto">Personal builds, client work and everything else.</p>
                  <SeeAll className="mt-7" />
                </div>
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
    <section id="work" data-hud="01 · deployments" className="sec bp-grid border-t border-[var(--line)]">
      <div className="wrap-wide">
        {head}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={container(0.07)}
          className="grid md:grid-cols-2 gap-4"
        >
          {FEATURED.map((project) => (
            <motion.div key={project.slug} variants={item}>
              <ProjectPod project={project} />
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
