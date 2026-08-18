"use client";

import Link from "next/link";
import SectionHead from "./SectionHead";
import { SplitReveal } from "./Anim";
import WorkList from "./WorkList";
import { featuredProjects, projects } from "../data/projects";

export default function Projects() {
  return (
    <section id="work" className="section">
      <div className="shell">
        <SectionHead index="03" title="Selected Work" aside="2022 — 2025" />

        <SplitReveal as="h2" className="display-md max-w-[15ch] mb-12">
          Things I&apos;ve shipped and still stand behind.
        </SplitReveal>

        <WorkList items={featuredProjects} />

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <Link href="/projects" className="link-arrow">
            View the full archive — {projects.length} projects{" "}
            <span className="arrow">→</span>
          </Link>
          <span className="mono hidden md:inline">Hover a row to preview</span>
        </div>
      </div>
    </section>
  );
}
