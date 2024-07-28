import { IFrame } from './frame.interface'

export interface IRatingUser {
	id: number
	username: string | null
	twitch: {
		displayName: string
	}
	level: number
	profile_img: string | null
	miniature_img: string | null
	frame: IFrame | null
}
