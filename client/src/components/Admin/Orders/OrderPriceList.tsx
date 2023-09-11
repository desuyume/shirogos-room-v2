import { IOrderPrice } from '@/types/order.interface'
import { FC } from 'react'
import OrderPriceItem from './OrderPriceItem'

const OrderPriceList: FC = () => {
	const prices: IOrderPrice[] = [
		{ cost: 100, time: '1 час' },
		{ cost: 200, time: '2 часа' },
		{ cost: 300, time: '3 часа' },
	]

	return (
		<div className='w-full mb-[0.56rem]'>
			{prices.map(price => (
				<OrderPriceItem key={price.time} cost={price.cost} time={price.time} />
			))}
		</div>
	)
}

export default OrderPriceList
