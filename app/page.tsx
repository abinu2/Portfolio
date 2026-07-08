import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import FeaturedWork from '@/components/sections/FeaturedWork';
import FieldLog from '@/components/sections/FieldLog';
import Hero from '@/components/sections/Hero';
import LiveFeed from '@/components/sections/LiveFeed';
import Footer from '@/components/layout/Footer';
import Marquee from '@/components/ui/Marquee';
import { marqueeSkills } from '@/data/skills';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee items={[...marqueeSkills]} tone="acid" />
      <About />
      <FeaturedWork />
      <LiveFeed />
      <FieldLog />
      <Contact />
      <Footer />
    </>
  );
}
