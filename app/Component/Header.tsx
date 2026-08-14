"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger, EASE_EXPO } from "@/app/lib/gsap";

const NAV = [
  { id: "#about", index: "01", label: "About" },
  { id: "#experience", index: "02", label: "Experience" },
  { id: "#work", index: "03", label: "Work" },
  { id: "#stack", index: "04", label: "Stack" },
  { id: "#words", index: "05", label: "Words" },
  { id: "#contact", index: "06", label: "Contact" },
];

/** Live Lagos time — the "location + timezone" cue from dorisfaki.tech. */
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
  const time = useLagosTime();

  /* Scroll progress rail + backdrop that only appears once you leave the hero. */
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

    gsap.to(navRef.current, {
      backgroundColor: "rgba(8, 9, 10, 0.82)",
      backdropFilter: "blur(14px)",
      borderBottomColor: "rgba(255,255,255,0.11)",
      duration: 0.4,
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top+=80 top",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  /* Fullscreen mobile menu: panel wipes down, links stagger up behind it. */
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

  // Lock body scroll while the overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Anchor navigation changes the document position; keep triggers in sync.
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 inset-x-0 z-50 border-b border-transparent"
        style={{ backgroundColor: "rgba(8,9,10,0)" }}
      >
        <div className="shell flex items-center justify-between py-4">
          <a href="#hero" className="flex items-baseline gap-2 group">
            <span className="font-[family-name:var(--font-display)] text-base font-bold tracking-tight uppercase">
              Ezekiel Olabode
            </span>
            <span className="mono-accent hidden sm:inline">
              [Software Engineer]
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={item.id}
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
            <span className="mono hidden md:inline tabular-nums">
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

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="lg:hidden mono text-[var(--fg)] px-2 py-1 border border-[var(--line)] z-50 relative"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {/* Scroll progress rail */}
        <div
          ref={progressRef}
          className="h-px bg-[var(--accent)] origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </nav>

      {/* Fullscreen mobile overlay */}
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
                href={item.id}
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
