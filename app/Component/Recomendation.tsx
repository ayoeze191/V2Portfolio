"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, EASE, prefersReducedMotion } from "@/app/lib/gsap";
import SectionHead from "./SectionHead";
import { SplitReveal } from "./Anim";

type Rec = {
  id: number;
  name: string;
  title: string;
  company: string;
  quote: string;
  date: string;
};

const RECOMMENDATIONS: Rec[] = [
  {
    id: 1,
    name: "David Asaolu",
    title: "Freelancer",
    company: "Upwork",
    quote:
      "I had the pleasure of working with Ezekiel, and I can confidently say he is an exceptional frontend developer. His expertise in React, React Native, and TypeScript is evident in how efficiently he builds scalable and high-performance applications. What sets Ezekiel apart is his problem-solving ability and attention to detail. Whether it's optimizing UI components or implementing complex state management, he always ensures a seamless user experience. Beyond his technical skills, Ezekiel is a collaborative team player with a strong work ethic. He communicates ideas clearly, takes ownership of tasks, and is always eager to learn and improve.",
    date: "March 2025",
  },
  {
    id: 2,
    name: "Adegoke Damilare",
    title: "CTO",
    company: "Learnpally",
    quote:
      "I've collaborated with Bode on multiple projects. He's a quick learner, writes clean code, and is always willing to help teammates. His full-stack skills are impressive, and he delivers on time consistently.",
    date: "January 2025",
  },
];

const PREVIEW_LENGTH = 260;

function QuoteBlock({ rec, index }: { rec: Rec; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState(false);

  const isLong = rec.quote.length > PREVIEW_LENGTH;
  const text = expanded || !isLong ? rec.quote : `${rec.quote.slice(0, PREVIEW_LENGTH).trimEnd()}…`;

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(ref.current, { opacity: 1 });
        return;
      }
      gsap.set(ref.current, { opacity: 1 });
      gsap.from(ref.current, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: EASE,
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <figure
      ref={ref}
      className="panel"
      style={{ opacity: 0 }}
    >
      <span className="mono-accent">{String(index + 1).padStart(2, "0")}</span>

      <blockquote className="mt-4 text-lg md:text-xl leading-relaxed text-[var(--fg)] font-[family-name:var(--font-display)] tracking-tight">
        <span aria-hidden="true" className="text-[var(--fg-faint)]">
          &ldquo;
        </span>
        {text}
        <span aria-hidden="true" className="text-[var(--fg-faint)]">
          &rdquo;
        </span>
      </blockquote>

      {isLong && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="link-arrow mt-5"
        >
          {expanded ? "Show less" : "Read in full"}{" "}
          <span className="arrow">{expanded ? "↑" : "↓"}</span>
        </button>
      )}

      <figcaption className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-sm font-semibold text-[var(--fg)]">
          {rec.name}
        </span>
        <span className="mono">
          {rec.title} · {rec.company}
        </span>
        <span className="mono ml-auto">{rec.date}</span>
      </figcaption>
    </figure>
  );
}

export default function Recommendations() {
  return (
    <section id="words" className="section">
      <div className="shell">
        <SectionHead
          index="05"
          title="Words"
          aside={`${RECOMMENDATIONS.length} references`}
        />

        <SplitReveal as="h2" className="display-md max-w-[16ch] mb-14">
          What it&apos;s like to work with me, from people who have.
        </SplitReveal>

        <div className="grid lg:grid-cols-2 gap-x-14 gap-y-12">
          {RECOMMENDATIONS.map((rec, i) => (
            <QuoteBlock key={rec.id} rec={rec} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
