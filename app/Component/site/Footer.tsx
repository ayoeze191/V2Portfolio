import { SOCIALS } from "@/app/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)]">
      <div className="wrap-wide py-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <p className="tag flex items-center gap-2.5">
          <span className="dot ok" />
          all systems operational · © {new Date().getFullYear()} Ezekiel Olabode · Lagos
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hud-link">
              {s.label}
            </a>
          ))}
          <a href="#top" className="hud-link">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
