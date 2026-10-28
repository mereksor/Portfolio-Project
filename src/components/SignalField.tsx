"use client";

import { useEffect, useRef } from "react";

interface SignalFieldProps {
  className?: string;
}

const SPACING = 22;

// Reads a CSS custom property so the canvas follows the light and dark tokens
// instead of hardcoding colors that would drift from the stylesheet.
function cssVar(name: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

// A lattice of points displaced by two slow interfering waves, with a pointer
// "probe" that excites nearby points. Sparse accent points read as activations.
export default function SignalField({ className = "" }: SignalFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const schemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = false;
    let visible = true;
    const start = performance.now();
    const pointer = { x: -9999, y: -9999, active: false };

    let inkColor = cssVar("--ink", "#0E0E10");
    let accentColor = cssVar("--crimson", "#C8361D");

    const readColors = () => {
      inkColor = cssVar("--ink", "#0E0E10");
      accentColor = cssVar("--crimson", "#C8361D");
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Deterministic per-point hash so accent points stay put between frames.
    const hash = (i: number, j: number) => {
      const s = Math.sin(i * 127.1 + j * 311.7) * 43758.5453;
      return s - Math.floor(s);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x0 = i * SPACING;
          const y0 = j * SPACING;

          const w1 = Math.sin(x0 * 0.012 + t * 0.6) * Math.cos(y0 * 0.018 - t * 0.4);
          const w2 = Math.sin((x0 + y0) * 0.008 - t * 0.35);
          let energy = (w1 + w2) * 0.5;

          let dx = 0;
          let dy = energy * 4;

          if (pointer.active) {
            const px = x0 - pointer.x;
            const py = y0 - pointer.y;
            const d2 = px * px + py * py;
            const influence = Math.exp(-d2 / 9000);
            energy += influence * 1.4;
            const d = Math.sqrt(d2) || 1;
            dx += (px / d) * influence * 6;
            dy += (py / d) * influence * 6;
          }

          const level = Math.max(0, Math.min(1, (energy + 1) / 2));
          const isAccent = hash(i, j) > 0.985 && level > 0.55;

          ctx.globalAlpha = isAccent ? 0.35 + level * 0.6 : 0.05 + level * 0.28;
          ctx.fillStyle = isAccent ? accentColor : inkColor;
          const r = isAccent ? 1.6 + level * 1.2 : 0.6 + level * 0.9;
          ctx.beginPath();
          ctx.arc(x0 + dx, y0 + dy, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const tick = (now: number) => {
      const t = (now - start) / 1000;
      draw(t);
      raf = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (running || motionQuery.matches || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const renderStatic = () => {
      draw(2.4);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active =
        pointer.x >= 0 && pointer.y >= 0 && pointer.x <= rect.width && pointer.y <= rect.height;
    };

    const onMotionChange = () => {
      if (motionQuery.matches) {
        stopLoop();
        renderStatic();
      } else {
        startLoop();
      }
    };

    const onSchemeChange = () => {
      readColors();
      if (!running) renderStatic();
    };

    const onVisibility = () => (document.hidden ? stopLoop() : startLoop());

    // Pause the loop when the hero scrolls away so the canvas costs nothing off screen.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) startLoop();
      else stopLoop();
    });

    const ro = new ResizeObserver(() => {
      resize();
      if (!running) renderStatic();
    });

    resize();
    renderStatic();
    ro.observe(canvas);
    io.observe(canvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    motionQuery.addEventListener("change", onMotionChange);
    schemeQuery.addEventListener("change", onSchemeChange);
    document.addEventListener("visibilitychange", onVisibility);
    startLoop();

    return () => {
      stopLoop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      motionQuery.removeEventListener("change", onMotionChange);
      schemeQuery.removeEventListener("change", onSchemeChange);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
