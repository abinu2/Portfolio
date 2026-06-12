/**
 * Design tokens — NEO-BRUTALIST ZINE × HACKER OS.
 *
 * Cream paper + pure ink, acid and shock accents, terminal green for the
 * OS layer. Hard offset shadows, thick borders, zero blur, zero gradients
 * (except halftone/scanline textures). Every component pulls from here.
 */

export const colors = {
  /** Cream paper — the zine page. */
  paper: '#F2EDE3',
  /** Slightly darker paper for alternating surfaces. */
  paperDim: '#E6DfD0',
  /** Pure ink — borders, type, dark sections. */
  ink: '#0D0D0D',
  /** Soft ink for elevated dark surfaces. */
  inkSoft: '#1A1A1A',
  /** Acid yellow-green — primary shout color. */
  acid: '#D9FF00',
  /** Shock pink — secondary shout color. */
  shock: '#FF2E63',
  /** Terminal green — the hacker OS layer. */
  term: '#00FF66',
  /** Electric violet — tertiary accent. */
  violet: '#7C3AED',
  /** Cyber blue — quaternary accent. */
  cyber: '#00C2FF',
  /** Alert red — security cues only. */
  danger: '#FF3B30',
  /** Muted ink for secondary text on paper. */
  inkMuted: '#4A463C',
  /** Muted paper for secondary text on ink. */
  paperMuted: '#A8A294',
} as const;

export const typography = {
  fontFamily: {
    /** Massive display headings. Loaded via next/font as CSS variable. */
    display: 'var(--font-display)',
    /** Body text. */
    sans: 'var(--font-body)',
    /** Terminal, code, tags, stamps. */
    mono: 'var(--font-jetbrains-mono)',
  },
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
    body: '1.6',
    heading: '0.95',
  },
} as const;

/** 8px base unit. */
export const spacing = { unit: 8 } as const;

export const radii = {
  /** Brutalism is square. Pills are the one exception. */
  none: '0px',
  pill: '9999px',
} as const;

export const borders = {
  thin: '2px',
  thick: '3px',
  heavy: '5px',
} as const;

/** Hard offset shadows — never blurred. */
export const shadows = {
  sm: `4px 4px 0 0 ${colors.ink}`,
  md: `8px 8px 0 0 ${colors.ink}`,
  lg: `12px 12px 0 0 ${colors.ink}`,
  acid: `8px 8px 0 0 ${colors.acid}`,
  shock: `8px 8px 0 0 ${colors.shock}`,
  term: `8px 8px 0 0 ${colors.term}`,
} as const;

export const motion = {
  duration: {
    fast: 150,
    base: 300,
    slow: 600,
  },
  easing: {
    standard: [0.4, 0, 0.2, 1] as const,
    entrance: [0, 0, 0.2, 1] as const,
    exit: [0.4, 0, 1, 1] as const,
  },
  easingCss: {
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
    entrance: 'cubic-bezier(0, 0, 0.2, 1)',
    exit: 'cubic-bezier(0.4, 0, 1, 1)',
  },
} as const;

export const tokens = { colors, typography, spacing, radii, borders, shadows, motion } as const;

export default tokens;
