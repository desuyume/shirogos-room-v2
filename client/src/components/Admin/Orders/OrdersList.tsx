import { FC } from 'react'
import OrderItem from './OrderItem'
import { Scrollbar } from 'react-scrollbars-custom'
import { IUserOrder } from '@/types/order.interface'

interface IOrdersList {
	orders: IUserOrder[]
}

const OrdersList: FC<IOrdersList> = ({ orders }) => {
	return (
		<Scrollbar
			noDefaultStyles
			style={{ width: '100%', height: '23.75rem', marginBottom: '0.5rem' }}
		>
			{orders.map((order, index) => (
				<OrderItem
					key={order.id}
					index={index + 1}
					id={order.id}
					nickname={order.user.username}
					order={order.orderText}
					time={order.orderPrice.text}
				/>
			))}
		</Scrollbar>
	)
}

export default OrdersList
