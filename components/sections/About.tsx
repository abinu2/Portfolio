import Image from 'next/image';
import FadeInSection from '@/components/ui/FadeInSection';
import Marquee from '@/components/ui/Marquee';
import SectionHeading from '@/components/ui/SectionHeading';
import Sticker from '@/components/ui/Sticker';
import { ABOUT } from '@/lib/constants';

/**
 * DOSSIER — the human behind the terminal. Headshot taped into the zine
 * like a case-file photo, first-person story, a quick-facts record card,
 * and a "currently" stack so the page reads like a person, not a resume.
 */
export default function About() {
  return (
    <>
      <Marquee
        items={['The Dossier', 'Tempe AZ', 'ASU', 'Hacker Devils', 'Wireshark Native', 'Est. 2026']}
        tone="ink"
      />

      <section id="about" className="border-b-5 border-ink bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-10">
          <FadeInSection>
            <SectionHeading number="00" title="The Dossier" subtitle="subject_profile.txt" />
          </FadeInSection>

          <div className="grid grid-cols-1 gap-16 lg:grid-cols-5">
            {/* The photo — taped-in case-file polaroid */}
            <FadeInSection direction="right" className="lg:col-span-2">
              <div className="relative mx-auto max-w-sm">
                {/* Tape strips */}
                <span
                  className="absolute -top-3 left-8 z-10 h-7 w-24 -rotate-6 border-2 border-ink/30 bg-acid/80"
                  aria-hidden="true"
                />
                <span
                  className="absolute -bottom-3 right-8 z-10 h-7 w-24 rotate-6 border-2 border-ink/30 bg-acid/80"
                  aria-hidden="true"
                />

                <figure className="-rotate-2 border-3 border-ink bg-paper p-3 pb-16 shadow-brutal transition-transform duration-base hover:rotate-0">
                  <div className="relative aspect-square overflow-hidden border-3 border-ink">
                    <Image
                      src={ABOUT.headshot}
                      alt="Headshot of Allan Binu"
                      width={800}
                      height={800}
                      className="h-full w-full object-cover transition-transform duration-slow ease-standard hover:scale-105"
                    />
                    {/* Scanline pass over the photo — OS layer */}
                    <div className="scanlines pointer-events-none absolute inset-0" aria-hidden="true" />
                  </div>
                  <figcaption className="absolute bottom-4 left-0 w-full text-center font-mono text-sm font-bold uppercase tracking-widest text-ink">
                    subject: allan_binu
                  </figcaption>
                </figure>

                <div className="absolute -right-4 top-10 z-10">
                  <Sticker tone="shock" rotate={8}>
                    verified human
                  </Sticker>
                </div>
              </div>

              {/* Currently stack */}
              <div className="mt-14 border-3 border-ink bg-ink p-5 shadow-brutal-acid">
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-acid">
                  $ ps aux | grep allan — currently running:
                </p>
                <ul className="mt-3 space-y-2">
                  {ABOUT.currently.map((item) => (
                    <li key={item} className="flex gap-3 font-mono text-sm text-term">
                      <span className="animate-blink" aria-hidden="true">
                        ▸
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInSection>

            {/* The story + record card */}
            <FadeInSection direction="left" className="lg:col-span-3">
              <div>
                <p className="font-display text-3xl uppercase leading-tight text-ink md:text-[40px]">
                  {ABOUT.greeting}
                </p>

                <div className="mt-6 space-y-5">
                  {ABOUT.paragraphs.map((para, i) => (
                    <p key={i} className="text-lg leading-relaxed text-ink">
                      {i === 0 ? (
                        <>
                          <span className="float-left mr-2 font-display text-5xl leading-[0.8] text-shock" aria-hidden="true">
                            {para.charAt(0)}
                          </span>
                          {para.slice(1)}
                        </>
                      ) : (
                        para
                      )}
                    </p>
                  ))}
                </div>

                {/* Quick-facts record card */}
                <div className="mt-10 border-3 border-ink bg-paper-dim shadow-brutal">
                  <div className="flex items-center justify-between border-b-3 border-ink bg-acid px-4 py-2">
                    <span className="font-display text-base uppercase">Record Card</span>
                    <span className="font-mono text-xs font-bold uppercase">grep allan /etc/passwd</span>
                  </div>
                  <dl>
                    {ABOUT.facts.map((fact, i) => (
                      <div
                        key={fact.label}
                        className={`grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[160px_1fr] sm:gap-4 ${
                          i !== ABOUT.facts.length - 1 ? 'border-b-2 border-dashed border-ink/40' : ''
                        }`}
                      >
                        <dt className="font-mono text-xs font-bold uppercase tracking-widest text-shock">
                          {fact.label}:
                        </dt>
                        <dd className="font-mono text-sm text-ink">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>
    </>
  );
}
