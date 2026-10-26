import Link from "next/link";
import type { Project } from "@/lib/types";
import StatusBadge from "./StatusBadge";

interface ProjectRowProps {
  project: Project;
  index: number;
}

// Index-style row, like a research lab's publication list: number, title, summary, meta.
export default function ProjectRow({ project, index }: ProjectRowProps) {
  const date = new Date(project.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative grid grid-cols-[2.25rem_1fr] gap-x-4 border-t border-border py-8 transition-colors duration-300 hover:bg-bg-elevated/60 sm:grid-cols-[3rem_1fr_auto] sm:gap-x-6 sm:px-3"
    >
      <span className="pt-1.5 font-mono text-xs text-ink-faint transition-colors group-hover:text-crimson">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-display text-2xl font-medium leading-tight tracking-tight text-ink transition-colors duration-300 group-hover:text-crimson sm:text-[1.7rem]">
            {project.title}
          </h3>
          <StatusBadge status={project.status} />
        </div>
        <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[11px] text-ink-faint">
          <span>{date}</span>
          {project.tags.map((tag) => (
            <span key={tag} className="before:mr-3 before:content-['/']">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <span
        className="col-start-2 mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint transition-all duration-300 group-hover:text-ink sm:col-start-3 sm:mt-1.5 sm:self-start"
        aria-hidden="true"
      >
        Read
        <svg
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </span>
    </Link>
  );
}
