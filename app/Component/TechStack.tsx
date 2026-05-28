"use client";

import { motion } from "framer-motion";

export default function TechStack() {
  const techStack = [
    { name: "React", level: "Advanced" },
    { name: "Next.js", level: "Advanced" },
    { name: "React Native", level: "Advanced" },
    { name: "TypeScript", level: "Advanced" },
    { name: "Node.js", level: "Advanced" },
    { name: "Express", level: "Advanced" },
    { name: "Tailwind CSS", level: "Advanced" },
    { name: "Firebase", level: "Intermediate" },
    { name: "Vue.js", level: "Intermediate" },
    { name: "Django", level: "Intermediate" },
    { name: "PostgreSQL", level: "Intermediate" },
    { name: "MongoDB", level: "Intermediate" },
    { name: "Framer Motion", level: "Intermediate" },
    { name: "Three.js", level: "Beginner" },
  ];

  const tools = [
    "Git",
    "GitHub",
    "Postman",
    "Figma",
    "Vercel",
    "Docker",
    "Mixpanel",
    "PostHog",
  ];

  return (
    <section id="tech" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Tech Stack
        </motion.h2>

        {/* Main Technologies */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center text-teal-400">
            Core Technologies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ scale: 1.05, y: -6 }}
                className="glass border border-white/10 rounded-2xl p-5 text-center hover:border-teal-400/50 group relative overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-teal-500/0 group-hover:from-teal-500/10 group-hover:to-purple-500/10 transition-all duration-500" />

                {/* Icon placeholder - replace with actual icons */}
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {tech.name[0]}{" "}
                  {/* Or use a proper icon library like react-icons */}
                </div>

                <p className="font-semibold text-lg mb-2">{tech.name}</p>

                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium
      ${tech.level === "Advanced" ? "bg-teal-500/20 text-teal-300 border border-teal-500/30" : ""}
      ${tech.level === "Intermediate" ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" : ""}
      ${tech.level === "Beginner" ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" : ""}
    `}
                >
                  {tech.level}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tools & Others */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-center text-teal-400">
            Tools & Others
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="glass border border-white/10 px-6 py-3 rounded-full text-sm hover:bg-white/5 transition"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
