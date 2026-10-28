import { getAllProjects, getAllSubProjectParams } from "@/lib/content";
import { siteUrl } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects().map((p) => ({
    url: `${siteUrl}/projects/${p.slug}`,
    lastModified: new Date(p.date),
  }));

  const subPages = getAllSubProjectParams().map(({ slug, sub }) => ({
    url: `${siteUrl}/projects/${slug}/${sub}`,
  }));

  return [
    { url: siteUrl, lastModified: new Date() },
    { url: `${siteUrl}/projects`, lastModified: new Date() },
    { url: `${siteUrl}/resume`, lastModified: new Date() },
    ...projects,
    ...subPages,
  ];
}
