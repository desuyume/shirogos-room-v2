import { RoomAppearanceContext } from '@/Context'
import { colorVariants, colorVariantsHover } from '@/consts/roomColors'
import { FC, useContext } from 'react'
import { Link } from 'react-router-dom'

interface IPrimaryHeaderBttn {
	path: string
	title: string
}

const PrimaryHeaderBttn: FC<IPrimaryHeaderBttn> = ({ path, title }) => {
	const isActive = window.location.pathname === path
	const roomAppearance = useContext(RoomAppearanceContext)

	return (
		<Link
			className={
				(isActive
					? `border-[3px] ${
							colorVariants.border[roomAppearance.active_room_color]
					  } text-primaryText cursor-default `
					: `${colorVariants.bg[roomAppearance.active_room_color]} ${
							colorVariantsHover.bg[roomAppearance.active_room_color]
					  } text-primaryText hover:text-[#FFF] `) +
				'rounded-[2.3125rem] text-xl w-[15rem] h-[4.267rem] flex justify-center items-center text-center mr-[0.69rem] last:mr-0 transition-colors'
			}
			to={path}
		>
			{title}
		</Link>
	)
}

export default PrimaryHeaderBttn
