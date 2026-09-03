"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * `reducedMotion="user"` makes Framer Motion drop transform animations for
 * anyone with prefers-reduced-motion set, while keeping opacity fades — so
 * content still arrives, it just doesn't move.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
