import {
	IFavoriteCharacter,
	IRoom,
	IRoomAppearance,
	IRoomEditor,
	IStats,
	IUserUniqueRoles,
} from './room.interface'

export interface IRoomGuideRandom {
	id: number
	name: string
	user: {
		id: number
		username: string
		profile_img: string
		miniature_img: string
	}
}

export interface IRoomGuideByLevel {
	id: number
	name: string
	selected_background: {
		id: number
		img: string
	}
	user: {
		id: number
		username: string
		level: number
		profile_img: string
		miniature_img: string
	}
}

export interface IRoomGuideByLevelRes {
	totalPages: number
	rooms: IRoomGuideByLevel[]
}

export interface IRoomGuideWidgetInfo {
	stats: IStats
	favorite_character: IFavoriteCharacter
	unique_role: IUserUniqueRoles
}

export interface IRoomGuide {
	room: IRoom
	editor: IRoomEditor
	roomAppearance: IRoomAppearance
	widgetsInfo: IRoomGuideWidgetInfo
}
