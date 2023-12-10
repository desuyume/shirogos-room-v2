import { FC } from 'react'
import OrdersList from './OrdersList'
import AddOrder from './AddOrder'
import { usePendingOrders } from '@/api/usePendingOrders'

const OrdersContent: FC = () => {
	const { data: orders, isLoading, isError } = usePendingOrders()

	return (
		<div className='w-[60%] orders-admin'>
			<div className='w-[76.2%] h-[2.9375rem] bg-tertiary flex [&>p]:h-full [&>p]:flex [&>p]:justify-center [&>p]:items-center [&>p]:text-[#FFF] [&>p]:font-secondary [&>p]:text-xl [&>p]:font-bold [&>p]:text-center'>
				<p className='w-[6.59%]'>#</p>
				<p className='w-[25%]'>Никнейм</p>
				<p className='flex-1'>Заказ</p>
				<p className='w-[20%]'>На сколько</p>
			</div>
			{isLoading ? (
				<div className='w-[76.2%] h-[27.5rem] flex justify-center items-center'>
					<p>Загрузка...</p>
				</div>
			) : isError ? (
				<div className='w-[76.2%] h-[27.5rem] flex justify-center items-center'>
					<p>Ошибка</p>
				</div>
			) : (
				<>
					<OrdersList orders={orders} />
					<AddOrder index={orders.length + 1} />
				</>
			)}
		</div>
	)
}

export default OrdersContent
