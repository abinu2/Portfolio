import FadeInSection from '@/components/ui/FadeInSection';
import SectionHeading from '@/components/ui/SectionHeading';
import SkillBadge from '@/components/ui/SkillBadge';
import { ALL_SKILLS, SKILL_GROUPS } from '@/lib/constants';

/**
 * Infinite marquee ticker. The track holds the skill list twice; the CSS
 * keyframe translates it -50% so the loop is seamless, behind edge fades.
 */
function SkillTicker() {
  const doubled = [...ALL_SKILLS, ...ALL_SKILLS];
  return (
    <div className="marquee-mask relative mb-16 overflow-hidden py-2" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-8">
        {doubled.map((skill, i) => (
          <span key={`${skill}-${i}`} className="whitespace-nowrap font-mono text-sm text-body-muted">
            {skill}
            <span className="ml-8 text-accent/60">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-24 md:px-8">
      <FadeInSection>
        <SectionHeading number="03" title="Technical Skills" />
      </FadeInSection>

      <FadeInSection>
        <SkillTicker />
      </FadeInSection>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {SKILL_GROUPS.map((group, i) => (
          <FadeInSection key={group.label} delay={i * 0.1}>
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-body">
                <span className="font-mono text-accent" aria-hidden="true">
                  ▸
                </span>
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <SkillBadge key={skill} skill={skill} />
                ))}
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  );
}
