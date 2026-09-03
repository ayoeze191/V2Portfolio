"use client";

import { motion } from "motion/react";
import Section from "./Section";
import { container, item, viewport } from "../Reveal";

const GROUPS = [
  {
    label: "Frontend & Mobile",
    items: [
      "TypeScript",
      "React",
      "React Native",
      "Expo",
      "Next.js",
      "Vue 3",
      "Redux",
      "Tailwind",
    ],
  },
  {
    label: "Backend & Data",
    items: [
      "Node.js",
      "Express",
      "Django",
      "PostgreSQL",
      "MongoDB",
      "Prisma",
      "Redis",
      "BullMQ",
    ],
  },
  {
    label: "Platform & Tooling",
    items: ["Docker", "Git", "Firebase", "Vercel", "Paystack", "Stripe"],
  },
];

export default function Stack() {
  return (
    <Section
      id="stack"
      eyebrow="Tech stack"
      title="Tools I work with."
      intro="A focused set I reach for to ship fast, reliable products across web and mobile."
      className="bg-[var(--surface)] border-y border-[var(--border)]"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={container(0.09)}
        className="grid md:grid-cols-3 gap-5"
      >
        {GROUPS.map((group) => (
          <motion.div key={group.label} variants={item} className="card-flat">
            <p className="label mb-4">{group.label}</p>
            <div className="flex flex-wrap gap-2">
              {group.items.map((tool) => (
                <span key={tool} className="chip">
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
