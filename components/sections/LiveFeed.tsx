import { Github, RefreshCw } from 'lucide-react';
import ProjectCard from '@/components/ui/ProjectCard';
import SectionHeading from '@/components/ui/SectionHeading';
import { fetchGithubRepos } from '@/lib/github';

/**
 * Server component — fetches directly from the GitHub REST API on the
 * server (ISR-cached for 1hr via lib/github.ts), so the grid reflects
 * whatever's actually pushed to github.com/abinu2 without editing this repo.
 */
export default async function LiveFeed() {
  const repos = await fetchGithubRepos();

  return (
    <section id="live" className="dark-section scanlines border-b-3 border-ink bg-ink px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading number="02" title="Live From GitHub" subtitle="github_api // auto-sync" inverted />

        <p className="mb-10 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-term">
          <RefreshCw size={14} aria-hidden="true" />
          Synced hourly from github.com/abinu2 — {repos.length} active repos
        </p>

        {repos.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
              <ProjectCard key={repo.name} variant="github" project={repo} />
            ))}
          </div>
        ) : (
          <a
            href="https://github.com/abinu2"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border-3 border-term/40 bg-ink px-6 py-4 font-mono text-sm text-term hover:border-term"
          >
            <Github size={16} aria-hidden="true" />
            GitHub API unavailable right now — browse repos directly on github.com/abinu2
          </a>
        )}
      </div>
    </section>
  );
}
