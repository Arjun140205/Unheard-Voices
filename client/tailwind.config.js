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
            transform: 'translateY(0) scale(1)',
            opacity: '0'
          },
          '30%': { 
            transform: 'translateY(-10px) scale(1)',
            opacity: '1'
          },
          '60%': { 
            transform: 'translateY(0) scale(1)',
            opacity: '0.5'
          },
          '100%': { 
            transform: 'translateY(0) scale(1)',
            opacity: '0'
          }
        }
      },
      animation: {
        'inkDrop': 'inkDrop 2s ease-in-out infinite'
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
