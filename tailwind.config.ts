import type { Config } from 'tailwindcss';
import { colors, typography, radii, motion } from './styles/tokens';

/**
 * Tailwind theme is generated from styles/tokens.ts — never hardcode hex values
 * in className strings. `bg-surface`, `text-accent`, `font-mono`, etc. all
 * resolve to token values.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: colors.background.primary,
          secondary: colors.background.secondary,
          tertiary: colors.background.tertiary,
        },
        accent: {
          DEFAULT: colors.accent.primary,
          secondary: colors.accent.secondary,
        },
        body: {
          DEFAULT: colors.text.primary,
          secondary: colors.text.secondary,
          muted: colors.text.muted,
        },
        edge: {
          subtle: colors.border.subtle,
          visible: colors.border.visible,
        },
        danger: colors.danger,
      },
      fontFamily: {
        sans: [typography.fontFamily.sans, 'system-ui', 'sans-serif'],
        mono: [typography.fontFamily.mono, 'ui-monospace', 'monospace'],
      },
      fontSize: {
        xs: [typography.fontSize.xs, { lineHeight: typography.lineHeight.body }],
        sm: [typography.fontSize.sm, { lineHeight: typography.lineHeight.body }],
        base: [typography.fontSize.base, { lineHeight: typography.lineHeight.body }],
        lg: [typography.fontSize.lg, { lineHeight: typography.lineHeight.body }],
        xl: [typography.fontSize.xl, { lineHeight: typography.lineHeight.heading }],
        '2xl': [typography.fontSize['2xl'], { lineHeight: typography.lineHeight.heading }],
        '3xl': [typography.fontSize['3xl'], { lineHeight: typography.lineHeight.heading }],
        '4xl': [typography.fontSize['4xl'], { lineHeight: typography.lineHeight.heading }],
      },
      borderRadius: {
        badge: radii.badge,
        card: radii.card,
        modal: radii.modal,
        pill: radii.pill,
      },
      transitionDuration: {
        fast: `${motion.duration.fast}ms`,
        base: `${motion.duration.base}ms`,
        slow: `${motion.duration.slow}ms`,
      },
      transitionTimingFunction: {
        standard: motion.easingCss.standard,
        entrance: motion.easingCss.entrance,
        exit: motion.easingCss.exit,
      },
      boxShadow: {
        /** Accent glow used by GlowButton + interactive hovers. */
        glow: '0 0 20px rgba(56, 189, 248, 0.4)',
        'glow-sm': '0 0 12px rgba(56, 189, 248, 0.25)',
      },
      spacing: {
        /* 8px-grid helpers beyond Tailwind defaults (defaults are already 4px-based;
           sections use the multiples-of-8 subset: 2, 4, 6, 8, 10, 12, 16, 20, 24, 32). */
        18: '144px',
        30: '240px',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        blink: 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
};

export default config;
