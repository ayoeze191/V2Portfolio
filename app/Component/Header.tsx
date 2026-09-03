"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  gsap,
  useGSAP,
  ScrollTrigger,
  EASE_EXPO,
  prefersReducedMotion,
} from "@/app/lib/gsap";
import ThemeToggle from "./home/ThemeToggle";

const NAV = [
  { id: "#about", index: "01", label: "About" },
  { id: "#experience", index: "02", label: "Experience" },
  { id: "#work", index: "03", label: "Work" },
  { id: "#stack", index: "04", label: "Stack" },
  { id: "#contact", index: "05", label: "Contact" },
];

function useLagosTime() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Africa/Lagos",
        }).format(new Date()),
      );

    tick();
    const id = setInterval(tick, 1000 * 30);
    return () => clearInterval(id);
  }, []);

  return time;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const time = useLagosTime();

  const isHome = usePathname() === "/";
  const sectionHref = (hash: string) => (isHome ? hash : `/${hash}`);

  useGSAP(() => {
    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    // Solid rather than backdrop-filter: a blurred fixed bar forces a full
    // repaint on every scroll frame, which is the main source of scroll jank.
    // The colour is a class, not a tween — GSAP can't interpolate var(), and
    // the bar has to answer to whichever theme is live.
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top+=80 top",
      onToggle: (self) =>
        navRef.current?.classList.toggle("nav-solid", self.isActive),
    });
  }, []);

  useGSAP(
    () => {
      const bars = burgerRef.current?.querySelectorAll<HTMLElement>("[data-bar]");
      if (!bars?.length) return;

      const [top, bottom] = Array.from(bars);
      const duration = prefersReducedMotion() ? 0 : 0.5;

      gsap.to(top, {
        y: open ? 4 : 0,
        rotate: open ? 45 : 0,
        duration,
        ease: EASE_EXPO,
      });
      gsap.to(bottom, {
        y: open ? -4 : 0,
        rotate: open ? -45 : 0,
        duration,
        ease: EASE_EXPO,
      });
    },
    { dependencies: [open], scope: burgerRef },
  );

  useGSAP(
    () => {
      const menu = menuRef.current;
      if (!menu) return;

      if (open) {
        gsap.set(menu, { display: "flex" });
        gsap
          .timeline()
          .fromTo(
            menu,
            { clipPath: "inset(0 0 100% 0)" },
            { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: EASE_EXPO },
          )
          .from(
            menu.querySelectorAll("[data-menu-item]"),
            { yPercent: 120, opacity: 0, duration: 0.6, stagger: 0.06, ease: EASE_EXPO },
            "-=0.35",
          );
      } else {
        gsap.to(menu, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.45,
          ease: "power3.inOut",
          onComplete: () => gsap.set(menu, { display: "none" }),
        });
      }
    },
    { dependencies: [open], scope: menuRef },
  );

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <>
      <nav ref={navRef} className="site-nav fixed top-0 inset-x-0 z-50">
        <div className="shell flex items-center justify-between py-4">
          <a href={sectionHref("#hero")} className="flex items-baseline gap-2 group">
            <span className="font-[family-name:var(--font-display)] text-base font-bold tracking-tight uppercase">
              Ezekiel Olabode
            </span>
            <span className="mono-accent hidden sm:inline">
              [Product Engineer]
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={sectionHref(item.id)}
                className="group flex items-baseline gap-1.5 mono hover:text-[var(--fg)] transition-colors"
              >
                <span className="text-[var(--accent)] opacity-60 group-hover:opacity-100 transition-opacity">
                  {item.index}
                </span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="mono hidden 2xl:inline tabular-nums">
              Lagos {time} WAT
            </span>
            <a
              href="/eazycv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow hidden sm:inline-flex"
            >
              Resume <span className="arrow">↗</span>
            </a>
            <ThemeToggle />

            <button
              ref={burgerRef}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="group lg:hidden grid place-items-center w-11 h-11 rounded-full bg-[var(--surface-2)] hover:bg-[var(--surface-3)] transition-colors z-50 relative"
            >
              <span className="flex flex-col items-center gap-[6px]">
                <span
                  data-bar
                  className="block h-[2px] w-[22px] rounded-full bg-[var(--fg)] group-hover:bg-[var(--accent)] transition-colors"
                />
                <span
                  data-bar
                  className="block h-[2px] w-[22px] rounded-full bg-[var(--fg)] group-hover:bg-[var(--accent)] transition-colors"
                />
              </span>
            </button>
          </div>
        </div>

        <div
          ref={progressRef}
          className="h-[2px] bg-[linear-gradient(90deg,var(--accent-deep),var(--accent))] origin-left rounded-full"
          style={{ transform: "scaleX(0)" }}
        />
      </nav>

      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-[var(--bg)] flex-col justify-center px-[var(--gutter)] lg:hidden"
        style={{ display: "none", clipPath: "inset(0 0 100% 0)" }}
      >
        <div className="flex flex-col gap-2">
          {NAV.map((item) => (
            <div key={item.id} className="overflow-hidden">
              <a
                data-menu-item
                href={sectionHref(item.id)}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 py-1.5 group"
              >
                <span className="mono-accent">{item.index}</span>
                <span className="display-md group-hover:text-[var(--accent)] transition-colors">
                  {item.label}
                </span>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3">
          <a
            data-menu-item
            href="/eazycv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="link-arrow self-start"
          >
            Resume <span className="arrow">↗</span>
          </a>
          <span data-menu-item className="mono">
            Lagos, Nigeria · {time} WAT
          </span>
        </div>
      </div>
    </>
  );
}
