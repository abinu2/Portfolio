import type { Config } from 'tailwindcss';
import { colors, typography, shadows, motion } from './styles/tokens';

/**
 * Tailwind theme generated from styles/tokens.ts — no raw hex codes in
 * component className strings. Brutalist utilities: `shadow-brutal`,
 * `border-3`, `bg-acid`, `font-display`, `animate-marquee`, etc.
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
        paper: { DEFAULT: colors.paper, dim: colors.paperDim, muted: colors.paperMuted },
        ink: { DEFAULT: colors.ink, soft: colors.inkSoft, muted: colors.inkMuted },
        acid: colors.acid,
        shock: colors.shock,
        term: colors.term,
        violet: colors.violet,
        cyber: colors.cyber,
        danger: colors.danger,
      },
      fontFamily: {
        display: [typography.fontFamily.display, 'Impact', 'sans-serif'],
        sans: [typography.fontFamily.sans, 'system-ui', 'sans-serif'],
        mono: [typography.fontFamily.mono, 'ui-monospace', 'monospace'],
      },
      fontSize: {
        xs: [typography.fontSize.xs, { lineHeight: typography.lineHeight.body }],
        sm: [typography.fontSize.sm, { lineHeight: typography.lineHeight.body }],
        base: [typography.fontSize.base, { lineHeight: typography.lineHeight.body }],
        lg: [typography.fontSize.lg, { lineHeight: typography.lineHeight.body }],
        xl: [typography.fontSize.xl, { lineHeight: '1.1' }],
        '2xl': [typography.fontSize['2xl'], { lineHeight: '1.05' }],
        '3xl': [typography.fontSize['3xl'], { lineHeight: typography.lineHeight.heading }],
        '4xl': [typography.fontSize['4xl'], { lineHeight: typography.lineHeight.heading }],
      },
      borderWidth: {
        3: '3px',
        5: '5px',
      },
      boxShadow: {
        'brutal-sm': shadows.sm,
        brutal: shadows.md,
        'brutal-lg': shadows.lg,
        'brutal-acid': shadows.acid,
        'brutal-shock': shadows.shock,
        'brutal-term': shadows.term,
        none: 'none',
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
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '20%': { transform: 'translate(-3px, 2px)' },
          '40%': { transform: 'translate(3px, -2px)' },
          '60%': { transform: 'translate(-2px, -2px)' },
          '80%': { transform: 'translate(2px, 2px)' },
        },
        'stamp-in': {
          from: { transform: 'scale(2) rotate(12deg)', opacity: '0' },
          to: { transform: 'scale(1) rotate(var(--stamp-rotate, -3deg))', opacity: '1' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'marquee-slow': 'marquee 45s linear infinite',
        'marquee-reverse': 'marquee-reverse 32s linear infinite',
        blink: 'blink 1s step-end infinite',
        glitch: 'glitch 250ms steps(2, end) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
