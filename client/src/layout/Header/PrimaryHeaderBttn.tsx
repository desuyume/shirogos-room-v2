import { RoomAppearanceContext } from '@/Context'
import { RoomColor, colorVariants, colorVariantsHover } from '@/consts/roomColors'
import { FC, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface IPrimaryHeaderBttn {
  path: string
  title: string
  room_color?: RoomColor
}

const PrimaryHeaderBttn: FC<IPrimaryHeaderBttn> = ({ path, title, room_color }) => {
  const isActive = window.location.pathname === path
  const { pathname } = useLocation()
  const roomAppearance = useContext(RoomAppearanceContext)

  return (
    <Link
      className={
        (isActive
          ? 'cursor-default border-[3px] border-primary text-primaryText '
          : pathname.includes('room')
          ? `${colorVariants.bg[roomAppearance.active_room_color]} ${
              colorVariantsHover.bg[roomAppearance.active_room_color]
            } cursor-pointer text-primaryText hover:text-white `
          : pathname.includes('guide') && room_color
          ? `${colorVariants.bg[room_color]} ${colorVariantsHover.bg[room_color]} cursor-pointer text-primaryText hover:text-white `
          : `cursor-pointer bg-primary text-primaryText hover:bg-primaryHover hover:text-white `) +
        ' mr-[0.69rem] flex h-[4.267rem] w-[15rem] items-center justify-center rounded-[2.3125rem] text-center text-xl transition-colors last:mr-0'
      }
      to={path}
    >
      {title}
    </Link>
  )
}

export default PrimaryHeaderBttn
