import { FC } from 'react'

interface IOrderItem {
	id: number
	nickname: string
	order: string
	time: string
}

const OrderItem: FC<IOrderItem> = ({ id, nickname, order, time }) => {
	return (
		<div className='w-full h-[3.125rem] flex items-center justify-between mb-[0.44rem] last-of-type:mb-0'>
			<div className='w-[76.2%] h-full flex [&>p]:h-full [&>p]:flex [&>p]:justify-center [&>p]:items-center [&>p]:text-[#FFF] [&>p]:font-secondary [&>p]:text-xl [&>p]:font-bold [&>p]:text-center bg-secondary'>
				<p className='w-[6.59%]'>{id}</p>
				<p className='w-[25%]'>{nickname}</p>
				<p className='flex-1'>{order}</p>
				<p className='w-[23.8%]'>{time}</p>
			</div>
			<button className='w-[11.5%] h-full bg-primary hover:bg-primaryHover transition-all text-[#FFF] text-xl'>Готово</button>
			<button className='w-[11.5%] h-full bg-tertiary hover:bg-opacity-80 transition-all text-[#FFF] text-xl'>Отмена</button>
		</div>
	)
}

export default OrderItem
