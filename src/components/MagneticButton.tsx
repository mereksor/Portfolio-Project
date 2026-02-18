"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  strength?: number;
}

export default function MagneticButton({
  children,
  className = "",
  href,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  };

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={`btn-magnetic inline-block ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </a>
    );
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`btn-magnetic inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
