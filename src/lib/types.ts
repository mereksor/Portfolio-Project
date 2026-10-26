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
  status?: "upcoming" | "in-progress" | "completed" | "in-design";
}
