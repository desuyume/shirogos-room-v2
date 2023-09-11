export interface IUser {
	id: number
	email: string
	role: string
}

export interface IUserTokens {
	accessToken: string
	refreshToken: string
	user: {
		id: number
		email: string
		role: string
	}
	isAuth: boolean
}

export interface IFindUser {
	id: number
	username: string
}