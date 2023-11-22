export interface IRoomContent {
	id: number
	cost: number
	img: string
	type: string
}

export interface ICreateRoomContent extends Omit<IRoomContent, 'id'> {}

export interface IPanopticon {
	id: number
  title: string | null
  description: string | null
  cost: number
  img: string
}