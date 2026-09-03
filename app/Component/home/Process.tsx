"use client";

import { motion } from "motion/react";
import Section from "./Section";
import { container, item, viewport } from "../Reveal";

const STEPS = [
  {
    n: "01",
    title: "The schema comes first",
    body: "Most product bugs are data-model bugs in a costume. I'd rather spend a day on the tables than a quarter on migrations that undo them.",
  },
  {
    n: "02",
    title: "Assume it runs twice",
    body: "Webhooks arrive out of order, jobs retry, networks lie. Anything touching money or state gets keyed so a replay is a no-op.",
  },
  {
    n: "03",
    title: "Boring where it counts",
    body: "Clever code is a liability at 2am. Predictable structure, clear names, and tests around the parts that move money.",
  },
  {
    n: "04",
    title: "Build for ten times the traffic",
    body: "Access control enforced at the data layer, not in components. Slow work pushed onto a queue before it costs anyone a request.",
  },
];

export default function Process() {
  return (
    <Section
      id="process"
      eyebrow="Process"
      title={
        <>
          A calm, <span className="wonk">deliberate</span> build process.
        </>
      }
      intro="Four habits that decide whether what I ship still works a year later."
      className="bg-[var(--surface)] border-y border-[var(--border)]"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={container(0.08)}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {STEPS.map((s) => (
          <motion.div key={s.n} variants={item} className="card h-full">
            <span className="step-num">{s.n}</span>
            <h3 className="h3 mt-3 mb-2.5">{s.title}</h3>
            <p className="body-sm">{s.body}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
