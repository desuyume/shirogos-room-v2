import { useReadNotification } from '@/api/useReadNotification'
import { IFetchedNotification } from '@/types/notifications.interface'
import { cn } from '@/utils/cn'
import { formatDateNotifications } from '@/utils/formatDate'
import { FC } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'

interface NotificationListProps {
	notifications: IFetchedNotification[]
}

const NotificationList: FC<NotificationListProps> = ({ notifications }) => {
	const { mutate: read } = useReadNotification()

	const readNotification = (notificationId: number) => {
		read(notificationId)
	}

	return (
		<Scrollbar
			noDefaultStyles
			style={{ width: '100%', height: 405 }}
			className='bg-tertiary rounded-b-[2.3125rem] hide-overflow-rounded-corners'
		>
			{notifications.map((notification, index) => (
				<div
					key={notification.id}
					className={cn(
						'w-full min-h-[5.25rem] max-h-[5.25rem] flex items-center relative',
						{
							'bg-secondaryHover': index % 2 !== 0,
							'bg-tertiary': index % 2 === 0,
						}
					)}
				>
					<div
						onClick={() =>
							!notification.isRead && readNotification(notification.id)
						}
						className={cn(
							'w-[5.125rem] h-[4.875rem] rounded-[0.4375rem] mr-3 outline outline-2 -ml-[7px] transition-outline relative group',
							{
								'cursor-pointer outline-[#EBE984]': !notification.isRead,
								'outline-transparent': notification.isRead,
								'bg-secondary': !notification.img,
							}
						)}
					>
						{notification.img && (
							<img
								src={`${import.meta.env.VITE_SERVER_URL}/${notification.img}`}
								alt='notification-img'
								className='w-full h-full object-cover rounded-[0.4375rem]'
							/>
						)}

						<div
							className={cn(
								'w-full h-full absolute inset-0 rounded-[0.4375rem] bg-[#EBE984] bg-opacity-40 opacity-0 invisible transition-opacity',
								{
									'group-hover:opacity-100 group-hover:visible':
										!notification.isRead,
								}
							)}
						/>
					</div>

					<p className='text-primaryText font-secondary font-bold text-xs max-w-[15.3125rem] whitespace-break-spaces break-words line-clamp-3'>
						{notification.text}
					</p>

					<p className='text-primary font-secondary font-bold text-[0.625rem] leading-[7px] right-3.5 bottom-2.5 absolute'>
						{formatDateNotifications(notification.date_created)}
					</p>
				</div>
			))}
		</Scrollbar>
	)
}

export default NotificationList
