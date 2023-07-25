import Linkify from 'linkify-react'
import { FC } from 'react'

interface IOrderItem {
	index: number
	order: string
	nickname: string
	time: string
	isPastOrders: boolean
}

const OrderItem: FC<IOrderItem> = ({
	index,
	order,
	nickname,
	time,
	isPastOrders,
}) => {
	return (
		<div className={(isPastOrders ? 'min-h-[2.953125rem] max-h-[2.953125rem]' : 'min-h-[3.9375rem] max-h-[3.9375rem]') + 'w-full flex justify-between items-center'}>
			<p
				className={
					(isPastOrders
						? 'text-[#A6A6A6] text-xl w-[10%]'
						: 'text-primaryText text-[1.5625rem] w-[15%]') +
					' text-center font-secondary  font-bold'
				}
			>
				{index}
			</p>
			<div className={(isPastOrders ? 'max-w-[70%]' : 'max-w-[65%]') + ' flex flex-col items-center justify-center pt-1.5 truncate'}>
				<Linkify options={{ target: '_blank', className: 'text-[#8684EB]' }}>
					<p className={(isPastOrders ? 'text-base text-[#A6A6A6]' : 'text-xl text-primaryText') + ' font-secondary font-bold leading-none'}>
						{order}
					</p>
				</Linkify>
				<p className={(isPastOrders ? 'text-[0.8125rem] text-[#9A2855]' : 'text-primary text-[0.9375rem]') + ' font-secondary font-bold -mt-1'}>
					{nickname}
				</p>
			</div>
			<p className={(isPastOrders ? 'text-[1.0625rem] text-[#A6A6A6]' : 'text-primary text-[0.9375rem]') + ' w-[20%] text-center text-primaryText font-secondary font-bold text-xl'}>
				{time === '' ? 'Х' : time}
			</p>
		</div>
	)
}

export default OrderItem
