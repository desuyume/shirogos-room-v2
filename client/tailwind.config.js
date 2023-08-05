/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'primary': ['"Days One"', 'sans-serif'],
      'secondary': ['"Open Sans"', 'sans-serif'],
      'tertiary': ['"Russo One"', 'sans-serif'],
      'quaternary': ['"Handjet"', 'cursive']
    },
    extend: {
      screens: {
        '4k': '4000px',
        '2k': '2100px',
        'fullhd': '1800px',
        'medium-desktop': '1500px',
        'min-desktop': '1280px',
        'laptop': '1024px',
        'medium-tablet': '800px',
        'tablet': '640px'
      },
      colors: {
        primary: '#C34375',
				primaryHover: '#FF75AB',
				secondary: '#242424',
				secondaryHover: '#323232',
				tertiary: '#181818',
        primaryText: '#DEDEDE'
      },
      backgroundImage: {
        'orders-hint-bg': "url('/images/orders-about-bg.svg')",
        'wiki': "linear-gradient(to right, #323232 43.23%, #181818 100%)",
        'wiki-character-gradient': "linear-gradient(rgba(255, 255, 255, 1), rgba(0, 0, 0, 0))",
        'wiki-character-gradient-second': "linear-gradient(rgba(0, 0, 0, 0), rgba(255, 255, 255, 1))"
      }
    },
  },
  plugins: [],
}