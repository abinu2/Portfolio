'use client';

import { useState, type FormEvent } from 'react';
import { Github, Linkedin, Loader2, Mail } from 'lucide-react';
import FadeInSection from '@/components/ui/FadeInSection';
import GlowButton from '@/components/ui/GlowButton';
import SectionHeading from '@/components/ui/SectionHeading';
import Sticker from '@/components/ui/Sticker';
import { SOCIAL_LINKS } from '@/lib/constants';
import type { ContactApiResponse } from '@/types';

const ICONS = { github: Github, linkedin: Linkedin, mail: Mail } as const;
const SOCIAL_TONES = ['bg-acid text-ink', 'bg-cyber text-ink', 'bg-shock text-paper'] as const;

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const inputClasses =
  'w-full border-3 border-ink bg-paper px-4 py-3 font-mono text-sm text-ink ' +
  'placeholder:text-ink-muted/60 transition-colors duration-fast focus:bg-acid/20 focus:outline-none';

/**
 * TRANSMIT — contact section on the ink side of the zine. The form sits
 * on a tilted paper card like a tear-out reply coupon.
 */
export default function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      message: String(formData.get('message') ?? ''),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as ContactApiResponse;

      if (res.ok && data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data.error ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please try again or email me directly.');
    }
  }

  return (
    <section id="contact" className="dark-section scanlines bg-ink">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10">
        <FadeInSection>
          <SectionHeading number="04" title="Transmit" subtitle="contact.sh" inverted />
        </FadeInSection>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left — the pitch */}
          <FadeInSection direction="right">
            <div>
              <p className="font-display text-2xl uppercase leading-tight text-paper md:text-3xl">
                Hire the kid who reads <span className="bg-shock px-2 text-paper">packet dumps</span>{' '}
                for fun.
              </p>
              <p className="mt-6 max-w-md text-lg text-paper-muted">
                I am actively looking for opportunities in cybersecurity engineering, full-stack AI
                development, and blockchain infrastructure. If you are working on something
                interesting or have a role that fits, reach out.
              </p>

              <div className="mt-10 flex gap-5">
                {SOCIAL_LINKS.map((link, i) => {
                  const Icon = ICONS[link.icon];
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.icon === 'mail' ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className={`flex h-14 w-14 items-center justify-center border-3 border-ink shadow-brutal-acid
                                  transition-all duration-fast ease-standard
                                  hover:-translate-x-1 hover:-translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-none
                                  ${SOCIAL_TONES[i % SOCIAL_TONES.length]}`}
                    >
                      <Icon size={22} aria-hidden="true" />
                    </a>
                  );
                })}
              </div>

              <p className="mt-12 font-mono text-xs uppercase tracking-widest text-paper-muted">
                avg_response_time: &lt;24h · encryption: optional · enthusiasm: guaranteed
              </p>
            </div>
          </FadeInSection>

          {/* Right — the reply coupon */}
          <FadeInSection direction="left">
            <div className="relative -rotate-1 border-3 border-ink bg-paper p-6 shadow-brutal-shock transition-transform duration-base hover:rotate-0 md:p-8">
              <div className="absolute -top-4 right-6">
                <Sticker tone="ink" rotate={3} className="text-term">
                  reply_coupon.txt
                </Sticker>
              </div>

              {status === 'success' ? (
                <div className="flex min-h-[320px] flex-col items-center justify-center gap-5 text-center" role="status">
                  <Sticker tone="term" rotate={-4} className="px-5 py-2 text-base">
                    ✓ TRANSMISSION RECEIVED
                  </Sticker>
                  <p className="font-display text-xl uppercase text-ink">Message sent.</p>
                  <p className="font-mono text-sm text-ink-muted">
                    ACK expected within 24 hours. Thanks for reaching out.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-1 block font-mono text-xs font-bold uppercase tracking-widest text-ink"
                    >
                      $ your_name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Jane Recruiter"
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-1 block font-mono text-xs font-bold uppercase tracking-widest text-ink"
                    >
                      $ your_email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@company.com"
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-1 block font-mono text-xs font-bold uppercase tracking-widest text-ink"
                    >
                      $ payload
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      placeholder="What are you building?"
                      className={`${inputClasses} resize-y`}
                    />
                  </div>

                  {status === 'error' && (
                    <p className="border-3 border-danger bg-danger/10 px-3 py-2 font-mono text-sm font-bold text-danger" role="alert">
                      ERR: {errorMessage}
                    </p>
                  )}

                  <GlowButton type="submit" variant="shock" disabled={status === 'submitting'}>
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                        Transmitting…
                      </>
                    ) : (
                      'Send Transmission →'
                    )}
                  </GlowButton>
                </form>
              )}
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
