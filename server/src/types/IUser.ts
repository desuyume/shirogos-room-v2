export interface IUser {
	id: number
	username: string
	email: string
	profile_img?: string
	roomId?: number
	twitchId: number
	discordId?: number
	vkId?: number
	telegramId?: number
}

export interface IUserPayload {
	id: number
	email: string
	role: string
}