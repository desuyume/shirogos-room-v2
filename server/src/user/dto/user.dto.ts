export class UserDto {
	id: number
	username: string
	email: string
	role: string
	profile_img?: string
	roomId?: number
	twitchId: number
	discordId?: number
	vkId?: number
	telegramId?: number
	
	constructor(model: UserDto) {
		this.id = model.id;
		this.username = model.username;
		this.role = model.role;
	}
}