import { IMakeOrder } from '@/types/room.interface'
import { FC, useEffect, useState } from 'react'

interface IOrderDone {
	clickDanBttn: () => void
	isOrdered: boolean
	userOrder: IMakeOrder | null
}

const OrderDone: FC<IOrderDone> = ({ clickDanBttn, isOrdered, userOrder }) => {
	const [ordersText, setOrdersText] = useState<string | null>(null)

	useEffect(() => {
		setOrdersText(userOrder?.orderText ?? '')
	}, [userOrder])

	return (
		<div
			className={
				(isOrdered ? 'visible opacity-100 ' : 'invisible opacity-0 ') +
				'w-full h-full bg-room-orderDone-bg absolute inset-0 rounded-[1.5625rem] flex flex-col items-center py-4 z-30 transition-all'
			}
		>
			<h2 className='text-primaryText text-[3.125rem] leading-[97.795%] mb-4'>
				Заказ сделан!
			</h2>
			<hr className='w-[65.76%] border-t-[3px] border-primary mb-8' />
			<div className='flex-1 flex justify-center items-center'>
				<p className='text-primaryText text-[2.1875rem] leading-[97.795%] mb-8 text-center'>
					{ordersText}
				</p>
			</div>
			<button
				onClick={clickDanBttn}
				className='bg-primary hover:bg-primaryHover transition-all w-[12.48%] h-[3.6875rem] text-primaryText text-[2.1875rem] mb-[0.63rem] min-w-[6.25rem]'
			>
				ДАН
			</button>
			<p className='text-primaryText text-[0.9375rem] leading-[97.795%] text-center'>
				Смотри очередь заказов на главной странице.
			</p>
		</div>
	)
}

export default OrderDone
