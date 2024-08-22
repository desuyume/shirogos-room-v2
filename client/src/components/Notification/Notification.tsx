import { FC, useEffect, useRef, useState } from 'react'
import NotificationButton from './NotificationButton'
import { cn } from '@/utils/cn'
import { useUserNotifications } from '@/api/useUserNotifications'
import NotificationList from './NotificationList'

interface NotificationProps {
  withDot?: boolean
  className?: string
}

const Notification: FC<NotificationProps> = ({ withDot = false, className }) => {
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false)
  const popupRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const { data: notifications, isLoading, isError } = useUserNotifications()

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popupRef.current &&
      !popupRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsPopupVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className={cn('relative z-50 h-[2.1875rem] w-[2.1875rem]', className)}>
      <NotificationButton
        ref={buttonRef}
        isPopupVisible={isPopupVisible}
        setIsPopupVisible={setIsPopupVisible}
        isHaveUnread={notifications ? notifications.unreadCount > 0 : false}
        withDot={withDot}
      />

      <div
        ref={popupRef}
        className={cn(
          'notifications absolute -bottom-[7.67px] right-[73.5%] h-[27.25rem] w-[22rem] translate-y-full rounded-[2.3125rem] rounded-tr-none shadow-notification transition-opacity',
          {
            'visible opacity-100': isPopupVisible,
            'invisible opacity-0': !isPopupVisible
          }
        )}
      >
        <div className='relative flex h-[1.9375rem] w-full items-center justify-center rounded-tl-[2.3125rem] bg-[#EBE984]'>
          <p className='z-10 pl-[0.4375rem] text-sm text-tertiary'>ОПОВЕЩЕНИЯ</p>

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
          <div className='flex h-[405px] w-full items-center justify-center rounded-b-[2.3125rem] bg-tertiary'>
            <p className='text-primaryText'>Загрузка...</p>
          </div>
        ) : isError ? (
          <div className='flex h-[405px] w-full items-center justify-center rounded-b-[2.3125rem] bg-tertiary'>
            <p className='text-primaryText'>Ошибка</p>
          </div>
        ) : !notifications.notifications || !notifications.notifications.length ? (
          <div className='h-[405px] w-full rounded-b-[2.3125rem] bg-tertiary' />
        ) : (
          <NotificationList notifications={notifications.notifications} />
        )}
      </div>
    </div>
  )
}

export default Notification
