/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'l3-1': {
          '0%': { 'border-radius': '50% 0 0 50%' },
          '25%': { 'border-radius': '50% 50% 0 0' },
          '50%': { 'border-radius': '0 50% 50% 0' },
          '75%': { 'border-radius': '0 0 50% 50%' },
          '100%': { 'border-radius': '50% 0 0 50%' },
        },
        'l3-2': {
          '0%': { transform: 'scaleX(var(--s,1)) rotate(0deg)' },
          '100%': { transform: 'scaleX(var(--s,1)) rotate(-360deg)' },
        },
      },
      animation: {
        'l3-1': 'l3-1 2s infinite linear',
        'l3-2': 'l3-2 2s infinite linear',
      },
    },
  },
  plugins: [],
};
