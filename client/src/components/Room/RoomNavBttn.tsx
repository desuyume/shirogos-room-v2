import {
	RoomColor,
	colorVariants,
	colorVariantsHover,
} from '@/consts/roomColors'
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
				' flex-1 w-[15rem] min-w-[11.25rem] h-[2.52rem] transition-all text-primaryText hover:text-white text-xl flex justify-center items-center rounded-[2.3125rem]'
			}
			to={path}
		>
			{title}
		</Link>
	)
}

export default RoomNavBttn
