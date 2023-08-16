export interface IRoomContent {
	id: number
	cost: number
	img: string
	type: string
}

export interface ICreateRoomContent extends Omit<IRoomContent, 'id'> {}