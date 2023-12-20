import { FC } from 'react'
import OrderItem from './OrderItem'
import { Carousel } from '@mantine/carousel'
import slideBttn from '@/assets/orders-slide-bttn.svg'
import { IUserOrder } from '@/types/order.interface'

interface IOrdersList {
	isPastOrders: boolean
	orders: IUserOrder[]
}

const OrdersList: FC<IOrdersList> = ({ isPastOrders, orders }) => {
	return (
		<div className='bg-secondary bg-opacity-70 '>
			<Carousel
				height={189}
				orientation='vertical'
				align='start'
				draggable={false}
				styles={{
					controls: {
						width: '100%',
						position: 'absolute',
						bottom: 0,
						left: 0,
						padding: '0',
					},
					control: {
						'&:first-of-type': {
							visibility: 'hidden',
						},
						'&:hover': {
							backgroundColor: 'rgba(24, 24, 24, 0.90) !important',
						},
						transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
						backgroundColor: 'rgba(24, 24, 24, 0.80) !important',
						border: 'none',
						width: '100%',
						height: '2.25rem',
						borderRadius: 0,
						borderBottomLeftRadius: '2.3125rem',
						borderBottomRightRadius: '2.3125rem',
						position: 'absolute',
						bottom: '-2.25rem',
					},
				}}
				nextControlIcon={<img src={slideBttn} alt='slide-bttn' />}
			>
				{isPastOrders
					?
					orders.map((order, index) => (
						<OrderItem
							key={order.id}
							index={index + 1}
							nickname={order.user.username}
							order={order.orderText}
							time={order.orderPrice.text}
							isPastOrders={isPastOrders}
						/>
					))
					:
					orders.map((order, index) => (
						<OrderItem
							key={order.id}
							index={index + 1}
							nickname={order.user.username}
							order={order.orderText}
							time={order.orderPrice.text}
							isPastOrders={isPastOrders}
						/>
					))
				}
			</Carousel>
		</div>
	)
}

export default OrdersList
