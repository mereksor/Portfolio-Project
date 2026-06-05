export interface Project {
  title: string;
  slug: string;
  description: string;
  date: string;
  tags: string[];
  coverImage?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  status?: "upcoming" | "in-progress" | "completed" | "in-design";
}

export interface BlogPost {
  title: string;
  slug: string;
  description: string;
  date: string;
  tags: string[];
  coverImage?: string;
  draft?: boolean;
}
