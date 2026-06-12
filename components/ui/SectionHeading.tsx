interface SectionHeadingProps {
  /** Numbered prefix, e.g. "01". */
  number: string;
  title: string;
  subtitle?: string;
}

/**
 * Section heading with a muted numeric prefix and a decorative rule
 * extending to the right edge.
 */
export default function SectionHeading({ number, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-4">
        <h2 className="flex items-baseline gap-3 whitespace-nowrap text-2xl font-bold text-body">
          <span className="font-mono text-lg font-medium text-body-muted" aria-hidden="true">
            {number}.
          </span>
          {title}
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-accent/60 to-transparent" aria-hidden="true" />
      </div>
      {subtitle ? <p className="mt-2 text-base text-body-secondary">{subtitle}</p> : null}
    </div>
  );
}
