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
  { value: 11, suffix: "", label: "Services in production", note: "Node · Django" },
  { value: 3, suffix: "", label: "Datastores in anger", note: "Postgres · Mongo · Redis" },
];

const PRINCIPLES = [
  {
    n: "01",
    title: "The schema comes first",
    body: "Most product bugs are data-model bugs in a costume. I would rather spend a day on the tables than a quarter on migrations that undo them.",
  },
  {
    n: "02",
    title: "Assume it runs twice",
    body: "Webhooks arrive out of order, jobs retry, networks lie. Anything touching money or state gets keyed so a replay is a no-op.",
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
          Full stack, with a bias for systems that scale.
        </SplitReveal>

        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-14">
          {/* Bio */}
          <FadeUp className="lg:col-span-7 space-y-5" stagger={0.1}>
            <p className="text-[15px] leading-relaxed">
              I&apos;m Ezekiel — a full-stack engineer. I build the whole thing:
              React and React Native on the surface, Node.js and Django
              underneath. What I enjoy most is the part that has to scale —
              schemas, queues, caches, and the auth and payment paths that
              decide whether a product survives its own growth.
            </p>
            <p className="text-[15px] leading-relaxed">
              Right now I&apos;m at{" "}
              <span className="text-[var(--accent)]">Roov Africa</span>, a
              property tech company, working across React Native and the Node.js
              services behind it — listings, search, and the workflows that hang
              off them. Before that: Learnpally, RentAnything and EkoPages,
              where I owned features end to end, including the parts products
              quietly die on — Paystack and Stripe reconciliation, JWT and
              OAuth 2.0, role-based access control, BullMQ workers, and push
              delivery that fires once instead of four times.
            </p>
            <p className="text-[15px] leading-relaxed">
              Owning both ends is the point: I design the data model and the
              endpoints, then build the screen that consumes them, so nothing
              gets lost in a handoff. And I build for the version of the product
              that has ten times the traffic — schemas that don&apos;t need
              rewriting a quarter later, access control enforced at the data
              layer rather than in components, and slow work pushed onto a queue
              before it starts costing anyone a request.
            </p>

            <div className="pt-3">
              <a href="/eazycv.pdf" target="_blank" rel="noopener noreferrer" className="link-arrow">
                Download résumé <span className="arrow">↗</span>
              </a>
            </div>
          </FadeUp>

          {/* Metrics — quantified impact, per anthonyokeh.com */}
          <FadeUp
            className="lg:col-span-5 grid grid-cols-2 gap-x-8 gap-y-9"
            stagger={0.08}
          >
            {METRICS.map((m) => (
              <div
                key={m.label}
                className="pr-4"
              >
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
          className="grid md:grid-cols-3 gap-x-10 gap-y-10 mt-20"
          stagger={0.1}
        >
          {PRINCIPLES.map((p) => (
            <div key={p.n}>
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
