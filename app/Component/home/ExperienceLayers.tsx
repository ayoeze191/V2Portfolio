"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import SectionHead from "../site/SectionHead";
import { Reveal } from "../Reveal";
import { EXPERIENCE, type Role } from "./Experience";

// Oldest first: the base layer is where it started.
const LAYERS = [...EXPERIENCE].reverse();
const N = LAYERS.length;
const NAV_H = 52;
const GAP = 54; // px between slabs in the stack

/** Short, stable pseudo-digest per layer — decoration, like `docker history`. */
function digest(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7) + "e" + ((h >>> 3) & 0xfff).toString(16);
}

const head = (
  <SectionHead
    giant
    index="03"
    cmd={
      <>
        <span className="k">docker</span> history ezekiel:latest
      </>
    }
    title={
      <>
        Built in <em>layers</em>
      </>
    }
  />
);

/* ── The isometric stack ───────────────────────────────────────── */

function Slab({
  role,
  index,
  progress,
  active,
}: {
  role: Role;
  index: number;
  progress: MotionValue<number>;
  active: number;
}) {
  // Each layer drops onto the stack in its own slice of the scroll.
  const start = (index - 0.75) / N;
  const end = (index - 0.1) / N;
  const z = useTransform(progress, [start, end], index === 0 ? [index * GAP, index * GAP] : [index * GAP + 260, index * GAP]);
  const opacity = useTransform(progress, [start, start + 0.25 / N], index === 0 ? [1, 1] : [0, 1]);
  const on = index === active;
  const latest = index === N - 1;
  const transform = useTransform(z, (v) => `translateZ(${v}px)`);

  return (
    <motion.div
      style={{ transform, opacity }}
      className="absolute inset-0 [transform-style:preserve-3d]"
    >
      {/* top face */}
      <div
        className={`absolute inset-0 rounded-[6px] border transition-colors duration-500 bp-grid [backface-visibility:hidden] ${
          on
            ? latest
              ? "border-[var(--ok)] bg-[#0c1a15]"
              : "border-[var(--accent)] bg-[#0e1729]"
            : "border-[var(--line-strong)] bg-[var(--panel-2)]"
        }`}
      >
        <div className="absolute left-5 top-4 tag !text-[0.62rem]">
          layer {String(index + 1).padStart(2, "0")}
        </div>
        {on ? (
          <div className="absolute left-5 bottom-3 giant text-[2.6rem] text-[var(--fg)]">{role.company}</div>
        ) : null}
        <div className="absolute right-4 top-4 mono text-[0.6rem] text-[var(--fg-3)]">{role.period.split(" ")[0]}</div>
      </div>
      {/* front side (hangs from the bottom edge) */}
      <div
        className={`absolute left-0 top-full w-full h-[26px] origin-top [transform:rotateX(-90deg)] [backface-visibility:hidden] border flex items-center justify-between px-3 ${
          on ? (latest ? "bg-[#0f3a2a] border-[var(--ok)]" : "bg-[#132447] border-[var(--accent)]") : "bg-[#0d1016] border-[var(--line)]"
        } transition-colors duration-500`}
      >
        <span className={`mono text-[0.62rem] tracking-[0.14em] uppercase ${on ? "text-[var(--fg)]" : "text-[var(--fg-2)]"}`}>
          {String(index + 1).padStart(2, "0")} · {role.company}
        </span>
        <span className="mono text-[0.56rem] text-[var(--fg-3)]">{role.period.split(" ")[0]}</span>
      </div>
      {/* right side */}
      <div
        className={`absolute left-full top-0 h-full w-[26px] origin-left [transform:rotateY(90deg)] [backface-visibility:hidden] border ${
          on ? (latest ? "bg-[#0b2a1f] border-[var(--ok)]" : "bg-[#0e1a33] border-[var(--accent)]") : "bg-[#090b10] border-[var(--line)]"
        } transition-colors duration-500`}
      />
    </motion.div>
  );
}

function Stack({ progress, active }: { progress: MotionValue<number>; active: number }) {
  return (
    <div className="relative h-full grid place-items-center [perspective:2400px]">
      {/* floor shadow */}
      <div className="absolute w-[300px] h-[300px] [transform:rotateX(58deg)_rotateZ(-42deg)] rounded-[10px] bg-[radial-gradient(closest-side,rgba(79,139,255,0.18),transparent)] translate-y-[150px]" />
      <div className="relative w-[300px] h-[300px] translate-y-[120px] [transform-style:preserve-3d] [transform:rotateX(58deg)_rotateZ(-42deg)]">
        {LAYERS.map((role, i) => (
          <Slab key={role.company} role={role} index={i} progress={progress} active={active} />
        ))}
      </div>
    </div>
  );
}

/* ── The Dockerfile panel for the active layer ─────────────────── */

