import FadeInSection from '@/components/ui/FadeInSection';
import Marquee from '@/components/ui/Marquee';
import SectionHeading from '@/components/ui/SectionHeading';
import SkillBadge from '@/components/ui/SkillBadge';
import { ALL_SKILLS, SKILL_GROUPS } from '@/lib/constants';

const GROUP_LABELS = ['langs/', 'frameworks/', 'systems+sec/', 'ai+chain/'] as const;
const GROUP_TONES = ['bg-acid', 'bg-shock text-paper', 'bg-term', 'bg-cyber'] as const;

/**
 * THE ARSENAL — a wall of stuck-on skill stickers in four crates,
 * sandwiched between two opposing marquee conveyor belts.
 */
export default function Skills() {
  const mid = Math.ceil(ALL_SKILLS.length / 2);

  return (
    <>
      <Marquee items={ALL_SKILLS.slice(0, mid)} tone="ink" separator="/" slow />
      <Marquee items={ALL_SKILLS.slice(mid)} tone="paper" separator="/" reverse className="border-t-0" />

      <section id="skills" className="graph-paper border-b-5 border-ink bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-10">
          <FadeInSection>
            <SectionHeading number="03" title="The Arsenal" subtitle="skills.db" />
          </FadeInSection>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {SKILL_GROUPS.map((group, gi) => (
              <FadeInSection key={group.label} delay={Math.min(gi * 0.08, 0.25)}>
                <div
                  className={`border-3 border-ink bg-paper shadow-brutal transition-all duration-base ease-standard hover:-translate-y-1 hover:shadow-brutal-lg ${
                    gi % 2 === 0 ? 'md:-rotate-1 hover:rotate-0' : 'md:rotate-1 hover:rotate-0'
                  }`}
                >
                  {/* Crate label */}
                  <div className={`flex items-center justify-between border-b-3 border-ink px-4 py-2 ${GROUP_TONES[gi % GROUP_TONES.length]}`}>
                    <h3 className="font-display text-base uppercase tracking-wide">{group.label}</h3>
                    <span className="font-mono text-xs font-bold">
                      ~/{GROUP_LABELS[gi % GROUP_LABELS.length]}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3 p-5">
                    {group.skills.map((skill, si) => (
                      <SkillBadge key={skill} skill={skill} index={gi + si} />
                    ))}
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
