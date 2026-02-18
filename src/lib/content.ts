import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Project, BlogPost } from "./types";

const contentDir = path.join(process.cwd(), "content");

function readMdxFiles<T>(dir: string): (T & { content: string })[] {
  const fullPath = path.join(contentDir, dir);
  if (!fs.existsSync(fullPath)) return [];

  const files = fs.readdirSync(fullPath).filter((f) => f.endsWith(".mdx"));

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(fullPath, file), "utf-8");
    const { data, content } = matter(raw);
    const slug = file.replace(/\.mdx$/, "");
    return { ...data, slug, content } as unknown as T & { content: string };
  });
}

export function getAllProjects(): Project[] {
  return readMdxFiles<Project>("projects")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getProjectBySlug(slug: string): (Project & { content: string }) | null {
  const projects = readMdxFiles<Project>("projects");
  return projects.find((p) => p.slug === slug) ?? null;
}

export function getFeaturedProjects(): Project[] {
  const all = getAllProjects();
  const featured = all.filter((p) => p.featured);
  return featured.length > 0 ? featured.slice(0, 3) : all.slice(0, 3);
}

export function getAllBlogPosts(): BlogPost[] {
  return readMdxFiles<BlogPost>("blog")
    .filter((p) => !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): (BlogPost & { content: string }) | null {
  const posts = readMdxFiles<BlogPost>("blog");
  const post = posts.find((p) => p.slug === slug);
  if (!post || post.draft) return null;
  return post;
}

export function getAllTags(type: "projects" | "blog"): string[] {
  const items = type === "projects" ? getAllProjects() : getAllBlogPosts();
  const tagSet = new Set<string>();
  items.forEach((item) => item.tags?.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}
