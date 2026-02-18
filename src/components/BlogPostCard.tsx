import Link from "next/link";
import type { BlogPost } from "@/lib/types";

export default function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card-hover group block rounded-lg border border-border bg-bg-elevated p-5"
    >
      <p className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-ink-faint">
        {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
      </p>
      <h3 className="mt-1.5 font-display text-lg font-bold leading-snug text-ink transition-colors group-hover:text-crimson">{post.title}</h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">{post.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <span key={tag} className="tag-interactive rounded-md border border-tag-border bg-tag-bg px-2 py-0.5 font-mono text-[10px] font-medium text-tag-text transition-colors duration-300">{tag}</span>
        ))}
      </div>
    </Link>
  );
}
