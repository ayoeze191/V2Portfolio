"use client";

import Link from "next/link";
import { projects } from "../data/projects";
import { SplitReveal, FadeUp } from "../Component/Anim";
import WorkList from "../Component/WorkList";

const YEARS = projects.map((p) => Number(p.year));
const SPAN = `${Math.min(...YEARS)} — ${Math.max(...YEARS)}`;
const SHIPPED = projects.filter((p) => p.live).length;

export default function Archive() {
  return (
    <>
      <section className="pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="shell">
          <FadeUp y={16} duration={0.6} className="mb-8">
            <Link href="/" className="link-arrow">
              <span className="arrow">←</span> Back to home
            </Link>
          </FadeUp>

          <SplitReveal as="h1" className="display mb-8" immediate>
            Archive
          </SplitReveal>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mt-10">
            <FadeUp className="lg:col-span-7" stagger={0.09}>
              <p className="lede">
                Everything worth keeping — learning platforms, marketplaces, and
                the odd weekend build. Expand a row for the detail.
              </p>
            </FadeUp>

            <FadeUp
              className="lg:col-span-5 lg:justify-self-end grid grid-cols-3 gap-x-10 gap-y-5 w-full lg:w-auto"
              stagger={0.08}
            >
              <div>
                <p className="mono mb-1.5">Projects</p>
                <p className="text-sm text-[var(--fg)] tabular-nums">
                  {projects.length}
                </p>
              </div>
              <div>
                <p className="mono mb-1.5">Live</p>
                <p className="text-sm text-[var(--fg)] tabular-nums flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--signal)]" />
                  {SHIPPED}
                </p>
              </div>
              <div>
                <p className="mono mb-1.5">Span</p>
                <p className="text-sm text-[var(--fg)] tabular-nums">{SPAN}</p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <span className="index">ALL</span>
            <span className="title">Projects</span>
            <span className="aside">Click a row to expand</span>
          </div>

          <WorkList items={projects} expandable />

          <FadeUp
            className="mt-14 flex flex-wrap items-center justify-between gap-6"
            y={24}
          >
            <p className="lede !text-base max-w-[38ch]">
              Not everything makes it here. The rest lives on GitHub, in various
              states of finish.
            </p>
            <a
              href="https://github.com/ayoeze191"
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow"
            >
              github.com/ayoeze191 <span className="arrow">↗</span>
            </a>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
