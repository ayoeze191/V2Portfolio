export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="wrap py-8 flex flex-wrap items-center justify-between gap-4">
        <span className="tag">
          © {new Date().getFullYear()} Ezekiel Olabode
        </span>
        <span className="tag">Next.js · Tailwind · Framer Motion</span>
        <a
          href="#top"
          className="tag hover:text-[var(--accent)] transition-colors"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
