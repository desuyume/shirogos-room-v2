import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface IRoomNavBttn {
	title: string
	path: string
}

const RoomNavBttn: FC<IRoomNavBttn> = ({ title, path }) => {
	const location = useLocation()
	const isActive =
		path === '/room'
			? location.pathname === '/room' || location.pathname === '/room/'
			: location.pathname.includes(path)

	return (
		<Link
			className={
				(isActive ? 'bg-secondary' : 'bg-primary hover:bg-primaryHover') +
				' flex-1 w-[15rem] h-[2.52rem]  transition-all text-primaryText text-xl flex justify-center items-center rounded-[2.3125rem]'
			}
			to={path}
		>
			{title}
		</Link>
	)
}

export default RoomNavBttn
