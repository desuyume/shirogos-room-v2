import { FC } from 'react'
import OrderItem from './OrderItem'
import { Scrollbar } from 'react-scrollbars-custom'
import { IOrderAdmin } from '@/types/order.interface'

interface IOrdersList { 
	orders: IOrderAdmin[]
}

const OrdersList: FC<IOrdersList> = ({ orders }) => {
	return (
		<Scrollbar noDefaultStyles style={{ width: '100%', height: '23.75rem' }}>
			{orders.map(order => (
				<OrderItem
					key={order.id}
					id={order.id}
					nickname={order.nickname}
					order={order.order}
					time={order.time}
				/>
			))}
		</Scrollbar>
	)
}

export default OrdersList
