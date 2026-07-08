import { ArrowDown, Download, MapPin } from 'lucide-react';
import GlowButton from '@/components/ui/GlowButton';
import Sticker from '@/components/ui/Sticker';
import TerminalText from '@/components/ui/TerminalText';

const TERMINAL_LINES = [
  '$ whoami',
  'allan_binu — software engineer / security researcher',
  '',
  '$ cat skills.txt',
  'solidity, python, typescript, react, next.js, hardhat, linux',
  '',
  '$ status --check',
  'open to new-grad SWE + security roles, spring 2026',
];

export default function Hero() {
  return (
    <section id="top" className="graph-paper relative overflow-hidden border-b-3 border-ink">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 md:grid-cols-2 md:items-center md:px-8 md:py-32">
        <div>
          <Sticker tone="shock" rotate={-3} className="mb-6 inline-flex items-center gap-1.5">
            <MapPin size={12} aria-hidden="true" />
            Tempe, Arizona
          </Sticker>

          <h1 className="glitch-hover font-display text-[clamp(48px,10vw,104px)] uppercase leading-[0.9] text-ink">
            Allan
            <br />
            Binu
          </h1>

          <p className="mt-6 max-w-md text-lg text-ink-muted">
            I build systems that have to earn trust — contracts that can&apos;t revert, networks
            that can&apos;t leak, pipelines that can&apos;t lose data. CS @ Arizona State
            University, shipping blockchain security infrastructure at{' '}
            <span className="font-bold text-ink">Kimuntu Power</span>.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <GlowButton href="#work" variant="primary">
              View Work
              <ArrowDown size={18} aria-hidden="true" />
            </GlowButton>
            <GlowButton href="#contact" variant="outline">
              Get in Touch
            </GlowButton>
            <GlowButton href="/resume.pdf" download variant="shock" aria-label="Download Allan's resume (PDF)">
              Resume
              <Download size={18} aria-hidden="true" />
            </GlowButton>
          </div>
        </div>

        <TerminalText lines={TERMINAL_LINES} />
      </div>
    </section>
  );
}
