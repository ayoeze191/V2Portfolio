"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Reveal } from "../Reveal";

const once = { once: true, margin: "0px 0px -60px 0px" } as const;

/** Stepped easing: a clip that "types" instead of sliding. */
const typing = (steps: number) => (t: number) => Math.floor(t * steps) / steps;

/**
 * Section opener. Inner pages use the plain two-tone heading; home
 * sections pass `cmd` (the kubectl line, which types itself out) and
 * `giant` for the condensed title, which rises from behind a mask.
 * Wrap the second clause in <em>.
 */
export default function SectionHead({
  title,
  intro,
  action,
  cmd,
  index,
  giant = false,
}: {
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  cmd?: ReactNode;
  index?: string;
  giant?: boolean;
}) {
  return (
    <div className="sec-head">
      <div>
        {cmd ? (
          <p className="cmd mb-5">
            {index ? <span className="tag !text-[var(--fg-3)] mr-2">{index}</span> : null}
            <span className="ps">$</span>
            <motion.span
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={once}
              transition={{ duration: 0.9, ease: typing(30) }}
              className="inline-block"
            >
              {cmd}
            </motion.span>
            <motion.span
              aria-hidden
              initial={{ opacity: 0 }}
              whileInView={{ opacity: [0, 1, 0, 1, 0, 1, 0] }}
              viewport={once}
              transition={{ duration: 1.6, delay: 0.85 }}
              className="inline-block w-[7px] h-[14px] bg-[var(--ok)] align-middle"
            />
          </p>
        ) : null}
        {giant ? (
          // The observer sits on the mask, not the title: a fully clipped
          // element never counts as "in view".
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={once}
            className="overflow-hidden pb-[0.04em]"
          >
            <motion.h2
              variants={{
                hidden: { y: "105%" },
                show: { y: "0%", transition: { duration: 0.95, delay: cmd ? 0.35 : 0, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="sec-title"
            >
              {title}
            </motion.h2>
          </motion.div>
        ) : (
          <Reveal y={12}>
            <h2 className="h2 max-w-[20ch]">{title}</h2>
          </Reveal>
        )}
        {intro ? (
          <Reveal y={12} delay={0.05}>
            <p className="lede mt-5">{intro}</p>
          </Reveal>
        ) : null}
      </div>
      {action ? <Reveal y={12} delay={0.08}>{action}</Reveal> : null}
    </div>
  );
}
