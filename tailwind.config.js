/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/app/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        gold: '#bfa14a',
        luxury: {
          gold: '#bfa14a',
          background: '#fff',
          foreground: '#171717',
        },
      },
      fontFamily: {
        luxury: [
          'Playfair Display',
          'Cormorant Garamond',
          'serif',
        ],
      },
      letterSpacing: {
        luxury: '0.15em',
      },
    },
  },
  plugins: [],
};