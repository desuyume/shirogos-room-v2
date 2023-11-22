import { IPastUsername } from '@/types/room.interface'
import { formatDate } from '@/utils/formatDate'
import { FC } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'

interface IPastUsernames {
	isVisible: boolean
	usernames?: IPastUsername[]
	className?: string
}

const PastUsernames: FC<IPastUsernames> = ({
	isVisible,
	usernames,
	className,
}) => {
	return (
		<div
			className={
				(isVisible ? 'visible opacity-100 ' : 'invisible opacity-0 ') +
				'w-[13.6875rem] h-[114px] pt-2.5 absolute z-50 flex flex-col transition-all past_usernames ' +
				className
			}
		>
			<svg
				width='234'
				height='136'
				viewBox='0 22 234 136'
				fill='none'
				className='absolute inset-0 -z-10'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M158.295 38.5684L211.453 22.6505L193.336 75.3007L158.295 38.5684Z'
					fill='#242424'
					stroke='#C34375'
				/>
				<rect
					x='0.5'
					y='31.5'
					width='218'
					height='104'
					fill='#242424'
					stroke='#C34375'
				/>
				<path
					d='M209.826 25.0333L192.593 76.4247L158.813 42.8153L209.826 25.0333Z'
					fill='#242424'
				/>
				<path
					d='M205.128 25.316L185.939 75.1377L154.153 40.5837L205.128 25.316Z'
					fill='#242424'
				/>
			</svg>
			<div className='w-full h-[1.625rem] flex justify-center items-center border-[1px] border-transparent border-b-primary z-50'>
				<p className='text-primaryText text-[0.875rem] text-center'>
					Предыдущие никнеймы
				</p>
			</div>
			{usernames?.length ? (
				<Scrollbar
					noDefaultStyles
					className='my-0.5'
					style={{ height: '100%' }}
				>
					<div className='w-full flex-1 pl-2 pr-3.5'>
						{usernames?.map(username => (
							<div key={username.id} className='w-full flex justify-between items-center'>
								<p className='text-primary text-xs font-secondary font-bold leading-[123.295%] max-w-[9.2rem] overflow-ellipsis whitespace-nowrap overflow-hidden'>
									{username.username}
								</p>
								<p className='text-primaryText text-[0.5625rem] font-secondary font-bold leading-[169.295%]'>
									{formatDate(username.created_at)}
								</p>
							</div>
						))}
					</div>
				</Scrollbar>
			) : (
				<div className='w-full flex-1 flex justify-center items-center'>
					<p className='text-primaryText'>ИХ НЕТ 0_0</p>
				</div>
			)}
		</div>
	)
}

export default PastUsernames
