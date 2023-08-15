export interface IUniqueRole {
	id: number
	title: string
	type: string
}

export interface ICreateUniqueRole extends Omit<IUniqueRole, 'id'> {}