'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ExperienceItem } from '@/types';

/**
 * One entry on the Experience timeline. The node circle sits on the
 * vertical accent line and pulses with a ring animation on hover.
 */
export default function TimelineItem({ role, company, period, description, tags }: ExperienceItem) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      role="listitem"
      className="group relative pb-12 pl-8 last:pb-0"
      initial={false}
      whileHover="hover"
    >
      {/* Node on the timeline */}
      <span className="absolute -left-[5px] top-2 flex h-3 w-3" aria-hidden="true">
        <motion.span
          className="absolute inline-flex h-full w-full rounded-pill bg-accent"
          variants={
            prefersReducedMotion
              ? undefined
              : {
                  hover: {
                    scale: [1, 2.2],
                    opacity: [0.6, 0],
                    transition: { duration: 1, repeat: Infinity, ease: 'easeOut' },
                  },
                }
          }
        />
        <span className="relative inline-flex h-3 w-3 rounded-pill bg-accent transition-shadow duration-fast group-hover:shadow-glow-sm" />
      </span>

      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-lg font-semibold text-body">
          {role}
          <span className="text-accent"> @ </span>
          <span className="text-body-secondary">{company}</span>
        </h3>
        <span className="font-mono text-xs text-body-muted">{period}</span>
      </div>

      <ul className="mt-4 space-y-2">
        {description.map((line, i) => (
          <li key={i} className="flex gap-3 text-sm text-body-secondary">
            <span className="mt-1 text-accent" aria-hidden="true">
              ▹
            </span>
            <span>{line}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-badge border border-edge-visible bg-bg-secondary/50 px-2 py-0.5 font-mono text-xs text-body-secondary"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
