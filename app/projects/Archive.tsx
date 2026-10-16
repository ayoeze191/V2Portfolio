"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { container, item, viewport } from "../Component/Reveal";
import { projects } from "../data/projects";

const YEARS = projects.map((p) => Number(p.year));
const SPAN = `${Math.min(...YEARS)}–${Math.max(...YEARS)}`;
const LIVE = projects.filter((p) => p.live).length;

export default function Archive() {
  return (
    <main>
      <section className="pt-12 md:pt-20 pb-12">
        <motion.div
          initial="hidden"
          animate="show"
          variants={container(0.07)}
          className="wrap"
        >
          <motion.div variants={item}>
            <Link href="/" className="link !text-[var(--fg-2)]">
              <span className="arrow">←</span> Home
            </Link>
          </motion.div>
          <motion.p variants={item} className="kicker mt-12">
            Archive
          </motion.p>
          <motion.h1 variants={item} className="display mt-5">
            Everything <em>worth keeping</em>.
          </motion.h1>
          <motion.p variants={item} className="lede mt-8">
            Learning platforms, marketplaces, fintech and the odd weekend build.
            Each one opens a case study.
          </motion.p>
          <motion.p variants={item} className="meta mt-6 dotted">
            <span>{projects.length} projects</span>
            <span>{LIVE} live</span>
            <span>{SPAN}</span>
          </motion.p>
        </motion.div>
      </section>

      <section className="pb-24">
        <div className="wrap">
          <div className="panel overflow-hidden">
          <div className="hidden md:grid grid-cols-[2.5rem_minmax(0,1fr)_14rem_4rem] gap-4 px-5 py-3 border-b border-[var(--line)]">
            <span className="kicker">#</span>
            <span className="kicker">Project</span>
            <span className="kicker">Role</span>
            <span className="kicker text-right">Year</span>
          </div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={container(0.035)}
          >
            {projects.map((p, i) => (
              <motion.li key={p.slug} variants={item} className="row">
                <Link
                  href={`/projects/${p.slug}`}
                  className="index-row !px-5 md:!grid-cols-[2.5rem_minmax(0,1fr)_14rem_4rem]"
                >
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0">
                    <span className="t block">{p.title}</span>
                    <span className="small block mt-1 md:truncate">{p.summary}</span>
                  </span>
                  <span className="meta hidden md:block">{p.role}</span>
                  <span className="meta text-right">{p.year}</span>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
          </div>

          <div className="mt-14 flex flex-wrap items-baseline justify-between gap-4">
            <p className="small max-w-[40ch]">
              Not everything makes it here. The rest lives on GitHub, in various
              states of finish.
            </p>
            <a
              href="https://github.com/ayoeze191"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              github.com/ayoeze191 <span className="arrow up">↗</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
