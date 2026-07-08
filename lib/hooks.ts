'use client';

import { useEffect, useRef, useState } from 'react';

interface TypewriterState {
  completedLines: string[];
  currentLine: string;
  done: boolean;
}

/**
 * Types `lines` out one character at a time. When `animate` is false
 * (prefers-reduced-motion, or SSR) it renders everything immediately.
 */
export function useTypewriter(lines: string[], speed = 35, animate = true): TypewriterState {
  const [state, setState] = useState<TypewriterState>(() =>
    animate
      ? { completedLines: [], currentLine: '', done: lines.length === 0 }
      : { completedLines: lines, currentLine: '', done: true },
  );
  const linesRef = useRef(lines);
  linesRef.current = lines;

  useEffect(() => {
    if (!animate) {
      setState({ completedLines: linesRef.current, currentLine: '', done: true });
      return;
    }

    let cancelled = false;
    let lineIndex = 0;
    let charIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    setState({ completedLines: [], currentLine: '', done: false });

    function tick() {
      if (cancelled) return;
      const all = linesRef.current;

      if (lineIndex >= all.length) {
        setState({ completedLines: all, currentLine: '', done: true });
        return;
      }

      const line = all[lineIndex] ?? '';
      charIndex += 1;
      const current = line.slice(0, charIndex);

      setState({
        completedLines: all.slice(0, lineIndex),
        currentLine: current,
        done: false,
      });

      if (charIndex >= line.length) {
        lineIndex += 1;
        charIndex = 0;
        timeoutId = setTimeout(tick, speed * 6);
      } else {
        timeoutId = setTimeout(tick, speed);
      }
    }

    timeoutId = setTimeout(tick, speed);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate, speed, lines.length]);

  return state;
}
