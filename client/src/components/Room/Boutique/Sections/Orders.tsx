import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import OrderSection from '../Orders/OrderSection'
import { useOrderTypes } from '@/api/useOrderTypes'

const Orders: FC = () => {
	const location = useLocation()
	const isActive =
		location.pathname === '/room/boutique/orders' ||
		location.pathname === '/room/boutique/orders/'

	const { data: orderTypes, isLoading, isError } = useOrderTypes()

	return (
		<div
			className={
				(isActive ? 'block ' : 'hidden ') +
				'h-[47.125rem] flex flex-col justify-between pl-[9rem] pr-6 py-[0.94rem]'
			}
		>
			{isLoading ? (
				<div className='w-full h-full flex justify-center items-center'>
					<p className='text-xl text-primaryText'>Загрузка...</p>
				</div>
			) : isError ? (
				<div className='w-full h-full flex justify-center items-center'>
					<p className='text-xl text-primaryText'>Ошибка</p>
				</div>
			) : (
				<>
					{orderTypes.map(orderType => (
						<OrderSection key={orderType.id} orderType={orderType} />
					))}
				</>
			)}
		</div>
	)
}

export default Orders
