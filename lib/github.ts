import type { GitHubRepo } from '@/types';

const GITHUB_USERNAME = 'abinu2';

/** Repos to hide from the live grid — profile README + non-portfolio practice repos. */
const EXCLUDED_REPOS = new Set(['abinu2', 'Github-Competency']);

/** Topics that mark a repo as classwork rather than portfolio-worthy work. */
const EXCLUDED_TOPICS = new Set(['coursework']);

/**
 * Pulls the user's public repos straight from the GitHub REST API at
 * request time (cached + revalidated via Next's fetch integration), so the
 * "live" project grid updates itself whenever a new repo is pushed —
 * no manual edits, no separate CMS.
 */
export async function fetchGithubRepos(): Promise<GitHubRepo[]> {
  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };

    // Unauthenticated requests are capped at 60/hr; set GITHUB_TOKEN (no
    // scopes needed, public repos only) to raise that to 5000/hr.
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=100`,
      {
        headers,
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) return [];

    const repos = (await res.json()) as GitHubRepo[];

    return repos
      .filter(
        (repo) =>
          !repo.fork &&
          !repo.archived &&
          !EXCLUDED_REPOS.has(repo.name) &&
          !repo.topics?.some((topic) => EXCLUDED_TOPICS.has(topic)),
      )
      .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
  } catch {
    return [];
  }
}
