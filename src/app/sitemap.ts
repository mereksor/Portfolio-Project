import { getAllProjects, getAllBlogPosts } from "@/lib/content";
import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mereksoriano.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects().map((p) => ({
    url: `${siteUrl}/projects/${p.slug}`,
    lastModified: new Date(p.date),
  }));

  const posts = getAllBlogPosts().map((p) => ({
    url: `${siteUrl}/blog/${p.slug}`,
    lastModified: new Date(p.date),
  }));

  return [
    { url: siteUrl, lastModified: new Date() },
    { url: `${siteUrl}/projects`, lastModified: new Date() },
    { url: `${siteUrl}/blog`, lastModified: new Date() },
    { url: `${siteUrl}/resume`, lastModified: new Date() },
    ...projects,
    ...posts,
  ];
}
