interface SkillBadgeProps {
  skill: string;
}

/**
 * Pill-shaped monospace badge with an accent border that fills on hover.
 */
export default function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <span
      className="inline-flex cursor-default items-center rounded-pill border border-accent/40 px-4 py-1.5
                 font-mono text-sm text-body-secondary transition-colors duration-fast ease-standard
                 hover:border-accent hover:bg-accent/10 hover:text-accent"
    >
      {skill}
    </span>
  );
}
