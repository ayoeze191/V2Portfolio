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
      v:
        project.status ??
        (project.live ? "Live" : project.github ? "Open source" : "Archived"),
    },
    { k: "Stack", v: project.tech.slice(0, 3).join(" · ") },
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
    <main>
      {/* ── Masthead ─────────────────────────────────────────── */}
      <section className="pt-12 md:pt-20 pb-12 md:pb-16">
        <motion.div
          initial="hidden"
          animate="show"
          variants={container(0.07)}
          className="wrap"
        >
          <motion.div variants={item}>
            <Link href="/projects" className="link !text-[var(--fg-2)]">
              <span className="arrow">←</span> All projects
            </Link>
          </motion.div>

          <motion.p variants={item} className="kicker mt-12">
            Case study
          </motion.p>

          <motion.h1 variants={item} className="display mt-5">
            {project.title}
          </motion.h1>

          <motion.p variants={item} className="lede mt-8 !text-[var(--fg)]">
            {project.summary}
          </motion.p>

          <motion.dl
            variants={item}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 pt-5 border-t border-[var(--line-strong)]"
          >
            {facts(project).map((f) => (
              <div key={f.k}>
                <dt className="kicker">{f.k}</dt>
                <dd className="small !text-[var(--fg)] mt-1.5">{f.v}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </section>

      {/* ── Cover ────────────────────────────────────────────── */}
      {project.screens?.length ? (
        <section className="pb-16 md:pb-24">
          <div className="wrap">
            <Reveal y={20}>
              <div className="well">
                {/* Scrolls sideways on small screens; no JS, no animation. */}
                <ul className="screens">
                  {project.screens.map((screen, i) => (
                    <li key={screen.label}>
                      <div className="phone">
                        <Image
                          src={screen.src}
                          alt={`${project.title} — ${screen.label} screen`}
                          sizes="210px"
                          className="w-full h-auto"
                          placeholder="blur"
                          priority={i < 3}
                        />
                      </div>
                      <p className="meta mt-3 text-center">{screen.label}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>
      ) : project.image ? (
        <section className="pb-16 md:pb-24">
          <div className="wrap">
            <Reveal y={20}>
              <div className="well">
                <Image
                  src={project.image}
                  alt={`${project.title} interface`}
                  sizes="(max-width: 1240px) 100vw, 1140px"
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
        <div className="wrap split">
          <aside className="split-side">
            <div className="md:sticky md:top-[calc(var(--nav-h)+2rem)]">
              <p className="kicker">Built with</p>
              <ul className="mt-3 space-y-1.5">
                {project.tech.map((t) => (
                  <li key={t} className="small !text-[var(--fg)]">
                    {t}
                  </li>
                ))}
              </ul>

              {project.live || project.github ? (
                <div className="flex flex-col items-start gap-3 mt-8">
                  {project.live ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      {project.liveLabel ?? "Visit site"}{" "}
                      <span aria-hidden>↗</span>
                    </a>
                  ) : null}
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link"
                    >
                      View source <span className="arrow up">↗</span>
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>
          </aside>

          <div className="split-main md:max-w-[720px] space-y-16">
            <div>
              <p className="kicker mb-4">Overview</p>
              <Reveal y={12}>
                <p className="quote">{detail?.body ?? project.summary}</p>
              </Reveal>
            </div>

            {detail?.features?.length ? (
              <div>
                <p className="kicker mb-2">What it does</p>
                <motion.ol
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                  variants={container(0.05)}
                >
                  {detail.features.map((f, i) => (
                    <motion.li key={f} variants={item} className="feature">
                      <span className="num pt-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="body !text-[var(--fg)]">{f}</p>
                    </motion.li>
                  ))}
                </motion.ol>
              </div>
            ) : null}

            {detail?.challenges ? (
              <Reveal y={12}>
                <p className="kicker mb-4">The hard part</p>
                <p className="body">{detail.challenges}</p>
              </Reveal>
            ) : null}

            {detail?.learnings ? (
              <Reveal y={12}>
                <p className="kicker mb-4">What it taught me</p>
                <p className="body">{detail.learnings}</p>
              </Reveal>
            ) : null}
          </div>
        </div>
      </section>

      {/* ── Keep reading ─────────────────────────────────────── */}
      <section className="border-t border-[var(--line-strong)]">
        <div className="wrap grid sm:grid-cols-2">
          <Link
            href={`/projects/${prev.slug}`}
            className="group py-10 sm:pr-8 sm:border-r border-[var(--line)]"
          >
            <span className="kicker">← Previous</span>
            <span className="h3 block mt-3 group-hover:text-[var(--accent)] transition-colors">
              {prev.title}
            </span>
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            className="group py-10 sm:pl-8 sm:text-right border-t sm:border-t-0 border-[var(--line)]"
          >
            <span className="kicker">Next →</span>
            <span className="h3 block mt-3 group-hover:text-[var(--accent)] transition-colors">
              {next.title}
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
