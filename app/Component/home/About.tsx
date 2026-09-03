"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Section from "./Section";
import { container, item, viewport } from "../Reveal";

const TAGS = [
  "Product Engineering",
  "Scalable Systems",
  "React & React Native",
  "Node.js",
  "PostgreSQL",
  "Payments",
  "Learning AI",
];

const CAPABILITIES = [
  {
    n: "01",
    title: "Product Engineering",
    body: "I own features end to end — the data model, the endpoints, and the screen that consumes them, so nothing gets lost in a handoff.",
    meta: "Web apps · Mobile · Design-to-ship",
  },
  {
    n: "02",
    title: "Backend & Systems",
    body: "The half nobody sees: schemas, queues, caches, and the auth and payment paths that decide whether a product survives its own growth.",
    meta: "Node.js · Django · Postgres · Redis",
  },
  {
    n: "03",
    title: "Mobile",
    body: "Cross-platform apps that feel native — consistent UX across iOS and Android, and push delivery that fires once instead of four times.",
    meta: "React Native · Expo · Firebase",
  },
];

export default function About() {
  return (
    <Section
      id="about"
      className="section-lead"
      eyebrow="About"
      title={
        <>
          Building products that <span className="wonk">hold up</span> under
          growth.
        </>
      }
      intro="I'm Ezekiel — a product engineer in Lagos. I build the whole thing: React and React Native on the surface, Node.js and Django underneath."
    >
      <div className="grid lg:grid-cols-12 gap-x-14 gap-y-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={container(0.08)}
          className="lg:col-span-7 space-y-5"
        >
          <motion.p variants={item} className="body">
            What I enjoy most is the part that has to scale — schemas, queues,
            caches, and the auth and payment paths that quietly decide whether a
            product survives its own growth. I&apos;d rather spend a day on the
            tables than a quarter on migrations that undo them.
          </motion.p>

          <motion.p variants={item} className="body">
            Right now I&apos;m at <span className="accent">Roov</span>, a
            property tech company, working across the mobile app and the Node.js
            services behind it — listings, search, and the workflows that hang
            off them. Before that: Learnpally, RentAnything and EkoPages, where I
            owned the parts products quietly die on — Paystack and Stripe
            reconciliation, JWT and OAuth 2.0, role-based access control, and
            BullMQ workers.
          </motion.p>

          <motion.p variants={item} className="body">
            Lately I&apos;ve been <span className="hl">learning AI</span> —
            building with models rather than just calling them, and working out
            where they genuinely earn their place in a product instead of being
            bolted on.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-2 pt-2">
            {TAGS.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap gap-3 pt-3">
            <Link href="/about" className="btn btn-ghost">
              Read more <span className="arrow">→</span>
            </Link>
            <a
              href="/eazycv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Résumé ↗
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={container(0.09)}
          className="lg:col-span-5 flex flex-col gap-4"
        >
          {CAPABILITIES.map((c) => (
            <motion.div key={c.n} variants={item} className="card">
              <span className="step-num">{c.n}</span>
              <h3 className="h3 mt-2 mb-2">{c.title}</h3>
              <p className="body-sm">{c.body}</p>
              <p className="tag mt-4">{c.meta}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
