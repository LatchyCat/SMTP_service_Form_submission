/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brazilian Green - Primary brand color, represents growth and craftsmanship
        'brand': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',  // Primary brand green
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        // Construction Brown - Represents woodwork and trim
        'trim': {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',  // Primary wood tone
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b',
        },
        // Brazilian Yellow - Accent color
        'accent': {
          50: '#fff9eb',
          100: '#ffefc2',
          200: '#ffe085',
          300: '#ffd147',
          400: '#ffc20e',  // Vibrant accent yellow
          500: '#e6aa00',
          600: '#cc8a00',
          700: '#a36500',
          800: '#854f00',
          900: '#713e00',
        },
        // Industrial Blue - Professional/Business color
        'industrial': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0284c7',  // Professional blue
          600: '#0369a1',
          700: '#075985',
          800: '#0c4a6e',
          900: '#083344',
        },
        // Neutral grays for construction theme
        'construct': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',  // Professional gray
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      // Add custom font families if desired
      fontFamily: {
        'heading': ['Montserrat', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
