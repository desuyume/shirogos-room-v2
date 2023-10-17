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