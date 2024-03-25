interface IRoomColor {
	name: RoomColor
	hex: string
	cost: number
}

export type RoomColor =
	| 'pink'
	| 'vermilion'
	| 'orange'
	| 'blue'
	| 'purple'
	| 'magenta'
	| 'gray'
	| 'green'
	| 'yellow'
	| 'aqua'
	| 'red'
	| 'turquoise'
	| 'crimson'

type ColorType = 'bg' | 'text' | 'border' | 'caret' | 'bgRoomGradient' | 'bgRoomGradientRevert'
type ColorTypeHover = 'bg' | 'text' | 'border' | 'outline'
type ColorTypeFocus = 'border'
type ColorTypeDisabled = 'bg'
type ColorTypeGroupHover = 'bg' | 'text'
type ColorTypeMediumTablet = 'bg'

export const roomColors: IRoomColor[] = [
	{ name: 'pink', hex: '#C34375', cost: 100 },
	{ name: 'vermilion', hex: '#C34343', cost: 100 },
	{ name: 'orange', hex: '#C37143', cost: 100 },
	{ name: 'blue', hex: '#4367C3', cost: 100 },
	{ name: 'purple', hex: '#7B43C3', cost: 100 },
	{ name: 'magenta', hex: '#C343B6', cost: 100 },
	{ name: 'gray', hex: '#717171', cost: 100 },
	{ name: 'green', hex: '#4A9648', cost: 100 },
	{ name: 'yellow', hex: '#BE9C25', cost: 100 },
	{ name: 'aqua', hex: '#34A3AA', cost: 100 },
	{ name: 'red', hex: '#A80000', cost: 100 },
	{ name: 'turquoise', hex: '#00A880', cost: 100 },
	{ name: 'crimson', hex: '#A4114A', cost: 100 },
]

export const colorVariants: Record<ColorType, Record<RoomColor, string>> = {
	bg: {
		pink: 'bg-pink',
		vermilion: 'bg-vermilion',
		orange: 'bg-orange',
		blue: 'bg-blue',
		purple: 'bg-purple',
		magenta: 'bg-magenta',
		gray: 'bg-gray',
		green: 'bg-green',
		yellow: 'bg-yellow',
		aqua: 'bg-aqua',
		red: 'bg-red',
		turquoise: 'bg-turquoise',
		crimson: 'bg-crimson',
	},
	text: {
		pink: 'text-pink',
		vermilion: 'text-vermilion',
		orange: 'text-orange',
		blue: 'text-blue',
		purple: 'text-purple',
		magenta: 'text-magenta',
		gray: 'text-gray',
		green: 'text-green',
		yellow: 'text-yellow',
		aqua: 'text-aqua',
		red: 'text-red',
		turquoise: 'text-turquoise',
		crimson: 'text-crimson',
	},
	border: {
		pink: 'border-pink',
		vermilion: 'border-vermilion',
		orange: 'border-orange',
		blue: 'border-blue',
		purple: 'border-purple',
		magenta: 'border-magenta',
		gray: 'border-gray',
		green: 'border-green',
		yellow: 'border-yellow',
		aqua: 'border-aqua',
		red: 'border-red',
		turquoise: 'border-turquoise',
		crimson: 'border-crimson',
	},
	caret: {
		pink: 'caret-pink',
		vermilion: 'caret-vermilion',
		orange: 'caret-orange',
		blue: 'caret-blue',
		purple: 'caret-purple',
		magenta: 'caret-magenta',
		gray: 'caret-gray',
		green: 'caret-green',
		yellow: 'caret-yellow',
		aqua: 'caret-aqua',
		red: 'caret-red',
		turquoise: 'caret-turquoise',
		crimson: 'caret-crimson',
	},
	bgRoomGradient: {
		pink: 'bg-room-gradient-pink',
		vermilion: 'bg-room-gradient-vermilion',
		orange: 'bg-room-gradient-orange',
		blue: 'bg-room-gradient-blue',
		purple: 'bg-room-gradient-purple',
		magenta: 'bg-room-gradient-magenta',
		gray: 'bg-room-gradient-gray',
		green: 'bg-room-gradient-green',
		yellow: 'bg-room-gradient-yellow',
		aqua: 'bg-room-gradient-aqua',
		red: 'bg-room-gradient-red',
		turquoise: 'bg-room-gradient-turquoise',
		crimson: 'bg-room-gradient-crimson',
	},
	bgRoomGradientRevert: {
		pink: 'bg-room-gradient-revert-pink',
		vermilion: 'bg-room-gradient-revert-vermilion',
		orange: 'bg-room-gradient-revert-orange',
		blue: 'bg-room-gradient-revert-blue',
		purple: 'bg-room-gradient-revert-purple',
		magenta: 'bg-room-gradient-revert-magenta',
		gray: 'bg-room-gradient-revert-gray',
		green: 'bg-room-gradient-revert-green',
		yellow: 'bg-room-gradient-revert-yellow',
		aqua: 'bg-room-gradient-revert-aqua',
		red: 'bg-room-gradient-revert-red',
		turquoise: 'bg-room-gradient-revert-turquoise',
		crimson: 'bg-room-gradient-revert-crimson',
	}
}

