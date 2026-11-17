"use client";

import { motion, type Variants } from "motion/react";
import SectionHead from "../site/SectionHead";

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

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const view = { once: true, margin: "0px 0px -80px 0px" } as const;

// Events stream in from the right, one after another.
const stream: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.35, delayChildren: 0.2 } },
};
const event: Variants = {
  hidden: { opacity: 0, x: 80 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: EASE, when: "beforeChildren", staggerChildren: 0.025 },
  },
};
// Then the message arrives word by word.
const word: Variants = {
  hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.35 } },
};

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
              <span className="k">kubectl</span> get events --watch --field-selector reason=Kudos
            </>
          }
          title={
            <>
              Testi<em>monials</em>
            </>
          }
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={view}
          className="tag -mt-3 mb-6 flex items-center gap-2"
        >
          <span className="dot ok" /> watching · {QUOTES.length} events
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={view}
          variants={stream}
          className="flex md:grid md:grid-cols-2 gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-[var(--gutter)] px-[var(--gutter)] md:mx-0 md:px-0 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {QUOTES.map((q) => (
            <motion.figure
              key={q.name}
              variants={event}
              className="pod flex flex-col shrink-0 w-[86%] md:w-auto snap-center"
            >
              <div className="pod-bar !text-[0.64rem]">
                <span className="dot ok" />
                <span className="text-[var(--ok)]">Normal</span>
                <span className="text-[var(--fg)]">Kudos</span>
                <span className="text-[var(--fg-3)] truncate">pod/ezekiel · from {q.from}</span>
                <span className="ml-auto text-[var(--fg-3)]">x1</span>
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <motion.span
                  variants={{
                    hidden: { scale: 0.4, opacity: 0 },
                    show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 16 } },
                  }}
                  className="giant text-[5rem] leading-[0.6] text-[var(--accent)] origin-bottom-left inline-block self-start"
                  aria-hidden
                >
                  “
                </motion.span>
                <blockquote className="quote mt-2">
                  {q.quote.split(" ").map((w, i) => (
                    <motion.span key={i} variants={word} className="inline-block mr-[0.28em]">
                      {w}
                    </motion.span>
                  ))}
                </blockquote>
                <motion.figcaption variants={word} className="mt-auto pt-8 flex items-center gap-3">
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
                </motion.figcaption>
              </div>
            </motion.figure>
          ))}
        </motion.div>
        <p className="md:hidden tag !text-[0.58rem] mt-3 text-center">swipe for more →</p>
      </div>
    </section>
  );
}
