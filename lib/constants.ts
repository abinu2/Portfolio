import type {
  AboutFact,
  AboutPhoto,
  ExperienceItem,
  FeaturedProject,
  NavLink,
  SkillGroup,
  SocialLink,
} from '@/types';

/* ------------------------------------------------------------------ */
/* Identity                                                            */
/* ------------------------------------------------------------------ */

export const SITE = {
  name: 'Allan Binu',
  wordmark: '> allan_binu',
  email: 'allanbinu197@gmail.com',
  github: 'https://github.com/abinu2',
  linkedin: 'https://www.linkedin.com/in/allan-binu',
  resume: '/resume.pdf',
  tagline: 'Software Engineer · Blockchain Developer · Security Researcher',
  bio: 'I build resilient systems at the intersection of security, AI, and decentralized infrastructure. B.S. in Computer Science (Cybersecurity concentration) from Arizona State University, now shipping production blockchain infrastructure at Kimuntu Power — with an M.S. in Robotics & Autonomous Systems up next.',
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub', href: SITE.github, icon: 'github' },
  { label: 'LinkedIn', href: SITE.linkedin, icon: 'linkedin' },
  { label: 'Email', href: `mailto:${SITE.email}`, icon: 'mail' },
];

/* ------------------------------------------------------------------ */
/* Hero terminal                                                       */
/* ------------------------------------------------------------------ */

export const TERMINAL_LINES: string[] = [
  '$ whoami',
  '> allan_binu',
  '',
  '$ cat skills.txt',
  '> typescript | python | solidity',
  '> next.js | prisma | postgres',
  '> linux | wireshark | ml',
  '',
  '$ status',
  '> open to opportunities',
];

/* ------------------------------------------------------------------ */
/* DOSSIER — the human behind the terminal                             */
/* ------------------------------------------------------------------ */

