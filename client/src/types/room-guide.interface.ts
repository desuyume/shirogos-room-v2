import { IFrame } from './frame.interface'
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
	selected_frame: IFrame | null
	user: {
		id: number
		username: string
		twitch: {
			login: string
		}
		profile_img: string
		miniature_img: string
	}
}

export interface IRoomGuideByLevel {
	id: number
	name: string
	selected_frame: IFrame | null
	selected_background: {
		id: number
		img: string
	}
	user: {
		id: number
		username: string
		twitch: {
			login: string
		}
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
