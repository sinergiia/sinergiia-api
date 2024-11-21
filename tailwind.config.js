/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#6B46C1',
          blue: '#3B82F6',
        },
      },
    },
  },
  plugins: [],
};