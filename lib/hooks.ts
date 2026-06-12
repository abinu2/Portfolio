'use client';

import { useEffect, useRef, useState } from 'react';

interface TypewriterState {
  /** Lines fully typed so far. */
  completedLines: string[];
  /** The line currently being typed (may be partial). */
  currentLine: string;
  /** True once every line has been rendered. */
  done: boolean;
}

/**
 * Types out an array of lines character-by-character with a realistic cadence:
 * jittered per-character delay, a longer pause between lines, and an extra
 * beat after lines that look like commands (start with `$`).
 *
 * Pass `enabled: false` (e.g. when prefers-reduced-motion) to render
 * everything instantly.
 */
export function useTypewriter(
  lines: string[],
  typingSpeed = 35,
  enabled = true,
): TypewriterState {
  const [state, setState] = useState<TypewriterState>(() =>
    enabled
      ? { completedLines: [], currentLine: '', done: false }
      : { completedLines: lines, currentLine: '', done: true },
  );
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!enabled) {
      setState({ completedLines: lines, currentLine: '', done: true });
      return;
    }

    let lineIdx = 0;
    let charIdx = 0;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;

      if (lineIdx >= lines.length) {
        setState((s) => ({ ...s, done: true }));
        return;
      }

      const line = lines[lineIdx];

      if (charIdx <= line.length) {
        const partial = line.slice(0, charIdx);
        setState({
          completedLines: lines.slice(0, lineIdx),
          currentLine: partial,
          done: false,
        });
        charIdx += 1;
        // Jitter ±40% for a human-feeling rhythm; empty lines render instantly.
        const jitter = typingSpeed * (0.6 + Math.random() * 0.8);
        timeoutRef.current = setTimeout(tick, line.length === 0 ? 0 : jitter);
      } else {
        // Line finished — pause longer after command lines.
        const pause = line.startsWith('$') ? 400 : 150;
        lineIdx += 1;
        charIdx = 0;
        timeoutRef.current = setTimeout(tick, pause);
      }
    };

    tick();

    return () => {
      cancelled = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines, typingSpeed, enabled]);

  return state;
}

/** True once the page has scrolled past `threshold` px. */
export function useScrolledPast(threshold: number): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}

/**
 * Tracks which section id is currently in view using an IntersectionObserver.
 * Used by the navbar to highlight the active link.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // Trigger when a section's top crosses the upper-middle of the viewport.
      { rootMargin: '-20% 0px -60% 0px' },
    );

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
