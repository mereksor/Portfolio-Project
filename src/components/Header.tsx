"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";

const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [hoverStyle, setHoverStyle] = useState<{ left: number; width: number; opacity: number } | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  // Calculate indicator position for active tab
  const updateIndicator = useCallback(() => {
    const activeLink = navLinks.find((l) => pathname.startsWith(l.href));
    if (activeLink && navRef.current) {
      const el = linkRefs.current.get(activeLink.href);
      if (el) {
        const navRect = navRef.current.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        setIndicatorStyle({
          left: elRect.left - navRect.left,
          width: elRect.width,
          opacity: 1,
        });
      }
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [pathname]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  const handleMouseEnter = (href: string) => {
    const el = linkRefs.current.get(href);
    if (el && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setHoverStyle({
        left: elRect.left - navRect.left,
        width: elRect.width,
        opacity: 1,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoverStyle(null);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        {/* Top row — name and social icons */}
        <div className="flex items-center justify-between pt-5 pb-4">
          <Link href="/" className="group flex items-baseline gap-3">
            <span className="font-display text-2xl font-bold tracking-tight text-ink transition-colors group-hover:text-crimson">
              Merek Soriano
            </span>
            <span className="hidden font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-ink-faint transition-colors group-hover:text-ink-muted sm:inline">
              ORIE &amp; AI
            </span>
          </Link>

          {/* Social icons — desktop */}
          <div className="hidden items-center gap-4 md:flex">
            <a href="https://github.com/mereksor" target="_blank" rel="noopener noreferrer" className="text-ink-faint transition-colors duration-200 hover:text-ink" aria-label="GitHub">
              <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/merek-soriano-0ba570291" target="_blank" rel="noopener noreferrer" className="text-ink-faint transition-colors duration-200 hover:text-ink" aria-label="LinkedIn">
              <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="mailto:mks258@cornell.edu" className="text-ink-faint transition-colors duration-200 hover:text-ink" aria-label="Email">
              <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex flex-col gap-1.5 p-1 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className={`block h-[1.5px] w-5 bg-ink transition-all duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-[1.5px] w-5 bg-ink transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-[1.5px] w-5 bg-ink transition-all duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>

        {/* Navigation tabs — large, interactive, with sliding indicator */}
        <div className="hidden md:block" ref={navRef} onMouseLeave={handleMouseLeave}>
          <nav className="relative flex items-stretch gap-0">
            {/* Hover highlight — background pill that follows cursor */}
            {hoverStyle && (
              <div
                className="pointer-events-none absolute top-0 bottom-0 rounded-lg bg-bg-muted"
                style={{
                  left: hoverStyle.left,
                  width: hoverStyle.width,
                  opacity: hoverStyle.opacity,
                  transition: "all 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
            )}

            {/* Active indicator — crimson bottom bar that slides between tabs */}
            <div
              className="pointer-events-none absolute bottom-0 h-[2.5px] rounded-full bg-crimson"
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
                opacity: indicatorStyle.opacity,
                transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />

            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={(el) => {
                    if (el) linkRefs.current.set(link.href, el);
                  }}
                  onMouseEnter={() => handleMouseEnter(link.href)}
                  className={`relative z-10 px-5 py-3.5 font-body text-sm font-medium tracking-wide transition-colors duration-200 ${
                    isActive ? "text-ink" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile menu — slide down */}
      <div
        className={`overflow-hidden border-t border-border bg-bg transition-all duration-300 ease-out md:hidden ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0 border-t-0"
        }`}
      >
        <div className="px-6 py-5">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  pathname.startsWith(link.href)
                    ? "bg-ink text-white"
                    : "text-ink-muted hover:bg-bg-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <hr className="my-4 border-border" />
          <div className="flex items-center gap-5 px-4">
            <a href="https://github.com/mereksor" target="_blank" rel="noopener noreferrer" className="text-ink-faint transition-colors hover:text-ink" aria-label="GitHub">
              <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/merek-soriano-0ba570291" target="_blank" rel="noopener noreferrer" className="text-ink-faint transition-colors hover:text-ink" aria-label="LinkedIn">
              <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="mailto:mks258@cornell.edu" className="text-ink-faint transition-colors hover:text-ink" aria-label="Email">
              <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
