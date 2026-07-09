import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind class strings, resolving conflicts left-to-right. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Minimal structural email check — not RFC-exhaustive, good enough to gate a contact form. */
export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email);
}
