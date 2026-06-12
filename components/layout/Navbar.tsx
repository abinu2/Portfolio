'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, SITE } from '@/lib/constants';
import { useActiveSection, useScrolledPast } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { motion as motionTokens } from '@/styles/tokens';

/**
 * Fixed top navigation: transparent on load, blurred slate surface after
 * scrolling 80px. Active section is tracked with an IntersectionObserver.
 * Collapses to a hamburger + slide-in drawer on mobile.
 */
export default function Navbar() {
  const scrolled = useScrolledPast(80);
  const sectionIds = useMemo(() => NAV_LINKS.map((l) => l.id), []);
  const active = useActiveSection(sectionIds);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-base ease-standard',
        scrolled
          ? 'border-b border-edge-subtle bg-bg/90 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-8" aria-label="Primary">
        {/* Wordmark — terminal prompt style */}
        <a
          href="#about"
          className="font-mono text-base font-semibold text-body transition-colors duration-fast hover:text-accent"
        >
          <span className="text-accent">&gt;</span> allan_binu
          <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-accent" aria-hidden="true" />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link, i) => (
            <li key={link.id}>
              <a
                href={link.href}
                className={cn(
                  'font-mono text-sm transition-colors duration-fast',
                  active === link.id ? 'text-accent' : 'text-body-secondary hover:text-body',
                )}
                aria-current={active === link.id ? 'true' : undefined}
              >
                <span className="mr-1 text-accent" aria-hidden="true">{`0${i + 1}.`}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="rounded-badge p-2 text-body-secondary transition-colors duration-fast hover:text-accent md:hidden"
          aria-label={drawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen((o) => !o)}
        >
          {drawerOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile slide-in drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-bg-tertiary/70 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: motionTokens.duration.fast / 1000 }}
              onClick={() => setDrawerOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              className="fixed right-0 top-0 z-50 flex h-screen w-72 flex-col gap-2 rounded-l-modal
                         border-l border-edge-subtle bg-bg-secondary p-8 pt-24 md:hidden"
              role="dialog"
              aria-label="Navigation menu"
              initial={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
              animate={prefersReducedMotion ? { opacity: 1 } : { x: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
              transition={{
                duration: motionTokens.duration.base / 1000,
                ease: motionTokens.easing.standard,
              }}
            >
              <button
                type="button"
                className="absolute right-6 top-6 rounded-badge p-2 text-body-secondary hover:text-accent"
                aria-label="Close navigation menu"
                onClick={() => setDrawerOpen(false)}
              >
                <X size={24} aria-hidden="true" />
              </button>
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setDrawerOpen(false)}
                  className={cn(
                    'rounded-card px-4 py-3 font-mono text-base transition-colors duration-fast',
                    active === link.id
                      ? 'bg-accent/10 text-accent'
                      : 'text-body-secondary hover:bg-bg/60 hover:text-body',
                  )}
                >
                  <span className="mr-2 text-accent" aria-hidden="true">{`0${i + 1}.`}</span>
                  {link.label}
                </a>
              ))}
              <a
                href={SITE.resume}
                download
                className="mt-6 rounded-card border border-accent px-4 py-3 text-center font-mono text-sm text-accent
                           transition-colors duration-fast hover:bg-accent/10"
              >
                Download Resume
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
