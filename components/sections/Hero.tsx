import Image from 'next/image';
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
  'open to new-grad SWE + security roles',
];

export default function Hero() {
  return (
    <section id="top" className="graph-paper relative overflow-hidden border-b-3 border-ink">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 md:grid-cols-2 md:items-center md:px-8 md:py-32">
        <div>
          <div className="mb-6 w-16 -rotate-3 border-3 border-ink shadow-brutal-sm md:w-20">
            <Image
              src="/headshot.png"
              alt="Portrait of Allan Binu"
              width={200}
              height={200}
              className="block h-auto w-full object-cover"
              priority
            />
          </div>

          <h1 className="glitch-hover font-display text-[clamp(48px,10vw,104px)] uppercase leading-[0.9] text-ink">
            Allan
            <br />
            Binu
          </h1>

          <p className="mt-6 max-w-md text-lg text-ink-muted">
            I&apos;m a Computer Science graduate of Arizona State University building blockchain
            security infrastructure at <span className="font-bold text-ink">Kimuntu Power</span>.
            I focus on systems that have to earn trust: contracts that can&apos;t revert, networks
            that can&apos;t leak, and data that can&apos;t go missing.
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

        <div>
          <TerminalText lines={TERMINAL_LINES} />

          {/* Grad stole — pasted right underneath the terminal, zine-collage style */}
          <div className="ml-auto mt-6 w-28 rotate-3 border-3 border-ink bg-paper p-1.5 shadow-brutal md:w-32">
            <div className="relative aspect-[2/3] w-full overflow-hidden">
              <Image
                src="/photos/asu-stole.webp"
                alt="ASU graduation stole with honor cords"
                fill
                sizes="128px"
                className="object-cover"
              />
            </div>
            <div className="pt-1.5">
              <Sticker
                tone="cyber"
                rotate={0}
                className="inline-flex items-center gap-1 border-2 text-[10px] shadow-none"
              >
                <MapPin size={10} aria-hidden="true" />
                Tempe, Arizona
              </Sticker>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
