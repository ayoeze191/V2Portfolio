"use client";

import Link from "next/link";
import { motion } from "motion/react";
import SectionHead from "../site/SectionHead";
import { container, item, viewport } from "../Reveal";
import { RESUME } from "@/app/data/site";

const PRINCIPLES = [
  {
    title: "The schema comes first",
    body: "Most product bugs start in the data model. I'd rather spend a day on the tables than a quarter on migrations that undo them.",
  },
  {
    title: "Assume it runs twice",
    body: "Webhooks arrive out of order, jobs retry, networks drop. Anything touching money or state gets keyed so a replay is a no-op.",
  },
  {
    title: "Boring where it counts",
    body: "Predictable structure, clear names, and tests around the parts that move money.",
  },
  {
    title: "Build for ten times the traffic",
    body: "Access control enforced at the data layer, not in components. Slow work pushed onto a queue before it costs anyone a request.",
  },
];

/** About and process in one place: who I am, then how I work. */
export default function Approach() {
  return (
    <section id="about" className="sec">
      <div className="wrap">
        <SectionHead
          title={
            <>
              Both ends of the stack, <em>and how I work on them</em>
            </>
          }
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={container(0.07)}
          className="grid lg:grid-cols-3 gap-3"
        >
          <motion.div variants={item} className="panel panel-pad lg:row-span-2 flex flex-col">
            <p className="kicker">About</p>
            <p className="body mt-4">
              I build the whole thing: React and React Native on the surface,
              Node.js and Django underneath, and the auth and payment paths in
              between.
            </p>
            <p className="body mt-4">
              Right now I&apos;m at Roov, a property tech company, working
              across the mobile app and the services behind it. I&apos;m also
              learning AI, building with models rather than just calling them.
            </p>
            <div className="flex flex-wrap gap-2.5 mt-auto pt-8">
              <Link href="/about" className="btn btn-secondary">
                More about me
              </Link>
              <a href={RESUME} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                Résumé ↗
              </a>
            </div>
          </motion.div>

          {PRINCIPLES.map((p, i) => (
            <motion.div key={p.title} variants={item} className="panel panel-pad">
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="h4 mt-3">{p.title}</h3>
              <p className="small mt-2">{p.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
