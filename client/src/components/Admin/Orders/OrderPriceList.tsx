import { IOrderByTypes } from '@/types/order.interface'
import { FC } from 'react'
import OrderPriceItem from './OrderPriceItem'

interface IOrderPriceList { 
	prices: IOrderByTypes[]
}

const OrderPriceList: FC<IOrderPriceList> = ({ prices }) => {
	return (
		<div className='w-full mb-[0.56rem]'>
			{prices.length && prices.map(price => (
				<OrderPriceItem key={price.id} id={price.id} cost={price.cost} time={price.text} />
			))}
		</div>
	)
}

export default OrderPriceList
