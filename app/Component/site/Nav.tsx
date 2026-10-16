"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV, RESUME } from "@/app/data/site";

/** One top bar for every route. Solid black, no scroll listeners. */
export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header id="top" className="nav">
      <nav className="wrap flex items-center justify-between h-[var(--nav-h)]">
        <div className="flex items-center gap-9">
          <Link
            href="/"
            className="flex items-center gap-2 text-[0.95rem] font-semibold tracking-tight"
            onClick={() => setOpen(false)}
          >
            <span
              aria-hidden
              className="grid place-items-center w-6 h-6 rounded-md bg-[var(--fg)] text-[var(--bg)] text-[0.7rem] font-bold"
            >
              EO
            </span>
            Ezekiel Olabode
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {NAV.map((l) => (
              <Link key={l.href} href={l.href} className="nav-link">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-5">
          <a href={RESUME} target="_blank" rel="noopener noreferrer" className="nav-link">
            Résumé
          </a>
          <Link href="/#contact" className="btn btn-primary !h-8">
            Get in touch
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden btn btn-secondary !h-8"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open ? (
        <div className="md:hidden wrap pb-5 pt-2 border-t border-[var(--line)]">
          {NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-xl font-semibold tracking-tight border-b border-[var(--line)]"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-5">
            <Link href="/#contact" onClick={() => setOpen(false)} className="btn btn-primary">
              Get in touch
            </Link>
            <a href={RESUME} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              Résumé
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
