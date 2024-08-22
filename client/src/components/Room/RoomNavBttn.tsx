import { RoomColor, colorVariants, colorVariantsHover } from '@/consts/roomColors'
import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface IRoomNavBttn {
  title: string
  path: string
  bgColor: RoomColor
}

const RoomNavBttn: FC<IRoomNavBttn> = ({ title, path, bgColor }) => {
  const location = useLocation()
  const isActive =
    path === '/room'
      ? location.pathname === '/room' || location.pathname === '/room/'
      : location.pathname.includes(path)

  return (
    <Link
      className={
        (isActive
          ? 'bg-secondary'
          : `${colorVariants.bg[bgColor]} ${colorVariantsHover.bg[bgColor]}`) +
        ' flex h-[2.52rem] w-[15rem] min-w-[11.25rem] flex-1 items-center justify-center rounded-[2.3125rem] text-xl text-primaryText transition-all hover:text-white'
      }
      to={path}
    >
      {title}
    </Link>
  )
}

export default RoomNavBttn
