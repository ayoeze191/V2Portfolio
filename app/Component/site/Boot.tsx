"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const BOOT_EVENT = "cluster:booted";
const DURATION = 1900; // ms before the overlay lifts

/** True once the boot overlay has gone (or was skipped). */
export function isBooted() {
  return typeof document !== "undefined" && document.documentElement.classList.contains("booted");
}

const subscribe = (cb: () => void) => {
  window.addEventListener(BOOT_EVENT, cb);
  return () => window.removeEventListener(BOOT_EVENT, cb);
};
const readyNow = () =>
  isBooted() || document.documentElement.classList.contains("booted-pending");

/** True once the page may play its entrance animations. */
export function useBooted() {
  return useSyncExternalStore(subscribe, readyNow, () => false);
}

const noop = () => () => {};

const LINES: { t: string; cls?: string; at: number }[] = [
  { t: "namespace/portfolio created", at: 260 },
  { t: "configmap/fullstack created", at: 470 },
  { t: "deployment.apps/ezekiel created", at: 680 },
  { t: "service/ezekiel exposed  443/TCP", at: 900 },
  { t: "pod/ezekiel-7d9f4  0/1  ContainerCreating", cls: "warn", at: 1120 },
  { t: "pod/ezekiel-7d9f4  1/1  Running", cls: "ok", at: 1420 },
];

/**
 * One-time "kubectl apply" boot sequence. Pure CSS animation while it
 * plays; removed from the DOM once it lifts, so nothing keeps running.
 * Click or press any key to skip.
 */
export default function Boot() {
  const already = useSyncExternalStore(noop, isBooted, () => false);
  const [gone, setGone] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    if (already) return;
    document.documentElement.style.overflow = "hidden";

    const finish = () => {
      if (done.current) return;
      done.current = true;
      setLeaving(true);
      document.documentElement.style.overflow = "";
      // Let the hero start its entrance as the curtain lifts.
      try {
        sessionStorage.setItem("booted", "1");
      } catch {}
      document.documentElement.classList.add("booted-pending");
      window.dispatchEvent(new Event(BOOT_EVENT));
      window.setTimeout(() => {
        document.documentElement.classList.add("booted");
        setGone(true);
      }, 750);
    };

    const t = window.setTimeout(finish, DURATION);
    const skip = () => finish();
    window.addEventListener("keydown", skip, { once: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", skip);
      document.documentElement.style.overflow = "";
    };
  }, [already]);

  if (already || gone) return null;

  return (
    <div
      className={`boot bp-grid ${leaving ? "leaving" : ""}`}
      onClick={() => {
        window.dispatchEvent(new KeyboardEvent("keydown"));
      }}
      role="presentation"
    >
      <div className="w-[min(560px,88vw)]">
        <div className="pod ticks">
          <div className="pod-bar">
            <span className="flex gap-1.5" aria-hidden>
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--panel-4)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--panel-4)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--panel-4)]" />
            </span>
            <span className="ml-2">ezekiel@lagos-1: ~/portfolio</span>
          </div>
          <div className="term p-5 min-h-[230px]">
            <p className="boot-line" style={{ animationDelay: "40ms" }}>
              <span className="ps">$</span> <span className="k">kubectl</span> apply -f{" "}
              <span className="s">ezekiel.yaml</span>
            </p>
            {LINES.map((l) => (
              <p
                key={l.t}
                className="boot-line flex items-center gap-2"
                style={{ animationDelay: `${l.at}ms` }}
              >
                {l.cls ? <span className={`dot ${l.cls}`} /> : <span className="c">›</span>}
                <span className={l.cls === "ok" ? "text-[var(--fg)]" : undefined}>{l.t}</span>
              </p>
            ))}
          </div>
          <div className="h-[2px] bg-[var(--panel-3)]">
            <div className="boot-bar h-full bg-[var(--accent)]" />
          </div>
        </div>
        <p className="tag mt-4 text-center">Click or press any key to skip</p>
      </div>
    </div>
  );
}
