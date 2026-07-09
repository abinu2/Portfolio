import type { FeaturedProject } from '@/types';

/**
 * Hand-picked exhibits — curated from the GitHub profile README, not the
 * live API, so hackathon wins and demo links stay put even if a repo is
 * archived, renamed, or (like KimuntuX) lives under a teammate's account.
 */
export const featuredProjects: FeaturedProject[] = [
  {
    slug: 'rallypoint',
    title: 'RallyPoint',
    description:
      'Civic engagement platform helping underrepresented demographics discover and act on local campaigns and petitions. Runs a 12-model Prisma schema and a Claude AI moderation pipeline.',
    tags: ['Next.js', 'Prisma', 'Claude API', 'TypeScript'],
    github: 'https://github.com/abinu2/RallyPoint',
    demo: 'https://hackathonrallypoint.vercel.app',
    // Live site blocks framing (X-Frame-Options: SAMEORIGIN) — use a screenshot.
    screenshot: '/previews/rallypoint.png',
  },
  {
    slug: 'kimuntux',
    title: 'KimuntuX',
    description:
      'Multi-tenant SaaS CRM and AI funnel builder for affiliate marketers. Led the blockchain integration module on a team build.',
    tags: ['React 19', 'FastAPI', 'PostgreSQL', 'Gemini + Claude'],
    github: 'https://github.com/aryanyeole/KimuntuX',
    demo: 'https://project-cx19s.vercel.app',
  },
  {
    slug: 'etherfi',
    title: 'Etherfi',
    description:
      'EigenLayer AVS that uses Claude AI to validate staking strategies on-chain, catching risky delegations before they execute.',
    tags: ['Solidity', 'EigenLayer', 'Claude API', 'Hardhat'],
    github: 'https://github.com/abinu2/Etherfi',
    demo: 'https://etherfi-weld.vercel.app',
    prize: 'Claude Builders Club Hackathon Winner',
  },
  {
    slug: 'safeguard',
    title: 'SafeGuard',
    description:
      'AI-powered financial resilience platform for first-time small business owners, with conversational onboarding, a live dashboard, and insurance and compliance tracking.',
    tags: ['React', 'Gemini', 'PostgreSQL', 'Vite'],
    github: 'https://github.com/abinu2/SafeGuard',
    demo: 'https://safeguard-nu.vercel.app',
    prize: 'InnovationHacks 2026',
  },
  {
    slug: 'hydrascan',
    title: 'HydraScan',
    description:
      'Native iOS recovery companion pairing live QuickPose movement capture with AI-driven recovery plans. Built with a hackathon team.',
    tags: ['Swift', 'SwiftUI', 'Supabase', 'QuickPose'],
    github: 'https://github.com/abinu2/HydraScan',
  },
  {
    slug: 'launchpad',
    title: 'LaunchPad',
    description:
      'AI-powered small business ops suite: five tools built on Vertex AI and Gemini, from marketing copy to financial forecasting.',
    tags: ['Next.js', 'Vertex AI', 'Gemini', 'Firestore'],
    github: 'https://github.com/abinu2/LaunchPad',
    demo: 'https://launch-pad-flame.vercel.app',
    prize: 'Google Cloud Track + Financial Literacy Track Winner',
  },
  {
    slug: 'btav',
    title: 'BTAV Smart Home',
    description:
      'Marketing and lead-gen site for a Control4 authorized smart-home dealer, built and shipped end-to-end for a small business client.',
    tags: ['Next.js', 'TypeScript', 'Supabase'],
    github: 'https://github.com/abinu2/BTAV-Smart-Home-Website',
    demo: 'https://btav.tech',
    // Live site blocks framing (X-Frame-Options: DENY) — use a screenshot.
    screenshot: '/previews/btav.png',
  },
];
