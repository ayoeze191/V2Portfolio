"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, EASE, prefersReducedMotion } from "@/app/lib/gsap";
import SectionHead from "./SectionHead";
import { SplitReveal } from "./Anim";

type Role = {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
  tech: string[];
};

const EXPERIENCE: Role[] = [
  {
    company: "Roov Africa",
    role: "Software Engineer (Mobile & Backend)",
    period: "Aug 2026 — Present",
    location: "Lagos, Nigeria",
    points: [
      "Building cross-platform mobile experiences for a property tech product using React Native.",
      "Developing and maintaining Node.js services powering listings, search, and user workflows.",
      "Working closely with design and product to turn property discovery flows into shipped features.",
    ],
    tech: ["React Native", "Node.js", "TypeScript", "REST APIs"],
  },
  {
    company: "Learnpally",
    role: "Full-Stack Engineer (Web & Mobile)",
    period: "Oct 2024 — Aug 2026",
    location: "Lagos, Nigeria",
    points: [
      "Built responsive React web interfaces and React Native mobile screens with consistent UX across platforms.",
      "Integrated Mixpanel and PostHog for event tracking, funnel analysis, and product insight.",
      "Developed RESTful APIs with Node.js and Express for course management and user workflows.",
      "Implemented JWT auth, OAuth 2.0 social login, and role-based access control.",
      "Integrated Firebase push notifications with a real-time delivery system.",
    ],
    tech: ["React", "React Native", "Node.js", "Express", "Firebase", "Mixpanel"],
  },
  {
    company: "RentAnything",
    role: "Full-Stack Developer",
    period: "Dec 2023 — Oct 2024",
    location: "Lagos, Nigeria",
    points: [
      "Architected a custom Vue 3 SSR pipeline using Vite, improving SEO and time-to-content.",
      "Built complete rental workflows: listings, bookings, pricing, and reviews.",
      "Delivered the owner dashboard and renter experience end to end.",
      "Integrated the Google Maps Places API for location search and filtering.",
    ],
    tech: ["Vue 3", "Vite SSR", "Node.js", "Google Maps API"],
  },
  {
    company: "Ekopages",
    role: "Frontend Developer",
    period: "Nov 2021 — Dec 2023",
    location: "Lagos, Nigeria",
    points: [
      "Developed the React frontend and Django REST backend for an e-learning and e-commerce platform.",
      "Designed scalable REST APIs and integrated secure payments via Stripe and Paystack.",
      "Managed PostgreSQL and MongoDB schemas for performance and reliability.",
      "Built course management systems and content delivery pipelines.",
    ],
    tech: ["React", "Django", "PostgreSQL", "MongoDB"],
  },
  {
    company: "Lagbaja Mobile",
    role: "Frontend Developer",
    period: "Nov 2021 — Dec 2023",
    location: "Lagos, Nigeria",
    points: [
      "Built a multi-sided marketplace using Next.js and Django REST Framework.",
      "Designed APIs for service providers and customers with a scalable architecture.",
      "Delivered responsive, mobile-first UI with seamless backend integration.",
    ],
    tech: ["Next.js", "Django", "PostgreSQL", "MongoDB"],
  },
];

function ExperienceRow({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: Role;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;

      if (prefersReducedMotion()) {
        gsap.set(panel, { height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 });
        return;
      }

      gsap.to(panel, {
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
        duration: 0.55,
        ease: EASE,
      });
    },
    { dependencies: [isOpen], scope: rowRef },
  );

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(rowRef.current, { opacity: 1 });
        return;
      }
      gsap.set(rowRef.current, { opacity: 1 });
      gsap.from(rowRef.current, {
        opacity: 0,
        y: 34,
        duration: 0.8,
        ease: EASE,
        scrollTrigger: { trigger: rowRef.current, start: "top 90%", once: true },
      });
    },
    { scope: rowRef },
  );

  return (
    <div ref={rowRef} className="row" style={{ opacity: 0 }}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full text-left"
      >
        <div className="grid grid-cols-12 gap-4 items-baseline">
          <span className="row-index col-span-2 md:col-span-1">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="col-span-10 md:col-span-5 row-title">
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
              {item.company}
            </h3>
            <p className="text-sm text-[var(--fg-muted)] mt-0.5">{item.role}</p>
          </div>

          <span className="mono col-span-6 md:col-span-3 mt-2 md:mt-0">
            {item.period}
          </span>
          <span className="mono col-span-5 md:col-span-2 mt-2 md:mt-0">
            {item.location}
          </span>

          <span
            className="hidden md:flex col-span-1 justify-end text-[var(--fg-faint)] text-lg leading-none transition-transform duration-500"
            style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
            aria-hidden="true"
          >
            +
          </span>
        </div>
      </button>

      <div
        ref={panelRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="grid grid-cols-12 gap-4 pt-6">
          <div className="col-span-12 md:col-start-2 md:col-span-7">
            <ul className="space-y-2.5">
              {item.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed">
                  <span className="text-[var(--accent)] shrink-0">—</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-12 md:col-span-3 flex flex-wrap gap-1.5 h-fit">
            {item.tech.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="section">
      <div className="shell">
        <SectionHead index="02" title="Experience" aside="2021 — Present" />

        <SplitReveal as="h2" className="display-md max-w-[16ch] mb-12">
          Five teams. One habit: finish what you start.
        </SplitReveal>

        <div className="flex flex-col gap-2">
          {EXPERIENCE.map((item, i) => (
            <ExperienceRow
              key={item.company}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
