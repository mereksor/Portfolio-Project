import { getAllProjects, getAllTags } from "@/lib/content";
import ProjectCard from "@/components/ProjectCard";
import TagFilter from "./TagFilter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Technical projects by Merek Soriano — optimization, machine learning, and data-driven solutions.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const tags = getAllTags("projects");

  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-10 py-20">
      <div className="animate-fade-up">
        <p className="section-label">Archive</p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Projects
        </h1>
        <p className="mt-3 max-w-lg text-ink-muted">
          Technical projects spanning optimization, AI/ML, and operations research. Currently in development.
        </p>
      </div>

      <TagFilter tags={tags} projects={projects} />
    </div>
  );
}
