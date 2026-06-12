import { NextResponse } from 'next/server';
import { fetchTopRepos } from '@/lib/github';
import type { GitHubApiResponse } from '@/types';

/**
 * Always serve this route at request time — the underlying GitHub fetch
 * is still cached for 1 hour via `next: { revalidate: 3600 }`, but the
 * route itself must never be frozen into the static build (a build-time
 * network failure would otherwise be served forever).
 */
export const dynamic = 'force-dynamic';

/**
 * GET /api/github
 *
 * Returns the top 6 non-fork repositories for github.com/abinu2,
 * sorted by stars (ties broken by recency). Upstream fetch is cached
 * for 1 hour. On any failure this returns a 500 with an empty `repos`
 * array so the frontend never has to handle an undefined shape.
 */
export async function GET(): Promise<NextResponse<GitHubApiResponse>> {
  try {
    const repos = await fetchTopRepos();
    return NextResponse.json({ repos });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error fetching repositories';
    console.error('[api/github]', message);
    return NextResponse.json(
      { repos: [], error: `Failed to load repositories: ${message}` },
      { status: 500 },
    );
  }
}
