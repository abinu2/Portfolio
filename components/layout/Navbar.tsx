'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, SITE } from '@/lib/constants';
import { useActiveSection, useScrolledPast } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { motion as motionTokens } from '@/styles/tokens';

/** Live HH:MM:SS clock for the system status strip. */
function SystemClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <span suppressHydrationWarning>{time || '--:--:--'}</span>;
}

/**
 * Fixed navigation: a hacker OS status strip on top (uptime, threat level,
 * clock) and a brutal zine masthead below it. Active section gets the
 * acid highlight. Mobile collapses to a full-screen paper menu.
 */
export default function Navbar() {
  const scrolled = useScrolledPast(80);
  const sectionIds = useMemo(() => NAV_LINKS.map((l) => l.id), []);
  const active = useActiveSection(sectionIds);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* OS status strip */}
      <div className="border-b-3 border-ink bg-ink px-4 py-1.5">
        <div className="mx-auto flex max-w-7xl items-center justify-between font-mono text-[11px] font-bold uppercase tracking-widest text-term">
          <span className="flex items-center gap-4">
            <span>[sys:online]</span>
            <span className="hidden sm:inline">[threat_lvl:low]</span>
            <span className="hidden md:inline">[loc:tempe_az]</span>
          </span>
          <span className="flex items-center gap-4">
            <span className="text-acid">[status:open_to_work]</span>
            <span className="hidden sm:inline">
              <SystemClock />
            </span>
          </span>
        </div>
      </div>

      {/* Masthead */}
      <nav
        className={cn(
          'border-b-3 border-ink transition-colors duration-base ease-standard',
          scrolled ? 'bg-paper' : 'bg-paper/95',
        )}
        aria-label="Primary"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <a
            href="#about"
            className="group flex items-center gap-2 font-display text-lg uppercase tracking-tight text-ink"
          >
            <span className="bg-ink px-2 py-0.5 text-acid transition-colors duration-fast group-hover:bg-shock group-hover:text-paper">
              AB
            </span>
            allan_binu
            <span className="inline-block h-5 w-2.5 animate-blink bg-ink" aria-hidden="true" />
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link, i) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={cn(
                    'border-3 border-transparent px-3 py-1.5 font-mono text-sm font-bold uppercase tracking-wide transition-all duration-fast',
                    active === link.id
                      ? 'border-ink bg-acid text-ink shadow-brutal-sm'
                      : 'text-ink hover:border-ink hover:bg-paper-dim',
                  )}
                  aria-current={active === link.id ? 'true' : undefined}
                >
                  {String(i + 1).padStart(2, '0')}.{link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="border-3 border-ink bg-paper p-1.5 text-ink shadow-brutal-sm transition-all duration-fast hover:bg-acid md:hidden"
            aria-label={drawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen((o) => !o)}
          >
            {drawerOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="graph-paper fixed inset-0 top-[100px] z-40 flex flex-col gap-3 border-t-3 border-ink bg-paper p-6 md:hidden"
            role="dialog"
            aria-label="Navigation menu"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{
              duration: motionTokens.duration.base / 1000,
              ease: motionTokens.easing.standard,
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                className={cn(
                  'border-3 border-ink px-4 py-3 font-display text-2xl uppercase shadow-brutal-sm transition-all duration-fast',
                  active === link.id ? 'bg-acid text-ink' : 'bg-paper text-ink hover:bg-acid',
                )}
              >
                <span className="mr-3 font-mono text-sm font-bold text-shock">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {link.label}
              </a>
            ))}
            <a
              href={SITE.resume}
              download
              className="mt-4 border-3 border-ink bg-ink px-4 py-3 text-center font-display text-lg uppercase text-acid shadow-brutal-sm transition-all duration-fast hover:bg-shock hover:text-paper"
            >
              ↓ Steal My Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
