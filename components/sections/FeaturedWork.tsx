import ProjectCard from '@/components/ui/ProjectCard';
import SectionHeading from '@/components/ui/SectionHeading';
import { featuredProjects } from '@/data/featured-projects';

export default function FeaturedWork() {
  return (
    <section id="work" className="border-b-3 border-ink bg-paper px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading number="02" title="Featured Work" subtitle="curated_exhibits.log" />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
