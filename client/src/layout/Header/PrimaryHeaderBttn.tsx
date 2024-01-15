import { FC } from 'react'
import { Link } from 'react-router-dom'

interface IPrimaryHeaderBttn {
	path: string
	title: string
}

const PrimaryHeaderBttn: FC<IPrimaryHeaderBttn> = ({ path, title }) => {
	const isActive = window.location.pathname === path

	return (
		<Link
			className={
				(isActive
					? 'border-[3px] border-primary text-primaryText cursor-default '
					: 'bg-primary hover:bg-primaryHover text-primaryText hover:text-[#FFF] ') +
				'rounded-[2.3125rem] text-xl w-[15rem] h-[4.267rem] flex justify-center items-center text-center mr-[0.69rem] last:mr-0 transition-colors'
			}
			to={path}
		>
			{title}
		</Link>
	)
}

export default PrimaryHeaderBttn
