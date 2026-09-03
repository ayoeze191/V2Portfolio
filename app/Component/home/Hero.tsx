"use client";

import { motion } from "motion/react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { container, item, viewport } from "../Reveal";

const EMAIL = "ayoeze191@gmail.com";

const LINKS = [
  { icon: FaGithub, label: "GitHub", href: "https://github.com/ayoeze191" },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/ayoeze191",
  },
  {
    icon: FaXTwitter,
    label: "Twitter",
    href: "https://twitter.com/olabodeezekie11",
  },
  { icon: HiOutlineMail, label: "Email", href: `mailto:${EMAIL}` },
];

const STATS = [
  { value: "4+", label: "Years building" },
  { value: "11", label: "Products shipped" },
  { value: "5", label: "Teams" },
  { value: "2", label: "Ends owned" },
];

const DOMAINS = [
  "PropTech",
  "FinTech",
  "EdTech",
  "Marketplaces",
  "E-commerce",
  "SaaS",
];

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Backdrop: stacked gradients plus two hairline arcs. All static —
          nothing here animates, so an idle hero costs zero frames. */}
      <div className="hero-wash" aria-hidden />
      <div
        aria-hidden
        className="hero-ring -top-[26rem] w-[46rem] h-[46rem] hidden sm:block"
      />
      <div
        aria-hidden
        className="hero-ring -top-[34rem] w-[68rem] h-[68rem] hidden sm:block"
      />

      <div className="wrap relative pt-14 pb-10 md:pt-20 md:pb-12">
        <motion.div initial="hidden" animate="show" variants={container(0.08, 0.05)}>
          <motion.div variants={item}>
            <span className="status">
              <span className="dot" />
              Product Engineer at Roov
            </span>
          </motion.div>

          <motion.p variants={item} className="label mt-8 mb-1">
            Hi, I am
          </motion.p>

          <motion.h1 variants={item} className="display ink-sheen">
            Ezekiel<span className="accent">.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mono mt-3 !normal-case !tracking-[0.06em]"
          >
            Also known as eazecodes
          </motion.p>

          <motion.p variants={item} className="lede mt-7 !max-w-[46ch]">
            Product engineer with four years of shipping software people
            actually use — with a keen passion for{" "}
            <span className="wonk">scalable, robust systems</span> and the
            schemas, queues and payment paths that hold them up.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-3 mt-9">
            <a href="#work" className="btn btn-primary">
              View my work <span className="arrow">→</span>
            </a>
            <a href="#contact" className="btn btn-ghost">
              Start a project
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8"
          >
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="social"
              >
                <l.icon size={13} aria-hidden="true" />
                {l.label}
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={container(0.07)}
          className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 mt-12 pt-9 border-t border-[var(--border)]"
        >
          {STATS.map((s) => (
            <motion.div key={s.label} variants={item}>
              <p className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-semibold tracking-tight text-[var(--fg)]">
                {s.value}
              </p>
              <p className="tag mt-2">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="wrap py-5 flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="tag shrink-0">Built across</span>
          {DOMAINS.map((d) => (
            <span
              key={d}
              className="font-[family-name:var(--font-display)] text-lg text-[var(--fg-faint)]"
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
