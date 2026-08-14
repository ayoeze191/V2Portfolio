"use client";

import SectionHead from "./SectionHead";
import { SplitReveal, FadeUp, Counter } from "./Anim";

/**
 * Figures are derived from the Experience + Projects data on this site, not
 * invented — update them here when either of those changes.
 */
const METRICS = [
  { value: 4, suffix: "+", label: "Years building", note: "Since 2021" },
  { value: 5, suffix: "", label: "Teams shipped with", note: "Startup to scale-up" },
  { value: 11, suffix: "", label: "Products in production", note: "Web and mobile" },
  { value: 2, suffix: "", label: "Platforms, one codebase", note: "React Native" },
];

const PRINCIPLES = [
  {
    n: "01",
    title: "Ship the whole thing",
    body: "Interface, API, database, deploy. I would rather own a feature end to end than hand off half of it and hope.",
  },
  {
    n: "02",
    title: "Measure, then decide",
    body: "Mixpanel and PostHog on the important paths. Opinions are cheap; funnels tell you where users actually fall off.",
  },
  {
    n: "03",
    title: "Boring where it counts",
    body: "Clever code is a liability at 2am. Predictable structure, clear names, and tests around the parts that move money.",
  },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="shell">
        <SectionHead index="01" title="About" aside="Lagos, Nigeria" />

        {/* Manifesto — philosophy before credentials, per anthonyokeh.com */}
        <SplitReveal as="h2" className="display-md max-w-[18ch] mb-14">
          I don&apos;t just write code. I build things that hold up in
          production.
        </SplitReveal>

        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-14">
          {/* Bio */}
          <FadeUp className="lg:col-span-7 space-y-5" stagger={0.1}>
            <p className="text-[15px] leading-relaxed">
              I&apos;m Ezekiel — a software engineer working across web and
              mobile. I started in frontend, kept following problems into the
              backend, and now I&apos;m most useful where the two meet: shipping
              a React Native screen and the Node.js endpoint behind it in the
              same afternoon.
            </p>
            <p className="text-[15px] leading-relaxed">
              Right now I&apos;m at{" "}
              <span className="text-[var(--accent)]">Roov Africa</span>, a
              property tech company, building mobile experiences in React Native
              on top of Node.js services. Before that I spent time in edtech and
              marketplaces — Learnpally, RentAnything, EkoPages — which is where
              I learned that auth flows, payment integrations, and push
              notifications are where products quietly live or die.
            </p>
            <p className="text-[15px] leading-relaxed">
              I care about the unglamorous parts: sensible database schemas,
              access control that actually works, and analytics wired up before
              anyone asks for a dashboard.
            </p>

            <div className="pt-3">
              <a href="/eazycv.pdf" target="_blank" rel="noopener noreferrer" className="link-arrow">
                Download résumé <span className="arrow">↗</span>
              </a>
            </div>
          </FadeUp>

          {/* Metrics — quantified impact, per anthonyokeh.com */}
          <FadeUp
            className="lg:col-span-5 grid grid-cols-2 gap-px bg-[var(--line)] border border-[var(--line)]"
            stagger={0.08}
          >
            {METRICS.map((m) => (
              <div key={m.label} className="bg-[var(--bg)] p-5">
                <p className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-[var(--fg)]">
                  <Counter to={m.value} suffix={m.suffix} />
                </p>
                <p className="mono mt-2 !tracking-[0.1em] text-[var(--fg-muted)]">
                  {m.label}
                </p>
                <p className="mono mt-1 !text-[0.62rem] !tracking-[0.06em]">
                  {m.note}
                </p>
              </div>
            ))}
          </FadeUp>
        </div>

        {/* Principles */}
        <FadeUp
          className="grid md:grid-cols-3 gap-px bg-[var(--line)] border border-[var(--line)] mt-16"
          stagger={0.1}
        >
          {PRINCIPLES.map((p) => (
            <div key={p.n} className="bg-[var(--bg)] p-6">
              <span className="mono-accent">{p.n}</span>
              <h3 className="text-lg font-semibold mt-3 mb-2 normal-case tracking-tight">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed">{p.body}</p>
            </div>
          ))}
        </FadeUp>
      </div>
    </section>
  );
}
