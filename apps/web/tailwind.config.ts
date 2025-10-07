import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fffef0',
          100: '#fffcd6',
          200: '#fff9ad',
          300: '#fff580',
          400: '#ffed4d',
          500: '#d4af37', // Gold
          600: '#b8941f',
          700: '#9a7816',
          800: '#7d5f0f',
          900: '#5c4508',
        },
        gold: {
          DEFAULT: '#d4af37',
          light: '#f4d03f',
          dark: '#b8941f',
        },
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config;

