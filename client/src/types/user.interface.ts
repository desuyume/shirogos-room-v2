export interface IUser {
	id: number
	username: string
	role: string
}

export interface IUserTokens {
	accessToken: string
	refreshToken: string
	user: {
		id: number
		username: string
		role: string
	}
	isAuth: boolean
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