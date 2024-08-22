import { forwardRef } from 'react'
import noNotificationIcon from '@/assets/no-notification.png'
import notificationIcon from '@/assets/notification.png'
import notificationWithDotIcon from '@/assets/notification-with-dot.png'
import notificationHoverIcon from '@/assets/notification-hover.png'
import { cn } from '@/utils/cn'

interface NotificationButtonProps {
  isPopupVisible: boolean
  setIsPopupVisible: React.Dispatch<React.SetStateAction<boolean>>
  isHaveUnread: boolean
  withDot?: boolean
}

const NotificationButton = forwardRef<HTMLButtonElement, NotificationButtonProps>(
  ({ isPopupVisible, setIsPopupVisible, isHaveUnread, withDot = false }, ref) => {
    return (
      <button
        ref={ref}
        onClick={(e) => {
          e.stopPropagation()
          setIsPopupVisible(!isPopupVisible)
        }}
        className='group relative h-full w-full'
      >
        {withDot ? (
          <img
            className={cn(
              'visible absolute inset-0 opacity-100 group-hover:invisible group-hover:opacity-0',
              {
                'invisible opacity-0': isPopupVisible || !isHaveUnread
              }
            )}
            src={notificationWithDotIcon}
            alt='notification-icon'
          />
        ) : (
          <img
            className={cn(
              'visible absolute inset-0 opacity-100 group-hover:invisible group-hover:opacity-0',
              {
                'invisible opacity-0': isPopupVisible || !isHaveUnread
              }
            )}
            src={notificationIcon}
            alt='notification-icon'
          />
        )}

        <img
          className={cn(
            'visible absolute inset-0 opacity-100 group-hover:invisible group-hover:opacity-0',
            {
              'invisible opacity-0': isPopupVisible || isHaveUnread
            }
          )}
          src={noNotificationIcon}
          alt='notification-icon'
        />

        <img
          className={cn(
            'invisible absolute inset-0 opacity-0 group-hover:visible group-hover:opacity-100',
            {
              'visible opacity-100': isPopupVisible
            }
          )}
          src={notificationHoverIcon}
          alt='notification-icon'
        />
      </button>
    )
  }
)

export default NotificationButton
