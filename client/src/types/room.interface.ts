import { RoomColor } from '@/consts/roomColors'
import { IBackground } from './background.interface'
import { IPanopticon } from './panopticon.interface'
import { IUniqueRole } from './unique-role.interface'
import { IBadge } from './badge.interface'
import { IFrame } from './frame.interface'

export interface ICreateRoom {
	roomName: string
	username: string
}

export interface IPastUsername {
	id: number
	username: string
	created_at: Date
}

export interface IRoom {
	id: number
	name: string
	created_at: Date
	user: {
		username: string
		twitch: {
			login: string
		}
		dangos: number
		level: number
		exp: number
		profile_img: string | null
		past_usernames: IPastUsername[]
	}
}

export interface IRoomColor {
	id: number
	name: string
	hex: string
	cost: number
}

export interface IBuyRoomColor {
	roomColorId: number
	cost: number
}

export interface IUserRoomColors {
	roomColors: IRoomColor[]
	usernameColors: IRoomColor[]
	userColors: {
		room_colors: string[]
		active_room_color: string
		username_colors: string[]
		active_username_color: string
	}
}

export interface IRoomAppearance {
	active_room_color: RoomColor
	active_username_color: RoomColor
	selected_background: IBackground
}

export interface IChangeRoomColor {
	color: string
}

interface IUniqueRoleObj {
	UniqueRole: IUniqueRole
}

export interface IUserUniqueRoles {
	selected_unique_role_adjective: string | null
	selected_unique_role_noun: string | null
	unique_roles: IUniqueRoleObj[]
}

export interface IChangeUniqueRole {
	role: string | null
}

export interface ICharacterName {
	id: number
	name: string
}

export interface IFavoriteCharacter {
	id: number
	name: string
	miniature_img: string
}

export interface IRoomCharacters {
	favoriteCharacter: IFavoriteCharacter | null
	characterNames: ICharacterName[]
}

export interface IChooseFavoriteCharacter {
	characterId: number
}

export interface IChooseActiveRoomBackground {
	backgroundId: number | null
}

export interface IActiveBackground {
	selected_background: IBackground
}

export interface IRoomBackground {
	Background: IBackground
}

export interface IBuyedRoomBackgrounds {
	buyed_backgrounds: IRoomBackground[]
	selected_background: IBackground | null
}

export interface IBoutiqueBackground {
	backgrounds: IBackground[]
	buyedBackgrounds: IBackground[]
}

export interface IChooseActiveRoomFrame {
	frameId: number | null
}

export interface IActiveFrame {
	selected_frame: IFrame
}

export interface IRoomFrame {
	Frame: IFrame
}

export interface IBuyedRoomFrames {
	buyed_frames: IRoomFrame[]
	selected_frame: IFrame | null
}

export interface IChangeRoomName {
	roomName: string
}

export interface IBuyUniqueRole {
	uniqueRoleId: number
}

export interface IBoutiqueUniqueRoles {
	adjectiveRole: IUniqueRole
	nounRole: IUniqueRole
	isAdjectiveBuyed: boolean
	isNounBuyed: boolean
}

export interface IMakeOrder {
	orderPriceId: number
	orderText: string
}

export interface IBuyedPanopticon {
	Panopticon: IPanopticon
	buyed_at: Date
	buyed_cost: number
}

export interface IRoomPanopticons {
	panopticons: IPanopticon[]
	buyedPanopticons: IBuyedPanopticon[]
}

export interface IBuyRoomPanopticon {
	panopticonId: number
}

export interface IStats {
	panopticons_count: number
	clips: number
	games_ordered: number
}

export interface IUpdateRoomEditor {
	notepad_text: string
	widgets: IEditorWidgetFetch[]
	badges: IEditorBadgeFetch[]
}

export interface IRoomEditor {
	notepad_text: string
	widgets: IEditorWidgetFetch[]
	badges: {
		id: number
		width: number
		height: number
		translateX: number
		translateY: number
		zIndex: number
		badge: IBadge
	}[]
}

export type WidgetType =
	| 'UNIQUE_ROLE'
	| 'STATISTIC'
	| 'FAVORITE_CHARACTER'
	| 'NOTEPAD'

export interface IEditorWidgetFetch {
	widgetType: WidgetType
	translateX: number
	translateY: number
	zIndex: number
}

export interface IEditorBadgeFetch {
	badgeId: number
	width: number
	height: number
	translateX: number
	translateY: number
	zIndex: number
}
