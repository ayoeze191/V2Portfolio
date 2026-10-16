"use client";

import { motion } from "motion/react";
import { container, item, viewport } from "../Reveal";
import { EMAIL, RESUME, SOCIALS } from "@/app/data/site";

export default function Contact() {
  return (
    <section id="contact" className="sec">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={container(0.07)}
        className="wrap"
      >
        <div className="panel text-center px-6 py-16 md:py-24">
          <motion.h2 variants={item} className="display !text-[clamp(2.25rem,5vw,3.75rem)] max-w-[18ch] mx-auto">
            Have a product to build? <em>Let&apos;s talk.</em>
          </motion.h2>
          <motion.p variants={item} className="lede mx-auto mt-5">
            A product, a team that needs another engineer, or a question about
            your schema. I usually reply within a day.
          </motion.p>
          <motion.div variants={item} className="flex flex-wrap justify-center gap-2.5 mt-8">
            <a href={`mailto:${EMAIL}`} className="btn btn-primary btn-lg">
              {EMAIL}
            </a>
            <a href={RESUME} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">
              Résumé ↗
            </a>
          </motion.div>
          <motion.div variants={item} className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-10">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                {s.label} ↗
              </a>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
