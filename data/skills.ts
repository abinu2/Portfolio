export const skillGroups = [
  {
    label: 'Languages',
    skills: ['TypeScript', 'Python', 'Solidity', 'SQL', 'Java', 'C/C++', 'Go', 'Bash'],
  },
  {
    label: 'Full-stack',
    skills: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Prisma', 'Redis', 'Tailwind'],
  },
  {
    label: 'AI',
    skills: ['Claude API', 'Vertex AI', 'Gemini', 'OpenAI API'],
  },
  {
    label: 'Blockchain',
    skills: ['Ethereum', 'Solidity', 'Hardhat', 'OpenZeppelin', 'EigenLayer'],
  },
  {
    label: 'Security / Systems',
    skills: ['Linux', 'Proxmox', 'pfSense', 'WireGuard', 'Splunk', 'Wireshark'],
  },
] as const;

export const marqueeSkills = skillGroups.flatMap((group) => group.skills);
