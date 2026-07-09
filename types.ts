export interface FeaturedProject {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo?: string;
  prize?: string;
  /**
   * Static screenshot of the deployment, used as the card background when the
   * live site refuses to be iframed (e.g. sends X-Frame-Options: SAMEORIGIN).
   * Takes precedence over the live iframe preview.
   */
  screenshot?: string;
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

/** Hand-written entry for a smaller/secondary project, enriched with live GitHub stats by repo name. */
export interface OtherBuild {
  /** Exact GitHub repo name under the profile, used to match live stats. */
  repo: string;
  title: string;
  description: string;
  tags: string[];
}

/** OtherBuild merged with live data fetched from the GitHub API, if the repo was found. */
export interface ResolvedOtherBuild extends OtherBuild {
  htmlUrl: string;
  stars: number | null;
}

/** Aggregate stats computed from the GitHub API for the live stats panel. */
export interface GithubStats {
  publicRepos: number;
  totalStars: number;
  topLanguages: { name: string; count: number }[];
  pushesLast90Days: number;
  lastPushedAt: string | null;
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
