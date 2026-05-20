/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'leo-purple': {
          50: '#f3f4ff',
          100: '#e8eaff',
          200: '#d4d8ff',
          300: '#b5bbff',
          400: '#9196ff',
          500: '#6b70ff',
          600: '#5b47ff',
          700: '#4c38e8',
          800: '#3e2fba',
          900: '#352a93'
        },
        'leo-pink': {
          50: '#fef7ff',
          100: '#fceeff',
          200: '#f8ddff',
          300: '#f2c2ff',
          400: '#e998ff',
          500: '#dd6eff',
          600: '#c845f0',
          700: '#a82dd1',
          800: '#8b25aa',
          900: '#722189'
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.4s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    },
  },
  plugins: [],
}