export const ABOUT = {
  headshot: '/headshot.jpg',
  greeting: "Hey — I'm Allan.",
  paragraphs: [
    "I'm a computer science graduate (Cybersecurity concentration) from Arizona State who got hooked the first time I watched my own network traffic stream through Wireshark — and never stopped looking. Since then I've shipped a production full-stack platform solo, deployed Solidity contracts that move real value on-chain, and led ASU's Hacker Devils security club through competitive CTF seasons as Vice President.",
    'The common thread: I build systems that have to earn trust. Contracts that cannot revert, networks that cannot leak, pipelines that cannot lose data. If the problem is adversarial, I want to work on it.',
    "Right now I'm building blockchain security infrastructure at Kimuntu Power, and this fall I start an M.S. in Robotics & Autonomous Systems — same curiosity, pointed at machines that move.",
  ],
  facts: [
    { label: 'base', value: 'Tempe, AZ · remote-ready · US citizen' },
    { label: 'education', value: 'B.S. Computer Science (Cybersecurity), ASU — May 2026' },
    { label: 'next_up', value: 'M.S. Robotics & Autonomous Systems — incoming' },
    { label: 'current_roles', value: 'Software Developer @ Kimuntu Power · Hacker Devils VP' },
    { label: 'core_stack', value: 'TypeScript · Python · Solidity · PostgreSQL · Linux' },
    { label: 'off_hours', value: 'CTF competitions · exploit research · home-lab tinkering' },
  ] satisfies AboutFact[],
  currently: [
    'Shipping blockchain security infrastructure at Kimuntu Power',
    'Building RallyPoint — a civic engagement platform',
    'Running a Proxmox home lab with VLANs and WireGuard',
  ],
  photos: [
    {
      src: '/photos/grad-2026.jpg',
      alt: 'Allan in cap and gown in front of the giant 2026 sign at ASU',
      caption: 'class of 2026',
      width: 900,
      height: 1200,
    },
    {
      src: '/photos/asu-stole.jpg',
      alt: 'ASU graduation stole with honor cords',
      caption: 'cybersecurity concentration',
      width: 900,
      height: 1200,
    },
    {
      src: '/photos/team-presentation.jpg',
      alt: 'Allan presenting a project with his team at a final selection event',
      caption: 'shipping under pressure',
      width: 1200,
      height: 800,
      small: true,
    },
  ] satisfies AboutPhoto[],
} as const;

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Software Developer, Blockchain Security',
    company: 'Kimuntu Power — Remote',
    period: 'Aug 2025 – Present',
    description: [
      'Build and maintain a production full-stack platform (KimuX): Node.js/Python backend APIs and a React/TypeScript frontend; manage schema design and migrations across a live PostgreSQL database serving financial transactions.',
      'Implement affiliate reward distribution, brokerage settlement, and payment integrations; debug production issues and ship fixes across frontend, backend, and database layers.',
      'Coordinate cross-service data consistency between on-chain Solidity contracts and off-chain systems via an async event-driven API bridge.',
    ],
    tags: ['TypeScript', 'Node.js', 'PostgreSQL', 'Solidity', 'React', 'Python'],
  },
  {
    role: 'Data Science Intern',
    company: 'Oracle (GTX) & GRAMMY Museum',
    period: 'Jan 2024 – Jul 2024',
    description: [
      'Built ETL pipelines with automated validation and integrity checks over 2M+ production records, reducing manual processing time by 35%; surfaced performance bottlenecks and data quality issues across production environments.',
      'Delivered structured findings and engineering recommendations to cross-functional stakeholders; trained ML models (scikit-learn) for anomaly detection and pattern recognition.',
    ],
    tags: ['Python', 'ETL', 'Scikit-learn', 'Data Analysis'],
  },
  {
    role: 'Principal — Sunday School Program',
    company: 'St. Thomas Orthodox Church — Phoenix, AZ',
    period: '2025 – Present',
    description: [
      'Direct curriculum development, lesson planning, and instructional standardization across K-12 grade levels; oversee 12+ volunteer instructors and manage a program serving 50+ students.',
      'Coordinate all program operations including scheduling, parent communication, and event planning; reduced curriculum gaps by standardizing learning objectives and assessment methods across all grade levels.',
      'Lead weekly sessions and mentor student cohorts directly; design age-appropriate instructional materials and track individual student progress across the academic year.',
    ],
    tags: ['Leadership', 'Curriculum Design', 'Operations', 'Mentorship'],
  },
  {
    role: 'VP of Leadership',
    company: 'Hacker Devils Cybersecurity Club — Arizona State University',
    period: 'Aug 2024 – Present',
    description: [
      'Organize 10+ technical events per semester including workshops, CTF competitions, and security research sessions.',
      'Mentor 15+ members in vulnerability research and offensive security; team placed top 30% regionally.',
    ],
    tags: ['Leadership', 'CTF', 'Offensive Security', 'Community'],
  },
  {
    role: 'Undergraduate Tutor — Data Structures & Algorithms',
    company: 'Arizona State University',
    period: 'Aug 2024 – Present',
    description: [
      'Mentor 30+ students per semester in algorithm design, recursion, graph modeling, and complexity analysis; build frameworks and worked examples that improve comprehension of core CS problem-solving patterns.',
    ],
    tags: ['Algorithms', 'Data Structures', 'Mentoring'],
  },
];

