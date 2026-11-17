"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue, type Variants } from "motion/react";
import portrait from "@/app/assets/images/portrait-cut.webp";
import { projects } from "@/app/data/projects";
import { useBooted } from "../site/Boot";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const NAME = "EZEKIEL".split("");

/** Years-of-experience card in the hero. Hidden for now; set to true to bring it back. */
const SHOW_YEARS = false;

/** Teams and products that have run my code: the "nodes" that joined. */
const NODES = ["Roov", "Renato", "Learnpally", "RentAnything", "EkoPages", "Debsphere"];

const LEFT_LINKS = [
  { href: "#work", label: "Deployments" },
  { href: "#build", label: "Architecture" },
  { href: "#experience", label: "Experience" },
];
const RIGHT_LINKS = [
  { href: "#stack", label: "Node pool" },
  { href: "/about", label: "About" },
  { href: "#contact", label: "Get in touch" },
];

const letters: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
};
const letter: Variants = {
  hidden: { y: "105%" },
  show: { y: "0%", transition: { duration: 0.9, ease: EASE } },
};

/** A card that "schedules": Pending first, then Running. Fires once. */
function usePodStatus(ready: boolean, after: number) {
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!ready) return;
    const t = window.setTimeout(() => setRunning(true), after);
    return () => window.clearTimeout(t);
  }, [ready, after]);
  return running;
}

function PodCard({
  name,
  value,
  label,
  ready,
  delay,
  className = "",
}: {
  name: string;
  value: string;
  label: string;
  ready: boolean;
  delay: number;
  className?: string;
}) {
  const running = usePodStatus(ready, delay * 1000 + 650);
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={ready ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={`pod w-[184px] ${className}`}
    >
      <div className="pod-bar !h-8 !text-[0.62rem]">
        <span className={`dot ${running ? "ok" : "warn"}`} />
        <span className={running ? "text-[var(--fg)]" : "text-[var(--warn)]"}>
          {running ? "Running" : "Pending"}
        </span>
        <span className="ml-auto text-[var(--fg-3)]">{name}</span>
      </div>
      <div className="px-4 pt-3 pb-4">
        <p className="giant text-[3.1rem] text-[var(--fg)]">{value}</p>
        <p className="tag !text-[0.6rem] mt-2 !text-[var(--fg-2)]">{label}</p>
      </div>
    </motion.div>
  );
}

function Manifest({ ready }: { ready: boolean }) {
  const running = usePodStatus(ready, 1900);
  return (
    <motion.div
      initial={{ opacity: 0, y: 22, rotate: 2.5 }}
      animate={ready ? { opacity: 1, y: 0, rotate: 1.5 } : undefined}
      transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
      className="pod ticks w-[300px] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
    >
      <div className="pod-bar">
        <span className="text-[var(--accent)]">▤</span>
        ezekiel.yaml
        <span className="ml-auto flex items-center gap-1.5">
          <span className={`dot ${running ? "ok" : "warn"}`} />
          {running ? "applied" : "applying"}
        </span>
      </div>
      <pre className="yaml px-4 py-3.5">
        <span className="key">apiVersion</span>: people/v1{"\n"}
        <span className="key">kind</span>: Engineer{"\n"}
        <span className="key">metadata</span>:{"\n"}
        {"  "}<span className="key">name</span>: <span className="str">ezekiel-olabode</span>{"\n"}
        {"  "}<span className="key">region</span>: <span className="str">lagos-ng</span>{"\n"}
        <span className="key">spec</span>:{"\n"}
        {"  "}<span className="key">roles</span>:{"\n"}
        {"    "}- fullstack{"\n"}
        {"    "}- infrastructure{"\n"}
        {"    "}- cloud-native{"\n"}
        {"  "}<span className="key">stack</span>: [react, node, postgres]{"\n"}
        {"  "}<span className="key">runtime</span>: [docker, kubernetes]{"\n"}
        <span className="key">status</span>:{"\n"}
        {"  "}<span className="key">phase</span>:{" "}
        <span className={running ? "text-[var(--ok)]" : "text-[var(--warn)]"}>
          {running ? "Running" : "Pending"}
        </span>
        {"  "}<span className="cm"># open to work</span>
      </pre>
    </motion.div>
  );
}

/** Phone-sized pod: a status line and one value, floating by the portrait. */
function Chip({
  ready,
  delay,
  title,
  children,
  className = "",
  tilt = 0,
}: {
  ready: boolean;
  delay: number;
  title: string;
  children: React.ReactNode;
  className?: string;
  tilt?: number;
}) {
  const running = usePodStatus(ready, delay * 1000 + 600);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
      animate={ready ? { opacity: 1, scale: 1, rotate: tilt } : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 18, delay }}
      className={`absolute z-30 pod !rounded-[10px] shadow-[0_16px_40px_-14px_rgba(0,0,0,0.9)] ${className}`}
    >
      <div className="flex items-center gap-1.5 h-6 px-2 border-b border-[var(--line)] bg-[var(--panel-2)] mono text-[0.55rem] tracking-[0.06em]">
        <span className={`dot !w-[5px] !h-[5px] ${running ? "ok" : "warn"}`} />
        <span className={running ? "text-[var(--fg)]" : "text-[var(--warn)]"}>{running ? "Running" : "Pending"}</span>
        <span className="text-[var(--fg-3)]">{title}</span>
      </div>
      <div className="px-2.5 py-2">{children}</div>
    </motion.div>
  );
}

