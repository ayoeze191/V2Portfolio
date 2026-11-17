"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { Reveal } from "../Component/Reveal";
import SectionHead from "../Component/site/SectionHead";
import { EMAIL, RESUME } from "../data/site";
import portrait from "../assets/images/portrait-cut.webp";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const view = { once: true, margin: "0px 0px -80px 0px" } as const;

const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const stagger = (s = 0.08, d = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: s, delayChildren: d } },
});

/* ── Content ───────────────────────────────────────────────────── */

const DESCRIBE = [
  { k: "Name", v: "ezekiel-olabode" },
  { k: "Namespace", v: "lagos-ng" },
  { k: "Node", v: "roov-africa" },
  { k: "Start Time", v: "2021" },
  { k: "Status", v: "Running", ok: true },
  { k: "Open to", v: "full-time · contract" },
];

const LABELS = ["role=fullstack", "focus=cloud-native", "region=lagos", "status=open-to-work"];

const CHAPTERS = [
  {
    when: "2021",
    title: "Started on the surface",
    body: "I started in 2021 the way most people do: making pages look right. What kept me here was everything behind them. I followed one bug from a button into an API, from the API into a query plan, and kept going until I could build the whole path myself. That is where I ended up: comfortable on either end, and most interested in the decisions that determine whether a product still works once there is real load on it.",
  },
  {
    when: "2021 — 2026",
    title: "The quiet parts",
    body: "Most of that time has been spent in edtech and marketplaces — EkoPages, RentAnything, Learnpally — owning the parts that quietly decide whether a product works. Auth and access control. Payment reconciliation against webhooks that arrive twice, out of order, or not at all. Queue workers for anything too slow to sit in a request. Push delivery that fires once. None of it demos well; all of it matters at 2am.",
  },
  {
    when: "Now",
    title: "Roov Africa",
    body: "Today I'm at Roov Africa, a property tech company, working across React Native and the Node.js services behind it. I'd rather write something boring and predictable than something clever I have to explain twice — and I'd rather spend a day on the schema than a quarter on the migrations that undo it.",
  },
];

const CONTAINERS = [
  {
    name: "services",
    area: "Services & APIs",
    body: "Node.js, Express and Django services designed around the workflows they serve rather than the screens that call them. REST APIs I would still want to consume a year later.",
    tools: ["Node.js", "Express", "Django", "TypeScript", "REST"],
  },
  {
    name: "data",
    area: "Data",
    body: "Postgres and MongoDB schemas that hold their shape as the product changes, Prisma on top, and Redis where a query has no business running twice.",
    tools: ["PostgreSQL", "MongoDB", "Prisma", "Redis"],
  },
  {
    name: "critical-paths",
    area: "Auth, payments & jobs",
    body: "The paths that quietly decide whether a product works. JWT and OAuth 2.0, role-based access enforced at the data layer, Paystack and Stripe reconciliation, and BullMQ workers for everything too slow to belong in a request.",
    tools: ["JWT", "OAuth 2.0", "Paystack", "Stripe", "BullMQ", "Firebase"],
  },
  {
    name: "surface",
    area: "Frontend & mobile",
    body: "React, Next.js and React Native on top of all of it. Building both ends means I design endpoints that are pleasant to consume, because I am usually the one consuming them.",
    tools: ["React", "Next.js", "React Native", "Vue 3", "Tailwind"],
  },
];

const SIDECARS = [
  {
    name: "code-reader",
    title: "Taking things apart",
    body: "A framework's internals, a well-made app's onboarding, someone else's migration notes. Reading other people's code has taught me more than any course.",
  },
  {
    name: "chess",
    title: "Chess, mostly blitz",
    body: "Fast decisions with incomplete information, and living with the consequences. Good practice for production incidents.",
  },
  {
    name: "community",
    title: "Lagos tech community",
    body: "Helping people earlier in the path than me get unstuck, and figuring out what makes a product feel considered rather than merely functional.",
  },
];

/* ── Pieces ────────────────────────────────────────────────────── */

