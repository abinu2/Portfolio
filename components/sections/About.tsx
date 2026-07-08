import Image from 'next/image';
import GlowButton from '@/components/ui/GlowButton';
import SectionHeading from '@/components/ui/SectionHeading';
import Sticker from '@/components/ui/Sticker';
import SkillBadge from '@/components/ui/SkillBadge';
import { skillGroups } from '@/data/skills';

export default function About() {
  return (
    <section id="about" className="border-b-3 border-ink bg-paper px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading number="01" title="About" subtitle="whoami.md" />

        <div className="grid gap-16 md:grid-cols-[1.1fr_1fr]">
          <div className="space-y-5 text-lg text-ink">
            <div className="float-right ml-6 mb-2 w-32 rotate-2 border-3 border-ink bg-paper p-1.5 shadow-brutal-sm md:w-40">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="/photos/grad-2026.webp"
                  alt="Allan in cap and gown in front of the giant 2026 sign at ASU"
                  fill
                  sizes="(min-width: 768px) 160px, 128px"
                  className="object-cover"
                />
              </div>
              <div className="pt-1.5">
                <Sticker tone="paper" rotate={0} className="border-2 shadow-none">
                  class of 2026
                </Sticker>
              </div>
            </div>

            <p>
              I&apos;m a Computer Science student at Arizona State University (Cybersecurity
              concentration, graduating May 2026, headed into an M.S. in Robotics &amp; Autonomous
              Systems) who&apos;d rather ship something that survives an adversarial environment
              than something that just demos well.
            </p>
            <p>
              At <span className="font-bold">Kimuntu Power</span> I build production blockchain
              security infrastructure — Solidity contracts, a Node.js/Python backend, and a React
              frontend sitting on top of a live PostgreSQL layer handling real financial
              transactions.
            </p>
            <p>
              I&apos;m VP of Leadership for <span className="font-bold">ASU Hacker Devils</span>,
              a competitive CTF team ranked top 30% regionally, and I tutor undergrads through
              Data Structures &amp; Algorithms. Off the clock I run a Proxmox home lab with VLAN
              segmentation and WireGuard, mostly to break my own network before something else
              does.
            </p>

            <div className="pt-4">
              <GlowButton href="#contact" variant="shock">
                Say hello
              </GlowButton>
            </div>
          </div>

          <div className="space-y-8">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <p className="mb-3 font-mono text-xs font-bold uppercase tracking-widest text-ink-muted">
                  {'// '}
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill, i) => (
                    <SkillBadge key={skill} skill={skill} index={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
