"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import SectionHead from "../site/SectionHead";

/** The toolkit as a node pool: each node is a layer, each pod a tool. */
const NODES = [
  {
    name: "node/surface",
    label: "Frontend & mobile",
    items: ["TypeScript", "React", "React Native", "Expo", "Next.js", "Vue 3", "Redux", "Tailwind"],
  },
  {
    name: "node/services",
    label: "Backend & APIs",
    items: ["Node.js", "Express", "Django", "REST", "BullMQ", "Paystack", "Stripe"],
  },
  {
    name: "node/data",
    label: "Data",
    items: ["PostgreSQL", "MongoDB", "Prisma", "Redis", "Firebase"],
  },
  {
    name: "node/platform",
    label: "Infrastructure & cloud",
    items: ["Docker", "Kubernetes", "GitHub Actions", "Nginx", "Linux", "AWS", "Vercel"],
  },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * A node joins the pool: it slides in NotReady, flips to Ready, and only
 * then do its pods get scheduled onto it, one by one. Runs once.
 */
function NodeCard({ n, index, go }: { n: (typeof NODES)[number]; index: number; go: boolean }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!go) return;
    const t = window.setTimeout(() => setReady(true), 500 + index * 260);
    return () => window.clearTimeout(t);
  }, [go, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={go ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay: index * 0.12, ease: EASE }}
      className={`pod ticks flex flex-col transition-[border-color] duration-500 ${ready ? "" : "!border-dashed"}`}
    >
      <div className="pod-bar">
        <span className={`dot ${ready ? "ok" : "warn"}`} />
        <span className={ready ? "text-[var(--fg)]" : "text-[var(--warn)]"}>{ready ? "Ready" : "NotReady"}</span>
        <span className="text-[var(--fg-3)]">{n.name}</span>
        <span className="ml-auto text-[var(--fg-3)] tabular-nums">
          {ready ? n.items.length : 0}/{n.items.length} pods
        </span>
      </div>
      <div className="p-5 flex-1 bp-grid">
        <p className="giant text-[2.1rem] leading-[0.9]">{n.label}</p>
        <ul className="grid grid-cols-2 gap-2 mt-6">
          {n.items.map((t, i) => (
            <motion.li
              key={t}
              initial={{ opacity: 0, scale: 0.6, y: 6 }}
              animate={ready ? { opacity: 1, scale: 1, y: 0 } : undefined}
              transition={{ type: "spring", stiffness: 380, damping: 22, delay: 0.15 + i * 0.06 }}
              className="group relative flex items-center gap-2 h-9 px-2.5 rounded-[8px] border border-[var(--line)] bg-[var(--panel-2)] transition-colors hover:border-[var(--accent)] hover:bg-[#101a2e]"
            >
              {/* scheduling flash */}
              <motion.span
                aria-hidden
                initial={{ opacity: 0 }}
                animate={ready ? { opacity: [0, 0.9, 0] } : undefined}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.06 }}
                className="absolute inset-0 rounded-[8px] border border-[var(--ok)] pointer-events-none"
              />
              <span className="w-[7px] h-[7px] rounded-[2px] bg-[var(--fg-3)] transition-colors group-hover:bg-[var(--ok)]" />
              <span className="mono text-[0.7rem] text-[var(--fg)] truncate">{t}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Stack() {
  const ref = useRef<HTMLDivElement>(null);
  const go = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <section id="stack" data-hud="05 · node pool" className="sec border-t border-[var(--line)]">
      <div className="wrap-wide">
        <SectionHead
          giant
          index="05"
          cmd={
            <>
              <span className="k">kubectl</span> get nodes -o wide
            </>
          }
          title={
            <>
              Node <em>pool</em>
            </>
          }
        />

        <div ref={ref} className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {NODES.map((n, i) => (
            <NodeCard key={n.name} n={n} index={i} go={go} />
          ))}
        </div>
      </div>
    </section>
  );
}
