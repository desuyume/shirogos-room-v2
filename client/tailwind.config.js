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
        'wiki': "linear-gradient(to right, #323232 43.23%, #181818 100%);" 
      }
    },
  },
  plugins: [],
}