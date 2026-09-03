"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Reveal, container, item, viewport } from "../../Component/Reveal";
import type { Project } from "../../data/projects";

/** Facts worth stating flatly, in the order a reader asks for them. */
function facts(project: Project) {
  return [
    { k: "Role", v: project.role },
    { k: "Year", v: project.year },
    {
      k: "Status",
      v: project.live ? "Live" : project.github ? "Open source" : "Archived",
    },
    { k: "Stack", v: project.tech.slice(0, 2).join(" · ") },
  ];
}

export default function CaseStudy({
  project,
  prev,
  next,
}: {
  project: Project;
  prev: Project;
  next: Project;
}) {
  const detail = project.detail;

  return (
    <>
      {/* ── Masthead ─────────────────────────────────────────── */}
      <section className="pt-28 pb-10 md:pt-36 md:pb-14">
        <div className="shell">
          <motion.div
            initial="hidden"
            animate="show"
            variants={container(0.08)}
          >
            <motion.div variants={item} className="mb-8">
              <Link href="/projects" className="link-arrow">
                <span className="arrow">←</span> All projects
              </Link>
            </motion.div>

            <motion.div variants={item} className="mb-5">
              <span className="eyebrow">Case study</span>
            </motion.div>

            <motion.h1 variants={item} className="case-title">
              {project.title}
            </motion.h1>

            <motion.p variants={item} className="lede mt-7">
              {project.summary}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-7 border-y border-[var(--border)] py-6"
            >
              {facts(project).map((f) => (
                <div key={f.k}>
                  <p className="mono">{f.k}</p>
                  <p className="heading mt-1.5">{f.v}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Cover ────────────────────────────────────────────── */}
      {project.image ? (
        <section className="pb-14 md:pb-20">
          <div className="shell">
            <Reveal y={24}>
              <div className="case-cover">
                <Image
                  src={project.image}
                  alt={`${project.title} interface`}
                  sizes="(max-width: 1180px) 100vw, 1100px"
                  className="w-full h-auto"
                  placeholder="blur"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* ── Body ─────────────────────────────────────────────── */}
      <section className="pb-20 md:pb-28">
        <div className="shell grid lg:grid-cols-12 gap-x-14 gap-y-14">
          <div className="lg:col-span-7 space-y-14">
            <div>
              <p className="mono mb-4">Overview</p>
              <Reveal y={16}>
                <p className="body text-[1.02rem]">
                  {detail?.body ?? project.summary}
                </p>
              </Reveal>
            </div>

            {detail?.features?.length ? (
              <div>
                <p className="mono mb-1">What it does</p>
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                  variants={container(0.06)}
                >
                  {detail.features.map((f, i) => (
                    <motion.div key={f} variants={item} className="case-feature">
                      <span className="step-num">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="body-sm !text-[var(--fg)]">{f}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ) : null}

            {detail?.challenges || detail?.learnings ? (
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                variants={container(0.08)}
                className="grid sm:grid-cols-2 gap-4"
              >
                {detail?.challenges ? (
                  <motion.div variants={item} className="card-flat">
                    <p className="mono-accent mb-3">The hard part</p>
                    <p className="body-sm">{detail.challenges}</p>
                  </motion.div>
                ) : null}
                {detail?.learnings ? (
                  <motion.div variants={item} className="card-flat">
                    <p className="mono-accent mb-3">What it taught me</p>
                    <p className="body-sm">{detail.learnings}</p>
                  </motion.div>
                ) : null}
              </motion.div>
            ) : null}
          </div>

          {/* Sticky on desktop, a plain block on mobile. */}
          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal y={16} className="lg:sticky lg:top-24">
              <div className="card">
                <p className="mono mb-4">Built with</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>

                {project.live || project.github ? (
                  <div className="flex flex-col gap-2.5 mt-7">
                    {project.live ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary justify-center"
                      >
                        Visit site <span className="arrow">↗</span>
                      </a>
                    ) : null}
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost justify-center"
                      >
                        View source <span className="arrow">↗</span>
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* ── Keep reading ─────────────────────────────────────── */}
      <section className="pb-20">
        <div className="shell grid sm:grid-cols-2 gap-4">
          <Reveal y={14}>
            <Link href={`/projects/${prev.slug}`} className="case-jump">
              <span className="mono">← Previous</span>
              <span className="h3 mt-2 block">{prev.title}</span>
              <span className="tag mt-1 block">{prev.role}</span>
            </Link>
          </Reveal>
          <Reveal y={14} delay={0.06}>
            <Link
              href={`/projects/${next.slug}`}
              className="case-jump sm:text-right"
            >
              <span className="mono">Next →</span>
              <span className="h3 mt-2 block">{next.title}</span>
              <span className="tag mt-1 block">{next.role}</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
