import { IBackground } from './background.interface'
import { IPanopticon } from './room-content.interface'
import { IUniqueRole } from './unique-role.interface'

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
		dangos: number
		level: number
		exp: number
		profile_img: string
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
}

export interface IRoomCharacters {
	favoriteCharacter: IFavoriteCharacter | null
	characterNames: ICharacterName[]
}

export interface IChooseFavoriteCharacter {
	characterId: number
}

export interface IChooseActiveRoomBackground {
	backgroundId: number
}

export interface IActiveBackground {
	selected_background: IBackground
}

export interface IRoomBackground {
	RoomBackground: IBackground
}

export interface IBuyedRoomBackgrounds {
	buyed_backgrounds: IRoomBackground[]
	selected_background: IBackground
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