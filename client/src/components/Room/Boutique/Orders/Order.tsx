import { FC } from 'react'
import OrderInput from './OrderInput'
import Price from './Price'
import { IOrder } from '@/types/order.interface'

interface OrderProps { 
	finalPrice: number
	setFinalPrice: React.Dispatch<React.SetStateAction<number>>
	isOrdered: boolean
	clickBuy: () => void
	type: string
	orders: IOrder[] | null
	setOrders: React.Dispatch<React.SetStateAction<IOrder[] | null>>
}

const Order: FC<OrderProps> = ({ finalPrice, setFinalPrice, isOrdered, clickBuy, type, orders, setOrders }) => {
	const orderTypes = {
		"1h": {
			type: "1h",
			text: "1 час",
			price: 100
		},
		"2h": {
			type: "2h",
			text: "2 часа",
			price: 200
		},
		"3h": {
			type: "3h",
			text: "3 часа",
			price: 300
		},
		"xVideo": {
			type: "xVideo",
			text: "Видео X",
			price: 100
		},
		"yVideo": {
			type: "yVideo",
			text: "Видео Y",
			price: 200
		},
		"movie": {
			type: "movie",
			text: "Фильм-лот",
			price: 300
		}
	}

	return (
		<div className='flex-1 flex flex-col items-center justify-between pt-[0.69rem] transition-all'>
			<h2 className='text-primaryText text-[2.1875rem] leading-[97.795%]'>
				Заказ игры
			</h2>
			<div className='w-[78.9%]'>
				<OrderInput isOrdered={isOrdered} type={type === 'game' ? orderTypes['1h'].type : orderTypes.xVideo.type} time={type === 'game' ? orderTypes['1h'].text : orderTypes.xVideo.text} price={type === 'game' ? orderTypes['1h'].price : orderTypes.xVideo.price} setFinalPrice={setFinalPrice} orders={orders} setOrders={setOrders} />
				<OrderInput isOrdered={isOrdered} type={type === 'game' ? orderTypes['2h'].type : orderTypes.yVideo.type} time={type === 'game' ? orderTypes['2h'].text : orderTypes.yVideo.text} price={type === 'game' ? orderTypes['2h'].price : orderTypes.yVideo.price} setFinalPrice={setFinalPrice} orders={orders} setOrders={setOrders} />
				<OrderInput isOrdered={isOrdered} type={type === 'game' ? orderTypes['3h'].type : orderTypes.movie.type} time={type === 'game' ? orderTypes['3h'].text : orderTypes.movie.text} price={type === 'game' ? orderTypes['3h'].price : orderTypes.movie.price} setFinalPrice={setFinalPrice} orders={orders} setOrders={setOrders} />
			</div>
			<Price clickBuy={clickBuy} finalPrice={finalPrice} />
		</div>
	)
}

export default Order
