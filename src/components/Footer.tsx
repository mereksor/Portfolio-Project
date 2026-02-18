export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-muted">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-ink-faint">
            &copy; {new Date().getFullYear()} Merek Soriano
          </p>
          <p className="font-mono text-[10px] tracking-[0.1em] text-ink-faint/60">
            Built with Next.js &middot; Deployed on Vercel
          </p>
        </div>
        <div className="flex items-center gap-6">
          <a href="https://github.com/mereksor" target="_blank" rel="noopener noreferrer" className="link-underline font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink-faint transition-colors hover:text-ink">GitHub</a>
          <a href="https://www.linkedin.com/in/merek-soriano-0ba570291" target="_blank" rel="noopener noreferrer" className="link-underline font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink-faint transition-colors hover:text-ink">LinkedIn</a>
          <a href="mailto:mks258@cornell.edu" className="link-underline font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink-faint transition-colors hover:text-ink">Email</a>
        </div>
      </div>
    </footer>
  );
}
