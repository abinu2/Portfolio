'use client';

import { useReducedMotion } from 'framer-motion';
import { useTypewriter } from '@/lib/hooks';
import { cn } from '@/lib/utils';

interface TerminalTextProps {
  lines: string[];
  typingSpeed?: number;
  className?: string;
}

function TerminalLine({ text }: { text: string }) {
  const isCommand = text.startsWith('$');
  return (
    <div className={cn('whitespace-pre-wrap', isCommand ? 'text-paper-muted' : 'text-term')}>
      {text.length === 0 ? ' ' : text}
    </div>
  );
}

/**
 * The hacker OS window inside the zine: ink-black terminal with a brutal
 * title bar, scanlines, character-by-character typing, and a blinking
 * block cursor. Instant render under prefers-reduced-motion.
 */
export default function TerminalText({ lines, typingSpeed = 35, className }: TerminalTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const { completedLines, currentLine, done } = useTypewriter(
    lines,
    typingSpeed,
    !prefersReducedMotion,
  );

  const label = `Terminal showing: ${lines.filter(Boolean).join('; ')}`;

  return (
    <div
      className={cn('border-3 border-ink bg-ink shadow-brutal-acid', className)}
      role="img"
      aria-label={label}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between border-b-3 border-ink bg-acid px-4 py-2">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-ink">
          allan@asu:~/portfolio
        </span>
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-3 w-3 border-2 border-ink bg-paper" />
          <span className="h-3 w-3 border-2 border-ink bg-shock" />
          <span className="h-3 w-3 border-2 border-ink bg-term" />
        </span>
      </div>

      {/* Body */}
      <div className="scanlines min-h-[280px] p-6 font-mono text-sm leading-relaxed" aria-hidden="true">
        {completedLines.map((line, i) => (
          <TerminalLine key={i} text={line} />
        ))}
        {!done && (
          <div className="whitespace-pre-wrap">
            <span className={currentLine.startsWith('$') ? 'text-paper-muted' : 'text-term'}>
              {currentLine}
            </span>
            <span className="inline-block h-4 w-2 translate-y-0.5 animate-blink bg-term" />
          </div>
        )}
        {done && (
          <div>
            <span className="text-paper-muted">$ </span>
            <span className="inline-block h-4 w-2 translate-y-0.5 animate-blink bg-term" />
          </div>
        )}
      </div>
    </div>
  );
}
