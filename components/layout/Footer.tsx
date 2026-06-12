import { Github, Linkedin, Mail } from 'lucide-react';
import { SITE, SOCIAL_LINKS } from '@/lib/constants';

const ICONS = { github: Github, linkedin: Linkedin, mail: Mail } as const;

export default function Footer() {
  return (
    <footer className="border-t border-edge-subtle">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-8 md:flex-row md:justify-between md:px-8">
        <p className="font-mono text-xs text-body-muted">
          <span className="text-accent">&gt;</span> Designed &amp; built by {SITE.name} ·{' '}
          {new Date().getFullYear()}
        </p>

        <div className="flex gap-2">
          {SOCIAL_LINKS.map((link) => {
            const Icon = ICONS[link.icon];
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.icon === 'mail' ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={link.label}
                className="rounded-badge p-2 text-body-muted transition-colors duration-fast hover:text-accent"
              >
                <Icon size={18} aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
