import { IFrame } from './frame.interface'

export interface IUser {
	id: number
	username: string | null
	role: string
	twitch: {
		displayName: string
	}
	Room: {
		id: number
	} | null
}

export interface IUserTokens {
	accessToken: string
	refreshToken: string
	user: IUser
	isAuth: boolean
}

export interface IUserProfile {
	username: string | null
	twitch: {
		displayName: string
	}
	dangos: number
	level: number
	profile_img: string | null
	miniature_img: string | null
	frame: IFrame | null
}

export interface IFindUser {
	id: number
	userDisplayName: string
}

export interface IUserStats {
	id: number
	username: string | null
	panopticons: number
	games_ordered: number
	viewing_ordered: number
	dangos: number
	level: number
	exp: number
	clips: number
	legendary_exams: number
	fraction_tournaments: number
}

export interface IAddUserStats {
	value: number
}

export interface IUpdateUsername {
	username: string
}

export interface IUpdateBirthday {
	birthday: Date | null
}

export interface IUpdateGender {
	gender: string
}

enum Gender {
	MALE,
	FEMALE,
}

export interface IConnection {
	id: number
	login: string
	displayName: string
	email: string
	profile_img: string | null
}

export interface IUserInfo {
	id: number
	username: string | null
	birthday: Date
	gender: Gender
	profile_img: string | null
	miniature_img: string | null
	discord: IConnection
	telegram: IConnection
	twitch: IConnection
	vk: IConnection
}
