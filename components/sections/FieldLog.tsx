import SectionHeading from '@/components/ui/SectionHeading';
import TimelineItem from '@/components/ui/TimelineItem';
import { experience } from '@/data/experience';

export default function FieldLog() {
  return (
    <section id="experience" className="border-b-3 border-ink bg-paper-dim px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading number="03" title="Field Log" subtitle="experience.log" />

        <div className="space-y-14">
          {experience.map((item, index) => (
            <TimelineItem key={`${item.company}-${item.role}`} index={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