/** Orbit rings around the portrait: the control plane and its workloads. */
function Orbits({ rotate, ready }: { rotate: MotionValue<number>; ready: boolean }) {
  const ring = (r: number, n: number, offset: number) =>
    Array.from({ length: n }, (_, i) => {
      const a = ((i / n) * 360 + offset) * (Math.PI / 180);
      // Rounded so server and client render identical attributes.
      return { x: Math.round((500 + r * Math.cos(a)) * 100) / 100, y: Math.round((500 + r * Math.sin(a)) * 100) / 100, k: `${r}-${i}` };
    });
  const inner = ring(230, 5, -60);
  const mid = ring(340, 7, -20);
  const outer = ring(455, 9, 10);

  return (
    <motion.svg
      viewBox="0 0 1000 1000"
      aria-hidden
      initial={{ opacity: 0, scale: 0.86 }}
      animate={ready ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 1.6, delay: 0.25, ease: EASE }}
      className="absolute left-1/2 top-[58%] w-[min(1180px,140vw)] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    >
      <defs>
        <radialGradient id="core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4f8bff" stopOpacity="0.28" />
          <stop offset="60%" stopColor="#4f8bff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#4f8bff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="500" cy="500" r="300" fill="url(#core)" />
      <circle cx="500" cy="500" r="230" fill="none" stroke="rgba(148,163,184,.18)" />
      <circle cx="500" cy="500" r="340" fill="none" stroke="rgba(148,163,184,.13)" strokeDasharray="2 7" />
      <circle cx="500" cy="500" r="455" fill="none" stroke="rgba(148,163,184,.09)" />
      <motion.g style={{ rotate, transformOrigin: "500px 500px" }}>
        {mid.map((p) => (
          <line key={`l${p.k}`} x1="500" y1="500" x2={p.x} y2={p.y} stroke="rgba(79,139,255,.10)" strokeDasharray="3 6" />
        ))}
        {inner.map((p) => (
          <circle key={p.k} cx={p.x} cy={p.y} r="5" fill="#4f8bff" />
        ))}
        {mid.map((p, i) => (
          <rect
            key={p.k}
            x={p.x - 7}
            y={p.y - 7}
            width="14"
            height="14"
            rx="3"
            fill={i % 3 === 0 ? "#3ddc97" : "#141820"}
            stroke={i % 3 === 0 ? "none" : "rgba(148,163,184,.45)"}
          />
        ))}
        {outer.map((p) => (
          <circle key={p.k} cx={p.x} cy={p.y} r="3" fill="rgba(148,163,184,.5)" />
        ))}
      </motion.g>
    </motion.svg>
  );
}

