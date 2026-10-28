import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllSubProjectParams,
  getProjectBySlug,
  getSubProject,
  getSubProjects,
} from "@/lib/content";
import { renderMdx } from "@/lib/mdx";
import { projectMdxComponents } from "@/components/mdx/mdxComponents";

interface SubPageParams {
  params: Promise<{ slug: string; sub: string }>;
}

export async function generateStaticParams() {
  return getAllSubProjectParams();
}

export const dynamicParams = false;

export async function generateMetadata({ params }: SubPageParams): Promise<Metadata> {
  const { slug, sub } = await params;
  const page = getSubProject(slug, sub);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    openGraph: { title: page.title, description: page.description, type: "article" },
  };
}

export default async function SubProjectPage({ params }: SubPageParams) {
  const { slug, sub } = await params;
  const parent = getProjectBySlug(slug);
  const page = getSubProject(slug, sub);
  if (!parent || !page) notFound();

  const siblings = getSubProjects(slug);
  const index = siblings.findIndex((s) => s.slug === sub);
  const prev = index > 0 ? siblings[index - 1] : null;
  const next = index < siblings.length - 1 ? siblings[index + 1] : null;

  const content = await renderMdx(page.content, projectMdxComponents(slug));

  return (
    <article className="mx-auto max-w-4xl px-5 py-20 sm:px-6 lg:px-10">
      <Link
        href={`/projects/${slug}`}
        className="animate-fade-up link-underline inline-block font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint transition-colors hover:text-ink"
      >
        &larr; {parent.title}
      </Link>

      <div className="animate-fade-up mt-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-crimson">
          Deep dive {String(page.order).padStart(2, "0")} of {String(siblings.length).padStart(2, "0")}
        </p>
        <h1 className="mt-3 font-display text-4xl font-normal leading-tight tracking-tight text-ink sm:text-5xl">
          {page.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">{page.description}</p>
      </div>

      <div className="prose prose-editorial mt-12 max-w-none">{content}</div>

      <nav className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2" aria-label="Deep dives">
        {prev ? (
          <Link href={`/projects/${slug}/${prev.slug}`} className="card-hover rounded-lg border border-border p-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">&larr; Previous</span>
            <span className="mt-1 block font-display text-lg text-ink">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/projects/${slug}/${next.slug}`}
            className="card-hover rounded-lg border border-border p-4 text-right"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">Next &rarr;</span>
            <span className="mt-1 block font-display text-lg text-ink">{next.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
