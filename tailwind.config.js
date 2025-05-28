/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'lego-red': '#D01012',
        'lego-yellow': '#F7D117',
        'lego-blue': '#0055BF',
        'lego-green': '#237841',
        'lego-black': '#1B1B1B',
      },
      fontFamily: {
        'bricolage': ['var(--font-bricolage)'],
        'brick': ['var(--font-bricolage)'],
      },
      animation: {
        'gradient-x': 'gradient-x 12s ease-in-out infinite',
        'float': 'float 6s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'float-delayed': 'float-delayed 7s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'float-slow': 'float-slow 8s cubic-bezier(0.4, 0, 0.2, 1) infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-8px) rotate(4deg)' },
          '50%': { transform: 'translateY(-15px) rotate(8deg)' },
          '75%': { transform: 'translateY(-8px) rotate(4deg)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-6px) rotate(-4deg)' },
          '50%': { transform: 'translateY(-12px) rotate(-8deg)' },
          '75%': { transform: 'translateY(-6px) rotate(-4deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-5px) rotate(2deg)' },
          '50%': { transform: 'translateY(-10px) rotate(5deg)' },
          '75%': { transform: 'translateY(-5px) rotate(2deg)' },
        },
      },
    },
  },
  plugins: [],
} 