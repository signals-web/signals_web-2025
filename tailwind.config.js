/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'signals-red': '#eb4b5f',
        'signals-red-dark': '#ee253d',
        'signals-red-deeper': '#da1f2c',
        'signals-navy': '#2c2d43',
        'signals-slate': '#8e9aae',
        'signals-gray': '#eef2f4',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 