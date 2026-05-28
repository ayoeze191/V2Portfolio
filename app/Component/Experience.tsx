"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Briefcase } from "lucide-react";

export default function Experience() {
  const experiences = [
    {
      role: "Full-Stack Engineer (Web & Mobile)",
      company: "Learnpally",
      period: "Oct 2024 – Present",
      location: "Lagos, Nigeria",
      points: [
        "Built responsive React web interfaces and React Native mobile screens with consistent UX across platforms.",
        "Integrated Mixpanel & PostHog for event tracking, funnel analysis, and product insights.",
        "Developed RESTful APIs with Node.js/Express for course management and user workflows.",
        "Implemented JWT auth, OAuth 2.0 social login, and RBAC for secure access.",
        "Integrated Firebase push notifications and real-time delivery system.",
      ],
      tech: [
        "React",
        "React Native",
        "Node.js",
        "Express",
        "Firebase",
        "Mixpanel",
      ],
    },
    {
      role: "Full-Stack Developer",
      company: "RentAnything",
      period: "Dec 2023 – Oct 2024",
      location: "Lagos, Nigeria",
      points: [
        "Architected a custom Vue 3 SSR pipeline using Vite, improving SEO and performance.",
        "Built complete rental workflows: listings, booking system, pricing, and reviews.",
        "Developed Owner dashboard and renter experience end-to-end.",
        "Integrated Google Maps Places API for location search and filtering.",
      ],
      tech: ["Vue 3", "Vite SSR", "Node.js", "Google Maps API"],
    },
    {
      role: "FrontEnd Developer",
      company: "Ekopages",
      period: "Nov 2021 – Dec 2023",
      location: "Lagos, Nigeria",
      points: [
        "Developed React frontend and Django REST backend for e-learning and e-commerce platform.",
        "Designed scalable REST APIs and integrated secure payments (Stripe & Paystack).",
        "Managed PostgreSQL & MongoDB schemas for performance and reliability.",
        "Built course management systems and content delivery pipelines.",
      ],
      tech: ["React", "Django", "PostgreSQL", "MongoDB"],
    },
    {
      role: "Frontend Developer",
      company: "Lagbaja Mobile ",
      period: "Nov 2021 – Dec 2023",
      location: "Lagos, Nigeria",
      points: [
        "Built a multi-sided marketplace using Next.js and Django REST Framework.",
        "Designed APIs for service providers and customers with scalable architecture.",
        "Delivered responsive, mobile-first UI with seamless backend integration.",
      ],
      tech: ["React", "Django", "PostgreSQL", "MongoDB"],
    },
  ];
  return (
    <section id="experience" className="py-20 px-6 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Professional Experience
        </motion.h2>

        <div className="relative space-y-8">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-teal-400 via-teal-500/30 to-transparent hidden md:block" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative flex flex-col md:flex-row gap-5"
            >
              {/* Timeline dot */}
              <div className="hidden md:flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
                  <Briefcase size={18} className="text-white" />
                </div>
              </div>

              {/* Card */}
              <motion.div
                whileHover={{ y: -4, x: 4 }}
                className="flex-1 glass border border-white/10 rounded-2xl p-6 hover:border-teal-400/40 transition-all duration-300"
              >
                {/* Header with year badge */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {exp.role}
                    </h3>
                    <p className="text-teal-400 text-lg">{exp.company}</p>
                  </div>
                  <span className="bg-teal-500/10 border border-teal-500/30 text-teal-300 text-sm px-3 py-1.5 rounded-full whitespace-nowrap">
                    {exp.period.split("–")[1]?.trim() || exp.period}
                  </span>
                </div>

                {/* Location & period row */}
                <div className="flex flex-wrap gap-4 mb-5 text-sm text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={15} />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={15} />
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Bullet points with better styling */}
                <ul className="space-y-2.5 mb-6">
                  {exp.points.map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex gap-2.5 text-gray-300 text-sm"
                    >
                      <span className="text-teal-400 mt-1">▹</span>
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                  {exp.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs bg-white/5 hover:bg-teal-500/20 transition-all px-3 py-1.5 rounded-full text-gray-300 hover:text-teal-300 hover:scale-105"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
