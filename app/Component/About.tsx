"use client";

import { Calendar, MapPin, Award, Code, Coffee, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  const funFacts = [
    { icon: Coffee, text: "Late night coder" },
    { icon: Code, text: "10k+ hours typed" },
    { icon: Heart, text: "Open source enthusiast" },
  ];

  return (
    <section id="about" className="py-20 px-6 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-12 text-center"
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left side - Intro + Stats Cards */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-semibold text-teal-400">
                Hey there! 👋
              </h3>
              <p className="text-gray-300 leading-relaxed">
                I'm a Software Engineer with a strong foundation in both web and
                mobile application development, passionate about building
                scalable, user-focused digital experiences.
              </p>
            </motion.div>

            {/* Stats Cards - Vertical or side by side */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Calendar, label: "Experience", value: "3+ Years" },
                { icon: MapPin, label: "Location", value: "Lagos, Nigeria" },
                { icon: Award, label: "Focus", value: "Full-Stack" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="glass border border-white/10 rounded-xl p-4 text-center hover:border-teal-400/40"
                >
                  <item.icon className="mx-auto mb-2 text-teal-400" size={24} />
                  <p className="text-xs text-gray-400">{item.label}</p>
                  <p className="text-lg font-semibold mt-0.5">{item.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Fun facts */}
            <div className="flex flex-wrap gap-2 pt-2">
              {funFacts.map((fact, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full text-sm text-gray-300"
                >
                  <fact.icon size={14} className="text-teal-400" />
                  {fact.text}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Right side - Detailed Bio */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass border border-white/10 rounded-2xl p-6 space-y-4"
          >
            <p className="text-gray-300 leading-relaxed text-sm">
              I specialize in building responsive web applications and
              cross-platform mobile solutions. My approach combines clean code
              with intuitive design, ensuring both functionality and user
              experience.
            </p>
            <p className="text-gray-300 leading-relaxed text-sm">
              Currently, I'm working with{" "}
              <span className="text-teal-400">React, Next.js,</span> and{" "}
              <span className="text-teal-400">React Native</span> to deliver
              high-quality products. I'm always eager to learn new technologies
              and tackle challenging problems.
            </p>
            <div className="pt-3">
              <span className="inline-block bg-teal-500/10 border border-teal-500/20 rounded-full px-4 py-1.5 text-xs text-teal-300">
                🚀 Open for opportunities
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
