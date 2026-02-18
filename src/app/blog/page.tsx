import { getAllBlogPosts } from "@/lib/content";
import BlogPostCard from "@/components/BlogPostCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles on operations research, AI/ML, optimization, and data-driven decision-making by Merek Soriano.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-10 py-20">
      <div className="animate-fade-up">
        <p className="section-label">Writing</p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Blog
        </h1>
        <p className="mt-3 max-w-lg text-ink-muted">
          Thoughts on operations research, AI, and building data-driven solutions.
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {posts.map((post, i) => (
            <div key={post.slug} className={`animate-fade-up stagger-${i + 1}`}>
              <BlogPostCard post={post} />
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-ink-faint">
          No posts yet. Check back soon!
        </p>
      )}
    </div>
  );
}
