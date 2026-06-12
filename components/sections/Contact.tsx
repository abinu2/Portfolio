'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle2, Github, Linkedin, Loader2, Mail } from 'lucide-react';
import FadeInSection from '@/components/ui/FadeInSection';
import GlowButton from '@/components/ui/GlowButton';
import SectionHeading from '@/components/ui/SectionHeading';
import { SOCIAL_LINKS } from '@/lib/constants';
import type { ContactApiResponse } from '@/types';

const ICONS = { github: Github, linkedin: Linkedin, mail: Mail } as const;

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const inputClasses =
  'w-full rounded-card border border-edge-visible bg-bg-secondary px-4 py-3 text-sm text-body ' +
  'placeholder:text-body-muted transition-colors duration-fast focus:border-accent focus:outline-none';

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);
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
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24 md:px-8">
      <FadeInSection>
        <SectionHeading number="04" title="Get In Touch" />
      </FadeInSection>

      <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
        {/* Left — pitch + social links */}
        <FadeInSection direction="right">
          <div>
            <p className="text-base text-body-secondary">
              I am actively looking for opportunities in cybersecurity engineering, full-stack AI
              development, and blockchain infrastructure. If you are working on something
              interesting or have a role that fits, reach out.
            </p>

            <div className="mt-8 flex gap-4">
              {SOCIAL_LINKS.map((link) => {
                const Icon = ICONS[link.icon];
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.icon === 'mail' ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="flex h-12 w-12 items-center justify-center rounded-card border border-edge-visible
                               text-body-secondary transition-all duration-fast ease-standard
                               hover:border-accent hover:text-accent hover:shadow-glow-sm"
                  >
                    <Icon size={20} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </FadeInSection>

        {/* Right — contact form */}
        <FadeInSection direction="left">
          {status === 'success' ? (
            <div
              className="flex h-full min-h-[280px] flex-col items-center justify-center gap-4 rounded-card
                         border border-accent-secondary/40 bg-accent-secondary/5 p-8 text-center"
              role="status"
            >
              <CheckCircle2 size={40} className="text-accent-secondary" aria-hidden="true" />
              <p className="text-lg font-semibold text-body">Message sent.</p>
              <p className="text-sm text-body-secondary">
                Thanks for reaching out — I will get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              <div>
                <label htmlFor="contact-name" className="mb-1 block text-sm font-medium text-body-secondary">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="mb-1 block text-sm font-medium text-body-secondary">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-1 block text-sm font-medium text-body-secondary">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="What are you working on?"
                  className={`${inputClasses} resize-y`}
                />
              </div>

              {status === 'error' && (
                <p className="text-sm text-danger" role="alert">
                  {errorMessage}
                </p>
              )}

              <GlowButton type="submit" variant="primary" disabled={status === 'submitting'}>
                {status === 'submitting' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  'Send Message'
                )}
              </GlowButton>
            </form>
          )}
        </FadeInSection>
      </div>
    </section>
  );
}
