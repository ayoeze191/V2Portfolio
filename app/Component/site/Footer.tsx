import { SOCIALS } from "@/app/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)]">
      <div className="wrap py-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <span className="kicker">© {new Date().getFullYear()} Ezekiel Olabode · Lagos</span>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              {s.label}
            </a>
          ))}
          <a href="#top" className="nav-link">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
