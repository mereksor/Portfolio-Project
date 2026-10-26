"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "/#now", label: "Now" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
];

interface Indicator {
  left: number;
  width: number;
  opacity: number;
}

// Anchor links like "/#now" never match a pathname, so they stay unhighlighted.
function isActive(pathname: string, href: string): boolean {
  return !href.includes("#") && pathname.startsWith(href);
}

const socials = [
  {
    href: "https://github.com/mereksor",
    label: "GitHub",
    icon: (
      <svg className="h-[17px] w-[17px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
    ),
  },
  {
    href: "https://www.linkedin.com/in/merek-soriano-0ba570291",
    label: "LinkedIn",
    icon: (
      <svg className="h-[17px] w-[17px]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    ),
  },
  {
    href: "mailto:mks258@cornell.edu",
    label: "Email",
    icon: (
      <svg className="h-[17px] w-[17px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
    ),
  },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [indicator, setIndicator] = useState<Indicator>({ left: 0, width: 0, opacity: 0 });
  const [hover, setHover] = useState<Indicator | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  const measure = useCallback((href: string): Indicator | null => {
    const el = linkRefs.current.get(href);
    if (!el || !navRef.current) return null;
    const navRect = navRef.current.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    return { left: elRect.left - navRect.left, width: elRect.width, opacity: 1 };
  }, []);

  const updateIndicator = useCallback(() => {
    const active = navLinks.find((l) => isActive(pathname, l.href));
    const next = active ? measure(active.href) : null;
    setIndicator((prev) => next ?? { ...prev, opacity: 0 });
  }, [pathname, measure]);

  useEffect(() => {
    // Measure after layout settles; a frame callback also keeps setState out of the
    // synchronous effect body.
    const raf = requestAnimationFrame(updateIndicator);
    // Web fonts swap in after first paint and change link widths, so measure again.
    document.fonts?.ready.then(updateIndicator);
    window.addEventListener("resize", updateIndicator);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", updateIndicator);
    };
  }, [updateIndicator]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-10">
        <Link href="/" className="group flex items-baseline gap-3">
          <span className="font-display text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-crimson">
            Merek Soriano
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint sm:inline">
            ORIE / AI
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <div ref={navRef} className="relative" onMouseLeave={() => setHover(null)}>
            <nav className="relative flex items-center">
              {hover && (
                <div
                  className="pointer-events-none absolute inset-y-1 rounded-full bg-bg-muted"
                  style={{
                    left: hover.left,
                    width: hover.width,
                    transition: "all 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />
              )}
              <div
                className="pointer-events-none absolute -bottom-[13px] h-[2px] bg-crimson"
                style={{
                  left: indicator.left,
                  width: indicator.width,
                  opacity: indicator.opacity,
                  transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={(el) => {
                    if (el) linkRefs.current.set(link.href, el);
                  }}
                  onMouseEnter={() => setHover(measure(link.href))}
                  className={`relative z-10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 ${
                    isActive(pathname, link.href) ? "text-ink" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <span className="h-4 w-px bg-border-strong" aria-hidden="true" />
          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-ink-faint transition-colors duration-200 hover:text-ink"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <button
          className="flex flex-col gap-1.5 p-2 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className={`block h-[1.5px] w-5 bg-ink transition-all duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`block h-[1.5px] w-5 bg-ink transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-[1.5px] w-5 bg-ink transition-all duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      <div
        className={`overflow-hidden bg-bg transition-all duration-300 ease-out md:hidden ${
          menuOpen ? "max-h-80 border-t border-border opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 py-5">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-4 py-3 font-mono text-xs uppercase tracking-[0.14em] transition-all duration-200 ${
                  isActive(pathname, link.href)
                    ? "bg-ink text-on-ink"
                    : "text-ink-muted hover:bg-bg-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <hr className="my-4 border-border" />
          <div className="flex items-center gap-5 px-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-ink-faint transition-colors hover:text-ink"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
