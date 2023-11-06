export interface IUniqueRole {
	id: number
	title: string
	type: string
	cost: number
}

export interface ICreateUniqueRole extends Omit<IUniqueRole, 'id'> {}