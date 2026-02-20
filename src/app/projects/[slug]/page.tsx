import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";
import Image from "next/image";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      ...(project.coverImage && { images: [project.coverImage] }),
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const content = await renderMdx(project.content);

  return (
    <article className="mx-auto max-w-4xl px-6 lg:px-10 py-20">
      {project.coverImage && (
        <div className="animate-scale-in relative mb-10 aspect-video overflow-hidden rounded-lg border border-border bg-bg-muted">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="animate-fade-up">
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {project.title}
        </h1>
      </div>

      <div className="animate-fade-up stagger-1 mt-4 flex flex-wrap items-center gap-3">
        <time className="font-mono text-sm text-ink-faint">
          {new Date(project.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          })}
        </time>
        {project.status === "upcoming" && (
          <>
            <span className="text-ink-faint">·</span>
            <span className="inline-block rounded bg-crimson/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-crimson">
              Upcoming
            </span>
          </>
        )}
        {project.status === "in-progress" && (
          <>
            <span className="text-ink-faint">·</span>
            <span className="inline-block rounded bg-crimson/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-crimson">
              In Progress
            </span>
          </>
        )}
        <span className="text-ink-faint">·</span>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-tag-border bg-tag-bg px-2 py-0.5 font-mono text-[10px] font-medium text-tag-text"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {(project.githubUrl || project.liveUrl) && (
        <div className="animate-fade-up stagger-2 mt-5 flex gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-sm font-medium text-crimson"
            >
              View Source &rarr;
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-sm font-medium text-crimson"
            >
              Live Demo &rarr;
            </a>
          )}
        </div>
      )}

      <div className="animate-fade-up stagger-3 prose-editorial mt-12 max-w-none">
        {content}
      </div>
    </article>
  );
}
