'use client';

import { useEffect, useState } from 'react';
import { Download, Github, Linkedin, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#live', label: 'Live_Feed' },
  { href: '#experience', label: 'Field_Log' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

/**
 * Sticky brutalist nav. Desktop shows the full link row; below `md` it
 * collapses into a full-bleed menu panel. Closes on route-anchor click and
 * on Escape for keyboard users.
 */
export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:border-3 focus:border-ink focus:bg-acid focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-bold focus:uppercase"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b-3 border-ink bg-paper/95 backdrop-blur">
        <nav
          className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8"
          aria-label="Primary"
        >
          <a
            href="#top"
            className="font-display text-lg uppercase tracking-tight text-ink"
            onClick={() => setOpen(false)}
          >
            allan<span className="text-shock">.</span>binu
          </a>

          <ul className="hidden items-center gap-6 font-mono text-xs font-bold uppercase tracking-widest md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="border-b-2 border-transparent pb-0.5 text-ink transition-colors duration-fast hover:border-ink hover:text-shock"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 border-3 border-ink bg-acid px-3 py-2 font-mono text-xs font-bold uppercase text-ink shadow-brutal-sm transition-all duration-fast hover:-translate-y-0.5 hover:shadow-brutal"
            >
              <Download size={14} aria-hidden="true" />
              Resume
            </a>
            <a
              href="https://github.com/abinu2"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Allan's GitHub"
              className="border-3 border-ink bg-paper p-2 text-ink transition-all duration-fast hover:-translate-y-0.5 hover:bg-ink hover:text-acid"
            >
              <Github size={16} aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/allan-binu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Allan's LinkedIn"
              className="border-3 border-ink bg-paper p-2 text-ink transition-all duration-fast hover:-translate-y-0.5 hover:bg-ink hover:text-acid"
            >
              <Linkedin size={16} aria-hidden="true" />
            </a>
          </div>

          <button
            type="button"
            className="border-3 border-ink bg-paper p-2 text-ink md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </nav>
      </header>

      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-x-0 top-[65px] z-40 border-b-3 border-ink bg-paper transition-transform duration-base ease-standard md:hidden',
          open ? 'translate-y-0' : '-translate-y-[120%]',
        )}
      >
        <ul className="flex flex-col divide-y-3 divide-dashed divide-ink font-mono text-sm font-bold uppercase tracking-widest">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-6 py-4 text-ink transition-colors duration-fast hover:bg-acid"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3 border-t-3 border-ink px-6 py-4">
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 border-3 border-ink bg-acid px-3 py-1.5 font-mono text-xs font-bold uppercase"
          >
            <Download size={14} aria-hidden="true" /> Resume
          </a>
          <a
            href="https://github.com/abinu2"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border-3 border-ink bg-paper px-3 py-1.5 font-mono text-xs font-bold uppercase"
          >
            <Github size={14} aria-hidden="true" /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/allan-binu"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border-3 border-ink bg-paper px-3 py-1.5 font-mono text-xs font-bold uppercase"
          >
            <Linkedin size={14} aria-hidden="true" /> LinkedIn
          </a>
        </div>
      </div>
    </>
  );
}
