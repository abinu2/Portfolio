'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useTypewriter } from '@/lib/hooks';
import { cn } from '@/lib/utils';

interface TerminalTextProps {
  lines: string[];
  typingSpeed?: number;
  /** When true, visitors get a real prompt after the script finishes. */
  interactive?: boolean;
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

/** Commands visitors can run. The portfolio is the man page. */
const COMMANDS: Record<string, string[]> = {
  help: [
    '> available commands:',
    '>   whoami      — who is this guy',
    '>   skills      — tech stack dump',
    '>   projects    — jump to the exhibits',
    '>   contact     — open a channel',
    '>   sudo hire_me — do it',
    '>   clear       — wipe the screen',
  ],
  whoami: ['> allan_binu — cs @ asu', '> security researcher · blockchain dev', '> hacker devils vp · capstone shipper'],
  skills: ['> solidity | python | typescript', '> hardhat | react | next.js | fastapi', '> wireshark | iptables | scikit-learn'],
  projects: ['> opening case files…'],
  contact: ['> opening transmission channel…'],
  'sudo hire_me': ['> [sudo] password for recruiter: ********', '> ACCESS GRANTED ✓', '> routing to contact form…'],
};

const SCROLL_TARGETS: Record<string, string> = {
  projects: '#projects',
  contact: '#contact',
  'sudo hire_me': '#contact',
};

/**
 * The hacker OS window inside the zine. Plays a scripted intro with
 * character-by-character typing, then hands visitors a live prompt —
 * `help` lists commands, `sudo hire_me` scrolls to the contact form.
 */
export default function TerminalText({
  lines,
  typingSpeed = 35,
  interactive = false,
  className,
}: TerminalTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const { completedLines, currentLine, done } = useTypewriter(
    lines,
    typingSpeed,
    !prefersReducedMotion,
  );

  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  function runCommand(raw: string) {
    const cmd = raw.trim().toLowerCase();
    if (cmd.length === 0) return;

    if (cmd === 'clear') {
      setHistory([]);
      return;
    }

    const output = COMMANDS[cmd] ?? [`> command not found: ${cmd} — try 'help'`];
    setHistory((h) => [...h.slice(-30), `$ ${raw.trim()}`, ...output]);

    const target = SCROLL_TARGETS[cmd];
    if (target) {
      setTimeout(() => {
        document.querySelector(target)?.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      }, 450);
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      runCommand(input);
      setInput('');
    }
  }

  const showPrompt = interactive && done;

  return (
    <div
      className={cn('border-3 border-ink bg-ink shadow-brutal-acid', className)}
      onClick={() => showPrompt && inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between border-b-3 border-ink bg-acid px-4 py-2">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-ink">
          allan@asu:~/portfolio {showPrompt && '— try typing `help`'}
        </span>
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-3 w-3 border-2 border-ink bg-paper" />
          <span className="h-3 w-3 border-2 border-ink bg-shock" />
          <span className="h-3 w-3 border-2 border-ink bg-term" />
        </span>
      </div>

      {/* Body */}
      <div className="scanlines min-h-[280px] p-6 font-mono text-sm leading-relaxed">
        <div aria-hidden="true">
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
          {history.map((line, i) => (
            <TerminalLine key={`h-${i}`} text={line} />
          ))}
        </div>

        {showPrompt ? (
          <div className="flex items-center gap-2">
            <label htmlFor="terminal-input" className="shrink-0 text-paper-muted">
              $
            </label>
            <input
              ref={inputRef}
              id="terminal-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="Interactive terminal — type help for available commands"
              placeholder="help"
              className="w-full bg-transparent font-mono text-sm text-term caret-term outline-none placeholder:text-term/30"
            />
          </div>
        ) : (
          done && (
            <div aria-hidden="true">
              <span className="text-paper-muted">$ </span>
              <span className="inline-block h-4 w-2 translate-y-0.5 animate-blink bg-term" />
            </div>
          )
        )}
      </div>
    </div>
  );
}
