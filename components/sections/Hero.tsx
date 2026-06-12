'use client';

import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';
import GlowButton from '@/components/ui/GlowButton';
import TerminalText from '@/components/ui/TerminalText';
import { SITE, TERMINAL_LINES } from '@/lib/constants';
import { motion as motionTokens } from '@/styles/tokens';

/* Particle canvas is client-only and lazy — never blocks first paint. */
const ParticleBackground = dynamic(() => import('@/components/ui/ParticleBackground'), {
  ssr: false,
});

const NAME = 'Allan Binu';

/** Typewriter-style staggered character reveal for the name heading. */
function AnimatedName() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <h1 className="text-[40px] font-bold leading-tight text-body md:text-4xl">{NAME}</h1>
    );
  }

  return (
    <motion.h1
      className="text-[40px] font-bold leading-tight text-body md:text-4xl"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.055, delayChildren: 0.3 } },
      }}
      aria-label={NAME}
    >
      {NAME.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          aria-hidden="true"
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: motionTokens.duration.base / 1000,
                ease: motionTokens.easing.entrance,
              },
            },
          }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </motion.h1>
  );
}

/** Subheading with emerald separator dots. */
function Tagline() {
  const parts = SITE.tagline.split(' · ');
  return (
    <p className="text-lg font-medium text-body-secondary md:text-xl">
      {parts.map((part, i) => (
        <span key={part}>
          {part}
          {i < parts.length - 1 && (
            <span className="mx-2 text-accent-secondary" aria-hidden="true">
              ·
            </span>
          )}
        </span>
      ))}
    </p>
  );
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const entrance = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: motionTokens.duration.slow / 1000,
            delay,
            ease: motionTokens.easing.entrance,
          },
        };

  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center overflow-hidden bg-bg-tertiary"
    >
      <ParticleBackground />

      {/* Soft radial accent glow behind content */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(56,189,248,0.08),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-6 py-32 md:grid-cols-5 md:px-8">
        {/* Left column — 60% */}
        <div className="md:col-span-3">
          <motion.p className="mb-4 font-mono text-sm text-accent" {...entrance(0.1)}>
            {'// computer science & cybersecurity'}
          </motion.p>

          <AnimatedName />

          <motion.div className="mt-4" {...entrance(0.9)}>
            <Tagline />
          </motion.div>

          <motion.p className="mt-6 max-w-xl text-base text-body-secondary" {...entrance(1.1)}>
            {SITE.bio}
          </motion.p>

          <motion.div className="mt-10 flex flex-wrap gap-4" {...entrance(1.3)}>
            <GlowButton variant="primary" href="#projects">
              View My Work
            </GlowButton>
            <GlowButton variant="outline" href={SITE.resume} download>
              Download Resume
            </GlowButton>
          </motion.div>
        </div>

        {/* Right column — 40%, hidden on mobile */}
        <motion.div className="hidden md:col-span-2 md:block" {...entrance(0.6)}>
          <TerminalText lines={[...TERMINAL_LINES]} typingSpeed={35} />
        </motion.div>
      </div>
    </section>
  );
}
