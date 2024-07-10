import { FC, useState } from 'react'
import NotificationButton from './NotificationButton'
import { cn } from '@/utils/cn'
import { useUserNotifications } from '@/api/useUserNotifications'
import NotificationList from './NotificationList'

interface NotificationProps {
	className?: string
}

const Notification: FC<NotificationProps> = ({ className }) => {
	const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false)

	const { data: notifications, isLoading, isError } = useUserNotifications()

	return (
		<div className={cn('w-[2.1875rem] h-[2.1875rem] relative z-50', className)}>
			<NotificationButton
				isPopupVisible={isPopupVisible}
				setIsPopupVisible={setIsPopupVisible}
				isHaveUnread={notifications ? notifications.unreadCount > 0 : false}
			/>

			<div
				className={cn(
					'w-[22rem] h-[27.25rem] rounded-[2.3125rem] rounded-tr-none absolute -bottom-[7.67px] right-[73.5%] translate-y-full transition-opacity notifications',
					{
						'opacity-100 visible': isPopupVisible,
						'opacity-0 invisible': !isPopupVisible,
					}
				)}
			>
				<div className='w-full h-[1.9375rem] bg-[#EBE984] rounded-tl-[2.3125rem] flex justify-center items-center relative'>
					<p className='text-tertiary text-sm pl-[0.4375rem] z-10'>
						ОПОВЕЩЕНИЯ
					</p>

					<svg
						width='65'
						height='64'
						viewBox='0 0 65 64'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className='absolute -top-[15px] right-[10px] -z-10'
					>
						<path
							d='M64.654 0.539945L42.8533 63.9462L0.68586 19.7098L64.654 0.539945Z'
							fill='#EBE984'
						/>
					</svg>
				</div>

				{isLoading ? (
					<div className='w-full h-[405px] bg-tertiary rounded-b-[2.3125rem] flex justify-center items-center'>
						<p className='text-primaryText'>Загрузка...</p>
					</div>
				) : isError ? (
					<div className='w-full h-[405px] bg-tertiary rounded-b-[2.3125rem] flex justify-center items-center'>
						<p className='text-primaryText'>Ошибка</p>
					</div>
				) : !notifications.notifications ||
				  !notifications.notifications.length ? (
					<div className='w-full h-[405px] bg-tertiary rounded-b-[2.3125rem]' />
				) : (
					<NotificationList notifications={notifications.notifications} />
				)}
			</div>
		</div>
	)
}

export default Notification
