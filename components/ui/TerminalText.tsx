'use client';

import { useReducedMotion } from 'framer-motion';
import { useTypewriter } from '@/lib/hooks';
import { cn } from '@/lib/utils';

interface TerminalTextProps {
  lines: string[];
  /** Base per-character delay in ms (jittered for realism). */
  typingSpeed?: number;
  className?: string;
}

/** Styles a single terminal line: commands in slate, output in emerald. */
function TerminalLine({ text }: { text: string }) {
  const isCommand = text.startsWith('$');
  return (
    <div className={cn('whitespace-pre-wrap', isCommand ? 'text-body-secondary' : 'text-accent-secondary')}>
      {text.length === 0 ? ' ' : text}
    </div>
  );
}

/**
 * Dark terminal card with a macOS-style title bar, monospace green text,
 * sequential character-by-character typing, and a blinking block cursor.
 * Under prefers-reduced-motion all lines render instantly.
 */
export default function TerminalText({ lines, typingSpeed = 35, className }: TerminalTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const { completedLines, currentLine, done } = useTypewriter(
    lines,
    typingSpeed,
    !prefersReducedMotion,
  );

  return (
    <div
      className={cn(
        'overflow-hidden rounded-modal border border-edge-visible bg-bg-tertiary shadow-2xl',
        className,
      )}
      role="img"
      aria-label="Terminal showing: whoami allan_binu; skills solidity, python, javascript, hardhat, react, next.js, linux, networking, ml; status open to opportunities"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-edge-subtle bg-bg-secondary/60 px-4 py-3">
        <span className="h-3 w-3 rounded-pill bg-danger/80" aria-hidden="true" />
        <span className="h-3 w-3 rounded-pill bg-accent-secondary/50" aria-hidden="true" />
        <span className="h-3 w-3 rounded-pill bg-accent/50" aria-hidden="true" />
        <span className="ml-2 font-mono text-xs text-body-muted">allan@asu:~</span>
      </div>

      {/* Body */}
      <div className="min-h-[280px] p-6 font-mono text-sm leading-relaxed" aria-hidden="true">
        {completedLines.map((line, i) => (
          <TerminalLine key={i} text={line} />
        ))}
        {!done && (
          <div className="whitespace-pre-wrap">
            <span className={currentLine.startsWith('$') ? 'text-body-secondary' : 'text-accent-secondary'}>
              {currentLine}
            </span>
            <span className="inline-block h-4 w-2 translate-y-0.5 animate-blink bg-accent-secondary" />
          </div>
        )}
        {done && (
          <div>
            <span className="text-body-secondary">$ </span>
            <span className="inline-block h-4 w-2 translate-y-0.5 animate-blink bg-accent-secondary" />
          </div>
        )}
      </div>
    </div>
  );
}
