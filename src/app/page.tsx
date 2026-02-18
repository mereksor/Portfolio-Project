import Link from "next/link";
import { getFeaturedProjects, getAllBlogPosts } from "@/lib/content";
import ProjectCard from "@/components/ProjectCard";
import BlogPostCard from "@/components/BlogPostCard";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const recentPosts = getAllBlogPosts().slice(0, 2);

  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-10">
      {/* Hero */}
      <section className="pb-24 pt-24 sm:pt-32">
        <div className="animate-fade-up">
          <div className="flex items-center gap-3">
            <span className="pulse-dot" />
            <p className="section-label">Available for opportunities</p>
          </div>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.1] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Merek Soriano
          </h1>
        </div>
        <div className="animate-fade-up stagger-2 mt-6 max-w-2xl">
          <p className="text-xl leading-relaxed text-ink-muted">
            Operations Research &amp; Information Engineering student at{" "}
            <span className="font-medium text-ink">Cornell University</span>.
            Building data-driven solutions at the intersection of{" "}
            <span className="font-medium text-ink">optimization</span>,{" "}
            <span className="font-medium text-ink">analytics</span>, and{" "}
            <span className="font-medium text-ink">AI</span> &mdash; from
            construction delay consulting to warehouse logistics to generative
            AI partnerships.
          </p>
        </div>
        <div className="animate-fade-up stagger-3 mt-4">
          <div className="h-[2px] w-20 bg-crimson animate-width-reveal stagger-4" />
        </div>
        <div className="animate-fade-up stagger-4 mt-10 flex items-center gap-5">
          <MagneticButton href="/projects" className="cursor-pointer">
            <span className="inline-flex items-center gap-2.5 bg-ink px-7 py-3.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-crimson">
              View Projects
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </MagneticButton>
          <Link
            href="/resume"
            className="link-underline text-sm font-medium text-ink-muted transition-colors hover:text-ink"
          >
            Resume
          </Link>
        </div>
      </section>

      <hr className="border-border" />

      {/* Featured Projects */}
      <section className="py-24">
        <ScrollReveal>
          <div className="flex items-baseline justify-between">
            <div>
              <p className="section-label">Selected Work</p>
              <h2 className="section-title-hover mt-2 pl-5 font-display text-3xl font-bold text-ink">
                Projects
              </h2>
            </div>
            {featuredProjects.length > 0 && (
              <Link
                href="/projects"
                className="link-underline text-sm font-medium text-ink-faint transition-colors hover:text-ink"
              >
                View all
              </Link>
            )}
          </div>
        </ScrollReveal>
        {featuredProjects.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, i) => (
              <ScrollReveal key={project.slug} delay={i + 1}>
                <ProjectCard project={project} />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <ScrollReveal delay={1}>
            <div className="mt-10 rounded-lg border border-dashed border-border-strong bg-bg-elevated p-12 text-center">
              <p className="font-mono text-sm text-ink-faint">Projects coming soon.</p>
              <p className="mt-2 text-sm text-ink-muted">
                Currently building out technical projects in optimization, AI/ML, and data analytics.
              </p>
            </div>
          </ScrollReveal>
        )}
      </section>

      <hr className="border-border" />

      {/* Recent Blog Posts */}
      {recentPosts.length > 0 && (
        <section className="py-24">
          <ScrollReveal>
            <div className="flex items-baseline justify-between">
              <div>
                <p className="section-label">Writing</p>
                <h2 className="section-title-hover mt-2 pl-5 font-display text-3xl font-bold text-ink">
                  Recent Posts
                </h2>
              </div>
              <Link
                href="/blog"
                className="link-underline text-sm font-medium text-ink-faint transition-colors hover:text-ink"
              >
                View all
              </Link>
            </div>
          </ScrollReveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {recentPosts.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i + 1}>
                <BlogPostCard post={post} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
