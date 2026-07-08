'use client';

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import { CheckCircle2, Loader2, Mail, Send, XCircle } from 'lucide-react';
import GlowButton from '@/components/ui/GlowButton';
import SectionHeading from '@/components/ui/SectionHeading';
import Sticker from '@/components/ui/Sticker';
import type { ContactApiResponse } from '@/types';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const inputClasses =
  'w-full border-3 border-ink bg-paper px-4 py-3 font-mono text-sm text-ink placeholder:text-ink-muted ' +
  'focus:outline-none focus-visible:outline-none';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      message: String(data.get('message') ?? ''),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await res.json()) as ContactApiResponse;

      if (!res.ok || !result.success) {
        setStatus('error');
        setError(result.error ?? 'Something went wrong. Please try again.');
        return;
      }

      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
      setError('Network error — please email me directly instead.');
    }
  }

  return (
    <section id="contact" className="border-b-3 border-ink bg-paper-dim px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-3xl">
        <SectionHeading number="05" title="Get In Touch" subtitle="sendmail.sh" />

        <div className="mb-10 flex justify-end">
          <div className="w-28 -rotate-3 border-3 border-ink bg-paper p-1.5 shadow-brutal-sm md:w-32">
            <div className="relative aspect-[2/3] w-full overflow-hidden">
              <Image
                src="/photos/asu-stole.webp"
                alt="ASU graduation stole with honor cords"
                fill
                sizes="(min-width: 768px) 128px, 112px"
                className="object-cover"
              />
            </div>
            <div className="pt-1.5">
              <Sticker tone="paper" rotate={0} className="border-2 text-[10px] shadow-none">
                cybersecurity concentration
              </Sticker>
            </div>
          </div>
        </div>

        {status === 'success' ? (
          <div className="flex items-start gap-4 border-3 border-ink bg-term/20 p-8 shadow-brutal">
            <CheckCircle2 size={28} className="shrink-0 text-ink" aria-hidden="true" />
            <div>
              <p className="font-display text-xl uppercase text-ink">Message sent</p>
              <p className="mt-2 text-ink-muted">
                Thanks for reaching out — I&apos;ll get back to you soon. You can also reach me
                directly at{' '}
                <a href="mailto:allanbinu197@gmail.com" className="font-bold text-ink underline">
                  allanbinu197@gmail.com
                </a>
                .
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-ink-muted">
                  Name
                </label>
                <input id="name" name="name" type="text" required maxLength={200} className={inputClasses} placeholder="Jane Doe" />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-ink-muted">
                  Email
                </label>
                <input id="email" name="email" type="email" required maxLength={320} className={inputClasses} placeholder="jane@company.com" />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-ink-muted">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                maxLength={5000}
                rows={6}
                className={inputClasses}
                placeholder="What are you building?"
              />
            </div>

            {status === 'error' && error && (
              <div className="flex items-center gap-2 border-3 border-danger bg-danger/10 px-4 py-3 font-mono text-sm text-ink">
                <XCircle size={16} className="shrink-0 text-danger" aria-hidden="true" />
                {error}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <GlowButton type="submit" variant="primary" disabled={status === 'submitting'}>
                {status === 'submitting' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={18} aria-hidden="true" />
                  </>
                )}
              </GlowButton>

              <a
                href="mailto:allanbinu197@gmail.com"
                className="flex items-center gap-2 font-mono text-sm font-bold uppercase text-ink-muted transition-colors duration-fast hover:text-ink"
              >
                <Mail size={16} aria-hidden="true" />
                or email directly
              </a>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
