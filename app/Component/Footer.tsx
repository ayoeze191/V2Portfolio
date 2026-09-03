export default function Footer({ className = "" }: { className?: string }) {
  return (
    <footer
      className={`panel flex flex-wrap items-center justify-between gap-4 ${className}`}
    >
      <span className="mono">© {new Date().getFullYear()} Ezekiel Olabode</span>
      <span className="mono">Next.js · NodeJs · POSTGEsql</span>
      <a
        href="#top"
        className="mono hover:text-[var(--accent)] transition-colors"
      >
        Back to top ↑
      </a>
    </footer>
  );
}
