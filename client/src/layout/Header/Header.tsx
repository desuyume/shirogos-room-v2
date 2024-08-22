import { FC, useContext, useState } from 'react'
import logo from '@/assets/logo.png'
import logoHover from '@/assets/logo-hover.png'
import { Link } from 'react-router-dom'
import HeaderBttn from './HeaderBttn'
import { UserContext } from '@/Context'
import Profile from './Profile'
import PrimaryHeaderBttn from './PrimaryHeaderBttn'
import { RoomColor } from '@/consts/roomColors'
import { cn } from '@/utils/cn'

interface IHeader {
  withLine: boolean
  isFixed: boolean
  room_color?: RoomColor
}

const Header: FC<IHeader> = ({ withLine, isFixed, room_color }) => {
  const userContext = useContext(UserContext)

  const [isLogoHover, setIsLogoHover] = useState<boolean>(false)

  return (
    <div
      className={cn('z-50 flex h-[5.25rem] items-center justify-center bg-tertiary', {
        'fixed top-0 w-full': isFixed
      })}
    >
      <div className='absolute left-4 h-[3.58rem] w-[3.58rem]'>
        <Link
          className='relative block h-full w-full'
          to='/'
          onMouseOver={() => setIsLogoHover(true)}
          onMouseLeave={() => setIsLogoHover(false)}
        >
          <img
            className={cn('absolute inset-0 h-full w-full transition-all', {
              'invisible opacity-0': isLogoHover,
              'visible opacity-100': !isLogoHover
            })}
            src={logo}
            alt='logo'
          />
          <img
            className={cn('absolute inset-0 h-full w-full transition-all', {
              'visible opacity-100': isLogoHover,
              'invisible opacity-0': !isLogoHover
            })}
            src={logoHover}
            alt='logo'
          />
        </Link>
      </div>

      <nav className='flex w-full items-center justify-center'>
        <HeaderBttn path='/wiki' title='Википедия' />
        <PrimaryHeaderBttn path='/streamer' title='Стримерская' room_color={room_color} />
        <HeaderBttn path='/dangoteka' title='Данготека' />
      </nav>
      {userContext?.isFetched && userContext.user && <Profile />}
      {withLine && <hr className='absolute top-[calc(5.25rem-1px)] w-full border-primary' />}
    </div>
  )
}

export default Header
