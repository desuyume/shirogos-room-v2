import { FC } from 'react'
import OrdersList from './OrdersList'
import AddOrder from './AddOrder'
import { IOrderAdmin } from '@/types/order.interface'

const OrdersContent: FC = () => {
	const orders: IOrderAdmin[] = [
		{
			id: 1,
			nickname: 'mercenaryJulian',
			order: 'Total War: Warhammer 40000 Riptide',
			time: '3 часа',
		},
		{
			id: 2,
			nickname: 'mercenaryJulian',
			order: 'Total War: Warhammer 40000 Riptide',
			time: '3 часа',
		},
	]

	return (
		<div className='w-[60%] orders-admin'>
			<div className='w-[76.2%] h-[2.9375rem] bg-tertiary flex [&>p]:h-full [&>p]:flex [&>p]:justify-center [&>p]:items-center [&>p]:text-[#FFF] [&>p]:font-secondary [&>p]:text-xl [&>p]:font-bold [&>p]:text-center'>
				<p className='w-[6.59%]'>#</p>
				<p className='w-[25%]'>Никнейм</p>
				<p className='flex-1'>Заказ</p>
				<p className='w-[23.8%]'>На сколько</p>
			</div>
			<OrdersList orders={orders} />
			<AddOrder index={orders.length + 1} />
		</div>
	)
}

export default OrdersContent
