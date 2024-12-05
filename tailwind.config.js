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
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
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
