/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			primary: ['"Days One"', 'sans-serif'],
			secondary: ['"Open Sans"', 'sans-serif'],
			tertiary: ['"Russo One"', 'sans-serif'],
			quaternary: ['"Handjet"', 'cursive'],
			pressStart: ['"Press Start 2P"', 'cursive'],
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
				pink: '#C34375',
				pinkHover: '#FF75AB',
				vermilion: '#C34343',
				vermilionHover: '#FA8D8D',
				orange: '#C37143',
				orangeHover: '#F1A57B',
				blue: '#4367C3',
				blueHover: '#7C9AE8',
				purple: '#7B43C3',
				purpleHover: '#A77BDF',
				magenta: '#C343B6',
				magentaHover: '#F281E7',
				gray: '#717171',
				grayHover: '#ACACAC',
				green: '#4A9648',
				greenHover: '#80D77E',
				yellow: '#BE9C25',
				yellowHover: '#F0CF5B',
				aqua: '#34A3AA',
				aquaHover: '#7DD9D3',
				red: '#A80000',
				redHover: '#DD4242',
				turquoise: '#00A880',
				turquoiseHover: '#47D8B5',
				crimson: '#A4114A',
				crimsonHover: '#DE5389',
			},
			backgroundImage: {
				'room-info-gray-gradient':
					'linear-gradient(to bottom, #323232 0%, rgba(0, 0, 0, 0) 88%)',
				'room-info-pink-gradient':
					'linear-gradient(to left, #C34375 0%, rgba(255, 255, 255, 0) 98%)',
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
				'room-gradient-revert':
					'linear-gradient(180deg, rgba(195, 67, 117, 0.90) -82.24%, rgba(36, 36, 36, 0.90) 70.58%)',
				'streamer-bg': "url('/images/streamer-bg.gif')",
				'black-to-secondary-gradient':
					'linear-gradient(135deg, #000000 0%, #242424 100%)',
				'room-guide-screen-gradient':
					'linear-gradient(180deg, #181818 0%, #640026 100%)',

				'room-gradient-pink':
					'linear-gradient(180deg, rgba(24, 24, 24, 0.50) 0%, rgba(195, 67, 117, 0.50) 100%)',
				'room-gradient-vermilion':
					'linear-gradient(180deg, rgba(24, 24, 24, 0.50) 0%, rgba(195, 67, 67, 0.50) 100%)',
				'room-gradient-orange':
					'linear-gradient(180deg, rgba(24, 24, 24, 0.50) 0%, rgba(195, 113, 67, 0.50) 100%)',
				'room-gradient-blue':
					'linear-gradient(180deg, rgba(24, 24, 24, 0.50) 0%, rgba(67, 103, 195, 0.50) 100%)',
				'room-gradient-purple':
					'linear-gradient(180deg, rgba(24, 24, 24, 0.50) 0%, rgba(123, 67, 195, 0.50) 100%)',
				'room-gradient-magenta':
					'linear-gradient(180deg, rgba(24, 24, 24, 0.50) 0%, rgba(195, 67, 182, 0.50) 100%)',
				'room-gradient-gray':
					'linear-gradient(180deg, rgba(24, 24, 24, 0.50) 0%, rgba(113, 113, 113, 0.50) 100%)',
				'room-gradient-green':
					'linear-gradient(180deg, rgba(24, 24, 24, 0.50) 0%, rgba(74, 150, 72, 0.50) 100%)',
				'room-gradient-yellow':
					'linear-gradient(180deg, rgba(24, 24, 24, 0.50) 0%, rgba(190, 156, 37, 0.50) 100%)',
				'room-gradient-aqua':
					'linear-gradient(180deg, rgba(24, 24, 24, 0.50) 0%, rgba(52, 163, 170, 0.50) 100%)',
				'room-gradient-red':
					'linear-gradient(180deg, rgba(24, 24, 24, 0.50) 0%, rgba(168, 0, 0, 0.50) 100%)',
				'room-gradient-turquoise':
					'linear-gradient(180deg, rgba(24, 24, 24, 0.50) 0%, rgba(0, 168, 128, 0.50) 100%)',
				'room-gradient-crimson':
					'linear-gradient(180deg, rgba(24, 24, 24, 0.50) 0%, rgba(164, 17, 74, 0.50) 100%)',

				'room-gradient-revert-pink':
					'linear-gradient(180deg, rgba(195, 67, 117, 0.90) -82.24%, rgba(36, 36, 36, 0.90) 70.58%)',
				'room-gradient-revert-vermilion':
					'linear-gradient(180deg, rgba(195, 67, 67, 0.90) -82.24%, rgba(36, 36, 36, 0.90) 70.58%)',
				'room-gradient-revert-orange':
					'linear-gradient(180deg, rgba(195, 113, 67, 0.90) -82.24%, rgba(36, 36, 36, 0.90) 70.58%)',
				'room-gradient-revert-blue':
					'linear-gradient(180deg, rgba(67, 103, 195, 0.90) -82.24%, rgba(36, 36, 36, 0.90) 70.58%)',
				'room-gradient-revert-purple':
					'linear-gradient(180deg, rgba(123, 67, 195, 0.90) -82.24%, rgba(36, 36, 36, 0.90) 70.58%)',
				'room-gradient-revert-magenta':
					'linear-gradient(180deg, rgba(195, 67, 182, 0.90) -82.24%, rgba(36, 36, 36, 0.90) 70.58%)',
				'room-gradient-revert-gray':
					'linear-gradient(180deg, rgba(113, 113, 113, 0.90) -82.24%, rgba(36, 36, 36, 0.90) 70.58%)',
				'room-gradient-revert-green':
					'linear-gradient(180deg, rgba(74, 150, 72, 0.90) -82.24%, rgba(36, 36, 36, 0.90) 70.58%)',
				'room-gradient-revert-yellow':
					'linear-gradient(180deg, rgba(190, 156, 37, 0.90) -82.24%, rgba(36, 36, 36, 0.90) 70.58%)',
				'room-gradient-revert-aqua':
					'linear-gradient(180deg, rgba(52, 163, 170, 0.90) -82.24%, rgba(36, 36, 36, 0.90) 70.58%)',
				'room-gradient-revert-red':
					'linear-gradient(180deg, rgba(168, 0, 0, 0.90) -82.24%, rgba(36, 36, 36, 0.90) 70.58%)',
				'room-gradient-revert-turquoise':
					'linear-gradient(180deg, rgba(0, 168, 128, 0.90) -82.24%, rgba(36, 36, 36, 0.90) 70.58%)',
				'room-gradient-revert-crimson':
					'linear-gradient(180deg, rgba(164, 17, 74, 0.90) -82.24%, rgba(36, 36, 36, 0.90) 70.58%)',
			},
			boxShadow: {
				'notification': '0 2px 40px -13px #000'
			}
		},
	},
	plugins: [],
}
