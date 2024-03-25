import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface IBoutiqueNavBttn {
	path: string
	img: string
	bgColor: string
	bgColorHover: string
	borderColor: string
}

const BoutiqueNavBttn: FC<IBoutiqueNavBttn> = ({
	path,
	img,
	bgColor,
	bgColorHover,
	borderColor,
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
				'w-[5.3125rem] h-[5.3125rem] flex justify-center items-center transition-all rounded-full mb-3 last-of-type:mb-0 overflow-hidden ' +
				(path === '/store'
					? isActive
						? 'border-b-[5px]'
						: `${borderColor} border-b-[5px] `
					: '')
			}
		>
			<img
				className={path !== '/store' ? 'w-[3.71875rem]' : 'w-[4.875rem]'}
				src={img}
				alt='link-img'
			/>
		</Link>
	)
}

export default BoutiqueNavBttn
