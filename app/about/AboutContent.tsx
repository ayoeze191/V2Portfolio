"use client";

import Image from "next/image";
import Link from "next/link";
import { SplitReveal, FadeUp } from "../Component/Anim";
import portrait from "../assets/images/output.webp";

const CAPABILITIES = [
  {
    n: "01",
    area: "Services & APIs",
    body: "Node.js, Express and Django services designed around the workflows they serve rather than the screens that call them. REST APIs I would still want to consume a year later.",
    tools: ["Node.js", "Express", "Django", "TypeScript", "REST"],
  },
  {
    n: "02",
    area: "Data",
    body: "Postgres and MongoDB schemas that hold their shape as the product changes, Prisma on top, and Redis where a query has no business running twice.",
    tools: ["PostgreSQL", "MongoDB", "Prisma", "Redis"],
  },
  {
    n: "03",
    area: "Auth, payments & jobs",
    body: "The paths that quietly decide whether a product works. JWT and OAuth 2.0, role-based access enforced at the data layer, Paystack and Stripe reconciliation, and BullMQ workers for everything too slow to belong in a request.",
    tools: ["JWT", "OAuth 2.0", "Paystack", "Stripe", "BullMQ", "Firebase"],
  },
  {
    n: "04",
    area: "Frontend & mobile",
    body: "React, Next.js and React Native on top of all of it. Building both ends means I design endpoints that are pleasant to consume, because I am usually the one consuming them.",
    tools: ["React", "Next.js", "React Native", "Vue 3", "Tailwind"],
  },
];

const FACTS = [
  { label: "Based in", value: "Lagos, Nigeria" },
  { label: "Building since", value: "2021" },
  { label: "Currently", value: "Roov Africa" },
  { label: "Open to", value: "Full-time & contract" },
];

export default function AboutContent() {
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
            About
          </SplitReveal>

          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-start mt-12">
            <FadeUp className="lg:col-span-5" y={30}>
              <div className="media aspect-[4/5] rounded-[var(--radius-lg)]">
                <Image
                  src={portrait}
                  alt="Ezekiel Olabode"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover grayscale hover:grayscale-0 transition-[filter] duration-700"
                />
              </div>
            </FadeUp>

            <FadeUp className="lg:col-span-7 space-y-6" stagger={0.1}>
              <p className="lede !max-w-none">
                I&apos;m Ezekiel — a full-stack engineer in Lagos. I build
                products end to end, and I like the parts that have to scale.
              </p>

              <p className="text-[15px] leading-relaxed">
                I started in 2021 the way most people do: making pages look
                right. What kept me here was everything behind them. I followed
                one bug from a button into an API, from the API into a query
                plan, and kept going until I could build the whole path myself.
                That is where I ended up: comfortable on either end, and most
                interested in the decisions that determine whether a product
                still works once there is real load on it.
              </p>

              <p className="text-[15px] leading-relaxed">
                Most of that time has been spent in edtech and marketplaces —
                EkoPages, RentAnything, Learnpally — owning the parts that
                quietly decide whether a product works. Auth and access control.
                Payment reconciliation against webhooks that arrive twice, out
                of order, or not at all. Queue workers for anything too slow to
                sit in a request. Push delivery that fires once. None of it
                demos well; all of it matters at 2am.
              </p>

              <p className="text-[15px] leading-relaxed">
                Today I&apos;m at{" "}
                <span className="text-[var(--accent)]">Roov Africa</span>, a
                property tech company, working across React Native and the
                Node.js services behind it. I&apos;d rather write something
                boring and predictable than something clever I have to explain
                twice — and I&apos;d rather spend a day on the schema than a
                quarter on the migrations that undo it.
              </p>

              <div className="grid grid-cols-2 gap-x-8 gap-y-7 pt-4">
                {FACTS.map((f) => (
                  <div key={f.label}>
                    <p className="mono mb-1.5">{f.label}</p>
                    <p className="text-sm text-[var(--fg)]">{f.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-x-8 gap-y-3 pt-2">
                <a
                  href="/eazycv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-arrow"
                >
                  Download résumé <span className="arrow">↗</span>
                </a>
                <Link href="/#contact" className="link-arrow">
                  Get in touch <span className="arrow">→</span>
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <span className="index">01</span>
            <span className="title">What I do</span>
            <span className="aside">End to end</span>
          </div>

          <SplitReveal as="h2" className="display-md max-w-[16ch] mb-14">
            Both ends of the stack, built to scale.
          </SplitReveal>

          <div className="flex flex-col gap-2">
            {CAPABILITIES.map((c) => (
              <FadeUp key={c.n} y={30}>
                <div className="row">
                  <div className="grid grid-cols-12 gap-4 items-baseline">
                    <span className="row-index col-span-2 md:col-span-1">
                      {c.n}
                    </span>

                    <div className="col-span-10 md:col-span-3 row-title">
                      <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
                        {c.area}
                      </h3>
                    </div>

                    <p className="col-span-12 md:col-span-5 text-sm leading-relaxed mt-3 md:mt-0">
                      {c.body}
                    </p>

                    <div className="col-span-12 md:col-span-3 flex flex-wrap gap-1.5 mt-3 md:mt-0 md:justify-end">
                      {c.tools.map((t) => (
                        <span key={t} className="chip">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <span className="index">02</span>
            <span className="title">Off the clock</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-8">
            <SplitReveal
              as="h2"
              className="display-md lg:col-span-5 max-w-[12ch]"
            >
              Still curious, mostly offline.
            </SplitReveal>

            <FadeUp className="lg:col-span-7 space-y-5" stagger={0.1}>
              <p className="text-[15px] leading-relaxed">
                When I&apos;m not shipping, I&apos;m usually taking something
                apart to see how it was built — a framework&apos;s internals, a
                well-made app&apos;s onboarding, someone else&apos;s migration
                notes. Reading other people&apos;s code has taught me more than
                any course.
              </p>
              <p className="text-[15px] leading-relaxed">
                The rest goes to the Lagos tech community, helping people
                earlier in the path than me get unstuck, and to the slow work of
                figuring out what makes a digital product feel considered rather
                than merely functional.
              </p>
              <div className="pt-2">
                <Link href="/projects" className="link-arrow">
                  See what I&apos;ve built <span className="arrow">→</span>
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
