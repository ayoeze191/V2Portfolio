"use client";

import { motion } from "motion/react";
import Section from "./Section";
import { container, item, viewport } from "../Reveal";

type Role = {
  company: string;
  role: string;
  period: string;
  points: string[];
  tech: string[];
};

const EXPERIENCE: Role[] = [
  {
    company: "Roov",
    role: "Product Engineer",
    period: "2026 — Now",
    points: [
      "Building cross-platform mobile experiences for a property tech product in React Native.",
      "Developing and maintaining the Node.js services powering listings, search, and user workflows.",
      "Working with design and product to turn property discovery flows into shipped features.",
    ],
    tech: ["React Native", "Node.js", "TypeScript"],
  },
  {
    company: "Learnpally",
    role: "Full-Stack Engineer",
    period: "2024 — 2026",
    points: [
      "Built React web interfaces and React Native screens with consistent UX across platforms.",
      "Developed REST APIs in Node.js and Express for course management and user workflows.",
      "Implemented JWT auth, OAuth 2.0 social login, and role-based access control.",
      "Wired Firebase push notifications to a delivery system that fires once, not four times.",
    ],
    tech: ["React", "React Native", "Express", "Firebase"],
  },
  {
    company: "RentAnything",
    role: "Full-Stack Developer",
    period: "2023 — 2024",
    points: [
      "Architected a custom Vue 3 SSR pipeline on Vite, improving SEO and time-to-content.",
      "Built the rental workflows end to end: listings, bookings, pricing, and reviews.",
      "Integrated the Google Maps Places API for location search and filtering.",
    ],
    tech: ["Vue 3", "Vite SSR", "Google Maps"],
  },
  {
    company: "Ekopages",
    role: "Full-Stack Developer",
    period: "2021 — 2023",
    points: [
      "Built the React frontend and Django REST backend for an e-learning and e-commerce platform.",
      "Designed scalable REST APIs and integrated payments via Stripe and Paystack.",
      "Managed PostgreSQL and MongoDB schemas for performance and reliability.",
    ],
    tech: ["React", "Django", "PostgreSQL", "Stripe"],
  },
];

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've built."
      intro="Four years across property, learning, marketplaces and commerce."
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={container(0.07)}
      >
        {EXPERIENCE.map((job) => (
          <motion.div key={job.company} variants={item} className="entry">
            <div className="entry-when">{job.period}</div>
            <div>
              <h3 className="h3">
                {job.role}{" "}
                <span className="text-[var(--fg-faint)] font-normal">·</span>{" "}
                <span className="accent">{job.company}</span>
              </h3>
              <ul className="mt-3 space-y-2">
                {job.points.map((point) => (
                  <li key={point} className="body-sm flex gap-3">
                    <span
                      className="text-[var(--accent)] shrink-0 select-none"
                      aria-hidden="true"
                    >
                      —
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {job.tech.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
