"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP, EASE, prefersReducedMotion } from "@/app/lib/gsap";
import type { Project } from "../data/projects";

export default function WorkList({
  items,
  expandable = false,
}: {
  items: Project[];
  expandable?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  useGSAP(
    () => {
      const preview = previewRef.current;
      if (!preview || expandable || prefersReducedMotion()) return;

      if (!window.matchMedia("(hover: hover)").matches) return;

      const xTo = gsap.quickTo(preview, "x", { duration: 0.55, ease: "power3" });
      const yTo = gsap.quickTo(preview, "y", { duration: 0.55, ease: "power3" });

      const onMove = (e: MouseEvent) => {
        xTo(e.clientX + 28);
        yTo(e.clientY - 100);
      };

      const el = root.current;
      el?.addEventListener("mousemove", onMove);
      return () => el?.removeEventListener("mousemove", onMove);
    },
    { scope: root },
  );

  useGSAP(
    () => {
      const preview = previewRef.current;
      if (!preview || expandable || prefersReducedMotion()) return;

      gsap.to(preview, {
        opacity: active !== null && items[active]?.image ? 1 : 0,
        scale: active !== null ? 1 : 0.92,
        duration: 0.45,
        ease: EASE,
      });
    },
    { dependencies: [active] },
  );

  useGSAP(
    () => {
      gsap.set("[data-work-row]", { opacity: 1 });
      if (prefersReducedMotion()) return;

      gsap.from("[data-work-row]", {
        opacity: 0,
        y: 44,
        duration: 0.85,
        ease: EASE,
        stagger: 0.07,
        scrollTrigger: {
          trigger: "[data-work-list]",
          start: "top 82%",
          once: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <div data-work-list className="flex flex-col gap-2">
        {items.map((item, i) => (
          <Row
            key={item.slug}
            item={item}
            index={i}
            expandable={expandable}
            isOpen={open === i}
            onToggle={() => setOpen((cur) => (cur === i ? null : i))}
            onEnter={() => setActive(i)}
            onLeave={() => setActive(null)}
          />
        ))}
      </div>

      {!expandable && (
        <div
          ref={previewRef}
          className="row-preview hidden md:block"
          aria-hidden="true"
        >
          {items.map((item, i) =>
            item.image ? (
              <Image
                key={item.slug}
                src={item.image}
                alt=""
                fill
                sizes="300px"
                className="object-cover transition-opacity duration-300"
                style={{ opacity: active === i ? 1 : 0 }}
              />
            ) : null,
          )}
        </div>
      )}
    </div>
  );
}

function Row({
  item,
  index,
  expandable,
  isOpen,
  onToggle,
  onEnter,
  onLeave,
}: {
  item: Project;
  index: number;
  expandable: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;

      if (prefersReducedMotion()) {
        gsap.set(panel, { height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 });
        return;
      }

      gsap.to(panel, {
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
        duration: 0.55,
        ease: EASE,
      });
    },
    { dependencies: [isOpen], scope: rowRef },
  );

  const summary = (
    <div className="grid grid-cols-12 gap-4 items-baseline">
      <span className="row-index col-span-2 md:col-span-1">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="col-span-10 md:col-span-4 row-title">
        <h3 className="text-xl md:text-3xl font-semibold tracking-tight">
          {item.title}
        </h3>
        <p className="mono mt-1">{item.role}</p>
      </div>

      <p className="col-span-12 md:col-span-4 text-sm leading-relaxed mt-3 md:mt-0">
        {item.summary}
      </p>

      <div className="col-span-8 md:col-span-2 flex flex-wrap gap-1.5 mt-3 md:mt-0">
        {item.tech.slice(0, 3).map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>

      <span className="mono col-span-4 md:col-span-1 text-right mt-3 md:mt-0 tabular-nums">
        {expandable ? (isOpen ? "−" : "+") : item.live ? "↗" : ""} {item.year}
      </span>

      {!expandable && item.image && (
        <div className="col-span-12 mt-4 md:hidden media aspect-[3/2]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}
    </div>
  );

  return (
    <div
      ref={rowRef}
      data-work-row
      className="row"
      style={{ opacity: 0 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {expandable ? (
        <>
          <button
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls={`work-panel-${item.slug}`}
            className="w-full text-left"
          >
            {summary}
          </button>

          <div
            ref={panelRef}
            id={`work-panel-${item.slug}`}
            className="overflow-hidden"
            style={{ height: 0, opacity: 0 }}
          >
            <ProjectDetail item={item} />
          </div>
        </>
      ) : item.live ? (
        <a
          href={item.live}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {summary}
        </a>
      ) : (
        summary
      )}
    </div>
  );
}

function ProjectDetail({ item }: { item: Project }) {
  const { detail } = item;

  return (
    <div className="grid lg:grid-cols-12 gap-x-10 gap-y-8 pt-9 pb-2">
      {item.image && (
        <div className="lg:col-span-5 media aspect-[3/2]">
          <Image
            src={item.image}
            alt={`${item.title} screenshot`}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      )}

      <div
        className={`space-y-7 ${item.image ? "lg:col-span-7" : "lg:col-span-9"}`}
      >
        {detail?.body && (
          <p className="text-[15px] leading-relaxed">{detail.body}</p>
        )}

        {detail?.features && (
          <div>
            <p className="mono mb-3">What it does</p>
            <ul className="space-y-1.5">
              {detail.features.map((f) => (
                <li
                  key={f}
                  className="text-sm leading-relaxed text-[var(--fg-muted)] flex gap-3"
                >
                  <span className="text-[var(--accent)] shrink-0">—</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
          {detail?.challenges && (
            <div>
              <p className="mono mb-2">The hard part</p>
              <p className="text-sm leading-relaxed">{detail.challenges}</p>
            </div>
          )}
          {detail?.learnings && (
            <div>
              <p className="mono mb-2">What it taught me</p>
              <p className="text-sm leading-relaxed">{detail.learnings}</p>
            </div>
          )}
        </div>

        <div>
          <p className="mono mb-3">Built with</p>
          <div className="flex flex-wrap gap-1.5">
            {item.tech.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-3 pt-1">
          <Link href={`/projects/${item.slug}`} className="link-arrow">
            Read case study <span className="arrow">→</span>
          </Link>
        </div>

        {(item.live || item.github) && (
          <div className="flex flex-wrap gap-x-8 gap-y-3 pt-1">
            {item.live && (
              <a
                href={item.live}
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow"
              >
                Visit site <span className="arrow">↗</span>
              </a>
            )}
            {item.github && (
              <a
                href={item.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow"
              >
                Source <span className="arrow">↗</span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
