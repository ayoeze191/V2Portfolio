"use client";

import { motion } from "motion/react";
import SectionHead from "../site/SectionHead";
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
    company: "Renato",
    role: "Frontend Developer (Contract)",
    period: "Aug 2025 — Jan 2026",
    points: [
      "Contracted by Canada-based Renato to build Vue frontend features for Tenant, a property management platform that helps landlords manage their properties.",
      "Worked through the ASP.NET backend codebase to understand the API contracts and integrate the frontend cleanly.",
    ],
    tech: ["Vue", "ASP.NET"],
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
    <section id="experience" className="sec">
      <div className="wrap">
        <SectionHead
          title={
            <>
              Experience, <em>four years across five teams</em>
            </>
          }
        />

        <motion.ol
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={container(0.06)}
          className="panel overflow-hidden"
        >
          {EXPERIENCE.map((job) => (
            <motion.li
              key={job.company}
              variants={item}
              className="row panel-pad grid md:grid-cols-12 gap-x-8 gap-y-4"
            >
              <div className="md:col-span-4">
                <div className="flex items-baseline justify-between md:block">
                  <h3 className="h4">{job.company}</h3>
                  <p className="meta md:mt-1.5">{job.period}</p>
                </div>
                <p className="small mt-1 md:mt-2">{job.role}</p>
                <p className="meta mt-3 dotted">
                  {job.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </p>
              </div>
              <ul className="md:col-span-8 space-y-2">
                {job.points.map((point) => (
                  <li key={point} className="small flex gap-3">
                    <span className="text-[var(--fg-3)] select-none" aria-hidden>
                      –
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
