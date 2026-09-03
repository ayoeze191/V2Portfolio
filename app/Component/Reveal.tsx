"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Shared viewport config — fire once, slightly before the element is centred. */
export const viewport = { once: true, margin: "0px 0px -60px 0px" } as const;

/** Parent variant: staggers whatever children carry `item`. */
export const container = (stagger = 0.07, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

/** Child variant: the fade-and-lift used everywhere on the page. */
export const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/**
 * One-off reveal for elements that aren't part of a stagger group.
 * Reduced-motion is handled globally by <MotionProvider>, which strips
 * the transform and leaves the opacity fade.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 16,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
