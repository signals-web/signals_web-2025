/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        signals: {
          red: {
            light: '#eb4b5f',
            DEFAULT: '#FF0054',
            dark: '#da1f2c',
          },
          navy: '#2c2d43',
          gray: {
            light: '#eef2f4',
            DEFAULT: '#8e9aae',
          }
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      lineHeight: {
        'project': '1.5',
      },
      wordSpacing: {
        'project': '0.1em',
      }
    },
  },
  plugins: [],
} 