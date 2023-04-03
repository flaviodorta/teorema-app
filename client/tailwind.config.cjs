/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-100': '#6e28cc',
        'primary-200': '#5820a3',
        'primary-300': '#42187a',
      },
      boxShadow: {
        normal: '0 4px 9px -4px #6e28cc',
        active:
          '0 8px 9px -4px rgba(110, 40, 204,0.3),0 4px 18px 0 rgba(110, 40, 204,0.2)',
        focus:
          '0 8px 9px -4px rgba(110, 40, 204,0.3),0 4px 18px 0 rgba(110, 40, 204,0.2)',
        hover:
          '0 8px 9px -4px rgba(110, 40, 204,0.3),0 4px 18px 0 rgba(110, 40, 204,0.2)',
      },
    },
  },
  plugins: [],
};
