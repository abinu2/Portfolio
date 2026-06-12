interface SkillBadgeProps {
  skill: string;
  /** Index used to vary rotation so the wall feels hand-stuck. */
  index?: number;
}

const ROTATIONS = [-2, 1.5, -1, 2, 0, -1.5, 1] as const;

/**
 * Brutal sticker-pill: thick border, mono uppercase, slight random-feeling
 * rotation. Inverts to ink/acid on hover like a stamp being pressed.
 */
export default function SkillBadge({ skill, index = 0 }: SkillBadgeProps) {
  const rotate = ROTATIONS[index % ROTATIONS.length];

  return (
    <span
      className="inline-flex cursor-default items-center border-3 border-ink bg-paper px-3 py-1
                 font-mono text-sm font-bold uppercase tracking-wide text-ink shadow-brutal-sm
                 transition-all duration-fast ease-standard
                 hover:-translate-y-0.5 hover:bg-ink hover:text-acid"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {skill}
    </span>
  );
}
