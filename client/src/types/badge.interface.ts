export interface IBadge {
	id: number
	cost: number
	title: string
	img: string
	type: IBadgeType
	isForSale: boolean
}

export interface IBadgeType {
	id: number
	type: BadgeType
	title: string
}

export interface ICreateAward {
	cost: number
	title: string
	typeId: number
	awardImg: string
}

export interface IBoutiqueBadge {
	badges: IBadge[]
	buyedBadges: IBadge[]
}

export type BadgeType = 'unique' | 'copyright' | 'common'