export const colorVariantsHover: Record<
	ColorTypeHover,
	Record<RoomColor, string>
> = {
	bg: {
		pink: 'hover:bg-pinkHover',
		vermilion: 'hover:bg-vermilionHover',
		orange: 'hover:bg-orangeHover',
		blue: 'hover:bg-blueHover',
		purple: 'hover:bg-purpleHover',
		magenta: 'hover:bg-magentaHover',
		gray: 'hover:bg-grayHover',
		green: 'hover:bg-greenHover',
		yellow: 'hover:bg-yellowHover',
		aqua: 'hover:bg-aquaHover',
		red: 'hover:bg-redHover',
		turquoise: 'hover:bg-turquoiseHover',
		crimson: 'hover:bg-crimsonHover',
	},
	text: {
		pink: 'hover:text-pinkHover',
		vermilion: 'hover:text-vermilionHover',
		orange: 'hover:text-orangeHover',
		blue: 'hover:text-blueHover',
		purple: 'hover:text-purpleHover',
		magenta: 'hover:text-magentaHover',
		gray: 'hover:text-grayHover',
		green: 'hover:text-greenHover',
		yellow: 'hover:text-yellowHover',
		aqua: 'hover:text-aquaHover',
		red: 'hover:text-redHover',
		turquoise: 'hover:text-turquoiseHover',
		crimson: 'hover:text-crimsonHover',
	},
	border: {
		pink: 'hover:border-pinkHover',
		vermilion: 'hover:border-vermilionHover',
		orange: 'hover:border-orangeHover',
		blue: 'hover:border-blueHover',
		purple: 'hover:border-purpleHover',
		magenta: 'hover:border-magentaHover',
		gray: 'hover:border-grayHover',
		green: 'hover:border-greenHover',
		yellow: 'hover:border-yellowHover',
		aqua: 'hover:border-aquaHover',
		red: 'hover:border-redHover',
		turquoise: 'hover:border-turquoiseHover',
		crimson: 'hover:border-crimsonHover',
	},
	outline: {
		pink: 'hover:outline-pinkHover',
		vermilion: 'hover:outline-vermilionHover',
		orange: 'hover:outline-orangeHover',
		blue: 'hover:outline-blueHover',
		purple: 'hover:outline-purpleHover',
		magenta: 'hover:outline-magentaHover',
		gray: 'hover:outline-grayHover',
		green: 'hover:outline-greenHover',
		yellow: 'hover:outline-yellowHover',
		aqua: 'hover:outline-aquaHover',
		red: 'hover:outline-redHover',
		turquoise: 'hover:outline-turquoiseHover',
		crimson: 'hover:outline-crimsonHover',
	}
}

