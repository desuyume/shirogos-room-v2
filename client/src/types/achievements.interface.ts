export interface IAchievemnt {
	id: number
	name: string
	description: string
	awardType: AwardType[]
	bgImg: string | null
	users: string[]
}

type AwardType = 'badge' | 'background' | 'unique-role' | 'experience'