import FadeInSection from '@/components/ui/FadeInSection';
import Marquee from '@/components/ui/Marquee';
import SectionHeading from '@/components/ui/SectionHeading';
import TimelineItem from '@/components/ui/TimelineItem';
import { EXPERIENCE } from '@/lib/constants';

/**
 * FIELD LOG — experience as numbered log entries pasted into the zine.
 */
export default function Experience() {
  return (
    <>
      <Marquee
        items={['Field Log', 'Smart Contracts', 'Zero Reverts', 'ETL Pipelines', 'CTF', 'Leadership']}
        tone="acid"
      />

      <section id="experience" className="halftone border-b-5 border-ink bg-paper-dim">
        <div className="mx-auto max-w-4xl px-6 py-24 md:px-10">
          <FadeInSection>
            <SectionHeading number="01" title="Field Log" subtitle="experience.log" />
          </FadeInSection>

          <div className="space-y-14">
            {EXPERIENCE.map((item, i) => (
              <FadeInSection key={`${item.role}-${item.company}`} delay={Math.min(i * 0.08, 0.3)}>
                <TimelineItem {...item} index={i} />
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
