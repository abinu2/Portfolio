import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';

/*
 * Everything below the fold is code-split with next/dynamic so the initial
 * bundle stays lean — the hero paints first, the rest streams in.
 */
const Experience = dynamic(() => import('@/components/sections/Experience'));
const Projects = dynamic(() => import('@/components/sections/Projects'));
const Skills = dynamic(() => import('@/components/sections/Skills'));
const Contact = dynamic(() => import('@/components/sections/Contact'));

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
