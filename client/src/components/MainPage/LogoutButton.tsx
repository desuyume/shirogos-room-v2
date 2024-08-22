import { cn } from '@/utils/cn'
import { FC } from 'react'
import logoutIcon from '@/assets/logout-icon.png'
import logoutHoverIcon from '@/assets/logout-icon-hover.png'

interface LogoutButtonProps {
  isLogoutVisible: boolean
  handleMouseEnter: () => void
  handleMouseLeave: () => void
  onClick: () => Promise<void>
}

const LogoutButton: FC<LogoutButtonProps> = ({
  isLogoutVisible,
  handleMouseEnter,
  handleMouseLeave,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group absolute right-0 top-[1.625rem] flex h-[4.5rem] w-[2.3125rem] cursor-pointer items-center justify-center bg-[#353133] transition-all',
        {
          '-right-[2.3125rem]': isLogoutVisible
        }
      )}
    >
      <img
        src={logoutIcon}
        alt='logout'
        className='visible absolute mt-0.5 opacity-100 transition-opacity duration-300 group-hover:invisible group-hover:opacity-0'
      />

      <div className='invisible absolute flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 group-hover:visible group-hover:opacity-100'>
        <img src={logoutHoverIcon} alt='logout' className='ml-[1px]' />
        <p className='text-[0.625rem] leading-[0.8125rem] text-primaryText'>ББ?</p>
      </div>
    </div>
  )
}

export default LogoutButton
