"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import SectionHead from "../site/SectionHead";
import { Reveal } from "../Reveal";
import { RESUME } from "@/app/data/site";

/* ── The diagram ───────────────────────────────────────────────── */

type NodeId = "web" | "mobile" | "gw" | "auth" | "pay" | "jobs" | "pg" | "redis" | "git" | "ci" | "reg" | "k8s";

const W = 156;
const H = 46;

const NODES: Record<NodeId, { x: number; y: number; label: string; sub: string; w?: number }> = {
  web: { x: 70, y: 30, label: "web", sub: "react · next" },
  mobile: { x: 300, y: 30, label: "mobile", sub: "react native" },
  gw: { x: 185, y: 175, label: "api-gateway", sub: "node · express" },
  auth: { x: 40, y: 285, w: 140, label: "auth", sub: "jwt · oauth2" },
  pay: { x: 200, y: 285, w: 140, label: "payments", sub: "ledger · webhooks" },
  jobs: { x: 360, y: 285, w: 140, label: "jobs", sub: "bullmq workers" },
  pg: { x: 90, y: 410, label: "postgres", sub: "prisma · migrations" },
  redis: { x: 300, y: 410, label: "redis", sub: "cache · queues" },
  git: { x: 580, y: 30, label: "git push", sub: "main" },
  ci: { x: 580, y: 140, label: "ci", sub: "test · build" },
  reg: { x: 580, y: 250, label: "registry", sub: "docker image" },
  k8s: { x: 580, y: 360, label: "kubernetes", sub: "rolling update" },
};

const box = (id: NodeId) => {
  const n = NODES[id];
  const w = n.w ?? W;
  return { ...n, w, cx: n.x + w / 2, top: n.y, bottom: n.y + H, left: n.x, right: n.x + w, cy: n.y + H / 2 };
};

/** Vertical S-curve from the bottom of one node to the top of another. */
const down = (a: NodeId, b: NodeId) => {
  const A = box(a);
  const B = box(b);
  const my = (A.bottom + B.top) / 2;
  return `M ${A.cx} ${A.bottom} C ${A.cx} ${my}, ${B.cx} ${my}, ${B.cx} ${B.top}`;
};

const EDGES: { id: string; from: NodeId; to: NodeId; d: string; packet?: number }[] = [
  { id: "e1", from: "web", to: "gw", d: down("web", "gw"), packet: 0 },
  { id: "e2", from: "mobile", to: "gw", d: down("mobile", "gw"), packet: 1.1 },
  { id: "e3", from: "gw", to: "auth", d: down("gw", "auth"), packet: 0.6 },
  { id: "e4", from: "gw", to: "pay", d: down("gw", "pay"), packet: 1.6 },
  { id: "e5", from: "gw", to: "jobs", d: down("gw", "jobs"), packet: 2.2 },
  { id: "e6", from: "auth", to: "pg", d: down("auth", "pg"), packet: 1.3 },
  { id: "e7", from: "pay", to: "pg", d: down("pay", "pg"), packet: 2.4 },
  { id: "e8", from: "pay", to: "jobs", d: `M ${box("pay").right} ${box("pay").cy} L ${box("jobs").left} ${box("jobs").cy}` },
  { id: "e9", from: "jobs", to: "redis", d: down("jobs", "redis"), packet: 0.9 },
  { id: "p1", from: "git", to: "ci", d: down("git", "ci"), packet: 0.3 },
  { id: "p2", from: "ci", to: "reg", d: down("ci", "reg"), packet: 1.2 },
  { id: "p3", from: "reg", to: "k8s", d: down("reg", "k8s"), packet: 2.1 },
  {
    id: "p4",
    from: "k8s",
    to: "gw",
    d: `M ${box("k8s").left} ${box("k8s").cy} L 528 ${box("k8s").cy}`,
    packet: 3,
  },
];

/* ── Principles, each tied to the part of the system it governs ── */

