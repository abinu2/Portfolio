import { ArrowUpRight, GitCommitHorizontal, Github, Star } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { computeGithubStats, fetchGithubRepos, fetchRecentPushCount, resolveOtherBuilds } from '@/lib/github';

/**
 * Server component — fetches directly from the GitHub REST API on the
 * server (ISR-cached for 1hr via lib/github.ts). Two halves:
 *   1. A live stats panel (repos, stars, languages, recent push activity) —
 *      the one thing this section can show that Featured Work can't: proof
 *      of real, ongoing activity, not another project pitch.
 *   2. A short hand-curated list of secondary builds, enriched with live
 *      star counts by matching repo name against the API response.
 */
export default async function LiveFeed() {
  const [repos, pushesLast90Days] = await Promise.all([fetchGithubRepos(), fetchRecentPushCount()]);
  const stats = computeGithubStats(repos, pushesLast90Days);
  const otherBuilds = resolveOtherBuilds(repos);
  const maxLanguageCount = stats.topLanguages[0]?.count ?? 1;

  if (repos.length === 0) {
    return (
      <section id="live" className="dark-section scanlines border-b-3 border-ink bg-ink px-4 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <SectionHeading number="03" title="Live Stats" subtitle="github_api // auto-sync" inverted />
          <a
            href="https://github.com/abinu2"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border-3 border-term/40 bg-ink px-6 py-4 font-mono text-sm text-term hover:border-term"
          >
            <Github size={16} aria-hidden="true" />
            GitHub API unavailable right now — browse the profile directly on github.com/abinu2
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="live" className="dark-section scanlines border-b-3 border-ink bg-ink px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading number="03" title="Live Stats" subtitle="github_api // auto-sync" inverted />

        {/* Stat blocks */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-3 border-term/40 bg-ink p-5 font-mono">
            <p className="font-display text-3xl text-term">{stats.publicRepos}</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-widest text-paper-muted">Public repos</p>
          </div>
          <div className="border-3 border-term/40 bg-ink p-5 font-mono">
            <p className="flex items-center gap-1.5 font-display text-3xl text-term">
              <Star size={22} aria-hidden="true" />
              {stats.totalStars}
            </p>
            <p className="mt-1 text-xs font-bold uppercase tracking-widest text-paper-muted">Stars earned</p>
          </div>
          <div className="border-3 border-term/40 bg-ink p-5 font-mono">
            <p className="flex items-center gap-1.5 font-display text-3xl text-term">
              <GitCommitHorizontal size={22} aria-hidden="true" />
              {stats.pushesLast90Days}
            </p>
            <p className="mt-1 text-xs font-bold uppercase tracking-widest text-paper-muted">Pushes, last 90d</p>
          </div>
          <div className="border-3 border-term/40 bg-ink p-5 font-mono">
            <p className="font-display text-3xl text-term">{stats.topLanguages[0]?.name ?? '—'}</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-widest text-paper-muted">Top language</p>
          </div>
        </div>

        {/* Language breakdown */}
        {stats.topLanguages.length > 0 && (
          <div className="mt-4 border-3 border-term/40 bg-ink p-5 font-mono">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-paper-muted">
              {'// '}Language spread, by repo count
            </p>
            <div className="space-y-3">
              {stats.topLanguages.map((lang) => (
                <div key={lang.name} className="flex items-center gap-3">
                  <span className="w-28 shrink-0 text-xs font-bold uppercase text-paper">{lang.name}</span>
                  <div className="h-3 flex-1 border border-term/40">
                    <div
                      className="h-full bg-term"
                      style={{ width: `${Math.max((lang.count / maxLanguageCount) * 100, 6)}%` }}
                    />
                  </div>
                  <span className="w-6 shrink-0 text-right text-xs text-paper-muted">{lang.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other builds — hand-written descriptions, live star counts */}
        <p className="mb-6 mt-14 font-mono text-xs font-bold uppercase tracking-widest text-term">
          {'// '}Other builds
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {otherBuilds.map((build) => (
            <a
              key={build.repo}
              href={build.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${build.title} on GitHub`}
              className="group flex h-full flex-col border-3 border-term/40 bg-ink p-5 font-mono
                         transition-all duration-fast ease-standard hover:border-term hover:shadow-brutal-term"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-base font-bold text-term">{build.title}</h4>
                <ArrowUpRight
                  size={16}
                  className="shrink-0 text-paper-muted transition-colors duration-fast group-hover:text-term"
                  aria-hidden="true"
                />
              </div>

              <p className="mt-2 flex-1 text-sm text-paper-muted">{build.description}</p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                {build.tags.map((tag) => (
                  <span key={tag} className="border border-term/40 px-1.5 py-0.5 text-xs font-bold uppercase text-paper-muted">
                    {tag}
                  </span>
                ))}
                {build.stars !== null && (
                  <span className="ml-auto flex items-center gap-1 text-xs font-bold uppercase text-paper-muted">
                    <Star size={12} aria-hidden="true" />
                    {build.stars}
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
