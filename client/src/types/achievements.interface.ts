export interface IAchievemnt {
	id: number
	title: string
	description: string
	awardType: AwardType[]
	bgImg: string | null
	rooms: number[]
}

export type AwardType =
	| 'badge'
	| 'background'
	| 'unique-role'
	| 'experience'
	| 'frame'
	| 'achieve-bg'

export interface IAchievementFetch {
	id: number
	title: string
	description: string | null
	background: string | null
	AchievementsOnRooms: {
		roomId: number
	}[]
}
