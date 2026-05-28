"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState, useEffect } from "react";
import ScrollProgress from "./ScrollProgress";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <ScrollProgress />

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl shadow-lg shadow-black/50 border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tight text-white">
            EazyCode
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-gray-300">
            <a href="#about" className="hover:text-teal-400 transition-colors">
              About
            </a>
            <a
              href="#projects"
              className="hover:text-teal-400 transition-colors"
            >
              Projects
            </a>
            <a
              href="#experience"
              className="hover:text-teal-400 transition-colors"
            >
              Experience
            </a>
            <a href="#tech" className="hover:text-teal-400 transition-colors">
              Tech Stack
            </a>
            <a
              href="#contact"
              className="hover:text-teal-400 transition-colors"
            >
              Contact
            </a>
          </div>

          <a
            href="/Olabode Ayodele CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block"
          >
            <Button className="bg-teal-600 hover:bg-teal-500 text-white">
              <Download className="mr-2 h-4 w-4" /> Resume
            </Button>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white text-2xl"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-[#111111] border-t border-white/10 py-6">
            <div className="flex flex-col items-center gap-6 text-lg text-gray-300">
              <a href="#about" onClick={() => setIsOpen(false)}>
                About
              </a>
              <a href="#projects" onClick={() => setIsOpen(false)}>
                Projects
              </a>
              <a href="#experience" onClick={() => setIsOpen(false)}>
                Experience
              </a>
              <a href="#tech" onClick={() => setIsOpen(false)}>
                Tech Stack
              </a>
              <a href="#contact" onClick={() => setIsOpen(false)}>
                Contact
              </a>
              <a
                href="/Olabode Ayodele CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-teal-600">Download Resume</Button>
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
