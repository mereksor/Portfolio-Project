"use client";

import { useState } from "react";

interface Weight {
  label: string;
  pct: number;
  detail: string;
}

const weights: Weight[] = [
  { label: "Field of interest", pct: 93, detail: "Ranked field preferences, compared through a hand-curated 30 by 30 field-similarity matrix." },
  { label: "Career interests", pct: 3, detail: "Overlap between mentee and mentor career interests." },
  { label: "Location", pct: 3, detail: "Normalized location match." },
  { label: "Organization", pct: 2, detail: "Shared organizations, normalized against a controlled vocabulary." },
  { label: "College", pct: 1, detail: "Same Cornell college." },
];

export default function CompatibilityWeights() {
  const [active, setActive] = useState(0);
  const current = weights[active];

  return (
    <figure className="not-prose my-8 rounded-lg border border-border bg-bg-elevated p-5 sm:p-8">
      <div className="flex h-12 w-full overflow-hidden rounded-md border border-border-strong" role="tablist" aria-label="Compatibility weights">
        {weights.map((w, i) => (
          <button
            key={w.label}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`${w.label}, ${w.pct}%`}
            onClick={() => setActive(i)}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            style={{ width: `${w.pct}%`, minWidth: 10 }}
            className={`h-full border-r border-bg-elevated transition-colors last:border-r-0 ${
              i === active ? "bg-crimson" : i === 0 ? "bg-ink-secondary" : "bg-ink-faint"
            }`}
          />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {weights.map((w, i) => (
          <button
            key={w.label}
            type="button"
            onClick={() => setActive(i)}
            onMouseEnter={() => setActive(i)}
            className={`rounded-md border px-2 py-1 font-mono text-[10px] transition-colors ${
              i === active ? "border-crimson text-crimson" : "border-border text-ink-muted hover:border-ink-faint"
            }`}
          >
            {w.label} {w.pct}%
          </button>
        ))}
      </div>
      <div className="mt-5 flex items-baseline gap-3" aria-live="polite">
        <span className="font-display text-3xl text-ink">{current.pct}%</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">{current.label}</span>
      </div>
      <p className="mt-2 min-h-[3rem] text-sm leading-relaxed text-ink-secondary">{current.detail}</p>
      <figcaption className="font-mono text-[11px] text-ink-faint">
        Compatibility score weights. Hover or tap a segment or label.
      </figcaption>
    </figure>
  );
}
