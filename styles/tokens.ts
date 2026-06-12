/**
 * Design tokens — the single source of truth for every visual decision on the site.
 *
 * Nothing outside this file may declare a raw hex code, px size, or cubic-bezier.
 * `tailwind.config.ts` consumes these values to generate utility classes, and
 * components that need inline values (canvas drawing, Framer Motion transitions)
 * import them directly.
 */

export const colors = {
  background: {
    /** Deep slate — page background. */
    primary: '#0F172A',
    /** Elevated surfaces: cards, drawers, form fields. */
    secondary: '#1E293B',
    /** Deepest layer: hero, terminal card. */
    tertiary: '#0D1117',
  },
  accent: {
    /** Electric sky blue — primary interactive/highlight color. */
    primary: '#38BDF8',
    /** Emerald green — success states and sparing secondary highlights. */
    secondary: '#34D399',
  },
  text: {
    primary: '#F1F5F9',
    secondary: '#94A3B8',
    muted: '#475569',
  },
  border: {
    subtle: '#1E293B',
    visible: '#334155',
  },
  /** For security-related visual cues only. */
  danger: '#F87171',
} as const;

export const typography = {
  fontFamily: {
    /** UI text. Loaded via next/font in app/layout.tsx as a CSS variable. */
    sans: 'var(--font-inter)',
    /** Code fragments, terminal output, skill tags. */
    mono: 'var(--font-jetbrains-mono)',
  },
  /** Type scale in px. */
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
    '4xl': '64px',
  },
  lineHeight: {
    body: '1.7',
    heading: '1.2',
  },
  fontWeight: {
    body: 400,
    label: 500,
    subheading: 600,
    heading: 700,
  },
} as const;

/** 8px base unit. All padding/margin/gap values are multiples of this. */
export const spacing = {
  unit: 8,
  scale: {
    1: '8px',
    2: '16px',
    3: '24px',
    4: '32px',
    5: '40px',
    6: '48px',
    8: '64px',
    10: '80px',
    12: '96px',
    16: '128px',
  },
} as const;

export const radii = {
  /** Tags and badges. */
  badge: '4px',
  /** Cards. */
  card: '8px',
  /** Modals and drawers. */
  modal: '12px',
  /** Pills. */
  pill: '9999px',
} as const;

export const motion = {
  duration: {
    /** Hover transitions. */
    fast: 150,
    /** Reveals, state changes. */
    base: 300,
    /** Page-level entrances. */
    slow: 600,
  },
  easing: {
    standard: [0.4, 0, 0.2, 1] as const,
    entrance: [0, 0, 0.2, 1] as const,
    exit: [0.4, 0, 1, 1] as const,
  },
  /** CSS string forms for non-Framer usage (transitions, keyframes). */
  easingCss: {
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
    entrance: 'cubic-bezier(0, 0, 0.2, 1)',
    exit: 'cubic-bezier(0.4, 0, 1, 1)',
  },
} as const;

/** Hero particle field — tuned to read as a network-traffic visualization. */
export const particles = {
  countDesktop: 80,
  countMobile: 40,
  opacity: 0.3,
  linkDistance: 120,
  color: '#F1F5F9',
} as const;

export const tokens = { colors, typography, spacing, radii, motion, particles } as const;

export default tokens;
