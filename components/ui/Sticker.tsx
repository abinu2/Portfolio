import { cn } from '@/lib/utils';

interface StickerProps {
  children: React.ReactNode;
  tone?: 'acid' | 'shock' | 'violet' | 'ink' | 'paper' | 'term';
  /** Rotation in degrees, e.g. -3 or 6. */
  rotate?: number;
  className?: string;
}

const tones = {
  acid: 'bg-acid text-ink',
  shock: 'bg-shock text-paper',
  violet: 'bg-violet text-paper',
  ink: 'bg-ink text-acid',
  paper: 'bg-paper text-ink',
  term: 'bg-term text-ink',
};

/**
 * Rotated zine sticker / stamp chip. Thick border, hard shadow,
 * uppercase mono. Slap them anywhere.
 */
export default function Sticker({ children, tone = 'acid', rotate = -3, className }: StickerProps) {
  return (
    <span
      className={cn(
        'inline-block border-3 border-ink px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest shadow-brutal-sm',
        tones[tone],
        className,
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}
