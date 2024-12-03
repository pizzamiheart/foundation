/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: '#FFFFF3',
      },
      scale: {
        '102': '1.02',
      },
      fontFamily: {
        medieval: ['Cinzel', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};