import { FC } from 'react'
import noNotificationIcon from '@/assets/no-notification.png'
import notificationIcon from '@/assets/notification.png'
import notificationHoverIcon from '@/assets/notification-hover.png'
import { cn } from '@/utils/cn'

interface NotificationButtonProps {
	isPopupVisible: boolean
	setIsPopupVisible: React.Dispatch<React.SetStateAction<boolean>>
	isHaveUnread: boolean
}

const NotificationButton: FC<NotificationButtonProps> = ({
	isPopupVisible,
	setIsPopupVisible,
	isHaveUnread,
}) => {
	return (
		<button
			onClick={() => setIsPopupVisible(prev => !prev)}
			className='w-full h-full relative group'
		>
			<img
				className={cn(
					'absolute inset-0 opacity-100 visible group-hover:opacity-0 group-hover:invisible transition-opacity duration-300',
					{
						'invisible opacity-0': isPopupVisible || isHaveUnread,
					}
				)}
				src={noNotificationIcon}
				alt='notification-icon'
			/>

			<img
				className={cn(
					'absolute inset-0 opacity-100 visible group-hover:opacity-0 group-hover:invisible transition-opacity duration-300',
					{
						'invisible opacity-0': isPopupVisible || !isHaveUnread,
					}
				)}
				src={notificationIcon}
				alt='notification-icon'
			/>

			<img
				className={cn(
					'absolute inset-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300',
					{
						'visible opacity-100': isPopupVisible,
					}
				)}
				src={notificationHoverIcon}
				alt='notification-icon'
			/>
		</button>
	)
}

export default NotificationButton
