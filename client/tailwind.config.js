/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'primary': ['"Days One"', 'sans-serif'],
      'secondary': ['"Open Sans"', 'sans-serif']
    },
    extend: {
      colors: {
        primary: '#C34375',
				primaryHover: '#FF75AB',
				secondary: '#242424',
				secondaryHover: '#323232',
				tertiary: '#181818',
      }
    },
  },
  plugins: [],
}