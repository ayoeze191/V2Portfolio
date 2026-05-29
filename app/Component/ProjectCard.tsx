"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { StaticImageData } from "next/dist/shared/lib/image-external";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  image?: StaticImageData | string | StaticImport;
  tech: string[];
  githubLink?: string;
  liveLink?: string;
  features?: string[];
  challenges?: string;
  learnings?: string;
  year: string;
}

interface ProjectCardProps {
  project: Project;
  variant?: "compact" | "detailed";
}

export function ProjectCard({
  project,
  variant = "compact",
}: ProjectCardProps) {
  if (variant === "detailed") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -8 }}
        className="glass border border-white/10 rounded-2xl overflow-hidden hover:border-teal-400/40 transition-all duration-300 flex flex-col h-full"
      >
        {/* Image placeholder */}
        <div className="relative h-48 bg-gradient-to-br from-teal-500/20 to-purple-600/20 flex items-center justify-center">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              className="object-cover"
              fill
              sizes="100%"
            />
          ) : (
            <div className="text-sm text-gray-500">No image available</div>
          )}
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
            <span className="text-xs text-gray-500">{project.year}</span>
          </div>

          <p className="text-gray-400 text-sm mb-4">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-xs bg-white/5 px-2 py-1 rounded-full text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <Link
            href={`/projects/${project.id}`}
            className="mt-auto inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition text-sm group"
          >
            View Details
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </Link>
        </div>
      </motion.div>
    );
  }

  // Compact version for home page
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="glass border border-white/10 rounded-2xl p-6 hover:border-teal-400/40 transition-all duration-300 flex flex-col h-full"
    >
      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
      <p className="text-gray-400 text-sm mb-4 flex-1">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="text-xs bg-white/5 px-2 py-1 rounded-full text-gray-300"
          >
            {tech}
          </span>
        ))}
      </div>

      <Link
        href={`/projects/${project.id}`}
        className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition text-sm group"
      >
        Learn More
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
      </Link>
    </motion.div>
  );
}
