import type { OtherBuild } from '@/types';

/**
 * Smaller/secondary projects, hand-written (not pulled from raw GitHub repo
 * descriptions) so the copy stays as sharp as Featured Work. lib/github.ts
 * matches each entry to its live repo by name to attach real star counts.
 */
export const otherBuilds: OtherBuild[] = [
  {
    repo: 'Portfolio',
    title: 'This Portfolio',
    description:
      'The site you’re on. Next.js 14, Tailwind, and a hand-built neo-brutalist design system, with a live GitHub-synced stats panel below.',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
  },
  {
    repo: 'BTAV-Smart-Home-Website',
    title: 'BTAV Smart Home',
    description:
      'Marketing and lead-gen site for a Control4 authorized smart-home dealer, built and shipped for a small business client.',
    tags: ['Web', 'Client Work'],
  },
  {
    repo: 'Orthodox-Sunday-School',
    title: 'Sunday School Curriculum Tool',
    description:
      'Curriculum and lesson-planning tool for a K-12 program serving 50+ students, replacing a stack of shared spreadsheets.',
    tags: ['Tooling'],
  },
];
