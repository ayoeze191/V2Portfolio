"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import Section from "./Section";
import { container, item, viewport } from "../Reveal";
import { projects } from "@/app/data/projects";

/** What kind of product each one is — not what it's built with. */
const DOMAIN: Record<string, string> = {
  ajo: "FinTech",
  "debsphere-academy": "SaaS · EdTech",
  learnpally: "EdTech",
  ekopages: "E-commerce",
  unilms: "EdTech",
};

const SHOWN = ["ajo", "debsphere-academy", "learnpally", "ekopages", "unilms"];

const FEATURED = SHOWN.map((slug) =>
  projects.find((p) => p.slug === slug),
).filter((p): p is NonNullable<typeof p> => Boolean(p));

export default function Work() {
  return (
    <Section
      id="work"
      eyebrow="Portfolio"
      title="Selected work."
      intro="Products I've shipped across payments, learning and commerce."
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={container(0.08)}
        className="grid md:grid-cols-2 gap-5"
      >
        {FEATURED.map((project) => {
          const href = project.live ?? project.github;

          return (
            <motion.article
              key={project.slug}
              variants={item}
              className="card p-0 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[16/10] bg-[var(--surface-2)] overflow-hidden">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.title} interface`}
                    fill
                    sizes="(max-width: 768px) 100vw, 560px"
                    className="object-cover object-top"
                  />
                ) : (
                  <div
                    className="absolute inset-0 grid place-items-center"
                    style={{
                      background:
                        "linear-gradient(135deg, color-mix(in srgb, var(--accent) 20%, transparent), color-mix(in srgb, var(--accent-soft) 45%, transparent))",
                    }}
                  >
                    <span className="font-[family-name:var(--font-display)] text-6xl font-semibold text-[var(--accent)] opacity-70">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                )}
                <span className="absolute top-3 left-3 chip !bg-[var(--elevated)]">
                  {DOMAIN[project.slug] ?? project.role}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="h3">{project.title}</h3>
                  <span className="tag shrink-0">{project.year}</span>
                </div>
                <p className="body-sm mt-2.5 flex-1">{project.summary}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.tech.slice(0, 4).map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
                s
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5 pt-4 border-t border-[var(--border)]">
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social"
                    >
                      {project.live ? "View live" : "View code"}{" "}
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="social"
                  >
                    Case study <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={container()}
        className="mt-10 flex justify-center"
      >
        <motion.div variants={item}>
          <Link href="/projects" className="btn btn-ghost">
            See all {projects.length} projects <span className="arrow">→</span>
          </Link>
        </motion.div>
      </motion.div>
    </Section>
  );
}
