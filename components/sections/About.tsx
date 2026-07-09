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
            <div className="float-right ml-6 mb-2 w-40 rotate-2 border-3 border-ink bg-paper p-1.5 shadow-brutal-sm md:w-52">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="/photos/grad-2026.webp"
                  alt="Allan in cap and gown in front of the giant 2026 sign at ASU"
                  fill
                  sizes="(min-width: 768px) 208px, 160px"
                  className="object-cover"
                />
              </div>
              <div className="pt-1.5">
                <Sticker tone="paper" rotate={0} className="border-2 shadow-none">
                  CS (Cybersecurity)
                </Sticker>
              </div>
            </div>

            <p>
              Hey, I&apos;m Allan. I graduated from Arizona State University with a degree in
              Computer Science, concentrating in Cybersecurity, and I&apos;m headed into an M.S.
              in Robotics and Autonomous Systems next. I&apos;m happiest building things that have
              to hold up under real pressure, not just look good in a demo.
            </p>
            <p>
              Right now I build production blockchain security infrastructure at{' '}
              <span className="font-bold">Kimuntu Power</span>: Solidity smart contracts, a
              Node.js and Python backend, and a React frontend, all running on a live PostgreSQL
              layer that moves real money.
            </p>
            <p>
              Outside of work I&apos;m VP of Leadership for{' '}
              <span className="font-bold">ASU Hacker Devils</span>, a competitive CTF team ranked
              in the top 30% regionally, and I tutor undergrads in Data Structures and Algorithms.
              For fun, I run a Proxmox home lab with VLAN segmentation and WireGuard, mostly so I
              can break my own network before anyone else gets the chance.
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
