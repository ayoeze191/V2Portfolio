"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { ArrowLeft } from "lucide-react";
import { projects } from "./../data/projects";
import { ProjectCard } from "./../Component/ProjectCard";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-teal-400 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            All Projects
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A collection of my work from AI-powered tools to educational
            platforms and everything in between.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              variant="detailed"
            />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-8 border-t border-white/10"
        >
          <p className="text-gray-400 mb-4">Want to see more?</p>
          <a
            href="https://github.com/ayoeze191"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-teal-600/20 border border-white/10 hover:border-teal-400/50 rounded-xl px-6 py-3 text-white transition-all"
          >
            <FaGithub className="w-5 h-5" />
            Visit My GitHub
          </a>
        </motion.div>
      </div>
    </main>
  );
}