function LayerDetail({ index }: { index: number }) {
  const role = LAYERS[index];
  const base = index === 0;
  const latest = index === N - 1;
  return (
    <div className="pod ticks">
      <div className="pod-bar">
        <span className={`dot ${latest ? "ok" : "blue"}`} />
        <span className="text-[var(--fg)]">
          layer {String(index + 1).padStart(2, "0")}/{String(N).padStart(2, "0")}
        </span>
        <span className="text-[var(--fg-3)] hidden sm:inline">sha256:{digest(role.company)}</span>
        <span className="ml-auto text-[var(--fg-3)]">{latest ? "ezekiel:latest" : role.period}</span>
      </div>
      <div className="p-5 md:p-7">
        <p className="tag">{role.role}</p>
        <h3 className="giant text-[3.4rem] md:text-[4.6rem] mt-2">{role.company}</h3>
        <p className="meta mt-1">{role.period}</p>

        <div className="term mt-6 border-t border-[var(--line)] pt-5 !text-[0.78rem] md:!text-[0.82rem]">
          <p>
            <span className="k">{base ? "FROM" : "FROM"}</span>{" "}
            <span className="s">
              {base ? "scratch" : `${LAYERS[index - 1].company.toLowerCase()}:${LAYERS[index - 1].period.split(" ").pop()}`}
            </span>
          </p>
          {role.points.map((p) => (
            <p key={p} className="flex gap-3 mt-2">
              <span className="k shrink-0">RUN</span>
              <span className="text-[var(--fg)] font-[family-name:var(--font-body)] text-[0.95rem] leading-[1.55]">{p}</span>
            </p>
          ))}
          <p className="mt-3">
            <span className="k">COPY</span> {role.tech.map((t) => t.toLowerCase().replace(/\s+/g, "-")).join(" ")}{" "}
            <span className="c">/skills</span>
          </p>
          {latest ? (
            <p className="mt-2 flex items-center gap-2">
              <span className="k">CMD</span> [&quot;ship&quot;, &quot;--next&quot;]
              <span className="dot ok ml-1" />
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* ── Section ───────────────────────────────────────────────────── */

function Pinned({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const [active, setActive] = useState(0);

  // Only re-render when the active layer changes, not every scroll frame.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(N - 1, Math.max(0, Math.floor(v * N * 0.999 + 0.25)));
    setActive((cur) => (cur === next ? cur : next));
  });

  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      <div className="sticky overflow-hidden bp-grid flex flex-col" style={{ top: NAV_H, height: `calc(100vh - ${NAV_H}px)` }}>
        <div className="wrap-wide pt-[5vh] [&_.sec-head]:mb-0 [&_.sec-title]:!text-[clamp(2.6rem,6.5vw,5.5rem)]">{head}</div>

        <div className="wrap-wide flex-1 min-h-0 grid lg:grid-cols-12 gap-6 items-center pb-[4vh]">
          <div className="lg:col-span-6 h-full min-h-[360px] relative">
            <Stack progress={scrollYProgress} active={active} />
            {/* layer index */}
            <ol className="absolute left-0 bottom-2 flex flex-col-reverse gap-2">
              {LAYERS.map((r, i) => (
                <li key={r.company} className="flex items-center gap-3">
                  <span
                    className={`h-px transition-all duration-500 ${i === active ? "w-8 bg-[var(--accent)]" : i < active ? "w-4 bg-[var(--fg-3)]" : "w-2 bg-[var(--line-strong)]"}`}
                  />
                  <span className={`tag !text-[0.6rem] transition-colors ${i === active ? "!text-[var(--fg)]" : ""}`}>
                    {String(i + 1).padStart(2, "0")} {r.company}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <LayerDetail index={active} />
              </motion.div>
            </AnimatePresence>
            <div className="mt-4 flex items-center gap-4">
              <span className="tag">build</span>
              <div className="h-px flex-1 bg-[var(--line-strong)] overflow-hidden">
                <motion.div style={{ scaleX: fill }} className="h-full bg-[var(--accent)] origin-left" />
              </div>
              <span className="tag">{active === N - 1 ? "done" : "building"}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/** Small screens and reduced motion: the same Dockerfile, as a list. */
function Listed() {
  return (
    <div className="sec bp-grid">
      <div className="wrap-wide">
        {head}
        <div className="flex flex-col-reverse gap-4">
          {LAYERS.map((_, i) => (
            <Reveal key={i}>
              <LayerDetail index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

const WIDE = "(min-width: 1024px)";
const subscribeWide = (cb: () => void) => {
  const mq = window.matchMedia(WIDE);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export default function ExperienceLayers() {
  const reduce = useReducedMotion();
  const wide = useSyncExternalStore(subscribeWide, () => window.matchMedia(WIDE).matches, () => false);
  const pinned = wide && !reduce;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: [`start ${NAV_H}px`, "end end"] });

  // One stable <section> (the HUD observes it); only its contents switch.
  return (
    <section
      id="experience"
      data-hud="03 · image layers"
      ref={ref}
      className="relative border-t border-[var(--line)]"
      style={pinned ? { height: `calc(100vh + ${N * 65}vh)` } : undefined}
    >
      {pinned ? <Pinned scrollYProgress={scrollYProgress} /> : <Listed />}
    </section>
  );
}
