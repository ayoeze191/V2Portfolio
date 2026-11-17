"use client";

import { motion } from "motion/react";
import { container, item, viewport } from "../Reveal";
import { EMAIL, RESUME, SOCIALS } from "@/app/data/site";

const SLAM = "Let's ship it.".split("");
const OUTLINE_FROM = "Let's ship ".length; // "it" is drawn in outline
const typing = (steps: number) => (t: number) => Math.floor(t * steps) / steps;

/** Contact as `kubectl expose`: open a port to me. */
export default function Contact() {
  return (
    <section id="contact" data-hud="06 · expose" className="sec bp-grid border-t border-[var(--line)] overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={container(0.08)}
        className="wrap-wide"
      >
        <motion.div variants={item} className="pod ticks">
          <div className="pod-bar">
            <span className="flex gap-1.5" aria-hidden>
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--panel-4)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--panel-4)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--panel-4)]" />
            </span>
            <span className="ml-2">ezekiel@lagos-1: ~/contact</span>
            <span className="ml-auto flex items-center gap-2">
              <span className="dot ok" /> <span className="text-[var(--fg)]">accepting traffic</span>
            </span>
          </div>

          <div className="px-5 md:px-10 pt-8 md:pt-12 pb-10 md:pb-14">
            <div className="term">
              <p className="flex flex-wrap items-center gap-x-1.5">
                <span className="ps">$</span>
                <motion.span
                  variants={{
                    hidden: { clipPath: "inset(0 100% 0 0)" },
                    show: { clipPath: "inset(0 0% 0 0)", transition: { duration: 1.3, ease: typing(46) } },
                  }}
                  className="inline-block"
                >
                  <span className="k">kubectl</span> expose engineer ezekiel --port=443 --target=
                  <span className="s">your-product</span>
                </motion.span>
              </p>
              <motion.p
                variants={{
                  hidden: { opacity: 0, x: -8 },
                  show: { opacity: 1, x: 0, transition: { delay: 1.45, duration: 0.3 } },
                }}
                className="flex items-center gap-2"
              >
                <span className="dot ok" /> service/ezekiel exposed
              </motion.p>
            </div>

            {/* The line slams in letter by letter once the service is exposed. */}
            <motion.h2
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: 1.6 } } }}
              className="giant text-[clamp(4rem,13.5vw,13rem)] mt-10 md:mt-14 flex flex-wrap"
              aria-label="Let's ship it."
            >
              {SLAM.map((ch, i) =>
                ch === " " ? (
                  <span key={i} className="w-[0.22em]" />
                ) : (
                  <span key={i} className="inline-block overflow-hidden pb-[0.03em]" aria-hidden>
                    <motion.span
                      variants={{
                        hidden: { y: "110%", rotate: 8 },
                        show: { y: "0%", rotate: 0, transition: { type: "spring", stiffness: 420, damping: 24 } },
                      }}
                      className={`inline-block ${i >= OUTLINE_FROM && ch !== "." ? "text-transparent [-webkit-text-stroke:1.5px_rgba(148,163,184,0.42)]" : ""} ${ch === "." ? "text-[var(--accent)]" : ""}`}
                    >
                      {ch}
                    </motion.span>
                  </span>
                ),
              )}
            </motion.h2>

            <div className="grid md:grid-cols-12 gap-8 mt-10 md:mt-14 items-end">
              <motion.p variants={item} className="lede md:col-span-6">
                A product to build, a platform to stand up, or a team that needs another engineer
                across the stack. I usually reply within a day.
              </motion.p>
              <motion.div variants={item} className="md:col-span-6 flex flex-wrap md:justify-end gap-2.5">
                <a href={`mailto:${EMAIL}`} className="btn btn-primary btn-lg !h-12 !px-6 !rounded-[12px]">
                  {EMAIL}
                </a>
                <a
                  href={RESUME}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-lg !h-12 !px-6 !rounded-[12px]"
                >
                  Résumé ↗
                </a>
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-[var(--line)]">
            {SOCIALS.map((s, i) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center justify-between px-5 md:px-10 h-16 transition-colors hover:bg-[var(--panel-2)] ${i > 0 ? "border-t sm:border-t-0 sm:border-l border-[var(--line)]" : ""}`}
              >
                <span className="tag group-hover:!text-[var(--fg)] transition-colors">
                  port/{s.label.toLowerCase()}
                </span>
                <span className="text-[var(--fg-3)] group-hover:text-[var(--accent)] transition-colors">↗</span>
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
