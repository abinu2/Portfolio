import Image from 'next/image';
import { ArrowUpRight, Github } from 'lucide-react';
import type { FeaturedProject } from '@/types';

/* ------------------------------------------------------------------ */
/* Featured card — EXHIBIT: rotating acid palette, brutal frame         */
/* ------------------------------------------------------------------ */

const EXHIBIT_TONES = [
  { text: 'text-ink', overlay: 'bg-acid/90', tag: 'border-ink bg-paper text-ink', shadow: 'shadow-brutal' },
  { text: 'text-ink', overlay: 'bg-term/90', tag: 'border-ink bg-paper text-ink', shadow: 'shadow-brutal' },
  { text: 'text-paper', overlay: 'bg-shock/90', tag: 'border-ink bg-paper text-ink', shadow: 'shadow-brutal' },
  { text: 'text-ink', overlay: 'bg-cyber/90', tag: 'border-ink bg-paper text-ink', shadow: 'shadow-brutal' },
  { text: 'text-paper', overlay: 'bg-violet/90', tag: 'border-ink bg-paper text-ink', shadow: 'shadow-brutal' },
] as const;

/**
 * Zine "exhibit" card for a hand-picked featured project. Backgrounds with
 * a live deployment preview (screenshot or scaled iframe) that clears fully
 * on hover, alongside the copy, to reveal the site underneath.
 */
export default function ProjectCard({
  project,
  index = 0,
}: {
  project: FeaturedProject;
  index?: number;
}) {
  const tone = EXHIBIT_TONES[index % EXHIBIT_TONES.length]!;
  const tilt = index % 2 === 0 ? 'md:-rotate-1' : 'md:rotate-1';
  const hasPreview = Boolean(project.screenshot || project.demo);

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden border-3 border-ink transition-all duration-base ease-standard
                  hover:rotate-0 hover:-translate-y-1 hover:shadow-brutal-lg ${tone.shadow} ${tilt} ${tone.text}`}
    >
      {/* Deployment preview as the card background. Prefer a stored screenshot
          (for sites that block framing), otherwise a scaled live iframe. */}
      {project.screenshot ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden bg-ink" aria-hidden="true">
          <Image
            src={project.screenshot}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-top"
          />
        </div>
      ) : project.demo ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden bg-ink" aria-hidden="true">
          <iframe
            src={project.demo}
            title={`${project.title} live deployment preview`}
            loading="lazy"
            tabIndex={-1}
            sandbox="allow-scripts allow-same-origin"
            className="absolute left-0 top-0 h-[300%] w-[300%] origin-top-left scale-[0.3334] border-0"
          />
        </div>
      ) : null}

      {/* Palette tint for legibility; clears fully on hover to reveal the live deployment. */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-base ease-standard
                    ${hasPreview ? 'group-hover:opacity-0' : ''} ${tone.overlay}`}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative flex h-full flex-col p-6 md:p-8">
        {/* Copy block — fades out on hover so the deployment preview is unobstructed. */}
        <div
          className={`flex flex-1 flex-col transition-opacity duration-base ease-standard
                      ${hasPreview ? 'group-hover:pointer-events-none group-hover:opacity-0' : ''}`}
        >
          {/* Exhibit number */}
          <span className="font-mono text-xs font-bold uppercase tracking-widest opacity-70">
            exhibit_{String(index + 1).padStart(2, '0')}.sol
          </span>

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
        </div>

        {/* Actions — stay visible and clickable even when the copy block above fades out. */}
        <div className="relative mt-6 flex items-center gap-3 border-t-3 border-dashed border-current pt-4">
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
      </div>
    </article>
  );
}