export default function Hero() {
  const ready = useBooted();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Scroll-linked only: nothing moves while the page sits still.
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.15]);
  const meY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const meScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const leftY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const rightY = useTransform(scrollYProgress, [0, 1], [0, -220]);

  return (
    <section
      ref={ref}
      data-hud="00 · control plane"
      className="relative overflow-hidden bp-grid h-[calc(100svh-var(--nav-h))] min-h-[640px] max-h-[1100px]"
    >
      <Orbits rotate={rotate} ready={ready} />

      {/* Giant name, behind the portrait */}
      <motion.div style={{ y: nameY, opacity: nameOpacity }} className="relative z-10 pt-[2.2vh] wrap-wide">
        <h1 className="sr-only">Ezekiel Olabode, fullstack and cloud-native engineer</h1>
        <motion.div
          aria-hidden
          variants={letters}
          initial="hidden"
          animate={ready ? "show" : "hidden"}
          className="giant flex justify-between text-[min(29vw,40svh)] select-none"
        >
          {NAME.map((ch, i) => (
            <span key={i} className="block overflow-hidden pb-[0.02em]">
              <motion.span
                variants={letter}
                className="block bg-[linear-gradient(180deg,#f3f5f9_45%,#7d889b)] bg-clip-text text-transparent"
              >
                {ch}
              </motion.span>
            </span>
          ))}
        </motion.div>

        {/* Phones: one status line instead of the split nav */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="md:hidden tag !text-[0.6rem] mt-3 flex items-center justify-between"
        >
          <span className="flex items-center gap-2 text-[var(--fg)]">
            <span className="dot ok !w-[6px] !h-[6px]" /> fullstack · cloud-native
          </span>
          <span>lagos, ng</span>
        </motion.p>

        {/* Split nav under the name */}
        <motion.nav
          aria-label="Sections"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="hidden md:flex justify-between mt-4"
        >
          {[LEFT_LINKS, RIGHT_LINKS].map((group, g) => (
            <ul key={g} className="flex items-center gap-3">
              {group.map((l, i) => (
                <li key={l.href} className="flex items-center gap-3">
                  {i > 0 ? <span className="text-[var(--fg-3)]">|</span> : null}
                  <Link href={l.href} className="hud-link !text-[0.72rem] !text-[var(--fg)] hover:!text-[var(--accent)]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </motion.nav>
      </motion.div>

      {/* Portrait, in front of the name */}
      <motion.div
        style={{ y: meY, scale: meScale }}
        className="absolute z-20 bottom-0 left-1/2 -translate-x-1/2 h-[64%] md:h-[80%] aspect-[1254/1735] origin-bottom pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
          className="relative h-full w-full [mask-image:linear-gradient(to_bottom,#000_72%,transparent)]"
        >
          <Image
            src={portrait}
            alt="Ezekiel Olabode"
            fill
            priority
            sizes="(max-width: 768px) 70vw, 640px"
            className="object-contain object-bottom"
          />
        </motion.div>
      </motion.div>

      {/* Left: what I do + two pods */}
      <motion.div
        style={{ y: leftY }}
        className="hidden md:block absolute z-30 left-[var(--gutter)] bottom-[13%] lg:left-[6%] max-w-[300px]"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
          className="text-[1.05rem] leading-[1.45] text-[var(--fg-2)] mb-5"
        >
          <span className="text-[var(--fg)]">Fullstack &amp; cloud-native engineer.</span> I build
          products end to end, and the infrastructure they run on.
        </motion.p>
        <div className="flex gap-3">
          {SHOW_YEARS ? (
            <PodCard name="pod/xp" value="4+" label="Years in production" ready={ready} delay={0.95} />
          ) : null}
          <PodCard
            name="pod/ship"
            value={`${projects.length}`}
            label="Projects deployed"
            ready={ready}
            delay={SHOW_YEARS ? 1.1 : 0.95}
            className={SHOW_YEARS ? "hidden lg:block mt-8" : ""}
          />
        </div>
      </motion.div>

      {/* Right: the manifest */}
      <motion.div style={{ y: rightY }} className="hidden md:block absolute z-30 right-[var(--gutter)] lg:right-[5%] bottom-[9%]">
        <Manifest ready={ready} />
      </motion.div>

      {/* Phones: pods floating around the portrait */}
      <div className="md:hidden">
        <motion.div style={{ y: leftY }} className="absolute inset-0 pointer-events-none">
          <Chip ready={ready} delay={0.9} title="pod/ship" className="left-[4%] top-[34%]" tilt={-3}>
            <p className="giant text-[1.9rem] leading-none">{projects.length}</p>
            <p className="tag !text-[0.5rem] mt-1">deployed</p>
          </Chip>
          <Chip ready={ready} delay={1.25} title="runtime" className="left-[3%] top-[60%]" tilt={2}>
            <p className="mono text-[0.62rem] text-[var(--fg)]">docker · k8s</p>
          </Chip>
        </motion.div>
        <motion.div style={{ y: rightY }} className="absolute inset-0 pointer-events-none">
          <Chip ready={ready} delay={1.05} title="ezekiel.yaml" className="right-[4%] top-[45%]" tilt={3}>
            <pre className="yaml !text-[0.58rem] !leading-[1.6]">
              <span className="key">kind</span>: Engineer{"\n"}
              <span className="key">roles</span>: 3{"\n"}
              <span className="key">open</span>: <span className="text-[var(--ok)]">true</span>
            </pre>
          </Chip>
        </motion.div>
      </div>

      {/* CTAs over the portrait */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={ready ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
        className="absolute z-30 bottom-[9%] md:bottom-[6%] left-1/2 -translate-x-1/2 flex gap-2.5"
      >
        <Link href="#contact" className="btn btn-primary btn-lg !h-12 !px-6 !rounded-[12px]">
          Let&apos;s build
        </Link>
        <Link href="#work" className="btn btn-secondary btn-lg !h-12 !px-6 !rounded-[12px]">
          See deployments
        </Link>
      </motion.div>

      {/* Bottom rail: joined nodes + scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute z-30 inset-x-0 bottom-0 h-10 border-t border-[var(--line)] bg-[var(--bg)] flex items-center justify-between px-[var(--gutter)]"
      >
        <p className="tag flex items-center gap-3 overflow-hidden">
          <span className="dot ok" />
          <span className="hidden sm:inline text-[var(--fg-3)]">nodes joined:</span>
          <span className="text-[var(--fg-2)] truncate">{NODES.join(" · ")}</span>
        </p>
        <p className="tag hidden sm:block">scroll ↓</p>
      </motion.div>
    </section>
  );
}
