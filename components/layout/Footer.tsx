import { Github, Linkedin, Mail } from 'lucide-react';
import { SITE, SOCIAL_LINKS } from '@/lib/constants';

const ICONS = { github: Github, linkedin: Linkedin, mail: Mail } as const;

export default function Footer() {
  return (
    <footer className="border-t-5 border-ink bg-ink">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-10 md:flex-row md:justify-between md:px-10">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <p className="font-mono text-sm font-bold uppercase tracking-widest text-term">
            &gt; EOF — designed &amp; built by {SITE.name} © {new Date().getFullYear()}
          </p>
          <p className="font-mono text-xs uppercase tracking-widest text-paper-muted">
            no templates were harmed in the making of this site
          </p>
        </div>

        <div className="flex items-center gap-6">
          <span className="barcode-paper hidden h-8 w-28 opacity-60 md:block" aria-hidden="true" />
          <div className="flex gap-3">
            {SOCIAL_LINKS.map((link) => {
              const Icon = ICONS[link.icon];
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.icon === 'mail' ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="border-2 border-term/40 p-2 text-term transition-all duration-fast hover:border-acid hover:bg-acid hover:text-ink"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
