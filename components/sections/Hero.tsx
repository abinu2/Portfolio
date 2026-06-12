'use client';

import { motion, useReducedMotion } from 'framer-motion';
import GlowButton from '@/components/ui/GlowButton';
import Sticker from '@/components/ui/Sticker';
import TerminalText from '@/components/ui/TerminalText';
import { SITE, TERMINAL_LINES } from '@/lib/constants';
import { motion as motionTokens } from '@/styles/tokens';

/**
 * The zine cover. Graph-paper backdrop, a name set in 13vw display type
 * with CMYK-misprint glitch layers, stickers slapped around the page,
 * and the hacker OS terminal taped to the corner at a tilt.
 */
export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const entrance = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: motionTokens.duration.slow / 1000,
            delay,
            ease: motionTokens.easing.entrance,
          },
        };

  return (
    <section id="top" className="graph-paper relative overflow-hidden border-b-5 border-ink bg-paper">
      {/* Oversized watermark */}
      <span
        className="text-stroke pointer-events-none absolute -right-8 top-24 hidden select-none font-display text-[200px] leading-none opacity-30 lg:block"
        aria-hidden="true"
      >
        EST.
        <br />
        2026
      </span>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 pb-24 pt-40 md:px-10 lg:grid-cols-5">
        {/* Left — the cover story */}
        <div className="lg:col-span-3">
          <motion.div {...entrance(0.05)}>
            <Sticker tone="ink" rotate={-2} className="text-term">
              {'// computer_science && cybersecurity'}
            </Sticker>
          </motion.div>

          <motion.h1
            className="glitch-layers glitch-hover mt-6 font-display text-[clamp(64px,13vw,170px)] uppercase leading-[0.85] text-ink"
            {...entrance(0.15)}
          >
            Allan
            <br />
            Binu
          </motion.h1>

          {/* Role strip */}
          <motion.div
            className="mt-8 inline-block border-3 border-ink bg-ink px-4 py-2 shadow-brutal-sm"
            {...entrance(0.3)}
          >
            <p className="font-mono text-sm font-bold uppercase tracking-widest text-paper">
              Software Engineer <span className="text-acid">✦</span> Blockchain Developer{' '}
              <span className="text-acid">✦</span> Security Researcher
            </p>
          </motion.div>

          <motion.p className="mt-8 max-w-xl text-lg text-ink" {...entrance(0.45)}>
            {SITE.bio}
          </motion.p>

          <motion.div className="mt-10 flex flex-wrap items-center gap-5" {...entrance(0.6)}>
            <GlowButton variant="primary" href="#projects">
              View the Exhibits ↓
            </GlowButton>
            <GlowButton variant="outline" href={SITE.resume} download>
              Steal My Resume
            </GlowButton>
          </motion.div>

          {/* Barcode footer of the cover */}
          <motion.div className="mt-12 flex items-center gap-4" {...entrance(0.75)}>
            <span className="barcode h-10 w-36" aria-hidden="true" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-ink-muted">
              tempe_az · asu · vol. 01
            </span>
          </motion.div>
        </div>

        {/* Right — the OS window */}
        <motion.div className="relative lg:col-span-2" {...entrance(0.35)}>
          <div className="absolute -top-6 left-6 z-10">
            <Sticker tone="shock" rotate={5}>
              ★ open to work
            </Sticker>
          </div>
          <div className="absolute -bottom-5 right-4 z-10">
            <Sticker tone="violet" rotate={-4}>
              ctf player // hacker devils vp
            </Sticker>
          </div>
          <div className="rotate-1 transition-transform duration-base hover:rotate-0">
            <TerminalText lines={[...TERMINAL_LINES]} typingSpeed={35} interactive />
          </div>
          <p className="mt-4 text-center font-mono text-xs font-bold uppercase tracking-widest text-ink-muted">
            ↑ it&apos;s a real shell — type <span className="bg-acid px-1 text-ink">help</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
