/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        board: {
          dark: '#000000',
          bg: '#F5F5F5',
          card: '#FFFFFF',
          green: '#DDEFE0',
          yellow: '#F4ECDD',
          pink: '#EFDADA',
          purple: '#DEE0EF',
          gray: '#858585',
        }
      },
      fontFamily: {
        sans: ['Lato', 'Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      borderRadius: {
        '20': '20px',
        '30': '30px',
      },
      boxShadow: {
        card: '0 4px 20px 0 rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
};
