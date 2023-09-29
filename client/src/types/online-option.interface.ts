export interface IOnlineOption {
	id: number
	title: string
}

export interface ICreateOnlineOption extends Omit<IOnlineOption, 'id'> {}