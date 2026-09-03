"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#process", label: "Process" },
  { href: "#stack", label: "Stack" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Passive listener with a cheap boolean flip — no per-frame work.
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50"
      style={{
        // Solid rather than backdrop-filter: blurring a sticky bar forces a
        // full repaint on every scroll frame.
        backgroundColor: "var(--bg)",
        borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
        transition: "border-color .3s var(--ease-out)",
      }}
    >
      <nav className="wrap flex items-center justify-between py-4">
        <a
          href="#top"
          className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight"
        >
          Ezekiel<span className="text-[var(--accent)]">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a href="#contact" className="btn btn-primary hidden sm:inline-flex">
            Let&apos;s talk <span className="arrow">→</span>
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden icon-btn"
          >
            <span className="flex flex-col gap-[5px]">
              <span
                className="block h-[1.5px] w-4 bg-[var(--fg)] transition-transform"
                style={{ transform: open ? "rotate(45deg) translateY(3px)" : "none" }}
              />
              <span
                className="block h-[1.5px] w-4 bg-[var(--fg)] transition-transform"
                style={{ transform: open ? "rotate(-45deg) translateY(-3px)" : "none" }}
              />
            </span>
          </button>
        </div>
      </nav>

      {open ? (
        <div className="md:hidden wrap pb-5 flex flex-col gap-1 border-t border-[var(--border)] pt-4">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2 text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      ) : null}
    </motion.header>
  );
}
