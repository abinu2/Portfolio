import type { GitHubRepo } from '@/types';

const GITHUB_USER = 'abinu2';
const GITHUB_API = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`;

/** Raw repo shape from the GitHub REST API (only the fields we touch). */
interface RawGitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  topics?: string[];
  fork: boolean;
}

/**
 * Fetch Allan's public repositories, drop forks, rank by stars
 * (ties broken by most recent update), and return the top 6 trimmed
 * to the fields the frontend needs.
 *
 * The fetch is cached for 1 hour via Next's data cache.
 * Throws on non-200 — the route handler converts that to a structured error.
 */
export async function fetchTopRepos(): Promise<GitHubRepo[]> {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  // Unauthenticated requests work but are rate-limited to 60/hr;
  // set GITHUB_TOKEN to raise the limit to 5000/hr.
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(GITHUB_API, {
    headers,
    next: { revalidate: 3600 }, // cache for 1 hour
  });

  if (!res.ok) {
    throw new Error(`GitHub API responded with ${res.status}`);
  }

  const raw = (await res.json()) as RawGitHubRepo[];

  return raw
    .filter((repo) => !repo.fork)
    .sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    })
    .slice(0, 6)
    .map((repo) => ({
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      stargazers_count: repo.stargazers_count,
      language: repo.language,
      updated_at: repo.updated_at,
      topics: repo.topics ?? [],
    }));
}
