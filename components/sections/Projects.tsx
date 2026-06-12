'use client';

import useSWR from 'swr';
import FadeInSection from '@/components/ui/FadeInSection';
import Marquee from '@/components/ui/Marquee';
import ProjectCard from '@/components/ui/ProjectCard';
import SectionHeading from '@/components/ui/SectionHeading';
import { FEATURED_PROJECTS } from '@/lib/constants';
import type { GitHubApiResponse } from '@/types';

const fetcher = async (url: string): Promise<GitHubApiResponse> => {
  const res = await fetch(url);
  const data = (await res.json()) as GitHubApiResponse;
  if (!res.ok) throw new Error(data.error ?? 'Failed to load repositories');
  return data;
};

/** Terminal-green skeleton rows while /api/github resolves. */
function SkeletonCard() {
  return (
    <div className="h-40 animate-pulse border-3 border-term/20 bg-ink p-5">
      <div className="h-4 w-2/3 bg-term/20" />
      <div className="mt-4 h-3 w-full bg-term/10" />
      <div className="mt-2 h-3 w-4/5 bg-term/10" />
      <div className="mt-6 h-3 w-1/3 bg-term/10" />
    </div>
  );
}

function OpenSourceGrid() {
  const { data, error, isLoading } = useSWR<GitHubApiResponse>('/api/github', fetcher, {
    revalidateOnFocus: false,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error || !data || data.repos.length === 0) {
    return (
      <p className="border-3 border-danger/60 bg-ink px-4 py-3 font-mono text-sm text-paper-muted">
        <span className="font-bold text-danger">ERR_FETCH_FAILED</span> — could not reach the GitHub
        API. Inspect the source directly at{' '}
        <a
          href="https://github.com/abinu2"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-term underline underline-offset-4"
        >
          github.com/abinu2
        </a>
        .
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data.repos.map((repo, i) => (
        <FadeInSection key={repo.name} delay={Math.min(i * 0.06, 0.3)}>
          <ProjectCard variant="github" project={repo} />
        </FadeInSection>
      ))}
    </div>
  );
}

/**
 * THE EXHIBITS — featured work as loud gallery pieces on the dark
 * (hacker OS) side of the zine, followed by a live terminal-style
 * feed of public repos.
 */
export default function Projects() {
  return (
    <>
      <Marquee
        items={['The Exhibits', 'Solidity', 'Zero Reverts', 'ML Pipelines', 'D3.js', 'Prize Winner']}
        tone="shock"
        reverse
      />

      <section id="projects" className="dark-section scanlines border-b-5 border-ink bg-ink">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <FadeInSection>
            <SectionHeading number="02" title="The Exhibits" subtitle="projects.dir" inverted />
          </FadeInSection>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {FEATURED_PROJECTS.map((project, i) => (
              <FadeInSection key={project.title} delay={(i % 2) * 0.1}>
                <ProjectCard variant="featured" project={project} index={i} />
              </FadeInSection>
            ))}
          </div>

          {/* Live GitHub feed */}
          <FadeInSection>
            <div className="mb-8 mt-28 border-3 border-term/40 bg-ink p-4">
              <p className="font-mono text-sm text-paper-muted">
                <span className="font-bold text-term">allan@asu</span>:~$ curl /api/github{' '}
                <span className="text-paper-muted">| sort --by=stars | head -6</span>
                <span
                  className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-term"
                  aria-hidden="true"
                />
              </p>
              <p className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-shock">
                ● live from github — refreshes hourly
              </p>
            </div>
          </FadeInSection>

          <OpenSourceGrid />
        </div>
      </section>
    </>
  );
}
