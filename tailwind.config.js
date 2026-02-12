/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        rosario: {
          50: '#e6eef5',
          100: '#ccdde9',
          200: '#99bbd4',
          300: '#6699be',
          400: '#3377a8',
          500: '#0066CC',
          600: '#005299',
          700: '#003366',
          800: '#002244',
          900: '#001122',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E5C964',
          dark: '#B8941E',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Source Sans 3', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
