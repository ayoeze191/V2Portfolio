"use client";

import type { ReactNode } from "react";
import { Reveal } from "../Reveal";

/**
 * The rhythm every section on the page repeats: a small eyebrow label, a large
 * serif heading, then a one-line intro. Taken from maazscript's structure.
 */
export default function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
  headClassName = "",
}: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
  headClassName?: string;
}) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="wrap">
        <div className={`max-w-2xl mb-12 md:mb-16 ${headClassName}`}>
          <Reveal y={10}>
            <span className="eyebrow">{eyebrow}</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="h2 mt-5">{title}</h2>
          </Reveal>
          {intro ? (
            <Reveal delay={0.12}>
              <p className="lede mt-4">{intro}</p>
            </Reveal>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
