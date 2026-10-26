"use client";

import { useEffect, useState } from "react";

interface RotatingWordProps {
  words: string[];
  intervalMs?: number;
  className?: string;
}

export default function RotatingWord({
  words,
  intervalMs = 2400,
  className = "",
}: RotatingWordProps) {
  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);

  useEffect(() => {
    // Reduced motion keeps the first word fixed instead of cycling.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((i) => {
        setPrevious(i);
        return (i + 1) % words.length;
      });
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [words.length, intervalMs]);

  return (
    <span className={`rotator ${className}`}>
      {words.map((word, i) => (
        <span
          key={word}
          data-active={i === index}
          data-leaving={i === previous && i !== index}
          aria-hidden={i !== index}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
