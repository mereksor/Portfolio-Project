export interface Project {
  title: string;
  slug: string;
  description: string;
  date: string;
  tags: string[];
  coverImage?: string;
  githubUrl?: string;
  liveUrl?: string;
  // Third-party page about the project (sponsor org, hackathon showcase); label varies per project.
  externalUrl?: string;
  externalLabel?: string;
  featured?: boolean;
  // Display order on home and /projects; lower first. Falls back to date when absent.
  order?: number;
  status?: "upcoming" | "in-progress" | "completed" | "in-design";
}

// Deep-dive page nested under a hub project; lives in content/projects/<parent>/ and is never listed.
export interface SubProject {
  title: string;
  slug: string;
  parent: string;
  description: string;
  order: number;
}
