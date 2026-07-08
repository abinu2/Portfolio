export interface FeaturedProject {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo?: string;
  prize?: string;
}

export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  fork: boolean;
  archived: boolean;
  pushed_at: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string[];
  tags: string[];
}

/** Payload accepted by POST /api/contact. */
export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

/** Response envelope for /api/contact. */
export interface ContactApiResponse {
  success: boolean;
  error?: string;
}
