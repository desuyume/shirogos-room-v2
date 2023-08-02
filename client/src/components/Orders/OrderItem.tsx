import Linkify from 'linkify-react'
import { FC } from 'react'

interface IOrderItem {
	index: number
	order: string
	nickname: string
	time: string
	isPastOrders: boolean
}

const renderLink = ({
	attributes,
	content,
}: {
	attributes: any
	content: string
}) => {
	const { href, ...props } = attributes

	if (content.startsWith('https://www.youtube.com')) {
		return (
			<a href={href} {...props}>
				Видео
			</a>
		)
	}

	return (
		<a href={href} {...props}>
			{content}
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
		<div
			className={
				(isPastOrders
					? 'min-h-[2.953125rem] max-h-[2.953125rem]'
					: 'min-h-[3.9375rem] max-h-[3.9375rem]') +
				'w-full flex justify-between items-center'
			}
		>
			<p
				className={
					(isPastOrders
						? 'text-[#A6A6A6] text-xl'
						: 'text-primaryText text-[1.5625rem]') +
					' text-center font-secondary w-[15%] font-bold'
				}
			>
				{index}
			</p>
			<div className='max-w-[65%] flex flex-col items-center justify-center pt-1.5 truncate'>
				<Linkify options={{ target: '_blank', render: renderLink }}>
					<p
						className={
							(isPastOrders
								? 'text-base text-[#A6A6A6]'
								: 'text-xl text-primaryText') +
							' font-secondary font-bold leading-none [&>a]:text-[#8684EB]'
						}
					>
						{order}
					</p>
				</Linkify>
				<p
					className={
						(isPastOrders
							? 'text-[0.8125rem] text-[#9A2855]'
							: 'text-primary text-[0.9375rem]') +
						' font-secondary font-bold -mt-0.5'
					}
				>
					{nickname}
				</p>
			</div>
			<p
				className={
					(isPastOrders
						? 'text-[1.0625rem] text-[#A6A6A6]'
						: 'text-primary text-[0.9375rem]') +
					' w-[20%] text-center text-primaryText font-secondary font-bold text-xl'
				}
			>
				{time === '' ? 'Х' : time}
			</p>
		</div>
	)
}

export default OrderItem