export const colorVariantsFocus: Record<
	ColorTypeFocus,
	Record<RoomColor, string>
> = {
	border: {
		pink: 'focus:border-pinkHover',
		vermilion: 'focus:border-vermilionHover',
		orange: 'focus:border-orangeHover',
		blue: 'focus:border-blueHover',
		purple: 'focus:border-purpleHover',
		magenta: 'focus:border-magentaHover',
		gray: 'focus:border-grayHover',
		green: 'focus:border-greenHover',
		yellow: 'focus:border-yellowHover',
		aqua: 'focus:border-aquaHover',
		red: 'focus:border-redHover',
		turquoise: 'focus:border-turquoiseHover',
		crimson: 'focus:border-crimsonHover',
	},
}

export const colorVariantsDisabled: Record<
	ColorTypeDisabled,
	Record<RoomColor, string>
> = {
	bg: {
		pink: 'disabled:bg-pink',
		vermilion: 'disabled:bg-vermilion',
		orange: 'disabled:bg-orange',
		blue: 'disabled:bg-blue',
		purple: 'disabled:bg-purple',
		magenta: 'disabled:bg-magenta',
		gray: 'disabled:bg-gray',
		green: 'disabled:bg-green',
		yellow: 'disabled:bg-yellow',
		aqua: 'disabled:bg-aqua',
		red: 'disabled:bg-red',
		turquoise: 'disabled:bg-turquoise',
		crimson: 'disabled:bg-crimson',
	},
}

export const colorVariantsGroupHover: Record<
	ColorTypeGroupHover,
	Record<RoomColor, string>
> = {
	bg: {
		pink: 'group-hover:bg-pinkHover',
		vermilion: 'group-hover:bg-vermilionHover',
		orange: 'group-hover:bg-orangeHover',
		blue: 'group-hover:bg-blueHover',
		purple: 'group-hover:bg-purpleHover',
		magenta: 'group-hover:bg-magentaHover',
		gray: 'group-hover:bg-grayHover',
		green: 'group-hover:bg-greenHover',
		yellow: 'group-hover:bg-yellowHover',
		aqua: 'group-hover:bg-aquaHover',
		red: 'group-hover:bg-redHover',
		turquoise: 'group-hover:bg-turquoiseHover',
		crimson: 'group-hover:bg-crimsonHover',
	},
	text: {
		pink: 'group-hover:text-pinkHover',
		vermilion: 'group-hover:text-vermilionHover',
		orange: 'group-hover:text-orangeHover',
		blue: 'group-hover:text-blueHover',
		purple: 'group-hover:text-purpleHover',
		magenta: 'group-hover:text-magentaHover',
		gray: 'group-hover:text-grayHover',
		green: 'group-hover:text-greenHover',
		yellow: 'group-hover:text-yellowHover',
		aqua: 'group-hover:text-aquaHover',
		red: 'group-hover:text-redHover',
		turquoise: 'group-hover:text-turquoiseHover',
		crimson: 'group-hover:text-crimsonHover',
	}
}

export const colorVariantsMediumTablet: Record<
	ColorTypeMediumTablet,
	Record<RoomColor, string>
> = {
	bg: {
		pink: 'medium-tablet:bg-pink',
		vermilion: 'medium-tablet:bg-vermilion',
		orange: 'medium-tablet:bg-orange',
		blue: 'medium-tablet:bg-blue',
		purple: 'medium-tablet:bg-purple',
		magenta: 'medium-tablet:bg-magenta',
		gray: 'medium-tablet:bg-gray',
		green: 'medium-tablet:bg-green',
		yellow: 'medium-tablet:bg-yellow',
		aqua: 'medium-tablet:bg-aqua',
		red: 'medium-tablet:bg-red',
		turquoise: 'medium-tablet:bg-turquoise',
		crimson: 'medium-tablet:bg-crimson',
	},
}