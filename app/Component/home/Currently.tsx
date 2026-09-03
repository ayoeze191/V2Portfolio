"use client";

import { motion } from "motion/react";
import { FaChessKnight, FaXTwitter } from "react-icons/fa6";
import { HiOutlineSparkles } from "react-icons/hi2";
import Section from "./Section";
import { container, item, viewport } from "../Reveal";

const OFF_CLOCK = [
  {
    icon: HiOutlineSparkles,
    label: "Learning",
    value: "AI",
    note: "Models, retrieval and evals — the parts that survive a demo, not just the ones that impress in one.",
  },
  {
    icon: FaChessKnight,
    label: "Playing",
    value: "Chess",
    note: "Mostly blitz. It rewards thinking two moves past the obvious one, which is more or less the job.",
  },
  {
    icon: FaXTwitter,
    label: "Lurking",
    value: "Twitter",
    note: "Where I find out what broke in the ecosystem this week, usually before the changelog says so.",
  },
];

export default function Currently() {
  return (
    <Section
      eyebrow="Off the clock"
      title={
        <>
          When I&apos;m not <span className="wonk">shipping</span>.
        </>
      }
      intro="Most of my spare cycles go one of three places."
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={container(0.09)}
        className="grid md:grid-cols-3 gap-5"
      >
        {OFF_CLOCK.map((entry) => (
          <motion.div key={entry.label} variants={item} className="card">
            <span
              className="grid place-items-center w-11 h-11 rounded-full mb-5"
              style={{ background: "var(--accent-tint)" }}
            >
              <entry.icon
                size={18}
                className="text-[var(--accent)]"
                aria-hidden="true"
              />
            </span>
            <p className="tag">{entry.label}</p>
            <h3 className="h3 mt-1 mb-2">{entry.value}</h3>
            <p className="body-sm">{entry.note}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
