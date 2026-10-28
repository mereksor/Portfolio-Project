import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";
import { projectMdxComponents } from "@/components/mdx/mdxComponents";
import Image from "next/image";
import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";
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

  const content = await renderMdx(project.content, projectMdxComponents(slug));

  return (
    <article className="mx-auto max-w-4xl px-5 py-20 sm:px-6 lg:px-10">
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

      <Link
        href="/projects"
        className="animate-fade-up link-underline inline-block font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint transition-colors hover:text-ink"
      >
        &larr; All projects
      </Link>

      <div className="animate-fade-up mt-8">
        <h1 className="font-display text-4xl font-normal leading-tight tracking-tight text-ink sm:text-5xl">
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
        {project.status && (
          <>
            <span className="text-ink-faint">·</span>
            <StatusBadge status={project.status} size="md" />
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

      {(project.githubUrl || project.liveUrl || project.externalUrl) && (
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
          {project.externalUrl && (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-sm font-medium text-crimson"
            >
              {project.externalLabel ?? "Learn More"} &rarr;
            </a>
          )}
        </div>
      )}

      <div className="prose prose-editorial mt-12 max-w-none">
        {content}
      </div>
    </article>
  );
}
