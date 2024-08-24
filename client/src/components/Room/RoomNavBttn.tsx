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
        ' w-[15rem] h-[2.5rem] min-w-[11.25rem] flex flex-1 items-center justify-center rounded-[2.3125rem] text-xl text-primaryText transition-all hover:text-white pb-[0.0625rem]'
      }
      to={path}
    >
      {title}
    </Link>
  )
}

export default RoomNavBttn
