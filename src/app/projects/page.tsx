import { getAllProjects, getAllTags } from "@/lib/content";
import TagFilter from "./TagFilter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Merek Soriano: routing optimization, AI agent governance, matching algorithms, and AI outreach tooling.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const tags = getAllTags();

  return (
    <div className="relative isolate">
      <div className="dot-grid absolute inset-x-0 top-0 -z-10 h-80" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:px-10">
        <div className="animate-fade-up">
          <p className="section-index">
            <b>{String(projects.length).padStart(2, "0")}</b> / Index
          </p>
          <h1 className="mt-3 font-display text-5xl font-normal tracking-tight text-ink sm:text-6xl">
            Projects
          </h1>
          <p className="mt-4 max-w-xl text-ink-muted">
            Optimization, AI systems, and tools built for real users, from a field-services
            routing engine to an edge system that governs autonomous agents.
          </p>
        </div>

        <TagFilter tags={tags} projects={projects} />
      </div>
    </div>
  );
}
