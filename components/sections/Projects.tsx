'use client';

import useSWR from 'swr';
import { AlertCircle, Radio } from 'lucide-react';
import FadeInSection from '@/components/ui/FadeInSection';
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

/** Pulsing placeholder card shown while /api/github resolves. */
function SkeletonCard() {
  return (
    <div className="h-44 animate-pulse rounded-card border border-edge-subtle bg-bg-secondary/40 p-6">
      <div className="h-4 w-2/3 rounded-badge bg-edge-visible/60" />
      <div className="mt-4 h-3 w-full rounded-badge bg-edge-visible/40" />
      <div className="mt-2 h-3 w-4/5 rounded-badge bg-edge-visible/40" />
      <div className="mt-6 h-3 w-1/3 rounded-badge bg-edge-visible/40" />
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
      <p className="flex items-center gap-2 rounded-card border border-edge-subtle bg-bg-secondary/30 px-4 py-3 text-sm text-body-secondary">
        <AlertCircle size={16} className="shrink-0 text-body-muted" aria-hidden="true" />
        Could not load repositories right now — browse them directly on{' '}
        <a
          href="https://github.com/abinu2"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline-offset-4 hover:underline"
        >
          GitHub
        </a>
        .
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data.repos.map((repo, i) => (
        <FadeInSection key={repo.name} delay={i * 0.08}>
          <ProjectCard variant="github" project={repo} />
        </FadeInSection>
      ))}
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24 md:px-8">
      <FadeInSection>
        <SectionHeading number="02" title="Projects" />
      </FadeInSection>

      {/* Subsection A — Featured */}
      <FadeInSection>
        <h3 className="mb-8 font-mono text-xl font-semibold text-accent">Featured Work</h3>
      </FadeInSection>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {FEATURED_PROJECTS.map((project, i) => (
          <FadeInSection key={project.title} delay={(i % 2) * 0.1}>
            <ProjectCard variant="featured" project={project} />
          </FadeInSection>
        ))}
      </div>

      {/* Subsection B — Live from GitHub */}
      <FadeInSection>
        <div className="mb-8 mt-24 flex items-center gap-3">
          <h3 className="font-mono text-xl font-semibold text-accent">Open Source</h3>
          <span className="flex items-center gap-1.5 rounded-pill border border-accent-secondary/40 bg-accent-secondary/10 px-3 py-1 font-mono text-xs text-accent-secondary">
            <Radio size={12} className="animate-pulse" aria-hidden="true" />
            Live from GitHub
          </span>
        </div>
      </FadeInSection>

      <OpenSourceGrid />
    </section>
  );
}
