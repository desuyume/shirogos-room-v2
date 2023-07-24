import Linkify from 'linkify-react'
import { FC } from 'react'

interface IOrderItem {
	index: number
	order: string
	nickname: string
	time: string
}

const OrderItem: FC<IOrderItem> = ({ index, order, nickname, time }) => {
	return (
		<div className='w-full min-h-[3.9375rem] max-h-[3.9375rem] flex justify-between items-center'>
			<p className='w-[15%] text-center text-primaryText font-secondary text-[1.5625rem] font-bold'>
				{index}
			</p>
			<div className='max-w-[65%] flex flex-col items-center justify-center pt-1.5 truncate'>
				<Linkify options={{target: "_blank", className: "text-[#8684EB]"}}>
					<p className='text-xl text-primaryText font-secondary font-bold leading-none'>
						{order}
					</p>
				</Linkify>
				<p className='text-primary font-secondary font-bold text-[0.9375rem] -mt-1'>
					{nickname}
				</p>
			</div>
			<p className='w-[19.5%] text-center text-primaryText font-secondary font-bold text-xl'>
				{time === '' ? 'Х' : time}
			</p>
		</div>
	)
}

export default OrderItem
