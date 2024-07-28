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

export interface IFetchedOrderPrice {
	id: number
	orderTypeId: number | null
	cost: number
	text: string
}

export interface IOrderRules {
	rules: string
}

export interface ICreateOrderManually {
	orderPriceId: number
	userId: number
	orderText: string
}

export interface IOrderPrice {
	cost: number
	text: string
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

export interface IUpdateOrderPrice {
	cost: number
	text: string
}

export interface IUpdateOrderRules {
	rules: string
}

enum OrderStatus {
	PENDING = 'PENDING',
	COMPLETED = 'COMPLETED',
	REJECTED = 'REJECTED',
}

export interface IUserOrder {
	id: number
	orderText: string
	orderPrice: IOrderPrice
	orderType: {
		type: OrderType
	}
	status: OrderStatus
	user: {
		username: string
		twitch: {
			displayName: string
		}
	}
}
