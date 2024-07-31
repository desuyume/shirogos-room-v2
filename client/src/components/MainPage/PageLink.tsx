import { cn } from '@/utils/cn'
import { FC } from 'react'
import { Link } from 'react-router-dom'

interface IPageLink {
	path: string
	title: string
	type: 'primary' | 'secondary'
}

const PageLink: FC<IPageLink> = ({ path, title, type }) => {
	return (
		<Link
			className={cn(
				'h-[5.625rem] flex justify-center items-center rounded-[2.3125rem] text-[2.8125rem] mr-[2.87rem] last:mr-0 transition-colors z-20',
				{
					'w-[25.75rem] bg-primary text-primaryText hover:text-white hover:bg-primaryHover':
						type === 'primary',
					'w-[23.5625rem] bg-secondary hover:bg-secondaryHover text-primary hover:text-primaryHover ':
						type === 'secondary',
				}
			)}
			to={path}
		>
			{title}
		</Link>
	)
}

export default PageLink
