"use client";

import { motion, type Variants } from "motion/react";
import SectionHead from "../site/SectionHead";
import { viewport } from "../Reveal";

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

const pool: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const node: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.045, delayChildren: 0.25 },
  },
};
// Pods "schedule" onto the node: pop in from a pending outline.
const pod: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

export default function Stack() {
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

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={pool}
          className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4"
        >
          {NODES.map((n) => (
            <motion.div key={n.name} variants={node} className="pod ticks flex flex-col">
              <div className="pod-bar">
                <span className="dot ok" />
                <span className="text-[var(--fg)]">Ready</span>
                <span className="text-[var(--fg-3)]">{n.name}</span>
                <span className="ml-auto text-[var(--fg-3)]">{n.items.length} pods</span>
              </div>
              <div className="p-5 flex-1 bp-grid">
                <p className="giant text-[2.1rem] leading-[0.9]">{n.label}</p>
                <ul className="grid grid-cols-2 gap-2 mt-6">
                  {n.items.map((t) => (
                    <motion.li
                      key={t}
                      variants={pod}
                      className="group flex items-center gap-2 h-9 px-2.5 rounded-[8px] border border-[var(--line)] bg-[var(--panel-2)] transition-colors hover:border-[var(--accent)] hover:bg-[#101a2e]"
                    >
                      <span className="w-[7px] h-[7px] rounded-[2px] bg-[var(--fg-3)] transition-colors group-hover:bg-[var(--ok)]" />
                      <span className="mono text-[0.7rem] text-[var(--fg)] truncate">{t}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
