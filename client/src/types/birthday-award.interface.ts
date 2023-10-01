export interface IBirthdayAward {
	id: number
	award: number
}

export interface IUpdateBirthadyAward extends Omit<IBirthdayAward, 'id'> {}