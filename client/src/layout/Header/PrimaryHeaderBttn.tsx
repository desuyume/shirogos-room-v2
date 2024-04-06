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
					? 'border-[3px] text-primaryText cursor-default border-primary '
					: pathname.includes('room')
					? `${colorVariants.bg[roomAppearance.active_room_color]} ${
							colorVariantsHover.bg[roomAppearance.active_room_color]
					  } text-primaryText hover:text-[#FFF] cursor-pointer `
					: pathname.includes('guide') && room_color ? `${colorVariants.bg[room_color]} ${
						colorVariantsHover.bg[room_color]
					} text-primaryText hover:text-[#FFF] cursor-pointer ` : `bg-primary hover:bg-primaryHover text-primaryText hover:text-[#FFF] cursor-pointer `) +
				' rounded-[2.3125rem] text-xl w-[15rem] h-[4.267rem] flex justify-center items-center text-center mr-[0.69rem] last:mr-0 transition-colors'
			}
			to={path}
		>
			{title}
		</Link>
	)
}

export default PrimaryHeaderBttn
