export interface IUser {
	id: number
	username: string
	role: string
}

export interface IUserTokens {
	accessToken: string
	refreshToken: string
	user: IUser
	isAuth: boolean
}

export interface IUserProfile {
	username: string
	dangos: number
	level: number
	profile_img: string | null
}

export interface IFindUser {
	id: number
	username: string
}

export interface IUserStats {
	id: number
	username: string
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
	username: string
	birthday: Date
	gender: Gender
	profile_img: string | null
	discord: IConnection
	telegram: IConnection
	twitch: IConnection
	vk: IConnection
}
