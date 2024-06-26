import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface IBoutiqueNavBttn {
	path: string
	img: string
	bgColor: string
	bgColorHover: string
}

const BoutiqueNavBttn: FC<IBoutiqueNavBttn> = ({
	path,
	img,
	bgColor,
	bgColorHover,
}) => {
	const location = useLocation()
	const isActive =
		path === ''
			? location.pathname === '/room/boutique' ||
			  location.pathname === '/room/boutique/'
			: location.pathname.includes(`/room/boutique${path}`)

	return (
		<Link
			to={`/room/boutique${path}`}
			className={
				(isActive
					? 'bg-secondary border-secondary hover:border-secondary '
					: `${bgColor} ${bgColorHover} `) +
				'w-[5.3125rem] h-[5.3125rem] flex justify-center items-center transition-all rounded-full mb-3 last-of-type:mb-0 overflow-hidden'
			}
		>
			<img src={img} alt='link-img' />
		</Link>
	)
}

export default BoutiqueNavBttn
