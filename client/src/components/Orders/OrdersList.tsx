import { FC } from 'react'
import OrderItem from './OrderItem'
import { Carousel } from '@mantine/carousel'
import { IUserOrder } from '@/types/order.interface'

interface IOrdersList {
	isPastOrders: boolean
	orders: IUserOrder[]
}

const OrdersList: FC<IOrdersList> = ({ isPastOrders, orders }) => {
	return (
		<Carousel
			height={207}
			orientation='vertical'
			align='start'
			draggable={false}
			styles={{
				root: {
					backgroundColor: 'rgba(36, 36, 36, 0.70)',
				},
				controls: {
					width: '100%',
					position: 'absolute',
					bottom: 0,
					left: 0,
					padding: '0',
					display: 'flex',
				},
				control: {
					'&:first-of-type': {
						left: 0,
						borderBottomLeftRadius: '2.3125rem',
					},
					'&:last-of-type': {
						right: 0,
						borderBottomRightRadius: '2.3125rem',
					},
					'&:hover': {
						backgroundColor: 'rgba(24, 24, 24, 0.9) !important',
					},
					'&:active': {
						transform: 'none',
					},
					backgroundColor: 'rgba(24, 24, 24, 1) !important',
					opacity: 1,
					transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
					border: 'none',
					width: '50%',
					height: '2.25rem',
					borderRadius: 0,
					position: 'absolute',
					bottom: '-2.25rem',
				},
			}}
			nextControlIcon={
				<svg
					width='60'
					height='16'
					viewBox='0 0 60 16'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M30 16L0.555139 0.249998L59.4449 0.250003L30 16Z'
						fill='#D9D9D9'
					/>
				</svg>
			}
			previousControlIcon={
				<svg
					width='60'
					height='16'
					viewBox='0 0 60 16'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path d='M30 0L59.4449 15.75L0.555136 15.75L30 0Z' fill='#D9D9D9' />
				</svg>
			}
		>
			{orders &&
				orders.map((order, index) => (
					<OrderItem
						key={order.id}
						index={index + 1}
						nickname={order.user.username}
						order={order.orderText}
						time={order.orderPrice.text}
						isPastOrders={isPastOrders}
					/>
				))}
		</Carousel>
	)
}

export default OrdersList
