'use client';

import { ExternalLink, Github, Star, Trophy } from 'lucide-react';
import { LANGUAGE_COLORS } from '@/lib/constants';
import { truncate } from '@/lib/utils';
import { colors } from '@/styles/tokens';
import type { FeaturedProject, GitHubRepo } from '@/types';

type ProjectCardProps =
  | { variant: 'featured'; project: FeaturedProject }
  | { variant: 'github'; project: GitHubRepo };

/* ------------------------------------------------------------------ */
/* Featured card — large, gradient background, top accent border        */
/* ------------------------------------------------------------------ */

function FeaturedCard({ project }: { project: FeaturedProject }) {
  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-card border border-edge-subtle
                 border-t-2 border-t-accent bg-gradient-to-br from-bg-secondary to-bg-secondary/40 p-8
                 transition-all duration-base ease-standard hover:border-edge-visible hover:border-t-accent hover:shadow-glow-sm"
    >
      {project.prize && (
        <span
          className="absolute right-4 top-4 flex items-center gap-1.5 rounded-badge border border-accent-secondary/40
                     bg-accent-secondary/10 px-2 py-1 font-mono text-xs text-accent-secondary"
          title={project.prize}
        >
          <Trophy size={12} aria-hidden="true" />
          <span className="hidden sm:inline">{truncate(project.prize, 40)}</span>
          <span className="sr-only">{project.prize}</span>
        </span>
      )}

      <h4 className="pr-8 text-lg font-semibold text-body transition-colors duration-fast group-hover:text-accent sm:pr-32">
        {project.title}
      </h4>

      <p className="mt-3 flex-1 text-sm text-body-secondary">{project.description}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-badge bg-bg/60 px-2 py-0.5 font-mono text-xs text-body-secondary">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} on GitHub`}
          className="rounded-badge p-2 text-body-secondary transition-colors duration-fast hover:bg-accent/10 hover:text-accent"
        >
          <Github size={18} aria-hidden="true" />
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} live demo`}
            className="rounded-badge p-2 text-body-secondary transition-colors duration-fast hover:bg-accent/10 hover:text-accent"
          >
            <ExternalLink size={18} aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* GitHub card — compact, language dot + star count                     */
/* ------------------------------------------------------------------ */

function GitHubCard({ project }: { project: GitHubRepo }) {
  const langColor = project.language
    ? LANGUAGE_COLORS[project.language] ?? colors.text.secondary
    : null;

  return (
    <article
      className="group flex h-full flex-col rounded-card border border-edge-subtle bg-bg-secondary/50 p-6
                 transition-all duration-base ease-standard hover:-translate-y-1 hover:border-edge-visible hover:shadow-glow-sm"
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-mono text-base font-semibold text-body transition-colors duration-fast group-hover:text-accent">
          {project.name}
        </h4>
        <a
          href={project.html_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.name} on GitHub`}
          className="shrink-0 rounded-badge p-1.5 text-body-muted transition-colors duration-fast hover:bg-accent/10 hover:text-accent"
        >
          <ExternalLink size={16} aria-hidden="true" />
        </a>
      </div>

      <p className="mt-2 flex-1 text-sm text-body-secondary">
        {project.description ? truncate(project.description, 100) : 'No description provided.'}
      </p>

      <div className="mt-4 flex items-center gap-4 font-mono text-xs text-body-muted">
        {project.language && langColor && (
          <span className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-pill"
              style={{ backgroundColor: langColor }}
              aria-hidden="true"
            />
            {project.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star size={12} aria-hidden="true" />
          {project.stargazers_count}
        </span>
      </div>
    </article>
  );
}

/**
 * Polymorphic project card: renders the large featured layout or the
 * compact GitHub layout depending on `variant`.
 */
export default function ProjectCard(props: ProjectCardProps) {
  return props.variant === 'featured' ? (
    <FeaturedCard project={props.project} />
  ) : (
    <GitHubCard project={props.project} />
  );
}
