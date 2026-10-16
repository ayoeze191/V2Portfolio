"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { container, item } from "../Reveal";
import { EMAIL } from "@/app/data/site";
import { projects } from "@/app/data/projects";

const ROOV = projects.find((p) => p.slug === "roov");

/** Companies and products, in the spot Framer uses for customer logos. */
const BUILT_FOR = ["Roov", "Renato", "Learnpally", "RentAnything", "EkoPages", "Debsphere"];

export default function Hero() {
  return (
    <section className="pt-14 md:pt-20">
      <motion.div
        initial="hidden"
        animate="show"
        variants={container(0.07, 0.05)}
        className="wrap"
      >
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <motion.h1 variants={item} className="display max-w-[16ch]">
              Ezekiel builds web and mobile products <em>from schema to screen</em>
            </motion.h1>
            <motion.div variants={item} className="flex flex-wrap gap-2.5 mt-7">
              <Link href="/#work" className="btn btn-primary btn-lg">
                See my work
              </Link>
              <a href={`mailto:${EMAIL}`} className="btn btn-secondary btn-lg">
                Email me
              </a>
            </motion.div>
          </div>

          {ROOV?.live ? (
            <motion.a
              variants={item}
              href={ROOV.live}
              target="_blank"
              rel="noopener noreferrer"
              className="link !text-[0.85rem]"
            >
              <span>New:</span>
              <span className="text-[var(--fg-2)]">Roov on Google Play</span>
              <span className="arrow">→</span>
            </motion.a>
          ) : null}
        </div>

        {ROOV?.screens?.length ? (
          <motion.div variants={item} className="mt-10">
            <Link href="/projects/roov" className="panel panel-link lift block p-2.5 md:p-3">
              <div className="stage aspect-[2/1] flex items-start justify-center gap-[2.5%] px-[4%] pt-[6%]">
                {ROOV.screens.slice(0, 4).map((screen, i) => (
                  <div
                    key={screen.label}
                    className={`phone w-[28%] sm:w-[21%] shrink-0 ${i > 2 ? "hidden sm:block" : ""} ${i % 2 ? "mt-[3%]" : ""}`}
                  >
                    <Image
                      src={screen.src}
                      alt={`Roov — ${screen.label} screen`}
                      sizes="220px"
                      className="w-full h-auto"
                      priority
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-end justify-between gap-4 px-3 pt-5 pb-3">
                <div>
                  <p className="h4">Roov — currently building</p>
                  <p className="small mt-1 max-w-[56ch]">{ROOV.summary}</p>
                </div>
                <span className="link">
                  Read the case study <span className="arrow">→</span>
                </span>
              </div>
            </Link>
          </motion.div>
        ) : null}

        <motion.div
          variants={item}
          className="mt-14 md:mt-20 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
        >
          {BUILT_FOR.map((name) => (
            <span
              key={name}
              className="text-[1.15rem] md:text-[1.35rem] font-semibold tracking-[-0.03em] text-[var(--fg-3)]"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
