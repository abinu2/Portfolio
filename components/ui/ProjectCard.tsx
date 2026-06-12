import { ArrowUpRight, Github, Star, Trophy } from 'lucide-react';
import Sticker from '@/components/ui/Sticker';
import { truncate } from '@/lib/utils';
import type { FeaturedProject, GitHubRepo } from '@/types';

type ProjectCardProps =
  | { variant: 'featured'; project: FeaturedProject; index?: number }
  | { variant: 'github'; project: GitHubRepo; index?: number };

/* ------------------------------------------------------------------ */
/* Featured card — EXHIBIT: rotating acid palette, brutal frame         */
/* ------------------------------------------------------------------ */

const EXHIBIT_TONES = [
  { card: 'bg-acid text-ink', tag: 'border-ink bg-paper text-ink' },
  { card: 'bg-paper text-ink', tag: 'border-ink bg-acid text-ink' },
  { card: 'bg-shock text-paper', tag: 'border-ink bg-paper text-ink' },
  { card: 'bg-cyber text-ink', tag: 'border-ink bg-paper text-ink' },
  { card: 'bg-violet text-paper', tag: 'border-ink bg-paper text-ink' },
] as const;

function FeaturedCard({ project, index = 0 }: { project: FeaturedProject; index?: number }) {
  const tone = EXHIBIT_TONES[index % EXHIBIT_TONES.length];
  const tilt = index % 2 === 0 ? 'md:-rotate-1' : 'md:rotate-1';

  return (
    <article
      className={`group relative flex h-full flex-col border-3 border-ink p-6 shadow-brutal transition-all duration-base ease-standard
                  hover:rotate-0 hover:-translate-y-1 hover:shadow-brutal-lg md:p-8 ${tone.card} ${tilt}`}
    >
      {/* Exhibit number */}
      <span className="font-mono text-xs font-bold uppercase tracking-widest opacity-70">
        exhibit_{String(index + 1).padStart(2, '0')}.sol
      </span>

      {project.prize && (
        <div className="absolute -top-4 -right-2">
          <Sticker tone="ink" rotate={index % 2 === 0 ? 3 : -3}>
            <span className="flex items-center gap-1.5">
              <Trophy size={12} aria-hidden="true" />
              PRIZE
            </span>
          </Sticker>
        </div>
      )}

      <h4 className="mt-3 font-display text-xl uppercase leading-tight md:text-2xl">{project.title}</h4>

      {project.prize && (
        <p className="mt-2 font-mono text-xs font-bold uppercase tracking-wide opacity-80">
          ★ {project.prize}
        </p>
      )}

      <p className="mt-4 flex-1 text-base">{project.description}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className={`border-2 px-2 py-0.5 font-mono text-xs font-bold uppercase ${tone.tag}`}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3 border-t-3 border-dashed border-ink pt-4">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} on GitHub`}
          className="flex items-center gap-2 border-3 border-ink bg-ink px-3 py-1.5 font-mono text-xs font-bold uppercase text-paper
                     transition-all duration-fast hover:-translate-y-0.5 hover:bg-paper hover:text-ink"
        >
          <Github size={14} aria-hidden="true" />
          Source
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} live demo`}
            className="flex items-center gap-2 border-3 border-ink bg-paper px-3 py-1.5 font-mono text-xs font-bold uppercase text-ink
                       transition-all duration-fast hover:-translate-y-0.5 hover:bg-ink hover:text-paper"
          >
            <ArrowUpRight size={14} aria-hidden="true" />
            Live
          </a>
        )}
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* GitHub card — a row of terminal output                               */
/* ------------------------------------------------------------------ */

function GitHubCard({ project }: { project: GitHubRepo }) {
  return (
    <a
      href={project.html_url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${project.name} on GitHub`}
      className="group flex h-full flex-col border-3 border-term/40 bg-ink p-5 font-mono
                 transition-all duration-fast ease-standard hover:border-term hover:shadow-brutal-term"
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-base font-bold text-term">
          <span className="text-paper-muted">~/</span>
          {project.name}
        </h4>
        <ArrowUpRight
          size={16}
          className="shrink-0 text-paper-muted transition-colors duration-fast group-hover:text-term"
          aria-hidden="true"
        />
      </div>

      <p className="mt-2 flex-1 text-sm text-paper-muted">
        {project.description ? truncate(project.description, 100) : '# no description provided'}
      </p>

      <div className="mt-4 flex items-center gap-4 text-xs font-bold uppercase tracking-wide text-paper-muted">
        {project.language && (
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 border border-term bg-term/40" aria-hidden="true" />
            {project.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star size={12} aria-hidden="true" />
          {project.stargazers_count}
        </span>
      </div>
    </a>
  );
}

/**
 * Polymorphic project card: zine "exhibit" for featured projects,
 * terminal-row card for live GitHub repos.
 */
export default function ProjectCard(props: ProjectCardProps) {
  return props.variant === 'featured' ? (
    <FeaturedCard project={props.project} index={props.index} />
  ) : (
    <GitHubCard project={props.project} />
  );
}
