'use client';

import { type ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface GlowButtonProps {
  variant?: 'primary' | 'outline' | 'shock';
  href?: string;
  onClick?: () => void;
  download?: boolean;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
  children: ReactNode;
  'aria-label'?: string;
}

/**
 * Brutal CTA button: thick ink border, hard offset shadow. On hover the
 * button shoves up-left and the shadow grows; on press it slams flat.
 * Pure transform/box-shadow — no layout-triggering properties.
 */
const base =
  'inline-flex items-center justify-center gap-2 border-3 border-ink px-6 py-3 ' +
  'font-display text-base uppercase tracking-wide shadow-brutal-sm cursor-pointer select-none ' +
  'transition-all duration-fast ease-standard ' +
  'hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal ' +
  'active:translate-x-1 active:translate-y-1 active:shadow-none ' +
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-brutal-sm';

const variants = {
  primary: 'bg-acid text-ink',
  outline: 'bg-paper text-ink',
  shock: 'bg-shock text-paper',
};

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
  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <a href={href} onClick={onClick} download={download} className={classes} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
