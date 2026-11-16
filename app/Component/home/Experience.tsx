"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
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


/**
 * Experience as rollout history: newest revision first, a spine that fills
 * as you scroll (scroll-linked, so idle costs nothing).
 */
export default function Experience() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const total = EXPERIENCE.length;

  return (
    <section id="experience" data-hud="03 · rollouts" className="sec border-t border-[var(--line)]">
      <div className="wrap-wide">
        <SectionHead
          giant
          index="03"
          cmd={
            <>
              <span className="k">kubectl</span> rollout history deployment/ezekiel
            </>
          }
          title={
            <>
              Rollout <em>history</em>
            </>
          }
        />

        <div className="hidden md:grid grid-cols-12 gap-x-8 tag pb-3 border-b border-[var(--line)]">
          <span className="col-span-4 pl-14">Revision · Team</span>
          <span className="col-span-8">Change cause</span>
        </div>

        <ol ref={ref} className="relative">
          {/* Spine */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-[var(--line)]" aria-hidden>
            <motion.div style={{ scaleY: fill }} className="absolute inset-0 origin-top bg-gradient-to-b from-[var(--ok)] via-[var(--accent)] to-[var(--accent)]" />
          </div>

          {EXPERIENCE.map((job, i) => {
            const rev = total - i;
            const current = i === 0;
            return (
              <motion.li
                key={job.company}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                variants={container(0.06)}
                className="relative grid md:grid-cols-12 gap-x-8 gap-y-4 py-9 pl-14 md:pl-0 border-b border-[var(--line)]"
              >
                <span
                  aria-hidden
                  className={`absolute left-[12px] top-[46px] w-[15px] h-[15px] rounded-[4px] border ${current ? "bg-[var(--ok)] border-[var(--ok)] shadow-[0_0_0_4px_var(--ok-tint),0_0_18px_rgba(61,220,151,0.5)]" : "bg-[var(--panel-2)] border-[var(--line-strong)]"}`}
                />
                <motion.div variants={item} className="md:col-span-4 md:pl-14">
                  <p className="tag flex items-center gap-2">
                    rev {String(rev).padStart(2, "0")}
                    {current ? (
                      <span className="inline-flex items-center gap-1.5 text-[var(--ok)]">
                        · <span className="dot ok !w-1.5 !h-1.5" /> current
                      </span>
                    ) : null}
                  </p>
                  <h3 className="giant text-[2.6rem] md:text-[3.2rem] mt-2">{job.company}</h3>
                  <p className="small mt-1">{job.role}</p>
                  <p className="meta mt-1">{job.period}</p>
                </motion.div>
                <motion.div variants={item} className="md:col-span-8 md:pt-7">
                  <ul className="space-y-2.5">
                    {job.points.map((point) => (
                      <li key={point} className="body flex gap-3 !leading-[1.6]">
                        <span className="mono text-[var(--accent)] select-none text-[0.8rem] pt-[3px]" aria-hidden>
                          +
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="flex flex-wrap gap-1.5 mt-5">
                    {job.tech.map((t) => (
                      <span key={t} className="pill mono !text-[0.68rem]">
                        {t}
                      </span>
                    ))}
                  </p>
                </motion.div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
