import { cn } from '@/lib/utils';

interface MarqueeProps {
  items: string[];
  /** Separator glyph between items. */
  separator?: string;
  /** Visual style of the strip. */
  tone?: 'acid' | 'ink' | 'shock' | 'paper';
  reverse?: boolean;
  slow?: boolean;
  className?: string;
}

const tones = {
  acid: 'bg-acid text-ink border-y-3 border-ink',
  ink: 'bg-ink text-acid border-y-3 border-ink',
  shock: 'bg-shock text-paper border-y-3 border-ink',
  paper: 'bg-paper text-ink border-y-3 border-ink',
};

/**
 * Full-bleed brutalist marquee strip. The track is duplicated so the
 * -50% keyframe loops seamlessly. Decorative — hidden from screen readers.
 */
export default function Marquee({
  items,
  separator = '✦',
  tone = 'acid',
  reverse = false,
  slow = false,
  className,
}: MarqueeProps) {
  const track = [...items, ...items];
  const animation = reverse
    ? 'animate-marquee-reverse'
    : slow
      ? 'animate-marquee-slow'
      : 'animate-marquee';

  return (
    <div className={cn('overflow-hidden py-2', tones[tone], className)} aria-hidden="true">
      <div className={cn('flex w-max items-center gap-6', animation)}>
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-6 whitespace-nowrap font-display text-lg uppercase tracking-wide"
          >
            {item}
            <span className="text-sm">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
