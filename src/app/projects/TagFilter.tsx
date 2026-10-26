"use client";

import { useState } from "react";
import ProjectRow from "@/components/ProjectRow";
import type { Project } from "@/lib/types";

interface TagFilterProps {
  tags: string[];
  projects: Project[];
}

export default function TagFilter({ tags, projects }: TagFilterProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? projects.filter((p) => p.tags.includes(activeTag))
    : projects;

  const chip = (active: boolean) =>
    `rounded-full px-3.5 py-1.5 font-mono text-[11px] tracking-wide transition-all duration-200 ${
      active
        ? "bg-ink text-on-ink"
        : "border border-border bg-bg-elevated text-ink-muted hover:border-border-strong hover:text-ink"
    }`;

  return (
    <>
      {tags.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2 animate-fade-up stagger-2">
          <button onClick={() => setActiveTag(null)} className={chip(activeTag === null)}>
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={chip(activeTag === tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <div className="mt-12 border-b border-border animate-fade-up stagger-3">
        {filtered.map((project, i) => (
          <ProjectRow key={project.slug} project={project} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-ink-faint">No projects found for this tag.</p>
      )}
    </>
  );
}
