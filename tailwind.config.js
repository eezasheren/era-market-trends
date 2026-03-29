/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── ERA Brand Semantic ───────────────────────────────────────
        era: {
          // Primary — eraRed 500
          red: '#C8102E',
          // Secondary — eraRed 600 (eraDarkred)
          'red-dark': '#990033',
          // Light tint — eraRed 50
          'red-light': '#FDE3E7',
          // Tertiary — eraBlue 500
          blue: '#250E62',
          'blue-light': '#E3DBFA',
          // Neutral background (neutral 50)
          gray: '#F2F2F2',
          border: '#E8E8E8',
          // Navy → eraBlue 500
          navy: '#250E62',
        },

        // ── Full eraRed scale ────────────────────────────────────────
        'era-red': {
          50:  '#FDE3E7',
          100: '#FAC6CF',
          200: '#F692A3',
          300: '#F25A73',
          400: '#EE2647',
          500: '#C8102E',
          600: '#990033',
          700: '#76091C',
          800: '#500613',
          900: '#260309',
          950: '#130204',
        },

        // ── Full eraBlue scale ───────────────────────────────────────
        'era-blue': {
          50:  '#E3DBFA',
          100: '#C8B8F5',
          200: '#9475EB',
          300: '#5D2DE1',
          400: '#3F18AA',
          500: '#250E62',
          600: '#1E0B50',
          700: '#16083A',
          800: '#0F0628',
          900: '#070312',
          950: '#030109',
        },

        // ── Semantic status colours ──────────────────────────────────
        positive: {
          DEFAULT: '#048848',
          50:  '#DCFEEE',
          100: '#BAFDDC',
          200: '#6FFBB7',
          300: '#2AF995',
          400: '#06D06E',
          500: '#048848',
          600: '#036D3A',
          700: '#02542D',
          800: '#02371D',
          900: '#011E10',
          950: '#000F08',
        },
        warning: {
          DEFAULT: '#F6BC2F',
          50:  '#FEF9EB',
          100: '#FDF3D8',
          200: '#FBE5AC',
          300: '#FAD985',
          400: '#F8CB59',
          500: '#F6BC2F',
          600: '#E1A40A',
          700: '#AB7D07',
          800: '#705205',
          900: '#3B2B03',
          950: '#1D1501',
        },
        negative: {
          DEFAULT: '#FF341A',
          50:  '#FFE4E0',
          100: '#FFCDC7',
          200: '#FF9C8F',
          300: '#FF6652',
          400: '#FF341A',
          500: '#E11900',
          600: '#B31500',
          700: '#850F00',
          800: '#5C0B00',
          900: '#2E0500',
          950: '#140200',
        },

        // ── Neutral scale ─────────────────────────────────────────────
        neutral: {
          50:  '#F2F2F2',
          100: '#E8E8E8',
          200: '#CFCFCF',
          300: '#B8B8B8',
          400: '#9E9E9E',
          500: '#868686',
          600: '#6B6B6B',
          700: '#525252',
          800: '#363636',
          900: '#1C1C1C',
          950: '#0D0D0D',
        },

        // ── Neutral variant scale ─────────────────────────────────────
        'neutral-variant': {
          50:  '#F6F4F4',
          100: '#EDE8E8',
          200: '#D9CFCF',
          300: '#C6B8B8',
          400: '#B29F9F',
          500: '#A08888',
          600: '#826868',
          700: '#634F4F',
          800: '#413434',
          900: '#221B1B',
          950: '#110E0E',
        },
      },

      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
