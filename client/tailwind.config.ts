import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(0 0% 100%)',
        foreground: 'hsl(222.2 47.4% 11.2%)',
        primary: {
          DEFAULT: 'hsl(221.2 83.2% 53.3%)',
          foreground: 'hsl(210 40% 98%)',
        },
        secondary: {
          DEFAULT: 'hsl(210 40% 96%)',
          foreground: 'hsl(222.2 47.4% 11.2%)',
        },
        muted: {
          DEFAULT: 'hsl(210 40% 96%)',
          foreground: 'hsl(215.4 16.3% 46.9%)',
        },
        destructive: {
          DEFAULT: 'hsl(0 84.2% 60.2%)',
          foreground: 'hsl(210 40% 98%)',
        },
        border: 'hsl(214.3 31.8% 91.4%)',
        input: 'hsl(214.3 31.8% 91.4%)',
        ring: 'hsl(221.2 83.2% 53.3%)',
      },
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.375rem',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
