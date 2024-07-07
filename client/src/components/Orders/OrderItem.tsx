import { cn } from '@/utils/cn'
import Linkify from 'linkify-react'
import { FC } from 'react'

interface IOrderItem {
	index: number
	order: string
	nickname: string
	time: string
	isPastOrders: boolean
}

const renderLink = ({ attributes }: { attributes: any; content: string }) => {
	const { href, ...props } = attributes

	return (
		<a href={href} {...props}>
			Видео
		</a>
	)
}

const OrderItem: FC<IOrderItem> = ({
	index,
	order,
	nickname,
	time,
	isPastOrders,
}) => {
	return (
		<div className='w-full flex items-center min-h-[4.3125rem] max-h-[4.3125rem]'>
			<p className='text-primaryText text-[0.9375rem] w-[15%] text-center font-pressStart break-words px-1 line-clamp-3'>
				{index}
			</p>
			<div className='w-[85%] pt-[1.375rem] h-full px-4 flex flex-col items-center self-start mx-auto'>
				<Linkify options={{ target: '_blank', render: renderLink }}>
					<p
						className={cn(
							'text-[0.9375rem] leading-4 mb-[0.3125rem] font-pressStart [&>a]:text-[#8684EB] max-w-full truncate',
							{
								'text-[#A6A6A6]': isPastOrders,
								'text-primaryText ': !isPastOrders,
							}
						)}
					>
						{order}
					</p>
				</Linkify>

				<div className='w-full flex justify-between'>
					<p
						className={cn(
							'font-pressStart w-[85%] text-[0.625rem] leading-3 truncate mr-4',
							{
								'text-[#9A2855]': isPastOrders,
								'text-primary': !isPastOrders,
							}
						)}
					>
						{nickname}
					</p>
					<p
						className={cn(
							'font-pressStart w-[15%] text-[0.625rem] leading-3 text-right truncate',
							{
								'text-[#A6A6A6]': isPastOrders,
								'text-[#EBE984]': !isPastOrders,
							}
						)}
					>
						{time === '' ? 'Тип Х' : time}
					</p>
				</div>
			</div>
		</div>
	)
}

export default OrderItem
