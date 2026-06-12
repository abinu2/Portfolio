import Sticker from '@/components/ui/Sticker';
import type { ExperienceItem } from '@/types';

interface TimelineItemProps extends ExperienceItem {
  /** Position in the log — drives the giant index number and tilt. */
  index: number;
}

/**
 * One entry in the FIELD LOG: a brutal paper card with a giant outlined
 * entry number, stamped period chip, `>>` bullet lines, and sticker tags.
 * Cards tilt alternately like pasted zine clippings and straighten on hover.
 */
export default function TimelineItem({
  role,
  company,
  period,
  description,
  tags,
  index,
}: TimelineItemProps) {
  const tilt = index % 2 === 0 ? '-rotate-1' : 'rotate-1';
  const stamp = index % 2 === 0 ? 4 : -4;

  return (
    <article
      className={`group relative border-3 border-ink bg-paper p-6 shadow-brutal transition-all duration-base ease-standard
                  hover:rotate-0 hover:shadow-brutal-lg md:p-8 ${tilt}`}
    >
      {/* Giant entry number */}
      <span
        className="text-stroke pointer-events-none absolute -top-8 -left-2 select-none font-display text-[80px] leading-none opacity-70 md:-left-6"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Period stamp */}
      <div className="absolute -top-4 right-4">
        <Sticker tone={index % 2 === 0 ? 'shock' : 'ink'} rotate={stamp}>
          {period}
        </Sticker>
      </div>

      <header className="mt-4 md:mt-2">
        <h3 className="font-display text-xl uppercase leading-tight text-ink md:text-2xl">{role}</h3>
        <p className="mt-1 font-mono text-sm font-bold uppercase tracking-wide text-ink-muted">
          @ {company}
        </p>
      </header>

      <ul className="mt-5 space-y-2 border-t-3 border-dashed border-ink pt-5">
        {description.map((line, i) => (
          <li key={i} className="flex gap-3 text-base text-ink">
            <span className="font-mono font-bold text-shock" aria-hidden="true">
              &gt;&gt;
            </span>
            <span>{line}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="border-2 border-ink bg-acid px-2 py-0.5 font-mono text-xs font-bold uppercase text-ink"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
