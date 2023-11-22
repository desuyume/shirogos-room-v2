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

export interface IOrderType {
	id: number
	type: OrderType
	orderRules: string
}

export type OrderType = 'game' | 'viewing'

export interface IOrderByTypes {
	id: number
	type: OrderType
	cost: number
	text: string
	rules: string | null
	priceId: number
}