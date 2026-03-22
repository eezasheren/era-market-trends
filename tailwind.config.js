/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        era: {
          red: '#D41F30',
          'red-dark': '#B01827',
          'red-light': '#FFF0F1',
          navy: '#1A1A2E',
          gray: '#F2F2F7',
          border: '#E5E7EB',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
