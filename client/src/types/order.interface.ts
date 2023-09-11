export interface IOrder {
	type: string
	text: string
}

export interface IOrderAdmin {
	id: number
	nickname: string
	order: string
	time: string
}

export interface IOrderPrice {
	cost: number
	time: string
}