import { FC, useState } from 'react'
import gamepadImg from '../assets/gamepad.png'
import OrdersList from './OrdersList'

interface IOrders { 
	isPastOrders: boolean
	setIsPastOrders: React.Dispatch<React.SetStateAction<boolean>>
}

const Orders: FC<IOrders> = ({ isPastOrders, setIsPastOrders }) => {
	const [isHintVisible, setIsHintVisible] = useState<boolean>(false)

	return (
		<div className={(isPastOrders ? 'invisible opacity-0' : 'visible opacity-100') + ' w-[38.8125rem] h-[18.375rem] absolute top-[11.40rem] right-6 transition-all'}>
			<div className={(isHintVisible ? 'visible opacity-100' : 'invisible opacity-0') + ' bg-orders-hint-bg bg-no-repeat absolute w-[16.38444rem] h-[15.9375rem] -left-[17.2rem] flex justify-center items-center transition-all'}>
				<p className='text-primaryText text-center text-[1.5625rem] max-w-[12.625rem] leading-[95.795%]'>
					Заказы делаются в <span className='text-[#EBE984]'>Бутике</span>{' '}
					<span className='text-[1.25rem] inline-block'>(личная комната)</span>.
				</p>
			</div>
			<div className='bg-tertiary bg-opacity-80 h-[4.3125rem] flex justify-between items-center px-5 rounded-t-[2.3125rem]'>
				<img
					onMouseOver={() => setIsHintVisible(true)}
					onMouseLeave={() => setIsHintVisible(false)}
					className='cursor-pointer'
					src={gamepadImg}
					alt='gamepad-img'
				/>
				<h3 className='text-[#EBE984] text-[1.875rem] pr-4'>Текущие заказы</h3>
				<svg
					className='cursor-pointer'
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
			<OrdersList isPastOrders={isPastOrders} />
		</div>
	)
}

export default Orders
