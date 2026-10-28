import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Project, SubProject } from "./types";

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
    .sort(
      (a, b) =>
        (a.order ?? Infinity) - (b.order ?? Infinity) ||
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function getProjectBySlug(slug: string): (Project & { content: string }) | null {
  const projects = readMdxFiles<Project>("projects");
  return projects.find((p) => p.slug === slug) ?? null;
}

export function getFeaturedProjects(): Project[] {
  const all = getAllProjects();
  const featured = all.filter((p) => p.featured);
  return featured.length > 0 ? featured.slice(0, 4) : all.slice(0, 4);
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  getAllProjects().forEach((item) => item.tags?.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

export function getSubProjects(parent: string): SubProject[] {
  return readMdxFiles<SubProject>(path.join("projects", parent))
    .map((sub) => ({ ...sub, parent }))
    .sort((a, b) => a.order - b.order);
}

export function getSubProject(
  parent: string,
  slug: string
): (SubProject & { content: string }) | null {
  const subs = readMdxFiles<SubProject>(path.join("projects", parent));
  const sub = subs.find((s) => s.slug === slug);
  return sub ? { ...sub, parent } : null;
}

export function getAllSubProjectParams(): { slug: string; sub: string }[] {
  return getAllProjects().flatMap((p) =>
    getSubProjects(p.slug).map((s) => ({ slug: p.slug, sub: s.slug }))
  );
}
