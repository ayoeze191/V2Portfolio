"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
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

/* ── Boot sequence: the cluster comes up when the section arrives ── */

const BOOT: { id: NodeId; log: string }[] = [
  { id: "git", log: "push main → pipeline triggered" },
  { id: "ci", log: "ci: 214 tests passed · image built" },
  { id: "reg", log: "pushed ezekiel/api:sha-7d9f4" },
  { id: "k8s", log: "rollout started · 3/3 replicas" },
  { id: "pg", log: "postgres ready · migrations applied" },
  { id: "redis", log: "redis ready · queues attached" },
  { id: "gw", log: "api-gateway Running · readiness ok" },
  { id: "auth", log: "auth Running · jwks loaded" },
  { id: "pay", log: "payments Running · idempotency on" },
  { id: "jobs", log: "jobs Running · 4 workers" },
  { id: "web", log: "web connected → api-gateway" },
  { id: "mobile", log: "mobile connected → api-gateway" },
];
const DONE = BOOT.length;
const TICK = 260; // ms per node

type Phase = "hidden" | "pending" | "running";

function phaseOf(id: NodeId, step: number): Phase {
  const i = BOOT.findIndex((b) => b.id === id);
  if (i < step) return "running";
  if (i === step) return "pending";
  return "hidden";
}

