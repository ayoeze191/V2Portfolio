"use client";

import { Button } from "@/components/ui/button";
import { Download, Calendar, MapPin, Award } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">About Me</h1>
          <p className="text-xl text-teal-400">
            Software Engineer • Full-Stack Developer
          </p>
        </div>

        {/* Introduction */}
        <div className="prose prose-invert max-w-none mb-16">
          <p className="text-lg leading-relaxed text-gray-300">
            Hello, I&apos;m{" "}
            <span className="text-white font-medium">Ezekiel</span> — a
            passionate Software Engineer with a strong foundation in both web
            and mobile application development.
          </p>
          <p className="text-lg leading-relaxed text-gray-300 mt-6">
            Proficient in building responsive and intuitive user interfaces
            using frameworks like React and React Native, and experienced in
            backend development with Node.js, Express, and Django.
          </p>
          <p className="text-lg leading-relaxed text-gray-300 mt-6">
            I love creating scalable architectures, integrating APIs, and
            ensuring cross-platform compatibility. I&apos;m a collaborative
            problem-solver with a detail-oriented mindset and a drive to deliver
            impactful, high-quality solutions.
          </p>
        </div>

        {/* Quick Facts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="glass border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center">
                <Calendar className="text-teal-400" size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Experience</p>
                <p className="text-2xl font-semibold">3+ Years</p>
              </div>
            </div>
          </div>

          <div className="glass border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center">
                <MapPin className="text-teal-400" size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Location</p>
                <p className="text-2xl font-semibold">Lagos, Nigeria</p>
              </div>
            </div>
          </div>

          <div className="glass border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center">
                <Award className="text-teal-400" size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Open to</p>
                <p className="text-2xl font-semibold">Opportunities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Journey / More About Me */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8">My Journey</h2>
          <div className="space-y-8 text-gray-300 text-[17px] leading-relaxed">
            <p>
              My journey in tech started with a deep curiosity for how things
              work behind the screen. Over the years, I&apos;ve evolved from
              building simple landing pages to developing complete full-stack
              applications that solve real-world problems.
            </p>
            <p>
              I specialize in the React ecosystem (Next.js, React Native) for
              the frontend and Node.js/Django for the backend. I enjoy turning
              complex requirements into clean, maintainable, and performant
              code.
            </p>
            <p>
              When I&apos;m not coding, you&apos;ll find me learning new
              technologies, contributing to open source, or exploring ways to
              make digital experiences more intuitive and delightful.
            </p>
          </div>
        </div>

        {/* Resume Button */}
        <div className="flex justify-center mb-20">
          <a
            href="/Olabode Ayodele CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="bg-teal-600 hover:bg-teal-500 text-lg px-10 py-6"
            >
              <Download className="mr-3" /> Download Full Resume
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
