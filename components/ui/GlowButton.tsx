'use client';

import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowButtonProps {
  variant?: 'primary' | 'outline';
  href?: string;
  onClick?: () => void;
  /** Set on anchor renders, e.g. `download` for the resume link. */
  download?: boolean;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
  children: ReactNode;
  'aria-label'?: string;
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-card px-6 py-3 text-sm font-semibold ' +
  'transition-all duration-fast ease-standard cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed';

const variants = {
  primary: 'bg-accent text-bg-tertiary hover:shadow-glow',
  outline: 'border border-accent text-accent bg-transparent hover:bg-accent/10 hover:shadow-glow-sm',
};

/**
 * The site's CTA button. Primary = filled accent with glow-on-hover,
 * outline = accent border that fills subtly. Scales 1.02 on hover
 * (disabled under prefers-reduced-motion).
 */
export default function GlowButton({
  variant = 'primary',
  href,
  onClick,
  download,
  type = 'button',
  disabled,
  className,
  children,
  'aria-label': ariaLabel,
}: GlowButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const classes = cn(base, variants[variant], className);
  const hover = prefersReducedMotion ? undefined : { scale: 1.02 };
  const tap = prefersReducedMotion ? undefined : { scale: 0.98 };

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        download={download}
        className={classes}
        whileHover={hover}
        whileTap={tap}
        aria-label={ariaLabel}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={hover}
      whileTap={tap}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
}