/** The pod card: cutout portrait on a blueprint stage, labels underneath. */
function PodCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
      style={{ transformPerspective: 1400 }}
      className="pod ticks shadow-[0_40px_100px_-40px_rgba(0,0,0,0.95)]"
    >
      <div className="pod-bar">
        <span className="dot ok" />
        <span className="text-[var(--fg)]">Running</span>
        <span className="text-[var(--fg-3)]">pod/ezekiel-olabode</span>
        <span className="ml-auto text-[var(--fg-3)]">1/1</span>
      </div>

      <div className="relative aspect-[5/5] bp-grid overflow-hidden">
        {/* rings behind the portrait */}
        <svg viewBox="0 0 400 400" aria-hidden className="absolute inset-0 w-full h-full">
          <defs>
            <radialGradient id="about-core" cx="50%" cy="55%" r="50%">
              <stop offset="0%" stopColor="#4f8bff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#4f8bff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="220" r="170" fill="url(#about-core)" />
          <motion.circle
            cx="200"
            cy="220"
            r="120"
            fill="none"
            stroke="rgba(148,163,184,.22)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, delay: 0.5, ease: EASE }}
          />
          <motion.circle
            cx="200"
            cy="220"
            r="175"
            fill="none"
            stroke="rgba(148,163,184,.14)"
            strokeDasharray="2 6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, delay: 0.7, ease: EASE }}
          />
          {[0, 72, 144, 216, 288].map((a, i) => {
            const r = (a * Math.PI) / 180;
            return (
              <motion.rect
                key={a}
                x={Math.round((200 + 175 * Math.cos(r) - 5) * 100) / 100}
                y={Math.round((220 + 175 * Math.sin(r) - 5) * 100) / 100}
                width="10"
                height="10"
                rx="2"
                fill={i % 2 ? "#141820" : "#3ddc97"}
                stroke="rgba(148,163,184,.4)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + i * 0.1 }}
              />
            );
          })}
        </svg>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55, ease: EASE }}
          className="absolute inset-x-0 bottom-0 h-[94%] [mask-image:linear-gradient(to_bottom,#000_78%,transparent)]"
        >
          <Image
            src={portrait}
            alt="Ezekiel Olabode"
            fill
            priority
            sizes="(min-width: 1024px) 480px, 90vw"
            className="object-contain object-bottom"
          />
        </motion.div>
      </div>

      <div className="px-4 py-4 border-t border-[var(--line)]">
        <p className="tag !text-[0.6rem] mb-2.5">Labels</p>
        <motion.ul initial="hidden" animate="show" variants={stagger(0.08, 1.2)} className="flex flex-wrap gap-1.5">
          {LABELS.map((l) => (
            <motion.li
              key={l}
              variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}
              className="pill mono !text-[0.66rem] !h-7"
            >
              <span className="text-[var(--accent)]">{l.split("=")[0]}</span>=
              <span className="text-[var(--fg)]">{l.split("=")[1]}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
}

/* ── Page ──────────────────────────────────────────────────────── */

export default function AboutContent() {
  return (
    <main>
      {/* Describe */}
      <section data-hud="about · describe" className="relative bp-grid border-b border-[var(--line)] pt-10 md:pt-14 pb-16 md:pb-24">
        <div className="wrap-wide">
          <Link href="/" className="hud-link inline-flex items-center gap-2">
            <span aria-hidden>←</span> cd ~
          </Link>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 mt-10 items-start">
            <motion.div initial="hidden" animate="show" variants={stagger(0.1)} className="lg:col-span-7 min-w-0">
              <motion.p variants={rise} className="cmd">
                <span className="ps">$</span>
                <span>
                  <span className="k">kubectl</span> describe pod ezekiel-olabode
                </span>
              </motion.p>

              <h1 className="sec-title !text-[clamp(3.2rem,8.4vw,7.6rem)] mt-6">
                {[
                  <>I like the parts</>,
                  <>
                    that <em>have</em>
                  </>,
                  <>
                    <em>to scale</em>
                    <span className="text-[var(--accent)]">.</span>
                  </>,
                ].map((line, i) => (
                  <span key={i} className="block overflow-hidden pb-[0.03em]">
                    <motion.span
                      initial={{ y: "105%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 1, delay: 0.15 + i * 0.12, ease: EASE }}
                      className="block"
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p variants={rise} className="text-[1.25rem] md:text-[1.5rem] leading-[1.4] tracking-[-0.02em] text-[var(--fg)] mt-8 max-w-[34ch]">
                I&apos;m Ezekiel, a fullstack engineer in Lagos. I build products end to end, and the
                infrastructure they run on.
              </motion.p>

              {/* describe output */}
              <motion.dl variants={stagger(0.06)} className="mt-10 grid sm:grid-cols-2 gap-x-10 border-t border-[var(--line)]">
                {DESCRIBE.map((d) => (
                  <motion.div
                    key={d.k}
                    variants={rise}
                    className="flex items-baseline gap-3 py-3 border-b border-[var(--line)] mono text-[0.78rem]"
                  >
                    <dt className="text-[var(--fg-3)] shrink-0">{d.k}:</dt>
                    <span aria-hidden className="flex-1 border-b border-dotted border-[var(--line-strong)] translate-y-[-3px]" />
                    <dd className={`flex items-center gap-2 ${d.ok ? "text-[var(--ok)]" : "text-[var(--fg)]"}`}>
                      {d.ok ? <span className="dot ok !w-1.5 !h-1.5" /> : null}
                      {d.v}
                    </dd>
                  </motion.div>
                ))}
              </motion.dl>

              <motion.div variants={rise} className="flex flex-wrap gap-2.5 mt-9">
                <a href={RESUME} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg !h-12 !px-6 !rounded-[12px]">
                  Download résumé ↗
                </a>
                <Link href="/#contact" className="btn btn-secondary btn-lg !h-12 !px-6 !rounded-[12px]">
                  Get in touch
                </Link>
              </motion.div>
            </motion.div>

            <div className="lg:col-span-5 lg:sticky lg:top-[calc(var(--nav-h)+28px)] w-full max-w-[520px] mx-auto lg:max-w-none">
              <PodCard />
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section data-hud="about · logs" className="sec border-b border-[var(--line)]">
        <div className="wrap-wide">
          <SectionHead
            giant
            cmd={
              <>
                <span className="k">kubectl</span> logs ezekiel-olabode --since=2021
              </>
            }
            title={
              <>
                The <em>story</em>
              </>
            }
          />
          <ol className="relative">
            <span aria-hidden className="absolute left-[11px] md:left-[calc(25%-1px)] top-2 bottom-2 w-px bg-[var(--line)]" />
            {CHAPTERS.map((c, i) => (
              <motion.li
                key={c.title}
                initial="hidden"
                whileInView="show"
                viewport={view}
                variants={stagger(0.1)}
                className="relative grid md:grid-cols-4 gap-x-10 gap-y-3 pl-10 md:pl-0 py-10 border-b border-[var(--line)] last:border-b-0"
              >
                <motion.span
                  aria-hidden
                  variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { type: "spring", stiffness: 400, damping: 18 } } }}
                  className={`absolute left-[5px] md:left-[calc(25%-7px)] top-[52px] w-[13px] h-[13px] rounded-[4px] border ${i === CHAPTERS.length - 1 ? "bg-[var(--ok)] border-[var(--ok)] shadow-[0_0_0_4px_var(--ok-tint)]" : "bg-[var(--panel-2)] border-[var(--line-strong)]"}`}
                />
                <motion.div variants={rise} className="md:pr-10">
                  <p className="tag">{c.when}</p>
                  <p className="giant text-[4.2rem] md:text-[5.5rem] text-[var(--fg-3)] leading-[0.8] mt-2">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                </motion.div>
                <motion.div variants={rise} className="md:col-span-3 md:pl-10">
                  <h3 className="giant text-[2.2rem] md:text-[2.8rem]">{c.title}</h3>
                  <p className="body !text-[1.02rem] mt-3 max-w-[66ch]">{c.body}</p>
                </motion.div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Containers */}
      <section data-hud="about · containers" className="sec bp-grid border-b border-[var(--line)]">
        <div className="wrap-wide">
          <SectionHead
            giant
            cmd={
              <>
                <span className="k">kubectl</span> get containers -n ezekiel
              </>
            }
            title={
              <>
                What I <em>run</em>
              </>
            }
          />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={view}
            variants={stagger(0.1)}
            className="grid md:grid-cols-2 gap-4"
          >
            {CONTAINERS.map((c, i) => (
              <motion.article
                key={c.name}
                variants={rise}
                whileHover={{ y: -4 }}
                className="pod flex flex-col group hover:border-[var(--line-strong)] transition-colors"
              >
                <div className="pod-bar">
                  <span className="dot ok" />
                  <span className="text-[var(--fg)]">Running</span>
                  <span className="text-[var(--fg-3)]">container/{c.name}</span>
                  <span className="ml-auto text-[var(--fg-3)]">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="p-6 md:p-7 flex-1 flex flex-col">
                  <h3 className="giant text-[2.4rem] md:text-[2.9rem] group-hover:text-[var(--accent)] transition-colors">
                    {c.area}
                  </h3>
                  <p className="body mt-3 flex-1">{c.body}</p>
                  <ul className="flex flex-wrap gap-1.5 mt-6">
                    {c.tools.map((t) => (
                      <li key={t} className="pill mono !text-[0.66rem]">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sidecars */}
      <section data-hud="about · sidecars" className="sec">
        <div className="wrap-wide">
          <SectionHead
            giant
            cmd={
              <>
                <span className="k">kubectl</span> get pods -l type=sidecar
              </>
            }
            title={
              <>
                Off the <em>clock</em>
              </>
            }
          />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={view}
            variants={stagger(0.1)}
            className="grid md:grid-cols-3 gap-4"
          >
            {SIDECARS.map((s) => (
              <motion.div key={s.name} variants={rise} className="pod">
                <div className="pod-bar !h-9">
                  <span className="dot blue" />
                  <span className="text-[var(--fg-3)]">sidecar/{s.name}</span>
                </div>
                <div className="p-6">
                  <h3 className="giant text-[2rem]">{s.title}</h3>
                  <p className="small mt-3">{s.body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <Reveal className="mt-14">
            <div className="pod ticks bp-grid p-7 md:p-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="cmd">
                  <span className="ps">$</span>
                  <span>
                    <span className="k">kubectl</span> get deployments -n work
                  </span>
                </p>
                <p className="giant text-[clamp(2.6rem,6vw,4.6rem)] mt-4">
                  See what I&apos;ve <em className="not-italic text-transparent [-webkit-text-stroke:1.5px_rgba(148,163,184,0.42)]">built</em>
                  <span className="text-[var(--accent)]">.</span>
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <Link href="/projects" className="btn btn-primary btn-lg !h-12 !px-6 !rounded-[12px]">
                  All projects →
                </Link>
                <a href={`mailto:${EMAIL}`} className="btn btn-secondary btn-lg !h-12 !px-6 !rounded-[12px]">
                  {EMAIL}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
