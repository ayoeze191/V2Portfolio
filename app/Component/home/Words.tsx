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
    from: "learnpally",
  },
  {
    quote:
      "What sets Ezekiel apart is his problem-solving ability and attention to detail … he always ensures a seamless user experience.",
    name: "David Asaolu",
    role: "Freelancer, Upwork",
    from: "upwork",
  },
];

/** Recommendations as cluster events: a log line, then the message. */
export default function Words() {
  return (
    <section id="testimonials" data-hud="04 · testimonials" className="sec bp-grid border-t border-[var(--line)]">
      <div className="wrap-wide">
        <SectionHead
          giant
          index="04"
          cmd={
            <>
              <span className="k">kubectl</span> get events --field-selector reason=Kudos
            </>
          }
          title={
            <>
              Testi<em>monials</em>
            </>
          }
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={container(0.1)}
          className="grid md:grid-cols-2 gap-4"
        >
          {QUOTES.map((q) => (
            <motion.figure key={q.name} variants={item} className="pod flex flex-col">
              <div className="pod-bar !text-[0.64rem]">
                <span className="dot ok" />
                <span className="text-[var(--ok)]">Normal</span>
                <span className="text-[var(--fg)]">Kudos</span>
                <span className="text-[var(--fg-3)] truncate">pod/ezekiel · from {q.from}</span>
                <span className="ml-auto text-[var(--fg-3)]">x1</span>
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <span className="giant text-[5rem] leading-[0.6] text-[var(--accent)]" aria-hidden>
                  “
                </span>
                <blockquote className="quote mt-2">{q.quote}</blockquote>
                <figcaption className="mt-auto pt-8 flex items-center gap-3">
                  <span
                    aria-hidden
                    className="grid place-items-center w-10 h-10 rounded-[10px] bg-[var(--panel-3)] border border-[var(--line)] giant text-[1rem] text-[var(--fg-2)]"
                  >
                    {q.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </span>
                  <span>
                    <span className="h4 block !text-[0.95rem]">{q.name}</span>
                    <span className="tag block !text-[0.62rem] mt-0.5">{q.role}</span>
                  </span>
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
