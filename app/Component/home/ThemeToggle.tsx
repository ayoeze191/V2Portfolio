"use client";

import { useEffect } from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

/**
 * Sun/moon switch for `<html data-theme>`.
 *
 * Which icon shows is decided in CSS from the attribute, not from React
 * state — the server has no idea what the visitor prefers, so rendering
 * either icon conditionally would hydrate wrong and flicker.
 */
export default function ThemeToggle() {
  useEffect(() => {
    // While the visitor hasn't picked a side, keep following the OS.
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      try {
        if (localStorage.getItem("theme")) return;
      } catch {
        // Private mode etc. — fall through and follow the OS.
      }
      document.documentElement.dataset.theme = media.matches ? "dark" : "light";
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Choice just won't survive a reload.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="icon-btn theme-toggle"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      <HiOutlineSun className="icon-light" size={17} aria-hidden />
      <HiOutlineMoon className="icon-dark" size={16} aria-hidden />
    </button>
  );
}
