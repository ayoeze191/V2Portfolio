"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Reveal, container, item, viewport } from "../Component/Reveal";
import SectionHead from "../Component/site/SectionHead";
import { RESUME } from "../data/site";
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
    <main>
      <section className="pt-12 md:pt-20 pb-16 md:pb-24">
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
            About
          </motion.p>
          <motion.h1 variants={item} className="display mt-5 max-w-[12ch]">
            I like the parts that <em>have to scale</em>.
          </motion.h1>
        </motion.div>

        <div className="wrap split mt-14 md:mt-20 pt-6 rule">
          <div className="split-side">
            <Reveal y={16}>
              <div className="well aspect-[4/5] max-w-[320px]">
                <Image
                  src={portrait}
                  alt="Ezekiel Olabode"
                  fill
                  priority
                  sizes="(min-width: 900px) 25vw, 80vw"
                  className="object-cover grayscale"
                />
              </div>
            </Reveal>
            <dl className="grid grid-cols-2 md:grid-cols-1 gap-x-6 gap-y-5 mt-8">
              {FACTS.map((f) => (
                <div key={f.label}>
                  <dt className="kicker">{f.label}</dt>
                  <dd className="small !text-[var(--fg)] mt-1">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={container(0.08, 0.2)}
            className="split-main md:max-w-[720px] space-y-6"
          >
            <motion.p variants={item} className="quote">
              I&apos;m Ezekiel — a full-stack engineer in Lagos. I build
              products end to end, and I like the parts that have to scale.
            </motion.p>
            <motion.p variants={item} className="body">
              I started in 2021 the way most people do: making pages look right.
              What kept me here was everything behind them. I followed one bug
              from a button into an API, from the API into a query plan, and kept
              going until I could build the whole path myself. That is where I
              ended up: comfortable on either end, and most interested in the
              decisions that determine whether a product still works once there
              is real load on it.
            </motion.p>
            <motion.p variants={item} className="body">
              Most of that time has been spent in edtech and marketplaces —
              EkoPages, RentAnything, Learnpally — owning the parts that quietly
              decide whether a product works. Auth and access control. Payment
              reconciliation against webhooks that arrive twice, out of order, or
              not at all. Queue workers for anything too slow to sit in a
              request. Push delivery that fires once. None of it demos well; all
              of it matters at 2am.
            </motion.p>
            <motion.p variants={item} className="body">
              Today I&apos;m at Roov Africa, a property tech company, working
              across React Native and the Node.js services behind it. I&apos;d
              rather write something boring and predictable than something clever
              I have to explain twice — and I&apos;d rather spend a day on the
              schema than a quarter on the migrations that undo it.
            </motion.p>
            <motion.div variants={item} className="flex flex-wrap gap-x-8 gap-y-3 pt-3">
              <a href={RESUME} target="_blank" rel="noopener noreferrer" className="link">
                Download résumé <span className="arrow up">↗</span>
              </a>
              <Link href="/#contact" className="link">
                Get in touch <span className="arrow">→</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="sec !pt-0">
        <div className="wrap">
          <SectionHead
            title={
              <>
                What I do, <em>across both ends of the stack</em>
              </>
            }
          />
          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={container(0.06)}
          >
            {CAPABILITIES.map((c) => (
              <motion.li key={c.n} variants={item} className="row split py-8">
                <p className="split-side num pt-1.5">{c.n}</p>
                <div className="split-main md:grid md:grid-cols-9 md:gap-8">
                  <h3 className="h4 md:col-span-3">{c.area}</h3>
                  <div className="md:col-span-6 mt-3 md:mt-0">
                    <p className="small">{c.body}</p>
                    <p className="meta mt-4 dotted">
                      {c.tools.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      <section className="sec !pt-0">
        <div className="wrap">
          <SectionHead
            title={
              <>
                Off the clock, <em>still curious</em>
              </>
            }
          />
          <div className="split">
            <div className="split-side" />
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={container(0.08)}
              className="split-main md:max-w-[720px] space-y-5"
            >
              <motion.p variants={item} className="body">
                When I&apos;m not shipping, I&apos;m usually taking something
                apart to see how it was built — a framework&apos;s internals, a
                well-made app&apos;s onboarding, someone else&apos;s migration
                notes. Reading other people&apos;s code has taught me more than
                any course.
              </motion.p>
              <motion.p variants={item} className="body">
                The rest goes to chess (mostly blitz), the Lagos tech community —
                helping people earlier in the path than me get unstuck — and the
                slow work of figuring out what makes a digital product feel
                considered rather than merely functional.
              </motion.p>
              <motion.div variants={item} className="pt-2">
                <Link href="/projects" className="link">
                  See what I&apos;ve built <span className="arrow">→</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
