"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import SectionHead from "../site/SectionHead";
import { container, item, viewport } from "../Reveal";
import { projects, type Project } from "@/app/data/projects";

/** What kind of product each one is — not what it's built with. */
const DOMAIN: Record<string, string> = {
  ajo: "FinTech",
  "debsphere-academy": "SaaS · EdTech",
  learnpally: "EdTech",
  ekopages: "E-commerce",
  unilms: "EdTech",
};

// Roov leads the hero, so it isn't repeated here.
const SHOWN = ["ajo", "debsphere-academy", "learnpally", "ekopages", "unilms"];

const FEATURED = SHOWN.map((slug) => projects.find((p) => p.slug === slug)).filter(
  (p): p is Project => Boolean(p),
);

export default function Work() {
  return (
    <section id="work" className="sec">
      <div className="wrap">
        <SectionHead
          title={
            <>
              Selected work, <em>shipped and in use</em>
            </>
          }
          action={
            <Link href="/projects" className="btn btn-secondary">
              All {projects.length} projects
            </Link>
          }
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={container(0.07)}
          className="grid md:grid-cols-2 gap-3"
        >
          {FEATURED.map((project, i) => {
            // An odd card out at the end takes the full row.
            const wide = i === FEATURED.length - 1 && FEATURED.length % 2 === 1;
            return (
              <motion.div key={project.slug} variants={item} className={wide ? "md:col-span-2" : ""}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="panel panel-link lift flex flex-col h-full p-2.5 md:p-3"
                >
                  <div className={`stage ${wide ? "aspect-[21/9]" : "aspect-[16/10]"}`}>
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={`${project.title} interface`}
                        fill
                        sizes={wide ? "(max-width: 768px) 100vw, 1150px" : "(max-width: 768px) 100vw, 570px"}
                        className="object-cover object-top"
                      />
                    ) : null}
                  </div>
                  <div className="flex-1 flex flex-col px-3 pt-5 pb-3">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="h4">{project.title}</h3>
                      <span className="meta shrink-0">
                        {DOMAIN[project.slug] ?? project.role} · {project.year}
                      </span>
                    </div>
                    <p className="small mt-1.5 flex-1 max-w-[60ch]">{project.summary}</p>
                    <div className="flex items-center justify-between gap-4 mt-5">
                      <p className="meta dotted">
                        {project.tech.slice(0, 3).map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </p>
                      <span className="link shrink-0">
                        Case study <span className="arrow">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
