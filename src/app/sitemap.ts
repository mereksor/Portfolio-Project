import { getAllProjects } from "@/lib/content";
import { siteUrl } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects().map((p) => ({
    url: `${siteUrl}/projects/${p.slug}`,
    lastModified: new Date(p.date),
  }));

  return [
    { url: siteUrl, lastModified: new Date() },
    { url: `${siteUrl}/projects`, lastModified: new Date() },
    { url: `${siteUrl}/resume`, lastModified: new Date() },
    ...projects,
  ];
}
