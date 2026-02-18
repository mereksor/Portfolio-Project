"use client";

import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/lib/types";

export default function TagFilter({
  tags,
  projects,
}: {
  tags: string[];
  projects: Project[];
}) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? projects.filter((p) => p.tags.includes(activeTag))
    : projects;

  return (
    <>
      {tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2 animate-fade-up stagger-2">
          <button
            onClick={() => setActiveTag(null)}
            className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
              activeTag === null
                ? "bg-ink text-white"
                : "border border-border bg-bg-elevated text-ink-muted hover:border-border-strong hover:text-ink"
            }`}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                activeTag === tag
                  ? "bg-ink text-white"
                  : "border border-border bg-bg-elevated text-ink-muted hover:border-border-strong hover:text-ink"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-ink-faint">
          No projects found for this tag.
        </p>
      )}
    </>
  );
}
