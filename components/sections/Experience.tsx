import FadeInSection from '@/components/ui/FadeInSection';
import SectionHeading from '@/components/ui/SectionHeading';
import TimelineItem from '@/components/ui/TimelineItem';
import { EXPERIENCE } from '@/lib/constants';

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-4xl px-6 py-24 md:px-8">
      <FadeInSection>
        <SectionHeading number="01" title="Experience" />
      </FadeInSection>

      <div role="list" className="relative ml-2 border-l-2 border-accent/40">
        {EXPERIENCE.map((item, i) => (
          <FadeInSection key={`${item.role}-${item.company}`} delay={i * 0.1}>
            <TimelineItem {...item} />
          </FadeInSection>
        ))}
      </div>
    </section>
  );
}
