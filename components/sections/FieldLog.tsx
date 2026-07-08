import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import Sticker from '@/components/ui/Sticker';
import TimelineItem from '@/components/ui/TimelineItem';
import { experience } from '@/data/experience';

export default function FieldLog() {
  return (
    <section id="experience" className="border-b-3 border-ink bg-paper-dim px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading number="04" title="Field Log" subtitle="experience.log" />

        <div className="mb-14 flex justify-end">
          <div className="w-40 rotate-2 border-3 border-ink bg-paper p-1.5 shadow-brutal-sm md:w-48">
            <div className="relative aspect-[3/2] w-full overflow-hidden">
              <Image
                src="/photos/team-presentation.webp"
                alt="Allan presenting a project with his team at a final selection event"
                fill
                sizes="(min-width: 768px) 192px, 160px"
                className="object-cover"
              />
            </div>
            <div className="pt-1.5">
              <Sticker tone="paper" rotate={0} className="border-2 shadow-none">
                shipping under pressure
              </Sticker>
            </div>
          </div>
        </div>

        <div className="space-y-14">
          {experience.map((item, index) => (
            <TimelineItem key={`${item.company}-${item.role}`} index={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
