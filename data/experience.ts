import type { ExperienceItem } from '@/types';

export const experience: ExperienceItem[] = [
  {
    role: 'Software Developer, Blockchain Security',
    company: 'Kimuntu Power',
    period: 'Aug 2025 — Present',
    description: [
      'Build and maintain a production full-stack platform: Node.js/Python backend APIs, a React/TypeScript frontend, and Solidity contracts on-chain.',
      'Own schema design and migrations across a live PostgreSQL database serving real financial transactions — affiliate reward distribution, brokerage settlement, and payment integrations.',
      'Coordinate cross-service data consistency between on-chain contracts and off-chain systems via an async event-driven API bridge.',
    ],
    tags: ['Solidity', 'Node.js', 'Python', 'React', 'PostgreSQL'],
  },
  {
    role: 'Principal, Sunday School Program',
    company: 'St. Thomas Orthodox Church',
    period: '2025 — Present',
    description: [
      'Direct curriculum development and instructional standardization across K-12 grade levels for a program serving 50+ students.',
      'Oversee 12+ volunteer instructors — scheduling, parent communication, and event planning.',
    ],
    tags: ['Leadership', 'Curriculum Design', 'Operations'],
  },
  {
    role: 'VP of Leadership',
    company: 'ASU Hacker Devils',
    period: 'Aug 2024 — Present',
    description: [
      'Organize 10+ technical events per semester — workshops, CTF competitions, and security research sessions.',
      'Mentor 15+ members in vulnerability research and offensive security; team placed top 30% regionally.',
    ],
    tags: ['CTF', 'Offensive Security', 'Leadership'],
  },
  {
    role: 'Undergraduate Tutor — Data Structures & Algorithms',
    company: 'Arizona State University',
    period: 'Aug 2024 — Present',
    description: [
      'Mentor 30+ students per semester in algorithm design, recursion, graph modeling, and complexity analysis.',
      'Build frameworks and worked examples that improve comprehension of core CS problem-solving patterns.',
    ],
    tags: ['Teaching', 'Algorithms', 'Mentorship'],
  },
  {
    role: 'Data Science Intern',
    company: 'Oracle (GTX) & GRAMMY Museum',
    period: 'Jan 2024 — Jul 2024',
    description: [
      'Built ETL pipelines with automated validation and integrity checks over 2M+ production records, cutting manual processing time by 35%.',
      'Trained ML models (scikit-learn) for anomaly detection and pattern recognition; delivered findings to cross-functional stakeholders.',
    ],
    tags: ['Python', 'ETL', 'Scikit-learn', 'Data Analysis'],
  },
  {
    role: 'B.S. Computer Science — Cybersecurity Concentration',
    company: 'Arizona State University',
    period: 'Graduating May 2026',
    description: [
      'Coursework spanning distributed systems, operating systems, computer networks, machine learning, and database management alongside hands-on CTF competition.',
      'Incoming: M.S. in Robotics & Autonomous Systems.',
    ],
    tags: ['Cybersecurity', 'Distributed Systems', 'Machine Learning'],
  },
];
