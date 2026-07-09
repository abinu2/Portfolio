import { otherBuilds } from '@/data/other-builds';
import type { GithubStats, GitHubRepo, ResolvedOtherBuild } from '@/types';

const GITHUB_USERNAME = 'abinu2';

/** Repos to hide everywhere — profile README + non-portfolio practice repos. */
const EXCLUDED_REPOS = new Set(['abinu2', 'Github-Competency']);

/** Topics that mark a repo as classwork rather than portfolio-worthy work. */
const EXCLUDED_TOPICS = new Set(['coursework']);

function githubHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  // Unauthenticated requests are capped at 60/hr; set GITHUB_TOKEN (no
  // scopes needed, public repos only) to raise that to 5000/hr.
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

/**
 * Pulls the user's public repos straight from the GitHub REST API at
 * request time (cached + revalidated via Next's fetch integration). Backs
 * both the live stats panel and the "Other Builds" lookup below, so the
 * whole section updates itself whenever a repo is pushed, starred, or
 * created — no manual edits, no separate CMS.
 */
export async function fetchGithubRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=100`,
      { headers: githubHeaders(), next: { revalidate: 3600 } },
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

/** Aggregate repo count, stars, and language spread — no extra API calls, just math. */
export function computeGithubStats(repos: GitHubRepo[], pushesLast90Days: number): GithubStats {
  const languageCounts = new Map<string, number>();
  for (const repo of repos) {
    if (!repo.language) continue;
    languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
  }

  const topLanguages = [...languageCounts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    publicRepos: repos.length,
    totalStars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    topLanguages,
    pushesLast90Days,
    lastPushedAt: repos[0]?.pushed_at ?? null,
  };
}

/**
 * Counts pushes from the public events feed (the last ~90 days GitHub
 * exposes unauthenticated) — a genuinely live "recent momentum" number that
 * a static repo list can't show.
 */
export async function fetchRecentPushCount(): Promise<number> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`,
      { headers: githubHeaders(), next: { revalidate: 3600 } },
    );

    if (!res.ok) return 0;

    const events = (await res.json()) as { type: string }[];
    return events.filter((event) => event.type === 'PushEvent').length;
  } catch {
    return 0;
  }
}

/** Matches each curated Other Build to its live repo data (stars, URL) by name. */
export function resolveOtherBuilds(repos: GitHubRepo[]): ResolvedOtherBuild[] {
  return otherBuilds.map((build) => {
    const repo = repos.find((r) => r.name.toLowerCase() === build.repo.toLowerCase());
    return {
      ...build,
      htmlUrl: repo?.html_url ?? `https://github.com/${GITHUB_USERNAME}/${build.repo}`,
      stars: repo?.stargazers_count ?? null,
    };
  });
}
