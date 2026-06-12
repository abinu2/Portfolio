'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Github, Trophy } from 'lucide-react';
import useSWR from 'swr';
import FadeInSection from '@/components/ui/FadeInSection';
import Marquee from '@/components/ui/Marquee';
import ProjectCard from '@/components/ui/ProjectCard';
import ProjectVisual from '@/components/ui/ProjectVisual';
import SectionHeading from '@/components/ui/SectionHeading';
import { FEATURED_PROJECTS } from '@/lib/constants';
import type { GitHubApiResponse } from '@/types';

/* ------------------------------------------------------------------ */
/* Interactive case-file explorer                                       */
/* ------------------------------------------------------------------ */

function CaseFileExplorer() {
  const [selected, setSelected] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const project = FEATURED_PROJECTS[selected];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
      {/* Tab rail — case files */}
      <div
        role="tablist"
        aria-label="Featured projects"
        aria-orientation="vertical"
        className="flex gap-3 overflow-x-auto pb-2 lg:col-span-2 lg:flex-col lg:overflow-visible lg:pb-0"
      >
        {FEATURED_PROJECTS.map((p, i) => {
          const isActive = i === selected;
          return (
            <button
              key={p.title}
              role="tab"
              id={`case-tab-${i}`}
              aria-selected={isActive}
              aria-controls="case-panel"
              onClick={() => setSelected(i)}
              className={`group min-w-[230px] border-3 border-ink p-4 text-left transition-all duration-fast ease-standard lg:min-w-0 ${
                isActive
                  ? 'translate-x-0 bg-acid text-ink shadow-brutal lg:translate-x-2'
                  : 'bg-ink text-paper shadow-none hover:bg-ink-soft hover:shadow-brutal-term'
              }`}
            >
              <span className={`font-mono text-xs font-bold uppercase tracking-widest ${isActive ? 'text-ink' : 'text-term'}`}>
                case_{String(i + 1).padStart(2, '0')}
                {p.prize && ' ★'}
              </span>
              <span className="mt-1 block font-display text-base uppercase leading-tight">
                {p.title}
              </span>
              <span className={`mt-1 block truncate font-mono text-xs ${isActive ? 'text-ink/70' : 'text-paper-muted'}`}>
                {p.tags.slice(0, 3).join(' · ')}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active case panel */}
      <div
        role="tabpanel"
        id="case-panel"
        aria-labelledby={`case-tab-${selected}`}
        className="relative lg:col-span-3"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={project.title}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
            className="border-3 border-ink bg-paper shadow-brutal-shock"
          >
            {/* Schematic — live diagram of how the project works */}
            <div className="relative aspect-[16/10] border-b-3 border-ink bg-paper p-2">
              <ProjectVisual kind={project.visual} />
              <span className="absolute bottom-4 right-4 border-2 border-ink bg-ink px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-term">
                live schematic — drawn in code
              </span>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="max-w-md font-display text-xl uppercase leading-tight text-ink md:text-2xl">
                  {project.title}
                </h3>
                {project.prize && (
                  <span className="flex rotate-2 items-center gap-1.5 border-3 border-ink bg-acid px-3 py-1 font-mono text-xs font-bold uppercase text-ink shadow-brutal-sm">
                    <Trophy size={12} aria-hidden="true" />
                    {project.prize}
                  </span>
                )}
              </div>

              <p className="mt-4 text-base text-ink">{project.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="border-2 border-ink bg-paper-dim px-2 py-0.5 font-mono text-xs font-bold uppercase text-ink">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3 border-t-3 border-dashed border-ink pt-5">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} on GitHub`}
                  className="flex items-center gap-2 border-3 border-ink bg-ink px-4 py-2 font-mono text-xs font-bold uppercase text-paper shadow-brutal-sm
                             transition-all duration-fast hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal"
                >
                  <Github size={14} aria-hidden="true" />
                  Open Source File
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} live demo`}
                    className="flex items-center gap-2 border-3 border-ink bg-shock px-4 py-2 font-mono text-xs font-bold uppercase text-paper shadow-brutal-sm
                               transition-all duration-fast hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal"
                  >
                    <ArrowUpRight size={14} aria-hidden="true" />
                    Live
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Live GitHub feed                                                     */
/* ------------------------------------------------------------------ */

const fetcher = async (url: string): Promise<GitHubApiResponse> => {
  const res = await fetch(url);
  const data = (await res.json()) as GitHubApiResponse;
  if (!res.ok) throw new Error(data.error ?? 'Failed to load repositories');
  return data;
};

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

/* ------------------------------------------------------------------ */

/**
 * THE EXHIBITS — an interactive case-file explorer. Pick a case on the
 * rail; the panel swaps to an animated schematic of how that project
 * actually works, plus the write-up. Live GitHub feed below.
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
            <SectionHeading number="02" title="The Exhibits" subtitle="case_files.dir" inverted />
          </FadeInSection>

          <FadeInSection>
            <p className="mb-8 -mt-8 max-w-xl font-mono text-sm text-paper-muted">
              <span className="font-bold text-term">&gt;</span> select a case file — each schematic is
              a live diagram of the system, drawn and animated in code.
            </p>
          </FadeInSection>

          <FadeInSection>
            <CaseFileExplorer />
          </FadeInSection>

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
