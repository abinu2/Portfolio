import type {
  AboutFact,
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
  email: 'abinu4@asu.edu',
  github: 'https://github.com/abinu2',
  linkedin: 'https://www.linkedin.com/in/allan-binu',
  resume: '/resume.pdf',
  tagline: 'Software Engineer · Blockchain Developer · Security Researcher',
  bio: 'I build resilient systems at the intersection of security, AI, and decentralized infrastructure. Currently studying Computer Science at Arizona State University with a focus on network forensics, smart contract engineering, and machine learning pipelines.',
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
/* DOSSIER — the human behind the terminal                             */
/* ------------------------------------------------------------------ */

export const ABOUT = {
  headshot: '/headshot.jpg',
  greeting: "Hey — I'm Allan.",
  paragraphs: [
    "I'm a CS student at Arizona State who got hooked the first time I watched my own network traffic scroll past in Wireshark — and never really stopped looking. Since then I've deployed smart contracts that move real value on-chain, built ML pipelines that flag intrusions in packet captures, and led ASU's Hacker Devils through CTF seasons as VP.",
    "What ties it together: I like systems you have to earn trust with. Contracts that can't revert, networks that can't leak, models that can't miss. If it's adversarial, I'm interested.",
    "Off the clock you'll find me grinding CTF challenges, reading post-mortems of other people's exploits, and over-engineering side projects with agentic AI.",
  ],
  facts: [
    { label: 'base', value: 'Tempe, AZ' },
    { label: 'school', value: 'Arizona State University — B.S. Computer Science' },
    { label: 'roles', value: 'Hacker Devils VP · Capstone blockchain dev' },
    { label: 'stack_of_choice', value: 'Solidity · Python · TypeScript · Linux' },
    { label: 'off_hours', value: 'CTFs · packet captures · agentic AI experiments' },
  ] satisfies AboutFact[],
  currently: [
    'Shipping the KimuntuX capstone blockchain layer',
    'Hunting flags with Hacker Devils',
    'Exploring agentic AI workflows',
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Hero terminal                                                       */
/* ------------------------------------------------------------------ */

export const TERMINAL_LINES: string[] = [
  '$ whoami',
  '> allan_binu',
  '',
  '$ cat skills.txt',
  '> solidity | python | javascript',
  '> hardhat | react | next.js',
  '> linux | networking | ml',
  '',
  '$ status',
  '> open to opportunities',
];

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Blockchain Developer',
    company: 'KimuntuX Smart Fintech Hub — ASU Capstone',
    period: 'Aug 2025 – May 2026',
    description: [
      'Designed and deployed 3 production Solidity smart contracts covering wallet management, commission lifecycle tracking, and payment escrow using OpenZeppelin 5.0.1 security standards.',
      'Validated 13 on-chain interactions with zero transaction reverts across a local Hardhat node targeting Ethereum Sepolia testnet.',
      'Engineered a custom Hardhat solc-js compiler fallback subtask resolving cross-environment native binary incompatibilities.',
      'Produced deployment artifacts and ABI handoffs consumed by a FastAPI backend Web3.py integration layer.',
    ],
    tags: ['Solidity', 'Hardhat', 'Ethereum', 'OpenZeppelin', 'Web3.py', 'Smart Contracts'],
  },
  {
    role: 'Data Science Intern',
    company: 'Oracle (GTX) & GRAMMY Museum',
    period: 'Jan 2024 – May 2024',
    description: [
      'Built Python-based ETL pipelines processing operational records for analysis and reporting.',
      'Applied data transformation and cleaning techniques to historical datasets supporting business intelligence workflows.',
    ],
    tags: ['Python', 'ETL', 'Data Analysis', 'Pandas'],
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
    role: 'Vice President',
    company: 'Hacker Devils Club — Arizona State University',
    period: '2023 – May 2026',
    description: [
      'Lead a cybersecurity-focused student organization with recurring CTF participation, security workshops, and technical talks.',
      'Organize events covering topics including penetration testing, network forensics, and secure software development.',
    ],
    tags: ['Leadership', 'CTF', 'Cybersecurity', 'Community'],
  },
  {
    role: 'Undergraduate Tutor',
    company: 'Arizona State University',
    period: '2023 – May 2026',
    description: [
      'Tutored students in Calculus and Data Structures, reinforcing conceptual understanding and problem-solving under exam conditions.',
    ],
    tags: ['Calculus', 'Data Structures', 'Mentoring'],
  },
  {
    role: 'Collections Specialist',
    company: 'Discover Financial Services',
    period: 'Prior',
    description: [
      'Managed customer account resolution workflows in a high-volume financial services environment.',
    ],
    tags: ['Finance', 'Communication'],
  },
];

/* ------------------------------------------------------------------ */
/* Featured projects                                                   */
/* ------------------------------------------------------------------ */

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    title: 'Blockchain Commission Smart Contract System',
    description:
      'Three-contract Ethereum system for automated, tamper-proof affiliate commission payouts. Covers wallet management, commission lifecycle with on-chain event emission, and conditional payment escrow. Validated across 13 live on-chain interactions with zero reverts.',
    tags: ['Solidity', 'Hardhat', 'OpenZeppelin', 'Ethereum', 'Web3.py'],
    github: 'https://github.com/abinu2',
    visual: 'contracts',
    prize: 'ASU Capstone Blockchain Layer — KimuntuX',
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
    title: 'Blockchain Protocol Smart Contract Architecture',
    description:
      'Smart contract architecture project recognized at the Claude Builders Club Hackathon. Explored protocol-level design patterns for decentralized systems.',
    tags: ['Solidity', 'Blockchain', 'Protocol Design'],
    github: 'https://github.com/abinu2',
    visual: 'protocol',
    prize: 'Claude Builders Club Hackathon — Prize Winner',
  },
  {
    title: 'Global Development Explorer',
    description:
      'Interactive data visualization tool built with D3.js rendering animated bubble scatter plots from historical global development datasets. Supports multi-dimensional filtering by region, year, and metric.',
    tags: ['D3.js', 'JavaScript', 'HTML/CSS', 'Data Visualization'],
    github: 'https://github.com/abinu2',
    visual: 'bubbles',
  },
  {
    title: 'Virtual Network Infrastructure',
    description:
      'Multi-node virtual network environment configured from scratch using VirtualBox, Ubuntu LTS, Netplan, and Iptables. Demonstrates routing, firewall rule design, and inter-node communication.',
    tags: ['Linux', 'VirtualBox', 'Iptables', 'Netplan', 'Networking'],
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
    skills: ['Python', 'JavaScript', 'TypeScript', 'Solidity', 'C', 'C++', 'HTML', 'CSS', 'SQL'],
  },
  {
    label: 'Frameworks & Libraries',
    skills: [
      'React',
      'Next.js',
      'Tailwind CSS',
      'Framer Motion',
      'D3.js',
      'Hardhat',
      'OpenZeppelin',
      'FastAPI',
      'Web3.py',
      'Scikit-learn',
      'Pandas',
    ],
  },
  {
    label: 'Systems & Security',
    skills: [
      'Linux (Ubuntu)',
      'VirtualBox',
      'Iptables',
      'Netplan',
      'Network Forensics',
      'Buffer Overflow Analysis',
      'CTF',
      'Wireshark',
      'Git',
    ],
  },
  {
    label: 'AI & Blockchain',
    skills: [
      'Prompt Engineering',
      'Agentic Frameworks',
      'ETL Pipelines',
      'Smart Contract Architecture',
      'Ethereum',
      'Sepolia Testnet',
      'On-chain Event Design',
    ],
  },
];

/** Flat list for the marquee ticker. */
export const ALL_SKILLS: string[] = SKILL_GROUPS.flatMap((g) => g.skills);

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
