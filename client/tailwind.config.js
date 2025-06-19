/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Merriweather', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'amatic': ['"Amatic SC"', 'cursive'],
        'garamond': ['"EB Garamond"', 'serif'],
        'lucida': ['"Lucida Calligraphy"', 'cursive'],
        'abril': ['"Abril Fatface"', 'cursive'],
        'elsie': ["Elsie", 'serif'],
        'dancing': ["Dancing Script", 'cursive']
      },
      keyframes: {
        inkDrop: {
          '0%': { 
            transform: 'translateY(0) scale(0.8)',
            opacity: '0'
          },
          '25%': { 
            transform: 'translateY(-24px) scale(1)',
            opacity: '0.8'
          },
          '50%': {
            transform: 'translateY(0) scale(1.1)',
            opacity: '1'
          },
          '75%': {
            transform: 'translateY(-12px) scale(1)',
            opacity: '0.6'
          },
          '100%': { 
            transform: 'translateY(0) scale(0.8)',
            opacity: '0'
          }
        },
        loaderText: {
          '0%, 100%': {
            opacity: '0.5'
          },
          '50%': {
            opacity: '1'
          }
        }
      },
      animation: {
        'inkDrop': 'inkDrop 3s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'loaderText': 'loaderText 3s ease-in-out infinite'
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'inherit',
            a: {
              color: 'inherit',
              '&:hover': {
                color: 'inherit',
              },
            },
          },
        },
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
