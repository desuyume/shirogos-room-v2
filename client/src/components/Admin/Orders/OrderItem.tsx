import { useCompleteOrder } from '@/api/useCompleteOrder'
import { useRejectOrder } from '@/api/useRejectOrder'
import Linkify from 'linkify-react'
import { FC } from 'react'

const renderLink = ({ attributes }: { attributes: any; content: string }) => {
	const { href, ...props } = attributes

	return (
		<a href={href} {...props}>
			Видео
		</a>
	)
}

interface IOrderItem {
	index: number
	id: number
	nickname: string
	order: string
	time: string
}

const OrderItem: FC<IOrderItem> = ({ index, id, nickname, order, time }) => {
	const { mutate: completeOrder } = useCompleteOrder()
	const { mutate: rejectOrder } = useRejectOrder()

	const acceptOrder = () => {
		completeOrder(id)
	}

	const cancelOrder = () => {
		rejectOrder(id)
	}

	return (
		<div className='w-full h-[3.125rem] flex items-center justify-between mb-[0.44rem] last-of-type:mb-0'>
			<div className='w-[76.2%] h-full flex [&>p]:h-full [&>p]:flex [&>p]:justify-center [&>p]:items-center [&>p]:text-[#FFF] [&>p]:font-secondary [&>p]:text-lg [&>p]:font-bold [&>p]:text-center bg-secondary'>
				<p className='max-w-[6.59%] min-w-[6.59%]'>{index}</p>
				<p className='max-w-[25%] min-w-[25%]'>{nickname}</p>
				<Linkify options={{ target: '_blank', render: renderLink }}>
					<p className='flex-1 [&>a]:text-[#8684EB]'>{order}</p>
				</Linkify>
				<p className='max-w-[20%] min-w-[20%]'>{time}</p>
			</div>
			<button
				onClick={acceptOrder}
				className='w-[11.5%] h-full bg-primary hover:bg-primaryHover transition-all text-[#FFF] text-xl'
			>
				Готово
			</button>
			<button
				onClick={cancelOrder}
				className='w-[11.5%] h-full bg-tertiary hover:bg-opacity-80 transition-all text-[#FFF] text-xl'
			>
				Отмена
			</button>
		</div>
	)
}

export default OrderItem
