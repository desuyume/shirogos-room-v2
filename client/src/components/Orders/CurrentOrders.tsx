import { FC, useState } from 'react'
import gamepadImg from '@/assets/gamepad.png'
import OrdersList from './OrdersList'
import { usePendingOrders } from '@/api/usePendingOrders'

interface ICurrentOrders {
	isPastOrders: boolean
	setIsPastOrders: React.Dispatch<React.SetStateAction<boolean>>
}

const CurrentOrders: FC<ICurrentOrders> = ({
	isPastOrders,
	setIsPastOrders,
}) => {
	const [isHintVisible, setIsHintVisible] = useState<boolean>(false)

	const { isLoading, isError, data: orders } = usePendingOrders()

	return (
		<div
			className={
				(isPastOrders ? 'invisible opacity-0' : 'visible opacity-100') +
				' w-full h-full absolute inset-0'
			}
		>
			<div
				className={
					(isHintVisible ? 'visible opacity-100' : 'invisible opacity-0') +
					' bg-orders-hint-bg bg-no-repeat absolute w-[15.9375rem] h-[15.9375rem] left-[3rem] top-[-13.0625rem] flex flex-col justify-center items-center transition-all z-20 pointer-events-none'
				}
			>
				<p className='text-primaryText text-center font-pressStart text-xl max-w-[12.625rem] leading-[23px]'>
					Заказы делаются
				</p>
				<p className='text-[#EBE984] font-pressStart text-xl leading-[23px]'>
					<span className='text-primaryText'>в</span> Бутике
				</p>{' '}
				<p className='text-primaryText font-pressStart text-[0.625rem] leading-[15px]'>
					(личная комната).
				</p>
			</div>
			<div className='bg-tertiary h-[4.3125rem] flex justify-center items-center relative rounded-t-[2.3125rem]'>
				<img
					onMouseOver={() => setIsHintVisible(true)}
					onMouseLeave={() => setIsHintVisible(false)}
					className='cursor-pointer absolute left-[1.125rem]'
					src={gamepadImg}
					alt='gamepad-img'
				/>
				<h3 className='text-[#EBE984] text-xl font-pressStart'>
					Текущие заказы
				</h3>
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
				<div className='w-full h-[15.1875rem] rounded-b-[2.3125rem] bg-tertiary bg-opacity-70 flex justify-center items-center'>
					<p className='text-xl text-[#EBE984]'>Загрузка...</p>
				</div>
			) : isError ? (
				<div className='w-full h-[15.1875rem] rounded-b-[2.3125rem] bg-tertiary bg-opacity-70 flex justify-center items-center'>
					<p className='text-xl text-[#EBE984]'>Ошибка</p>
				</div>
			) : !orders.length ? (
				<div className='w-full h-[15.1875rem] rounded-b-[2.3125rem] bg-tertiary bg-opacity-70 flex justify-center items-center'>
					<p className='text-xl text-[#EBE984]'>Нет активных заказов</p>
				</div>
			) : (
				<OrdersList isPastOrders={isPastOrders} orders={orders} />
			)}
		</div>
	)
}

export default CurrentOrders
