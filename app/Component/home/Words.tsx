"use client";

import { motion } from "motion/react";
import SectionHead from "../site/SectionHead";
import { container, item, viewport } from "../Reveal";

// Excerpts from the full recommendations; the cut is marked with an ellipsis.
const QUOTES = [
  {
    quote:
      "He's a quick learner, writes clean code, and is always willing to help teammates. His full-stack skills are impressive, and he delivers on time consistently.",
    name: "Adegoke Damilare",
    role: "CTO, Learnpally",
  },
  {
    quote:
      "What sets Ezekiel apart is his problem-solving ability and attention to detail … he always ensures a seamless user experience.",
    name: "David Asaolu",
    role: "Freelancer, Upwork",
  },
];

export default function Words() {
  return (
    <section className="sec">
      <div className="wrap">
        <SectionHead
          title={
            <>
              Kind words, <em>from people I&apos;ve built with</em>
            </>
          }
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={container(0.08)}
          className="grid md:grid-cols-2 gap-3"
        >
          {QUOTES.map((q) => (
            <motion.figure key={q.name} variants={item} className="panel panel-pad flex flex-col">
              <blockquote className="quote">“{q.quote}”</blockquote>
              <figcaption className="mt-auto pt-8 flex items-center gap-3">
                <span
                  aria-hidden
                  className="grid place-items-center w-9 h-9 rounded-full bg-[var(--panel-3)] border border-[var(--line)] text-[0.75rem] font-semibold text-[var(--fg-2)]"
                >
                  {q.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
                <span>
                  <span className="h4 block !text-[0.92rem]">{q.name}</span>
                  <span className="kicker block">{q.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
