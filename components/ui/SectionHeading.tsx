import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  /** Zine page number, e.g. "01". */
  number: string;
  title: string;
  /** Mono file-stamp, e.g. "field_log.txt". */
  subtitle?: string;
  /** Set when rendered on an ink (dark) section. */
  inverted?: boolean;
}

/**
 * Zine section header: a giant outlined index number colliding with a
 * massive display title, plus a hex-address file stamp — the hacker OS
 * filing system peeking through the print design.
 */
export default function SectionHeading({ number, title, subtitle, inverted = false }: SectionHeadingProps) {
  return (
    <div className="relative mb-16">
      <span
        className={cn(
          'pointer-events-none absolute -top-10 right-0 select-none font-display text-[clamp(96px,18vw,200px)] leading-none opacity-60 md:-top-16',
          inverted ? 'text-stroke-paper' : 'text-stroke',
        )}
        aria-hidden="true"
      >
        {number}
      </span>

      <p
        className={cn(
          'mb-3 font-mono text-xs font-bold uppercase tracking-widest',
          inverted ? 'text-term' : 'text-ink-muted',
        )}
      >
        [0x{number}] {subtitle ? `// ${subtitle}` : ''}
      </p>

      <h2
        className={cn(
          'relative inline-block font-display text-[clamp(40px,8vw,88px)] uppercase leading-[0.95]',
          inverted ? 'text-paper' : 'text-ink',
        )}
      >
        {title}
        <span
          className={cn('absolute -bottom-2 left-0 h-3 w-full', inverted ? 'bg-shock' : 'bg-acid')}
          aria-hidden="true"
        />
      </h2>
    </div>
  );
}