const PRINCIPLES: { title: string; body: string; nodes: NodeId[] }[] = [
  {
    title: "The schema comes first",
    body: "Most product bugs start in the data model. I'd rather spend a day on the tables than a quarter on migrations that undo them.",
    nodes: ["pg", "redis"],
  },
  {
    title: "Assume it runs twice",
    body: "Webhooks arrive out of order, jobs retry, networks drop. Anything touching money or state gets keyed so a replay is a no-op.",
    nodes: ["pay", "jobs"],
  },
  {
    title: "Boring where it counts",
    body: "Predictable structure, clear names, and tests around the parts that move money. Access control lives at the data layer, not in components.",
    nodes: ["gw", "auth"],
  },
  {
    title: "Build for ten times the traffic",
    body: "Slow work goes onto a queue before it costs anyone a request. Hot reads get cached. Services stay stateless so they can scale out.",
    nodes: ["gw", "jobs", "redis"],
  },
  {
    title: "Every release can roll back",
    body: "Code reaches production through a pipeline, as an image, with health checks. A bad deploy should be one command from gone.",
    nodes: ["git", "ci", "reg", "k8s"],
  },
];

function Diagram({ active }: { active: Set<NodeId> }) {
  const svgRef = useRef<SVGSVGElement>(null);

  // Packets only animate while the diagram is on screen.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    svg.pauseAnimations();
    if (reduce) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) svg.unpauseAnimations();
      else svg.pauseAnimations();
    });
    io.observe(svg);
    return () => io.disconnect();
  }, []);

  return (
    <svg ref={svgRef} viewBox="0 0 760 480" className="w-full h-auto" role="img" aria-labelledby="arch-title">
      <title id="arch-title">
        Architecture I build: web and mobile clients call an API gateway, which routes to auth,
        payments and job services backed by Postgres and Redis. A pipeline builds images and rolls
        them out to Kubernetes.
      </title>

      {/* Cluster boundary */}
      <motion.rect
        x="20"
        y="140"
        width="508"
        height="332"
        rx="14"
        fill="rgba(79,139,255,0.025)"
        stroke="rgba(79,139,255,0.35)"
        strokeDasharray="5 6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
      <text x="36" y="160" className="mono" fontSize="10" fill="rgba(79,139,255,0.85)" letterSpacing="1.5">
        CLUSTER · PROD
      </text>
      <text x="580" y="20" className="mono" fontSize="10" fill="var(--fg-3)" letterSpacing="1.5">
        DELIVERY
      </text>

      {/* Edges */}
      {EDGES.map((e, i) => {
        const on = active.has(e.from) && active.has(e.to);
        return (
          <motion.path
            key={e.id}
            id={e.id}
            d={e.d}
            className={`arch-edge ${on ? "on" : ""}`}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            transition={{ duration: 0.9, delay: 0.25 + i * 0.06, ease: [0.65, 0, 0.35, 1] }}
          />
        );
      })}

      {/* Packets riding the edges (SMIL, paused off-screen) */}
      {EDGES.filter((e) => e.packet !== undefined).map((e) => (
        <circle key={`pk-${e.id}`} r="3" opacity="0" fill={e.id.startsWith("p") ? "var(--ok)" : "var(--accent)"}>
          <animateMotion dur="2.6s" begin={`${e.packet}s`} repeatCount="indefinite" rotate="auto">
            <mpath href={`#${e.id}`} />
          </animateMotion>
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="2.6s" begin={`${e.packet}s`} repeatCount="indefinite" />
        </circle>
      ))}

      {/* Nodes */}
      {(Object.keys(NODES) as NodeId[]).map((id, i) => {
        const n = box(id);
        const on = active.has(id);
        return (
          <motion.g
            key={id}
            className={`arch-node ${on ? "on" : ""}`}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
          >
            <rect x={n.x} y={n.y} width={n.w} height={H} rx="9" />
            <circle cx={n.x + 14} cy={n.y + 16} r="3.2" fill={on ? "var(--ok)" : "var(--fg-3)"} />
            <text x={n.x + 24} y={n.y + 19.5} fontSize="11.5" style={{ fill: on ? "var(--fg)" : undefined }}>
              {n.label}
            </text>
            <text x={n.x + 14} y={n.y + 35} fontSize="9.5" style={{ fill: "var(--fg-3)" }}>
              {n.sub}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}

/* ── Section ───────────────────────────────────────────────────── */

export default function Approach() {
  const [current, setCurrent] = useState(0);
  const active = new Set<NodeId>(PRINCIPLES[current].nodes);

  return (
    <section id="build" data-hud="02 · architecture" className="sec bp-grid border-t border-[var(--line)]">
      <div className="wrap-wide">
        <SectionHead
          giant
          index="02"
          cmd={
            <>
              <span className="k">kubectl</span> describe engineer ezekiel
            </>
          }
          title={
            <>
              How I <em>build</em>
            </>
          }
        />

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-[1.25rem] md:text-[1.45rem] leading-[1.4] tracking-[-0.02em] text-[var(--fg)]">
                I build the whole thing: React and React Native on the surface, Node.js
                services underneath, and the auth, payment and queue paths in between.{" "}
                <span className="text-[var(--fg-2)]">
                  Then I package it, wire the pipeline and ship it somewhere it can scale.
                </span>
              </p>
              <p className="body mt-5 max-w-[52ch]">
                Right now I&apos;m at Roov, a property tech company, working across the mobile app
                and the services behind it. I&apos;m also learning AI, building with models rather
                than just calling them.
              </p>
              <div className="flex flex-wrap gap-2.5 mt-7">
                <Link href="/about" className="btn btn-secondary">
                  More about me
                </Link>
                <a href={RESUME} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  Résumé ↗
                </a>
              </div>
            </Reveal>

            <p className="tag mt-12 mb-3">Principles · select one to trace it</p>
            <ol className="border-t border-[var(--line)]">
              {PRINCIPLES.map((p, i) => {
                const on = i === current;
                return (
                  <li key={p.title} className="border-b border-[var(--line)]">
                    <button
                      type="button"
                      onMouseEnter={() => setCurrent(i)}
                      onFocus={() => setCurrent(i)}
                      onClick={() => setCurrent(i)}
                      aria-pressed={on}
                      className="w-full text-left py-4 grid grid-cols-[2.5rem_1fr] gap-x-2 group"
                    >
                      <span className={`mono text-[0.75rem] pt-1 ${on ? "text-[var(--accent)]" : "text-[var(--fg-3)]"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span
                          className={`block text-[1.05rem] font-semibold tracking-[-0.015em] transition-colors ${on ? "text-[var(--fg)]" : "text-[var(--fg-2)] group-hover:text-[var(--fg)]"}`}
                        >
                          {p.title}
                        </span>
                        <span
                          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                        >
                          <span className="overflow-hidden">
                            <span className="small block pt-2 max-w-[52ch]">{p.body}</span>
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="lg:col-span-7 lg:sticky lg:top-[calc(var(--nav-h)+24px)]">
            <Reveal>
              <div className="pod ticks">
                <div className="pod-bar">
                  <span className="dot ok" />
                  <span className="text-[var(--fg)]">architecture</span>
                  <span className="text-[var(--fg-3)]">· how a request travels</span>
                  <span className="ml-auto hidden sm:flex items-center gap-4 text-[var(--fg-3)]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" /> request
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--ok)]" /> release
                    </span>
                  </span>
                </div>
                <div className="p-3 md:p-5 bp-grid">
                  <Diagram active={active} />
                </div>
                <div className="pod-bar !border-b-0 border-t border-[var(--line)]">
                  <span className="text-[var(--fg-3)]">tracing</span>
                  <span className="text-[var(--accent)]">{String(current + 1).padStart(2, "0")}</span>
                  <span className="text-[var(--fg)] truncate">{PRINCIPLES[current].title}</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
