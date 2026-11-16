"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, RESUME } from "@/app/data/site";

function lagosTime() {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Lagos",
  }).format(new Date());
}

/**
 * The cluster HUD: context, the section in view, scroll depth and Lagos
 * time. Everything updates from events (scroll, IntersectionObserver, a
 * 30s timer) — no animation loop runs while the page is idle.
 */
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState({ path: "", label: "" });
  const [time, setTime] = useState("");
  const pctRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  // Lagos clock.
  useEffect(() => {
    const tick = () => setTime(lagosTime());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 30_000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  // Scroll depth, written straight to the DOM, at most once per frame.
  useEffect(() => {
    let queued = false;
    const write = () => {
      queued = false;
      const el = pctRef.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.round((window.scrollY / max) * 100) : 0;
      el.textContent = String(Math.min(100, Math.max(0, p))).padStart(3, "0");
    };
    const onScroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(write);
      }
    };
    write();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Which section is in view: any element with data-hud="…".
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-hud]"));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setSeen({ path: pathname, label: e.target.getAttribute("data-hud") ?? "" });
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  // Section in view on this route, else the route itself.
  const section =
    seen.path === pathname && seen.label
      ? seen.label
      : pathname === "/"
        ? "home"
        : pathname.replace(/^\//, "").replace(/\//g, " / ");

  return (
    <header id="top" className="hud">
      <nav className="h-full flex items-stretch">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2.5 pl-[var(--gutter)] pr-5"
          aria-label="Ezekiel Olabode, home"
        >
          <span
            aria-hidden
            className="grid place-items-center w-7 h-7 rounded-[7px] bg-[var(--fg)] text-[var(--bg)] font-[family-name:var(--font-giant)] text-[0.85rem] tracking-wide"
          >
            EO
          </span>
          <span className="hidden sm:inline mono text-[0.72rem] tracking-[0.08em] text-[var(--fg)]">
            ezekiel<span className="text-[var(--fg-3)]">/olabode</span>
          </span>
        </Link>

        <div className="hud-cell hidden lg:flex">
          <span className="dot ok" />
          ctx: lagos-1
        </div>
        <div className="hud-cell hidden md:flex shrink-0 min-w-[14rem]">
          <span className="text-[var(--fg-3)]">ns/portfolio ·</span>
          <span className="text-[var(--fg)]">{section}</span>
        </div>
        <div className="hud-cell hidden 2xl:flex">
          scroll <span ref={pctRef} className="text-[var(--fg)] tabular-nums">000</span>%
        </div>
        <div className="hud-cell hidden xl:flex">
          lagos <span className="text-[var(--fg)] tabular-nums">{time || "--:--"}</span> wat
        </div>

        <div className="ml-auto hidden md:flex items-center gap-5 lg:gap-6 pl-6 pr-[var(--gutter)] border-l border-[var(--line)]">
          {NAV.map((l) => (
            <Link key={l.href} href={l.href} className="hud-link hidden lg:inline">
              {l.label}
            </Link>
          ))}
          <a href={RESUME} target="_blank" rel="noopener noreferrer" className="hud-link hidden 2xl:inline">
            Résumé ↗
          </a>
          <Link href="/#contact" className="btn btn-primary !h-8">
            Get in touch
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden ml-auto mr-[var(--gutter)] self-center btn btn-secondary !h-8"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open ? (
        <div className="md:hidden bg-[var(--bg)] border-b border-[var(--line)] px-[var(--gutter)] pb-5 pt-2">
          {NAV.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 py-3 border-b border-[var(--line)]"
            >
              <span className="tag">{String(i + 1).padStart(2, "0")}</span>
              <span className="giant text-[2.4rem]">{l.label}</span>
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
