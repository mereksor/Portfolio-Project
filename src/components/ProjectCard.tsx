import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/types";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="card-hover group block rounded-lg border border-border bg-bg-elevated p-5"
    >
      {project.coverImage && (
        <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-md bg-bg-muted">
          <Image src={project.coverImage} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        </div>
      )}
      <div className="flex items-center gap-2">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-ink-faint">
          {new Date(project.date).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
        </p>
        {project.status === "upcoming" && (
          <span className="inline-block rounded bg-crimson/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-crimson">
            Upcoming
          </span>
        )}
      </div>
      <h3 className="mt-1.5 font-display text-lg font-bold leading-snug text-ink transition-colors group-hover:text-crimson">{project.title}</h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">{project.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span key={tag} className="tag-interactive rounded-md border border-tag-border bg-tag-bg px-2 py-0.5 font-mono text-[10px] font-medium text-tag-text transition-colors duration-300">{tag}</span>
        ))}
      </div>
    </Link>
  );
}
