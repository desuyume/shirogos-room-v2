import { FC } from 'react'
import { Link } from 'react-router-dom'

interface IPageLink {
	path: string
	title: string
	type: string
}

const PageLink: FC<IPageLink> = ({ path, title, type }) => {
	return (
		<Link
			className={
				(type === 'primary'
					? 'w-[25.75rem] bg-primary text-[#FFF] hover:bg-primaryHover '
					: 'w-[23.5625rem] bg-secondary hover:bg-secondaryHover text-primary hover:text-primaryHover ') +
				'h-[5.625rem] flex justify-center items-center rounded-[2.3125rem] text-[2.8125rem] mr-[2.87rem] last:mr-0 transition-colors z-20'
			}
			to={path}
		>
			{title}
		</Link>
	)
}

export default PageLink
