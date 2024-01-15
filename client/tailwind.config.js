/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			primary: ['"Days One"', 'sans-serif'],
			secondary: ['"Open Sans"', 'sans-serif'],
			tertiary: ['"Russo One"', 'sans-serif'],
			quaternary: ['"Handjet"', 'cursive'],
		},
		extend: {
			screens: {
				'4k': '4000px',
				'2k': '2100px',
				fullhd: '1800px',
				'medium-desktop': '1500px',
				'min-desktop': '1280px',
				laptop: '1024px',
				'medium-tablet': '800px',
				tablet: '640px',
			},
			colors: {
				primary: '#C34375',
				primaryHover: '#FF75AB',
				secondary: '#242424',
				secondaryHover: '#323232',
				tertiary: '#181818',
				primaryText: '#DEDEDE',
			},
			backgroundImage: {
				'orders-hint-bg': "url('/images/orders-about-bg.svg')",
				wiki: 'linear-gradient(to right, #323232 43.23%, #181818 100%)',
				'wiki-character-gradient':
					'linear-gradient(rgba(255, 255, 255, 1), rgba(0, 0, 0, 0))',
				'wiki-character-gradient-second':
					'linear-gradient(rgba(0, 0, 0, 0), rgba(255, 255, 255, 1))',
				'room-default-bg': "url('/images/room-default-bg.png')",
				'room-gradient':
					'linear-gradient(180deg, rgba(24, 24, 24, 0.50) 0%, rgba(195, 67, 117, 0.50) 100%)',
				'room-gameOrder-bg':
					'linear-gradient(180deg, rgba(24, 24, 24, 0.50) 0%, rgba(36, 36, 36, 0.50) 100%)',
				'room-orderDone-bg':
					'linear-gradient(180deg, rgba(24, 24, 24, 0.90) 0%, rgba(36, 36, 36, 0.90) 100%)',
				'room-buyPanopticon-bg':
					'linear-gradient(180deg, rgba(195, 67, 117, 0.90) -82.24%, rgba(36, 36, 36, 0.90) 70.58%)',
				'streamer-bg': "url('/images/streamer-bg.png')",
			},
		},
	},
	plugins: [],
}
