"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import ekopages from "./../assets/images/Projects/ekopages.png";
import dogify from "./../assets/images/Projects/Dogify.png";
import Mctchey from "./../assets/images/Projects/Mctechy.png";
import matacare from "./../assets/images/Projects/matacare.png";

export default function Projects() {
  const projects = [
    {
      image: "",
      title: "Learnpally Platform",
      description:
        "Full-stack education platform with web and mobile apps. Built course management, analytics dashboard, and real-time features.",
      tech: [
        "React",
        "React Native",
        "Node.js",
        "Express",
        "Firebase",
        "Mixpanel",
      ],
      live: "https://learn.learnpally.com",
      github: "#",
      status: "Featured",
    },
    {
      image: "",
      title: "RentAnything",
      description:
        "Complete rental marketplace with SSR, advanced search, booking system, and Google Maps integration.",
      tech: ["Vue 3", "Vite", "Node.js", "Google Maps API"],
      live: "https://rentanything.io",
      github: "#",
      status: "Featured",
    },
    // Add more projects here
    {
      image: ekopages,
      title: "ekopages",
      description:
        "s an educational platform that uses SDG-themed children's literature, stories, courses, and programs to teach African children about environmental, gender, and sustainability issues affecting them .",
      tech: ["Next.js", "TypeScript", "Tailwind", "Django"],
      live: "https://ekopages.com",
      github: "",
      status: "Featured",
    },
    {
      image: Mctchey,
      title: "Mktechy",
      description:
        "It's a comprehensive landing page for a tech bootcamp provider. Here is a breakdown of its main content and features, which you can use to describe your project..",
      tech: ["Next.js", "TypeScript", "Tailwind", "Prisma"],
      live: "https://mktechy.netlify.app/",
      github: "",
      status: "",
    },
  ];

  return (
    <section id="projects" className="py-20 px-6 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-4 text-center"
        >
          Featured Projects
        </motion.h2>
        <p className="text-center text-gray-400 mb-12 text-lg">
          Some of the projects I&apos;ve worked on recently
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -12, transition: { duration: 0.4 } }}
              className="glass border border-white/10 rounded-3xl overflow-hidden group"
            >
              {/* Project Image / Placeholder */}
              <div className="h-64 bg-gradient-to-br from-teal-500/20 via-purple-500/10 to-[#050505] flex items-center justify-center relative">
                <div className="text-6xl opacity-40 group-hover:opacity-60 transition-opacity">
                  {project.image !== "" ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : project.title.includes("Learnpally") ? (
                    "📚"
                  ) : project.title.includes("Rent") ? (
                    "🏠"
                  ) : (
                    "🚀"
                  )}
                </div>
                {project.status && (
                  <div className="absolute top-4 right-4 bg-teal-500 text-black text-xs font-semibold px-3 py-1 rounded-full">
                    {project.status}
                  </div>
                )}
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs bg-white/5 px-4 py-1.5 rounded-full text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button asChild variant="default" className="flex-1">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="flex-1">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Code
                      <FaGithub className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
