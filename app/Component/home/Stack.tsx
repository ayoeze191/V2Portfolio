"use client";

import { motion } from "motion/react";
import SectionHead from "../site/SectionHead";
import { container, item, viewport } from "../Reveal";

const GROUPS = [
  {
    label: "Frontend & Mobile",
    items: ["TypeScript", "React", "React Native", "Expo", "Next.js", "Vue 3", "Redux", "Tailwind"],
  },
  {
    label: "Backend & Data",
    items: ["Node.js", "Express", "Django", "PostgreSQL", "MongoDB", "Prisma", "Redis", "BullMQ"],
  },
  {
    label: "Platform & Tooling",
    items: ["Docker", "Git", "Firebase", "Vercel", "Paystack", "Stripe"],
  },
];

export default function Stack() {
  return (
    <section id="stack" className="sec">
      <div className="wrap">
        <SectionHead
          title={
            <>
              Toolkit, <em>what I reach for</em>
            </>
          }
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={container(0.07)}
          className="grid md:grid-cols-3 gap-3"
        >
          {GROUPS.map((g) => (
            <motion.div key={g.label} variants={item} className="panel panel-pad">
              <p className="kicker">{g.label}</p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {g.items.map((t) => (
                  <span key={t} className="pill !text-[var(--fg)]">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