/* ------------------------------------------------------------------ */
/* Featured projects — the case files                                  */
/* ------------------------------------------------------------------ */

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    title: 'RallyPoint — Civic Engagement Platform',
    description:
      'A full-stack civic engagement platform that lets residents track local government actions, join community discussions, and measure collective impact — built solo. Next.js 14 App Router with a 12-model Prisma/PostgreSQL schema, Clerk auth with RBAC, Redis rate limiting, Zod-validated APIs, and a Claude AI moderation pipeline with 4-tier toxicity scoring.',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Redis', 'Claude AI'],
    github: 'https://github.com/abinu2/RallyPoint',
    visual: 'moderation',
  },
  {
    title: 'Launchpad — AI Business Operations Suite',
    description:
      'An AI-powered small business platform with five integrated tools — Quote-to-Cash, Receipt Scanner, Contract Vault, Compliance Autopilot, and Growth Radar — each driven by Vertex AI and Gemini LLM pipelines, sharing state through a Firestore Business Intelligence Graph. Won two competitive hackathon tracks.',
    tags: ['GCP', 'Vertex AI', 'Gemini', 'Firestore', 'Python'],
    github: 'https://github.com/abinu2/LaunchPad',
    demo: 'https://launch-pad-flame.vercel.app',
    visual: 'orbit',
    prize: 'Google Cloud Track + Financial Literacy Track Winner',
  },
  {
    title: 'Blockchain Commission Smart Contract System',
    description:
      'Three-contract Ethereum system for automated, tamper-proof affiliate commission payouts powering the KimuX platform. Covers wallet management, commission lifecycle with on-chain event emission, and conditional payment escrow. Validated across 13 live on-chain interactions with zero reverts.',
    tags: ['Solidity', 'Hardhat', 'OpenZeppelin', 'Ethereum', 'Web3.py'],
    github: 'https://github.com/abinu2',
    visual: 'contracts',
    prize: 'Kimuntu Power — Production Blockchain Layer',
  },
  {
    title: 'Blockchain Protocol Smart Contract Architecture',
    description:
      'Smart contract architecture project recognized at the Claude Builders Club Hackathon. Explored protocol-level design patterns for decentralized systems, from consensus assumptions to on-chain event design.',
    tags: ['Solidity', 'Blockchain', 'Protocol Design'],
    github: 'https://github.com/abinu2/Etherfi',
    visual: 'protocol',
    prize: 'Claude Builders Club Hackathon — Prize Winner',
  },
  {
    title: 'Network Traffic Anomaly Detection',
    description:
      'Machine learning pipeline for real-time identification of network-layer threats. Applies classification models to packet-level traffic features to flag anomalous behavior consistent with intrusion patterns.',
    tags: ['Python', 'Scikit-learn', 'Networking', 'ML', 'Security'],
    github: 'https://github.com/abinu2',
    visual: 'anomaly',
  },
  {
    title: 'Infrastructure Engineering Home Lab',
    description:
      'A private multi-node compute environment mirroring cloud infrastructure patterns: isolated VMs on Proxmox with VLAN segmentation, pfSense routing, Docker-containerized services, WireGuard VPN, Splunk log aggregation, and Bash-automated provisioning.',
    tags: ['Proxmox', 'Docker', 'pfSense', 'WireGuard', 'Splunk', 'Linux'],
    github: 'https://github.com/abinu2',
    visual: 'network',
  },
];

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'Java', 'C/C++', 'Bash', 'Go', 'Solidity'],
  },
  {
    label: 'Full-Stack & Cloud',
    skills: [
      'Next.js App Router',
      'React 18/19',
      'Tailwind CSS',
      'shadcn UI',
      'React Query',
      'Zod',
      'Clerk',
      'Node.js',
      'PostgreSQL',
      'Prisma ORM',
      'Redis',
      'AWS Lambda',
      'Docker',
      'GitHub Actions',
      'Vercel',
    ],
  },
  {
    label: 'Systems & Security',
    skills: [
      'Linux',
      'Proxmox',
      'pfSense',
      'WireGuard',
      'Splunk',
      'Wireshark',
      'Iptables',
      'Network Forensics',
      'Buffer Overflow Analysis',
      'CTF',
    ],
  },
  {
    label: 'AI & Blockchain',
    skills: [
      'Anthropic Claude API',
      'OpenAI API',
      'Vercel AI SDK',
      'Gemini',
      'Vertex AI',
      'Scikit-learn',
      'Ethereum',
      'Hardhat',
      'OpenZeppelin',
      'Smart Contract Architecture',
    ],
  },
];

/** Flat list for the marquee ticker. */
export const ALL_SKILLS: string[] = SKILL_GROUPS.flatMap((g) => g.skills);

/** Repos hidden from the live Open Source feed (scratch/test repos). */
export const REPO_BLOCKLIST: string[] = ['new', 'test', 'Github-Competency'];

/** Conventional GitHub language colors for the Open Source cards. */
export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F1E05A',
  Python: '#3572A5',
  Solidity: '#AA6746',
  HTML: '#E34C26',
  CSS: '#563D7C',
  C: '#555555',
  'C++': '#F34B7D',
  'C#': '#178600',
  Java: '#B07219',
  Shell: '#89E051',
  Go: '#00ADD8',
  Rust: '#DEA584',
  'Jupyter Notebook': '#DA5B0B',
};
