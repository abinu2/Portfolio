import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="dark-section border-t-3 border-ink bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="mailto:allanbinu197@gmail.com"
            aria-label="Email Allan"
            className="flex items-center gap-2 border-3 border-paper bg-ink px-4 py-2 font-mono text-xs font-bold uppercase text-paper transition-all duration-fast ease-standard hover:bg-paper hover:text-ink"
          >
            <Mail size={14} aria-hidden="true" />
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/allan-binu"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border-3 border-paper bg-ink px-4 py-2 font-mono text-xs font-bold uppercase text-paper transition-all duration-fast ease-standard hover:bg-paper hover:text-ink"
          >
            <Linkedin size={14} aria-hidden="true" />
            LinkedIn
          </a>
          <a
            href="https://github.com/abinu2"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border-3 border-paper bg-ink px-4 py-2 font-mono text-xs font-bold uppercase text-paper transition-all duration-fast ease-standard hover:bg-paper hover:text-ink"
          >
            <Github size={14} aria-hidden="true" />
            GitHub
          </a>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t-3 border-dashed border-paper-muted pt-6 font-mono text-xs uppercase tracking-widest text-paper-muted md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Allan Binu — Tempe, AZ</span>
          <span className="barcode-paper h-4 w-32" aria-hidden="true" />
          <span>Built with Next.js — no templates were harmed</span>
        </div>
      </div>
    </footer>
  );
}
