import { FC } from 'react'
import OrdersList from './OrdersList'
import { useCompletedOrders } from '@/api/useCompletedOrders'

interface IPastOrders {
	isPastOrders: boolean
	setIsPastOrders: React.Dispatch<React.SetStateAction<boolean>>
}

const PastOrders: FC<IPastOrders> = ({ isPastOrders, setIsPastOrders }) => {
	const { isLoading, isError, data: orders } = useCompletedOrders()

	return (
		<div
			className={
				(isPastOrders ? 'visible opacity-100' : 'invisible opacity-0') +
				' w-[38.8125rem] h-[18.375rem] absolute top-[11.40rem] right-6 transition-all'
			}
		>
			<div className='bg-tertiary bg-opacity-80 h-[4.3125rem] flex justify-center items-center relative rounded-t-[2.3125rem]'>
				<svg
					className='absolute right-5 cursor-pointer'
					xmlns='http://www.w3.org/2000/svg'
					width='16'
					height='16'
					viewBox='0 0 16 16'
					fill='none'
					onClick={() => setIsPastOrders(false)}
				>
					<circle cx='8' cy='8' r='8' fill='#C34375' />
				</svg>
				<h3 className='text-primary text-[1.875rem]'>Прошлые заказы</h3>
			</div>
			{isLoading ? (
				<div className='w-full h-[14.0625rem] rounded-b-[2.3125rem] bg-tertiary bg-opacity-80 flex justify-center items-center'>
					<p className='text-xl'>Загрузка...</p>
				</div>
			) : isError ? (
				<div className='w-full h-[14.0625rem] rounded-b-[2.3125rem] bg-tertiary bg-opacity-80 flex justify-center items-center'>
					<p className='text-xl'>Ошибка</p>
				</div>
			) : !orders.length ? (
				<div className='w-full h-[14.0625rem] rounded-b-[2.3125rem] bg-tertiary bg-opacity-80 flex justify-center items-center'>
					<p className='text-xl'>Нет прошлых заказов</p>
				</div>
			) : (
				<OrdersList isPastOrders={isPastOrders} orders={orders} />
			)}
		</div>
	)
}

export default PastOrders
