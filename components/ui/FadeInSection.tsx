'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { motion as motionTokens } from '@/styles/tokens';
import type { FadeDirection } from '@/types';

interface FadeInSectionProps {
  children: ReactNode;
  /** Seconds to wait before the reveal starts. */
  delay?: number;
  /** Which direction the content slides in from. */
  direction?: FadeDirection;
  className?: string;
}

const OFFSET = 24;

const offsets: Record<FadeDirection, { x: number; y: number }> = {
  up: { x: 0, y: OFFSET },
  down: { x: 0, y: -OFFSET },
  left: { x: OFFSET, y: 0 },
  right: { x: -OFFSET, y: 0 },
};

/**
 * Scroll-triggered reveal wrapper. Fades from opacity 0 → 1 while sliding
 * 24px from the given direction. Animates `transform` and `opacity` only,
 * fires once (`once: true`), and is disabled entirely when the user
 * prefers reduced motion.
 */
export default function FadeInSection({
  children,
  delay = 0,
  direction = 'up',
  className,
}: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const prefersReducedMotion = useReducedMotion();

  const { x, y } = offsets[direction];

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x, y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : undefined}
      transition={{
        duration: motionTokens.duration.slow / 1000,
        delay,
        ease: motionTokens.easing.entrance,
      }}
    >
      {children}
    </motion.div>
  );
}
