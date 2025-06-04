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
        'elsie':["Elsie", 'serif'],
        'dancing': ["Dancing Script", 'cursive']

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
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