function Diagram({ active, step }: { active: Set<NodeId>; step: number }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const booted = step >= DONE;

  // Packets only run once the cluster is up, and only while on screen.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    svg.pauseAnimations();
    if (!booted || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) svg.unpauseAnimations();
      else svg.pauseAnimations();
    });
    io.observe(svg);
    return () => io.disconnect();
  }, [booted]);

  return (
    <svg ref={svgRef} viewBox="0 0 760 480" className="w-full h-auto" role="img" aria-labelledby="arch-title">
      <title id="arch-title">
        Architecture I build: web and mobile clients call an API gateway, which routes to auth,
        payments and job services backed by Postgres and Redis. A pipeline builds images and rolls
        them out to Kubernetes.
      </title>

      {/* Cluster boundary: draws itself once the rollout starts */}
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
        animate={{ opacity: step >= 4 ? 1 : 0.15 }}
        transition={{ duration: 0.6 }}
      />
      <text x="36" y="160" className="mono" fontSize="10" fill="rgba(79,139,255,0.85)" letterSpacing="1.5">
        CLUSTER · PROD
      </text>
      <text x="580" y="20" className="mono" fontSize="10" fill="var(--fg-3)" letterSpacing="1.5">
        DELIVERY
      </text>

      {/* Edges draw once both ends are Running */}
      {EDGES.map((e) => {
        const up = phaseOf(e.from, step) === "running" && phaseOf(e.to, step) === "running";
        const on = booted && active.has(e.from) && active.has(e.to);
        return (
          <motion.path
            key={e.id}
            id={e.id}
            d={e.d}
            className={`arch-edge ${on ? "on" : ""}`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: up ? 1 : 0 }}
            transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
          />
        );
      })}

      {/* Packets riding the edges (SMIL, paused until booted and on screen) */}
      {EDGES.filter((e) => e.packet !== undefined).map((e) => (
        <circle key={`pk-${e.id}`} r="3" opacity="0" fill={e.id.startsWith("p") ? "var(--ok)" : "var(--accent)"}>
          <animateMotion dur="2.6s" begin={`${e.packet}s`} repeatCount="indefinite" rotate="auto">
            <mpath href={`#${e.id}`} />
          </animateMotion>
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="2.6s" begin={`${e.packet}s`} repeatCount="indefinite" />
        </circle>
      ))}

      {/* Nodes: hidden → Pending (dashed, amber) → Running, with a ping */}
      {(Object.keys(NODES) as NodeId[]).map((id) => {
        const n = box(id);
        const phase = phaseOf(id, step);
        const on = booted && active.has(id);
        return (
          <motion.g
            key={id}
            className={`arch-node ${phase === "pending" ? "pending" : ""} ${on ? "on" : ""}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: phase === "hidden" ? 0 : 1, scale: phase === "hidden" ? 0.9 : 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: `${n.cx}px ${n.cy}px`, transformBox: "view-box" }}
          >
            <rect x={n.x} y={n.y} width={n.w} height={H} rx="9" />
            {phase === "running" && !booted ? (
              <motion.rect
                x={n.x}
                y={n.y}
                width={n.w}
                height={H}
                rx="9"
                fill="none"
                stroke="var(--ok)"
                initial={{ opacity: 0.9, scale: 1 }}
                animate={{ opacity: 0, scale: 1.25 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                style={{ transformOrigin: `${n.cx}px ${n.cy}px`, transformBox: "view-box" }}
              />
            ) : null}
            <circle
              cx={n.x + 14}
              cy={n.y + 16}
              r="3.2"
              fill={phase === "pending" ? "var(--warn)" : on || (phase === "running" && !booted) ? "var(--ok)" : "var(--fg-3)"}
            />
            <text x={n.x + 24} y={n.y + 19.5} fontSize="11.5" style={{ fill: on ? "var(--fg)" : undefined }}>
              {n.label}
            </text>
            <text x={n.x + 14} y={n.y + 35} fontSize="9.5" style={{ fill: phase === "pending" ? "var(--warn)" : "var(--fg-3)" }}>
              {phase === "pending" ? "ContainerCreating" : n.sub}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}

/** Rolling log under the diagram while the cluster boots. */
function BootLog({ step }: { step: number }) {
  const lines = BOOT.slice(Math.max(0, step - 3), Math.min(step, DONE));
  return (
    <div className="term !text-[0.7rem] !leading-[1.7] h-[5.1em] overflow-hidden px-4 py-2 border-t border-[var(--line)] bg-[var(--panel)]">
      {lines.map((l, i) => (
        <motion.p
          key={l.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: i === lines.length - 1 ? 1 : 0.55, y: 0 }}
          transition={{ duration: 0.25 }}
          className="truncate"
        >
          <span className="c">{String(BOOT.findIndex((b) => b.id === l.id) * 0.26 + 0.1).slice(0, 4).padEnd(4, "0")}s</span>{" "}
          <span className="ps">✓</span> {l.log}
        </motion.p>
      ))}
    </div>
  );
}

/* ── Scroll-lit paragraph: words brighten as you read down ─────── */

function Word({ children, progress, at }: { children: string; progress: MotionValue<number>; at: number }) {
  const opacity = useTransform(progress, [at - 0.08, at], [0.18, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}

function LitParagraph({ text, muted }: { text: string; muted: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 88%", "end 55%"] });
  const words = text.split(" ");
  const mutedWords = muted.split(" ");
  const total = words.length + mutedWords.length;
  return (
    <p ref={ref} className="text-[1.3rem] md:text-[1.6rem] leading-[1.38] tracking-[-0.02em] text-[var(--fg)]">
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} at={(i + 1) / total}>
          {w}
        </Word>
      ))}
      <span className="text-[var(--fg-2)]">
        {mutedWords.map((w, i) => (
          <Word key={i} progress={scrollYProgress} at={(words.length + i + 1) / total}>
            {w}
          </Word>
        ))}
      </span>
    </p>
  );
}

/* ── Section ───────────────────────────────────────────────────── */

export default function Approach() {
  const [current, setCurrent] = useState(0);
  const active = new Set<NodeId>(PRINCIPLES[current].nodes);
  const reduce = useReducedMotion();

  // Boot the cluster once the diagram is well in view.
  const diagramRef = useRef<HTMLDivElement>(null);
  const inView = useInView(diagramRef, { once: true, margin: "0px 0px -25% 0px" });
  const [ticks, setTicks] = useState(0);
  const step = reduce ? DONE : ticks;
  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setInterval(() => {
      setTicks((t) => {
        if (t >= DONE) {
          window.clearInterval(id);
          return t;
        }
        return t + 1;
      });
    }, TICK);
    return () => window.clearInterval(id);
  }, [inView, reduce]);
  const booted = step >= DONE;

  // Scan line sweeping the section in, once.
  const sectionRef = useRef<HTMLElement>(null);
  const sectionSeen = useInView(sectionRef, { once: true, margin: "0px 0px -30% 0px" });

  return (
    <section
      ref={sectionRef}
      id="build"
      data-hud="02 · architecture"
      className="relative sec bp-grid border-t border-[var(--line)] overflow-clip"
    >
      {!reduce ? (
        <motion.div
          aria-hidden
          initial={{ top: "0%", opacity: 0 }}
          animate={sectionSeen ? { top: "100%", opacity: [0, 1, 1, 0] } : undefined}
          transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1], times: [0, 0.08, 0.85, 1] }}
          className="absolute inset-x-0 z-20 pointer-events-none"
        >
          <div className="h-px bg-[var(--accent)] shadow-[0_0_24px_4px_rgba(79,139,255,0.55)]" />
          <div className="h-24 -mt-24 -translate-y-px bg-gradient-to-t from-[rgba(79,139,255,0.12)] to-transparent" />
        </motion.div>
      ) : null}

      <motion.div
        initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
        animate={sectionSeen || reduce ? { clipPath: "inset(0 0 0% 0)" } : undefined}
        transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
        className="wrap-wide"
      >
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

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-5 min-w-0">
            <LitParagraph
              text="I build the whole thing: React and React Native on the surface, Node.js services underneath, and the auth, payment and queue paths in between."
              muted="Then I package it, wire the pipeline and ship it somewhere it can scale."
            />
            <Reveal>
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
            <motion.ol
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
              className="border-t border-[var(--line)]"
            >
              {PRINCIPLES.map((p, i) => {
                const on = i === current;
                return (
                  <motion.li
                    key={p.title}
                    variants={{
                      hidden: { opacity: 0, x: -24 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
                    }}
                    className="relative border-b border-[var(--line)]"
                  >
                    {/* active rail */}
                    <span
                      aria-hidden
                      className={`absolute left-0 top-0 bottom-0 w-px origin-top transition-transform duration-500 bg-[var(--accent)] ${on ? "scale-y-100" : "scale-y-0"}`}
                    />
                    <button
                      type="button"
                      onMouseEnter={() => setCurrent(i)}
                      onFocus={() => setCurrent(i)}
                      onClick={() => setCurrent(i)}
                      aria-pressed={on}
                      className={`w-full text-left py-4 pl-4 grid grid-cols-[2.5rem_1fr] gap-x-2 group transition-colors ${on ? "bg-[linear-gradient(90deg,rgba(79,139,255,0.07),transparent)]" : ""}`}
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
                  </motion.li>
                );
              })}
            </motion.ol>
          </div>

          <div ref={diagramRef} className="lg:col-span-7 min-w-0 lg:sticky lg:top-[calc(var(--nav-h)+24px)]">
            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "0px 0px -80px 0px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformPerspective: 1200 }}
              className="pod ticks"
            >
              <div className="pod-bar">
                <span className={`dot ${booted ? "ok" : "warn"}`} />
                <span className="text-[var(--fg)]">{booted ? "cluster healthy" : "booting cluster"}</span>
                <span className="text-[var(--fg-3)] tabular-nums">
                  · {Math.min(step, DONE)}/{DONE} running
                </span>
                <span className="ml-auto hidden sm:flex items-center gap-4 text-[var(--fg-3)]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" /> request
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--ok)]" /> release
                  </span>
                </span>
              </div>
              {/* boot progress */}
              <div className="h-[2px] bg-[var(--panel-3)]">
                <div
                  className="h-full origin-left bg-[var(--ok)] transition-transform duration-300"
                  style={{ transform: `scaleX(${Math.min(step, DONE) / DONE})` }}
                />
              </div>
              <div className="bp-grid overflow-x-auto md:overflow-visible">
                <div className="p-3 md:p-5 min-w-[640px] md:min-w-0">
                  <Diagram active={active} step={step} />
                </div>
              </div>
              <p className="md:hidden tag !text-[0.58rem] px-4 pb-2 -mt-1">swipe the diagram →</p>
              {booted ? (
                <div className="pod-bar !border-b-0 border-t border-[var(--line)]">
                  <span className="text-[var(--fg-3)]">tracing</span>
                  <span className="text-[var(--accent)]">{String(current + 1).padStart(2, "0")}</span>
                  <span className="text-[var(--fg)] truncate">{PRINCIPLES[current].title}</span>
                </div>
              ) : (
                <BootLog step={step} />
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
