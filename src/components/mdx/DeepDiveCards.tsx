import Link from "next/link";
import type { SubProject } from "@/lib/types";

interface DeepDiveCardsProps {
  parent: string;
  subs: SubProject[];
}

export default function DeepDiveCards({ parent, subs }: DeepDiveCardsProps) {
  return (
    <div className="not-prose grid gap-4 sm:grid-cols-3">
      {subs.map((sub) => (
        <Link
          key={sub.slug}
          href={`/projects/${parent}/${sub.slug}`}
          className="card-hover group flex flex-col rounded-lg border border-border bg-bg-elevated p-5"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
            {String(sub.order).padStart(2, "0")}
          </span>
          <span className="mt-3 font-display text-xl leading-snug text-ink">{sub.title}</span>
          <span className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{sub.description}</span>
          <span className="mt-4 text-sm font-medium text-crimson">
            Read the deep dive <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
