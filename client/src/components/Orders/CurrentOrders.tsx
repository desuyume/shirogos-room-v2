import { FC, useState } from 'react'
import gamepadImg from '@/assets/gamepad.png'
import OrdersList from './OrdersList'
import { usePendingOrders } from '@/api/usePendingOrders'

interface ICurrentOrders {
	isPastOrders: boolean
	setIsPastOrders: React.Dispatch<React.SetStateAction<boolean>>
}

const CurrentOrders: FC<ICurrentOrders> = ({ isPastOrders, setIsPastOrders }) => {
	const [isHintVisible, setIsHintVisible] = useState<boolean>(false)

	const { isLoading, isError, data: orders } = usePendingOrders()

	return (
		<div
			className={
				(isPastOrders ? 'invisible opacity-0' : 'visible opacity-100') +
				' w-full h-full absolute inset-0 transition-all'
			}
		>
			<div
				className={
					(isHintVisible ? 'visible opacity-100' : 'invisible opacity-0') +
					' bg-orders-hint-bg bg-no-repeat absolute w-[16.38444rem] h-[15.9375rem] left-[5rem] top-[-11rem] flex justify-center items-center transition-all z-20'
				}
			>
				<p className='text-primaryText text-center text-[1.5625rem] max-w-[12.625rem] leading-[95.795%]'>
					Заказы делаются в <span className='text-[#EBE984]'>Бутике</span>{' '}
					<span className='text-[1.25rem] inline-block'>(личная комната)</span>.
				</p>
			</div>
			<div className='bg-tertiary bg-opacity-80 h-[4.3125rem] flex justify-center items-center relative rounded-t-[2.3125rem]'>
				<img
					onMouseOver={() => setIsHintVisible(true)}
					onMouseLeave={() => setIsHintVisible(false)}
					className='cursor-pointer absolute left-5'
					src={gamepadImg}
					alt='gamepad-img'
				/>
				<h3 className='text-[#EBE984] text-[1.875rem]'>Текущие заказы</h3>
				<svg
					className='cursor-pointer absolute right-5'
					width='16'
					height='16'
					viewBox='0 0 16 16'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					onClick={() => setIsPastOrders(true)}
				>
					<circle cx='8' cy='8' r='8' fill='#EBE984' />
				</svg>
			</div>
			{isLoading ? (
				<div className='w-full h-[14.0625rem] rounded-b-[2.3125rem] bg-tertiary bg-opacity-80 flex justify-center items-center'>
					<p className='text-xl text-[#EBE984]'>Загрузка...</p>
				</div>
			) : isError ? (
				<div className='w-full h-[14.0625rem] rounded-b-[2.3125rem] bg-tertiary bg-opacity-80 flex justify-center items-center'>
					<p className='text-xl text-[#EBE984]'>Ошибка</p>
				</div>
			) : !orders.length ? (
				<div className='w-full h-[14.0625rem] rounded-b-[2.3125rem] bg-tertiary bg-opacity-80 flex justify-center items-center'>
					<p className='text-xl text-[#EBE984]'>Нет активных заказов</p>
				</div>
			) : (
				<OrdersList isPastOrders={isPastOrders} orders={orders} />
			)}
		</div>
	)
}

export default CurrentOrders
