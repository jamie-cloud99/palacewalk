/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {
    container: {
      center: true,
      padding: '12px'
    },
    extend: {
      colors: {
        primary: '#E43B30', // red
        dark: {
          DEFAULT: '#121212',
          800: '#525252',
          600: '#919191',
          400: '#D1D1D1',
          200: '#F2F2F2'
        },
        light: '#EFEFDA', // background
        warning: '#E49130' // orange
      },
      fontFamily: {
        serif: ['"Noto Serif TC"', 'serif'],
        sans: ['"Noto Sans TC"', 'sans-serif'],
        cormo: ['"Cormorant SC"', 'serif']
      },
      maxWidth: {
        "screen-sm": "540px",
        "screen-md": "720px",
        "screen-lg": "960px",
        "screen-xl": "1140px",
        "screen-2xl": "1320px",
      },
    }
  },
  plugins: [require('tw-elements/dist/plugin.cjs')]
}
