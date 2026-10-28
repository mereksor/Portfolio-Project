"use client";

import { useState } from "react";

interface Tier {
  id: string;
  count: number;
  label: string;
  detail: string;
}

const tiers: Tier[] = [
  {
    id: "all",
    count: 48,
    label: "Use cases scored",
    detail:
      "Every candidate across generation, transmission, and supply chain, scored 1 to 5 on Impact, Effort, Maturity, and Fit.",
  },
  {
    id: "rubric",
    count: 4,
    label: "Scoring dimensions",
    detail:
      "Impact (safety, labor, reliability, data), Effort (implementation difficulty), Maturity (technology readiness), and Fit (match to operations), each on a 1 to 5 scale.",
  },
  {
    id: "tier1",
    count: 6,
    label: "Tier 1 priorities",
    detail:
      "Scored 4.0 or higher overall. Examples: wall-climbing inspection crawlers, quadruped plant-rounds robots, confined-space inspection drones.",
  },
];

export default function RoboticsFunnel() {
  const [active, setActive] = useState<string>("tier1");
  const current = tiers.find((t) => t.id === active) ?? tiers[0];

  return (
    <figure className="not-prose my-8 rounded-lg border border-border bg-bg-elevated p-5 sm:p-8">
      <div className="flex flex-col items-center gap-2" role="tablist" aria-label="Use case funnel">
        {tiers.map((tier, i) => {
          const isActive = tier.id === active;
          return (
            <button
              key={tier.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(tier.id)}
              onMouseEnter={() => setActive(tier.id)}
              onFocus={() => setActive(tier.id)}
              style={{ width: `${100 - i * 26}%` }}
              className={`flex items-baseline justify-between gap-3 rounded-md border px-4 py-3 text-left transition-colors ${
                isActive
                  ? "border-crimson bg-crimson-wash"
                  : "border-border-strong bg-bg hover:border-ink-faint"
              }`}
            >
              <span className="font-display text-2xl text-ink sm:text-3xl">{tier.count}</span>
              <span className="text-right font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted sm:text-[11px]">
                {tier.label}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-5 min-h-[4.5rem] text-sm leading-relaxed text-ink-secondary" aria-live="polite">
        {current.detail}
      </p>
      <figcaption className="font-mono text-[11px] text-ink-faint">
        Hover or tap a tier.
      </figcaption>
    </figure>
  );
}
