import { FC } from 'react'
import OrderItem from './OrderItem'
import { Carousel } from '@mantine/carousel'
import slideBttn from '../assets/orders-slide-bttn.svg'

interface IOrdersList {
	isPastOrders: boolean
}

const OrdersList: FC<IOrdersList> = ({ isPastOrders }) => {
	const orders = [
		{
			order: 'WWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
			nickname: 'mercenaryJulian',
			time: '3 часа',
		},
		{
			order: 'Total War: Warhammer 40000 Riptide',
			nickname: 'mercenaryJulian',
			time: '3 часа',
		},
		{
			order: 'WarCraft III The Frozen Throne',
			nickname: 'EgoistManiac',
			time: '2 часа',
		},
		{
			order: 'https://www.youtube.com/watch?v=HEGtfSc6X-I',
			nickname: 'TUSKASTEL',
			time: '',
		},
		{
			order: 'Total War: Warhammer 40000 Riptide',
			nickname: 'mercenaryJulian',
			time: '3 часа',
		},
		{
			order: 'WarCraft III The Frozen Throne',
			nickname: 'EgoistManiac',
			time: '2 часа',
		},
		{
			order: 'https://www.youtube.com/watch?v=HEGtfSc6X-I',
			nickname: 'TUSKASTEL',
			time: '',
		},
		{
			order: 'Total War: Warhammer 40000 Riptide',
			nickname: 'mercenaryJulian',
			time: '3 часа',
		},
		{
			order: 'WarCraft III The Frozen Throne',
			nickname: 'EgoistManiac',
			time: '2 часа',
		},
		{
			order: 'https://www.youtube.com/watch?v=HEGtfSc6X-I',
			nickname: 'TUSKASTEL',
			time: '',
		},
	]

	const pastOrders = [
		{
			order: 'Total War: Warhammer 40000 RiptideTotal War: Warhammer 40000 Riptide',
			nickname: 'mercenaryJulian',
			time: '3 часа',
		},
		{
			order: 'Total War: Warhammer 40000 Riptide',
			nickname: 'mercenaryJulian',
			time: '3 часа',
		},
		{
			order: 'Total War: Warhammer 40000 Riptide',
			nickname: 'mercenaryJulian',
			time: '3 часа',
		},
		{
			order: 'Total War: Warhammer 40000 Riptide',
			nickname: 'mercenaryJulian',
			time: '3 часа',
		},
		{
			order: 'Total War: Warhammer 40000 Riptide',
			nickname: 'mercenaryJulian',
			time: '3 часа',
		},
		{
			order: 'Total War: Warhammer 40000 Riptide',
			nickname: 'mercenaryJulian',
			time: '3 часа',
		},
	]

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
					pastOrders.map((order, index) => (
						<OrderItem
							key={index} // TODO: change key from index to smth else
							index={index + 1}
							nickname={order.nickname}
							order={order.order}
							time={order.time}
							isPastOrders={isPastOrders}
						/>
					))
					:
					orders.map((order, index) => (
						<OrderItem
							key={index} // TODO: change key from index to smth else
							index={index + 1}
							nickname={order.nickname}
							order={order.order}
							time={order.time}
							isPastOrders={isPastOrders}
						/>
					))
				}
			</Carousel>
		</div>
	)
}

export default OrdersList
