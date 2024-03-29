import { FC } from 'react'
import { Link } from 'react-router-dom'

interface IHeaderBttn {
	path: string
	title: string
}

const HeaderBttn: FC<IHeaderBttn> = ({ path, title }) => {
	const isActive = window.location.pathname === path

	return (
		<Link
			className={
				(isActive
					? 'bg-transparent text-primary cursor-default '
					: 'bg-secondary hover:bg-secondaryHover text-primaryText hover:text-[#FFF] ') +
				'rounded-[2.3125rem] text-xl w-[15rem] h-[3.58rem] flex justify-center items-center text-center mr-[0.69rem] last:mr-0 transition-colors'
			}
			to={path}
		>
			{title}
		</Link>
	)
}

export default HeaderBttn
