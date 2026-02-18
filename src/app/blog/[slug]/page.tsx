import { notFound } from "next/navigation";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const content = await renderMdx(post.content);

  return (
    <article className="mx-auto max-w-4xl px-6 lg:px-10 py-20">
      <header className="animate-fade-up">
        <time className="font-mono text-sm text-ink-faint">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-tag-border bg-tag-bg px-2 py-0.5 font-mono text-[10px] font-medium text-tag-text"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-6 h-[2px] w-12 bg-crimson animate-width-reveal stagger-2" />
      </header>

      <div className="animate-fade-up stagger-3 prose-editorial mt-12 max-w-none">
        {content}
      </div>
    </article>
  );
}
