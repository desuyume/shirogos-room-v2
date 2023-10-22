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
