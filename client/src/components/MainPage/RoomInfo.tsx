import { FC, useContext, useEffect, useRef, useState } from 'react'
import { useUserProfile } from '@/api/useUserProfile'
import { Link } from 'react-router-dom'
import ProfileMiniature from '../ProfileMiniature'
import LogoutButton from './LogoutButton'
import { cn } from '@/utils/cn'
import { UserContext } from '@/Context'
import Notification from '../Notification/Notification'

const RoomInfo: FC = () => {
  const [isLogoutVisible, setIsLogoutVisible] = useState<boolean>(false)
  const timeoutRef = useRef<number | null>(null)
  const context = useContext(UserContext)

  const { data: userInfo, isLoading, isError } = useUserProfile()

  const handleMouseEnter = () => {
    // Clear any existing timeout to prevent hiding
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsLogoutVisible(true)
  }

  const handleMouseLeave = () => {
    // Set a timeout to hide the element after 1 second
    timeoutRef.current = setTimeout(() => {
      setIsLogoutVisible(false)
    }, 1000)
  }

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div className='z-30 flex h-[8.5625rem] w-[16.3125rem] items-center justify-between pl-5 pr-1.5'>
      <div className='absolute inset-0 z-10 h-full w-full bg-room-info-pink-gradient' />

      <Notification withDot className='h-[3.5rem] w-[3.5rem]' />

      <div className='relative z-20 flex h-[8.1875rem] min-w-[10.125rem] max-w-[10.125rem] flex-col self-end'>
        {isLoading ? (
          <div className='flex h-full w-full items-center justify-center'>
            <p className='text-primaryText'>Загрузка...</p>
          </div>
        ) : isError ? (
          <div className='flex h-full w-full items-center justify-center'>
            <p className='text-primaryText'>Ошибка</p>
          </div>
        ) : (
          <>
            <div className='flex h-5 w-full items-center justify-between pl-1.5 pr-1'>
              <p className='mr-4 max-w-[50%] truncate text-xs text-[#EBE984]'>
                {userInfo.dangos} до
              </p>
              <p className='max-w-[50%] truncate text-xs text-primaryText'>
                {userInfo.level} уровень
              </p>
            </div>

            <Link
              to='/room'
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className='group relative h-[4.5rem] w-full'
            >
              <ProfileMiniature
                miniature_img={userInfo.miniature_img}
                profile_img={userInfo.profile_img}
                username={userInfo.username ?? userInfo.twitch.displayName}
                frame={null}
                className='h-[4.5rem] w-full object-cover'
              />

              <div
                className={cn(
                  'group invisible absolute inset-0 z-40 flex h-full w-full items-center justify-center bg-[#383134] bg-opacity-60 opacity-0 transition-opacity duration-300 group-hover:visible group-hover:opacity-100'
                )}
              >
                <p className='invisible text-primaryText text-opacity-[0.55] opacity-0 transition-opacity group-hover:visible group-hover:opacity-100'>
                  ВОЙТИ
                </p>
              </div>
            </Link>

            <div className='flex w-full flex-1 items-start justify-center px-2 pt-1'>
              <p className='truncate text-primaryText'>{userInfo.username}</p>
            </div>
          </>
        )}
      </div>

      <LogoutButton
        isLogoutVisible={isLogoutVisible}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        onClick={async () => {
          await context?.logout()
        }}
      />

      <div className='absolute right-1.5 top-1.5 z-10 h-[10.375rem] w-[10.125rem] bg-room-info-gray-gradient' />
    </div>
  )
}

export default RoomInfo
